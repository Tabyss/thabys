"use client";

import { usePageTransition } from "../PageTransitionContext";


export default function TransitionLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    const { triggerTransition } = usePageTransition();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        triggerTransition(href);
    };

    return <a href={href} onClick={handleClick}>{children}</a>;
}
