const PILLARS = [
  { idx: "A", name: "Practical AI Training", note: "no theory-only classrooms" },
  { idx: "B", name: "ML & DevOps Tracks", note: "the exact skills industry buys" },
  { idx: "C", name: "Mentorship Engine", note: "engineers who answer at 2 a.m." },
  { idx: "D", name: "Community & Placement", note: "Discord: thefabricman" },
];

export default function Megnitoo() {
  return (
    <section className="section" id="megnitoo">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-head__index" data-scramble data-text="03 / THE VENTURE">
            03 / THE VENTURE
          </span>
          <h2 className="sec-head__title">MegniToo</h2>
          <span className="sec-head__rule" aria-hidden="true" />
          <span className="sec-head__count">03 — 06</span>
        </div>

        <div className="venture">
          <div className="venture__visual" data-reveal aria-hidden="true">
            <svg viewBox="0 0 400 400" fill="none">
              <circle cx="200" cy="200" r="70" stroke="rgba(232,232,232,0.16)" strokeWidth="1" />
              <circle
                cx="200" cy="200" r="130"
                stroke="rgba(232,232,232,0.12)" strokeWidth="1" strokeDasharray="2 7"
              />
              <circle cx="200" cy="200" r="185" stroke="rgba(232,232,232,0.16)" strokeWidth="1" />

              <g className="ring-slow">
                <circle cx="200" cy="15" r="4" fill="#e2a33c" />
                <circle cx="200" cy="15" r="9" stroke="rgba(226,163,60,0.35)" strokeWidth="1" />
              </g>
              <g className="ring-fast">
                <circle cx="200" cy="70" r="3" fill="#d7e0ee" />
              </g>
              <g className="ring-slow">
                <circle cx="200" cy="330" r="2.4" fill="#8fa3bf" />
              </g>
            </svg>
            <p className="venture__word">
              pulling talent
              <br />
              into <em>orbit</em>
            </p>
          </div>

          <div className="venture__copy">
            <h3 data-reveal>
              An incubator with one job: <br />
              <span className="serif serif--ember">launch</span> the overlooked.
            </h3>
            <p data-reveal style={{ "--d": "0.06s" } as React.CSSProperties}>
              MegniToo exists because the next great engineer is almost
              certainly alive today — and almost certainly can&apos;t afford the
              on-ramp. We teach AI, machine learning and DevOps the way they are
              actually practised: on real systems, with real stakes, guided by
              people who ship for a living.
            </p>
            <p data-reveal style={{ "--d": "0.1s" } as React.CSSProperties}>
              No pedigree requirements. No theory-only classrooms. Just a
              practical curriculum, mentors who answer, and a community that
              treats every learner&apos;s first deploy like a launch window.
            </p>

            <ul className="venture__list" data-reveal style={{ "--d": "0.14s" } as React.CSSProperties}>
              {PILLARS.map((p) => (
                <li key={p.idx}>
                  <span className="v-idx">{p.idx}</span>
                  <span className="v-name">{p.name}</span>
                  <span className="v-note">{p.note}</span>
                </li>
              ))}
            </ul>

            <a
              className="venture__cta"
              href="https://megnitoo.com"
              target="_blank"
              rel="noreferrer"
              data-reveal
              style={{ "--d": "0.18s" } as React.CSSProperties}
            >
              Visit megnitoo.com
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <path d="M1 10L10 1M10 1H2.5M10 1v7.5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
