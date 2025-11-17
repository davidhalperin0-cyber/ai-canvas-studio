import { useState } from "react";
import { Hero } from "@/components/Hero";
import { ImageGallery } from "@/components/ImageGallery";
import { FeatureCards } from "@/components/FeatureCards";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GeneratedImage {
  url: string;
  prompt: string;
  id: string;
}

const Index = () => {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    
    try {
      toast.info("Generating your image...", {
        description: "This may take a few seconds"
      });

      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt }
      });

      if (error) {
        console.error('Function error:', error);
        throw error;
      }

      if (data?.imageUrl) {
        const newImage: GeneratedImage = {
          url: data.imageUrl,
          prompt,
          id: `${Date.now()}-${Math.random()}`
        };
        
        setImages(prev => [newImage, ...prev]);
        
        toast.success("Image generated successfully!", {
          description: "Your creation is ready"
        });

        // Smooth scroll to gallery
        setTimeout(() => {
          const gallery = document.querySelector('[data-gallery]');
          if (gallery) {
            gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        throw new Error('No image URL returned');
      }
    } catch (error: any) {
      console.error('Generation error:', error);
      
      if (error.message?.includes('429')) {
        toast.error("Rate limit exceeded", {
          description: "Please try again in a moment"
        });
      } else if (error.message?.includes('402')) {
        toast.error("Credits required", {
          description: "Please add credits to your workspace"
        });
      } else {
        toast.error("Failed to generate image", {
          description: "Please try again"
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero onGenerate={handleGenerate} isGenerating={isGenerating} />
      
      <div data-gallery>
        <ImageGallery images={images} />
      </div>
      
      <FeatureCards />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
