const ITEMS = [
  "AI Platforms",
  "Infrastructure",
  "DevOps",
  "MLOps",
  "Mentorship",
  "MegniToo",
  "Access to Orbit",
  "Cloud Engineering",
];

function Spark() {
  return (
    <svg
      className="marquee__spark"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 0.5 L6.9 5.1 L11.5 6 L6.9 6.9 L6 11.5 L5.1 6.9 L0.5 6 L5.1 5.1 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Run() {
  return (
    <>
      {ITEMS.map((item) => (
        <span className="marquee__item" key={item}>
          {item}
          <span className="marquee__star" aria-hidden="true">
            <Spark />
          </span>
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <Run />
        <Run />
      </div>
    </div>
  );
}
