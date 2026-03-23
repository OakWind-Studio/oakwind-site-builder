/**
 * @metadata
 * name: Interactive Service Finder
 * category: services
 * KEEP: "What do you need?" prompt with clickable option buttons, selecting an option
 *       reveals matching service detail with AnimatePresence, interactive selection UX,
 *       selected state styling, detail panel
 * CHANGE: Service data, prompt copy, button style, detail layout
 * DON'T: Remove the selection interaction, show all details at once, drop the prompt
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone } from 'lucide-react';
import { Section, Container } from '../lib';
import { cn, fadeUp, telHref } from '../lib';

export default function InteractiveServiceFinder({ services, business }) {
  const [selected, setSelected] = useState(null);
  const active = services.find((s) => s.title === selected);

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
            What Do You Need?
          </h2>
          <p className="mt-3 text-muted font-body max-w-lg mx-auto">
            Select a service to learn more
          </p>
        </motion.div>

        {/* Option buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isActive = selected === service.title;

            return (
              <motion.button
                key={i}
                onClick={() => setSelected(isActive ? null : service.title)}
                className={cn(
                  'flex items-center gap-2 px-5 py-3 rounded-xl font-body text-sm font-medium transition-all duration-300 border',
                  isActive
                    ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-lg'
                    : 'bg-[var(--color-surface-elevated)] text-text-primary border-[var(--color-border)] hover:border-[var(--color-accent)]/40'
                )}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon className={cn('w-4 h-4', isActive ? 'text-white' : 'text-[var(--color-accent)]')} />
                {service.title}
              </motion.button>
            );
          })}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.title}
              className="mx-auto max-w-2xl rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-surface-elevated)] p-6 md:p-8"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.97 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                  <active.icon className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary mb-2">
                    {active.title}
                  </h3>
                  <p className="text-muted font-body leading-relaxed">
                    {active.description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    {active.price && (
                      <span className="font-display text-lg font-bold text-[var(--color-accent)]">
                        {active.price}
                      </span>
                    )}
                    <a
                      href={telHref(business.phone)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-accent)] text-white font-body font-semibold text-sm hover:brightness-110 transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
