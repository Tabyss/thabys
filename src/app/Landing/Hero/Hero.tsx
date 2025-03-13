import React from "react";
import Assets2 from "@/assets/vektor/Vector-hero-2.svg";
import Assets4 from "@/assets/vektor/Vector-hero-4.svg";
import "./Hero.scss";

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-frame">
                <img src={Assets4.src} className="object3" alt="frame"  />
                <img src={Assets4.src} className="object3" alt="frame"  />
            </div>
            <div className="hero-head">
                <h1>THABYS</h1>
                <h1>THABYS</h1>
            </div>
            <div className="hero-tag">
                <p>Code, design, and innovation—where everything comes together.</p>
            </div>
            <div className="frame2">
                <img src={Assets2.src} className="object3" alt="frame" width={250} height={50} />
                <img src={Assets2.src} className="object4" alt="frame" width={250} height={50} />
            </div>
        </div>
    );
};

export default Hero;
