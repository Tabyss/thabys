import React from 'react'

interface VectorProps {
  fill?: string
  height?: number
  width?: number
}

const VectorNav = ({
  fill,
  height,
  width,
}: VectorProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 713 123" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0H228V123H177.104C158.447 123 140.377 116.479 126.019 104.566L0 0Z" fill={fill} />
      <rect x="228" width="257" height="123" fill={fill} />
      <path d="M713 0H485V123H535.896C554.553 123 572.623 116.479 586.981 104.566L713 0Z" fill={fill} />
    </svg>


  )
}

export default VectorNav