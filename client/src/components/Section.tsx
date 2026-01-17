import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export function Section({ children, className, id, delay = 0 }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={cn("py-16 md:py-24 px-4 md:px-8 relative", className)}
    >
      {children}
    </motion.section>
  );
}

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      {subtitle && (
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-script text-3xl md:text-4xl text-primary block mb-3"
        >
          {subtitle}
        </motion.span>
      )}
      <h2 className="text-3xl md:text-5xl font-bold text-foreground uppercase tracking-widest relative inline-block pb-4">
        {title}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary/30 rounded-full" />
      </h2>
    </div>
  );
}
