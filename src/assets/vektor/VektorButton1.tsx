import React from 'react'

interface VectorProps {
    width: number | string
    height: number | string
    fill?: string
    stroke?: string
    strokeWidth?: number
}

const VektorButton1 = ({
    width,
    height,
    fill,
    stroke,
    strokeWidth,
}: VectorProps) => {
    return (
        <svg width={width} height={height} viewBox="0 0 250 118" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M250 110.365L250 80.8184C250 78.7592 249.167 76.7694 247.685 75.3349L221.111 49.5831C219.676 48.1949 217.778 47.4314 215.787 47.4314L126.875 47.4314C124.931 47.4314 123.032 46.691 121.62 45.349L75.9259 2.08235C74.5139 0.740393 72.6389 4.73139e-07 70.6713 4.60323e-07L7.63889 4.97565e-08C3.42593 2.2315e-08 -5.28416e-09 3.42431 -1.17823e-08 7.63529L-1.70307e-07 110.365C-1.76805e-07 114.576 3.42593 118 7.63889 118L242.361 118C246.574 118 250 114.576 250 110.365Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>

    )
}

export default VektorButton1