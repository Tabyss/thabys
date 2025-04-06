import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Assets2 from "@/assets/vektor/Vector-hero-2.svg";
import Assets4 from "@/assets/vektor/Vector-hero-4.svg";
import "./Hero.scss";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef<HTMLDivElement | null>(null);

        // useEffect(() => {
        //     if (!heroRef.current) return;

        //     gsap.to(heroRef.current, {
        //         ease: "power2.out",
        //         scrollTrigger: {
        //             trigger: heroRef.current,
        //             start: "top top",
        //             end: "+=300", // Adjust based on how long you want it to stay
        //             scrub: true,
        //             pin: true, // Keeps it sticky
        //             pinSpacing: false, // Prevents unnecessary extra space
        //         },
        //     });
        // }, []);

    return (
        <div ref={heroRef} className="hero">
            <div className="hero-frame">
                <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
                    <Image
                        src={Assets4.src}
                        alt="frame"
                        className="object3"
                        fill
                        style={{ objectFit: 'contain' }}
                    />
                </div>
                <div style={{ position: 'relative', width: '100%', height: 'auto' }}>

                    <Image
                        src={Assets4.src}
                        alt="frame"
                        className="object3"
                        fill
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            </div>
            <div className="hero-head">
                <h1>THABYS</h1>
                <h1>THABYS</h1>
            </div>
            <div className="hero-tag">
                <p>Code, design, and innovation—where everything comes together.</p>
            </div>
            <div className="frame2">
                <Image src={Assets2.src} className="object3" alt="frame" width={250} height={50} />
                <Image src={Assets2.src} className="object4" alt="frame" width={250} height={50} />
            </div>
        </div>
    );
};

export default Hero;
