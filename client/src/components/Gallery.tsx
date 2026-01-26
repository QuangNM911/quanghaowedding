import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ASSET_BASE_URL = import.meta.env.BASE_URL;
const photos = [
  // Wedding couple walking in forest
  `${ASSET_BASE_URL}images/anhcuoi-01.webp`,
  // Close up of holding hands with rings
  `${ASSET_BASE_URL}images/anhcuoi-02.webp`,
  // Couple laughing together
  `${ASSET_BASE_URL}images/anhcuoi-03.webp`,
  // Bride portrait
  `${ASSET_BASE_URL}images/anhcuoi-04.webp`,
  // Wedding decorations/flowers
  `${ASSET_BASE_URL}images/anhcuoi-05.webp`,
  // Groom portrait
  `${ASSET_BASE_URL}images/anhcuoi-06.webp`,
];

export function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + photos.length) % photos.length);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="aspect-[3/4] overflow-hidden rounded-xl cursor-zoom-in group relative"
            onClick={() => setSelectedIdx(idx)}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10" />
            <img 
              src={src} 
              alt="Wedding moment" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <button 
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
              onClick={() => setSelectedIdx(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
              onClick={prevPhoto}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
              onClick={nextPhoto}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.img
              key={selectedIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={photos[selectedIdx]}
              alt="Full screen view"
              decoding="async"
              className="max-h-[85vh] max-w-full rounded shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
