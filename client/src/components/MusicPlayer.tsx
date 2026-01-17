import { motion, AnimatePresence } from "framer-motion";
import { Music2, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function MusicPlayer({ isPlaying, onToggle }: MusicPlayerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <button
        onClick={onToggle}
        className={cn(
          "relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center",
          "bg-white/80 backdrop-blur-sm border border-primary/20 shadow-lg text-primary",
          "hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300",
          isPlaying && "animate-spin-slow"
        )}
      >
        <span className="sr-only">Toggle music</span>
        {isPlaying ? (
          <Music2 className="w-5 h-5 md:w-6 md:h-6" />
        ) : (
          <div className="relative">
             <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
             <Play className="w-5 h-5 md:w-6 md:h-6 ml-0.5" />
          </div>
        )}
      </button>
      
      {/* Decorative ripples when playing */}
      <AnimatePresence>
        {isPlaying && (
          <>
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                className="absolute inset-0 rounded-full border border-primary/30 pointer-events-none"
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
