import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  createCoffeeBagGeometry,
} from './coffeeBag3D/bagGeometry';
import {
  loadPacketTexture,
  createTopSealTexture,
  createBottomTexture,
  createBagNormalTexture,
} from './coffeeBag3D/bagTextures';
import {
  RotateCcw,
  Play,
  Pause,
} from 'lucide-react';
import './CoffeePacket3D.css';

export const CoffeePacket3D: React.FC<{
  onRequestSample?: () => void;
}> = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // Three.js instances stored in refs so they persist across re-renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const bagMeshRef = useRef<THREE.Mesh | null>(null);
  const bagGroupRef = useRef<THREE.Group | null>(null);
  const shadowMeshRef = useRef<THREE.Mesh | null>(null);

  // Pointer down tracking for tap vs drag discrimination
  const pointerDownRef = useRef({
    x: 0,
    y: 0,
    time: 0,
  });

  // Rotation control states
  const rotRef = useRef({
    targetY: 0,
    targetX: 0.05,
    currentY: 0,
    currentX: 0.05,
    isDragging: false,
    prevX: 0,
    prevY: 0,
    hoverX: 0,
    hoverY: 0,
    autoRotate: true,
  });

  // Keep autoRotate in sync with ref
  useEffect(() => {
    rotRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  const flip180 = useCallback(() => {
    rotRef.current.targetY += Math.PI;
  }, []);

  // Main Three.js Scene Setup & Render Loop
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || 360;
    let height = container.clientHeight || 540;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera: 34 FOV gives studio perspective with generous vertical & horizontal clearance
    const fov = 34;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 50);

    const updateCameraPosition = (aspect: number) => {
      const halfFovRad = THREE.MathUtils.degToRad(fov / 2);
      const tanHalfFov = Math.tan(halfFovRad);
      
      // Calibrated visible height and width so the bag (height 3.1) and ground shadow
      // have generous, elegant headroom & footroom at all 360-degree rotation & pitch tilt angles
      const minVisibleHeight = 3.95; 
      const minVisibleWidth = 2.75;  

      const distForHeight = minVisibleHeight / (2 * tanHalfFov);
      const distForWidth = minVisibleWidth / (2 * aspect * tanHalfFov);
      const targetDist = Math.max(distForHeight, distForWidth);

      // Perfectly center the camera on the bag pivot
      camera.position.set(0, -0.05, targetDist);
      camera.lookAt(0, -0.05, 0);
    };

    updateCameraPosition(width / height);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    rendererRef.current = renderer;

    // 4. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xfff7ea, 0.9);
    scene.add(ambientLight);

    // Key Light: Upper left front
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(-2.6, 3.6, 4.2);
    scene.add(keyLight);

    // Fill Light: Soft warm right
    const fillLight = new THREE.DirectionalLight(0xfdf3e3, 1.4);
    fillLight.position.set(3.2, 1.0, 3.2);
    scene.add(fillLight);

    // Rim Light: Sage-tinted backlight accentuating foil gussets and edges
    const rimLight = new THREE.DirectionalLight(0x9fc4b7, 1.8);
    rimLight.position.set(0, 2.5, -4.5);
    scene.add(rimLight);

    // Top Header Crimp Light: highlights the vertical crimp pattern
    const crimpLight = new THREE.DirectionalLight(0xfff5e6, 1.0);
    crimpLight.position.set(0, 4.8, 1.0);
    scene.add(crimpLight);

    // 5. Bag Pivot Group
    const bagGroup = new THREE.Group();
    scene.add(bagGroup);
    bagGroupRef.current = bagGroup;

    // 6. Textures & Materials - Loaded directly from official vector artwork (300 DPI)
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const frontTex = loadPacketTexture('/packet_design/page-1.png', maxAnisotropy, () => {
      frontMat.needsUpdate = true;
    });
    const gussetRightTex = loadPacketTexture('/packet_design/page-4.png', maxAnisotropy, () => {
      rightMat.needsUpdate = true;
    });
    const backTex = loadPacketTexture('/packet_design/page-2.png?v=1-58', maxAnisotropy, () => {
      backMat.needsUpdate = true;
    });
    const gussetLeftTex = loadPacketTexture('/packet_design/page-3.png', maxAnisotropy, () => {
      leftMat.needsUpdate = true;
    });
    const topSealTex = createTopSealTexture();
    const bottomTex = createBottomTexture();
    const normalTex = createBagNormalTexture();

    // Material definitions for high-end matte laminated packaging
    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTex,
      bumpMap: normalTex,
      bumpScale: 0.002,
      roughness: 0.35,
      metalness: 0.04,
    });

    const rightMat = new THREE.MeshStandardMaterial({
      map: gussetRightTex,
      roughness: 0.38,
      metalness: 0.04,
    });

    const backMat = new THREE.MeshStandardMaterial({
      map: backTex,
      roughness: 0.35,
      metalness: 0.04,
    });

    const leftMat = new THREE.MeshStandardMaterial({
      map: gussetLeftTex,
      roughness: 0.38,
      metalness: 0.04,
    });

    const topSealMat = new THREE.MeshStandardMaterial({
      map: topSealTex,
      roughness: 0.30,
      metalness: 0.15,
    });

    const bottomMat = new THREE.MeshStandardMaterial({
      map: bottomTex,
      roughness: 0.50,
      metalness: 0.04,
    });

    // 7. Bag Geometry Mesh
    const bagGeometry = createCoffeeBagGeometry(3.1, 40, 24, 12, 24);
    const bagMesh = new THREE.Mesh(bagGeometry, [
      frontMat,
      rightMat,
      backMat,
      leftMat,
      topSealMat,
      bottomMat,
    ]);
    bagMesh.position.y = -0.05;
    bagGroup.add(bagMesh);
    bagMeshRef.current = bagMesh;

    // 8. Ground Contact Shadow Mesh
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    sCtx.clearRect(0, 0, 256, 256);
    const sGrad = sCtx.createRadialGradient(128, 128, 0, 128, 128, 120);
    sGrad.addColorStop(0, 'rgba(20, 35, 30, 0.42)');
    sGrad.addColorStop(0.35, 'rgba(20, 35, 30, 0.20)');
    sGrad.addColorStop(0.70, 'rgba(20, 35, 30, 0.05)');
    sGrad.addColorStop(1, 'rgba(20, 35, 30, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.6, 2.0);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.605;
    scene.add(shadowMesh);
    shadowMeshRef.current = shadowMesh;

    // 10. Animation Loop
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const rot = rotRef.current;

      // Handle auto-rotation: infinite loop circular playing
      if (rot.autoRotate && !rot.isDragging) {
        rot.targetY += 0.0075;
      }

      // Smooth damping interpolation (lerp)
      const lerpFactor = 0.085;
      rot.currentY += (rot.targetY - rot.currentY) * lerpFactor;
      rot.currentX += (rot.targetX - rot.currentX) * lerpFactor;

      // Add gentle hover parallax when not actively dragging
      const hoverTiltX = rot.hoverY * 0.04;
      const hoverTiltY = rot.hoverX * 0.06;

      bagGroup.rotation.y = rot.currentY + hoverTiltY;
      bagGroup.rotation.x = rot.currentX + hoverTiltX;

      // Floating gentle breathing bob with subtle amplitude
      const bob = Math.sin(currentTime * 0.0016) * 0.015;
      bagMesh.position.y = -0.05 + bob;

      // Shadow breathing
      if (shadowMeshRef.current) {
        shadowMeshRef.current.scale.set(1 - bob * 0.3, 1 - bob * 0.3, 1);
        shadowMeshRef.current.position.y = -1.605;
      }

      // Render Scene
      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Resize Handler with responsive aspect camera update
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth || 360;
      height = container.clientHeight || 550;
      camera.aspect = width / height;
      updateCameraPosition(camera.aspect);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js assets
      bagGeometry.dispose();
      frontTex.dispose();
      backTex.dispose();
      gussetRightTex.dispose();
      gussetLeftTex.dispose();
      topSealTex.dispose();
      bottomTex.dispose();
      normalTex.dispose();
      shadowTex.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();

      frontMat.dispose();
      rightMat.dispose();
      backMat.dispose();
      leftMat.dispose();
      topSealMat.dispose();
      bottomMat.dispose();

      renderer.dispose();
    };
  }, []);

  // Mouse & Touch Interaction Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    rotRef.current.isDragging = true;
    rotRef.current.prevX = e.clientX;
    rotRef.current.prevY = e.clientY;
    pointerDownRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rot = rotRef.current;
    if (rot.isDragging) {
      const deltaX = e.clientX - rot.prevX;
      const deltaY = e.clientY - rot.prevY;
      rot.prevX = e.clientX;
      rot.prevY = e.clientY;

      // Sensitivity tuned for silky rotation
      rot.targetY += deltaX * 0.012;
      rot.targetX += deltaY * 0.008;

      // Clamp vertical pitch tilt to elegant range so bag always stays within viewport boundaries
      rot.targetX = Math.max(-0.20, Math.min(0.20, rot.targetX));

      // Pause auto-rotate when manually dragging
      const dist = Math.hypot(e.clientX - pointerDownRef.current.x, e.clientY - pointerDownRef.current.y);
      if (dist > 8 && rotRef.current.autoRotate) {
        setAutoRotate(false);
      }
    } else if (containerRef.current) {
      // Subtle hover parallax
      const rect = containerRef.current.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      rot.hoverX = nx;
      rot.hoverY = ny;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    rotRef.current.isDragging = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture was already released
    }

    // Direct Tap Detection on 3D Model: if clicked without dragging (<8px delta, <450ms)
    const dist = Math.hypot(e.clientX - pointerDownRef.current.x, e.clientY - pointerDownRef.current.y);
    const duration = Date.now() - pointerDownRef.current.time;

    if (dist < 8 && duration < 450 && containerRef.current && cameraRef.current && bagMeshRef.current) {
      // Toggle play / pause on direct tap of the pouch
      setAutoRotate(prev => !prev);
    }
  };

  const handlePointerLeave = () => {
    rotRef.current.isDragging = false;
    rotRef.current.hoverX = 0;
    rotRef.current.hoverY = 0;
  };

  return (
    <div className="packet-showcase-wrapper">
      {/* Interactive Controls Bar: Flip 180° & Play/Pause */}
      <div className="packet-controls-bar">
        <button
          type="button"
          className="packet-toggle-btn"
          onClick={flip180}
          title="Flip pouch 180°"
        >
          <RotateCcw size={15} /> Flip 180°
        </button>

        <button
          type="button"
          className={`packet-toggle-btn btn-icon-only ${autoRotate ? 'active' : ''}`}
          onClick={() => setAutoRotate(!autoRotate)}
          title={autoRotate ? 'Pause 360° circular loop' : 'Play 360° infinite circular loop'}
          aria-label="Auto-rotate toggle"
        >
          {autoRotate ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>

      {/* 3D WebGL Canvas Scene Container */}
      <div
        className="packet-scene three-scene-container"
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        style={{ touchAction: 'none' }}
      >
        <canvas ref={canvasRef} className="three-bag-canvas" />
      </div>

      {/* Interactive Drag & Tilt Hint */}
      <div className="packet-interaction-hint">
        <span>
          {autoRotate
            ? '360° Infinite Loop Playing • Drag to explore • Tap Flip 180° or Pause'
            : 'Paused • Drag to explore • Tap Play to resume loop'}
        </span>
      </div>
    </div>
  );
};

export default CoffeePacket3D;
