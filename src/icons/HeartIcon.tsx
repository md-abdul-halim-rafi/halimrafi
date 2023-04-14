import React from "react";
import { IconProps } from "./interfaces/Icon";

const HeartIcon = (props: IconProps) => {

    const { className = "", fill = "#25314C", height = "24", width = "24" } = props;

    return (
        <svg width={width} height={height} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.8299 11.465C19.6569 17.515 12 21 12 21C12 21 4.34292 17.515 3.16892 11.465C2.44892 7.75302 4.02197 4.01899 8.02097 3.99999C11 3.98599 12 6.98797 12 6.98797C12 6.98797 13 3.98499 15.978 3.99999C19.986 4.01899 21.5499 7.75402 20.8299 11.465Z" fill={fill} />
        </svg>
    )
}

export default HeartIcon