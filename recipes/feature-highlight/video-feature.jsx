/**
 * @metadata
 * name: Video Feature
 * category: feature-highlight
 * KEEP: Feature explained via video embed + supporting text alongside,
 *       split layout, play button overlay, description text
 * CHANGE: Video URL, feature text, layout direction
 * DON'T: Remove video, make text-only, drop supporting text
 */

import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport } from '../lib';

export default function VideoFeature({ business, copy }) {
  const [ref, inView] = useInViewport();

  return (
    <Section id="feature-video" spacing="generous">
      <Container maxWidth="lg">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Video */}
          <motion.div
            className="rounded-2xl overflow-hidden aspect-video bg-black relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            {copy?.videoUrl ? (
              <iframe
                src={copy.videoUrl}
                className="w-full h-full"
                title="Feature video"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            )}
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-3 block">
              {copy?.label || 'See It In Action'}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary leading-tight">
              {copy?.headline}
            </h2>
            <p className="mt-4 font-body text-base text-muted leading-relaxed">
              {copy?.description}
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
