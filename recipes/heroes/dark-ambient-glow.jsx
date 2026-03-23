/**
 * @metadata
 * name: Dark Ambient Glow
 * category: heroes
 * KEEP: Dark background (#0A0A0A), warm amber radial gradient glows at low opacity,
 *       noise texture overlay, bold condensed headline, horizontal stats row, accent glow CTA
 * CHANGE: Stats numbers/labels, headline, CTA label, glow color
 * DON'T: Lighten the background, remove the noise texture, drop the stats row
 */

import { motion } from 'motion/react';
import { Phone, Shield, Clock, Award } from 'lucide-react';
import { Section, Container, StarRating } from '../lib';
import { useAnimationSequence, useInViewport, useCounter, telHref } from '../lib';

function StatItem({ icon: Icon, value, label, inView }) {
  const count = useCounter(value, 2000, inView);
  return (
    <div className="flex flex-col items-center gap-1 px-4 md:px-6">
      <Icon className="w-5 h-5 text-accent mb-1" />
      <span className="font-display text-3xl md:text-4xl font-bold text-white">{count}+</span>
      <span className="text-xs text-white/50 font-body uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function DarkAmbientGlow({ business, copy, images, reviews }) {
  const seq = useAnimationSequence();
  const [statsRef, statsInView] = useInViewport({ threshold: 0.3 });

  const stats = copy?.stats || [
    { icon: Clock, value: 20, label: 'Years' },
    { icon: Shield, value: 5000, label: 'Customers' },
    { icon: Award, value: 100, label: '5-Star Reviews' },
  ];

  return (
    <Section id="hero" weight="hero" spacing="hero" animate="none" className="relative" style={{ backgroundColor: '#0A0A0A' }}>
      {/* Ambient glow layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(217,163,67,0.10) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(217,163,67,0.06) 0%, transparent 70%)',
          }}
        />
        {/* Noise texture */}
        <div className="absolute inset-0 noise opacity-[0.03]" />
      </div>

      <Container maxWidth="lg" className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 pb-16 text-center">
        <motion.div
          className="mb-4"
          initial={seq.badge.initial}
          animate={seq.badge.animate}
          transition={seq.badge.transition}
        >
          <StarRating rating={reviews?.average || 5} size={18} count={reviews?.count} showCount />
        </motion.div>

        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight uppercase max-w-4xl"
          initial={seq.headline.initial}
          animate={seq.headline.animate}
          transition={seq.headline.transition}
        >
          {copy?.headline}
        </motion.h1>

        <motion.p
          className="mt-4 text-lg text-white/60 font-body max-w-xl"
          initial={seq.subtext.initial}
          animate={seq.subtext.animate}
          transition={seq.subtext.transition}
        >
          {copy?.subtext}
        </motion.p>

        {/* Stats row */}
        <motion.div
          ref={statsRef}
          className="mt-10 flex flex-wrap justify-center divide-x divide-white/10"
          initial={seq.trust.initial}
          animate={seq.trust.animate}
          transition={seq.trust.transition}
        >
          {stats.map((stat, i) => (
            <StatItem key={i} icon={stat.icon || Award} value={stat.value} label={stat.label} inView={statsInView} />
          ))}
        </motion.div>

        {/* CTA with accent glow */}
        <motion.div
          className="mt-10"
          initial={seq.cta.initial}
          animate={seq.cta.animate}
          transition={seq.cta.transition}
        >
          <a
            href={telHref(business.phone)}
            className="relative inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-semibold text-lg hover:brightness-110 transition-all"
            style={{
              boxShadow: '0 0 32px color-mix(in srgb, var(--color-accent) 40%, transparent)',
            }}
          >
            <Phone className="w-5 h-5" />
            {copy?.cta || 'Call Now'}
          </a>
        </motion.div>
      </Container>
    </Section>
  );
}
