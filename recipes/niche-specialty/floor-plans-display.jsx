/**
 * @metadata
 * name: Floor Plans Display
 * category: niche-specialty
 * niche: home-builder
 * KEEP: Plan cards with sqft, beds, baths, starting price, floor plan image,
 *       grid layout, clean card design, prominent price
 * CHANGE: Plan data, card styling, image source
 * DON'T: Remove price, drop specs, flatten to text list
 */

import { motion } from 'motion/react';
import { Bed, Bath, Maximize } from 'lucide-react';
import { Section, Container, OakImage } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function FloorPlansDisplay({ business, copy }) {
  const [ref, inView] = useInViewport();
  const plans = copy?.plans || [];

  return (
    <Section id="floor-plans" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Floor Plans'}
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] overflow-hidden hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <OakImage src={plan.image} alt={plan.name} aspect="4/3" className="w-full" />
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-text-primary">{plan.name}</h3>
                <p className="font-display text-xl font-bold text-[var(--color-accent)] mt-1">
                  Starting at {plan.price}
                </p>
                <div className="flex items-center gap-4 mt-3 text-sm font-body text-muted">
                  <span className="flex items-center gap-1"><Maximize className="w-4 h-4" /> {plan.sqft} sqft</span>
                  <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {plan.beds} bd</span>
                  <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {plan.baths} ba</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
