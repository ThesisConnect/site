import { FC, ReactNode } from "react";

export interface BaseIconProps extends React.SVGProps<SVGSVGElement>{
    width?: string;
    height?: string;
    fill?: string;
    className?: string;
    children?: ReactNode;
}

const BaseIcon:FC<BaseIconProps> = ({ width="36", height="33", fill="#A3A3A3", children, className }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill={fill}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            {children}
        </svg>
    );
};
export default BaseIcon;
