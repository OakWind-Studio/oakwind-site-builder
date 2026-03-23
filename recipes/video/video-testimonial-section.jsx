/**
 * @metadata
 * name: Video Testimonial Section
 * category: video
 * KEEP: Video review embed with quote text alongside, split layout,
 *       StarRating, reviewer name, video iframe/placeholder
 * CHANGE: Video URL, quote text, reviewer details
 * DON'T: Remove quote text, make video-only, drop rating
 */

import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { Section, Container, StarRating } from '../lib';
import { useInViewport } from '../lib';

export default function VideoTestimonialSection({ business, copy }) {
  const [ref, inView] = useInViewport();
  const review = copy?.review || {};

  return (
    <Section id="video-review" spacing="generous" bg="elevated">
      <Container maxWidth="lg">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Video */}
          <motion.div
            className="rounded-2xl overflow-hidden aspect-video bg-black relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            {review.videoUrl ? (
              <iframe src={review.videoUrl} className="w-full h-full" title="Customer Review" allowFullScreen />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            )}
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className="font-display text-5xl leading-none mb-4"
              style={{ color: 'var(--color-accent)', opacity: 0.3 }}
              aria-hidden="true"
            >
              &ldquo;
            </div>
            <blockquote className="font-display text-xl md:text-2xl font-bold text-text-primary leading-snug">
              {review.text}
            </blockquote>
            <div className="mt-6">
              <StarRating rating={review.rating || 5} size={20} />
              <p className="font-display text-base font-semibold text-text-primary mt-2">{review.name}</p>
              {review.service && <p className="font-body text-sm text-muted">{review.service}</p>}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
