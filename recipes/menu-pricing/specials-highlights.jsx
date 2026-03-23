/**
 * @metadata
 * name: Specials Highlights
 * category: menu-pricing
 * KEEP: Featured specials/promotions, "This Week's Special" or "Happy Hour",
 *       accent callout card, prominent display, staggered entrance
 * CHANGE: Special data, callout style, heading text
 * DON'T: Remove accent callout, flatten to plain text, make subtle
 */

import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function SpecialsHighlights({ menu, business }) {
  const [ref, inView] = useInViewport();
  const specials = menu?.specials || [];

  return (
    <Section id="specials" spacing="generous">
      <Container maxWidth="md">
        <motion.div
          className="text-center mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="w-8 h-8 text-[var(--color-accent)] mx-auto mb-3" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
            {menu?.specialsHeading || "This Week's Specials"}
          </h2>
        </motion.div>

        <div ref={ref} className="space-y-4">
          {specials.map((special, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border-2 border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-text-primary">
                    {special.name}
                  </h3>
                  {special.description && (
                    <p className="font-body text-sm text-muted mt-1">{special.description}</p>
                  )}
                  {special.availability && (
                    <p className="font-body text-xs text-[var(--color-accent)] mt-2 font-semibold">
                      {special.availability}
                    </p>
                  )}
                </div>
                {special.price && (
                  <span className="font-display text-xl font-bold text-[var(--color-accent)] shrink-0">
                    {special.price}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
