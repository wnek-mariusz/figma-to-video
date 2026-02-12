import gsap from "gsap";

/**
 * Reusable GSAP animation presets for Remotion scenes.
 *
 * Each preset returns a function that takes a target (ref or selector)
 * and returns GSAP tween config. Use them with gsap.timeline():
 *
 * ```ts
 * gsap.timeline()
 *   .fromTo(el, fadeIn.from, fadeIn.to)
 *   .fromTo(el, slideUp.from, slideUp.to, "-=0.3")
 * ```
 */

// --- Fade Animations ---

export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1, duration: 0.6, ease: "power2.out" },
};

export const fadeOut = {
  from: { opacity: 1 },
  to: { opacity: 0, duration: 0.6, ease: "power2.in" },
};

// --- Slide Animations ---

export const slideUp = {
  from: { y: 80, opacity: 0 },
  to: { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
};

export const slideDown = {
  from: { y: -80, opacity: 0 },
  to: { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
};

export const slideLeft = {
  from: { x: 100, opacity: 0 },
  to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
};

export const slideRight = {
  from: { x: -100, opacity: 0 },
  to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
};

// --- Scale Animations ---

export const scaleIn = {
  from: { scale: 0, opacity: 0 },
  to: { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
};

export const scaleOut = {
  from: { scale: 1, opacity: 1 },
  to: { scale: 0, opacity: 0, duration: 0.5, ease: "back.in(1.7)" },
};

export const popIn = {
  from: { scale: 0.5, opacity: 0 },
  to: { scale: 1, opacity: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" },
};

// --- Rotation Animations ---

export const rotateIn = {
  from: { rotation: -180, opacity: 0, scale: 0.5 },
  to: { rotation: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
};

export const spin = {
  from: { rotation: 0 },
  to: { rotation: 360, duration: 1, ease: "none" },
};

// --- Combination Presets ---

export const heroEntrance = {
  from: { y: 60, opacity: 0, scale: 0.9 },
  to: { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power4.out" },
};

export const subtitleEntrance = {
  from: { y: 30, opacity: 0 },
  to: { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
};

export const exitRight = {
  from: { x: 0, opacity: 1 },
  to: { x: 200, opacity: 0, duration: 0.6, ease: "power2.in" },
};

export const exitLeft = {
  from: { x: 0, opacity: 1 },
  to: { x: -200, opacity: 0, duration: 0.6, ease: "power2.in" },
};

// --- Utility: stagger helper ---

/**
 * Creates stagger config for animating a list of elements sequentially.
 * Use with gsap.fromTo() by spreading into the `to` config:
 *
 * ```ts
 * gsap.timeline().fromTo(
 *   ".item",
 *   { opacity: 0, y: 30 },
 *   { opacity: 1, y: 0, duration: 0.5, ...stagger(0.1) }
 * );
 * ```
 */
export const stagger = (amount: number = 0.15) => ({
  stagger: { amount, ease: "power2.out" },
});
