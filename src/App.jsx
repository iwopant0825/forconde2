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
  const [color, setColor] = React.useState("black");
  const [targetColor, setTargetColor] = React.useState("black");

  const handleDivClick = (newColor) => {
    setTargetColor(newColor);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setColor((prevColor) => {
        const prev = new THREE.Color(prevColor);
        const target = new THREE.Color(targetColor);
        return prev.lerp(target, 0.1).getStyle();
      });
    }, 100);
    return () => clearInterval(interval);
  }, [targetColor]);

  return (
    <>
      <Canvas shadows>
        <color attach={"background"} args={["white"]} />
        <MovingLight position={test} />
        <ambientLight intensity={2} />
        <RotatingTorus color={color} />
        <OrbitControls />
        <Textcomponents color={color} />
        <Html fullscreen>
          <div style={{width:'100%',display:'flex',height:'100dvh',flexDirection:'column',justifyContent:'space-between'}}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div
                style={{
                  flex: "1 1 100px",
                  height: "100px",
                  backgroundColor: "red",
                }}
                onClick={() => handleDivClick("red")}
              />
              <div
                style={{
                  flex: "1 1 100px",
                  height: "100px",
                  backgroundColor: "blue",
                }}
                onClick={() => handleDivClick("blue")}
              />
              <div
                style={{
                  flex: "1 1 100px",
                  height: "100px",
                  backgroundColor: "green",
                }}
                onClick={() => handleDivClick("green")}
              />
              <div
                style={{
                  flex: "1 1 100px",
                  height: "100px",
                  backgroundColor: "black",
                }}
                onClick={() => handleDivClick("black")}
              />
            </div>
            <div style={{display:'flex',textAlign:'center',width:'100%',alignItems:'center',justifyContent:'center'}}>
              <span style={{fontSize:'calc(2vw + 1vh)',textAlign:'center'}}>Inspired by Lumecho
              </span>
            </div>
          </div>
        </Html>
      </Canvas>
    </>
  );
}

function MovingLight({ position }) {
  const lightRef = React.useRef();
  useFrame(({ mouse }) => {
    if (lightRef.current) {
      lightRef.current.position.x = mouse.x * 10;
      lightRef.current.position.y = mouse.y * 10;
    }
  });
  return (
    <>
      <pointLight
        ref={lightRef}
        position={position}
        intensity={30}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
}

function RotatingTorus({ color }) {
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
      scale={viewport.width > 8 ? viewport.width * 0.06 : viewport.width * 0.2}
    >
      <meshLambertMaterial color={color} wireframe />
    </Torus>
  );
}

function Textcomponents({ color }) {
  const { viewport } = useThree();
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
  return (
    <>
      <Text
        position={[0, 0, 0]}
        color={color}
        fontSize={
          viewport.width > 8 ? viewport.width * 0.15 : viewport.width * 0.2
        }
        font={"/font/PlayfairDisplay-Bold.ttf"}
        receiveShadow
      >
        <meshStandardMaterial attach="material" />
        LIGHT
      </Text>
    </>
  );
}

export default App;
