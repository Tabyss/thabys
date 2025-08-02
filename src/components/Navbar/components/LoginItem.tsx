"use client"
import { useAuth } from "@/context/auth/AuthProvider";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const LoginItem = ({ label }: { label: string }) => {
    const [expanded, setExpanded] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const { login } = useAuth()

    const handleClick = () => {
        if (!expanded) {
            setExpanded(true);
        } else {
            login(inputValue)
            setExpanded(false);
            setInputValue("");
        }
    };

    return (
        <div
            className="content-item input"
            style={{
                display: "flex",
                alignItems: "center",
                gap: '0',
                overflow: "hidden",
            }}
        >
            <AnimatePresence>
                {expanded && (
                    <motion.input
                        key="password-input"
                        type="password"
                        placeholder="Insert password"
                        autoComplete="off"
                        className="navbar-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "160px", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={{
                            background: "transparent",
                            border: "1px solid #ccc",
                            color: "#fff",
                            fontSize: "14px",
                            marginRight: "12px",
                            outline: "none",
                        }}
                    />
                )}
            </AnimatePresence>

            <motion.span
                onClick={handleClick}
                whileTap={{ scale: 0.95 }}
                style={{
                    cursor: "pointer",
                    color: "#fff",
                    userSelect: "none",
                    fontWeight: 500,
                    marginRight: "12px",
                    whiteSpace: "nowrap",
                }}
            >
                {label}
            </motion.span>

            {expanded && (
                <motion.span
                    onClick={() => setExpanded(false)}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        cursor: "pointer",
                        color: "var(--red)",
                        userSelect: "none",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                    }}
                >
                    Cancel
                </motion.span>
            )}
        </div>

    );
};

export default LoginItem;
