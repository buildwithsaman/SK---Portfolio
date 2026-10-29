import type { MotionValue } from "framer-motion";
import { CHARACTER_ENABLED } from "../../lib/character";
import CharacterStage from "./CharacterStage";
import IdentityRig from "./IdentityRig";

/** Character on, DXB FIELD kept as a one-flag fallback. */
export default function StageFigure({
  compact = false,
  progress,
}: {
  compact?: boolean;
  progress?: MotionValue<number>;
}) {
  if (CHARACTER_ENABLED) {
    return <CharacterStage compact={compact} />;
  }
  return <IdentityRig compact={compact} progress={progress} />;
}
