import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  Box,
  Html,
  OrbitControls,
  Sphere,
  Text,
  Torus,
} from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import React from "react";

function App() {
  const test = [1, 1, 1];
  return (
    <>
      <Canvas shadows>
        {/* <Sphere scale={0.2} position={test} /> */}
        <directionalLight
          position={test}
          intensity={10} // 빛의 강도를 낮춤
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <ambientLight intensity={10} />
        <RotatingTorus />
        <OrbitControls />
        <Textcomponents />
      </Canvas>
    </>
  );
}

function RotatingTorus() {
  const { viewport } = useThree();
  const torusRef = React.useRef();
  useFrame(() => {
    if (torusRef.current) {
      torusRef.current.rotation.z += 0.005;
    }
  });
  return (
    <Torus
      ref={torusRef}
      rotation={[-1, 0.4, 0]}
      position={[0.3, 0.3, 0]}
      args={[2.7, 0.4, 13, 16]}
      scale={viewport.width > 8? viewport.width * 0.06:viewport.width * 0.2}
    >
      <meshLambertMaterial color={"black"} wireframe />
    </Torus>
  );
}

function Textcomponents() {
  const { viewport } = useThree();
  if (viewport.width > 6) {
    useFrame(({ mouse, camera }) => {
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        mouse.x * 1,
        0.03
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        mouse.y * 1,
        0.01
      );
      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        Math.max(4, Math.abs(mouse.x * mouse.y * 4)),
        0.01
      );
      camera.rotation.y = THREE.MathUtils.lerp(
        camera.rotation.y,
        mouse.x * -Math.PI * 0.025,
        0.001
      );
    });
  }
  return (
    <>
      <Text
        position={[0, 0, 0]}
        color={"black"}
        fontSize={viewport.width > 8? viewport.width * 0.15:viewport.width * 0.2}
        font={"/font/PlayfairDisplay-Bold.ttf"}
      >
        LIGHT
      </Text>
    </>
  );
}

export default App;
