const CAPS = [
  { idx: "01", name: "AI Platform Architecture", note: "from whiteboard to production" },
  { idx: "02", name: "Infrastructure & Cloud", note: "AWS · GCP · bare metal" },
  { idx: "03", name: "MLOps & LLMOps", note: "pipelines that ship models" },
  { idx: "04", name: "Kubernetes & Containers", note: "fleets, not pets" },
  { idx: "05", name: "Observability & SRE", note: "alerts with meaning" },
  { idx: "06", name: "Security & Hardening", note: "least privilege, always" },
  { idx: "07", name: "E-Commerce Systems", note: "FBA ops to storefronts" },
  { idx: "08", name: "Teaching & Team Building", note: "the multiplier skill" },
];

const CHIPS = [
  "Kubernetes", "Docker", "Terraform", "AWS", "GCP", "Python", "PyTorch",
  "TensorFlow", "Linux", "CI / CD", "Grafana", "PostgreSQL", "Node.js", "GitOps",
];

export default function Capabilities() {
  return (
    <section className="section" id="capabilities">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-head__index" data-scramble data-text="04 / CAPABILITIES">
            04 / CAPABILITIES
          </span>
          <h2 className="sec-head__title">Instrumentation</h2>
          <span className="sec-head__rule" aria-hidden="true" />
          <span className="sec-head__count">04 — 06</span>
        </div>

        <div className="cap-grid">
          {CAPS.map((c, i) => (
            <div
              className="cap"
              key={c.idx}
              data-reveal
              style={{ "--d": `${(i % 2) * 0.06 + Math.floor(i / 2) * 0.04}s` } as React.CSSProperties}
            >
              <span className="cap__idx">{c.idx}</span>
              <span className="cap__name">{c.name}</span>
              <span className="cap__note">{c.note}</span>
            </div>
          ))}
        </div>

        <div className="chips" data-reveal style={{ "--d": "0.15s" } as React.CSSProperties}>
          {CHIPS.map((chip) => (
            <span className="chip" key={chip}>{chip}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
