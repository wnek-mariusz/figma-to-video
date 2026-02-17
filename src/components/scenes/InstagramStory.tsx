import React, { useRef } from "react";
import { AbsoluteFill } from "remotion";
import gsap from "gsap";
import { useGsapTimeline } from "../../hooks/useGsapTimeline";

/**
 * Instagram Carousel Video — "Jak skalować zarobki bez wypalenia w 2026?"
 * Filar: Business OS
 *
 * Canvas: 1080×1920 (9:16 portrait, Instagram format)
 * Duration: 18 seconds = 540 frames at 30fps
 * 6 slides with varied GSAP transitions
 *
 * Design system from Figma (aZjRgdYZo0elQEsBrwebEb):
 *   Type A (yellow #FACC15): Hook/solution/profit/CTA slides
 *   Type B (white #FFFFFF): Problem/technology slides with stripes + icon
 *   Accent: #4ADE80 (green)
 *   Font: Zodiak/Georgia serif + Inter/Helvetica sans
 *
 * Timeline (18s total, 3s per slide):
 *   0.0 – 2.4s  Slide 1 (Hook)
 *   2.4 – 3.1s  Transition 1→2: Vertical slide up
 *   3.1 – 5.4s  Slide 2 (Problem)
 *   5.4 – 6.0s  Transition 2→3: Zoom dissolve
 *   6.0 – 8.4s  Slide 3 (Rozwiązanie)
 *   8.4 – 9.1s  Transition 3→4: Horizontal push
 *   9.1 – 11.4s Slide 4 (Technologia)
 *  11.4 – 12.0s Transition 4→5: Rotate + fade
 *  12.0 – 14.4s Slide 5 (Profit)
 *  14.4 – 15.1s Transition 5→6: Scale bounce
 *  15.1 – 18.0s Slide 6 (CTA)
 *
 * Initial states are set via CSS inline styles (not GSAP .set())
 * to ensure correctness on the very first rendered frame.
 */

// ── Design tokens ──
const YELLOW = "#FACC15";
const GREEN = "#4ADE80";
const BLACK = "#000000";
const WHITE = "#FFFFFF";

const serif = '"Zodiak", Georgia, "Times New Roman", serif';
const sans = '"Inter", "Helvetica Neue", Arial, sans-serif';

const fullSlide: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: 1080,
  height: 1920,
  overflow: "hidden",
};

// ── Inline SVG icons ──

const ClockIcon: React.FC = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="60" fill={GREEN} />
    <circle
      cx="60"
      cy="60"
      r="30"
      stroke={BLACK}
      strokeWidth="5"
      fill="none"
    />
    <line
      x1="60"
      y1="60"
      x2="60"
      y2="38"
      stroke={BLACK}
      strokeWidth="5"
      strokeLinecap="round"
    />
    <line
      x1="60"
      y1="60"
      x2="76"
      y2="60"
      stroke={BLACK}
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
);

const HeartIcon: React.FC = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="60" fill={GREEN} />
    <path
      d="M60 88C38 74 26 58 34 44C40 36 50 38 60 50C70 38 80 36 86 44C94 58 82 74 60 88Z"
      fill={BLACK}
    />
  </svg>
);

const CheckmarkIcon: React.FC = () => (
  <svg width="140" height="140" viewBox="0 0 54 54" fill="none">
    <circle cx="27" cy="27" r="27" fill={GREEN} />
    <path
      d="M40.75 22.58L25.44 37.89C25.08 38.25 24.6 38.45 24.09 38.45C23.58 38.45 23.1 38.25 22.74 37.89L14.2 29.3C13.84 28.94 13.64 28.46 13.64 27.95C13.64 27.45 13.84 26.96 14.2 26.61L16.58 24.22C16.94 23.86 17.43 23.66 17.93 23.66C18.44 23.66 18.92 23.86 19.28 24.22L24.14 28.93L35.68 17.54C36.03 17.18 36.52 16.98 37.02 16.98C37.53 16.98 38.01 17.18 38.37 17.54L40.75 19.87C41.11 20.22 41.32 20.72 41.32 21.22C41.32 21.72 41.11 22.22 40.75 22.58Z"
      fill={BLACK}
    />
  </svg>
);

// ── Main component ──

export const InstagramStory: React.FC = () => {
  // ── Slide container refs ──
  const slide1 = useRef<HTMLDivElement>(null);
  const slide2 = useRef<HTMLDivElement>(null);
  const slide3 = useRef<HTMLDivElement>(null);
  const slide4 = useRef<HTMLDivElement>(null);
  const slide5 = useRef<HTMLDivElement>(null);
  const slide6 = useRef<HTMLDivElement>(null);

  // ── Slide 1 (Hook) element refs ──
  const s1_label = useRef<HTMLDivElement>(null);
  const s1_title = useRef<HTMLDivElement>(null);
  const s1_accent = useRef<HTMLDivElement>(null);
  const s1_line = useRef<HTMLDivElement>(null);

  // ── Slide 2 (Problem) element refs ──
  const s2_stripes = useRef<HTMLDivElement>(null);
  const s2_label = useRef<HTMLDivElement>(null);
  const s2_icon = useRef<HTMLDivElement>(null);
  const s2_title = useRef<HTMLDivElement>(null);
  const s2_sub = useRef<HTMLDivElement>(null);

  // ── Slide 3 (Rozwiązanie) element refs ──
  const s3_label = useRef<HTMLDivElement>(null);
  const s3_title = useRef<HTMLDivElement>(null);
  const s3_sub = useRef<HTMLDivElement>(null);
  const s3_line = useRef<HTMLDivElement>(null);

  // ── Slide 4 (Technologia) element refs ──
  const s4_stripes = useRef<HTMLDivElement>(null);
  const s4_label = useRef<HTMLDivElement>(null);
  const s4_icon = useRef<HTMLDivElement>(null);
  const s4_title = useRef<HTMLDivElement>(null);
  const s4_badge = useRef<HTMLDivElement>(null);

  // ── Slide 5 (Profit) element refs ──
  const s5_label = useRef<HTMLDivElement>(null);
  const s5_number = useRef<HTMLDivElement>(null);
  const s5_compare = useRef<HTMLDivElement>(null);
  const s5_title = useRef<HTMLDivElement>(null);

  // ── Slide 6 (CTA) element refs ──
  const s6_icon = useRef<HTMLDivElement>(null);
  const s6_title = useRef<HTMLDivElement>(null);
  const s6_sub = useRef<HTMLDivElement>(null);
  const s6_button = useRef<HTMLDivElement>(null);

  // ── Progress bar ──
  const progressBar = useRef<HTMLDivElement>(null);

  const scopeRef = useGsapTimeline(() => {
    const tl = gsap.timeline();

    // ── Progress bar: fills over 18 seconds ──
    tl.to(
      progressBar.current,
      { scaleX: 1, duration: 18, ease: "none" },
      0,
    );

    // ═══════════════════════════════════════════
    // SLIDE 1: HOOK  (0.0s – 2.4s)
    //   "Twoja stawka godzinowa ma sufit."
    // ═══════════════════════════════════════════

    tl.to(
      s1_label.current,
      { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      0.1,
    );
    tl.to(
      s1_line.current,
      { scaleX: 1, opacity: 1, duration: 0.5, ease: "power3.out" },
      0.15,
    );
    tl.to(
      s1_title.current,
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      0.2,
    );
    tl.to(
      s1_accent.current,
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      0.5,
    );

    // ═══════════════════════════════════════════
    // TRANSITION 1→2: Vertical Slide
    //   Slide 1 exits up, Slide 2 enters from below
    // ═══════════════════════════════════════════

    tl.to(
      slide1.current,
      { y: -1920, duration: 0.7, ease: "power2.inOut" },
      2.4,
    );
    tl.to(
      slide2.current,
      { y: 0, duration: 0.7, ease: "power2.inOut" },
      2.4,
    );

    // ═══════════════════════════════════════════
    // SLIDE 2: PROBLEM  (2.8s – 5.4s)
    //   "Model czas za pieniądze prowadzi do wypalenia."
    // ═══════════════════════════════════════════

    tl.to(
      s2_stripes.current,
      { opacity: 0.07, duration: 0.5, ease: "power1.out" },
      2.8,
    );
    tl.to(
      s2_label.current,
      { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      2.9,
    );
    tl.to(
      s2_icon.current,
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      3.0,
    );
    tl.to(
      s2_title.current,
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      3.2,
    );
    tl.to(
      s2_sub.current,
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      3.5,
    );

    // ═══════════════════════════════════════════
    // TRANSITION 2→3: Zoom Dissolve
    //   Slide 2 scales up + fades, Slide 3 revealed behind
    // ═══════════════════════════════════════════

    tl.to(
      slide2.current,
      { scale: 1.15, opacity: 0, duration: 0.6, ease: "power2.inOut" },
      5.4,
    );
    tl.to(
      slide3.current,
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.inOut" },
      5.4,
    );

    // ═══════════════════════════════════════════
    // SLIDE 3: ROZWIĄZANIE  (5.8s – 8.4s)
    //   "Przejście na model hybrydowy."
    // ═══════════════════════════════════════════

    tl.to(
      s3_label.current,
      { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      5.8,
    );
    tl.to(
      s3_line.current,
      { scaleX: 1, opacity: 1, duration: 0.5, ease: "power3.out" },
      5.9,
    );
    tl.to(
      s3_title.current,
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      6.0,
    );
    tl.to(
      s3_sub.current,
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      6.3,
    );

    // ═══════════════════════════════════════════
    // TRANSITION 3→4: Horizontal Push
    //   Slide 3 exits left, Slide 4 enters from right
    // ═══════════════════════════════════════════

    tl.to(
      slide3.current,
      { x: -1080, duration: 0.7, ease: "power2.inOut" },
      8.4,
    );
    tl.to(
      slide4.current,
      { x: 0, duration: 0.7, ease: "power2.inOut" },
      8.4,
    );

    // ═══════════════════════════════════════════
    // SLIDE 4: TECHNOLOGIA  (8.8s – 11.4s)
    //   "Dzięki Together monitorujesz HRV i vitalsy klienta"
    // ═══════════════════════════════════════════

    tl.to(
      s4_stripes.current,
      { opacity: 0.07, duration: 0.5, ease: "power1.out" },
      8.8,
    );
    tl.to(
      s4_label.current,
      { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      8.9,
    );
    tl.to(
      s4_icon.current,
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      9.0,
    );
    tl.to(
      s4_title.current,
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      9.2,
    );
    tl.to(
      s4_badge.current,
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)" },
      9.6,
    );

    // ═══════════════════════════════════════════
    // TRANSITION 4→5: Rotate + Fade
    //   Slide 4 rotates & shrinks, Slide 5 fades in behind
    // ═══════════════════════════════════════════

    tl.to(
      slide4.current,
      {
        rotation: 3,
        scale: 0.85,
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut",
      },
      11.4,
    );
    tl.to(
      slide5.current,
      { opacity: 1, duration: 0.6, ease: "power2.out" },
      11.4,
    );

    // ═══════════════════════════════════════════
    // SLIDE 5: PROFIT  (11.7s – 14.4s)
    //   "50 klientów online vs 10 stacjonarnie"
    // ═══════════════════════════════════════════

    tl.to(
      s5_label.current,
      { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      11.7,
    );
    tl.to(
      s5_number.current,
      { scale: 1, opacity: 1, duration: 0.7, ease: "elastic.out(1, 0.6)" },
      11.8,
    );
    tl.to(
      s5_compare.current,
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      12.3,
    );
    tl.to(
      s5_title.current,
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      12.5,
    );

    // ═══════════════════════════════════════════
    // TRANSITION 5→6: Scale Bounce
    //   Slide 5 exits up, Slide 6 bounces in from below
    // ═══════════════════════════════════════════

    tl.to(
      slide5.current,
      { y: -1920, scale: 0.9, duration: 0.7, ease: "power3.inOut" },
      14.4,
    );
    tl.to(
      slide6.current,
      { y: 0, duration: 0.7, ease: "back.out(0.8)" },
      14.4,
    );

    // ═══════════════════════════════════════════
    // SLIDE 6: CTA  (14.8s – 18.0s)
    //   "Pobierz darmowy trial Together"
    // ═══════════════════════════════════════════

    tl.to(
      s6_icon.current,
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      14.8,
    );
    tl.to(
      s6_title.current,
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      15.0,
    );
    tl.to(
      s6_sub.current,
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      15.3,
    );
    tl.to(
      s6_button.current,
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
      15.6,
    );
    // CTA button pulse
    tl.to(
      s6_button.current,
      {
        scale: 1.05,
        duration: 0.3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 3,
      },
      16.5,
    );

    return tl;
  });

  return (
    <AbsoluteFill
      ref={scopeRef}
      style={{ overflow: "hidden", background: BLACK }}
    >
      {/* ════════════════════════════════════════════
          SLIDE 1 — HOOK (Yellow)
          "Twoja stawka godzinowa ma sufit."
          ════════════════════════════════════════════ */}
      <div
        ref={slide1}
        style={{ ...fullSlide, backgroundColor: YELLOW, zIndex: 60 }}
      >
        {/* Label */}
        <div
          ref={s1_label}
          style={{
            position: "absolute",
            left: 80,
            top: 100,
            fontFamily: sans,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: BLACK,
            opacity: 0,
            transform: "translateX(-40px)",
          }}
        >
          Business OS
        </div>

        {/* Counter */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: 100,
            fontFamily: sans,
            fontSize: 22,
            fontWeight: 500,
            color: BLACK,
            opacity: 0.3,
          }}
        >
          01 / 06
        </div>

        {/* Green accent line */}
        <div
          ref={s1_line}
          style={{
            position: "absolute",
            left: 80,
            top: 670,
            width: 80,
            height: 5,
            backgroundColor: GREEN,
            borderRadius: 3,
            transformOrigin: "left center",
            transform: "scaleX(0)",
            opacity: 0,
          }}
        />

        {/* Title */}
        <div
          ref={s1_title}
          style={{
            position: "absolute",
            left: 80,
            top: 700,
            width: 920,
            fontFamily: serif,
            fontSize: 78,
            fontWeight: 700,
            lineHeight: "86px",
            letterSpacing: "-0.03em",
            color: BLACK,
            opacity: 0,
            transform: "translateY(60px)",
          }}
        >
          Twoja stawka godzinowa ma&nbsp;sufit.
        </div>

        {/* Accent (lighter weight) */}
        <div
          ref={s1_accent}
          style={{
            position: "absolute",
            left: 80,
            top: 1060,
            width: 920,
            fontFamily: serif,
            fontSize: 62,
            fontWeight: 300,
            lineHeight: "70px",
            letterSpacing: "-0.02em",
            color: BLACK,
            opacity: 0,
            transform: "translateY(40px)",
          }}
        >
          Oto jak go przebić.
        </div>

        {/* Brand */}
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: sans,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: BLACK,
            opacity: 0.25,
          }}
        >
          together
        </div>
      </div>

      {/* ════════════════════════════════════════════
          SLIDE 2 — PROBLEM (White + stripes)
          "Model czas za pieniądze prowadzi do wypalenia."
          ════════════════════════════════════════════ */}
      <div
        ref={slide2}
        style={{
          ...fullSlide,
          backgroundColor: WHITE,
          zIndex: 50,
          transform: "translateY(1920px)",
        }}
      >
        {/* Diagonal stripes */}
        <div
          ref={s2_stripes}
          style={{
            position: "absolute",
            top: -60,
            left: -60,
            width: 1200,
            height: 860,
            opacity: 0,
            background: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 14px,
              ${BLACK} 14px,
              ${BLACK} 15px
            )`,
          }}
        />

        {/* Label */}
        <div
          ref={s2_label}
          style={{
            position: "absolute",
            left: 80,
            top: 100,
            fontFamily: sans,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: BLACK,
            opacity: 0,
            transform: "translateX(-40px)",
          }}
        >
          Problem
        </div>

        {/* Counter */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: 100,
            fontFamily: sans,
            fontSize: 22,
            fontWeight: 500,
            color: BLACK,
            opacity: 0.3,
          }}
        >
          02 / 06
        </div>

        {/* Clock icon */}
        <div
          ref={s2_icon}
          style={{
            position: "absolute",
            left: 80,
            top: 760,
            width: 120,
            height: 120,
            transformOrigin: "center center",
            opacity: 0,
            transform: "scale(0)",
          }}
        >
          <ClockIcon />
        </div>

        {/* Title */}
        <div
          ref={s2_title}
          style={{
            position: "absolute",
            left: 80,
            top: 920,
            width: 920,
            fontFamily: serif,
            fontSize: 66,
            fontWeight: 600,
            lineHeight: "72px",
            letterSpacing: "-0.03em",
            color: BLACK,
            opacity: 0,
            transform: "translateY(50px)",
          }}
        >
          Model{" "}
          <span style={{ fontStyle: "italic", fontWeight: 300 }}>
            &ldquo;czas za pieniądze&rdquo;
          </span>{" "}
          prowadzi do wypalenia.
        </div>

        {/* Subtitle */}
        <div
          ref={s2_sub}
          style={{
            position: "absolute",
            left: 80,
            top: 1280,
            width: 920,
            fontFamily: serif,
            fontSize: 40,
            fontWeight: 300,
            lineHeight: "50px",
            letterSpacing: "-0.01em",
            color: BLACK,
            opacity: 0,
            transform: "translateY(30px)",
          }}
        >
          Nie możesz trenować więcej niż{" "}
          <span
            style={{
              fontWeight: 700,
              backgroundColor: YELLOW,
              padding: "2px 12px",
              borderRadius: 6,
            }}
          >
            40h
          </span>{" "}
          tygodniowo.
        </div>

        {/* Brand */}
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: sans,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: BLACK,
            opacity: 0.25,
          }}
        >
          together
        </div>
      </div>

      {/* ════════════════════════════════════════════
          SLIDE 3 — ROZWIĄZANIE (Yellow)
          "Przejście na model hybrydowy."
          ════════════════════════════════════════════ */}
      <div
        ref={slide3}
        style={{
          ...fullSlide,
          backgroundColor: YELLOW,
          zIndex: 30,
          opacity: 0,
          transform: "scale(0.9)",
        }}
      >
        {/* Label */}
        <div
          ref={s3_label}
          style={{
            position: "absolute",
            left: 80,
            top: 100,
            fontFamily: sans,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: BLACK,
            opacity: 0,
            transform: "translateX(-40px)",
          }}
        >
          Rozwiązanie
        </div>

        {/* Counter */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: 100,
            fontFamily: sans,
            fontSize: 22,
            fontWeight: 500,
            color: BLACK,
            opacity: 0.3,
          }}
        >
          03 / 06
        </div>

        {/* Green accent line */}
        <div
          ref={s3_line}
          style={{
            position: "absolute",
            left: 80,
            top: 670,
            width: 120,
            height: 5,
            backgroundColor: GREEN,
            borderRadius: 3,
            transformOrigin: "left center",
            transform: "scaleX(0)",
            opacity: 0,
          }}
        />

        {/* Title */}
        <div
          ref={s3_title}
          style={{
            position: "absolute",
            left: 80,
            top: 700,
            width: 920,
            fontFamily: serif,
            fontSize: 74,
            fontWeight: 700,
            lineHeight: "82px",
            letterSpacing: "-0.03em",
            color: BLACK,
            opacity: 0,
            transform: "translateY(60px)",
          }}
        >
          Przejście na model hybrydowy.
        </div>

        {/* Subtitle */}
        <div
          ref={s3_sub}
          style={{
            position: "absolute",
            left: 80,
            top: 1030,
            width: 920,
            fontFamily: serif,
            fontSize: 42,
            fontWeight: 300,
            lineHeight: "54px",
            letterSpacing: "-0.01em",
            color: BLACK,
            opacity: 0,
            transform: "translateY(40px)",
          }}
        >
          Łącz treningi personalne z&nbsp;asynchronicznym monitoringiem zdrowia
          online.
        </div>

        {/* Brand */}
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: sans,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: BLACK,
            opacity: 0.25,
          }}
        >
          together
        </div>
      </div>

      {/* ════════════════════════════════════════════
          SLIDE 4 — TECHNOLOGIA (White + stripes)
          "Dzięki Together monitorujesz HRV i vitalsy"
          ════════════════════════════════════════════ */}
      <div
        ref={slide4}
        style={{
          ...fullSlide,
          backgroundColor: WHITE,
          zIndex: 40,
          transform: "translateX(1080px)",
        }}
      >
        {/* Diagonal stripes */}
        <div
          ref={s4_stripes}
          style={{
            position: "absolute",
            top: -60,
            left: -60,
            width: 1200,
            height: 860,
            opacity: 0,
            background: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 14px,
              ${BLACK} 14px,
              ${BLACK} 15px
            )`,
          }}
        />

        {/* Label */}
        <div
          ref={s4_label}
          style={{
            position: "absolute",
            left: 80,
            top: 100,
            fontFamily: sans,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: BLACK,
            opacity: 0,
            transform: "translateX(-40px)",
          }}
        >
          Technologia
        </div>

        {/* Counter */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: 100,
            fontFamily: sans,
            fontSize: 22,
            fontWeight: 500,
            color: BLACK,
            opacity: 0.3,
          }}
        >
          04 / 06
        </div>

        {/* Heart icon */}
        <div
          ref={s4_icon}
          style={{
            position: "absolute",
            left: 80,
            top: 720,
            width: 120,
            height: 120,
            transformOrigin: "center center",
            opacity: 0,
            transform: "scale(0)",
          }}
        >
          <HeartIcon />
        </div>

        {/* Title */}
        <div
          ref={s4_title}
          style={{
            position: "absolute",
            left: 80,
            top: 880,
            width: 920,
            fontFamily: serif,
            fontSize: 58,
            fontWeight: 600,
            lineHeight: "66px",
            letterSpacing: "-0.03em",
            color: BLACK,
            opacity: 0,
            transform: "translateY(50px)",
          }}
        >
          Dzięki Together monitorujesz HRV i&nbsp;vitalsy klienta, nawet gdy nie
          ma go na&nbsp;siłowni.
        </div>

        {/* Badge */}
        <div
          ref={s4_badge}
          style={{
            position: "absolute",
            left: 80,
            top: 1260,
            display: "inline-block",
            padding: "16px 36px",
            borderRadius: 60,
            backgroundColor: GREEN,
            color: BLACK,
            fontFamily: sans,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.03em",
            opacity: 0,
            transform: "translateY(20px) scale(0.8)",
            transformOrigin: "left center",
          }}
        >
          Premium Health Management
        </div>

        {/* Brand */}
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: sans,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: BLACK,
            opacity: 0.25,
          }}
        >
          together
        </div>
      </div>

      {/* ════════════════════════════════════════════
          SLIDE 5 — PROFIT (Yellow)
          "50 klientów online vs 10 stacjonarnie"
          ════════════════════════════════════════════ */}
      <div
        ref={slide5}
        style={{
          ...fullSlide,
          backgroundColor: YELLOW,
          zIndex: 10,
          opacity: 0,
        }}
      >
        {/* Label */}
        <div
          ref={s5_label}
          style={{
            position: "absolute",
            left: 80,
            top: 100,
            fontFamily: sans,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: BLACK,
            opacity: 0,
            transform: "translateX(-40px)",
          }}
        >
          Profit
        </div>

        {/* Counter */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: 100,
            fontFamily: sans,
            fontSize: 22,
            fontWeight: 500,
            color: BLACK,
            opacity: 0.3,
          }}
        >
          05 / 06
        </div>

        {/* Big number */}
        <div
          ref={s5_number}
          style={{
            position: "absolute",
            left: 80,
            top: 500,
            fontFamily: serif,
            fontSize: 280,
            fontWeight: 700,
            lineHeight: "1",
            letterSpacing: "-0.05em",
            color: BLACK,
            opacity: 0,
            transform: "scale(0.3)",
            transformOrigin: "left bottom",
          }}
        >
          50
        </div>

        {/* Comparison */}
        <div
          ref={s5_compare}
          style={{
            position: "absolute",
            left: 80,
            top: 830,
            fontFamily: sans,
            fontSize: 34,
            fontWeight: 600,
            color: BLACK,
            opacity: 0,
            transform: "translateY(20px)",
          }}
        >
          klientów online vs{" "}
          <span
            style={{
              display: "inline-block",
              backgroundColor: GREEN,
              padding: "4px 16px",
              borderRadius: 8,
              fontWeight: 800,
              fontSize: 38,
            }}
          >
            10
          </span>{" "}
          stacjonarnie
        </div>

        {/* Explanation */}
        <div
          ref={s5_title}
          style={{
            position: "absolute",
            left: 80,
            top: 960,
            width: 920,
            fontFamily: serif,
            fontSize: 42,
            fontWeight: 300,
            lineHeight: "54px",
            letterSpacing: "-0.01em",
            color: BLACK,
            opacity: 0,
            transform: "translateY(40px)",
          }}
        >
          Z&nbsp;taką samą jakością obsługi. Skalowalny model bez wypalenia.
        </div>

        {/* Brand */}
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: sans,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: BLACK,
            opacity: 0.25,
          }}
        >
          together
        </div>
      </div>

      {/* ════════════════════════════════════════════
          SLIDE 6 — CTA (Yellow)
          "Pobierz darmowy trial Together"
          ════════════════════════════════════════════ */}
      <div
        ref={slide6}
        style={{
          ...fullSlide,
          backgroundColor: YELLOW,
          zIndex: 20,
          transform: "translateY(1920px)",
        }}
      >
        {/* Counter */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: 100,
            fontFamily: sans,
            fontSize: 22,
            fontWeight: 500,
            color: BLACK,
            opacity: 0.3,
          }}
        >
          06 / 06
        </div>

        {/* Checkmark icon */}
        <div
          ref={s6_icon}
          style={{
            position: "absolute",
            left: 80,
            top: 660,
            width: 140,
            height: 140,
            transformOrigin: "center center",
            opacity: 0,
            transform: "scale(0)",
          }}
        >
          <CheckmarkIcon />
        </div>

        {/* Title */}
        <div
          ref={s6_title}
          style={{
            position: "absolute",
            left: 80,
            top: 840,
            width: 920,
            fontFamily: serif,
            fontSize: 70,
            fontWeight: 700,
            lineHeight: "78px",
            letterSpacing: "-0.03em",
            color: BLACK,
            opacity: 0,
            transform: "translateY(50px)",
          }}
        >
          Pobierz darmowy trial Together
        </div>

        {/* Subtitle */}
        <div
          ref={s6_sub}
          style={{
            position: "absolute",
            left: 80,
            top: 1110,
            width: 920,
            fontFamily: serif,
            fontSize: 44,
            fontWeight: 300,
            lineHeight: "54px",
            color: BLACK,
            opacity: 0,
            transform: "translateY(30px)",
          }}
        >
          i&nbsp;zbuduj swój system operacyjny.
        </div>

        {/* CTA Button */}
        <div
          ref={s6_button}
          style={{
            position: "absolute",
            left: 80,
            top: 1300,
            display: "inline-block",
            padding: "24px 60px",
            borderRadius: 80,
            backgroundColor: BLACK,
            color: YELLOW,
            fontFamily: sans,
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: "0.03em",
            opacity: 0,
            transform: "scale(0.5)",
            transformOrigin: "left center",
          }}
        >
          Rozpocznij teraz &rarr;
        </div>

        {/* Brand */}
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: sans,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: BLACK,
            opacity: 0.25,
          }}
        >
          together
        </div>
      </div>

      {/* ════════════════════════════════════════════
          PROGRESS BAR (top of screen, all slides)
          ════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: "rgba(0,0,0,0.08)",
          zIndex: 100,
        }}
      >
        <div
          ref={progressBar}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: GREEN,
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
