import * as THREE from 'three';

export interface BagProfile {
  D: number; // Depth (front-to-back distance)
  W: number; // Width (left-to-right distance)
  G: number; // Gusset inset fold depth
}

/**
 * Returns the width, depth, and gusset fold depth along the normalized height v in [0, 1].
 * v = 0 is the bottom base, v = 1 is the crimped top heat seal.
 */
export function getBagProfile(v: number): BagProfile {
  let D: number;
  let W: number;
  let G: number;

  // 1. Depth Profile (Front-to-back distance)
  if (v < 0.12) {
    // Bottom base transition to bean belly
    const t = v / 0.12;
    D = 0.58 + (0.86 - 0.58) * Math.sin(t * Math.PI * 0.5);
  } else if (v < 0.45) {
    // Main bean mass - maximum plumpness and organic bulge
    const t = (v - 0.12) / (0.45 - 0.12);
    D = 0.86 + 0.03 * Math.sin(t * Math.PI);
  } else if (v < 0.80) {
    // Smooth taper upward above the beans
    const t = (v - 0.45) / (0.80 - 0.45);
    D = 0.30 + (0.86 - 0.30) * 0.5 * (1 + Math.cos(t * Math.PI));
  } else if (v < 0.88) {
    // Steep taper meeting the sealed top header
    const t = (v - 0.80) / (0.88 - 0.80);
    D = 0.018 + (0.30 - 0.018) * 0.5 * (1 + Math.cos(t * Math.PI));
  } else {
    // Flat heat-sealed crimp header
    D = 0.015;
  }

  // 2. Width Profile (Left-to-right distance)
  if (v < 0.08) {
    const t = v / 0.08;
    W = 1.88 + 0.12 * Math.sin(t * Math.PI * 0.5);
  } else if (v < 0.80) {
    const t = (v - 0.08) / (0.80 - 0.08);
    W = 2.00 + 0.035 * Math.sin(t * Math.PI);
  } else if (v < 0.88) {
    W = 2.02;
  } else {
    // Slight crimp header flare at the very top
    const t = (v - 0.88) / (1.0 - 0.88);
    W = 2.02 + 0.02 * t;
  }

  // 3. Gusset Inward Fold Depth
  if (v < 0.08) {
    // Opens up into the standing base
    G = 0.02 + 0.18 * (v / 0.08);
  } else if (v < 0.65) {
    // Deep V-fold crease along the middle
    const t = (v - 0.08) / (0.65 - 0.08);
    G = 0.20 + 0.05 * Math.sin(t * Math.PI);
  } else if (v < 0.88) {
    // Flattening out towards the sealed top
    const t = (v - 0.65) / (0.88 - 0.65);
    G = 0.20 * 0.5 * (1 + Math.cos(t * Math.PI));
  } else {
    // Completely flat together at the crimp seal
    G = 0;
  }

  return { D, W, G };
}

/**
 * Creates a seamless, closed 3D stand-up coffee bag geometry.
 * All corners and seams match with identical 3D positions so there are zero holes or gaps.
 * Material groups:
 *  - 0: Front Face
 *  - 1: Right Gusset
 *  - 2: Back Face
 *  - 3: Left Gusset
 *  - 4: Top Seal Strip
 *  - 5: Bottom Base Plate
 */
export function createCoffeeBagGeometry(
  height = 3.2,
  slicesM = 40,
  Nfront = 24,
  Ngusset = 12,
  Nback = 24
): THREE.BufferGeometry {
  const geom = new THREE.BufferGeometry();
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const halfH = height / 2;

  // Helper to build a panel grid
  function buildPanel(
    numCols: number,
    getPt: (u: number, v: number, W: number, D: number, G: number, y: number) => { x: number; y: number; z: number }
  ) {
    const startIndex = positions.length / 3;
    const groupStart = indices.length;

    for (let j = 0; j <= slicesM; j++) {
      const v = j / slicesM;
      const y = -halfH + v * height;
      const { D, W, G } = getBagProfile(v);

      for (let i = 0; i <= numCols; i++) {
        const u = i / numCols;
        const pt = getPt(u, v, W, D, G, y);
        positions.push(pt.x, pt.y, pt.z);
        uvs.push(u, v);
      }
    }

    for (let j = 0; j < slicesM; j++) {
      for (let i = 0; i < numCols; i++) {
        const row1 = startIndex + j * (numCols + 1);
        const row2 = startIndex + (j + 1) * (numCols + 1);
        const a = row1 + i;
        const b = row1 + i + 1;
        const c = row2 + i + 1;
        const d = row2 + i;
        // Two triangles
        indices.push(a, b, c);
        indices.push(a, c, d);
      }
    }

    const groupCount = indices.length - groupStart;
    return { groupStart, groupCount };
  }

  // 1. FRONT PANEL: Left (-W/2) to Right (+W/2)
  const gFront = buildPanel(Nfront, (u, v, W, D, _G, y) => {
    const x = -W / 2 + u * W;
    const s = 2 * u - 1; // [-1, 1]
    // Natural organic bean-fill bulging curve
    const pillowFactor = Math.max(0, 1 - s * s);
    const heightEnvelope = Math.sin(Math.min(v / 0.85, 1) * Math.PI);
    const pillow = pillowFactor * 0.12 * D * heightEnvelope;
    const z = D / 2 + pillow;
    return { x, y, z };
  });

  // 2. RIGHT GUSSET: Front (+W/2, +D/2) through inward fold to Back (+W/2, -D/2)
  const gRight = buildPanel(Ngusset, (u, _v, W, D, G, y) => {
    // Inward V-crease fold in X
    const x = W / 2 - G * Math.sin(u * Math.PI);
    // Smooth transition from front (+D/2) to back (-D/2)
    const z = (D / 2) * (1 - 2 * u);
    return { x, y, z };
  });

  // 3. BACK PANEL: Right (+W/2) to Left (-W/2)
  const gBack = buildPanel(Nback, (u, v, W, D, _G, y) => {
    const x = W / 2 - u * W;
    const s = 1 - 2 * u; // [1, -1]
    const pillowFactor = Math.max(0, 1 - s * s);
    const heightEnvelope = Math.sin(Math.min(v / 0.85, 1) * Math.PI);
    const pillow = pillowFactor * 0.12 * D * heightEnvelope;
    // Characteristic center fin seal along the spine of the bag
    const finSeal = -0.012 * Math.max(0, 1 - 16 * Math.abs(u - 0.5));
    const z = -D / 2 - pillow + finSeal;
    return { x, y, z };
  });

  // 4. LEFT GUSSET: Back (-W/2, -D/2) through inward fold to Front (-W/2, +D/2)
  const gLeft = buildPanel(Ngusset, (u, _v, W, D, G, y) => {
    // Inward V-crease fold in X
    const x = -W / 2 + G * Math.sin(u * Math.PI);
    // Smooth transition from back (-D/2) to front (+D/2)
    const z = -(D / 2) * (1 - 2 * u);
    return { x, y, z };
  });

  // 5. TOP SEAL CLOSURE (Heat-sealed top rim cap)
  const topStart = indices.length;
  const topY = halfH;
  const { D: topD, W: topW } = getBagProfile(1.0);
  const topVertStart = positions.length / 3;

  // Quad at the very top edge: (-topW/2, topY, -topD/2), (topW/2, topY, -topD/2), (topW/2, topY, topD/2), (-topW/2, topY, topD/2)
  positions.push(
    -topW / 2, topY, -topD / 2,
    topW / 2, topY, -topD / 2,
    topW / 2, topY, topD / 2,
    -topW / 2, topY, topD / 2
  );
  uvs.push(0, 0, 1, 0, 1, 1, 0, 1);

  indices.push(
    topVertStart, topVertStart + 1, topVertStart + 2,
    topVertStart, topVertStart + 2, topVertStart + 3
  );
  const topCount = indices.length - topStart;

  // 6. BOTTOM BASE CAP (Closed bottom plate so bag is solid from underneath)
  const bottomStart = indices.length;
  const botY = -halfH;
  const { D: botD, W: botW } = getBagProfile(0.0);
  const botVertStart = positions.length / 3;

  // Center vertex
  positions.push(0, botY, 0);
  uvs.push(0.5, 0.5);

  const numBotSegments = 32;
  for (let i = 0; i <= numBotSegments; i++) {
    const angle = (i / numBotSegments) * Math.PI * 2;
    // Stadium / rounded rectangle bottom profile
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const bx = (botW / 2) * Math.sign(cosA) * Math.pow(Math.abs(cosA), 0.7);
    const bz = (botD / 2) * Math.sign(sinA) * Math.pow(Math.abs(sinA), 0.85);

    positions.push(bx, botY, bz);
    uvs.push(0.5 + 0.5 * cosA, 0.5 + 0.5 * sinA);
  }

  for (let i = 0; i < numBotSegments; i++) {
    const center = botVertStart;
    const p1 = botVertStart + 1 + i;
    const p2 = botVertStart + 1 + i + 1;
    // Winding clockwise so normal faces downward
    indices.push(center, p2, p1);
  }
  const bottomCount = indices.length - bottomStart;

  // Assign Buffer Attributes
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);

  // Define Material Groups
  geom.addGroup(gFront.groupStart, gFront.groupCount, 0);
  geom.addGroup(gRight.groupStart, gRight.groupCount, 1);
  geom.addGroup(gBack.groupStart, gBack.groupCount, 2);
  geom.addGroup(gLeft.groupStart, gLeft.groupCount, 3);
  geom.addGroup(topStart, topCount, 4);
  geom.addGroup(bottomStart, bottomCount, 5);

  geom.computeVertexNormals();
  geom.computeBoundingBox();

  return geom;
}

/**
 * Creates the physical 3D Aroma Degassing Valve mesh attached to the front of the bag.
 */
export function createDegassingValveMesh(): THREE.Group {
  const valveGroup = new THREE.Group();

  // Outer plastic ring (dark graphite tone)
  const outerRingGeo = new THREE.CylinderGeometry(0.095, 0.10, 0.018, 32);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x122524,
    roughness: 0.35,
    metalness: 0.15,
  });
  const outerRing = new THREE.Mesh(outerRingGeo, ringMat);
  outerRing.rotation.x = Math.PI / 2;
  valveGroup.add(outerRing);

  // Recessed inner disc
  const innerDiscGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.012, 32);
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x0c1b1a,
    roughness: 0.45,
    metalness: 0.1,
  });
  const innerDisc = new THREE.Mesh(innerDiscGeo, innerMat);
  innerDisc.rotation.x = Math.PI / 2;
  innerDisc.position.z = 0.003;
  valveGroup.add(innerDisc);

  // Center pinhole vent
  const pinholeGeo = new THREE.CircleGeometry(0.014, 16);
  const pinholeMat = new THREE.MeshBasicMaterial({ color: 0x050c0b });
  const pinhole = new THREE.Mesh(pinholeGeo, pinholeMat);
  pinhole.position.z = 0.012;
  valveGroup.add(pinhole);

  return valveGroup;
}
