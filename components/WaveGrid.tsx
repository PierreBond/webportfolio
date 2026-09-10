import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

/* ── Vignette + Chromatic Aberration ──────────────────────────────────── */

const VignetteRGBShiftShader = {
  uniforms: {
    tDiffuse: { value: null },
    shiftAmount: { value: 0.005 },
    vignetteRadius: { value: 0.3 },
    vignetteSoftness: { value: 0.3 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float shiftAmount;
    uniform float vignetteRadius;
    uniform float vignetteSoftness;
    varying vec2 vUv;
    void main() {
      vec2 center = vec2(0.5);
      float dist = distance(vUv, center);
      float horzQuadrant = sign(vUv.x - center.x);
      float vertQuadrant = sign(vUv.y - center.y);
      float vignetteFactor = smoothstep(vignetteRadius, vignetteRadius + vignetteSoftness, dist);
      float currentShift = shiftAmount * vignetteFactor;
      float r = texture2D(tDiffuse, vUv + vec2(currentShift * horzQuadrant, currentShift * vertQuadrant)).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - vec2(currentShift * horzQuadrant, currentShift * vertQuadrant)).b;
      float darken = 1.0 - vignetteFactor * 0.5;
      gl_FragColor = vec4(vec3(r, g, b) * darken, 1.0);
    }
  `,
};

/* ── Constants ───────────────────────────────────────────────────────── */

const GRID_SIZE = 40;
const CUBE_WIDTH = 0.8;
const CUBE_HEIGHT = 3;
const GAP = 0.01;
const MAX_TRAIL = 128;

/* ── Theme helpers ───────────────────────────────────────────────────── */

function getThemeColors() {
  const isLight = document.documentElement.dataset.theme === 'light';
  return {
    bg: isLight ? new THREE.Color(0xffffff).multiplyScalar(0.5) : new THREE.Color('#030303'),
    base: isLight ? new THREE.Color(0xffffff) : new THREE.Color('#030303'),
    high: isLight ? new THREE.Color('#059669') : new THREE.Color('#73ffb9'),
    clear: isLight ? '#ffffff' : '#030303',
  };
}

/* ── Component ───────────────────────────────────────────────────────── */

export default function WaveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let destroyed = false;

    /* — Trail state — */
    const trail: { x: number; z: number; age: number; distDelta: number }[] = [];
    let lastPoint: { x: number; z: number } | null = null;
    let timeSinceLastMove = 0;
    let randomPointTimer = 0;
    let isPlacingRandomPoints = true;

    /* — Scene — */
    const scene = new THREE.Scene();
    const colors = getThemeColors();
    scene.background = colors.bg;

    /* — Camera — */
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 200);
    const cameraRadius = 12;
    const alphaRange = Math.PI * 0.03;
    const betaRange = Math.PI * 0.05;
    const camMouse = new THREE.Vector2(0, 0);
    const camMouseLerped = new THREE.Vector2(0, 0);

    function updateCamera(mx: number, my: number) {
      const alpha = my * alphaRange;
      const beta = mx * betaRange;
      camera.position.set(
        -cameraRadius * Math.cos(alpha) * Math.sin(beta),
        cameraRadius * Math.cos(alpha) * Math.cos(beta),
        cameraRadius * Math.sin(alpha),
      );
      camera.up.set(0, 0, -1);
      camera.lookAt(0, 0, 0);
    }
    updateCamera(0, 0);

    /* — Renderer — */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.95;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(colors.clear);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(1);

    /* — Post-processing — */
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const vignettePass = new ShaderPass(VignetteRGBShiftShader);
    vignettePass.uniforms.shiftAmount.value = 0.005;
    vignettePass.uniforms.vignetteRadius.value = 0.3;
    vignettePass.uniforms.vignetteSoftness.value = 0.3;
    composer.addPass(vignettePass);
    composer.addPass(new OutputPass());

    /* — Lighting — */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 4.0);
    dirLight.position.set(-20, 10, 6);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(1024, 1024);
    dirLight.shadow.radius = 6;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 60;
    dirLight.shadow.camera.left = -22;
    dirLight.shadow.camera.right = 22;
    dirLight.shadow.camera.top = 22;
    dirLight.shadow.camera.bottom = -22;
    dirLight.shadow.bias = 0.0001;
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight2.position.set(10, 5, -3);
    scene.add(dirLight2);

    /* — Grid — */
    const spacing = CUBE_WIDTH + GAP;
    const bounds = GRID_SIZE * spacing;
    const instanceCount = GRID_SIZE * GRID_SIZE;
    const geometry = new THREE.BoxGeometry(CUBE_WIDTH, CUBE_HEIGHT, CUBE_WIDTH);

    const offsetAttr = new THREE.InstancedBufferAttribute(new Float32Array(instanceCount * 2), 2);
    geometry.setAttribute('aOffset', offsetAttr);

    /* Trail data texture */
    const trailData = new Float32Array(MAX_TRAIL * 4);
    const trailTexture = new THREE.DataTexture(trailData, MAX_TRAIL, 1, THREE.RGBAFormat, THREE.FloatType);
    trailTexture.needsUpdate = true;

    const trailUniforms = {
      uTrailTexture: { value: trailTexture },
      uTrailCount: { value: 0 },
      uFadeTime: { value: 2.0 },
    };

    const waveCfg = { speed: 6.0, freq: 1.2, width: 3.0, amplitude: 0.4, jitter: 0.2, maxHeight: 0.4 };

    /* Material with shader injection */
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    let activeShader: Record<string, any> | null = null;

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTrailTexture = trailUniforms.uTrailTexture;
      shader.uniforms.uTrailCount = trailUniforms.uTrailCount;
      shader.uniforms.uFadeTime = trailUniforms.uFadeTime;
      shader.uniforms.uWaveSpeed = { value: waveCfg.speed };
      shader.uniforms.uWaveFreq = { value: waveCfg.freq };
      shader.uniforms.uWaveWidth = { value: waveCfg.width };
      shader.uniforms.uAmplitude = { value: waveCfg.amplitude };
      shader.uniforms.uJitter = { value: waveCfg.jitter };
      shader.uniforms.uMaxHeight = { value: waveCfg.maxHeight };
      shader.uniforms.uColorBase = { value: colors.base.clone() };
      shader.uniforms.uColorHigh = { value: colors.high.clone() };

      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
          varying float vHeight;
          attribute vec2 aOffset;
          uniform sampler2D uTrailTexture;
          uniform int uTrailCount;
          uniform float uWaveSpeed;
          uniform float uWaveFreq;
          uniform float uWaveWidth;
          uniform float uFadeTime;
          uniform float uAmplitude;
          uniform float uJitter;
          uniform float uMaxHeight;
          vec2 hash2(vec2 p) {
            p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
            return fract(sin(p) * 43758.5453123) - 0.5;
          }`,
        )
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
          vHeight = 0.0;
          if (position.y > 0.0) {
            vec2 jitter = hash2(aOffset) * uJitter;
            vec2 worldXZ = aOffset + jitter;
            float waveHeight = 0.0;
            float totalWeight = 0.0;
            for (int i = 0; i < uTrailCount; i++) {
              vec4 td = texture2D(uTrailTexture, vec2((float(i) + 0.5) / 128.0, 0.5));
              float dist = length(worldXZ - td.rg);
              float wavefront = uWaveSpeed * td.b;
              float relDist = dist - wavefront;
              float window = exp(-(relDist * relDist) / (uWaveWidth * uWaveWidth));
              float fade = exp(-td.b / uFadeTime);
              float atten = 1.0 / (1.0 + dist * 0.1);
              float weight = fade * window * atten * td.a;
              waveHeight += weight * cos(uWaveFreq * relDist);
              totalWeight += weight;
            }
            waveHeight /= max(totalWeight, 1.0);
            float displacement = clamp(waveHeight * uAmplitude, -uMaxHeight, uMaxHeight);
            transformed.y += displacement;
            vHeight = displacement;
          }`,
        );

      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
          varying float vHeight;
          uniform vec3 uColorBase;
          uniform vec3 uColorHigh;
          uniform float uMaxHeight;`,
        )
        .replace(
          '#include <color_fragment>',
          `#include <color_fragment>
          float t = clamp(vHeight / uMaxHeight, 0.0, 1.0);
          diffuseColor.rgb = mix(uColorBase, uColorHigh, t);`,
        );

      activeShader = shader;
    };

    /* Depth material for correct shadow deformation */
    const depthMaterial = new THREE.MeshDepthMaterial();
    depthMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uTrailTexture = trailUniforms.uTrailTexture;
      shader.uniforms.uTrailCount = trailUniforms.uTrailCount;
      shader.uniforms.uFadeTime = trailUniforms.uFadeTime;
      shader.uniforms.uWaveSpeed = { value: waveCfg.speed };
      shader.uniforms.uWaveFreq = { value: waveCfg.freq };
      shader.uniforms.uWaveWidth = { value: waveCfg.width };
      shader.uniforms.uAmplitude = { value: waveCfg.amplitude };
      shader.uniforms.uJitter = { value: waveCfg.jitter };
      shader.uniforms.uMaxHeight = { value: waveCfg.maxHeight };

      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
          attribute vec2 aOffset;
          uniform sampler2D uTrailTexture;
          uniform int uTrailCount;
          uniform float uWaveSpeed;
          uniform float uWaveFreq;
          uniform float uWaveWidth;
          uniform float uFadeTime;
          uniform float uAmplitude;
          uniform float uJitter;
          uniform float uMaxHeight;
          vec2 hash2(vec2 p) {
            p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
            return fract(sin(p) * 43758.5453123) - 0.5;
          }`,
        )
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
          if (position.y > 0.0) {
            vec2 jitter = hash2(aOffset) * uJitter;
            vec2 worldXZ = aOffset + jitter;
            float waveHeight = 0.0;
            float totalWeight = 0.0;
            for (int i = 0; i < uTrailCount; i++) {
              vec4 td = texture2D(uTrailTexture, vec2((float(i) + 0.5) / 128.0, 0.5));
              float dist = length(worldXZ - td.rg);
              float wavefront = uWaveSpeed * td.b;
              float relDist = dist - wavefront;
              float window = exp(-(relDist * relDist) / (uWaveWidth * uWaveWidth));
              float fade = exp(-td.b / uFadeTime);
              float atten = 1.0 / (1.0 + dist * 0.1);
              float weight = fade * window * atten * td.a;
              waveHeight += weight * cos(uWaveFreq * relDist);
              totalWeight += weight;
            }
            waveHeight /= max(totalWeight, 1.0);
            transformed.y += clamp(waveHeight * uAmplitude, -uMaxHeight, uMaxHeight);
          }`,
        );
    };

    const instancedMesh = new THREE.InstancedMesh(geometry, material, instanceCount);
    instancedMesh.customDepthMaterial = depthMaterial;
    instancedMesh.castShadow = true;
    instancedMesh.receiveShadow = true;
    scene.add(instancedMesh);

    /* Position instances */
    const dummy = new THREE.Object3D();
    const offset = ((GRID_SIZE - 1) * spacing) / 2;
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const idx = i * GRID_SIZE + j;
        const x = i * spacing - offset;
        const z = j * spacing - offset;
        dummy.position.set(x, 0, z);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(idx, dummy.matrix);
        offsetAttr.setXY(idx, x, z);
      }
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
    offsetAttr.needsUpdate = true;

    /* — Raycasting plane (invisible, for mouse → world mapping) — */
    const rayPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(bounds, bounds),
      new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, visible: false }),
    );
    rayPlane.rotation.x = -Math.PI / 2;
    rayPlane.updateMatrixWorld(true);

    const raycaster = new THREE.Raycaster();
    const rayNDC = new THREE.Vector2();

    /* — Pointer handler (trail + camera) — */
    function onPointerMove(e: PointerEvent) {
      /* Camera mouse */
      camMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      camMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      /* Raycast for trail */
      rayNDC.copy(camMouse);
      raycaster.setFromCamera(rayNDC, camera);
      const hits = raycaster.intersectObject(rayPlane);
      if (hits.length === 0) return;

      const { x, z } = hits[0].point;
      let distDelta = 0;
      if (lastPoint) {
        const dx = x - lastPoint.x;
        const dz = z - lastPoint.z;
        distDelta = Math.sqrt(dx * dx + dz * dz);
        if (distDelta < 0.1) return;
      }
      if (trail.length >= MAX_TRAIL) trail.shift();
      trail.push({ x, z, age: 0, distDelta });
      lastPoint = { x, z };
      timeSinceLastMove = 0;
      isPlacingRandomPoints = false;
      randomPointTimer = 0;
    }

    function addRandomPoint() {
      const x = (Math.random() * 0.5 - 0.25) * bounds;
      const z = (Math.random() * 0.5 - 0.25) * bounds;
      if (trail.length >= MAX_TRAIL) trail.shift();
      trail.push({ x, z, age: 0, distDelta: 0.8 + Math.random() * 0.2 });
    }

    window.addEventListener('pointermove', onPointerMove);

    /* — Resize — */
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize);

    /* — Theme observer — */
    const observer = new MutationObserver(() => {
      const c = getThemeColors();
      scene.background = c.bg;
      renderer.setClearColor(c.clear);
      if (activeShader) {
        activeShader.uniforms.uColorBase.value.copy(c.base);
        activeShader.uniforms.uColorHigh.value.copy(c.high);
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    /* — Animation loop — */
    const clock = new THREE.Clock();
    const expiry = trailUniforms.uFadeTime.value * 4;

    function animate() {
      if (destroyed) return;
      requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);

      /* Age & prune trail */
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].age += delta;
        if (trail[i].age > expiry) trail.splice(i, 1);
      }

      /* Idle random waves */
      timeSinceLastMove += delta;
      if (timeSinceLastMove >= 3.0 && !isPlacingRandomPoints) {
        isPlacingRandomPoints = true;
        randomPointTimer = 0;
      }
      if (isPlacingRandomPoints) {
        randomPointTimer += delta;
        if (randomPointTimer >= 1.5) {
          addRandomPoint();
          randomPointTimer = 0;
        }
      }

      /* Upload trail texture */
      const liveCount = Math.min(trail.length, MAX_TRAIL);
      if (liveCount > 0 || trailUniforms.uTrailCount.value > 0) {
        for (let i = 0; i < liveCount; i++) {
          const ti = i * 4;
          trailData[ti] = trail[i].x;
          trailData[ti + 1] = trail[i].z;
          trailData[ti + 2] = trail[i].age;
          trailData[ti + 3] = trail[i].distDelta;
        }
        trailTexture.needsUpdate = true;
        trailUniforms.uTrailCount.value = liveCount;
      }

      /* Camera lerp */
      camMouseLerped.x += (camMouse.x - camMouseLerped.x) * 0.04;
      camMouseLerped.y += (camMouse.y - camMouseLerped.y) * 0.04;
      updateCamera(camMouseLerped.x, camMouseLerped.y);

      composer.render();
    }
    animate();

    /* — Cleanup — */
    return () => {
      destroyed = true;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      instancedMesh.geometry.dispose();
      material.dispose();
      depthMaterial.dispose();
      trailTexture.dispose();
      rayPlane.geometry.dispose();
      (rayPlane.material as THREE.Material).dispose();
      renderer.dispose();
      composer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
