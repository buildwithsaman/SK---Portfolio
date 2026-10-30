const base = import.meta.env.BASE_URL;

/** Flip to `false` to restore the DXB FIELD IdentityRig. */
export const CHARACTER_ENABLED: boolean = true;

export function getCharacterAssets() {
  return {
    poster: `${base}character/memoji-poster.webp`,
    avc: `${base}character/memoji.mp4`,
    hevc: `${base}character/memoji-hevc.mp4`,
    width: 640,
    height: 480,
  } as const;
}

export const HEVC_TYPE = 'video/mp4; codecs="hvc1"';
export const AVC_TYPE = 'video/mp4; codecs="avc1.640028"';

/** Keep the element on the hardware video path: muted, inline, native loop. */
export function armMemojiVideo(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.loop = true;
  video.volume = 0;
  video.playbackRate = 1;
  video.setAttribute("playsinline", "true");
  video.setAttribute("webkit-playsinline", "true");
  video.setAttribute("muted", "");
  video.disablePictureInPicture = true;
}

/** iOS will not autoplay a hidden video, and play() can lose the first gesture. */
export function playMemoji(video: HTMLVideoElement) {
  armMemojiVideo(video);
  const run = video.play();
  if (run) void run.catch(() => {});
}
