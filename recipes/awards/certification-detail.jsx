/**
 * @metadata
 * name: Certification Detail
 * category: awards
 * KEEP: Detailed certification display with description, badge icons,
 *       what-it-means explanation, professional authority feel
 * CHANGE: Certification data, descriptions, icons
 * DON'T: Remove descriptions, make plain badges, drop detail text
 */

import { motion } from 'motion/react';
import { Shield, BadgeCheck } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function CertificationDetail({ business, copy }) {
  const [ref, inView] = useInViewport();
  const certs = copy?.certifications || [];

  return (
    <Section id="certifications" spacing="generous" bg="elevated">
      <Container maxWidth="md">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Our Certifications'}
        </motion.h2>

        <div ref={ref} className="space-y-6">
          {certs.map((cert, i) => {
            const Icon = cert.icon || (i % 2 === 0 ? Shield : BadgeCheck);
            return (
              <motion.div
                key={i}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 flex items-start gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-7 h-7 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-text-primary">{cert.name}</h3>
                  {cert.issuer && (
                    <p className="font-body text-sm text-[var(--color-accent)] font-semibold mt-0.5">{cert.issuer}</p>
                  )}
                  <p className="font-body text-sm text-muted mt-2 leading-relaxed">{cert.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
