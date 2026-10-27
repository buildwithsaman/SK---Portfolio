/** Shared spring configs for scroll-linked motion */
export const scrollSpring = {
  stiffness: 90,
  damping: 34,
  mass: 0.4,
  restDelta: 0.0005,
} as const;

export const scrollSpringSnappy = {
  stiffness: 100,
  damping: 30,
  mass: 0.35,
  restDelta: 0.001,
} as const;
