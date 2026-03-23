/**
 * @metadata
 * name: As Seen In Strip
 * category: trust-proof
 * KEEP: Horizontal strip of media/press logos, "As Featured In" heading,
 *       grayscale logos with hover color, centered layout
 * CHANGE: Logo images, heading text, logo count
 * DON'T: Remove grayscale treatment, drop heading, make logos colorful by default
 */

import { motion } from 'motion/react';
import { Section, Container } from '../lib';
import { useInViewport } from '../lib';

export default function AsSeenInStrip({ business }) {
  const [ref, inView] = useInViewport();
  const logos = business.press || [];

  return (
    <Section id="press" spacing="default">
      <Container maxWidth="lg">
        <p className="font-body text-xs text-muted uppercase tracking-widest text-center mb-6">
          As Featured In
        </p>

        <div ref={ref} className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo, i) => (
            <motion.img
              key={i}
              src={typeof logo === 'string' ? logo : logo.src}
              alt={typeof logo === 'string' ? 'Press logo' : logo.name}
              className="h-8 md:h-10 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.5 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
