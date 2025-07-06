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
import React from 'react'
import './LandV2.scss'
import VektorButton2 from '@/assets/vektor/VektorButton2'
import Link from 'next/link'

const LandV2 = () => {
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
                        <div className="land-v2-content-action-resume-button">
                            <VektorButton2 width='200px' fill={'var(--purple-dark2)'} strokeWidth={3} stroke={'var(--dark)'} />
                            <h1>RESUME</h1>
                        </div>
                    </div>
                    <div className="land-v2-content-action-nav">
                        <Link href='/'>
                            Home
                        </Link>
                        <Link href='/daily-fun'>
                            Diary
                        </Link>
                        <Link href='/word-generator'>
                            Generator
                        </Link>
                    </div>
                </div>
                <div className="land-v2-content-porto">
                    <div className="land-v2-content-porto-contain1">
                        <div className="content">

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

                    </div>
                </div>

            </div>
        </div >
    )
}

export default LandV2