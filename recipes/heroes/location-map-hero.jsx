/**
 * @metadata
 * name: Location Map Hero
 * category: heroes
 * KEEP: Map/location visual in background, overlaid content card with business info,
 *       "Serving [area] since [year]" local feel, address + phone CTA
 * CHANGE: Business name, area, year, address, phone, map imagery
 * DON'T: Remove the location-first framing, hide the address, center content without the card
 */

import { motion } from 'motion/react';
import { Phone, MapPin, Clock, Navigation } from 'lucide-react';
import { Section, OakImage, StarRating } from '../lib';
import { useAnimationSequence, telHref, formatPhone } from '../lib';

export default function LocationMapHero({ business, copy, images, reviews }) {
  const seq = useAnimationSequence();

  return (
    <Section id="hero" weight="hero" spacing="hero" animate="none" className="relative bg-surface-elevated">
      {/* Map/location background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={seq.bg.initial}
        animate={seq.bg.animate}
        transition={seq.bg.transition}
      >
        {images?.map ? (
          <OakImage
            src={images.map}
            alt={`Map of ${business.city || 'service area'}`}
            loading="eager"
            className="w-full h-full opacity-30"
          />
        ) : (
          /* Decorative map-style grid as fallback */
          <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
            <div className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(var(--color-border) 1px, transparent 1px),
                  linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
              }}
            />
            {/* Major road lines */}
            <div className="absolute top-1/3 left-0 right-0 h-[2px] bg-accent opacity-30" />
            <div className="absolute left-[40%] top-0 bottom-0 w-[2px] bg-accent opacity-30" />
          </div>
        )}
      </motion.div>

      {/* Location pin accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none" aria-hidden="true">
        <div
          className="w-4 h-4 rounded-full animate-ping opacity-20"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
      </div>

      {/* Content card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center pt-24 pb-16 px-5 md:px-8">
        <motion.div
          className="w-full max-w-lg rounded-2xl p-8 md:p-10 shadow-2xl"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <motion.div
            className="flex items-center gap-2 text-accent text-sm font-body mb-3"
            initial={seq.badge.initial}
            animate={seq.badge.animate}
            transition={seq.badge.transition}
          >
            <Navigation className="w-4 h-4" />
            <span>Serving {business.city || copy?.area || 'your neighborhood'} since {business.established || '2005'}</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl md:text-5xl font-bold text-text-primary leading-tight"
            initial={seq.headline.initial}
            animate={seq.headline.animate}
            transition={seq.headline.transition}
          >
            {business.name}
          </motion.h1>

          <motion.p
            className="mt-3 text-base text-muted font-body"
            initial={seq.subtext.initial}
            animate={seq.subtext.animate}
            transition={seq.subtext.transition}
          >
            {copy?.subtext}
          </motion.p>

          <motion.div
            className="mt-4"
            initial={seq.trust.initial}
            animate={seq.trust.animate}
            transition={seq.trust.transition}
          >
            <StarRating rating={reviews?.average || 5} size={16} count={reviews?.count} showCount />
          </motion.div>

          {/* Address + hours */}
          <motion.div
            className="mt-5 space-y-2 text-sm text-muted font-body"
            initial={seq.subtext.initial}
            animate={seq.subtext.animate}
            transition={seq.subtext.transition}
          >
            {business.address && (
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                {business.address}
              </p>
            )}
            {copy?.hours && (
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                {copy.hours}
              </p>
            )}
          </motion.div>

          <motion.div
            className="mt-6"
            initial={seq.cta.initial}
            animate={seq.cta.animate}
            transition={seq.cta.transition}
          >
            <a
              href={telHref(business.phone)}
              className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-lg bg-accent text-white font-semibold text-lg shadow-lg hover:brightness-110 transition-all"
            >
              <Phone className="w-5 h-5" />
              {formatPhone(business.phone) || copy?.cta || 'Call Now'}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
