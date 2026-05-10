"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Footer from "./Landing/Footer/Footer";
import LandV2 from "./Landing/LandV2/LandV2";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const landRef = useRef<HTMLDivElement>(null);

  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      ScrollTrigger.create({
        trigger: landRef.current,
        start: "top top",
        end: () => `+=${footerRef.current?.offsetHeight || window.innerHeight}`,
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    });

    return () => mm.revert();
  }, []);


  return (
    <main className="landing-page" ref={mainRef}>
      <div
        className="land-container"
        ref={landRef}
      >
        <LandV2 />
      </div>

      <div className="footer-glass-overlay" ref={footerRef}>
        <Footer />
      </div>
    </main>
  );
}
