/**
 * @metadata
 * name: Card Carousel
 * category: services
 * KEEP: CSS-only card carousel with scroll-snap (no Swiper dependency), horizontal scroll
 *       with snap points, navigation dots indicating active card, scroll-snap-type mandatory
 * CHANGE: Service data, card width, dot style, card design
 * DON'T: Add Swiper or third-party carousel library, remove snap behavior, drop nav dots
 */

import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Section, Container } from '../lib';
import { useInViewport, cn, fadeUp } from '../lib';

export default function CardCarousel({ services, business }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionRef, inView] = useInViewport();

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.firstChild?.offsetWidth || 300;
      const gap = 24;
      const idx = Math.round(el.scrollLeft / (cardWidth + gap));
      setActiveIndex(idx);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (index) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstChild?.offsetWidth || 300;
    const gap = 24;
    el.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
  };

  return (
    <Section id="services" weight="standard">
      <Container maxWidth="lg">
        <motion.div
          className="text-center mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
            Our Services
          </h2>
          <p className="mt-3 text-muted font-body max-w-xl mx-auto">
            Swipe to explore our offerings
          </p>
        </motion.div>
      </Container>

      {/* Carousel track */}
      <div
        ref={(el) => { trackRef.current = el; if (sectionRef) sectionRef.current = el; }}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-5 md:px-[calc((100vw-64rem)/2+2rem)] pb-6 no-scrollbar"
      >
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={i}
              className="flex-shrink-0 w-[85vw] sm:w-[320px] md:w-[360px] snap-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {/* Card image area */}
              <div className="h-48 bg-[var(--color-accent)]/5 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                  <Icon className="w-10 h-10 text-[var(--color-accent)]" />
                </div>
              </div>

              {/* Card content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted font-body leading-relaxed mb-4">
                  {service.description}
                </p>
                {service.price && (
                  <p className="font-display text-lg font-semibold text-[var(--color-accent)]">
                    {service.price}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <Container maxWidth="lg">
        <div className="flex justify-center gap-2 mt-4">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all duration-300',
                activeIndex === i
                  ? 'bg-[var(--color-accent)] w-6'
                  : 'bg-[var(--color-border)] hover:bg-[var(--color-accent)]/40'
              )}
              aria-label={`Go to service ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
