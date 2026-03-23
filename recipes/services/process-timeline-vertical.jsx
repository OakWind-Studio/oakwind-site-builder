/**
 * @metadata
 * name: Process Timeline Vertical
 * category: services
 * KEEP: Vertical timeline with connecting line, each service is a node on the timeline,
 *       numbers/icons at each node, line draws on scroll via useScrollProgress,
 *       alternating left/right on desktop
 * CHANGE: Service data, node style, line color, number vs icon choice
 * DON'T: Make it horizontal, remove the connecting line, drop node markers
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Section, Container } from '../lib';
import { useInViewport, cn, fadeUp } from '../lib';

export default function ProcessTimelineVertical({ services, business }) {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 20%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <Section id="services" weight="standard">
      <Container maxWidth="md">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Process
        </motion.h2>
        <motion.p
          className="text-muted font-body text-center mb-14 max-w-lg mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Step by step, we deliver excellence
        </motion.p>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Background line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-[var(--color-border)]" />
          {/* Animated fill line */}
          <motion.div
            className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 w-0.5 bg-[var(--color-accent)]"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12">
            {services.map((service, i) => (
              <TimelineNode key={i} service={service} index={i} total={services.length} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function TimelineNode({ service, index }) {
  const [ref, inView] = useInViewport();
  const Icon = service.icon;
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex items-start gap-6 pl-16 md:pl-0',
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      )}
    >
      {/* Node marker */}
      <motion.div
        className="absolute left-3 md:left-1/2 md:-translate-x-1/2 z-10 w-7 h-7 rounded-full bg-[var(--color-accent)] flex items-center justify-center shadow-md"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <span className="text-white text-xs font-bold font-body">
          {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>

      {/* Content card */}
      <motion.div
        className={cn(
          'md:w-[calc(50%-2rem)] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5',
          isEven ? 'md:mr-auto' : 'md:ml-auto'
        )}
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Icon className="w-5 h-5 text-[var(--color-accent)]" />
          <h3 className="font-display text-lg font-bold text-text-primary">
            {service.title}
          </h3>
        </div>
        <p className="text-sm text-muted font-body leading-relaxed">
          {service.description}
        </p>
        {service.price && (
          <p className="mt-2 text-sm font-display font-semibold text-[var(--color-accent)]">
            {service.price}
          </p>
        )}
      </motion.div>
    </div>
  );
}
