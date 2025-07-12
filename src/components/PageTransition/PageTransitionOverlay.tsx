"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./PageTransition.scss";
import VektorLogo from "@/assets/vektor/VektorLogo";

export default function PageTransitionOverlay({
    isActive,
    targetUrl,
}: {
    isActive: boolean;
    targetUrl: string | null;
}) {
    const router = useRouter();

    useEffect(() => {
        if (isActive && targetUrl) {
            const run = async () => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                router.push(targetUrl);
                await new Promise((resolve) => setTimeout(resolve, 100));
                await new Promise((resolve) => setTimeout(resolve, 500));
            };
            run();
        }
    }, [isActive, targetUrl, router]);

    return (
        <AnimatePresence mode="wait">
            {isActive && (
                <motion.div
                    key="page-transition"
                    initial={{ y: "-100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className='overlay'
                >
                    <VektorLogo width={'50px'} fill={'white'} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
