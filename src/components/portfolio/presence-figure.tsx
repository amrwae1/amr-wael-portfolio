"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The presence — a standing figure, lit out of the dark.
 *
 * Not a portrait and not a stock human model. The brief was "a shadow of a
 * person, the mind behind the site", and a literal photoreal body would read as
 * a purchased asset on a portfolio whose whole argument is that nothing is
 * borrowed. So the figure is generated here: points sampled through a set of
 * capsule segments in roughly male proportion.
 *
 * The first version made it near-black against a near-black field, which is not
 * a shadow — it is a smudge. A shadow is only legible because something else is
 * lit. So the figure is now sculpted by light: a warm key from one side, a cool
 * accent fresnel along the contour, and a hard fall to black everywhere the
 * light does not reach. Most of the body is darker than it was. The parts that
 * catch light are far brighter. The range is the point.
 *
 * Four behaviours carry the idea:
 *   · flow   — points drift on a smooth field, so neighbours move together and
 *              the body reads as a substance settling, not as static.
 *   · sweep  — the key light turns on a slow cycle, revealing one plane of the
 *              figure and surrendering another. It is never fully seen.
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

/**
 * Points sampled inside the volume, denser near the surface so the edge reads.
 *
 * Each point also carries the outward direction from its segment axis. That
 * stands in for a surface normal, which is what lets the figure be lit at all —
 * without it every point takes the same light and the body is flat again.
 */
function buildFigure(count: number) {
  const position = new Float32Array(count * 3);
  const normal = new Float32Array(count * 3);
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
      const r = radius * shell;

      // Offset from the axis, in the cross-section of the capsule.
      const ox = Math.cos(theta) * r;
      const oy = (Math.random() - 0.5) * r * 0.4;
      // Bodies are deeper than they are wide at the torso; flatten z slightly.
      const oz = Math.sin(theta) * r * 0.78;

      position[i * 3] = segment.a[0] + (segment.b[0] - segment.a[0]) * t + ox;
      position[i * 3 + 1] = segment.a[1] + (segment.b[1] - segment.a[1]) * t + oy;
      position[i * 3 + 2] = segment.a[2] + (segment.b[2] - segment.a[2]) * t + oz;

      // Normalised outward direction. Points sitting on the axis get an
      // arbitrary but harmless one; they are buried inside and never lit.
      const len = Math.hypot(ox, oy, oz) || 1;
      normal[i * 3] = ox / len;
      normal[i * 3 + 1] = oy / len;
      normal[i * 3 + 2] = oz / len;

      seed[i] = Math.random() * 100;
      edge[i] = shell;
    }
  }

  // Any remainder from rounding lands in the torso rather than at the origin.
  for (; i < count; i++) {
    const ox = (Math.random() - 0.5) * 0.4;
    const oy = (Math.random() - 0.5) * 0.8;
    const oz = (Math.random() - 0.5) * 0.3;
    position[i * 3] = ox;
    position[i * 3 + 1] = 4.6 * H + oy;
    position[i * 3 + 2] = oz;
    const len = Math.hypot(ox, oy, oz) || 1;
    normal[i * 3] = ox / len;
    normal[i * 3 + 1] = oy / len;
    normal[i * 3 + 2] = oz / len;
    seed[i] = Math.random() * 100;
    edge[i] = 1;
  }

  return { position, normal, seed, edge };
}

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uBreath;
  uniform float uDrift;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3  uLightDir;

  attribute float aSeed;
  attribute float aEdge;

  varying float vEdge;
  varying float vDepth;
  varying float vKey;
  varying float vFresnel;
  varying float vFront;

  void main() {
    vec3 p = position;

    // Flow, not jitter. The displacement is a function of position, so
    // neighbouring points move almost identically and the body drifts like a
    // substance. aSeed only breaks the tie, at a tenth of the weight: enough
    // that the surface shimmers, not so much that it dissolves into static.
    float t = uTime * 0.22;
    vec3 f = p * 1.35;
    vec3 flow = vec3(
      sin(f.y + t * 1.7) + sin(f.z * 0.8 - t * 1.1),
      sin(f.z + t * 1.3) + sin(f.x * 0.9 + t * 0.9),
      sin(f.x + t * 1.5) + sin(f.y * 0.7 - t * 1.3)
    );
    float chatter = sin(uTime * 0.9 + aSeed * 6.283);
    // Loose points on the outer shell wander furthest, so the silhouette frays
    // into the dark instead of ending at a line.
    float looseness = 0.35 + aEdge * aEdge * 1.5;
    p += (flow + chatter * 0.1) * uDrift * looseness;

    // Breath: the torso expands, the head and feet barely move.
    float chest = smoothstep(1.2, 2.5, p.y) * (1.0 - smoothstep(2.6, 3.1, p.y));
    p.xz *= 1.0 + uBreath * chest * 0.05;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    vec3 n = normalize(normalMatrix * normal);
    vec3 viewDir = normalize(-mv.xyz);

    // How squarely the point faces the eye. Points on the far side of the body
    // face away and must recede: without this they take a full grazing-angle
    // fresnel and the whole figure lights up like a lantern instead of showing
    // a contour.
    float facing = dot(n, viewDir);
    vFront = smoothstep(-0.5, 0.12, facing);

    // Key light. Barely wrapped, so the terminator is close to true and the
    // unlit side of the body goes genuinely black. This is where the shadow
    // comes from — not from dimming everything, but from committing to a
    // direction and letting most of the form fall away from it.
    float lambert = dot(n, normalize(uLightDir));
    vKey = pow(clamp(lambert * 0.8 + 0.2, 0.0, 1.0), 2.2) * vFront;

    // Fresnel, confined to the grazing edge — this draws the silhouette and
    // little else. abs() so a point cannot earn light by facing backwards.
    vFresnel = pow(1.0 - abs(facing), 4.0) * vFront;

    vEdge = aEdge;
    vDepth = clamp((-mv.z - 2.0) / 6.0, 0.0, 1.0);

    // Lit points read slightly larger. Light does this in a photograph — the
    // bright side of a form blooms — and it gives the contour real weight.
    float gain = 1.0 + vKey * 0.45 + vFresnel * 0.7;
    gl_PointSize = uSize * uPixelRatio * gain * (7.0 / max(-mv.z, 0.6));
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;

  uniform vec3 uShadow;
  uniform vec3 uKey;
  uniform vec3 uRim;

  varying float vEdge;
  varying float vDepth;
  varying float vKey;
  varying float vFresnel;
  varying float vFront;

  void main() {
    // Round, soft-edged points; square sprites read as noise at this density.
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float soft = 1.0 - smoothstep(0.24, 0.5, d);

    // Only the true outer shell takes light. Interior points stay black, which
    // is what keeps a volume from flattening into a glowing cloud.
    float lit = smoothstep(0.55, 0.97, vEdge);

    // Warm carries the lit plane; the accent only kisses the contour. Reversing
    // that weighting is what turned the first attempt into a blue hologram.
    vec3 colour = uShadow;
    colour += uKey * vKey * lit * 1.25;
    colour += uRim * vFresnel * lit * 0.65;

    // Unlit points stay faint as well as dark: the body gains its mass from the
    // light on it, not from a mass of dark dots. The floor is low enough that
    // the shadowed half is felt rather than read.
    float presence = 0.085 + lit * (vKey * 0.8 + vFresnel * 0.6);
    // Back-facing points recede rather than vanish — a body with nothing behind
    // its lit edge reads as a cardboard cut-out.
    float alpha = soft * presence * mix(0.5, 1.0, vFront) * mix(1.0, 0.4, vDepth);

    gl_FragColor = vec4(colour, clamp(alpha, 0.0, 1.0));
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
    const { position, normal, seed, edge } = buildFigure(count);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(position, 3));
    geometry.setAttribute("normal", new THREE.BufferAttribute(normal, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    geometry.setAttribute("aEdge", new THREE.BufferAttribute(edge, 1));

    const uniforms = {
      uTime: { value: 0 },
      uBreath: { value: 0 },
      uDrift: { value: reduce ? 0.004 : 0.016 },
      uSize: { value: coarse ? 2.6 : 2.4 },
      uPixelRatio: { value: pixelRatio },
      uLightDir: { value: new THREE.Vector3(-0.6, 0.35, 0.72) },
      // Black, with the faintest cool cast. The body is an absence; everything
      // visible about it is light landing on its surface.
      uShadow: { value: new THREE.Color(0x040407) },
      // Warm key, drawn down from the page's own parchment text colour.
      uKey: { value: new THREE.Color(0xd6c9b2) },
      // Cool contour, the accent used for every other emphasis on the site.
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

      // The sweep: a ~52s cycle, slow enough that it is never caught moving,
      // wide enough that the figure is lit from one side and then the other.
      // This is the whole of the mystery — you are never shown all of it.
      const sweep = reduce ? -0.7 : Math.sin(t * 0.12) * 1.15 - 0.15;
      uniforms.uLightDir.value.set(sweep, 0.3 + Math.sin(t * 0.07) * 0.18, 0.78).normalize();

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
