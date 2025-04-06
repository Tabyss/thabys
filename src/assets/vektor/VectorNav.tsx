import React from 'react'

interface VectorProps {
    fill?: string
    stroke?: string
    strokeWidth?: number
  }

const VectorNav = ({
    fill ,
    stroke ,
    strokeWidth ,
  }: VectorProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width='100%' height='auto' viewBox="0 0 390 61" fill={fill}>
            <path d="M4.79066 20.6693C2.68152 18.5602 1.5 15.7115 1.5 12.73C1.5 6.52843 6.52843 1.5 12.73 1.5H377.27C383.472 1.5 388.5 6.52843 388.5 12.73C388.5 15.7115 387.318 18.5602 385.209 20.6693L349.669 56.2093C347.56 58.3185 344.712 59.5 341.73 59.5H48.27C45.2885 59.5 42.4398 58.3185 40.3307 56.2093L4.79066 20.6693Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
    )
}

export default VectorNav