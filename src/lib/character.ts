const base = import.meta.env.BASE_URL;

/** Flip to `false` to restore the DXB FIELD IdentityRig. */
export const CHARACTER_ENABLED: boolean = true;

export function getCharacterAssets() {
  return {
    poster: `${base}character/memoji-poster.webp`,
    avc: `${base}character/memoji.mp4`,
    hevc: `${base}character/memoji.mov`,
    width: 640,
    height: 480,
  } as const;
}

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
  video.disablePictureInPicture = true;
}

/**
 * Silent Memoji loop. Opaque 8-bit 4:2:0 so the browser can hardware-decode
 * on the GPU: HEVC on Apple WebKit, H.264 everywhere else. No VP9 alpha.
 */
export function pickCharacterVideoSource(): string | null {
  if (typeof document === "undefined") return null;

  const assets = getCharacterAssets();
  const video = document.createElement("video");
  const ua = navigator.userAgent;
  const iOS = /iPhone|iPad|iPod/i.test(ua);
  const iPadOS =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  const safariDesktop =
    /Safari/i.test(ua) && !/Chrome|Chromium|Android|Edg/i.test(ua);
  const appleWebKit = iOS || iPadOS || safariDesktop;

  if (appleWebKit && video.canPlayType('video/mp4; codecs="hvc1"')) {
    return assets.hevc;
  }

  if (video.canPlayType('video/mp4; codecs="avc1.640028"')) {
    return assets.avc;
  }

  if (video.canPlayType("video/mp4")) {
    return assets.avc;
  }

  return null;
}
