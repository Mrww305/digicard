import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Profile from "./components/Profile";
import Career from "./components/Career";
import Megnitoo from "./components/Megnitoo";
import Capabilities from "./components/Capabilities";
import Signals from "./components/Signals";
import Contact from "./components/Contact";

import { Cursor, Progress } from "./components/Chrome";
import { initVh } from "./lib/vh";
import { splitChars } from "./lib/split";
import { scrambleIn } from "./lib/scramble";
import { initCosmos } from "./three/cosmos";

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* useLayoutEffect — runs before the first paint so the split-text
     masking is in place before the hero is ever visible (no FOUC). */
  useLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) document.documentElement.classList.add("rm");

    /* 1 · dynamic mobile viewport fix (--vh) */
    const disposeVh = initVh();

    /* 2 · Three.js deep-space background on .use-webgl */
    const cosmos = canvasRef.current
      ? initCosmos(canvasRef.current)
      : null;

    /* 3 · GSAP split-text blur-to-focus entrance for #home-hero-title */
    let ctx: gsap.Context | null = null;
    const chars: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>("[data-split]").forEach((node) => {
      chars.push(...splitChars(node));
    });
    if (chars.length) {
      if (!reduced) {
        ctx = gsap.context(() => {
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          tl.to(".hero__eyebrow", { autoAlpha: 1, y: 0, duration: 1.1 }, 0.15)
            .to(
              chars,
              {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0ex)",
                duration: 1.25,
                stagger: { each: 0.032, from: "start" },
              },
              0.4
            )
            .to(".hero__sub", { autoAlpha: 1, y: 0, duration: 1.1 }, 1.05)
            .to(
              ".hero__meta .meta__item",
              { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.11 },
              1.3
            )
            .to(".hero__cue", { autoAlpha: 1, y: 0, duration: 0.9 }, 1.6)
            .to(
              ".title-dot, .orbit-badge",
              { autoAlpha: 1, y: 0, duration: 0.9 },
              1.5
            );
        });
      }
    }

    /* 4 · count-up telemetry */
    const runCount = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count || "0");
      const comma = el.dataset.format === "comma";
      const render = (v: number) => {
        el.textContent = comma
          ? Math.round(v).toLocaleString("en-US")
          : String(Math.round(v));
      };
      if (reduced) {
        render(target);
        return;
      }
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1.9,
        ease: "power3.out",
        onUpdate: () => render(obj.v),
      });
    };

    /* 5 · intersection engine — reveals, scramble-decode, counters */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("is-inview");
          if (el.hasAttribute("data-scramble")) {
            scrambleIn(el, el.dataset.text || el.textContent || "");
          }
          if (el.hasAttribute("data-count")) runCount(el);
          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    document
      .querySelectorAll("[data-reveal], .sec-head, .lm, [data-scramble], [data-count]")
      .forEach((el) => io.observe(el));

    /* 6 · live clock — Asia/Dubai */
    const clockEl = document.getElementById("js-clock");
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Dubai",
    });
    const tickClock = () => {
      if (clockEl) clockEl.textContent = `${fmt.format(new Date())} GST`;
    };
    tickClock();
    const clockId = window.setInterval(tickClock, 1000);

    /* 7 · active-section highlight in the nav */
    const links = Array.from(
      document.querySelectorAll<HTMLElement>(".nav__link")
    );
    const secIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((l) =>
            l.classList.toggle(
              "active",
              l.dataset.target === `#${entry.target.id}`
            )
          );
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((s) => secIO.observe(s));

    return () => {
      disposeVh();
      cosmos?.dispose();
      ctx?.revert();
      io.disconnect();
      secIO.disconnect();
      window.clearInterval(clockId);
      document.documentElement.classList.remove("rm");
    };
  }, []);

  return (
    <>
      {/* z:1 — interactive WebGL background layer */}
      <canvas ref={canvasRef} className="use-webgl" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <Progress />

      {/* z:3 — HTML typography / content layer */}
      <div className="content">
        <Header />
        <main>
          <Hero />
          <Marquee />
          <Profile />
          <Career />
          <Megnitoo />
          <Capabilities />
          <Signals />
          <Contact />
        </main>
      </div>

      <Cursor />

      {/* z:80 — film grain */}
      <div className="noise" aria-hidden="true" />
    </>
  );
}
