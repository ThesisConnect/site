import React from 'react';

interface CircularProgressProps {
  progress: number; // percentage (0-100)
  strokeWidth: number; // width of progress track
  size: number; // size of SVG
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  strokeWidth,
  size,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size}>
      <circle
        stroke="gray"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke="green"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
    </svg>
  );
};

export default CircularProgress;