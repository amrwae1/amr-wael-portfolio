"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The presence — a standing figure, built as a drifting point cloud.
 *
 * Not a portrait and not a stock human model. The brief was "a shadow of a
 * person, the mind behind the site", and a literal photoreal body would read as
 * a purchased asset on a portfolio whose whole argument is that nothing is
 * borrowed. So the figure is generated here: points sampled through a set of
 * capsule segments in roughly male proportion, rendered darker than the colour
 * field behind them.
 *
 * It reads as a shadow because it *occludes* — the points are near-black and
 * sit in front of the drifting aurora, so the figure is an absence of light
 * rather than an object lit by it. A thin fresnel edge in the accent keeps the
 * silhouette from dissolving into the background entirely.
 *
 * Three behaviours carry the idea:
 *   · drift  — every point wanders on its own noise offset, so the body is
 *              never quite settled: thought resolving into a shape.
 *   · breath — a slow scale on the torso, the one cue that reads as alive.
 *   · regard — the figure turns toward the pointer, within a narrow arc. Not a
 *              turntable; it notices you and holds.
 */

/** One limb or mass, as a tapered capsule between two points. */
type Segment = {
  a: [number, number, number];
  b: [number, number, number];
  ra: number;
  rb: number;
  /** Relative share of the total point budget. */
  weight: number;
};

/**
 * Proportioned in head-heights, the way a figure is blocked out before it is
 * drawn: ~7.5 heads tall, shoulders two head-widths, hips narrower than
 * shoulders. Origin at the feet, so the model sits on y = 0.
 */
const H = 0.42; // one head height in world units
const SEGMENTS: Segment[] = [
  // head and neck
  { a: [0, 7.05 * H, 0], b: [0, 6.35 * H, 0], ra: 0.3 * H, rb: 0.34 * H, weight: 9 },
  { a: [0, 6.35 * H, 0], b: [0, 6.0 * H, 0], ra: 0.16 * H, rb: 0.2 * H, weight: 2 },
  // torso: shoulders taper to waist, waist to hips
  { a: [0, 6.0 * H, 0], b: [0, 4.6 * H, 0], ra: 0.62 * H, rb: 0.46 * H, weight: 20 },
  { a: [0, 4.6 * H, 0], b: [0, 3.7 * H, 0], ra: 0.46 * H, rb: 0.52 * H, weight: 12 },
  // arms, hanging with a slight outward break at the elbow
  { a: [-0.55 * H, 5.9 * H, 0], b: [-0.78 * H, 4.75 * H, 0.04 * H], ra: 0.19 * H, rb: 0.15 * H, weight: 7 },
  { a: [-0.78 * H, 4.75 * H, 0.04 * H], b: [-0.86 * H, 3.55 * H, 0.1 * H], ra: 0.15 * H, rb: 0.11 * H, weight: 6 },
  { a: [0.55 * H, 5.9 * H, 0], b: [0.78 * H, 4.75 * H, 0.04 * H], ra: 0.19 * H, rb: 0.15 * H, weight: 7 },
  { a: [0.78 * H, 4.75 * H, 0.04 * H], b: [0.86 * H, 3.55 * H, 0.1 * H], ra: 0.15 * H, rb: 0.11 * H, weight: 6 },
  // legs
  { a: [-0.26 * H, 3.7 * H, 0], b: [-0.3 * H, 1.95 * H, 0], ra: 0.26 * H, rb: 0.17 * H, weight: 11 },
  { a: [-0.3 * H, 1.95 * H, 0], b: [-0.31 * H, 0.12 * H, 0], ra: 0.17 * H, rb: 0.1 * H, weight: 9 },
  { a: [0.26 * H, 3.7 * H, 0], b: [0.3 * H, 1.95 * H, 0], ra: 0.26 * H, rb: 0.17 * H, weight: 11 },
  { a: [0.3 * H, 1.95 * H, 0], b: [0.31 * H, 0.12 * H, 0], ra: 0.17 * H, rb: 0.1 * H, weight: 9 },
];

/** Points sampled inside the volume, denser near the surface so the edge reads. */
function buildFigure(count: number) {
  const position = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  const edge = new Float32Array(count);

  const totalWeight = SEGMENTS.reduce((sum, s) => sum + s.weight, 0);
  let i = 0;

  for (const segment of SEGMENTS) {
    const share = Math.round((segment.weight / totalWeight) * count);
    for (let n = 0; n < share && i < count; n++, i++) {
      const t = Math.random();
      const radius = segment.ra + (segment.rb - segment.ra) * t;

      // Biased toward the shell: a uniform fill makes a soft blob, whereas
      // crowding the surface keeps the silhouette crisp against the field.
      const shell = Math.pow(Math.random(), 0.35);
      const theta = Math.random() * Math.PI * 2;
      // Bodies are deeper than they are wide at the torso; flatten z slightly.
      const r = radius * shell;

      position[i * 3] = segment.a[0] + (segment.b[0] - segment.a[0]) * t + Math.cos(theta) * r;
      position[i * 3 + 1] = segment.a[1] + (segment.b[1] - segment.a[1]) * t + (Math.random() - 0.5) * r * 0.4;
      position[i * 3 + 2] = segment.a[2] + (segment.b[2] - segment.a[2]) * t + Math.sin(theta) * r * 0.78;

      seed[i] = Math.random() * 100;
      edge[i] = shell;
    }
  }

  // Any remainder from rounding lands in the torso rather than at the origin.
  for (; i < count; i++) {
    position[i * 3] = (Math.random() - 0.5) * 0.4;
    position[i * 3 + 1] = 4.6 * H + (Math.random() - 0.5) * 0.8;
    position[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    seed[i] = Math.random() * 100;
    edge[i] = 1;
  }

  return { position, seed, edge };
}

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uBreath;
  uniform float uDrift;
  uniform float uSize;
  uniform float uPixelRatio;

  attribute float aSeed;
  attribute float aEdge;

  varying float vEdge;
  varying float vDepth;

  void main() {
    vec3 p = position;

    // Every point wanders on its own phase — the body never fully settles.
    float t = uTime + aSeed;
    p.x += sin(t * 0.6) * uDrift * (0.4 + aEdge);
    p.y += cos(t * 0.47) * uDrift * (0.4 + aEdge);
    p.z += sin(t * 0.53 + 1.7) * uDrift * (0.4 + aEdge);

    // Breath: the torso expands, the head and feet barely move.
    float chest = smoothstep(1.2, 2.5, p.y) * (1.0 - smoothstep(2.6, 3.1, p.y));
    p.xz *= 1.0 + uBreath * chest * 0.05;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    // Perspective-correct size, clamped so far points never vanish entirely.
    gl_PointSize = uSize * uPixelRatio * (7.0 / max(-mv.z, 0.6));

    vEdge = aEdge;
    vDepth = clamp((-mv.z - 2.0) / 6.0, 0.0, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;

  uniform vec3 uShadow;
  uniform vec3 uRim;

  varying float vEdge;
  varying float vDepth;

  void main() {
    // Round, soft-edged points; square sprites read as noise at this density.
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float soft = 1.0 - smoothstep(0.28, 0.5, d);

    // Only the true outer shell catches light. Anything more and the body
    // reads as a glowing particle effect instead of a shadow with a lit contour.
    vec3 colour = mix(uShadow, uRim, smoothstep(0.9, 1.0, vEdge) * 0.32);

    // Depth fade keeps the back of the body from crowding the front.
    float alpha = soft * mix(1.0, 0.35, vDepth);
    gl_FragColor = vec4(colour, alpha);
  }
`;

export function PresenceFigure({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = host.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    } catch {
      return; // No WebGL — the hero still stands up without the figure.
    }

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, mount.clientWidth / mount.clientHeight, 0.1, 60);
    // Close enough that the figure slightly overfills the frame — a presence
    // cropped by the edges reads as being in the room, where a whole body
    // floating in the middle reads as an illustration of one.
    camera.position.set(0, 1.68, 5.0);
    camera.lookAt(0, 1.62, 0);

    // Fewer points on phones: this is decoration, not content worth a frame drop.
    const count = coarse ? 12000 : 34000;
    const { position, seed, edge } = buildFigure(count);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(position, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    geometry.setAttribute("aEdge", new THREE.BufferAttribute(edge, 1));

    const uniforms = {
      uTime: { value: 0 },
      uBreath: { value: 0 },
      uDrift: { value: reduce ? 0.004 : 0.014 },
      uSize: { value: coarse ? 2.6 : 2.3 },
      uPixelRatio: { value: pixelRatio },
      // Darker than the field behind it, so the figure subtracts light.
      uShadow: { value: new THREE.Color(0x05050a) },
      uRim: { value: new THREE.Color(0xa8b5e6) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    // Off the centre line, so the claim never has to compete with a body
    // directly behind it. On a narrow screen there is no room to offset, so it
    // recentres and the type sits over the chest instead of the face.
    const offset = () => (mount.clientWidth < 768 ? 0 : 1.12);
    points.position.x = offset();
    scene.add(points);

    // Pointer regard, springed by hand — a bare lerp toward the target reads
    // as mechanical, and this only needs one axis pair.
    let targetYaw = 0;
    let targetPitch = 0;
    let yaw = 0;
    let pitch = 0;

    const onPointer = (e: PointerEvent) => {
      if (reduce) return;
      // A narrow arc: the figure notices the reader, it does not track them.
      targetYaw = (e.clientX / window.innerWidth - 0.5) * 0.55;
      targetPitch = (e.clientY / window.innerHeight - 0.5) * 0.16;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const onResize = () => {
      if (!mount.clientWidth || !mount.clientHeight) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      points.position.x = offset();
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(mount);

    // Pause entirely when the tab is hidden or the hero is scrolled away.
    let onScreen = true;
    const visibility = new IntersectionObserver(
      ([entry]) => { onScreen = entry.isIntersecting; },
      { threshold: 0 },
    );
    visibility.observe(mount);

    const started = performance.now();
    let frame = 0;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!onScreen || document.hidden) return;

      const t = (performance.now() - started) / 1000;
      uniforms.uTime.value = t;
      // ~13 breaths a minute, resting.
      uniforms.uBreath.value = reduce ? 0 : Math.sin(t * 1.35) * 0.5 + 0.5;

      yaw += (targetYaw - yaw) * 0.045;
      pitch += (targetPitch - pitch) * 0.045;
      // A slow sway underneath the regard, so a still pointer is not a frozen body.
      points.rotation.y = yaw + (reduce ? 0 : Math.sin(t * 0.16) * 0.07);
      points.rotation.x = pitch;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      observer.disconnect();
      visibility.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} aria-hidden="true" className={className} />;
}
