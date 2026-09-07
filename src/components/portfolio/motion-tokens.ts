export const motionTokens = {
  duration: {
    feedback: 0.16,
    state: 0.24,
    reveal: 0.42,
    signature: 0.62,
  },
  ease: {
    standard: [0.22, 1, 0.36, 1],
    exit: [0.4, 0, 1, 1],
  },
} as const;

/** Motion's `Transition.ease` wants a mutable tuple, not a readonly one. */
export const standardEase = [0.22, 1, 0.36, 1] as [number, number, number, number];
