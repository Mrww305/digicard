/**
 * COSMOS — interactive deep-space background (Three.js r128)
 *
 * Layered star fields + a slowly turning galactic core rendered on a
 * fixed, click-transparent <canvas class="use-webgl">. The camera
 * drifts toward the normalised mouse position (-1 … 1) for a subtle
 * parallax; everything breathes on a sine curve.
 *
 * Performance: alpha renderer, antialiasing, pixel-ratio clamped at
 * 1.75, additive blending with depthWrite off, single RAF loop.
 */
import * as THREE from "three";

export interface CosmosHandle {
  dispose: () => void;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);

export function initCosmos(canvas: HTMLCanvasElement): CosmosHandle {
  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- renderer / scene / camera ---------- */
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    62,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
  );
  camera.position.set(0, 0, 560);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  /* ---------- star field factory ---------- */
  const makeStars = (
    count: number,
    spread: number,
    size: number,
    color: number,
    opacity: number
  ) => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = rand(-spread, spread);
      positions[i * 3 + 1] = rand(-spread, spread);
      positions[i * 3 + 2] = rand(-spread, spread * 0.5);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color,
      size,
      sizeAttenuation: true,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return new THREE.Points(geo, mat);
  };

  const far = makeStars(1500, 1700, 1.5, 0x8fa3bf, 0.5);
  const mid = makeStars(750, 1150, 2.1, 0xd7e0ee, 0.72);
  const near = makeStars(240, 640, 3.0, 0xe2a33c, 0.42); // ember dust

  /* ---------- galactic core — flattened rotating disc ---------- */
  const coreCount = 2400;
  const corePos = new Float32Array(coreCount * 3);
  const coreCol = new Float32Array(coreCount * 3);
  const white = new THREE.Color(0xd4dcec);
  const blue = new THREE.Color(0x9fb0c9);
  const ember = new THREE.Color(0xe2a33c);

  for (let i = 0; i < coreCount; i++) {
    const r = Math.pow(Math.random(), 0.62) * 250;
    const theta = Math.random() * Math.PI * 2;
    corePos[i * 3] = Math.cos(theta) * r + rand(-15, 15);
    corePos[i * 3 + 1] =
      rand(-1, 1) * 24 * Math.max(0.08, 1 - r / 290);
    corePos[i * 3 + 2] = Math.sin(theta) * r + rand(-15, 15);

    const pick = Math.random();
    const c = pick < 0.09 ? ember : pick < 0.5 ? white : blue;
    coreCol[i * 3] = c.r;
    coreCol[i * 3 + 1] = c.g;
    coreCol[i * 3 + 2] = c.b;
  }
  const coreGeo = new THREE.BufferGeometry();
  coreGeo.setAttribute("position", new THREE.BufferAttribute(corePos, 3));
  coreGeo.setAttribute("color", new THREE.BufferAttribute(coreCol, 3));
  const coreMat = new THREE.PointsMaterial({
    size: 1.9,
    vertexColors: true,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const core = new THREE.Points(coreGeo, coreMat);
  core.rotation.x = 1.12;
  core.position.set(0, -26, -140);

  const cosmos = new THREE.Group();
  cosmos.add(far, mid, near, core);
  scene.add(cosmos);

  /* ---------- mouse → normalised (-1 … 1) ---------- */
  const target = { x: 0, y: 0 };
  const mouse = { x: 0, y: 0 };
  const onPointerMove = (e: PointerEvent) => {
    target.x = (e.clientX / window.innerWidth) * 2 - 1;
    target.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  if (!reduced) window.addEventListener("pointermove", onPointerMove);

  /* ---------- resize ---------- */
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    if (reduced) renderer.render(scene, camera);
  };
  window.addEventListener("resize", onResize);

  /* ---------- animation loop ---------- */
  let raf = 0;
  const clock = new THREE.Clock();

  const frame = () => {
    raf = requestAnimationFrame(frame);
    const t = clock.getElapsedTime();

    mouse.x += (target.x - mouse.x) * 0.04;
    mouse.y += (target.y - mouse.y) * 0.04;

    camera.position.x += (mouse.x * 62 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y * 42 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    core.rotation.z += 0.00042;
    far.rotation.y += 0.00012;
    mid.rotation.y -= 0.00009;
    near.rotation.y += 0.00024;

    const breathe = 1 + Math.sin(t * 0.26) * 0.022;
    core.scale.setScalar(breathe);
    (coreMat as any).opacity = 0.78 + Math.sin(t * 0.4) * 0.1;

    renderer.render(scene, camera);
  };

  if (reduced) {
    renderer.render(scene, camera); // single static frame
  } else {
    frame();
  }

  /* ---------- teardown ---------- */
  const dispose = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("pointermove", onPointerMove);
    scene.traverse((obj: any) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
        else obj.material.dispose();
      }
    });
    renderer.dispose();
  };

  return { dispose };
}
