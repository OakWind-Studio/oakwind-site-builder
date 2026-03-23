/**
 * @metadata
 * name: Virtual Tour Embed
 * category: niche-specialty
 * niche: wedding-venue
 * KEEP: Embedded 360 tour or photo walkthrough placeholder, CTA to explore,
 *       full-width visual, elegant venue branding
 * CHANGE: Tour embed URL, CTA text, heading
 * DON'T: Remove tour visual, make text-only, drop CTA
 */

import { motion } from 'motion/react';
import { Eye, ExternalLink } from 'lucide-react';
import { Section, Container } from '../lib';
import { fadeUp } from '../lib';

export default function VirtualTourEmbed({ business, copy }) {
  return (
    <Section id="virtual-tour" spacing="generous">
      <Container maxWidth="lg">
        <motion.div
          className="text-center mb-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Eye className="w-8 h-8 text-[var(--color-accent)] mx-auto mb-3" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
            {copy?.heading || 'Take a Virtual Tour'}
          </h2>
          <p className="mt-2 font-body text-muted max-w-lg mx-auto">
            {copy?.subtext || 'Explore our venue from the comfort of your home.'}
          </p>
        </motion.div>

        {/* Tour embed area */}
        <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-elevated)] aspect-video flex items-center justify-center">
          {copy?.embedUrl ? (
            <iframe
              src={copy.embedUrl}
              className="w-full h-full"
              title="Virtual Tour"
              allowFullScreen
            />
          ) : (
            <div className="text-center p-8">
              <Eye className="w-16 h-16 text-[var(--color-accent)]/20 mx-auto mb-4" />
              <p className="font-body text-muted">360° Tour</p>
              {copy?.tourUrl && (
                <a
                  href={copy.tourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-lg bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all"
                >
                  Explore Now <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
