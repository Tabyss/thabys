import React from 'react'

interface VectorProps {
    width?: number | string
    fill?: string
    stroke?: string
    strokeWidth?: number
}

const VektorButton2 = ({
    width,
    fill,
    stroke,
    strokeWidth,
}: VectorProps) => {
    return (
        <svg width={width} height="auto" viewBox="0 0 250 118" fill={fill} xmlns="http://www.w3.org/2000/svg">
            <path d="M7.63867 1.5L70.6709 1.5C72.2603 1.5 73.764 2.09735 74.8926 3.16992L74.8945 3.17188L120.589 46.4385C122.286 48.0502 124.556 48.9316 126.875 48.9316L215.787 48.9316C217.29 48.9317 218.723 49.4705 219.848 50.458L220.068 50.6611L246.642 76.4121C247.828 77.5609 248.5 79.1609 248.5 80.8184L248.5 110.364C248.5 113.746 245.746 116.5 242.361 116.5L7.63867 116.5C4.25357 116.5 1.5 113.746 1.5 110.364L1.5 7.63574C1.5 4.25393 4.25357 1.50012 7.63867 1.5Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>

    )
}

export default VektorButton2

