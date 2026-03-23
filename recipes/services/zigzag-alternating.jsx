/**
 * @metadata
 * name: Zigzag Alternating
 * category: services
 * KEEP: Alternating row layout (image left/text right, then reversed), Grid zigzag variant,
 *       icon badge overlapping image, full-width on mobile stacking
 * CHANGE: Service data, images, descriptions, accent treatment
 * DON'T: Remove the alternation pattern, make all rows same direction, drop image column
 */

import { motion } from 'motion/react';
import { Section, Container, Grid, OakImage } from '../lib';
import { useInViewport, cn, fadeUp } from '../lib';

export default function ZigzagAlternating({ services, business }) {
  return (
    <Section id="services" weight="standard">
      <Container maxWidth="lg">
        <motion.div
          className="text-center mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
            What We Offer
          </h2>
          <p className="mt-3 text-muted font-body max-w-2xl mx-auto">
            Comprehensive services tailored to your needs
          </p>
        </motion.div>

        <Grid variant="zigzag" gap="gap-12 md:gap-16">
          {services.map((service, i) => (
            <ZigzagRow key={i} service={service} index={i} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

function ZigzagRow({ service, index }) {
  const [ref, inView] = useInViewport();
  const Icon = service.icon;

  return (
    <>
      {/* Image side */}
      <motion.div
        ref={ref}
        className="flex-1 relative"
        initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-surface-elevated)]">
          <OakImage
            src={service.image}
            alt={service.title}
            aspect="4/3"
            className="w-full h-full"
          />
        </div>
        {/* Icon badge overlay */}
        <div className="absolute -bottom-4 -right-4 md:bottom-4 md:right-4 w-14 h-14 rounded-xl bg-[var(--color-accent)] flex items-center justify-center shadow-lg">
          <Icon className="w-7 h-7 text-white" />
        </div>
      </motion.div>

      {/* Text side */}
      <motion.div
        className="flex-1 flex flex-col justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
          {service.title}
        </h3>
        <p className="mt-3 text-muted font-body leading-relaxed">
          {service.description}
        </p>
        {service.price && (
          <p className="mt-4 text-lg font-display font-semibold text-[var(--color-accent)]">
            Starting at {service.price}
          </p>
        )}
      </motion.div>
    </>
  );
}
