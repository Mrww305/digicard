const STATS = [
  { count: 10, suffix: "+", label: "Years deep in engineering" },
  { count: 30, suffix: "+", label: "Production platforms kept alive" },
  { count: 1200, suffix: "+", label: "Learners inside the MegniToo community" },
  { count: 100, suffix: "%", label: "Of seats reserved for access, not pedigree" },
];

export default function Signals() {
  return (
    <section className="section" id="signals" style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-head__index" data-scramble data-text="05 / SIGNALS">
            05 / SIGNALS
          </span>
          <h2 className="sec-head__title">Telemetry</h2>
          <span className="sec-head__rule" aria-hidden="true" />
          <span className="sec-head__count">05 — 06</span>
        </div>

        <div className="stats" data-reveal>
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat__num">
                <span data-count={s.count} data-format={s.count >= 1000 ? "comma" : "plain"}>
                  0
                </span>
                <sup>{s.suffix}</sup>
              </div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
