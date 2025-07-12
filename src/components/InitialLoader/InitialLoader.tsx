"use client";

import { useEffect, useState } from "react";
import "./InitialLoader.scss";
import { motion, AnimatePresence } from "framer-motion";
import VektorText from "@/assets/vektor/letter/VektorText";

export default function InitialLoader({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [currentLetter, setCurrentLetter] = useState<number>(0);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500 * 6 + 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!loading) return;

        let idx = 0;
        const interval = setInterval(() => {
            setCurrentLetter((prev) => prev + 1);
            idx += 1;
            if (idx >= 6) clearInterval(interval);
        }, 1500);

        return () => clearInterval(interval);
    }, [loading]);

    return (
        <>
            {children}
            <AnimatePresence mode="wait">
                {loading && (
                    <motion.div
                        key="initial-loader"
                        initial={{ y: "0%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="overlay"
                    >
                        <span className="loadingText">Welcome!</span>
                        <div className="logo">
                            {[0, 1, 2, 3, 4, 5].map((idx) =>
                                idx <= currentLetter ? <VektorText key={idx} get={idx} width={120} height={122} fill={"var(--purple-dark)"} /> : null
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
