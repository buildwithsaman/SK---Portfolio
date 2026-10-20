/** Shared spring configs for scroll-linked motion */
export const scrollSpring = {
  stiffness: 70,
  damping: 26,
  mass: 0.45,
  restDelta: 0.001,
} as const;

export const scrollSpringSnappy = {
  stiffness: 100,
  damping: 30,
  mass: 0.35,
  restDelta: 0.001,
} as const;
