'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroParallax({ imageUrl, children }: { imageUrl: string; children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative mx-4 mt-4 lg:mx-8 lg:mt-6 rounded-3xl overflow-hidden shadow-2xl border border-stone-800/20 min-h-[520px] lg:min-h-[600px] flex items-center">
      <motion.div style={{ y }} className="absolute inset-0 scale-110" aria-hidden>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${imageUrl}')` }} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-900/30" />
      <motion.div style={{ opacity }} className="relative z-10 w-full">
        {children}
      </motion.div>
    </section>
  );
}
