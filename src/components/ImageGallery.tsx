import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images: Array<{ url: string; prompt: string; id: string }>;
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<{ url: string; prompt: string } | null>(null);

  const handleDownload = (url: string, prompt: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `ai-generated-${prompt.slice(0, 30).replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (images.length === 0) return null;

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text">Your Creations</h2>
          <p className="text-muted-foreground text-lg">Click to view full size</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl cursor-pointer holographic p-1 hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={image.url}
                  alt={image.prompt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-sm text-foreground line-clamp-2">{image.prompt}</p>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 bg-background/95 border-primary/30">
            {selectedImage && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <img
                  src={selectedImage.url}
                  alt={selectedImage.prompt}
                  className="w-full h-auto rounded-lg"
                />
                <div className="p-6 space-y-4">
                  <p className="text-muted-foreground">{selectedImage.prompt}</p>
                  <Button
                    onClick={() => handleDownload(selectedImage.url, selectedImage.prompt)}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-all"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Image
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
