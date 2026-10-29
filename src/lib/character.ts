const base = import.meta.env.BASE_URL;

/** Flip to `false` to restore the DXB FIELD IdentityRig. */
export const CHARACTER_ENABLED: boolean = true;

export function getCharacterAssets() {
  return {
    poster: `${base}character/standing-idle-poster.webp`,
    webm: `${base}character/standing-idle-alpha.webm`,
    hevc: `${base}character/standing-idle-alpha.mov`,
    width: 1364,
    height: 2048,
  } as const;
}

/**
 * Chrome/Edge on macOS can decode HEVC (`hvc1`) but drop the alpha layer.
 * Only Apple WebKit plays HEVC-with-alpha; everyone else gets VP9 WebM.
 */
export function pickTransparentVideoSource(): string | null {
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

  if (video.canPlayType('video/webm; codecs="vp9"')) {
    return assets.webm;
  }

  return null;
}
