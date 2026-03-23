/**
 * @metadata
 * name: Property Listings Grid
 * category: niche-specialty
 * niche: realtor
 * KEEP: Realtor property cards with photo, price, beds/baths/sqft, status badge,
 *       grid layout, hover shadow, clean info layout
 * CHANGE: Property data, status labels, grid columns
 * DON'T: Remove price, drop property details, flatten to list
 */

import { motion } from 'motion/react';
import { Bed, Bath, Maximize } from 'lucide-react';
import { Section, Container, OakImage } from '../lib';
import { useInViewport, cn, fadeUp } from '../lib';

export default function PropertyListingsGrid({ business, copy }) {
  const [ref, inView] = useInViewport();
  const properties = copy?.properties || [];

  return (
    <Section id="listings" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Featured Properties'}
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] overflow-hidden hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="relative">
                <OakImage src={prop.photo} alt={prop.address} aspect="16/9" className="w-full" />
                {prop.status && (
                  <span className={cn(
                    'absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase',
                    prop.status === 'Active' ? 'bg-green-500 text-white' : 'bg-[var(--color-accent)] text-white'
                  )}>
                    {prop.status}
                  </span>
                )}
              </div>
              <div className="p-5">
                <p className="font-display text-xl font-bold text-[var(--color-accent)]">{prop.price}</p>
                <p className="font-body text-sm text-text-primary mt-1">{prop.address}</p>
                <div className="flex items-center gap-4 mt-3 text-sm font-body text-muted">
                  <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {prop.beds} bd</span>
                  <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {prop.baths} ba</span>
                  <span className="flex items-center gap-1"><Maximize className="w-4 h-4" /> {prop.sqft} sqft</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
