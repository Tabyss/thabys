"use client"

import React, { useState } from "react";
import "./Navbar.scss";
import VectorNav from "@/assets/vektor/VectorNav";
import VektorDot from "@/assets/vektor/VektorDot";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import TransitionLink from "../PageTransition/TransitionLink";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { type: "item", href: "/", label: "Home" },
    { type: "divider" },
    { type: "item", href: "/daily-fun", label: "Diary" },
    { type: "item", href: "/word-generator", label: "Generator" },
    { type: "divider" },
];


const Divider = () => (
    <div className="divider">
        <VektorDot fill="white" width={15} />
    </div>
);

const Navbar = () => {
    const [active, setActive] = useState(false);
    const pathname = usePathname();
    const controls = useAnimation();
    const fade = useAnimation();


    const handleToggle = async () => {
        if (!active) {
            setActive(true);
            await controls.start({ height: 0, width: 0, transition: { duration: 0.9, ease: "easeInOut" } });
            await controls.start({ height: "80vh", transition: { duration: 0.3, ease: "easeInOut" } });
            await controls.start({ width: "90vw", transition: { duration: 0.3, ease: "easeInOut" } });
            await fade.start({ opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } });
        } else {
            await fade.start({ opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } });
            await controls.start({ width: 0, transition: { duration: 0.3, ease: "easeInOut" } });
            await controls.start({ height: 0, transition: { duration: 0.3, ease: "easeInOut" } });
            setActive(false);
        }
    };

    return (
        <div className="navbar">
            <div className="navbar-trigger">
                <div className="navbar-trigger-button" onClick={handleToggle}>
                    <VectorNav fill={'var(--dark)'} width={300} height={50} />
                    <div className="line">
                        <div className="line1"></div>
                        <div className="line2"></div>
                    </div>
                </div>
            </div>

            <AnimatePresence initial={false}>
                {active && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="navbar-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            onClick={handleToggle}
                        />

                        {/* Animated container */}
                        <motion.div
                            className="navbar-container"
                            initial={{ height: 0, width: 0 }}
                            animate={controls}
                            exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                        >
                            <motion.div
                                className="navbar-container-contents"
                                initial={{ opacity: 0 }}
                                animate={fade}
                                exit={{ opacity: 0, transition: { duration: 0.1, ease: "easeInOut" } }}
                            >
                                <div className="content" >
                                    {NAV_ITEMS.map((item, idx) => {
                                        if (item.type === "divider") {
                                            return <Divider key={`divider-${idx}`} />;
                                        }
                                        if (item.type === "item") {
                                            const isActive = pathname === item.href;
                                            return (
                                                <div
                                                    key={item.label}
                                                    className={`content-item ${isActive ? "active" : ""}`}
                                                    style={{ pointerEvents: isActive ? "none" : "auto" }}
                                                >
                                                    {isActive ? (
                                                        <div>{item.label}</div>
                                                    ) : (
                                                        <TransitionLink href={item.href || ''}>
                                                            <div onClick={() => setActive(false)}>
                                                                {item.label}
                                                            </div>
                                                        </TransitionLink>
                                                    )}
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>

                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;
