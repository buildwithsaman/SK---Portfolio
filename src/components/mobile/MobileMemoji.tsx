import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  AVC_TYPE,
  HEVC_TYPE,
  getCharacterAssets,
  playMemoji,
} from "../../lib/character";

export default function MobileMemoji({
  size = "hero",
}: {
  size?: "hero" | "avatar";
}) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const assets = getCharacterAssets();
  const live = !reduceMotion && size === "hero";

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !live) return;

    const playThrough = () => {
      if (document.hidden) {
        video.pause();
        return;
      }
      playMemoji(video);
    };
    const onPlaying = () => setPlaying(true);

    video.addEventListener("playing", onPlaying);
    video.addEventListener("canplay", playThrough);
    document.addEventListener("visibilitychange", playThrough);
    window.addEventListener("touchstart", playThrough, { passive: true });
    window.addEventListener("pointerdown", playThrough);

    playThrough();

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("canplay", playThrough);
      document.removeEventListener("visibilitychange", playThrough);
      window.removeEventListener("touchstart", playThrough);
      window.removeEventListener("pointerdown", playThrough);
    };
  }, [live]);

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
      {live ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src={assets.hevc} type={HEVC_TYPE} />
          <source src={assets.avc} type={AVC_TYPE} />
        </video>
      ) : null}
    </div>
  );
}
