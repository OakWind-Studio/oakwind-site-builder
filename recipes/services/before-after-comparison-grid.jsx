/**
 * @metadata
 * name: Before After Comparison Grid
 * category: services
 * KEEP: 2x2 or 3x2 grid where each cell is a before/after pair, split design within cell,
 *       draggable divider (useBeforeAfter), labels for "Before" and "After"
 * CHANGE: Service data, grid density, image pairs, label text
 * DON'T: Remove the before/after comparison, make cells single-image, drop the divider
 */

import { motion } from 'motion/react';
import { Section, Container, OakImage } from '../lib';
import { useBeforeAfter, useInViewport, cn, fadeUp } from '../lib';

export default function BeforeAfterComparisonGrid({ services, business }) {
  return (
    <Section id="services" weight="standard">
      <Container maxWidth="lg">
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
            See the Difference
          </h2>
          <p className="mt-3 text-muted font-body max-w-xl mx-auto">
            Real results from real clients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <ComparisonCell key={i} service={service} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ComparisonCell({ service, index }) {
  const [ref, inView] = useInViewport();
  const { position, containerRef, handleMouseDown, handleTouchStart } = useBeforeAfter(50);
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-elevated)]"
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Before/After image comparison */}
      <div
        ref={containerRef}
        className="relative aspect-[16/10] cursor-ew-resize select-none overflow-hidden"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* After (full) */}
        <OakImage
          src={service.afterImage || service.image}
          alt={`${service.title} after`}
          aspect="16/10"
          className="absolute inset-0 w-full h-full"
        />
        {/* Before (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <OakImage
            src={service.beforeImage || service.image}
            alt={`${service.title} before`}
            aspect="16/10"
            className="w-full h-full"
            style={{ minWidth: `${100 / (position / 100)}%`, maxWidth: 'none' }}
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-3 bg-gray-400 rounded-full" />
              <div className="w-0.5 h-3 bg-gray-400 rounded-full" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 text-white text-xs font-body rounded z-10">
          Before
        </span>
        <span className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 text-white text-xs font-body rounded z-10">
          After
        </span>
      </div>

      {/* Service info */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="w-5 h-5 text-[var(--color-accent)]" />
          <h3 className="font-display text-lg font-bold text-text-primary">
            {service.title}
          </h3>
        </div>
        <p className="text-sm text-muted font-body leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}
