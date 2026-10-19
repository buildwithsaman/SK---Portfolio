export default function MobileMark({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const box =
    size === "lg"
      ? "h-52 w-52 sm:h-60 sm:w-60"
      : size === "sm"
        ? "h-28 w-28"
        : "h-44 w-44 sm:h-52 sm:w-52";
  const img =
    size === "lg"
      ? "h-40 w-40 sm:h-48 sm:w-48"
      : size === "sm"
        ? "h-20 w-20"
        : "h-36 w-36 sm:h-44 sm:w-44";

  return (
    <div className={`relative mx-auto flex items-center justify-center ${box}`}>
      <div
        className="absolute inset-0 rounded-full bg-accent2/25 opacity-45 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute inset-[12%] rounded-[1.35rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent"
        aria-hidden="true"
      />
      <img
        src="/logo-mark.svg"
        alt=""
        width={220}
        height={220}
        className={`relative object-contain drop-shadow-[0_0_36px_rgba(45,212,191,0.35)] ${img}`}
        decoding="async"
      />
    </div>
  );
}
