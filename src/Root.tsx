import { Composition, Folder } from "remotion";
import { Scene01 } from "./components/scenes/Scene01";
import "./style.css";

/**
 * Root component -- registers all video compositions.
 *
 * Each <Composition> defines a renderable video with:
 * - id: unique identifier used for rendering (npx remotion render <id>)
 * - component: the React component that renders the video
 * - durationInFrames: total length (frames = seconds * fps)
 * - width/height: canvas dimensions (1920x1080 = Full HD)
 * - fps: frame rate (30 is default)
 *
 * Use <Folder> to organize compositions in the Remotion Studio sidebar.
 */
export const Root: React.FC = () => {
  return (
    <>
      <Folder name="Scenes">
        <Composition
          id="Scene01"
          component={Scene01}
          durationInFrames={150}
          width={1920}
          height={1080}
          fps={30}
        />
        {/* Add more scenes here as you build them:
        <Composition
          id="Scene02"
          component={Scene02}
          durationInFrames={150}
          width={1920}
          height={1080}
          fps={30}
        />
        */}
      </Folder>

      {/* Full video combining all scenes -- uncomment when you have multiple scenes:
      <Composition
        id="FullVideo"
        component={FullVideo}
        durationInFrames={450}
        width={1920}
        height={1080}
        fps={30}
      />
      */}
    </>
  );
};
