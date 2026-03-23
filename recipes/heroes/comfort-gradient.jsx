/**
 * @metadata
 * name: Comfort Gradient
 * category: heroes
 * KEEP: Gradient from warm/uncomfortable color to cool/comfortable color,
 *       temperature-themed visual metaphor, comfort-messaging, HVAC-style icons
 * CHANGE: Gradient colors, headline, subtext, icon choices, CTA label
 * DON'T: Remove the temperature gradient metaphor, use a neutral flat background
 */

import { motion } from 'motion/react';
import { Phone, Thermometer, Wind, Snowflake, Sun, Shield } from 'lucide-react';
import { Section, Container, StarRating } from '../lib';
import { useAnimationSequence, telHref } from '../lib';

export default function ComfortGradient({ business, copy, images, reviews }) {
  const seq = useAnimationSequence();

  const comfortIcons = [
    { icon: Sun, label: copy?.iconLabel1 || 'Heating' },
    { icon: Snowflake, label: copy?.iconLabel2 || 'Cooling' },
    { icon: Wind, label: copy?.iconLabel3 || 'Air Quality' },
    { icon: Shield, label: copy?.iconLabel4 || 'Maintenance' },
  ];

  return (
    <Section id="hero" weight="hero" spacing="hero" animate="none" className="relative">
      {/* Temperature gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #dc6b4a 0%, #c4825e 25%, #8ba5b5 60%, #5b9bb5 85%, #4a8fad 100%)',
        }}
        aria-hidden="true"
      />
      {/* Subtle overlay for readability */}
      <div className="absolute inset-0 z-0 bg-black/25" aria-hidden="true" />

      <Container maxWidth="lg" className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 pb-16 text-center">
        {/* Thermometer badge */}
        <motion.div
          className="mb-6"
          initial={seq.badge.initial}
          animate={seq.badge.animate}
          transition={seq.badge.transition}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-body">
            <Thermometer className="w-4 h-4" />
            {copy?.badge || `Trusted HVAC Since ${business.established || '2005'}`}
          </span>
        </motion.div>

        <motion.h1
          className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight max-w-4xl"
          initial={seq.headline.initial}
          animate={seq.headline.animate}
          transition={seq.headline.transition}
        >
          {copy?.headline || 'Your Comfort Is Our Priority'}
        </motion.h1>

        <motion.p
          className="mt-4 md:mt-6 text-lg md:text-xl text-white/80 font-body max-w-xl"
          initial={seq.subtext.initial}
          animate={seq.subtext.animate}
          transition={seq.subtext.transition}
        >
          {copy?.subtext}
        </motion.p>

        {/* Temperature service icons */}
        <motion.div
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          initial={seq.trust.initial}
          animate={seq.trust.animate}
          transition={seq.trust.transition}
        >
          {comfortIcons.map(({ icon: Icon, label }, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm"
            >
              <Icon className="w-6 h-6 text-white" />
              <span className="text-xs text-white/70 font-body">{label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mt-4"
          initial={seq.badge.initial}
          animate={seq.badge.animate}
          transition={seq.badge.transition}
        >
          <StarRating rating={reviews?.average || 5} size={16} count={reviews?.count} showCount className="justify-center" />
        </motion.div>

        <motion.div
          className="mt-8"
          initial={seq.cta.initial}
          animate={seq.cta.animate}
          transition={seq.cta.transition}
        >
          <a
            href={telHref(business.phone)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-text-primary font-semibold text-lg shadow-xl hover:bg-white/90 transition-all"
          >
            <Phone className="w-5 h-5" />
            {copy?.cta || 'Schedule Service'}
          </a>
        </motion.div>
      </Container>
    </Section>
  );
}
