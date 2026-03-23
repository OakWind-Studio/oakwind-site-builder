/**
 * @metadata
 * name: Dark Premium Map
 * category: footers
 * KEEP: Dark background footer, map link/visual area, contact info alongside,
 *       premium feel, OakWindFooter at bottom, elegant typography
 * CHANGE: Contact details, map link, dark tone intensity
 * DON'T: Remove OakWindFooter, use light background, drop map element
 */

import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Container, OakWindFooter } from '../lib';
import { telHref, formatPhone } from '../lib';

export default function DarkPremiumMap({ business, sections }) {
  const mapUrl = sections?.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(business.address || business.name)}`;

  return (
    <footer className="bg-gray-900 text-white">
      <Container maxWidth="lg" className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Map area */}
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl overflow-hidden bg-gray-800 aspect-video relative group"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-[var(--color-accent)] mx-auto mb-2" />
                <p className="font-body text-sm text-gray-400 group-hover:text-white transition-colors">
                  View on Google Maps
                  <ExternalLink className="inline w-3 h-3 ml-1" />
                </p>
              </div>
            </div>
          </a>

          {/* Contact info */}
          <div className="flex flex-col justify-center">
            <h3 className="font-display text-2xl font-bold mb-6">{business.name}</h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[var(--color-accent)] mt-0.5 shrink-0" />
                <a href={telHref(business.phone)} className="font-body text-gray-300 hover:text-white transition-colors">
                  {formatPhone(business.phone)}
                </a>
              </li>
              {business.email && (
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[var(--color-accent)] mt-0.5 shrink-0" />
                  <span className="font-body text-gray-300">{business.email}</span>
                </li>
              )}
              {business.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--color-accent)] mt-0.5 shrink-0" />
                  <span className="font-body text-gray-300">{business.address}</span>
                </li>
              )}
            </ul>

            {sections?.tagline && (
              <p className="mt-6 font-body text-sm text-gray-500 italic">{sections.tagline}</p>
            )}
          </div>
        </div>
      </Container>
      <OakWindFooter />
    </footer>
  );
}
