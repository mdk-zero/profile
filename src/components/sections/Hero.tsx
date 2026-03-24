"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Github, Linkedin, Twitter, Download } from "lucide-react";
import { FaFacebookF } from "react-icons/fa";
import { motion, useScroll, useTransform } from "motion/react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function InteractiveShape({ position, scale, geometry, color }: { position: [number, number, number]; scale: number; geometry: string; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const posRef = useRef(new THREE.Vector3(...position));
  const velocityRef = useRef(new THREE.Vector3());
  const targetRef = useRef(new THREE.Vector3(...position));
  const draggingRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const prevPosRef = useRef(new THREE.Vector3(...position));
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      if (draggingRef.current) {
        const mouse = state.pointer;
        targetRef.current.set(mouse.x * 5, mouse.y * 3, position[2]);
        
        velocityRef.current.x = (targetRef.current.x - posRef.current.x) * 8;
        velocityRef.current.y = (targetRef.current.y - posRef.current.y) * 8;
      } else {
        velocityRef.current.x *= 0.92;
        velocityRef.current.y *= 0.92;
        velocityRef.current.z *= 0.92;
      }
      
      posRef.current.x += velocityRef.current.x * delta;
      posRef.current.y += velocityRef.current.y * delta;
      
      meshRef.current.position.copy(posRef.current);
      
      const velMag = velocityRef.current.length();
      meshRef.current.rotation.x += velocityRef.current.y * 0.5;
      meshRef.current.rotation.y += velocityRef.current.x * 0.5;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1 + velMag * 0.2;
      
      const targetScale = hovered ? scale * 1.3 : scale;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      prevPosRef.current.copy(posRef.current);
    }
  });

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    draggingRef.current = true;
    pointerIdRef.current = e.pointerId;
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    draggingRef.current = false;
    if (pointerIdRef.current !== null) {
      (e.target as Element).releasePointerCapture(pointerIdRef.current);
      pointerIdRef.current = null;
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh
        ref={meshRef}
        position={position}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => { setHovered(false); draggingRef.current = false; }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {geometry === "cylinder" && <cylinderGeometry args={[0.6, 0.6, 1, 32]} />}
        {geometry === "cube" && <boxGeometry args={[1.2, 1.2, 1.2]} />}
        {geometry === "pyramid" && <coneGeometry args={[1, 1.5, 4]} />}
        {geometry === "polygon" && <icosahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
        />
      </mesh>
    </Float>
  );
}

function ShapeCluster({ positions }: { positions: { x: number; y: number; z: number; scale: number; geometry: string; color: string }[] }) {
  return (
    <group>
      {positions.map((pos, i) => (
        <InteractiveShape
          key={i}
          position={[pos.x, pos.y, pos.z]}
          scale={pos.scale}
          geometry={pos.geometry}
          color={pos.color}
        />
      ))}
    </group>
  );
}

const shapePositions = [
  { x: -3.5, y: 1.5, z: 0, scale: 0.6, geometry: "cylinder", color: "#8b5cf6" },
  { x: -4, y: -1.5, z: 0, scale: 0.5, geometry: "cube", color: "#6366f1" },
  { x: 3.5, y: 1, z: 0, scale: 0.55, geometry: "polygon", color: "#a78bfa" },
  { x: 4, y: -2, z: 0, scale: 0.45, geometry: "pyramid", color: "#7c3aed" },
];

function ParallaxPolygons() {
  return (
    <group>
      <ShapeCluster positions={shapePositions} />
    </group>
  );
}

const roles = [
  "Full-Stack Developer",
  "UI/UX Designer",
  "Problem Solver",
  "Fast Learner",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Parallax transforms
  const blob1Y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const blob2Y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const tick = useCallback(() => {
    const current = roles[roleIndex];

    if (typing) {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 70);
      } else {
        timeoutRef.current = setTimeout(() => {
          setTyping(false);
        }, 1000);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 40);
      } else {
        timeoutRef.current = setTimeout(() => {
          setRoleIndex((i) => (i + 1) % roles.length);
          setTyping(true);
        }, 300);
      }
    }
  }, [displayed, typing, roleIndex]);

  useEffect(() => {
    tick();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [tick]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left - rect.width / 2) / 20,
          y: (e.clientY - rect.top - rect.height / 2) / 20,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 lg:items-start lg:justify-center"
      style={{ background: "var(--p-bg)" }}
    >
      {/* Animated background blobs with parallax */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.4), transparent 70%)",
          opacity: "var(--p-blob-opacity)",
          y: blob1Y,
          x: mousePos.x,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(79, 70, 229, 0.4), transparent 70%)",
          opacity: "calc(var(--p-blob-opacity) * 0.75)",
          y: blob2Y,
          x: -mousePos.x,
        }}
      />

      {/* Third floating blob */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent 70%)",
          opacity: "calc(var(--p-blob-opacity) * 0.5)",
          x: mousePos.x * 0.5,
          y: mousePos.y * 0.5,
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(var(--p-grid-color) 1px, transparent 1px), 
            linear-gradient(90deg, var(--p-grid-color) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: "var(--p-grid-opacity)",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {useMemo(() =>
          Array.from({ length: 30 }).map((_, i) => {
            const seed = i * 137.508;
            const left = (seed % 100);
            const top = ((seed * 1.618) % 100);
            const opacity = 0.4 + (i % 4) * 0.12;
            const duration = 4 + (i % 4);
            const delay = i % 3;
            const moveX = 10 + (i % 3) * 8;
            const size = 1 + (i % 3) * 0.5;
            const colors = [
              "var(--p-accent)",
              "#8b5cf6",
              "#a78bfa",
              "#6366f1",
            ];
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  background: colors[i % colors.length],
                  boxShadow: `0 0 ${4 + (i % 4) * 2}px ${colors[i % colors.length]}`,
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, moveX, -moveX / 2, moveX / 3, 0],
                  opacity: [opacity, Math.min(opacity * 1.8, 1), opacity],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut",
                }}
              />
            );
          }), [])
        }
      </div>

      {/* 3D Parallax Polygons */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          style={{ pointerEvents: "auto", cursor: "pointer" }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <ParallaxPolygons />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Main content with parallax */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Animated gradient text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 800,
            color: "var(--p-text)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            transition: "color 0.3s",
          }}
        >
          Hi, I&apos;m{" "}
          <motion.span
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #6366f1, #a78bfa, #8b5cf6)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            Linux Adona
          </motion.span>
        </motion.h1>

        {/* Typing animation with cursor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 h-12 flex items-center justify-center"
          style={{ fontSize: "clamp(1.2rem, 3vw, 1.75rem)", color: "var(--p-text-secondary)", transition: "color 0.3s" }}
        >
          <span>{displayed}</span>
          <motion.span
            className="ml-1 w-0.5 h-8 inline-block"
            style={{ background: "var(--p-accent)" }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 max-w-xl mx-auto"
          style={{ color: "var(--p-text-muted)", lineHeight: 1.8, fontSize: "1rem", transition: "color 0.3s" }}
        >
          I can develop high quality web applications with the help of my skills in designing and developing.
          Coding is not just a profession for me, it's my passion.
        </motion.p>

        {/* Animated buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <motion.button
            onClick={() => {
              const el = document.getElementById("projects");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-7 py-3.5 rounded-xl text-white transition-all duration-300 relative overflow-hidden group cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              boxShadow: "0 0 30px var(--p-accent-glow)",
              fontSize: "0.9rem",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px var(--p-accent-glow)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View My Work</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>

          <motion.button
            className="px-7 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 relative overflow-hidden group cursor-pointer"
            style={{
              background: "var(--p-bg-card)",
              border: "1px solid var(--p-border)",
              color: "var(--p-text)",
              fontSize: "0.9rem",
            }}
            whileHover={{ scale: 1.05, borderColor: "var(--p-accent-border)" }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-4 h-4" />
            <span className="relative z-10">Download CV</span>
          </motion.button>
        </motion.div>

        {/* Social links with stagger animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: 0.1 }}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: FaFacebookF, href: "https://www.facebook.com/Linux.Sale.Adona", label: "Facebook" },
            { icon: Github, href: "https://www.github.com/itslinxad/", label: "GitHub" },
          ].map(({ icon: Icon, href, label }, index) => (
            <motion.a
              key={label}
              href={href}
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: "var(--p-bg-card)",
                border: "1px solid var(--p-border)",
                color: "var(--p-text-secondary)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, delay: 0 + index * 0.1 }}
              whileHover={{
                scale: 1.1,
                borderColor: "var(--p-accent-border)",
                color: "var(--p-accent)",
                boxShadow: "0 0 10px var(--p-accent-glow)",
                transition: { type: "spring", stiffness: 200, damping: 20 }
              }}
            >
              <Icon className="w-4 h-4" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
