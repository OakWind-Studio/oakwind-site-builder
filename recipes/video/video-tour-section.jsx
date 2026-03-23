/**
 * @metadata
 * name: Video Tour Section
 * category: video
 * KEEP: Video tour embed with description alongside, split layout,
 *       iframe or play button placeholder, tour-focused messaging
 * CHANGE: Video URL, description text, layout
 * DON'T: Remove video element, make text-only, drop description
 */

import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function VideoTourSection({ business, copy }) {
  const [ref, inView] = useInViewport();

  return (
    <Section id="video-tour" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Take a Tour'}
        </motion.h2>
        <motion.p
          className="font-body text-muted text-center max-w-lg mx-auto mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {copy?.subtext}
        </motion.p>

        <motion.div
          ref={ref}
          className="rounded-2xl overflow-hidden aspect-video bg-black relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {copy?.videoUrl ? (
            <iframe src={copy.videoUrl} className="w-full h-full" title="Video Tour" allowFullScreen />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                <Play className="w-10 h-10 text-white ml-1" />
              </div>
            </div>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
