import { FC } from 'react';
import BaseIcon, { BaseIconProps } from './BaseIcon';

interface FolderIconProps extends Omit<BaseIconProps, 'children'> {
  onClick?: () => void;
}
const FolderIcon: FC<FolderIconProps> = ({ onClick, ...props }) => {
  return (
    <div onClick={onClick}>
      <BaseIcon width="20" height="18" {...props}>
        <path d="M2 18H18C19.1046 18 20 17.1046 20 16V5C20 3.89543 19.1046 3 18 3H9L7.29687 0.4453C7.1114 0.1671 6.79917 0 6.46482 0H2C0.89543 0 0 0.89543 0 2V16C0 17.1046 0.89543 18 2 18Z" />
      </BaseIcon>
    </div>
  );
};

export default FolderIcon;
``;
