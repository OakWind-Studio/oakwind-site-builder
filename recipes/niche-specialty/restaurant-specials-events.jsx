/**
 * @metadata
 * name: Restaurant Specials & Events
 * category: niche-specialty
 * niche: restaurant
 * KEEP: Weekly specials, events calendar, live music schedule, tabbed layout,
 *       warm restaurant feel, accent callouts for specials
 * CHANGE: Events data, specials data, tab labels
 * DON'T: Remove tabs, flatten all into one list, drop event details
 */

import { motion } from 'motion/react';
import { Calendar, Music, Sparkles } from 'lucide-react';
import { Section, Container } from '../lib';
import { useTabs, cn, fadeUp } from '../lib';

export default function RestaurantSpecialsEvents({ business, copy }) {
  const { activeTab, setActiveTab } = useTabs('specials');
  const specials = copy?.specials || [];
  const events = copy?.events || [];

  const tabs = [
    { key: 'specials', label: 'Specials', icon: Sparkles },
    { key: 'events', label: 'Events', icon: Calendar },
  ];

  return (
    <Section id="events" spacing="generous" bg="elevated">
      <Container maxWidth="md">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || "What's Happening"}
        </motion.h2>

        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'flex items-center gap-2 px-5 py-2 rounded-full text-sm font-body font-semibold transition-all',
                  activeTab === tab.key
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-[var(--color-surface)] text-muted hover:text-text-primary'
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'specials' && (
          <div className="space-y-4">
            {specials.map((s, i) => (
              <div key={i} className="rounded-xl border-2 border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-5">
                <h3 className="font-display text-base font-bold text-text-primary">{s.name}</h3>
                <p className="font-body text-sm text-muted mt-1">{s.description}</p>
                {s.day && <p className="font-body text-xs text-[var(--color-accent)] mt-2 font-semibold">{s.day}</p>}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-4">
            {events.map((e, i) => (
              <div key={i} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                  {e.type === 'music' ? <Music className="w-5 h-5 text-[var(--color-accent)]" /> : <Calendar className="w-5 h-5 text-[var(--color-accent)]" />}
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-text-primary">{e.name}</h3>
                  <p className="font-body text-sm text-muted mt-1">{e.description}</p>
                  {e.date && <p className="font-body text-xs text-muted mt-1">{e.date}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
