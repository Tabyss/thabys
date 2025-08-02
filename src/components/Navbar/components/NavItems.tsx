import { GiPadlock } from "react-icons/gi";
import LoginItem from "./LoginItem";
import VektorDot from "@/assets/vektor/VektorDot";
import TransitionLink from "@/components/PageTransition/TransitionLink";

export const NavbarItem = (
    item: any,
    idx: number,
    pathname: string,
    authenticated: boolean,
    setActive: (active: boolean) => void
) => {
    const isActive = pathname === item.href;
    const isLocked = item.locked && !authenticated;

    switch (item.type) {
        case "login":
            return <LoginItem key={`login-${idx}`} label={item.label} />;
        case "divider":
            return (
                <div key={idx} className="divider">
                    <VektorDot fill="white" width={15} />
                </div>
            )
        case "item":
            if (isLocked) {
                return (
                    <div
                        key={item.label}
                        className={`content-item locked`}
                        style={{ opacity: 0.5 }}
                    >
                        <div>
                            {item.label}
                        </div>
                        <GiPadlock size="16px" />
                    </div>
                );
            }
            return (
                <div
                    key={item.label}
                    className={`content-item ${isActive ? "active" : ""}`}
                    style={{ pointerEvents: isActive ? "none" : "auto" }}
                >
                    {!isActive ? (
                        <TransitionLink href={item.href || ""}>
                            <div onClick={() => setActive(false)}>
                                {item.label}
                            </div>
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