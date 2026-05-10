"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import PageTransitionOverlay from "./PageTransition/PageTransitionOverlay";

type PageTransitionContextType = {
    triggerTransition: (to: string) => void;
    isActive: boolean;
};

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
    const [isActive, setIsActive] = useState(false);
    const [targetUrl, setTargetUrl] = useState<string | null>(null);

    const triggerTransition = (to: string) => {
        setTargetUrl(to);
        setIsActive(true);
    };

    const pathname = usePathname();

    useEffect(() => {
        if (isActive) {
            setIsActive(false);
            setTargetUrl(null);
        }
    }, [pathname]);

    return (
        <PageTransitionContext.Provider value={{ triggerTransition, isActive }}>
            {children}
            <PageTransitionOverlay
                isActive={isActive}
                targetUrl={targetUrl}
            />
        </PageTransitionContext.Provider>
    );
}

export function usePageTransition() {
    const context = useContext(PageTransitionContext);
    if (!context) throw new Error("usePageTransition must be used within PageTransitionProvider");
    return context;
}
