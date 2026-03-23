/**
 * @metadata
 * name: Gradient Editorial
 * category: heroes
 * KEEP: No-image design, layered gradient mesh background, oversized serif headline,
 *       generous whitespace, inline trust badges, editorial magazine feel
 * CHANGE: Headline copy, subtitle, badge labels, CTA text
 * DON'T: Add a background image, reduce headline size below text-6xl, crowd the layout
 */

import { motion } from 'motion/react';
import { Phone, Shield, Star } from 'lucide-react';
import { Section, Container, StarRating } from '../lib';
import { useAnimationSequence, telHref } from '../lib';

export default function GradientEditorial({ business, copy, images, reviews }) {
  const seq = useAnimationSequence();

  return (
    <Section id="hero" weight="hero" spacing="hero" animate="none" className="gradient-mesh">
      <Container maxWidth="md" className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 text-center">

        {/* Badge */}
        <motion.div
          className="mb-8"
          initial={seq.badge.initial}
          animate={seq.badge.animate}
          transition={seq.badge.transition}
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-accent/10 text-accent font-body">
            <Star className="w-3.5 h-3.5" />
            {copy?.badge || 'Trusted Since ' + (business.established || '2005')}
          </span>
        </motion.div>

        {/* Oversized serif headline */}
        <motion.h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-text-primary leading-[1.05] tracking-tight max-w-4xl"
          initial={seq.headline.initial}
          animate={seq.headline.animate}
          transition={seq.headline.transition}
        >
          {copy?.headline}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 md:mt-8 text-lg md:text-xl text-muted font-body max-w-xl leading-relaxed"
          initial={seq.subtext.initial}
          animate={seq.subtext.animate}
          transition={seq.subtext.transition}
        >
          {copy?.subtext}
        </motion.p>

        {/* Trust badges inline */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-6"
          initial={seq.trust.initial}
          animate={seq.trust.animate}
          transition={seq.trust.transition}
        >
          <div className="flex items-center gap-2">
            <StarRating rating={reviews?.average || 5} size={16} />
            <span className="text-sm text-muted font-body">{reviews?.count || 150}+ reviews</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted font-body">{copy?.trustLabel || 'Licensed & Insured'}</span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-10"
          initial={seq.cta.initial}
          animate={seq.cta.animate}
          transition={seq.cta.transition}
        >
          <a
            href={telHref(business.phone)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-semibold text-lg shadow-lg hover:brightness-110 transition-all"
          >
            <Phone className="w-5 h-5" />
            {copy?.cta || 'Get Started'}
          </a>
        </motion.div>
      </Container>
    </Section>
  );
}
