import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CallToAction() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-animate opacity-20" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full float-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold neon-text">
            Start Creating Now
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of creators bringing their imagination to life with AI. 
            Free access to unlimited generation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              onClick={scrollToTop}
              size="lg"
              className="bg-gradient-to-r from-primary via-secondary to-accent hover:scale-110 transition-all duration-300 text-white font-semibold text-lg h-14 px-8 shadow-2xl shadow-primary/50 group"
            >
              Generate Your First Image
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 hover:bg-primary/10 hover:scale-105 transition-all duration-300 text-lg h-14 px-8"
            >
              Learn More
            </Button>
          </div>

          <div className="pt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Free Access</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-secondary">∞</div>
              <div className="text-sm text-muted-foreground">Unlimited</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent">&lt; 5s</div>
              <div className="text-sm text-muted-foreground">Generation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
