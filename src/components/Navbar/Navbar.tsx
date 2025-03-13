import React from "react";
import "./Navbar.scss";
import VectorNav from "@/assets/vektor/VectorNav";

const Navbar = () => {
    return (
        <div className="navbar">
            <VectorNav width={400} height={61} fill={'var(--dark)'} />
            <div className="navbar-button">
                <VectorNav width={400} height={61} fill={'var(--green)'} stroke={'var(--dark'} strokeWidth={3} />
                <div className="line">
                    <div className="line1"></div>
                    <div className="line2"></div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
