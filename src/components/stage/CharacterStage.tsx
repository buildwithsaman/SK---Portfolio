import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  AVC_TYPE,
  HEVC_TYPE,
  armMemojiVideo,
  getCharacterAssets,
  playMemoji,
} from "../../lib/character";

/** Wait until the overlay is gone — not merely fading — before loading video. */
function bootDismissed(reduceMotion: boolean | null) {
  if (reduceMotion) return true;
  if (typeof document === "undefined") return false;
  if (document.documentElement.getAttribute("data-skip-intro") === "true") {
    return true;
  }
  const boot = document.getElementById("stage-boot");
  return !boot || boot.getAttribute("data-done") === "true";
}

export default function CharacterStage({
  compact = false,
}: {
  compact?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [introDone, setIntroDone] = useState(() => bootDismissed(reduceMotion));
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);

  const live = !reduceMotion;
  const ready = Boolean(live && introDone);
  const attachVideo = Boolean(ready && inView);

  useEffect(() => {
    if (bootDismissed(reduceMotion)) {
      setIntroDone(true);
      return;
    }

    const boot = document.getElementById("stage-boot");
    const observer = new MutationObserver(() => {
      if (bootDismissed(reduceMotion)) setIntroDone(true);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-skip-intro"],
    });
    if (boot) {
      observer.observe(boot, {
        attributes: true,
        attributeFilter: ["data-done"],
      });
    }

    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "12% 0px", threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready) return;

    armMemojiVideo(video);

    const playThrough = () => {
      if (!attachVideo) {
        video.pause();
        return;
      }
      playMemoji(video);
    };
    const onPlaying = () => setPlaying(true);
    const onVisibility = () => {
      if (document.hidden) video.pause();
      else playThrough();
    };

    video.addEventListener("playing", onPlaying);
    video.addEventListener("canplay", playThrough);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("touchstart", playThrough, { passive: true });

    playThrough();

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("canplay", playThrough);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("touchstart", playThrough);
    };
  }, [attachVideo, ready]);

  const assets = getCharacterAssets();
  const sizeClass = compact
    ? "h-[8.75rem] w-[8.75rem] sm:h-[11rem] sm:w-[11rem]"
    : "h-auto w-full max-w-full";
  const fitClass = compact
    ? "object-cover object-[center_42%]"
    : "object-contain object-center";
  const stageSize = compact
    ? { aspectRatio: `${assets.width} / ${assets.height}` }
    : {
        aspectRatio: `${assets.width} / ${assets.height}`,
        width: `min(100%, ${assets.width}px, calc((100svh - 6.5rem) * ${assets.width} / ${assets.height}))`,
      };

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`character-veil ${sizeClass}`}
      style={stageSize}
    >
      {ready ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          width={assets.width}
          height={assets.height}
          disablePictureInPicture
          disableRemotePlayback
          className={`character-frame character-frame--gpu pointer-events-none absolute inset-0 h-full w-full bg-transparent ${fitClass}`}
        >
          <source src={assets.hevc} type={HEVC_TYPE} />
          <source src={assets.avc} type={AVC_TYPE} />
        </video>
      ) : null}
      <img
        src={assets.poster}
        alt=""
        width={assets.width}
        height={assets.height}
        decoding="async"
        loading="eager"
        fetchPriority="low"
        draggable={false}
        className={`character-frame pointer-events-none absolute inset-0 z-[1] h-full w-full ${fitClass} ${
          playing ? "hidden" : ""
        }`}
      />
    </div>
  );
}
