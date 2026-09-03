/**
 * Scramble-decode text effect.
 * Characters resolve left → right out of a field of glyphs,
 * like a transmission locking onto a signal.
 */
const GLYPHS = "AXKMRZ0147<>#/·—%&+";

export function scrambleIn(
  el: HTMLElement,
  finalText: string,
  duration = 850
): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = finalText;
    return;
  }

  const start = performance.now();

  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const resolved = Math.floor(p * finalText.length);
    let out = finalText.slice(0, resolved);

    for (let i = resolved; i < finalText.length; i++) {
      const c = finalText[i];
      out +=
        c === " "
          ? " "
          : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }

    el.textContent = out;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = finalText;
  };

  requestAnimationFrame(tick);
}
