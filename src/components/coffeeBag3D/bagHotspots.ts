import * as THREE from 'three';

export interface Hotspot3D {
  id: string;
  title: string;
  detail: string;
  side: 'front' | 'back' | 'top';
  pos: THREE.Vector3;
  normal: THREE.Vector3;
}

export const HOTSPOTS_3D: Hotspot3D[] = [
  {
    id: 'valve',
    title: 'One-Way Aroma Valve',
    detail: 'Allows natural degassing of CO2 while locking out oxygen to preserve peak floral aromas.',
    side: 'front',
    pos: new THREE.Vector3(0, 0.42, 0.51),
    normal: new THREE.Vector3(0, 0.1, 1).normalize(),
  },
  {
    id: 'origin',
    title: 'Ratnagiri Estate YC-17',
    detail: 'Single origin lot from Western Ghats. Culture Natural processed with notes of Jasmin Tea, Raspberry & Nutty sweetness.',
    side: 'front',
    pos: new THREE.Vector3(-0.40, -0.62, 0.48),
    normal: new THREE.Vector3(-0.1, 0, 1).normalize(),
  },
  {
    id: 'roast',
    title: 'Light Roast Profile',
    detail: 'Tailored temperature curve preserving origin delicacy, vibrant berry acidity, and clean sweet finish.',
    side: 'front',
    pos: new THREE.Vector3(0.48, -0.62, 0.48),
    normal: new THREE.Vector3(0.1, 0, 1).normalize(),
  },
  {
    id: 'story',
    title: 'Every Bean Tells A Story',
    detail: 'Artisanal small-batch roasting respecting farmers, origins, and craft. Profiled for your bar.',
    side: 'back',
    pos: new THREE.Vector3(0, 0.62, -0.42),
    normal: new THREE.Vector3(0, 0, -1).normalize(),
  },
  {
    id: 'roastery',
    title: 'Gomti Nagar, Lucknow',
    detail: 'Ground floor, 1/59, Vastu Khand, Gomti Nagar, Lucknow 226010. Roasted and dispatched weekly across India.',
    side: 'back',
    pos: new THREE.Vector3(0.42, -0.15, -0.46),
    normal: new THREE.Vector3(0.1, 0, -1).normalize(),
  },
];
