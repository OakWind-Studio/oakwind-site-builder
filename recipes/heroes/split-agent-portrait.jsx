/**
 * @metadata
 * name: Split Agent Portrait
 * category: heroes
 * KEEP: Two-column split (photo left, credentials right), warm-glow frame,
 *       credentials hierarchy (name → title → rating → certs → CTA)
 * CHANGE: Name, title, certifications list, photo, CTA copy
 * DON'T: Make photo full-width on desktop, remove credentials hierarchy, drop rating
 */

import { motion } from 'motion/react';
import { Phone, Shield, Award } from 'lucide-react';
import { Section, Container, FramedImage, OakImage, StarRating } from '../lib';
import { useAnimationSequence, telHref } from '../lib';

export default function SplitAgentPortrait({ business, copy, images, reviews }) {
  const seq = useAnimationSequence();

  return (
    <Section id="hero" weight="hero" spacing="hero" animate="none">
      <Container maxWidth="xl" className="min-h-screen flex items-center pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 lg:gap-16 items-center w-full">

          {/* Photo — left 40% */}
          <motion.div
            className="md:col-span-2"
            initial={seq.bg.initial}
            animate={seq.bg.animate}
            transition={seq.bg.transition}
          >
            <FramedImage frame="warm-glow" className="max-w-sm mx-auto md:mx-0">
              <OakImage
                src={images?.portrait || images?.hero}
                alt={business.owner || business.name}
                aspect="3/4"
                loading="eager"
              />
            </FramedImage>
          </motion.div>

          {/* Credentials — right 60% */}
          <div className="md:col-span-3 text-center md:text-left">
            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight"
              initial={seq.headline.initial}
              animate={seq.headline.animate}
              transition={seq.headline.transition}
            >
              {business.owner || copy?.headline}
            </motion.h1>

            <motion.p
              className="mt-2 text-lg md:text-xl text-accent font-display font-medium"
              initial={seq.subtext.initial}
              animate={seq.subtext.animate}
              transition={seq.subtext.transition}
            >
              {copy?.title || business.tagline}
            </motion.p>

            <motion.div
              className="mt-4 flex items-center gap-2 justify-center md:justify-start"
              initial={seq.trust.initial}
              animate={seq.trust.animate}
              transition={seq.trust.transition}
            >
              <StarRating rating={reviews?.average || 5} size={20} count={reviews?.count} showCount />
            </motion.div>

            {/* Certifications */}
            <motion.ul
              className="mt-6 space-y-2"
              initial={seq.badge.initial}
              animate={seq.badge.animate}
              transition={seq.badge.transition}
            >
              {(copy?.certifications || []).map((cert, i) => (
                <li key={i} className="flex items-center gap-2 text-muted font-body text-sm justify-center md:justify-start">
                  {i % 2 === 0 ? <Shield className="w-4 h-4 text-accent" /> : <Award className="w-4 h-4 text-accent" />}
                  {cert}
                </li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-8"
              initial={seq.cta.initial}
              animate={seq.cta.animate}
              transition={seq.cta.transition}
            >
              <a
                href={telHref(business.phone)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-semibold text-lg shadow-lg hover:brightness-110 transition-all"
              >
                <Phone className="w-5 h-5" />
                {copy?.cta || 'Schedule Consultation'}
              </a>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
