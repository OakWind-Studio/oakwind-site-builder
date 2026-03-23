/**
 * @metadata
 * name: Transformation Split
 * category: heroes
 * KEEP: Split screen before/after (left desaturated+dark, right bright+saturated),
 *       glowing divider line in center, headline spanning both sides, CTA below
 * CHANGE: Before/after images, headline, CTA label, divider color
 * DON'T: Remove the before/after visual contrast, make both sides same treatment, drop divider
 */

import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { Section, Container, OakImage, StarRating } from '../lib';
import { useAnimationSequence, telHref } from '../lib';

export default function TransformationSplit({ business, copy, images, reviews }) {
  const seq = useAnimationSequence();

  return (
    <Section id="hero" weight="hero" spacing="hero" animate="none" className="relative bg-black">
      {/* Split background */}
      <div className="absolute inset-0 z-0 flex" aria-hidden="true">
        {/* Before — left side (desaturated, darker) */}
        <motion.div
          className="w-1/2 relative overflow-hidden"
          initial={seq.bg.initial}
          animate={seq.bg.animate}
          transition={seq.bg.transition}
        >
          <OakImage
            src={images?.before || images?.hero}
            alt=""
            className="w-full h-full grayscale brightness-50"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/40" />
          <span className="absolute top-24 left-5 md:left-8 text-white/30 text-xs font-body uppercase tracking-widest">
            Before
          </span>
        </motion.div>

        {/* After — right side (bright, saturated) */}
        <motion.div
          className="w-1/2 relative overflow-hidden"
          initial={seq.bg.initial}
          animate={seq.bg.animate}
          transition={{ ...seq.bg.transition, delay: (seq.bg.transition.delay || 0) + 0.2 }}
        >
          <OakImage
            src={images?.after || images?.hero}
            alt=""
            className="w-full h-full saturate-[1.2] brightness-110"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/15" />
          <span className="absolute top-24 right-5 md:right-8 text-white/50 text-xs font-body uppercase tracking-widest">
            After
          </span>
        </motion.div>

        {/* Glowing center divider */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] z-10">
          <div
            className="w-full h-full"
            style={{
              background: 'var(--color-accent)',
              boxShadow: '0 0 20px var(--color-accent), 0 0 40px color-mix(in srgb, var(--color-accent) 50%, transparent)',
            }}
          />
        </div>
      </div>

      {/* Content overlay */}
      <Container maxWidth="lg" className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 pb-16 text-center">
        <motion.div
          className="mb-4"
          initial={seq.trust.initial}
          animate={seq.trust.animate}
          transition={seq.trust.transition}
        >
          <StarRating rating={reviews?.average || 5} size={18} count={reviews?.count} showCount />
        </motion.div>

        <motion.h1
          className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight max-w-4xl drop-shadow-xl"
          initial={seq.headline.initial}
          animate={seq.headline.animate}
          transition={seq.headline.transition}
        >
          {copy?.headline}
        </motion.h1>

        <motion.p
          className="mt-4 md:mt-6 text-lg text-white/75 font-body max-w-xl"
          initial={seq.subtext.initial}
          animate={seq.subtext.animate}
          transition={seq.subtext.transition}
        >
          {copy?.subtext}
        </motion.p>

        <motion.div
          className="mt-8"
          initial={seq.cta.initial}
          animate={seq.cta.animate}
          transition={seq.cta.transition}
        >
          <a
            href={telHref(business.phone)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-semibold text-lg shadow-xl hover:brightness-110 transition-all"
          >
            <Phone className="w-5 h-5" />
            {copy?.cta || 'Get Your Free Quote'}
          </a>
        </motion.div>
      </Container>
    </Section>
  );
}
