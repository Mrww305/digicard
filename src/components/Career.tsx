const ROWS = [
  {
    years: "2023 — Now",
    role: "Founder & CEO",
    org: "MegniToo — megnitoo.com",
    desc: "Built an AI, ML & DevOps incubator from zero: a practical curriculum, a mentorship engine, and a Discord community where every seat is reserved for youth who could never afford tech education.",
    tag: "Founder",
  },
  {
    years: "2019 — 2023",
    role: "Senior AI Platform & Infrastructure Engineer",
    org: "Enterprise AI practice · MEA region",
    desc: "Owned production AI end-to-end — GPU clusters, MLOps pipelines, Kubernetes estates and the observability layer around them. Kept models serving at enterprise scale, on budget and on call.",
    tag: "AI Infra",
  },
  {
    years: "2016 — 2019",
    role: "Cloud & DevOps Engineer",
    org: "Systems integration · Gulf region",
    desc: "CI/CD, infrastructure-as-code and zero-downtime migrations for clients who could not afford a single minute of darkness. Learned that reliability is a design material, not a feature.",
    tag: "DevOps",
  },
  {
    years: "2013 — 2016",
    role: "Self-Taught → First Ops Seat",
    org: "Karachi → the Gulf",
    desc: "Started on a second-hand laptop: Linux, networking, late-night builds and borrowed textbooks. This is where the conviction formed — access, not aptitude, is the bottleneck.",
    tag: "Origin",
  },
];

export default function Career() {
  return (
    <section className="section" id="trajectory">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-head__index" data-scramble data-text="02 / TRAJECTORY">
            02 / TRAJECTORY
          </span>
          <h2 className="sec-head__title">Flight Path</h2>
          <span className="sec-head__rule" aria-hidden="true" />
          <span className="sec-head__count">02 — 06</span>
        </div>

        <div>
          {ROWS.map((r, i) => (
            <article
              className="row"
              key={r.years}
              data-reveal
              style={{ "--d": `${i * 0.07}s` } as React.CSSProperties}
            >
              <span className="row__years">{r.years}</span>
              <div>
                <h3 className="row__role">
                  {r.role} <span className="row__org">· {r.org}</span>
                </h3>
              </div>
              <span className="row__tag">{r.tag}</span>
              <p className="row__desc">{r.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
