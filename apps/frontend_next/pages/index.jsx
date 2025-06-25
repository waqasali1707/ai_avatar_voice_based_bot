import dynamic from "next/dynamic";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import ChatInterface from "../components/ChatInterface";
import Scenario from "../components/Scenario";

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Loader */}
      <Loader />
      
      {/* Development controls */}
      <Leva collapsed hidden />
      
      {/* Main 3D Canvas - Full screen with avatar prominently displayed */}
      <div className="absolute inset-0 z-10">
        <Canvas 
          shadows 
          camera={{ position: [0, 2, 8], fov: 30 }}
          className="w-full h-full"
        >
          <Scenario />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <ChatInterface />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>
    </div>
  );
} 