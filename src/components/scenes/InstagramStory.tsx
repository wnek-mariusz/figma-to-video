import React, { useRef } from "react";
import { AbsoluteFill } from "remotion";
import gsap from "gsap";
import { useGsapTimeline } from "../../hooks/useGsapTimeline";
import { Slide1 } from "../figma/Slide1";
import { Slide2 } from "../figma/Slide2";

/**
 * InstagramStory - Animated transition between two Figma artboards.
 *
 * Canvas: 1080×1920 (9:16 portrait, Instagram story format)
 * Duration: 6 seconds = 180 frames at 30fps
 *
 * Timeline:
 * 0.0s - 0.2s : Yellow background visible
 * 0.2s - 0.7s : "Turn clients" slides up into view
 * 0.4s - 0.9s : "into friends" slides up into view
 * 0.9s - 2.5s : Hold on Slide 1
 * 2.5s - 3.3s : Vertical wipe — Slide 1 exits up, Slide 2 enters from below
 * 3.1s - 3.6s : Stripes pattern fades in
 * 3.3s - 3.8s : Checkmark icon bounces in
 * 3.5s - 4.1s : Text slides up into view
 * 4.1s - 6.0s : Hold on Slide 2
 *
 * Initial states are set via CSS inline styles (not GSAP .set())
 * to ensure they're applied before the first frame renders.
 * GSAP .to() tweens animate FROM the CSS initial state.
 */
export const InstagramStory: React.FC = () => {
  // Slide container refs (for the vertical transition)
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);

  // Slide 1 element refs
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);

  // Slide 2 element refs
  const stripesRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const scopeRef = useGsapTimeline(
    () =>
      gsap
        .timeline()

        // ── Slide 1: Text entrance ──
        // CSS initial: opacity: 0, translateY(60px)
        .to(
          titleLine1Ref.current,
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          0.2,
        )
        .to(
          titleLine2Ref.current,
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          0.45,
        )

        // ── Transition: Vertical slide ──
        // Slide 1 exits upward, Slide 2 enters from below
        .to(
          slide1Ref.current,
          { y: -1920, duration: 0.8, ease: "power2.inOut" },
          2.5,
        )
        .to(
          slide2Ref.current,
          { y: 0, duration: 0.8, ease: "power2.inOut" },
          2.5,
        )

        // ── Slide 2: Element entrances ──
        // Stripes fade in subtly
        .to(
          stripesRef.current,
          { opacity: 1, duration: 0.5, ease: "power1.out" },
          3.1,
        )
        // Checkmark bounces in
        .to(
          iconRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          3.3,
        )
        // Text slides up
        .to(
          textRef.current,
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          3.5,
        ),
  );

  return (
    <AbsoluteFill ref={scopeRef} style={{ overflow: "hidden" }}>
      {/* Slide 1 — Yellow with "Turn clients into friends" */}
      <div
        ref={slide1Ref}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
        }}
      >
        <Slide1 titleLine1Ref={titleLine1Ref} titleLine2Ref={titleLine2Ref} />
      </div>

      {/* Slide 2 — White with stripes, checkmark, and text */}
      {/* CSS initial: translateY(1920px) — starts off-screen below */}
      <div
        ref={slide2Ref}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          transform: "translateY(1920px)",
        }}
      >
        <Slide2
          stripesRef={stripesRef}
          iconRef={iconRef}
          textRef={textRef}
        />
      </div>
    </AbsoluteFill>
  );
};
