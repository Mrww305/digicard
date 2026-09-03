/**
 * Dynamic viewport fix — the "--vh mobile trick".
 *
 * Mobile browsers (iOS Safari / Android Chrome) collapse and expand
 * their address bars, which makes `100vh` jump or crop content.
 * We measure the *actual* visible window height, write 1% of it to
 * the CSS custom property `--vh`, and style full-screen wrappers with
 * `height: calc(var(--vh, 1vh) * 100)`.
 *
 * Listens to both `resize` and `orientationchange`.
 */
export function initVh(): () => void {
  const set = () => {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
  };

  set();
  window.addEventListener("resize", set);
  window.addEventListener("orientationchange", set);

  return () => {
    window.removeEventListener("resize", set);
    window.removeEventListener("orientationchange", set);
  };
}
