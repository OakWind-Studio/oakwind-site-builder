/**
 * @metadata
 * name: Patient Forms CTA
 * category: niche-specialty
 * niche: dental
 * KEEP: "Download forms before your visit" messaging, file icons, CTA button,
 *       list of downloadable forms, helpful patient-friendly tone
 * CHANGE: Form names, CTA text, icon choices
 * DON'T: Remove download CTA, drop form list, make impersonal
 */

import { motion } from 'motion/react';
import { FileText, Download } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function PatientFormsCta({ business, copy }) {
  const [ref, inView] = useInViewport();
  const forms = copy?.forms || [];

  return (
    <Section id="forms" spacing="generous">
      <Container maxWidth="md">
        <motion.div
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-8 md:p-10 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <FileText className="w-10 h-10 text-[var(--color-accent)] mx-auto mb-4" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-2">
            {copy?.heading || 'New Patient Forms'}
          </h2>
          <p className="font-body text-muted mb-8">
            {copy?.subtext || 'Save time at your first visit by filling out forms ahead of time.'}
          </p>

          <div ref={ref} className="space-y-3 max-w-sm mx-auto text-left mb-8">
            {forms.map((form, i) => (
              <motion.a
                key={i}
                href={form.url || '#'}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--color-surface)] transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <FileText className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                <span className="font-body text-sm text-text-primary flex-1">{form.name}</span>
                <Download className="w-4 h-4 text-muted" />
              </motion.a>
            ))}
          </div>

          <a
            href={copy?.ctaUrl || '#'}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all"
          >
            <Download className="w-4 h-4" />
            {copy?.ctaLabel || 'Download All Forms'}
          </a>
        </motion.div>
      </Container>
    </Section>
  );
}
