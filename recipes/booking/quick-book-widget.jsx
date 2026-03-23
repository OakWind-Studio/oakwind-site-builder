/**
 * @metadata
 * name: Quick Book Widget
 * category: booking
 * KEEP: Compact inline booking widget, single-row form (name + phone + submit),
 *       minimal footprint, accent background, embedded in page flow
 * CHANGE: Form fields, CTA text, background color
 * DON'T: Remove form, make full-page, drop compact sizing
 */

import { Phone } from 'lucide-react';
import { Section, Container, Input, FormButton } from '../lib';

export default function QuickBookWidget({ business, copy }) {
  return (
    <Section id="quick-book" spacing="tight" bg="accent">
      <Container maxWidth="md">
        <div className="text-center mb-4">
          <h3 className="font-display text-xl font-bold text-white">
            {copy?.heading || 'Book Your Spot'}
          </h3>
        </div>

        <form
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            placeholder="Your Name"
            aria-label="Name"
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            aria-label="Phone"
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <FormButton type="submit" className="bg-white text-[var(--color-accent)] hover:bg-white/90 shrink-0">
            <Phone className="w-4 h-4 mr-2 inline" />
            {copy?.cta || 'Book Now'}
          </FormButton>
        </form>
      </Container>
    </Section>
  );
}
