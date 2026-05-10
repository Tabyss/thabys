import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import VektorLogo from "@/assets/vektor/VektorLogo";
import IMG from "@/assets/img/Asset 4.png";
import Icon1 from "@/assets/img/Git-Icon-1788C.png";
import Icon2 from "@/assets/img/image 5.png";
import Icon3 from "@/assets/img/image 6.png";
import Icon4 from "@/assets/img/python-logo-only.png";
import Icon5 from "@/assets/img/image 9.png";
import Icon6 from "@/assets/img/nextjs-icon-light-background.png";
import Icon7 from "@/assets/img/react-logo_dark.svg";
import Icon8 from "@/assets/img/ts-logo-512.png";
import Image from "next/image";
import VektorButton2 from "@/assets/vektor/VektorButton2";
import image3 from "@/assets/img/porto/peace.png";
import college1 from "@/assets/img/porto/College 01.png";
import college3 from "@/assets/img/porto/College 03.png";
import college2 from "@/assets/img/porto/College 02.png";
import frame1 from "@/assets/img/porto/secta.png";
import frame2 from "@/assets/img/porto/porto-3.png";
import frame3 from "@/assets/img/porto/sun1.png";
import "./LandV2.scss";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import PortoModal from "../ModalImage/PortoModal";
import { useLoaderReady } from "@/components/InitialLoader/InitialLoader";

interface LandV2Props {
  onAnimationDone?: () => void;
}

const slides = [
  { id: 1, title: "Bath w Pet", image: college1 },
  { id: 2, title: "Sky Beach", image: college3 },
  { id: 3, title: "To Be Peace", image: image3 },
  { id: 4, title: "Groceroad", image: college2 },
  { id: 5, title: "Secta", image: frame1 },
  { id: 6, title: "Sky Stop", image: frame2 },
  { id: 7, title: "Sun Lore", image: frame3 },
];

const LandV2 = ({ onAnimationDone }: LandV2Props) => {
  const [index, setIndex] = useState(0);
  const [intervalSpeed, setIntervalSpeed] = useState(50);
  const [direction, setDirection] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isReady = useLoaderReady();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [
          ".land-v2-logo",
          ".land-v2-title",
          ".land-v2-content-action",
          ".land-v2-content-porto-contain1",
          ".land-v2-content-porto-contain2",
        ],
        { autoAlpha: 0, y: 30 },
      );

      gsap.set(".icon", { autoAlpha: 0, scale: 0.5 });

      if (!isReady) return;

      const tl = gsap.timeline({
        delay: 0.2,
        onComplete: () => {
          if (onAnimationDone) onAnimationDone();
        },
      });

      tl.to(".land-v2-logo", {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          ".land-v2-title",
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        )
        .to(
          ".land-v2-content-action",
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        )
        .to(
          ".land-v2-content-porto-contain1",
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
        .to(
          ".icon",
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        )
        .to(
          ".land-v2-content-porto-contain2",
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        );
    }, containerRef);

    return () => ctx.revert();
  }, [isReady, onAnimationDone]);

  useEffect(() => {
    if (isModalOpen) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
      setIntervalSpeed((prev) => {
        const next = prev + direction;
        if (next >= 1000) {
          setDirection(-1);
          return 1000;
        } else if (next <= 50) {
          setDirection(1);
          return 50;
        }
        return next;
      });
    }, intervalSpeed);

    return () => clearInterval(interval);
  }, [intervalSpeed, direction, isModalOpen]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="land-v2" ref={containerRef}>
      <div className="land-v2-logo">
        <div className="logo-1">
          <VektorLogo width={"50px"} fill={"var(--dark)"} />
        </div>
        <Image className="thabys" src={IMG} alt="Thabys" height={235} />
      </div>

      <div className="land-v2-title">
        <h1>
          <span className="gradient-text">
            Code, design, and innovation
            <br />
            where everything In
          </span>{" "}
          <span className="highlight-mind" data-text="MY MIND">
            MY MIND
          </span>
          .
        </h1>
      </div>

      <div className="land-v2-content">
        <div className="land-v2-content-action">
          <div className="land-v2-content-action-nav">
            <div className="nav-bg-indicator"></div>
            <a
              href="https://www.linkedin.com/in/thabys/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com/Tabyss"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.instagram.com/thabys/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={24} />
            </a>
          </div>
          <div className="land-v2-content-action-resume">
            <div className="land-v2-content-action-resume-shadow">
              <VektorButton2
                width="200px"
                fill={"var(--dark)"}
                strokeWidth={3}
                stroke={"var(--dark)"}
              />
            </div>
            <div
              className="land-v2-content-action-resume-button"
              onClick={() => {
                /* Download logic */
              }}
            >
              <VektorButton2
                width="200px"
                fill={"var(--purple-dark2)"}
                strokeWidth={3}
                stroke={"var(--dark)"}
              />
              <h1>RESUME</h1>
            </div>
          </div>
        </div>

        <div className="land-v2-content-porto">
          <div className="land-v2-content-porto-contain1">
            <div className="content">
              <h1>Coming Soon</h1>
            </div>
            <Image className="icon git" src={Icon1} alt="git" height={40} />
            <Image className="icon cs" src={Icon2} alt="c#" height={30} />
            <Image className="icon c" src={Icon3} alt="c" height={30} />
            <Image
              className="icon python"
              src={Icon4}
              alt="python"
              height={50}
            />
            <Image className="icon js" src={Icon5} alt="js" height={40} />
            <Image className="icon next" src={Icon6} alt="next" height={40} />
            <Image className="icon react" src={Icon7} alt="react" height={50} />
            <Image className="icon ts" src={Icon8} alt="ts" height={48} />
          </div>

          <div
            className="land-v2-content-porto-contain2"
            onClick={() => setIsModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <h2>{slides[index].title}</h2>
            <Image
              src={slides[index].image}
              alt={slides[index].title}
              className="simple-slider"
              placeholder="blur"
            />
          </div>
        </div>
      </div>

      <PortoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        slides={slides}
        currentIndex={index}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};

export default LandV2;