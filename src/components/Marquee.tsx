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

function Run() {
  return (
    <>
      {ITEMS.map((item) => (
        <span className="marquee__item" key={item}>
          {item}
          <span className="serif" aria-hidden="true">✳</span>
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
