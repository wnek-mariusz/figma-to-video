import React from "react";

/**
 * Slide 1 - "Turn clients into friends"
 *
 * Figma node: 6014:17139 (Instagram story - 16)
 * Yellow background with bold serif text.
 * Original Figma: 476.97×847.94, scaled to 1080×1920 (×2.264)
 */
export const Slide1: React.FC<{
  titleLine1Ref?: React.Ref<HTMLDivElement>;
  titleLine2Ref?: React.Ref<HTMLDivElement>;
}> = ({ titleLine1Ref, titleLine2Ref }) => {
  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#FACC15",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 97,
          top: 883,
        }}
      >
        <div
          ref={titleLine1Ref}
          style={{
            fontFamily: '"Zodiak", Georgia, serif',
            fontWeight: 700,
            fontSize: 77,
            lineHeight: "79px",
            letterSpacing: "-0.04em",
            color: "#000000",
            opacity: 0,
            transform: "translateY(60px)",
          }}
        >
          Turn clients
        </div>
        <div
          ref={titleLine2Ref}
          style={{
            fontFamily: '"Zodiak", Georgia, serif',
            fontWeight: 300,
            fontSize: 77,
            lineHeight: "79px",
            letterSpacing: "-0.04em",
            color: "#000000",
            opacity: 0,
            transform: "translateY(60px)",
          }}
        >
          into friends
        </div>
      </div>
    </div>
  );
};
