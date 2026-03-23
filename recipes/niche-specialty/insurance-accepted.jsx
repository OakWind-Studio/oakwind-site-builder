/**
 * @metadata
 * name: Insurance Accepted
 * category: niche-specialty
 * niche: dental
 * KEEP: Logo grid of accepted insurance providers, grayscale with hover color,
 *       "We Accept" heading, clean grid layout
 * CHANGE: Insurance logos, grid columns, heading
 * DON'T: Remove logos, flatten to text list, drop heading
 */

import { Section, Container } from '../lib';
import { fadeUp } from '../lib';
import { motion } from 'motion/react';

export default function InsuranceAccepted({ business }) {
  const insurances = business.insurances || [];

  return (
    <Section id="insurance" spacing="default" bg="elevated">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-2xl md:text-3xl font-bold text-text-primary text-center mb-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Insurance We Accept
        </motion.h2>
        <p className="font-body text-sm text-muted text-center mb-10">
          We work with most major insurance providers
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 items-center justify-items-center">
          {insurances.map((ins, i) => (
            <img
              key={i}
              src={typeof ins === 'string' ? ins : ins.logo}
              alt={typeof ins === 'string' ? 'Insurance' : ins.name}
              className="h-10 md:h-12 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
