/**
 * @metadata
 * name: Accordion Detailed
 * category: services
 * KEEP: Expandable accordion per service, useToggle per item, collapsed shows icon + title + price,
 *       expanded shows full description, smooth height animation, only one open at a time
 * CHANGE: Service data, expand/collapse styling, icon placement
 * DON'T: Remove expand/collapse interaction, show all descriptions at once, drop chevron indicator
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Section, Container } from '../lib';
import { cn, fadeUp } from '../lib';

export default function AccordionDetailed({ services, business }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i));

  return (
    <Section id="services" weight="standard">
      <Container maxWidth="md">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h2>

        <div className="space-y-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={i}
                className={cn(
                  'rounded-xl border transition-colors duration-300',
                  isOpen
                    ? 'border-[var(--color-accent)]/30 bg-[var(--color-surface-elevated)]'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)]'
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                {/* Collapsed header — always visible */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center gap-4 p-5 md:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-bold text-text-primary truncate">
                      {service.title}
                    </h3>
                  </div>
                  {service.price && (
                    <span className="hidden sm:block text-sm font-display font-semibold text-[var(--color-accent)] flex-shrink-0">
                      {service.price}
                    </span>
                  )}
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-muted transition-transform duration-300 flex-shrink-0',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>

                {/* Expanded detail */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0">
                        <div className="border-t border-[var(--color-border)] pt-4">
                          <p className="text-muted font-body leading-relaxed">
                            {service.description}
                          </p>
                          {service.price && (
                            <p className="mt-3 sm:hidden font-display font-semibold text-[var(--color-accent)]">
                              {service.price}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
