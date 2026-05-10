"use client";

import { useEffect, useState, createContext, useContext } from "react";
import "./InitialLoader.scss";
import { motion, AnimatePresence } from "framer-motion";
import VektorText from "@/assets/vektor/letter/VektorText";

const LoaderContext = createContext<boolean>(false);

export const useLoaderReady = () => useContext(LoaderContext);

export default function InitialLoader({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [currentLetter, setCurrentLetter] = useState<number>(0);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem("app_loaded");
        if (hasLoaded) {
            setLoading(false);
            setIsReady(true); 
            return;
        }

        const loadTimer = setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("app_loaded", "true");
        }, 1500 * 6 + 500);

        const readyTimer = setTimeout(() => {
            setIsReady(true);
        }, 1500 * 6 + 1000);

        return () => {
            clearTimeout(loadTimer);
            clearTimeout(readyTimer);
        };
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
        <LoaderContext.Provider value={isReady}>
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
        </LoaderContext.Provider>
    );
}