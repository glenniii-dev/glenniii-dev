// "use client";

// import { useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { useGLTF, Float, Environment, Lightformer } from "@react-three/drei";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";

// // -------------- Planet Component --------------
// export function Planet(props: any) {
//   const shapeContainer = useRef<THREE.Group>(null);
//   const spheresContainer = useRef<THREE.Group>(null);
//   const ringContainer = useRef<THREE.Mesh>(null);
//   const { nodes, materials } = useGLTF("/Planet.glb") as any;

//   useGSAP(() => {
//     const tl = gsap.timeline();

//     tl.from(shapeContainer.current!.position, {
//       y: 5,
//       duration: 3,
//       ease: "circ.out",
//     });

//     tl.from(
//       spheresContainer.current!.rotation,
//       {
//         x: 0,
//         y: Math.PI,
//         z: -Math.PI,
//         duration: 10,
//         ease: "power1.inOut",
//       },
//       "-=25%"
//     );

//     tl.from(
//       ringContainer.current!.rotation,
//       {
//         x: 0.8,
//         y: 0,
//         z: 0,
//         duration: 10,
//         ease: "power1.inOut",
//       },
//       "<"
//     );
//   }, []);

//   return (
//     <group ref={shapeContainer} {...props} dispose={null}>
//       <group ref={spheresContainer}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Sphere.geometry}
//           material={materials["Material.002"]}
//           rotation={[0, 0, 0.741]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Sphere2.geometry}
//           material={materials["Material.001"]}
//           position={[0.647, 1.03, -0.724]}
//           rotation={[0, 0, 0.741]}
//           scale={0.223}
//         />
//       </group>
//       <mesh
//         ref={ringContainer}
//         castShadow
//         receiveShadow
//         geometry={nodes.Ring.geometry}
//         material={materials["Material.001"]}
//         rotation={[-0.124, 0.123, -0.778]}
//         scale={2}
//       />
//     </group>
//   );
// }

// useGLTF.preload("/models/Planet.glb");

// // -------------- Planet Section --------------
// export default function PlanetSection() {
//   const isMobile =
//     typeof window !== "undefined" ? window.innerWidth < 768 : false;

//   const text =
//     "Creative developer specializing in interactive 3D experiences and web animation.";

//   return (
//     <section id="home" className="relative flex flex-col justify-end">
//       <figure
//         className="absolute inset-0 -z-10"
//         style={{ width: "40vw", height: "40vh" }}
//       >
//         <Canvas
//           shadows
//           camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
//         >
//           <ambientLight intensity={0.5} />
//           <Float speed={0.5}>
//             <Planet scale={isMobile ? 0.7 : 1} />
//           </Float>

//           <Environment resolution={256}>
//             <group rotation={[-Math.PI / 3, 4, 1]}>
//               <Lightformer
//                 form="circle"
//                 intensity={2}
//                 position={[0, 5, -9]}
//                 scale={10}
//               />
//               <Lightformer
//                 form="circle"
//                 intensity={2}
//                 position={[0, 3, 1]}
//                 scale={10}
//               />
//               <Lightformer
//                 form="circle"
//                 intensity={2}
//                 position={[-5, -1, -1]}
//                 scale={10}
//               />
//               <Lightformer
//                 form="circle"
//                 intensity={2}
//                 position={[10, 1, 0]}
//                 scale={16}
//               />
//             </group>
//           </Environment>
//         </Canvas>
//       </figure>
//     </section>
//   );
// }
