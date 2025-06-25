import { CameraControls, Environment, ContactShadows, Float } from "@react-three/drei";
import { useEffect, useRef } from "react";
import Avatar from "./Avatar";

export default function Scenario() {
  const cameraControls = useRef();
  
  useEffect(() => {
    // Position camera to better frame the avatar
    cameraControls.current.setLookAt(0, 2, 6, 0, 1, 0, true);
  }, []);

  return (
    <>
      {/* Camera Controls */}
      <CameraControls ref={cameraControls} />
      
      {/* Lighting Setup */}
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />
      <spotLight
        position={[0, 10, 2]}
        intensity={0.5}
        angle={0.3}
        penumbra={1}
        castShadow
      />
      
      {/* Avatar with floating animation */}
      <Float
        speed={2} // Animation speed
        rotationIntensity={0.1} // XYZ rotation intensity
        floatIntensity={0.2} // Up/down float intensity
      >
        <Avatar scale={1.3} position={[0, -2, 0]} />
      </Float>
      
      {/* Ground shadows */}
      <ContactShadows
        position={[0, -3, 0]}
        opacity={0.3}
        scale={10}
        blur={2}
        far={3}
      />
      
      {/* Additional atmospheric lighting */}
      <pointLight position={[-2, 3, -2]} intensity={0.3} color="#8b5cf6" />
      <pointLight position={[2, 3, -2]} intensity={0.3} color="#ec4899" />
    </>
  );
} 