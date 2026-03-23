/**
 * @metadata
 * name: Stats Authority
 * category: heroes
 * KEEP: Numbers-forward layout with 3-4 large animated counter stats as dominant visual,
 *       business name above stats, each stat has icon + number + label, CTA below
 * CHANGE: Stat values/labels/icons, business name, CTA label
 * DON'T: Push stats below the fold, reduce stat font size, remove counter animation
 */

import { motion } from 'motion/react';
import { Phone, Clock, Users, Star, Shield, Award, MapPin } from 'lucide-react';
import { Section, Container, StarRating } from '../lib';
import { useAnimationSequence, useInViewport, useCounter, telHref } from '../lib';

const iconMap = { Clock, Users, Star, Shield, Award, MapPin };

function AnimatedStat({ icon: Icon, value, suffix, label, inView, delay }) {
  const count = useCounter(value, 2200, inView);
  return (
    <motion.div
      className="flex flex-col items-center gap-2 px-4 py-6 md:py-8"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <Icon className="w-6 h-6 md:w-8 md:h-8 text-accent" />
      <span className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary">
        {count}{suffix || '+'}
      </span>
      <span className="text-sm text-muted font-body uppercase tracking-wider">{label}</span>
    </motion.div>
  );
}

export default function StatsAuthority({ business, copy, images, reviews }) {
  const seq = useAnimationSequence();
  const [statsRef, statsInView] = useInViewport({ threshold: 0.2 });

  const stats = copy?.stats || [
    { icon: Clock, value: 20, suffix: '+', label: 'Years Experience' },
    { icon: Users, value: 5000, suffix: '+', label: 'Happy Customers' },
    { icon: Star, value: reviews?.count || 200, suffix: '+', label: '5-Star Reviews' },
    { icon: Shield, value: 100, suffix: '%', label: 'Satisfaction' },
  ];

  return (
    <Section id="hero" weight="hero" spacing="hero" animate="none" className="bg-surface">
      <Container maxWidth="xl" className="flex flex-col items-center justify-center min-h-screen pt-24 pb-16 text-center">
        {/* Business name */}
        <motion.p
          className="text-sm text-accent font-body tracking-widest uppercase mb-2"
          initial={seq.badge.initial}
          animate={seq.badge.animate}
          transition={seq.badge.transition}
        >
          {business.name}
        </motion.p>

        <motion.h1
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight max-w-3xl"
          initial={seq.headline.initial}
          animate={seq.headline.animate}
          transition={seq.headline.transition}
        >
          {copy?.headline}
        </motion.h1>

        <motion.p
          className="mt-3 text-lg text-muted font-body max-w-xl"
          initial={seq.subtext.initial}
          animate={seq.subtext.animate}
          transition={seq.subtext.transition}
        >
          {copy?.subtext}
        </motion.p>

        {/* Stats grid — the dominant element */}
        <div
          ref={statsRef}
          className="mt-10 md:mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 rounded-2xl p-4"
          style={{ backgroundColor: 'var(--color-surface-elevated)' }}
        >
          {stats.map((stat, i) => {
            const Icon = typeof stat.icon === 'string' ? (iconMap[stat.icon] || Award) : (stat.icon || Award);
            return (
              <AnimatedStat
                key={i}
                icon={Icon}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                inView={statsInView}
                delay={i * 0.1}
              />
            );
          })}
        </div>

        <motion.div
          className="mt-6"
          initial={seq.trust.initial}
          animate={seq.trust.animate}
          transition={seq.trust.transition}
        >
          <StarRating rating={reviews?.average || 5} size={18} count={reviews?.count} showCount className="justify-center" />
        </motion.div>

        <motion.div
          className="mt-8"
          initial={seq.cta.initial}
          animate={seq.cta.animate}
          transition={seq.cta.transition}
        >
          <a
            href={telHref(business.phone)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-semibold text-lg shadow-lg hover:brightness-110 transition-all"
          >
            <Phone className="w-5 h-5" />
            {copy?.cta || 'Get Started Today'}
          </a>
        </motion.div>
      </Container>
    </Section>
  );
}
