import React, { useRef } from "react";
import { AbsoluteFill } from "remotion";
import gsap from "gsap";
import { useGsapTimeline } from "../../hooks/useGsapTimeline";
import { ExampleDesign } from "../figma/ExampleDesign";

/**
 * Scene01 - Example scene demonstrating the Figma + GSAP + Remotion workflow.
 *
 * This scene:
 * 1. Imports a Figma-exported SVG component (ExampleDesign)
 * 2. Attaches refs to animatable elements
 * 3. Defines a GSAP timeline that drives all animations
 * 4. Uses useGsapTimeline to sync GSAP with Remotion's frame system
 *
 * Timeline (at 30fps, 5 seconds = 150 frames):
 * 0.0s - 0.8s : Decorative shapes fade in with rotation
 * 0.3s - 1.1s : Logo scales in with bounce
 * 0.8s - 1.6s : Title slides up into view
 * 1.2s - 1.9s : Subtitle fades in
 * 3.5s - 4.5s : Everything fades/slides out
 */
export const Scene01: React.FC = () => {
  const logoRef = useRef<SVGGElement>(null);
  const titleRef = useRef<SVGTextElement>(null);
  const subtitleRef = useRef<SVGTextElement>(null);
  const shapesRef = useRef<SVGGElement>(null);

  const scopeRef = useGsapTimeline(() =>
    gsap
      .timeline()
      // Shapes fade in with slight rotation
      .fromTo(
        shapesRef.current,
        { opacity: 0, rotation: -10 },
        { opacity: 1, rotation: 0, duration: 0.8, ease: "power2.out" },
      )
      // Logo bounces in
      .fromTo(
        logoRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        0.3,
      )
      // Title slides up
      .fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.8,
      )
      // Subtitle fades in
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        1.2,
      )
      // Hold for a beat, then exit
      // Logo pulses
      .to(
        logoRef.current,
        {
          scale: 1.05,
          duration: 0.4,
          ease: "power1.inOut",
          yoyo: true,
          repeat: 1,
        },
        2.5,
      )
      // Exit: everything fades out
      .to(
        [titleRef.current, subtitleRef.current],
        { y: -30, opacity: 0, duration: 0.6, ease: "power2.in", stagger: 0.1 },
        3.5,
      )
      .to(
        logoRef.current,
        { scale: 0.8, opacity: 0, duration: 0.5, ease: "power2.in" },
        3.7,
      )
      .to(
        shapesRef.current,
        { opacity: 0, duration: 0.5, ease: "power2.in" },
        3.8,
      ),
  );

  return (
    <AbsoluteFill ref={scopeRef}>
      <ExampleDesign
        logoRef={logoRef}
        titleRef={titleRef}
        subtitleRef={subtitleRef}
        shapesRef={shapesRef}
      />
    </AbsoluteFill>
  );
};
