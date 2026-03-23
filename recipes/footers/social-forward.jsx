/**
 * @metadata
 * name: Social Forward
 * category: footers
 * KEEP: Prominent social media icons (Instagram/Facebook/Yelp), basic contact below,
 *       OakWindFooter, centered layout, icon hover accents
 * CHANGE: Social links, icon set, contact details
 * DON'T: Remove OakWindFooter, hide social icons, drop contact info
 */

import { Facebook, Instagram, Star, ExternalLink } from 'lucide-react';
import { Container, OakWindFooter } from '../lib';
import { telHref, formatPhone } from '../lib';

const defaultSocials = [
  { name: 'Facebook', icon: Facebook, key: 'facebook' },
  { name: 'Instagram', icon: Instagram, key: 'instagram' },
  { name: 'Yelp', icon: Star, key: 'yelp' },
];

export default function SocialForward({ business, sections }) {
  const socials = sections?.socials || defaultSocials;

  return (
    <footer className="bg-[var(--color-surface-elevated)] border-t border-[var(--color-border)]">
      <Container maxWidth="md" className="py-12 text-center">
        <h3 className="font-display text-lg font-bold text-text-primary mb-6">
          {sections?.heading || 'Follow Along'}
        </h3>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {socials.map((social, i) => {
            const Icon = social.icon;
            const url = business.social?.[social.key] || social.url || '#';
            return (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center text-muted hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-all"
                aria-label={social.name}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>

        {/* Contact info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm font-body text-muted">
          <a href={telHref(business.phone)} className="hover:text-[var(--color-accent)] transition-colors">
            {formatPhone(business.phone)}
          </a>
          {business.address && (
            <>
              <span className="hidden sm:inline text-[var(--color-border)]">|</span>
              <span>{business.address}</span>
            </>
          )}
        </div>
      </Container>
      <OakWindFooter />
    </footer>
  );
}
