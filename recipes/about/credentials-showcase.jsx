/**
 * @metadata
 * name: Credentials Showcase
 * category: about
 * KEEP: Board certifications, degrees, awards in elegant grid, badge/cert icons,
 *       professional tone for dental/attorney/med spa niches, elevated cards
 * CHANGE: Credential data, icon choices, layout columns
 * DON'T: Remove credential details, make informal, drop badge icons
 */

import { motion } from 'motion/react';
import { Award, GraduationCap, Shield, BadgeCheck } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

const defaultIcons = [Award, GraduationCap, Shield, BadgeCheck];

export default function CredentialsShowcase({ business, copy }) {
  const [ref, inView] = useInViewport();
  const credentials = copy?.credentials || [];

  return (
    <Section id="credentials" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Credentials & Certifications'}
        </motion.h2>
        <motion.p
          className="font-body text-muted text-center max-w-xl mx-auto mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {copy?.subtext}
        </motion.p>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((cred, i) => {
            const Icon = cred.icon || defaultIcons[i % defaultIcons.length];
            return (
              <motion.div
                key={i}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 flex items-start gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-text-primary">
                    {cred.title}
                  </h3>
                  {cred.issuer && (
                    <p className="text-sm text-muted font-body mt-1">{cred.issuer}</p>
                  )}
                  {cred.year && (
                    <p className="text-xs text-muted/70 font-body mt-1">{cred.year}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
