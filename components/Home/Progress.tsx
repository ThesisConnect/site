import { FC } from 'react';

interface ProgressProps {
  progress?: number;
}

const Progress: FC<ProgressProps> = ({ progress = 65 }) => {
  return (
    <div className="h-full flex flex-col w-full ">
      <div className="h-2/5" />
      <div className="bg-neutral-400 h-1/6 rounded-sm">
        <div
          style={{ width: `${progress}%` }}
          className="bg-teal-800 h-full rounded-sm"
        />
      </div>

      <div className="flex text-sm mt-1 ">
        <span>Progress</span>
        <span className="flex-grow" />
        <span>{progress}%</span>
      </div>
      <div className="flex-grow" />
    </div>
  );
};

export default Progress;
