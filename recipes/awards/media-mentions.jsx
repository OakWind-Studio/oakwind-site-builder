/**
 * @metadata
 * name: Media Mentions
 * category: awards
 * KEEP: "Featured In" heading with publication logos + links, grayscale logos,
 *       hover reveals color, clean horizontal strip
 * CHANGE: Publication data, logos, links
 * DON'T: Remove logos, flatten to text, show in color by default
 */

import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function MediaMentions({ business, copy }) {
  const [ref, inView] = useInViewport();
  const mentions = copy?.mentions || [];

  return (
    <Section id="media" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-2xl md:text-3xl font-bold text-text-primary text-center mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Featured In'}
        </motion.h2>

        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {mentions.map((pub, i) => (
            <motion.a
              key={i}
              href={pub.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-[var(--color-surface-elevated)] transition-colors group"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              {pub.logo ? (
                <img
                  src={pub.logo}
                  alt={pub.name}
                  className="h-8 object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                />
              ) : (
                <span className="font-display text-sm font-bold text-muted group-hover:text-text-primary transition-colors">
                  {pub.name}
                </span>
              )}
              <span className="text-xs text-muted flex items-center gap-1 group-hover:text-[var(--color-accent)]">
                Read <ExternalLink className="w-3 h-3" />
              </span>
            </motion.a>
          ))}
        </div>
      </Container>
    </Section>
  );
}
