import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  createCoffeeBagGeometry,
  createDegassingValveMesh,
} from './coffeeBag3D/bagGeometry';
import {
  createFrontTexture,
  createBackTexture,
  createGussetTexture,
  createTopSealTexture,
  createBottomTexture,
  createBagNormalTexture,
} from './coffeeBag3D/bagTextures';
import { HOTSPOTS_3D, type Hotspot3D } from './coffeeBag3D/bagHotspots';
import {
  RotateCcw,
  Sparkles,
  Eye,
  Info,
  Compass,
  Play,
  Pause,
} from 'lucide-react';
import './CoffeePacket3D.css';

interface ProjectedHotspot extends Hotspot3D {
  screenX: number;
  screenY: number;
  visible: boolean;
}

export const CoffeePacket3D: React.FC<{
  onRequestSample?: () => void;
}> = ({ onRequestSample }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [activeHotspot, setActiveHotspot] = useState<Hotspot3D | null>(null);
  const [activeView, setActiveView] = useState<'front' | 'back' | 'side'>('front');
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [projectedHotspots, setProjectedHotspots] = useState<ProjectedHotspot[]>([]);

  // Three.js instances stored in refs so they persist across re-renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const bagMeshRef = useRef<THREE.Mesh | null>(null);
  const bagGroupRef = useRef<THREE.Group | null>(null);
  const shadowMeshRef = useRef<THREE.Mesh | null>(null);

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
    autoRotate: false,
  });

  // Keep autoRotate in sync with ref
  useEffect(() => {
    rotRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  // Smoothly rotate to predefined views using shortest-path rotation
  const setViewAngle = useCallback((view: 'front' | 'back' | 'side') => {
    setActiveView(view);
    setActiveHotspot(null);
    const twoPi = Math.PI * 2;
    const curY = rotRef.current.targetY;

    if (view === 'front') {
      const k = Math.round(curY / twoPi);
      rotRef.current.targetY = k * twoPi;
      rotRef.current.targetX = 0.05;
    } else if (view === 'back') {
      const k = Math.round((curY - Math.PI) / twoPi);
      rotRef.current.targetY = k * twoPi + Math.PI;
      rotRef.current.targetX = 0.05;
    } else if (view === 'side') {
      const k = Math.round((curY - Math.PI * 0.5) / twoPi);
      rotRef.current.targetY = k * twoPi + Math.PI * 0.5;
      rotRef.current.targetX = 0.05;
    }
  }, []);

  const flip180 = useCallback(() => {
    rotRef.current.targetY += Math.PI;
    setActiveHotspot(null);
    const twoPi = Math.PI * 2;
    const normY = ((rotRef.current.targetY % twoPi) + twoPi) % twoPi;
    if (normY < Math.PI * 0.5 || normY > Math.PI * 1.5) {
      setActiveView('front');
    } else {
      setActiveView('back');
    }
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

    // 2. Camera: 40 FOV gives natural telephoto product-shot perspective without wide-angle distortion
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0, 5.2);
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

    // 6. Textures & Materials
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    let frontTex = createFrontTexture(maxAnisotropy);
    let backTex = createBackTexture(maxAnisotropy);
    const rightGussetTex = createGussetTexture('THE ROAST ROOM • LUCKNOW', '100% ARABICA & ROBUSTA • FRESH ROAST', maxAnisotropy);
    const leftGussetTex = createGussetTexture('EVERY BEAN TELLS A STORY', 'CRAFT COFFEE ROASTERS • GOMTI NAGAR', maxAnisotropy);
    const topSealTex = createTopSealTexture();
    const bottomTex = createBottomTexture();
    const normalTex = createBagNormalTexture();

    // Material definitions for high-end matte laminated packaging
    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTex,
      bumpMap: normalTex,
      bumpScale: 0.003,
      roughness: 0.36,
      metalness: 0.08,
    });

    const rightMat = new THREE.MeshStandardMaterial({
      map: rightGussetTex,
      roughness: 0.40,
      metalness: 0.08,
    });

    const backMat = new THREE.MeshStandardMaterial({
      map: backTex,
      roughness: 0.38,
      metalness: 0.08,
    });

    const leftMat = new THREE.MeshStandardMaterial({
      map: leftGussetTex,
      roughness: 0.40,
      metalness: 0.08,
    });

    const topSealMat = new THREE.MeshStandardMaterial({
      map: topSealTex,
      roughness: 0.28,
      metalness: 0.22,
    });

    const bottomMat = new THREE.MeshStandardMaterial({
      map: bottomTex,
      roughness: 0.60,
      metalness: 0.05,
    });

    // Re-render textures once custom Google Fonts (Outfit & Plus Jakarta Sans) are ready
    if (document.fonts) {
      document.fonts.ready.then(() => {
        const newFront = createFrontTexture(maxAnisotropy);
        const newBack = createBackTexture(maxAnisotropy);
        frontMat.map = newFront;
        frontMat.needsUpdate = true;
        backMat.map = newBack;
        backMat.needsUpdate = true;
      });
    }

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
    bagMesh.position.y = 0.08;
    bagGroup.add(bagMesh);
    bagMeshRef.current = bagMesh;

    // 8. 3D Degassing Aroma Valve Mesh (attached directly to front surface)
    const valveGroup = createDegassingValveMesh();
    valveGroup.position.set(0, 0.42, 0.505);
    valveGroup.rotation.x = -0.06;
    bagMesh.add(valveGroup);

    // 9. Ground Contact Shadow Mesh
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const sGrad = sCtx.createRadialGradient(128, 128, 20, 128, 128, 110);
    sGrad.addColorStop(0, 'rgba(16, 36, 35, 0.45)');
    sGrad.addColorStop(0.5, 'rgba(16, 36, 35, 0.18)');
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.2, 1.8);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.55;
    scene.add(shadowMesh);
    shadowMeshRef.current = shadowMesh;

    // Vectors for hotspot calculations
    const tempVec = new THREE.Vector3();
    const tempNorm = new THREE.Vector3();
    const camDir = new THREE.Vector3();

    // 10. Animation Loop
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const rot = rotRef.current;

      // Handle auto-rotation
      if (rot.autoRotate && !rot.isDragging) {
        rot.targetY += 0.008;
      }

      // Smooth damping interpolation (lerp)
      const lerpFactor = 0.085;
      rot.currentY += (rot.targetY - rot.currentY) * lerpFactor;
      rot.currentX += (rot.targetX - rot.currentX) * lerpFactor;

      // Add gentle hover parallax when not actively dragging
      const hoverTiltX = rot.hoverY * 0.08;
      const hoverTiltY = rot.hoverX * 0.12;

      bagGroup.rotation.y = rot.currentY + hoverTiltY;
      bagGroup.rotation.x = rot.currentX + hoverTiltX;

      // Floating gentle breathing bob
      const bob = Math.sin(currentTime * 0.0016) * 0.035;
      bagMesh.position.y = 0.08 + bob;

      // Shadow breathing
      if (shadowMeshRef.current) {
        shadowMeshRef.current.scale.set(1 - bob * 0.4, 1 - bob * 0.4, 1);
        shadowMeshRef.current.position.y = -1.55;
      }

      // Project 3D Hotspots to 2D Screen
      camera.getWorldDirection(camDir);
      bagMesh.updateMatrixWorld(true);

      const projected: ProjectedHotspot[] = HOTSPOTS_3D.map((h) => {
        tempVec.copy(h.pos).applyMatrix4(bagMesh.matrixWorld);
        tempNorm.copy(h.normal).transformDirection(bagMesh.matrixWorld);

        // Facing test: is normal pointing towards the camera?
        const facing = tempNorm.dot(camDir) < -0.18;

        tempVec.project(camera);
        const screenX = ((tempVec.x + 1) / 2) * width;
        const screenY = ((-tempVec.y + 1) / 2) * height;

        return {
          ...h,
          screenX,
          screenY,
          visible: facing && tempVec.z < 1,
        };
      });

      setProjectedHotspots(projected);

      // Render Scene
      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth || 360;
      height = container.clientHeight || 540;
      camera.aspect = width / height;
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
      rightGussetTex.dispose();
      leftGussetTex.dispose();
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

      // Clamp vertical pitch tilt so user doesn't turn bag upside down
      rot.targetX = Math.max(-0.45, Math.min(0.45, rot.targetX));

      // Pause auto-rotate when manually interacting
      if (autoRotate) {
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
  };

  const handlePointerLeave = () => {
    rotRef.current.isDragging = false;
    rotRef.current.hoverX = 0;
    rotRef.current.hoverY = 0;
  };

  return (
    <div className="packet-showcase-wrapper">
      {/* Interactive Controls Bar */}
      <div className="packet-controls-bar">
        <button
          type="button"
          className={`packet-toggle-btn ${activeView === 'front' ? 'active' : ''}`}
          onClick={() => setViewAngle('front')}
          title="Align to Front View"
        >
          <Eye size={15} /> Front View
        </button>

        <button
          type="button"
          className={`packet-toggle-btn ${activeView === 'back' ? 'active' : ''}`}
          onClick={() => setViewAngle('back')}
          title="Align to Back & Origin Story"
        >
          <Info size={15} /> Back & Origin
        </button>

        <button
          type="button"
          className={`packet-toggle-btn ${activeView === 'side' ? 'active' : ''}`}
          onClick={() => setViewAngle('side')}
          title="Inspect Gusset Fold"
        >
          <Compass size={15} /> Side Gusset
        </button>

        <button
          type="button"
          className="packet-toggle-btn"
          onClick={flip180}
          title="Rotate pouch 180 degrees"
        >
          <RotateCcw size={15} /> Flip 180°
        </button>

        <button
          type="button"
          className={`packet-toggle-btn btn-icon-only ${autoRotate ? 'active' : ''}`}
          onClick={() => setAutoRotate(!autoRotate)}
          title={autoRotate ? 'Pause 360° rotation' : 'Start 360° auto-rotation'}
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

        {/* 3D Projected Hotspot Pins */}
        {projectedHotspots.map((h) => {
          if (!h.visible) return null;
          const isActive = activeHotspot?.id === h.id;

          return (
            <button
              key={h.id}
              type="button"
              className={`hotspot-pin three-hotspot-pin ${isActive ? 'active' : ''}`}
              style={{
                left: `${h.screenX}px`,
                top: `${h.screenY}px`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveHotspot(isActive ? null : h);
              }}
              title={h.title}
              aria-label={h.title}
            >
              <span className="pin-pulse" />
              <span className="pin-dot" />
            </button>
          );
        })}
      </div>

      {/* Active Hotspot Popover Tooltip */}
      {activeHotspot && (
        <div className="hotspot-detail-card">
          <div className="hotspot-detail-header">
            <Sparkles size={16} className="text-orange" />
            <strong>{activeHotspot.title}</strong>
            <button
              type="button"
              className="hotspot-close"
              onClick={() => setActiveHotspot(null)}
              aria-label="Close hotspot detail"
            >
              ×
            </button>
          </div>
          <p className="hotspot-detail-p">{activeHotspot.detail}</p>
          {onRequestSample && (
            <button
              type="button"
              className="btn-primary"
              style={{
                marginTop: '0.6rem',
                padding: '0.45rem 0.85rem',
                fontSize: '0.78rem',
                width: '100%',
              }}
              onClick={onRequestSample}
            >
              Request a sample of this roast
            </button>
          )}
        </div>
      )}

      {/* Interactive Drag & Tilt Hint */}
      <div className="packet-interaction-hint">
        <span>Drag to rotate 360° • Click pins to explore origin details</span>
      </div>
    </div>
  );
};

export default CoffeePacket3D;
