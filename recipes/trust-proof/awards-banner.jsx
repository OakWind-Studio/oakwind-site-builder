/**
 * @metadata
 * name: Awards Banner
 * category: trust-proof
 * KEEP: Awards displayed in horizontal banner, award name + year + badge icon,
 *       scrolling horizontal layout on mobile, elevated background
 * CHANGE: Awards data, icon choices, banner styling
 * DON'T: Remove award names, drop year, flatten to text list
 */

import { Award } from 'lucide-react';
import { Section, Container } from '../lib';

export default function AwardsBanner({ business }) {
  const awards = business.awards || [];

  return (
    <Section id="awards" spacing="tight" bg="elevated">
      <Container maxWidth="lg">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {awards.map((award, i) => (
            <div key={i} className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[var(--color-accent)]" />
              <div>
                <p className="font-display text-sm font-bold text-text-primary leading-tight">
                  {award.name || award}
                </p>
                {award.year && (
                  <p className="font-body text-xs text-muted">{award.year}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
