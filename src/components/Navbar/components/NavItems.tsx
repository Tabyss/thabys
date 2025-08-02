// NavbarItem.tsx
import { FC } from "react";
import { GiPadlock } from "react-icons/gi";
import LoginItem from "./LoginItem";
import VektorDot from "@/assets/vektor/VektorDot";
import TransitionLink from "@/components/PageTransition/TransitionLink";

export type NavbarItemType = {
    type: "login" | "divider" | "item";
    label?: string;
    href?: string;
    locked?: boolean;
};

type NavbarItemProps = {
    item: NavbarItemType;
    pathname: string;
    authenticated: boolean;
    setActive: (active: boolean) => void;
};

const NavbarItem: FC<NavbarItemProps> = ({
    item,
    pathname,
    authenticated,
    setActive,
}) => {
    const isActive = pathname === item.href;
    const isLocked = item.locked && !authenticated;

    switch (item.type) {
        case "login":
            return <LoginItem label={item.label || ''} />;

        case "divider":
            return (
                <div className="divider">
                    <VektorDot fill="white" width={15} />
                </div>
            );

        case "item":
            if (isLocked) {
                return (
                    <div className="content-item locked" style={{ opacity: 0.5 }}>
                        <div>{item.label}</div>
                        <GiPadlock size="16px" />
                    </div>
                );
            }

            return (
                <div
                    className={`content-item ${isActive ? "active" : ""}`}
                    style={{ pointerEvents: isActive ? "none" : "auto" }}
                >
                    {!isActive ? (
                        <TransitionLink href={item.href || ""}>
                            <div onClick={() => setActive(false)}>{item.label}</div>
                        </TransitionLink>
                    ) : (
                        <div>{item.label}</div>
                    )}
                </div>
            );

        default:
            return null;
    }
};

export default NavbarItem;
