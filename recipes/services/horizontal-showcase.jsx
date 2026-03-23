/**
 * @metadata
 * name: Horizontal Showcase
 * category: services
 * KEEP: Horizontal scroll container with snap-x, cards scroll sideways,
 *       overflow-x-auto on mobile, scroll padding, snap-center per card
 * CHANGE: Service data, card width, snap alignment, styling
 * DON'T: Make it vertical, remove snap behavior, remove horizontal overflow
 */

import { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, cn, fadeUp } from '../lib';

export default function HorizontalShowcase({ services, business }) {
  const scrollRef = useRef(null);
  const [sectionRef, inView] = useInViewport();

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstChild?.offsetWidth || 320;
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: 'smooth' });
  };

  return (
    <Section id="services" weight="standard">
      <Container maxWidth="xl">
        <div className="flex items-end justify-between mb-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
              Our Services
            </h2>
            <p className="mt-2 text-muted font-body">
              Scroll to explore what we offer
            </p>
          </motion.div>

          {/* Desktop nav arrows */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-surface-elevated)] transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-text-primary" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-surface-elevated)] transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-text-primary" />
            </button>
          </div>
        </div>
      </Container>

      {/* Horizontal scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-5 md:px-8 pb-4 no-scrollbar"
        style={{ scrollPaddingLeft: '1.25rem' }}
      >
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={i}
              ref={i === 0 ? sectionRef : undefined}
              className="flex-shrink-0 w-[280px] md:w-[340px] snap-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-5">
                <Icon className="w-7 h-7 text-[var(--color-accent)]" />
              </div>
              <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted font-body leading-relaxed mb-4">
                {service.description}
              </p>
              {service.price && (
                <p className="text-lg font-display font-semibold text-[var(--color-accent)]">
                  {service.price}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
