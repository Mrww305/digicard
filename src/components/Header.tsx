const LINKS = [
  { n: "01", label: "Profile", target: "#profile" },
  { n: "02", label: "Trajectory", target: "#trajectory" },
  { n: "03", label: "MegniToo", target: "#megnitoo" },
  { n: "04", label: "Capabilities", target: "#capabilities" },
  { n: "05", label: "Contact", target: "#contact" },
];

export default function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Sajid Afridi — back to top">
        <svg className="brand__mark" viewBox="0 0 30 30" fill="none" aria-hidden="true">
          <circle cx="15" cy="15" r="4" stroke="currentColor" strokeWidth="1" />
          <ellipse
            cx="15"
            cy="15"
            rx="12.5"
            ry="5.5"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.55"
            transform="rotate(-24 15 15)"
          />
          <g className="orbit-dot">
            <circle cx="26.5" cy="10.5" r="1.7" fill="#e2a33c" />
          </g>
        </svg>
        SA&nbsp;·&nbsp;AFRIDI
      </a>

      <nav className="nav" aria-label="Primary">
        {LINKS.map((l) => (
          <a key={l.target} className="nav__link" href={l.target} data-target={l.target}>
            <span className="nav__num">{l.n}</span>
            {l.label}
          </a>
        ))}
      </nav>

      <div className="header-meta">
        <span className="dot" aria-hidden="true" />
        <span>Open to alliances</span>
        <span className="clock" id="js-clock">--:--:-- GST</span>
      </div>
    </header>
  );
}
