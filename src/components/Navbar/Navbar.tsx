"use client"

import React, { useState } from "react";
import "./Navbar.scss";
import VectorNav from "@/assets/vektor/VectorNav";
import Link from "next/link";

const Navbar = () => {
    const [active, useActive] = useState(false)

    return (
        <div className="navbar">
            <div className="navbar-trigger">
                <div className="vector-wrapper main">
                    <VectorNav fill={'var(--dark)'} />
                </div>
                <div className="navbar-trigger-button" onClick={()=> useActive(!active)}>
                    <div className="vector-wrapper button">
                        <VectorNav fill={'var(--green)'} stroke={'var(--dark)'} strokeWidth={3} />
                    </div>
                    <div className="line">
                        <div className="line1"></div>
                        <div className="line2"></div>
                    </div>
                </div>
            </div>
            <div className={`navbar-container ${active ? 'active' : ''}`}>
                <Link href='/'>
                    Home
                </Link>
                <Link href='/daily-fun'>
                    Diary
                </Link>
                <Link href='/word-generator'>
                    Generator
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
