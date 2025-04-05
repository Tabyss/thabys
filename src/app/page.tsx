"use client"

import Hero from "./Landing/Hero/Hero";
import Whome from "./Landing/WhoMe/Whome";

export default function Home() {
    return (
        <main className="landing-page">
            <Hero />
            <Whome/>
        </main>
    );
}
