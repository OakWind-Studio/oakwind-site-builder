/**
 * @metadata
 * name: Newsletter Footer
 * category: footers
 * KEEP: Email signup with Input + FormButton, social links, contact info below,
 *       OakWindFooter, clean two-row layout
 * CHANGE: Signup copy, social links, contact details
 * DON'T: Remove OakWindFooter, drop email signup, remove contact info
 */

import { Facebook, Instagram } from 'lucide-react';
import { Container, OakWindFooter, Input, FormButton } from '../lib';
import { telHref, formatPhone } from '../lib';

export default function NewsletterFooter({ business, sections }) {
  return (
    <footer className="bg-[var(--color-surface-elevated)] border-t border-[var(--color-border)]">
      <Container maxWidth="lg" className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Newsletter signup */}
          <div>
            <h3 className="font-display text-xl font-bold text-text-primary mb-2">
              {sections?.signupHeading || 'Stay in the Loop'}
            </h3>
            <p className="font-body text-sm text-muted mb-4">
              {sections?.signupText || 'Get updates, specials, and news delivered to your inbox.'}
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1"
                aria-label="Email address"
              />
              <FormButton type="submit">
                {sections?.signupButton || 'Subscribe'}
              </FormButton>
            </form>
          </div>

          {/* Contact + social */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-6 lg:items-end lg:text-right">
            <div>
              <h4 className="font-display text-sm font-bold text-text-primary uppercase tracking-wide mb-2">
                Contact
              </h4>
              <div className="space-y-1 font-body text-sm text-muted">
                <p>
                  <a href={telHref(business.phone)} className="hover:text-[var(--color-accent)] transition-colors">
                    {formatPhone(business.phone)}
                  </a>
                </p>
                {business.address && <p>{business.address}</p>}
              </div>
            </div>

            <div className="flex gap-3 lg:justify-end">
              {(sections?.socials || [{ icon: Facebook, url: '#' }, { icon: Instagram, url: '#' }]).map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-muted hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      <OakWindFooter />
    </footer>
  );
}
