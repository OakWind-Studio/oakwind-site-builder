/**
 * @metadata
 * name: Food Showcase
 * category: heroes
 * KEEP: Full-bleed food photo background, content at bottom with gradient fade,
 *       script/display font for name, "Est." detail, star rating, reservation CTA
 * CHANGE: Background image, restaurant name, established year, CTA label
 * DON'T: Move content to top/center, remove the bottom gradient, use sans-serif for name
 */

import { motion } from 'motion/react';
import { Phone, Clock, MapPin } from 'lucide-react';
import { Section, OakImage, StarRating } from '../lib';
import { useAnimationSequence, telHref } from '../lib';

export default function FoodShowcase({ business, copy, images, reviews }) {
  const seq = useAnimationSequence();

  return (
    <Section id="hero" weight="hero" spacing="hero" animate="none" className="relative bg-black">
      {/* Full-bleed food photo */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={seq.bg.initial}
        animate={seq.bg.animate}
        transition={seq.bg.transition}
      >
        <OakImage
          src={images?.hero || images?.food}
          alt={`${business.name} signature dish`}
          aspect="16/9"
          loading="eager"
          className="w-full h-full"
        />
        {/* Bottom gradient fade */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 35%, transparent 70%)',
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Content at bottom */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-12 md:pb-16 px-5 md:px-8">
        <div className="max-w-4xl mx-auto w-full">
          {/* Established detail */}
          <motion.p
            className="text-white/50 text-sm font-body tracking-widest uppercase mb-2"
            initial={seq.badge.initial}
            animate={seq.badge.animate}
            transition={seq.badge.transition}
          >
            {copy?.established || `Est. ${business.established || '2004'}`}
          </motion.p>

          {/* Restaurant name in display font */}
          <motion.h1
            className="font-display text-5xl md:text-6xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight"
            initial={seq.headline.initial}
            animate={seq.headline.animate}
            transition={seq.headline.transition}
          >
            {business.name}
          </motion.h1>

          {/* Thin separator */}
          <motion.div
            className="mt-4 w-16 h-[1px] origin-left"
            style={{ backgroundColor: 'var(--color-accent)' }}
            initial={seq.separator.initial}
            animate={seq.separator.animate}
            transition={seq.separator.transition}
          />

          <motion.p
            className="mt-4 text-lg text-white/70 font-body max-w-md"
            initial={seq.subtext.initial}
            animate={seq.subtext.animate}
            transition={seq.subtext.transition}
          >
            {copy?.subtext}
          </motion.p>

          {/* Trust row */}
          <motion.div
            className="mt-4 flex flex-wrap items-center gap-4"
            initial={seq.trust.initial}
            animate={seq.trust.animate}
            transition={seq.trust.transition}
          >
            <StarRating rating={reviews?.average || 5} size={16} count={reviews?.count} showCount />
            {business.city && (
              <span className="flex items-center gap-1 text-sm text-white/50 font-body">
                <MapPin className="w-3.5 h-3.5" />
                {business.city}
              </span>
            )}
            {copy?.hours && (
              <span className="flex items-center gap-1 text-sm text-white/50 font-body">
                <Clock className="w-3.5 h-3.5" />
                {copy.hours}
              </span>
            )}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="mt-6 flex flex-wrap gap-3"
            initial={seq.cta.initial}
            animate={seq.cta.animate}
            transition={seq.cta.transition}
          >
            <a
              href={telHref(business.phone)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-semibold shadow-lg hover:brightness-110 transition-all"
            >
              <Phone className="w-4 h-4" />
              {copy?.cta || 'Reserve a Table'}
            </a>
            {copy?.ctaSecondary && (
              <a
                href="#menu"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
              >
                {copy.ctaSecondary}
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
