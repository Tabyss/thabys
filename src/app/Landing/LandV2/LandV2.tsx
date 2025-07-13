import React, { useEffect, useState } from 'react'
import VektorLogo from '@/assets/vektor/VektorLogo'
import IMG from '@/assets/img/Asset 4.png'
import Icon1 from '@/assets/img/Git-Icon-1788C.png'
import Icon2 from '@/assets/img/image 5.png'
import Icon3 from '@/assets/img/image 6.png'
import Icon4 from '@/assets/img/python-logo-only.png'
import Icon5 from '@/assets/img/image 9.png'
import Icon6 from '@/assets/img/nextjs-icon-light-background.png'
import Icon7 from '@/assets/img/react-logo_dark.svg'
import Icon8 from '@/assets/img/ts-logo-512.png'
import Image from 'next/image'
import VektorButton2 from '@/assets/vektor/VektorButton2'
import TransitionLink from '@/components/PageTransition/TransitionLink'
import image3 from "@/assets/img/porto/peace.png";
import college1 from "@/assets/img/porto/College 01.png";
import college3 from "@/assets/img/porto/College 03.png";
import college2 from "@/assets/img/porto/College 02.png";
import frame1 from "@/assets/img/porto/secta.png";
import frame2 from "@/assets/img/porto/porto-3.png";
import frame3 from "@/assets/img/porto/sun1.png";
import './LandV2.scss'

const slides = [
    { id: 1, title: "Bath w Pet", image: college1, },
    { id: 2, title: "Sky Beach", image: college3, },
    { id: 3, title: "To Be Peace", image: image3, },
    { id: 4, title: "Groceroad", image: college2, },
    { id: 5, title: "Secta", image: frame1, },
    { id: 6, title: "sky", image: frame2, },
    { id: 6, title: "sun", image: frame3, },
];

const LandV2 = () => {
    const [index, setIndex] = useState(0);
    const [intervalSpeed, setIntervalSpeed] = useState(50);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
            setIntervalSpeed((prev) => {
                const next = prev + direction;
                if (next >= 1000) {
                    setDirection(-1); // reached max, go down
                    return 1000;
                } else if (next <= 50) {
                    setDirection(1); // reached min, go up
                    return 50;
                }
                return next;
            });
        }, intervalSpeed);

        return () => clearInterval(interval);
    }, [intervalSpeed, direction]);


    return (
        <div className='land-v2'>
            <div className="land-v2-logo">
                <div className="logo-1">
                    <VektorLogo width={'50px'} fill={'var(--dark)'} />
                </div>
                <Image className='thabys' src={IMG} alt="Thabys" height={235} />
            </div>
            <div className="land-v2-title">
                <h1>Code, design, and innovation<br />
                    where everything In MY MIND.</h1>
            </div>
            <div className="land-v2-content">
                <div className="land-v2-content-action">
                    <div className="land-v2-content-action-resume">
                        <div className="land-v2-content-action-resume-shadow">
                            <VektorButton2 width='200px' fill={'var(--dark)'} strokeWidth={3} stroke={'var(--dark)'} />
                        </div>
                        <div
                            className="land-v2-content-action-resume-button"
                            onClick={() => {
                                const link = document.createElement("a");
                                link.href = "/assets/CV_ShabbahAthabbiyyu_2025.pdf";
                                link.download = "My_Resume.pdf";
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}
                        >
                            <VektorButton2
                                width="200px"
                                fill={'var(--purple-dark2)'}
                                strokeWidth={3}
                                stroke={'var(--dark)'}
                            />
                            <h1>RESUME</h1>
                        </div>
                    </div>
                    <div className="land-v2-content-action-nav">
                        <TransitionLink href='/'>
                            Home
                        </TransitionLink>
                        <TransitionLink href='/daily-fun'>
                            Diary
                        </TransitionLink>
                        <TransitionLink href='/word-generator'>
                            Generator
                        </TransitionLink>
                    </div>
                </div>
                <div className="land-v2-content-porto">
                    <div className="land-v2-content-porto-contain1">
                        <div className="content">
                            <h1>
                                Coming Soon
                            </h1>
                        </div>
                        <Image className='icon git' src={Icon1} alt="git" height={40} />
                        <Image className='icon cs' src={Icon2} alt="c#" height={30} />
                        <Image className='icon c' src={Icon3} alt="c" height={30} />
                        <Image className='icon python' src={Icon4} alt="python" height={50} />
                        <Image className='icon js' src={Icon5} alt="js" height={40} />
                        <Image className='icon next' src={Icon6} alt="next" height={40} />
                        <Image className='icon react' src={Icon7} alt="react" height={50} />
                        <Image className='icon ts' src={Icon8} alt="ts" height={48} />
                    </div>
                    <div className="land-v2-content-porto-contain2">
                        <Image
                            src={slides[index].image}
                            alt={slides[index].title}
                            className="simple-slider"
                        />
                    </div>
                </div>

            </div>
        </div >
    )
}

export default LandV2