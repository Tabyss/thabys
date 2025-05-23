import React from 'react'

interface VectorProps {
    width: number | string
    height: number | string
    fill?: string
    stroke?: string
    strokeWidth?: number
}

const VektorDevider = ({
    fill,
    stroke,
    strokeWidth,
}: VectorProps) => {
    return (
        <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1638.06 400">
            <g id="Layer_1-2" data-name="Layer 1">
            <path d="M5.41,89.64c30.42,.17,64.33-41.87,94.75-41.7,16.14,.09,32.85,.31,47.5,7.09,31.05,14.39,49.3,56.27,83.52,55.66,21.49-.38,37.93-18.09,54.09-32.26,16.15-14.17,40.22-26.07,58.12-14.17,21.25,14.13,18.29,52.55,42.23,61.39,7.96,2.94,16.81,1.45,25.1-.36,37.09-8.13,73.32-22.19,111.28-23.15,37.96-.96,79.97,15.32,94.47,50.41,2.24,5.42,3.93,11.39,8.26,15.33,9.83,8.94,25.12,2.19,37.84-1.66,28.12-8.5,60.92,1.57,79.43,24.38,6.71,8.27,11.71,18.03,19.75,25.01,24.26,21.04,63.48,6.73,85.35-16.79,7.8-8.39,15.35-18.33,26.49-21.01,11.34-2.73,22.87,2.98,32.83,9.04,26.75,16.3,51.09,36.59,79.12,50.57,28.03,13.98,61.64,21.15,90.65,9.35,11.8-4.8,24.5-12.69,36.25-7.78,8.41,3.51,12.97,12.47,19.61,18.71,34.89,32.72,97.72-22.63,137.51,3.92,19.08,12.73,24.49,40.13,44.14,51.95,19.16,11.52,44.13,3.66,63.21-7.99,19.08-11.65,36.75-27.17,58.67-31.61,58.78-11.92,100.73,57.83,157.79,76.31,46.41,15.03,98.47-5.76,145.25,8.08l-.22-353.73L0,0,5.41,89.64Z"
                    fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
            </g>
        </svg>
    )
}

export default VektorDevider
