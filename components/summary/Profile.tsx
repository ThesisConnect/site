import React, { FC } from 'react';
import Image from 'next/image';
import { User } from '@/stores/User';
import profileDownload from '@/utils/profileImage';
import { cn } from '@/lib/utils';
import { relative } from 'path';
import CircularProgress from './CircleProgress';

interface IProfile {
  user: Partial<User>;
  width?: string;
  height?: string;
  className?: string;
  onClick?: () => void;
  progress?: number;
}

const Profile: FC<IProfile> = ({
  user,
  width = '120',
  height,
  className,
  onClick,
  progress,
}) => {
  return (
    <div
      className="relative "
      style={{
        width: `${width}px`,
        height: `${height || width}px`,
      }}
    >
      {progress != 0 && progress && (
        <div className="absolute top-0 left-0 z-20">
          <CircularProgress
            progress={progress}
            strokeWidth={2}
            size={Number(width)}
          />
        </div>
      )}
      <div className="z-10">
        <Image
          src={user.avatar || '/profilebase.png'}
          alt="profile picture"
          width={+width}
          height={height ? +height : +width}
          loader={user.avatar ? profileDownload : undefined}
          placeholder="empty"
          onClick={onClick}
          style={{
            width: `${width}px`,
            height: `${height || width}px`,
          }}
          className={cn(`rounded-full cursor-pointer object-cover drop-shadow-none`)}
        />
      </div>
    </div>
  );
};

export default Profile;