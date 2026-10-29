import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  getCharacterAssets,
  pickTransparentVideoSource,
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
  const [source, setSource] = useState<string | null>(null);
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  const live = !compact && !reduceMotion;

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
    if (!live || !introDone || !inView || source) return;
    setSource(pickTransparentVideoSource());
  }, [live, introDone, inView, source]);

  const attachVideo = live && introDone && inView && Boolean(source);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source) return;

    const onReady = () => setCanPlayVideo(true);
    const onError = () => {
      setCanPlayVideo(false);
      setSource(null);
    };
    const onPlaying = () => {
      video.playbackRate = 0.88;
    };
    video.addEventListener("canplay", onReady);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("error", onError);

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.playbackRate = 0.88;

    if (attachVideo) {
      video.play().catch(() => {
        setCanPlayVideo(false);
      });
    } else {
      video.pause();
    }

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else if (attachVideo) video.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("error", onError);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [attachVideo, source]);

  const assets = getCharacterAssets();
  const sizeClass = compact
    ? "h-[16.5rem] sm:h-[22rem] lg:h-[28rem] 2xl:h-[32rem]"
    : "h-[min(56rem,calc(100svh-4.9rem))] min-[1800px]:h-[min(64rem,calc(100svh-3.2rem))] min-[2400px]:h-[min(72rem,calc(100svh-3.2rem))]";
  const fitClass = "object-contain object-center";

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`character-veil relative ${sizeClass} w-auto max-w-full`}
      style={{ aspectRatio: `${assets.width} / ${assets.height}` }}
    >
      <img
        src={assets.poster}
        alt=""
        width={assets.width}
        height={assets.height}
        decoding="async"
        loading={compact ? "lazy" : "eager"}
        fetchPriority="low"
        draggable={false}
        className={`character-frame pointer-events-none absolute inset-0 h-full w-full ${fitClass}`}
      />
      {source ? (
        <video
          ref={videoRef}
          src={source}
          muted
          loop
          playsInline
          preload="auto"
          width={assets.width}
          height={assets.height}
          disablePictureInPicture
          disableRemotePlayback
          className={`character-frame pointer-events-none absolute inset-0 h-full w-full bg-transparent ${fitClass} transition-opacity duration-500 ${
            canPlayVideo ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}
    </div>
  );
}
