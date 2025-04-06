import VektorDevider from '@/assets/vektor/VektorDevider';
import './Whome.scss';
// import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import IMG from '@/assets/img/Thabys-outline.png'
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// const disableScroll = () => {
//     document.body.style.overflow = 'hidden';
// };

// const enableScroll = () => {
//     document.body.style.overflow = 'auto';
// };

const Whome = () => {
    const whomeRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const dividerRef = useRef<HTMLDivElement | null>(null);

    // useGSAP(() => {
    //     if (!dividerRef.current || !whomeRef.current) return;

    //     ScrollTrigger.create({
    //         trigger: whomeRef.current,
    //         start: 'top bottom+=10px', // Triggers when `.divider` is at the center of viewport
    //         once: true, // Ensures it only runs once
    //         onEnter: () => {
    //             disableScroll();
    //             gsap.to(window, {
    //                 duration: 2,
    //                 scrollTo: { y: titleRef.current as Element }, // Scrolls to `.whome`
    //                 ease: 'power2.inOut',
    //                 onComplete: enableScroll,
    //             });
    //         },
    //     });

    //     gsap.to('.whome', {
    //         y: '-100vh', // Moves the entire section up
    //         ease: 'power2.out',
    //         duration: 1.5,
    //         scrollTrigger: {
    //             trigger: whomeRef.current,
    //             start: 'top bottom',
    //             end: '+=100%', // Animation effect over scroll range
    //             scrub: true, // Smooth scrolling effect
    //         },
    //     });
    // }, []);

    return (
        <div ref={whomeRef} style={{ position: 'relative', zIndex: '15' }}>
            <div className="divider" ref={dividerRef}>
                <VektorDevider width={1638} height={685} fill="#D4F62D" stroke="#232323" strokeWidth={3} />
            </div>
            <div className="whome" >
                <div className="whome-title" ref={titleRef}>
                    <h1>WHO IS</h1>
                    <h1>THABYS</h1>
                    <Image className='thabys' src={IMG} alt="Thabys" width={450}/>
                    <div className="symbol">
                        <h1>?</h1>
                        <h1>?</h1>
                        <h1>?</h1>
                    </div>
                </div>
                <div className="whome-description">
                    <p>
                        {`That's my name in this digital universe. As a frontend developer and UI/UX designer, I don’t just make
                        things look pretty—I make them work beautifully.`}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Whome;
