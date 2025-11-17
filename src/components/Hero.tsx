import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import gsap from "gsap";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.075;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

interface HeroProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export function Hero({ onGenerate, isGenerating }: HeroProps) {
  const [prompt, setPrompt] = useState("");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    if (titleRef.current) {
      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out"
      });
    }

    if (subtitleRef.current) {
      tl.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5");
    }

    if (panelRef.current) {
      tl.from(panelRef.current, {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.4");
    }
  }, []);

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-10 gradient-animate opacity-30" />

      {/* Content */}
      <div className="container px-4 py-20 z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Title */}
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold neon-text"
            style={{
              background: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Create Stunning AI Images & Videos Instantly
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground"
          >
            Your imagination. AI brings it to life. Real-time. Unlimited.
          </p>

          {/* Prompt Panel */}
          <div
            ref={panelRef}
            className="holographic p-6 rounded-2xl space-y-4 glow-pulse max-w-2xl mx-auto"
          >
            <Textarea
              placeholder="Describe your vision... (e.g., 'A futuristic city at sunset with flying cars')"
              className="min-h-[120px] bg-background/50 border-primary/30 focus:border-primary resize-none text-lg"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
            />
            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:scale-105 transition-all duration-300 text-white font-semibold text-lg h-14 shadow-lg hover:shadow-primary/50"
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⚡</span>
                  Generating Magic...
                </span>
              ) : (
                "Generate Now"
              )}
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12 float-animation">
            <div className="inline-flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-sm">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
                <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
