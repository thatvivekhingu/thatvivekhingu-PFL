"use client";

/**
 * Web Audio API synthesizer for tactile sound effects.
 * Disabled per user request for silent portfolio experience.
 */
export function playTapSound(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _type: "pop" | "chime" | "hover" | "click" | "access_granted" = "pop"
) {
  // Silent execution - no notification sounds
  return;
}
