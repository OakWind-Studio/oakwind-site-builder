/**
 * @metadata
 * name: Sticky Scroll Journey
 * category: about
 * KEEP: Left side pins (sticky) with heading + step indicators, right side scrolls
 *       through story chapters, useChapterScroll for viewport-center step tracking,
 *       each chapter min-h-[80vh] with flex items-center so text is vertically centered,
 *       gold accent left-border on active chapter, opacity transitions
 * CHANGE: Chapter content, heading text, number of chapters
 * DON'T: Use usePinnedScroll (broken timing), wrap in <Section> (overflow-hidden kills sticky),
 *        use flex items-start (text appears too high), flatten to single column
 *
 * CRITICAL: Use a plain <section> element — NOT the <Section> primitive.
 * The Section primitive defaults to overflow-hidden which breaks position:sticky.
 * Use useChapterScroll (NOT usePinnedScroll) — it measures each chapter's actual
 * viewport position instead of mapping container scroll progress to steps.
 */

import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Container, cn } from '../lib';
// import { useChapterScroll } from '../lib';  // available in shared-lib

/**
 * Inline hook — also exported from shared-lib as useChapterScroll.
 * Tracks which chapter element is closest to the viewport center.
 */
function useChapterScroll(count, targetPosition = 0.45) {
  const chapterRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    function onScroll() {
      const viewportTarget = window.innerHeight * targetPosition;
      let closest = 0;
      let closestDist = Infinity;
      chapterRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - viewportTarget);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      setActiveStep(closest);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [count, targetPosition]);

  const setRef = (i) => (el) => { chapterRefs.current[i] = el; };
  return { activeStep, setRef };
}

export default function StickyScrollJourney({ business, copy }) {
  const chapters = copy?.chapters || [];
  const { activeStep, setRef } = useChapterScroll(chapters.length || 3);

  return (
    /* PLAIN <section> — NOT <Section> which has overflow-hidden that breaks sticky */
    <section id="about" className="relative py-16 md:py-20">
      <Container maxWidth="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Sticky left panel */}
          <div className="lg:sticky lg:top-28 lg:self-start lg:h-fit">
            <motion.h2
              className="font-display text-3xl md:text-5xl font-bold text-text-primary leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {copy?.heading || 'Our Story'}
            </motion.h2>
            <p className="mt-4 font-body text-muted text-lg">
              {copy?.subtext || `The journey of ${business.name}`}
            </p>

            {/* Step indicators */}
            <div className="mt-8 flex flex-col gap-4">
              {chapters.map((ch, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex items-center gap-3 transition-all duration-500 cursor-default',
                    activeStep === i ? 'opacity-100' : 'opacity-30'
                  )}
                >
                  <div
                    className={cn(
                      'rounded-full transition-all duration-500 shrink-0',
                      activeStep === i
                        ? 'w-4 h-4 bg-[var(--color-accent)] shadow-md shadow-[var(--color-accent)]/30'
                        : 'w-2.5 h-2.5 bg-[var(--color-border)]'
                    )}
                  />
                  <span className={cn(
                    'font-body text-sm transition-all duration-500',
                    activeStep === i ? 'text-text-primary font-semibold' : 'text-muted'
                  )}>
                    {ch.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scrolling right chapters */}
          <div className="pt-4">
            {chapters.map((ch, i) => (
              <div
                key={i}
                ref={setRef(i)}
                className="min-h-[80vh] flex items-center"
              >
                <div
                  className={cn(
                    'transition-all duration-700 ease-out',
                    activeStep === i
                      ? 'opacity-100 translate-y-0'
                      : activeStep > i
                        ? 'opacity-15 -translate-y-4'
                        : 'opacity-15 translate-y-8'
                  )}
                >
                  <div className={cn(
                    'border-l-[3px] pl-5 transition-all duration-700',
                    activeStep === i
                      ? 'border-[var(--color-accent)]'
                      : 'border-transparent'
                  )}>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-4">
                      {ch.title}
                    </h3>
                    <p className="font-body text-base md:text-lg text-muted leading-relaxed max-w-lg">
                      {ch.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="h-[30vh]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
