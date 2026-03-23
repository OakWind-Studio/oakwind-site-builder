/**
 * @metadata
 * name: Partner Logos
 * category: trust-proof
 * KEEP: Grid of partner/vendor logos, insurance companies/brands/suppliers,
 *       grayscale with hover color, heading, clean grid
 * CHANGE: Logo images, heading text, grid columns
 * DON'T: Remove grayscale default, drop heading, make interactive
 */

import { Section, Container } from '../lib';

export default function PartnerLogos({ business }) {
  const logos = business.partners || [];

  return (
    <Section id="partners" spacing="default" bg="elevated">
      <Container maxWidth="lg">
        <p className="font-body text-xs text-muted uppercase tracking-widest text-center mb-8">
          Trusted Partners
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 items-center justify-items-center">
          {logos.map((logo, i) => (
            <img
              key={i}
              src={typeof logo === 'string' ? logo : logo.src}
              alt={typeof logo === 'string' ? 'Partner' : logo.name}
              className="h-10 md:h-12 object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
