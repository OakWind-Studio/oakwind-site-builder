/**
 * @metadata
 * name: Gradient Animated Headline
 * category: cta-breaks
 * KEEP: Full-width accent bg, headline with typewriter effect (useTypewriter),
 *       CTA button below. Bold, energetic. Cursor blink after completion.
 * CHANGE: Headline text, typewriter speed, bg color, CTA copy
 * DON'T: Remove the typewriter effect, drop accent background, remove phone CTA
 */

import { Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { Section, Container } from '../lib';
import { useTypewriter, telHref, cn } from '../lib';

export default function GradientAnimatedHeadline({ business, copy }) {
  const headline = copy?.headline || 'Let Us Transform Your Space';
  const { displayText, isComplete, ref } = useTypewriter(headline, 45);

  return (
    <Section id="cta-gradient" bg="accent" spacing="generous" animate="none">
      <Container maxWidth="lg" className="text-center py-8 md:py-16">
        {/* Typewriter headline */}
        <div ref={ref} className="min-h-[4rem] md:min-h-[6rem]">
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {displayText}
            <motion.span
              className="inline-block w-[3px] h-[0.85em] bg-white ml-1 align-middle"
              animate={{ opacity: isComplete ? [1, 0] : 1 }}
              transition={isComplete ? { duration: 0.6, repeat: Infinity, repeatType: 'reverse' } : {}}
              aria-hidden="true"
            />
          </h2>
        </div>

        <motion.p
          className="mt-6 text-lg md:text-xl text-white/80 font-body max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isComplete ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {copy?.subtext || 'Contact us today for a free consultation and quote.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href={telHref(business.phone)}
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
            style={{ color: 'var(--color-accent)' }}
          >
            <Phone className="w-5 h-5" />
            {copy?.cta || 'Call Now'}
          </a>
        </motion.div>
      </Container>
    </Section>
  );
}
