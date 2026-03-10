"use client";

import {
  motion,
  useInView,
  Variants,
  HTMLMotionProps,
  Transition,
} from "motion/react";
import { useRef, ReactNode } from "react";

// ─── Shared defaults ────────────────────────────────────────────────────────

const DEFAULT_TRANSITION: Transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1], // cubic-bezier "ease"
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface WrapperProps {
  children: ReactNode;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Animation duration (seconds) */
  duration?: number;
  /** Only animate once when it enters the viewport */
  once?: boolean;
  /** How much of the element must be visible before triggering (0–1) */
  threshold?: number;
  className?: string;
}

// ─── 1. FadeIn ────────────────────────────────────────────────────────────────
/**
 * Fades the child in from transparent to opaque.
 * Great for page sections, modals, overlays.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
  className,
}: WrapperProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ ...DEFAULT_TRANSITION, duration, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── 2. FadeUp ────────────────────────────────────────────────────────────────
/**
 * Fades in while rising from below. The most versatile entrance.
 * Perfect for hero text, cards, CTA sections.
 */
export function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.1,
  className,
  distance = 32,
}: WrapperProps & { distance?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{ ...DEFAULT_TRANSITION, duration, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── 3. FadeDown ─────────────────────────────────────────────────────────────
/** Fades in while falling from above. Good for dropdowns, nav menus. */
export function FadeDown({
  children,
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.1,
  className,
  distance = 32,
}: WrapperProps & { distance?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: -distance }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -distance }}
      transition={{ ...DEFAULT_TRANSITION, duration, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── 4. FadeLeft / FadeRight ─────────────────────────────────────────────────
/** Slides in from left. Good for sidebars, split-screen sections. */
export function FadeLeft({
  children,
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.1,
  className,
  distance = 40,
}: WrapperProps & { distance?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: -distance }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -distance }}
      transition={{ ...DEFAULT_TRANSITION, duration, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Slides in from right. Good for cards, testimonials, feature lists. */
export function FadeRight({
  children,
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.1,
  className,
  distance = 40,
}: WrapperProps & { distance?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: distance }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: distance }}
      transition={{ ...DEFAULT_TRANSITION, duration, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── 5. ScaleIn ───────────────────────────────────────────────────────────────
/**
 * Scales up from a smaller size. Great for icons, badges, images.
 * Use `spring` for a bouncy feel.
 */
export function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
  className,
  from = 0.85,
  spring = false,
}: WrapperProps & { from?: number; spring?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: from }}
      animate={
        inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: from }
      }
      transition={
        spring
          ? { type: "spring", stiffness: 300, damping: 24, delay }
          : { ...DEFAULT_TRANSITION, duration, delay }
      }
    >
      {children}
    </motion.div>
  );
}

// ─── 6. BlurIn ────────────────────────────────────────────────────────────────
/**
 * Fades in while unblurring. Luxurious feel for hero images, headings.
 * NOTE: filter animations can be GPU-intensive — use sparingly.
 */
export function BlurIn({
  children,
  delay = 0,
  duration = 0.7,
  once = true,
  threshold = 0.1,
  className,
  blurAmount = 12,
}: WrapperProps & { blurAmount?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: `blur(${blurAmount}px)` }}
      animate={
        inView
          ? { opacity: 1, filter: "blur(0px)" }
          : { opacity: 0, filter: `blur(${blurAmount}px)` }
      }
      transition={{ ...DEFAULT_TRANSITION, duration, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── 7. SlideReveal ───────────────────────────────────────────────────────────
/**
 * Clips content in with a sliding mask — editorial / high-end feel.
 * Useful for headings, pull-quotes, image reveals.
 */
export function SlideReveal({
  children,
  delay = 0,
  duration = 0.7,
  once = true,
  threshold = 0.1,
  className,
  direction = "up",
}: WrapperProps & { direction?: "up" | "down" | "left" | "right" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: threshold });

  const clipMap = {
    up: {
      hidden: "inset(100% 0 0 0)",
      visible: "inset(0% 0 0 0)",
    },
    down: {
      hidden: "inset(0 0 100% 0)",
      visible: "inset(0 0 0% 0)",
    },
    left: {
      hidden: "inset(0 100% 0 0)",
      visible: "inset(0 0% 0 0)",
    },
    right: {
      hidden: "inset(0 0 0 100%)",
      visible: "inset(0 0 0 0%)",
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: clipMap[direction].hidden }}
      animate={
        inView
          ? { clipPath: clipMap[direction].visible }
          : { clipPath: clipMap[direction].hidden }
      }
      transition={{ ...DEFAULT_TRANSITION, duration, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── 8. Stagger (List Wrapper) ────────────────────────────────────────────────
/**
 * Wraps a list of items and staggers their entrance animations.
 *
 * Usage:
 *   <StaggerList>
 *     {cards.map(card => (
 *       <StaggerItem key={card.id}>
 *         <CardComponent {...card} />
 *       </StaggerItem>
 *     ))}
 *   </StaggerList>
 */

interface StaggerListProps {
  children: ReactNode;
  /** Delay between each child (seconds) */
  staggerDelay?: number;
  /** Delay before the whole list starts (seconds) */
  initialDelay?: number;
  /** Only trigger once when scrolled into view */
  once?: boolean;
  threshold?: number;
  className?: string;
}

const staggerContainer = (staggerDelay: number, initialDelay: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

export function StaggerList({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  once = true,
  threshold = 0.05,
  className,
}: StaggerListProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer(staggerDelay, initialDelay)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

// ─── 9. StaggerItem ───────────────────────────────────────────────────────────
/**
 * Individual item inside <StaggerList>.
 * Swap the `variant` prop to change per-item entrance style.
 */

type StaggerVariant = "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "scale";

const itemVariants: Record<StaggerVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.88 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 22 },
    },
  },
};

interface StaggerItemProps {
  children: ReactNode;
  variant?: StaggerVariant;
  className?: string;
}

export function StaggerItem({
  children,
  variant = "fadeUp",
  className,
}: StaggerItemProps) {
  return (
    <motion.div className={className} variants={itemVariants[variant]}>
      {children}
    </motion.div>
  );
}

// ─── 10. AnimatePresenceWrapper ───────────────────────────────────────────────
/**
 * A thin convenience wrapper — re-export AnimatePresence so you don't
 * need to import from motion everywhere.
 */
export { AnimatePresence } from "motion/react";
