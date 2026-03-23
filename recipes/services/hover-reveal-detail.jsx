/**
 * @metadata
 * name: Hover Reveal Detail
 * category: services
 * KEEP: Cards show image + title at rest, on hover/tap description fades in over image,
 *       relative + absolute positioning for overlay, smooth opacity transition,
 *       gradient overlay on hover for readability
 * CHANGE: Service data, images, overlay color, grid density
 * DON'T: Remove hover interaction, show description always, drop the image layer
 */

import { motion } from 'motion/react';
import { Section, Container, OakImage } from '../lib';
import { useInViewport, cn, fadeUp } from '../lib';

export default function HoverRevealDetail({ services, business }) {
  return (
    <Section id="services" weight="standard">
      <Container maxWidth="lg">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <RevealCard key={i} service={service} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function RevealCard({ service, index }) {
  const [ref, inView] = useInViewport();
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Background image */}
      <OakImage
        src={service.image}
        alt={service.title}
        aspect="4/5"
        className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500"
      />

      {/* Default gradient — always visible at bottom */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
        }}
      />

      {/* Hover overlay — full dark */}
      <div className="absolute inset-0 z-10 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Always-visible: icon + title at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-display text-lg font-bold text-white">
            {service.title}
          </h3>
        </div>

        {/* Reveal on hover */}
        <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-400">
          <p className="text-sm text-white/80 font-body leading-relaxed mt-1">
            {service.description}
          </p>
          {service.price && (
            <p className="mt-2 font-display font-semibold text-white text-base">
              {service.price}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
