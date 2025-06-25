  {/* Centered avatar container – adjust height as needed */}
  <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
    <div className="fixed top-8 right-15 w-[300px] h-[300px]">
      <Canvas shadows camera={{ position: [0, -0/9, -0.9], fov: 10 }}>
        <Scenario />
      </Canvas>
    </div>
  </div> 