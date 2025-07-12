"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const VektorText = ({ get, fill, width, height }: { get: number, fill: string, width: number, height: number }) => {
    const paths = [
        <svg width={width} height={height} viewBox="0 0 121 122" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M102.4 121.947H59.99L0 60.9684V8.9043L30 39.3885V48.3437L72.41 91.4628L102.4 121.947Z" fill={fill} />
            <path d="M119.97 30.4842H72.46L119.97 78.7772V121.896L0.0599976 0H119.97V30.4842Z" fill={fill} />
        </svg>,
        <svg width={width} height={height} viewBox="0 0 121 122" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M90.95 60.938V30.4842H52.18L120.94 100.388V121.947H90.95V113.012L30.97 52.0438V91.4628L60.96 121.947H18.55L0.970001 104.077V0H120.94V91.4323L90.95 60.938Z" fill={fill} />
        </svg>,
        <svg width={width} height={height} viewBox="0 0 121 122" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M61.05 121.947H18.99L0.940002 103.6V30.6167L30.94 61.1111V91.4632H31.06L61.05 121.947Z" fill={fill} />
            <path d="M0.940002 0V21.6612L9.63 30.4944L90.92 113.134V121.957H120.91V0.0101747H0.940002V0ZM90.92 70.0049L52.04 30.4842H90.92V70.0049Z" fill={fill} />
        </svg>,
        <svg width={width} height={height} viewBox="0 0 121 122" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M120.88 91.4323V0H0.910034V103.6L18.96 121.947H30.9V52.0437L69.68 91.4628H39.72V121.947H120.88V100.388L52.11 30.4842H90.88V60.9379L120.87 91.4222L120.88 91.4323Z" fill={fill} />
        </svg>,
        <svg width={width} height={height} viewBox="0 0 121 122" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M120.85 0V121.947H18.93L0.880005 103.6V60.9684L30.88 91.4628H69.65L0.880005 21.5596V0H22.09L90.86 69.9033V30.4842L60.87 0H120.85Z" fill={fill} />
        </svg>,
        <svg width={width} height={height} viewBox="0 0 121 122" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M120.82 0V18.2966L120.76 18.2255V91.2088L90.89 60.8465V30.4944H90.83V30.4843H51.95L90.83 70.005V69.9745L120.76 100.398V121.957H60.77L60.76 121.947H18.9L0.849976 103.6V30.6164L30.78 61.0397V91.4731H69.56L30.78 52.0539V52.0743L9.53998 30.4843L0.849976 21.6612V0H120.82Z" fill={fill} />
        </svg>
    ];

    const [currentIdx, setCurrentIdx] = useState<number>(0);
    const [locked, setLocked] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        interval = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * 6); // generates 1–6
            setCurrentIdx(randomNumber);
        }, 50);

        const timeout = setTimeout(() => {
            clearInterval(interval);
            setLocked(true);
        }, 1500);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [get]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={locked ? `final-${get}` : `rand-${currentIdx}`}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.5, scale: 1.05 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                style={{ display: "inline-block" }}
            >
                {locked ? paths[get] : paths[currentIdx]}
            </motion.div>
        </AnimatePresence>
    );
};

export default VektorText;
