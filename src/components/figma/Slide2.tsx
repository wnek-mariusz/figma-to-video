import React from "react";
import { Img, staticFile } from "remotion";

/**
 * Slide 2 - "Check-in to nie formularz. To rytuał."
 *
 * Figma node: 6014:17141 (Instagram story - 17)
 * White background with diagonal stripe pattern at top,
 * green checkmark icon, and bold/light serif text.
 * Original Figma: 476.97×847.94, scaled to 1080×1920 (×2.264)
 */
export const Slide2: React.FC<{
  stripesRef?: React.Ref<HTMLDivElement>;
  iconRef?: React.Ref<HTMLDivElement>;
  textRef?: React.Ref<HTMLDivElement>;
}> = ({ stripesRef, iconRef, textRef }) => {
  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Diagonal stripe pattern - covers upper portion */}
      <div
        ref={stripesRef}
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
            transparent 12px,
            rgba(0, 0, 0, 0.10) 12px,
            rgba(0, 0, 0, 0.10) 13px
          )`,
        }}
      />

      {/* Green checkmark icon */}
      <div
        ref={iconRef}
        style={{
          position: "absolute",
          left: 105,
          top: 807,
          width: 120,
          height: 120,
          transformOrigin: "center center",
          opacity: 0,
          transform: "scale(0)",
        }}
      >
        <Img
          src={staticFile("icon-group75.svg")}
          style={{ width: 120, height: 120 }}
        />
      </div>

      {/* Main text block */}
      <div
        ref={textRef}
        style={{
          position: "absolute",
          left: 105,
          top: 990,
          width: 700,
          fontFamily: '"Zodiak", Georgia, serif',
          fontSize: 77,
          lineHeight: "72px",
          letterSpacing: "-0.04em",
          color: "#000000",
          opacity: 0,
          transform: "translateY(50px)",
        }}
      >
        <span style={{ fontWeight: 600 }}>
          Check-in to nie formularz.
        </span>{" "}
        <span style={{ fontWeight: 300 }}>To rytuał.</span>
      </div>
    </div>
  );
};
