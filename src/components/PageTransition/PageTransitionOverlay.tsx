"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import "./PageTransition.scss";
import VektorLogo from "@/assets/vektor/VektorLogo";

export default function PageTransitionOverlay({
    isActive,
    targetUrl,
    onComplete,
}: {
    isActive: boolean;
    targetUrl: string | null;
    onComplete?: () => void;
}) {
    const router = useRouter();
    const currentPathname = usePathname();

    useEffect(() => {
        const isSamePage = targetUrl === currentPathname;

        if (isActive && targetUrl && !isSamePage) {
            const run = async () => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                
                router.push(targetUrl);

                await new Promise((resolve) => setTimeout(resolve, 600));
                
                if (onComplete) onComplete();
            };
            run();
        } else if (isActive && isSamePage) {
            if (onComplete) onComplete();
        }
    }, [isActive, targetUrl, router, currentPathname, onComplete]);

    return (
        <AnimatePresence mode="wait">
            {isActive && targetUrl !== currentPathname && (
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