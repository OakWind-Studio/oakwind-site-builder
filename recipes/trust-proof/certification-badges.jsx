/**
 * @metadata
 * name: Certification Badges
 * category: trust-proof
 * KEEP: Grid of certification/license badge icons with labels, BBB/ASE/Board style,
 *       clean grid layout, subtle elevated cards, staggered entrance
 * CHANGE: Badge data, grid columns, icon choices
 * DON'T: Remove badge icons, flatten to plain text, drop labels
 */

import { motion } from 'motion/react';
import { Shield, Award, BadgeCheck, Star } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

const defaultIcons = [Shield, Award, BadgeCheck, Star];

export default function CertificationBadges({ business }) {
  const [ref, inView] = useInViewport();
  const badges = business.certifications || [];

  return (
    <Section id="certifications" spacing="default" bg="elevated">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-2xl md:text-3xl font-bold text-text-primary text-center mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Certified & Licensed
        </motion.h2>

        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {badges.map((badge, i) => {
            const Icon = badge.icon || defaultIcons[i % defaultIcons.length];
            return (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Icon className="w-8 h-8 text-[var(--color-accent)] mb-3" />
                <span className="font-body text-sm font-semibold text-text-primary">
                  {badge.name || badge}
                </span>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
