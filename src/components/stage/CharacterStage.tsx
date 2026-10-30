import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  armMemojiVideo,
  getCharacterAssets,
  pickCharacterVideoSource,
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
  const [playing, setPlaying] = useState(false);

  const live = !reduceMotion;

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
    setSource(pickCharacterVideoSource());
  }, [live, introDone, inView, source]);

  const attachVideo = live && introDone && inView && Boolean(source);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source) return;

    armMemojiVideo(video);

    const playThrough = () => {
      const run = video.play();
      if (run) run.catch(() => setPlaying(false));
    };

    const onPlaying = () => setPlaying(true);
    const onError = () => {
      setPlaying(false);
      setSource(null);
    };
    const onVisibility = () => {
      if (document.hidden) video.pause();
      else if (attachVideo) playThrough();
    };

    video.addEventListener("playing", onPlaying);
    video.addEventListener("error", onError);
    document.addEventListener("visibilitychange", onVisibility);

    if (attachVideo) playThrough();
    else video.pause();

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("error", onError);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [attachVideo, source]);

  const assets = getCharacterAssets();
  const sizeClass = compact
    ? "h-[7.75rem] sm:h-[14rem] lg:h-[16.5rem] xl:h-[min(22rem,calc(100svh-12rem))] 2xl:h-[min(24rem,calc(100svh-10rem))]"
    : "h-[min(24rem,calc(100svh-10rem))] min-[1800px]:h-[min(28rem,calc(100svh-8rem))]";
  const fitClass = "object-contain object-center";

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`character-veil ${sizeClass} w-auto max-w-full`}
      style={{ aspectRatio: `${assets.width} / ${assets.height}` }}
    >
      <img
        src={assets.poster}
        alt=""
        width={assets.width}
        height={assets.height}
        decoding="async"
        loading="eager"
        fetchPriority="low"
        draggable={false}
        className={`character-frame pointer-events-none absolute inset-0 h-full w-full ${fitClass} ${
          playing ? "hidden" : ""
        }`}
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
          className={`character-frame character-frame--gpu pointer-events-none absolute inset-0 h-full w-full bg-transparent ${fitClass} ${
            playing ? "" : "invisible"
          }`}
        />
      ) : null}
    </div>
  );
}
