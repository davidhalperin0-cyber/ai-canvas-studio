import { Sparkles, Zap, Palette, Infinity, Lock, Wand2 } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Sparkles,
    title: "AI Image Generation",
    description: "Create stunning images from text prompts using cutting-edge AI models"
  },
  {
    icon: Zap,
    title: "Real-Time Preview",
    description: "See your creations come to life instantly with lightning-fast generation"
  },
  {
    icon: Palette,
    title: "Style Customization",
    description: "Choose from cinematic, realistic, anime, abstract and more artistic styles"
  },
  {
    icon: Infinity,
    title: "Unlimited Generation",
    description: "No limits on your creativity - generate as many images as you want"
  },
  {
    icon: Lock,
    title: "Free Access",
    description: "Powered by open-source models with no hidden costs or subscriptions"
  },
  {
    icon: Wand2,
    title: "Advanced AI",
    description: "State-of-the-art AI technology for professional-quality results"
  }
];

export function FeatureCards() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.feature-card');
      
      gsap.fromTo(
        cards,
        {
          y: 100,
          opacity: 0,
          rotateX: -15
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 gradient-animate opacity-10 -z-10" />
      
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to bring your imagination to life
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="feature-card holographic p-8 rounded-2xl group hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden"
                style={{ perspective: '1000px' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/50">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
