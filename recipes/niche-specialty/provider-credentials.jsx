/**
 * @metadata
 * name: Provider Credentials
 * category: niche-specialty
 * niche: med-spa
 * KEEP: Provider bio cards with certifications and specialties, photo + credentials,
 *       professional medical feel, elevated cards, badge icons
 * CHANGE: Provider data, credential list, photo source
 * DON'T: Remove credentials, make informal, drop photos
 */

import { motion } from 'motion/react';
import { BadgeCheck } from 'lucide-react';
import { Section, Container, FramedImage } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function ProviderCredentials({ business, copy }) {
  const [ref, inView] = useInViewport();
  const providers = copy?.providers || [];

  return (
    <Section id="providers" spacing="generous" bg="elevated">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Our Providers'}
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {providers.map((prov, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="w-32 shrink-0">
                <FramedImage src={prov.photo} alt={prov.name} aspect="1/1" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-text-primary">{prov.name}</h3>
                <p className="font-body text-sm text-[var(--color-accent)] font-semibold">{prov.title}</p>
                {prov.bio && (
                  <p className="font-body text-sm text-muted mt-2 leading-relaxed">{prov.bio}</p>
                )}
                {prov.certifications && (
                  <div className="mt-3 space-y-1">
                    {prov.certifications.map((cert, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                        <span className="font-body text-xs text-muted">{cert}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
