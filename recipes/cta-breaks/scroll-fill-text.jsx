/**
 * @metadata
 * name: Scroll Fill Text
 * category: cta-breaks
 * NOTE: max 1 in 7 builds
 * KEEP: Tagline text fills with accent color character-by-character on scroll,
 *       useScroll + useTransform for progressive fill. Weight: hero. Centered layout.
 * CHANGE: Tagline text, CTA copy, fill color behavior
 * DON'T: Remove the scroll-driven fill effect, make it static, drop the phone CTA
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Phone } from 'lucide-react';
import { Section, Container } from '../lib';
import { telHref } from '../lib';

export default function ScrollFillText({ business, copy }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const tagline = copy?.headline || 'Quality You Can Trust';
  const chars = tagline.split('');

  return (
    <Section id="scroll-fill" weight="hero" spacing="hero" animate="none">
      <div ref={sectionRef} className="min-h-screen flex items-center">
        <Container maxWidth="lg" className="text-center py-20">
          {/* Scroll-filling text */}
          <p className="font-display text-4xl md:text-6xl lg:text-8xl font-bold leading-tight">
            {chars.map((char, i) => (
              <ScrollChar
                key={i}
                char={char}
                index={i}
                total={chars.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </p>

          {/* CTA appears after text */}
          <motion.div
            className="mt-12"
            style={{
              opacity: useTransform(scrollYProgress, [0.6, 0.8], [0, 1]),
            }}
          >
            <p className="text-lg text-muted font-body mb-6">
              {copy?.subtext || 'Call us today and experience the difference.'}
            </p>
            <a
              href={telHref(business.phone)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-accent)] text-white font-semibold text-lg shadow-xl hover:brightness-110 transition-all"
            >
              <Phone className="w-5 h-5" />
              {copy?.cta || 'Call Now'}
            </a>
          </motion.div>
        </Container>
      </div>
    </Section>
  );
}

function ScrollChar({ char, index, total, scrollYProgress }) {
  // Each character fills at a slightly different scroll position
  const start = (index / total) * 0.6;
  const end = start + 0.08;
  const color = useTransform(
    scrollYProgress,
    [start, end],
    ['var(--color-border)', 'var(--color-accent)']
  );

  if (char === ' ') return <span>&nbsp;</span>;

  return (
    <motion.span
      className="inline-block"
      style={{ color }}
    >
      {char}
    </motion.span>
  );
}
