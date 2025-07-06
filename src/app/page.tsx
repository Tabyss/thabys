"use client"

import Hero from "./Landing/Hero/Hero";
import Hue from "./Landing/Hue/Hue";
import LandV2 from "./Landing/LandV2/LandV2";
import MiniGame from "./Landing/MiniGame/MiniGame";
import Whome from "./Landing/WhoMe/Whome";

export default function Home() {
    return (
        <main className="landing-page">
            <LandV2/>
            {/* <Hero /> */}
            {/* <Whome/> */}
            {/* <Hue/> */}
            {/* <MiniGame/> */}
        </main>
    );
}
