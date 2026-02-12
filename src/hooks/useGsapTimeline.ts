import { useRef, useEffect } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import gsap from "gsap";

/**
 * Bridge between GSAP timeline animations and Remotion's frame-based rendering.
 *
 * How it works:
 * 1. Creates a GSAP timeline via the provided factory function
 * 2. Immediately pauses the timeline (so GSAP doesn't auto-play)
 * 3. On every frame change, seeks the GSAP timeline to `frame / fps` seconds
 *
 * Usage:
 * ```tsx
 * const scopeRef = useGsapTimeline(() =>
 *   gsap.timeline()
 *     .fromTo(".box", { opacity: 0 }, { opacity: 1, duration: 1 })
 *     .to(".box", { x: 200, duration: 0.5 })
 * );
 *
 * return <AbsoluteFill ref={scopeRef}>...</AbsoluteFill>;
 * ```
 *
 * IMPORTANT: The returned ref must be assigned to the container element.
 * GSAP selectors (like ".box") will only match descendants of that container.
 */
export const useGsapTimeline = (
  gsapTimelineFactory: () => gsap.core.Timeline,
) => {
  const animationScopeRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsapTimelineFactory();
      tl.pause();
      timelineRef.current = tl;
    }, animationScopeRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.seek(frame / fps);
    }
  }, [frame, fps]);

  return animationScopeRef;
};
