import * as THREE from "three";

/**
 * The hero's little shooting-range game.
 *
 * Wireframe drones drift through the starfield; a click or tap pops one. It
 * replaces two decorative shapes that used to sit still behind the headline.
 *
 * Two rules keep it from fighting the page for attention:
 *  - a drone that drifts behind the headline or the buttons fades down and
 *    stops being hittable, so copy always wins and taps reach the real CTAs;
 *  - hit testing happens in screen space against a generous pixel radius,
 *    so a thumb on a phone is as accurate as a mouse on a desktop.
 */

const EMERALD = 0x10b981;
const INDIGO = 0x6366f1;

/** Keeps drones inside a slab the camera can actually see. */
const BOUNDS = { x: 120, y: 55, zNear: -70, zFar: 20 };

type Drone = {
  mesh: THREE.LineSegments;
  /** World-space radius, used to derive the on-screen hit radius. */
  radius: number;
  velocity: THREE.Vector3;
  spin: THREE.Vector3;
  baseOpacity: number;
  /** False while the drone sits behind page content, or is waiting to respawn. */
  hittable: boolean;
  /** Timestamp (seconds) this drone comes back, or 0 when it is alive. */
  respawnAt: number;
  /** False until the first frame that knows where the copy sits. */
  placed: boolean;
  screen: THREE.Vector2;
  screenRadius: number;
};

type Burst = {
  points: THREE.Points;
  velocities: Float32Array;
  life: number;
};

export type DroneField = {
  /** `contentRects` are the live boxes of the headline, buttons and so on. */
  update(t: number, dt: number, contentRects: DOMRect[]): void;
  /** Returns true when the tap destroyed a drone. */
  shoot(clientX: number, clientY: number): boolean;
  dispose(): void;
};

export type DroneFieldOptions = {
  count: number;
  reducedMotion: boolean;
  /** Called with the running total each time a drone is destroyed. */
  onHit?: () => void;
};

export function createDroneField(
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  opts: DroneFieldOptions
): DroneField {
  const { reducedMotion, onHit } = opts;
  const drones: Drone[] = [];
  const bursts: Burst[] = [];
  const projected = new THREE.Vector3();

  const viewport = () => {
    const size = new THREE.Vector2();
    renderer.getSize(size);
    return size;
  };

  // A handful of silhouettes so the field doesn't read as one repeated prop.
  const shapes = [
    () => new THREE.IcosahedronGeometry(1, 0),
    () => new THREE.OctahedronGeometry(1, 0),
    () => new THREE.TetrahedronGeometry(1, 0),
    () => new THREE.DodecahedronGeometry(1, 0),
  ];

  const ray = new THREE.Vector3();

  /**
   * Places a drone by picking a point on *screen* that isn't covered by copy,
   * then casting it back into the world at a random depth.
   *
   * Choosing world coordinates directly can't work across devices: the gutters
   * beside the headline are wide on a desktop and almost nothing on a phone,
   * so a fixed world position lands in open space on one and behind the title
   * on the other. Screen space is the frame that actually matters here.
   */
  const placeDrone = (
    target: THREE.Vector3,
    contentRects: DOMRect[],
    size: THREE.Vector2
  ) => {
    const depth = BOUNDS.zNear + Math.random() * (BOUNDS.zFar - BOUNDS.zNear);

    for (let attempt = 0; attempt < 24; attempt++) {
      // Inset from the edges so drones never spawn half-clipped.
      const sx = size.x * (0.06 + Math.random() * 0.88);
      const sy = size.y * (0.16 + Math.random() * 0.72);

      const clear = contentRects.every(
        (rect) =>
          sx < rect.left - 24 ||
          sx > rect.right + 24 ||
          sy < rect.top - 24 ||
          sy > rect.bottom + 24
      );
      // Later attempts relax the rule, so a cramped phone screen still spawns.
      if (!clear && attempt < 18) continue;

      ray
        .set((sx / size.x) * 2 - 1, -(sy / size.y) * 2 + 1, 0.5)
        .unproject(camera)
        .sub(camera.position)
        .normalize();

      if (Math.abs(ray.z) < 0.001) continue;
      const travel = (depth - camera.position.z) / ray.z;
      if (travel <= 0) continue;

      target.copy(camera.position).addScaledVector(ray, travel);
      return;
    }

    // Fallback: somewhere in the slab, rather than leaving the drone at origin.
    target.set(
      (Math.random() * 2 - 1) * BOUNDS.x,
      (Math.random() * 2 - 1) * BOUNDS.y + 10,
      depth
    );
  };

  for (let i = 0; i < opts.count; i++) {
    const radius = 5 + Math.random() * 7;
    const solid = shapes[i % shapes.length]();
    solid.scale(radius, radius, radius);
    const edges = new THREE.EdgesGeometry(solid);
    solid.dispose();

    const baseOpacity = 0.4 + Math.random() * 0.2;
    const material = new THREE.LineBasicMaterial({
      color: i % 3 === 0 ? INDIGO : EMERALD,
      transparent: true,
      opacity: baseOpacity,
    });

    const mesh = new THREE.LineSegments(edges, material);
    material.opacity = 0;
    scene.add(mesh);

    // World units per frame. Kept slow on purpose: a drone that crosses more
    // than ~20px a second is ambient decoration, not a target you can hit.
    const speed = reducedMotion ? 0.03 : 0.1;
    drones.push({
      mesh,
      radius,
      velocity: new THREE.Vector3(
        (Math.random() * 2 - 1) * speed,
        (Math.random() * 2 - 1) * speed * 0.4,
        (Math.random() * 2 - 1) * speed * 0.3
      ),
      spin: new THREE.Vector3(
        (Math.random() * 2 - 1) * 0.006,
        (Math.random() * 2 - 1) * 0.006,
        0
      ),
      baseOpacity,
      hittable: true,
      respawnAt: 0,
      placed: false,
      screen: new THREE.Vector2(-1000, -1000),
      screenRadius: 0,
    });
  }

  /** Scatters a short-lived particle puff where a drone died. */
  const spawnBurst = (at: THREE.Vector3, color: number) => {
    if (reducedMotion) return;

    const count = 26;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = at.x;
      positions[i * 3 + 1] = at.y;
      positions[i * 3 + 2] = at.z;
      const dir = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      )
        .normalize()
        .multiplyScalar(0.6 + Math.random() * 1.4);
      velocities[i * 3] = dir.x;
      velocities[i * 3 + 1] = dir.y;
      velocities[i * 3 + 2] = dir.z;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color,
        size: 2.4,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    scene.add(points);
    bursts.push({ points, velocities, life: 0 });
  };

  const killBurst = (burst: Burst, index: number) => {
    scene.remove(burst.points);
    burst.points.geometry.dispose();
    (burst.points.material as THREE.Material).dispose();
    bursts.splice(index, 1);
  };

  const update: DroneField["update"] = (t, dt, contentRects) => {
    // Position and lookAt are set by hand each frame, so the matrix the
    // projection relies on has to be refreshed before we use it.
    camera.updateMatrixWorld();
    const size = viewport();
    // Perspective scale factor: world units to pixels at a given depth.
    const projScale =
      size.y / (2 * Math.tan((camera.fov * Math.PI) / 180 / 2));

    for (const drone of drones) {
      const material = drone.mesh.material as THREE.LineBasicMaterial;

      if (!drone.placed) {
        placeDrone(drone.mesh.position, contentRects, size);
        drone.placed = true;
      }

      if (drone.respawnAt > 0) {
        if (t < drone.respawnAt) continue;
        // Come back somewhere else, fading in from nothing.
        placeDrone(drone.mesh.position, contentRects, size);
        drone.respawnAt = 0;
        drone.mesh.visible = true;
        material.opacity = 0;
      }

      drone.mesh.rotation.x += drone.spin.x;
      drone.mesh.rotation.y += drone.spin.y;

      const p = drone.mesh.position;
      p.addScaledVector(drone.velocity, dt * 60);

      // Turn back at the edges of the slab rather than wrapping, which would
      // make drones pop in and out at the screen edge.
      if (Math.abs(p.x) > BOUNDS.x) drone.velocity.x *= -1;
      if (Math.abs(p.y - 10) > BOUNDS.y) drone.velocity.y *= -1;
      if (p.z < BOUNDS.zNear || p.z > BOUNDS.zFar) drone.velocity.z *= -1;

      // --- Project to screen space, for both hit testing and content avoidance
      projected.copy(p).project(camera);
      const sx = (projected.x * 0.5 + 0.5) * size.x;
      const sy = (-projected.y * 0.5 + 0.5) * size.y;
      drone.screen.set(sx, sy);

      const distance = camera.position.distanceTo(p);
      drone.screenRadius =
        distance > 0.001 ? (drone.radius / distance) * projScale : 0;

      const behindCamera = projected.z > 1;
      // Measured against each piece of copy, not one big wrapper box — that
      // would cover the whole hero and dim every drone on screen.
      const pad = 10;
      let overContent = false;
      for (const rect of contentRects) {
        if (
          sx > rect.left - pad &&
          sx < rect.right + pad &&
          sy > rect.top - pad &&
          sy < rect.bottom + pad
        ) {
          overContent = true;
          break;
        }
      }

      drone.hittable = !overContent && !behindCamera;

      // Dim behind copy so the headline always reads cleanly, and never let a
      // dimmed drone look clickable.
      const target = overContent ? 0.08 : drone.baseOpacity;
      material.opacity += (target - material.opacity) * Math.min(1, dt * 6);
    }

    for (let i = bursts.length - 1; i >= 0; i--) {
      const burst = bursts[i];
      burst.life += dt;
      const attr = burst.points.geometry.attributes
        .position as THREE.BufferAttribute;
      const array = attr.array as Float32Array;
      for (let j = 0; j < array.length; j += 3) {
        array[j] += burst.velocities[j] * dt * 60;
        array[j + 1] += burst.velocities[j + 1] * dt * 60;
        array[j + 2] += burst.velocities[j + 2] * dt * 60;
      }
      attr.needsUpdate = true;
      const material = burst.points.material as THREE.PointsMaterial;
      material.opacity = Math.max(0, 1 - burst.life / 0.7);
      if (burst.life > 0.7) killBurst(burst, i);
    }
  };

  const shoot: DroneField["shoot"] = (clientX, clientY) => {
    let best: Drone | null = null;
    let bestDistance = Infinity;

    for (const drone of drones) {
      if (!drone.hittable || drone.respawnAt > 0) continue;
      const dx = drone.screen.x - clientX;
      const dy = drone.screen.y - clientY;
      const distance = Math.hypot(dx, dy);
      // Generous floor so a fingertip lands as reliably as a cursor.
      const tolerance = Math.max(34, drone.screenRadius * 1.25);
      if (distance < tolerance && distance < bestDistance) {
        best = drone;
        bestDistance = distance;
      }
    }

    if (!best) return false;

    spawnBurst(
      best.mesh.position,
      (best.mesh.material as THREE.LineBasicMaterial).color.getHex()
    );
    best.mesh.visible = false;
    best.hittable = false;
    best.respawnAt = Date.now() * 0.001 + 0.7 + Math.random() * 0.6;
    onHit?.();
    return true;
  };

  const dispose = () => {
    for (const drone of drones) {
      scene.remove(drone.mesh);
      drone.mesh.geometry.dispose();
      (drone.mesh.material as THREE.Material).dispose();
    }
    drones.length = 0;
    for (let i = bursts.length - 1; i >= 0; i--) killBurst(bursts[i], i);
  };

  return { update, shoot, dispose };
}
