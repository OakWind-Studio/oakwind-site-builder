/**
 * @metadata
 * name: Video Background Section
 * category: video
 * KEEP: Background video with content overlay, muted autoplay loop,
 *       dark overlay for text readability, headline + CTA over video
 * CHANGE: Video source, overlay text, CTA
 * DON'T: Remove dark overlay, add audio, drop content overlay
 */

import { Phone } from 'lucide-react';
import { Section, Container } from '../lib';
import { telHref } from '../lib';

export default function VideoBackgroundSection({ business, copy }) {
  return (
    <Section id="video-bg" weight="hero" spacing="hero" animate="none" className="relative">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      >
        {copy?.videoSrc && <source src={copy.videoSrc} type="video/mp4" />}
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-[1]" aria-hidden="true" />

      {/* Content */}
      <Container maxWidth="md" className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center py-20">
        <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight">
          {copy?.headline}
        </h2>
        <p className="mt-4 font-body text-lg text-white/80 max-w-lg">
          {copy?.subtext}
        </p>
        <a
          href={telHref(business.phone)}
          className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-accent)] text-white font-semibold text-lg shadow-xl hover:brightness-110 transition-all"
        >
          <Phone className="w-5 h-5" />
          {copy?.cta || 'Call Now'}
        </a>
      </Container>
    </Section>
  );
}
