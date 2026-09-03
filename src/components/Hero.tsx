export default function Hero() {
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero__inner">
        <p className="hero__eyebrow" data-hero>
          <span className="tick" aria-hidden="true" />
          <span>Digital CV — 2026</span>
          <span className="eyebrow">Sajid Afridi</span>
          <span>25.20° N — 55.27° E</span>
          <span className="tick" aria-hidden="true" />
        </p>

        {/* Split-text target — [data-split] nodes are wrapped char-by-char
            and swept from blur(0.2ex) → blur(0ex) by the GSAP timeline */}
        <h1 className="hero__title" id="home-hero-title" aria-label="Sajid Afridi">
          <span className="title-line title-line--sans" data-split aria-hidden="true">
            Sajid
          </span>
          <span className="title-line title-line--serif" aria-hidden="true">
            <span data-split>Afridi</span>
            <span className="title-dot" data-hero>.</span>
          </span>
        </h1>

        <p className="hero__sub" data-hero>
          Senior AI Platform &amp; Infrastructure Engineer — and founder of{" "}
          <span className="serif">MegniToo</span>, an incubator pulling
          underprivileged youth into <span className="serif serif--ember">orbit</span>{" "}
          around AI, machine learning &amp; DevOps.
        </p>

        <div className="hero__meta">
          <div className="meta__item" data-hero>
            <span className="meta__label">Role</span>
            <span className="meta__value">Founder &amp; CEO</span>
          </div>
          <div className="meta__item" data-hero>
            <span className="meta__label">Venture</span>
            <a className="meta__value" href="https://megnitoo.com" target="_blank" rel="noreferrer">
              megnitoo.com
            </a>
          </div>
          <div className="meta__item" data-hero>
            <span className="meta__label">Base</span>
            <span className="meta__value">UAE · Worldwide</span>
          </div>
          <div className="meta__item" data-hero>
            <span className="meta__label">Experience</span>
            <span className="meta__value">10+ Years</span>
          </div>
        </div>
      </div>

      <div className="orbit-badge" data-hero aria-hidden="true">
        <svg viewBox="0 0 120 120" fill="none">
          <defs>
            <path id="badge-circle" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0" />
          </defs>
          <circle className="badge-ring" cx="60" cy="60" r="29" strokeWidth="1" />
          <circle className="badge-core" cx="60" cy="60" r="2.4" />
          <text>
            <textPath href="#badge-circle">
              FOUNDER · MEGNITOO · EST 2023 · ORBIT ·
            </textPath>
          </text>
        </svg>
      </div>

      <div className="hero__cue" data-hero aria-hidden="true">
        <span>Scroll</span>
        <div className="cue-line" />
      </div>
    </section>
  );
}
