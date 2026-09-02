const FACTS = [
  { k: "Base", v: "United Arab Emirates" },
  { k: "Focus", v: "AI Platforms & Infra" },
  { k: "Venture", v: "megnitoo.com" },
  { k: "Discord", v: "thefabricman" },
  { k: "Email", v: "ceo@megnitoo.com" },
  { k: "Status", v: "Open to alliances" },
];

export default function Profile() {
  return (
    <section className="section" id="profile">
      <div className="wrap">
        <div className="sec-head" data-reveal-group>
          <span className="sec-head__index" data-scramble data-text="01 / PROFILE">
            01 / PROFILE
          </span>
          <h2 className="sec-head__title">The Operator</h2>
          <span className="sec-head__rule" aria-hidden="true" />
          <span className="sec-head__count">01 — 06</span>
        </div>

        <div className="cols">
          <div className="cols__left" data-reveal>
            <p className="profile-kicker">Who is in the cockpit</p>
            <h3 className="profile-heading">
              Engineer first.
              <br />
              <span className="serif">Builder</span> of gravity.
            </h3>
          </div>

          <div className="profile-body">
            <p data-reveal>
              I am a <strong>technology executive</strong> and Senior AI Platform
              &amp; Infrastructure Engineer with over{" "}
              <strong>a decade of specialised experience</strong> — the kind that
              only comes from keeping machine-learning systems alive in
              production: GPU clusters, Kubernetes estates, MLOps pipelines, and
              the observability that holds them accountable.
            </p>
            <p data-reveal style={{ "--d": "0.08s" } as React.CSSProperties}>
              In 2023 I stopped asking who would give opportunity to people like
              the younger me — and built the machine myself.{" "}
              <strong>MegniToo</strong> is an incubator for underprivileged youth:
              practical, hands-on training in AI, ML and DevOps, a mentorship
              engine, and a community that answers at 2 a.m.
            </p>

            <blockquote className="pull-quote" data-reveal style={{ "--d": "0.12s" } as React.CSSProperties}>
              Talent is universal.
              <br />
              Opportunity is not.
              <footer>— the thesis behind MegniToo</footer>
            </blockquote>

            <p data-reveal style={{ "--d": "0.1s" } as React.CSSProperties}>
              My work sits where <strong>heavy infrastructure</strong> meets{" "}
              <strong>human trajectories</strong>: architect the platform by day,
              then open the airlock so the next engineer can step through. That
              loop — build, teach, repeat — is the entire operating system I run
              on.
            </p>

            <div className="fact-list" data-reveal style={{ "--d": "0.14s" } as React.CSSProperties}>
              {FACTS.map((f) => (
                <div className="fact" key={f.k}>
                  <span className="fact__k">{f.k}</span>
                  <span className="fact__v">{f.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
