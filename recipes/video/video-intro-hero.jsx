/**
 * @metadata
 * name: Video Intro Hero
 * category: video
 * KEEP: Intro video with play button overlay, large centered video area,
 *       hero-weight section, thumbnail image behind play button
 * CHANGE: Video URL, thumbnail image, heading
 * DON'T: Remove play button, make small, drop hero sizing
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { Section, Container, OakImage } from '../lib';

export default function VideoIntroHero({ business, copy, images }) {
  const [playing, setPlaying] = useState(false);

  return (
    <Section id="intro-video" weight="hero" spacing="hero" animate="none" className="bg-black">
      <Container maxWidth="xl" className="flex items-center justify-center min-h-screen py-20">
        <div className="w-full max-w-4xl">
          {copy?.heading && (
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-white text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {copy.heading}
            </motion.h2>
          )}

          <motion.div
            className="rounded-2xl overflow-hidden aspect-video relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {playing && copy?.videoUrl ? (
              <iframe src={copy.videoUrl} className="w-full h-full" title="Intro Video" allowFullScreen />
            ) : (
              <button onClick={() => setPlaying(true)} className="w-full h-full relative block">
                <OakImage src={images?.thumbnail || images?.hero} alt="Video thumbnail" className="w-full h-full" loading="eager" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-black ml-1" />
                  </div>
                </div>
              </button>
            )}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
