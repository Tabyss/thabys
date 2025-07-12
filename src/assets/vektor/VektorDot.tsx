import React from 'react'

const VektorDot = ({ fill, width }: { fill: string, width: number }) => {
    return (
        <svg width={width} height={width} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 0L22.5457 11.4543L34 17L22.5457 22.5457L17 34L11.4543 22.5457L0 17L11.4543 11.4543L17 0Z" fill={fill} />
        </svg>

    )
}

export default VektorDot