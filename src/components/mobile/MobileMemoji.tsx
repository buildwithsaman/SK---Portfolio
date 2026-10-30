import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  armMemojiVideo,
  getCharacterAssets,
  pickCharacterVideoSource,
} from "../../lib/character";

export default function MobileMemoji({
  size = "hero",
}: {
  size?: "hero" | "avatar";
}) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const assets = getCharacterAssets();
  const live = !reduceMotion && size === "hero";

  useEffect(() => {
    if (!live) return;
    setSource(pickCharacterVideoSource());
  }, [live]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source) return;

    armMemojiVideo(video);

    const playThrough = () => {
      const run = video.play();
      if (run) run.catch(() => setPlaying(false));
    };

    const onPlaying = () => setPlaying(true);
    video.addEventListener("playing", onPlaying);

    if (video.readyState >= 2) playThrough();
    else video.addEventListener("canplay", playThrough, { once: true });

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("canplay", playThrough);
    };
  }, [source]);

  const box =
    size === "avatar"
      ? "h-9 w-9"
      : "h-[8.75rem] w-[8.75rem] sm:h-[10.5rem] sm:w-[10.5rem]";

  return (
    <div
      aria-hidden="true"
      className={`mobile-memoji mobile-memoji--${size} ${box}`}
    >
      <img
        src={assets.poster}
        alt=""
        width={assets.width}
        height={assets.height}
        decoding="async"
        draggable={false}
        className={playing ? "hidden" : ""}
      />
      {source ? (
        <video
          ref={videoRef}
          src={source}
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className={playing ? "" : "invisible"}
        />
      ) : null}
    </div>
  );
}
