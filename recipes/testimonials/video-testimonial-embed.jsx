/**
 * @metadata
 * name: Video Testimonial Embed
 * category: testimonials
 * KEEP: Featured review card with quote text + video thumbnail/placeholder,
 *       play button overlay, premium feel, split layout (quote left, video right)
 * CHANGE: Video source, thumbnail, quote text, styling
 * DON'T: Remove the play button overlay, make video full-width without quote, drop quote text
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { Section, Container, OakImage, StarRating } from '../lib';
import { useInViewport, fadeUp, cn } from '../lib';

export default function VideoTestimonialEmbed({ reviews, business }) {
  const featured = reviews?.[0];
  const supporting = reviews?.slice(1, 4);

  if (!featured) return null;

  return (
    <Section id="reviews" spacing="default" animate="fadeUp">
      <Container maxWidth="lg">
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
            Hear From Our Clients
          </h2>
        </motion.div>

        {/* Featured video testimonial */}
        <VideoCard review={featured} />

        {/* Supporting text reviews */}
        {supporting?.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {supporting.map((review, i) => (
              <SmallCard key={i} review={review} index={i} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

function VideoCard({ review }) {
  const [ref, inView] = useInViewport();
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Quote side */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <StarRating rating={review.rating || 5} size={18} />
          <blockquote className="mt-5">
            <p className="font-display text-lg md:text-xl leading-relaxed text-text-primary font-medium">
              &ldquo;{review.text}&rdquo;
            </p>
          </blockquote>
          <div className="mt-6">
            <p className="font-display font-bold text-text-primary">{review.name}</p>
            {review.service && (
              <p className="text-sm text-muted font-body mt-0.5">{review.service}</p>
            )}
          </div>
        </div>

        {/* Video side */}
        <div className="relative aspect-video md:aspect-auto bg-black">
          {playing && review.videoUrl ? (
            <iframe
              src={review.videoUrl}
              title={`${review.name} video testimonial`}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <>
              <OakImage
                src={review.thumbnail || review.photo}
                alt={`${review.name} testimonial`}
                className="w-full h-full min-h-[240px]"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40" />
              {/* Play button */}
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 flex items-center justify-center group"
                aria-label="Play video testimonial"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  <Play className="w-7 h-7 text-white ml-1" fill="white" />
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function SmallCard({ review, index }) {
  const [ref, inView] = useInViewport();

  return (
    <motion.div
      ref={ref}
      className="rounded-xl p-5 border border-[var(--color-border)] bg-[var(--color-surface-elevated)]"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <StarRating rating={review.rating || 5} size={14} />
      <p className="mt-3 text-sm text-text-primary font-body leading-relaxed line-clamp-3">
        &ldquo;{review.text}&rdquo;
      </p>
      <p className="mt-3 font-display text-sm font-semibold text-text-primary">
        — {review.name}
      </p>
    </motion.div>
  );
}
