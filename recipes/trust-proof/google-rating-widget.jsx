/**
 * @metadata
 * name: Google Rating Widget
 * category: trust-proof
 * KEEP: Styled Google rating display with Google "G" icon, star rating,
 *       review count, link to Google reviews, centered clean widget
 * CHANGE: Rating value, review count, Google URL
 * DON'T: Remove star rating, drop review count, remove Google link
 */

import { Star, ExternalLink } from 'lucide-react';
import { Section, Container, StarRating } from '../lib';

export default function GoogleRatingWidget({ business }) {
  const rating = business.reviews?.average || 5;
  const count = business.reviews?.count || 0;
  const url = business.reviews?.googleUrl || '#';

  return (
    <Section id="reviews-widget" spacing="default">
      <Container maxWidth="sm" className="text-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-col items-center gap-3 group"
        >
          {/* Google "G" styled */}
          <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200">
            <span className="text-xl font-bold" style={{ color: '#4285F4' }}>G</span>
          </div>

          <StarRating rating={rating} size={24} count={count} showCount />

          <p className="font-display text-lg font-bold text-text-primary">
            {rating} out of 5
          </p>
          <p className="text-sm font-body text-muted">
            Based on {count} Google reviews
          </p>

          <span className="inline-flex items-center gap-1 text-sm font-body text-[var(--color-accent)] group-hover:brightness-110 transition-all">
            Read our reviews <ExternalLink className="w-3 h-3" />
          </span>
        </a>
      </Container>
    </Section>
  );
}
