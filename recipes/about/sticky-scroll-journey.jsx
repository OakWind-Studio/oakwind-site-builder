/**
 * @metadata
 * name: Sticky Scroll Journey
 * category: about
 * KEEP: Left side pins (sticky) with heading, right side scrolls through story chapters,
 *       usePinnedScroll for step tracking, tall container for scroll distance
 * CHANGE: Chapter content, heading text, number of chapters
 * DON'T: Remove sticky pinning, flatten to single column, drop chapter structure
 */

import { motion } from 'motion/react';
import { Section, Container } from '../lib';
import { usePinnedScroll, cn } from '../lib';

export default function StickyScrollJourney({ business, copy }) {
  const chapters = copy?.chapters || [];
  const { containerRef, activeStep } = usePinnedScroll(chapters.length || 3);

  return (
    <Section id="about" spacing="default" animate="none">
      <div ref={containerRef} style={{ minHeight: `${(chapters.length || 3) * 100}vh` }}>
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Sticky left panel */}
            <div className="lg:sticky lg:top-32 lg:self-start">
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
              <div className="mt-8 flex flex-col gap-3">
                {chapters.map((ch, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex items-center gap-3 transition-all duration-300',
                      activeStep === i ? 'opacity-100' : 'opacity-40'
                    )}
                  >
                    <div
                      className={cn(
                        'w-3 h-3 rounded-full transition-colors duration-300',
                        activeStep === i ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'
                      )}
                    />
                    <span className="font-body text-sm text-text-primary">{ch.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scrolling right chapters */}
            <div className="space-y-[50vh] pt-8 pb-[30vh]">
              {chapters.map((ch, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    'transition-opacity duration-500',
                    activeStep === i ? 'opacity-100' : 'opacity-30'
                  )}
                >
                  <h3 className="font-display text-2xl font-bold text-text-primary mb-4">
                    {ch.title}
                  </h3>
                  <p className="font-body text-base text-muted leading-relaxed">
                    {ch.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
