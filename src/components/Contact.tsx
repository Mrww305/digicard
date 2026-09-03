import type { CSSProperties } from "react";

const LINKS = [
  {
    k: "Email",
    v: "ceo@megnitoo.com",
    href: "mailto:ceo@megnitoo.com",
  },
  {
    k: "Web",
    v: "megnitoo.com",
    href: "https://megnitoo.com",
    external: true,
  },
  {
    k: "LinkedIn",
    v: "in/mr305afridi",
    href: "https://sa.linkedin.com/in/mr305afridi",
    external: true,
  },
  {
    k: "Book a call",
    v: "Partner with MegniToo",
    href: "mailto:ceo@megnitoo.com?subject=Partnership%20with%20MegniToo",
  },
];

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-head__index" data-scramble data-text="06 / TRANSMISSION">
            06 / TRANSMISSION
          </span>
          <h2 className="sec-head__title">Open Channel</h2>
          <span className="sec-head__rule" aria-hidden="true" />
          <span className="sec-head__count">06 — 06</span>
        </div>

        <div className="contact-grid">
          <div>
            <h3 className="contact-title">
              <span className="lm">
                <span>Let&apos;s put talent</span>
              </span>
              <span className="lm" style={{ "--d": "0.12s" } as CSSProperties}>
                <span>
                  into <span className="serif">orbit.</span>
                </span>
              </span>
            </h3>
            <p className="contact-note" data-reveal>
              Hiring an infrastructure leader, sponsoring a cohort, or you are a
              learner ready to launch — the channel is open and answered
              personally.
            </p>
          </div>

          <div data-reveal style={{ "--d": "0.1s" } as CSSProperties}>
            <a className="mega" href="mailto:ceo@megnitoo.com">
              ceo<span className="serif">@</span>megnitoo.com
            </a>

            <div className="contact-links">
              {LINKS.map((l) => (
                <a
                  className="c-link"
                  key={l.k}
                  href={l.href}
                  {...(l.external ? { target: "__blank", rel: "noreferrer" } : {})}
                >
                  <span className="c-link__k">
                    {l.k}
                    <svg
                      className="c-link__arrow"
                      width="10"
                      height="10"
                      viewBox="0 0 11 11"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 10L10 1M10 1H2.5M10 1v7.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </span>
                  <span className="c-link__v">{l.v}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="ghost" data-reveal aria-hidden="true">
          MegniToo
        </div>

        <footer className="footer">
          <span>© 2026 Sajid Afridi</span>
          <span className="serif">transmitting from somewhere in deep space</span>
          <a href="#top">Return to orbit ↑</a>
        </footer>
      </div>
    </section>
  );
}
