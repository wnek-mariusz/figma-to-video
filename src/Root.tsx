import { Composition, Folder } from "remotion";
import { Scene01 } from "./components/scenes/Scene01";
import { InstagramStory } from "./components/scenes/InstagramStory";
import "./style.css";

/**
 * Root component -- registers all video compositions.
 *
 * Each <Composition> defines a renderable video with:
 * - id: unique identifier used for rendering (npx remotion render <id>)
 * - component: the React component that renders the video
 * - durationInFrames: total length (frames = seconds * fps)
 * - width/height: canvas dimensions
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
      </Folder>

      <Folder name="Instagram">
        <Composition
          id="InstagramStory"
          component={InstagramStory}
          durationInFrames={180}
          width={1080}
          height={1920}
          fps={30}
        />
      </Folder>
    </>
  );
};
