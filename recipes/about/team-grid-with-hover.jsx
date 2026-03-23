/**
 * @metadata
 * name: Team Grid with Hover
 * category: about
 * KEEP: Grid of team cards, photo + name always visible, hover reveals role + bio,
 *       smooth overlay transition, rounded card styling
 * CHANGE: Team member data, grid columns, overlay color
 * DON'T: Remove hover interaction, show all info upfront, drop photos
 */

import { motion } from 'motion/react';
import { Section, Container, OakImage } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function TeamGridWithHover({ business, copy }) {
  const [ref, inView] = useInViewport();
  const team = copy?.team || [];

  return (
    <Section id="team" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Meet the Team'}
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={i}
              className="group relative rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <OakImage
                src={member.photo}
                alt={member.name}
                aspect="3/4"
                className="w-full"
              />

              {/* Always visible name bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="font-display text-lg font-bold text-white">{member.name}</h3>
              </div>

              {/* Hover overlay with role + bio */}
              <div className="absolute inset-0 bg-[var(--color-accent)]/90 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-display text-lg font-bold text-white">{member.name}</h3>
                <p className="text-sm text-white/80 font-semibold mt-1">{member.role}</p>
                {member.bio && (
                  <p className="text-sm text-white/70 font-body mt-2 leading-relaxed">{member.bio}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
