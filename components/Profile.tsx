import React, { FC } from 'react';
import Image from 'next/image';
import { User } from '@/stores/User';
import profileDownload from '@/utils/profileImage';
import { cn } from '@/lib/utils';

interface IProfile {
  user: User;
  width?: string;
  height?: string;
  className?: string;
  onClick?: () => void;
}

const Profile: FC<IProfile> = ({ user, width = '120', height, className ,onClick}) => {
  
  return (
    <div>
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
            height: `${height || width}px`
        }}
        className={cn(
          `rounded-full cursor-pointer object-cover `,
          className
        )}
      />
    </div>
  );
};

export default Profile;
