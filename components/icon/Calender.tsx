import { FC } from 'react';
import BaseIcon, { BaseIconProps } from './BaseIcon';

interface CalenderIconProps extends Omit<BaseIconProps, 'children'> {}
const CalenderIcon: FC<CalenderIconProps> = ({ ...props }) => {
  return (
    <BaseIcon width="37" height="39" {...props}>
      <path d="M30.8999 4.43573H29.1169V2.54355C29.1169 1.40824 28.4037 0.651367 27.3339 0.651367C26.2641 0.651367 25.5509 1.40824 25.5509 2.54355V4.43573H11.2867V2.54355C11.2867 1.40824 10.5735 0.651367 9.50371 0.651367C8.4339 0.651367 7.72069 1.40824 7.72069 2.54355V4.43573H5.93767C2.90654 4.43573 0.588623 6.89556 0.588623 10.1123V12.0045H36.249V10.1123C36.249 6.89556 33.931 4.43573 30.8999 4.43573ZM0.588623 32.8184C0.588623 36.0351 2.90654 38.495 5.93767 38.495H30.8999C33.931 38.495 36.249 36.0351 36.249 32.8184V15.7888H0.588623V32.8184ZM27.3339 19.5732C28.4037 19.5732 29.1169 20.33 29.1169 21.4654C29.1169 22.6007 28.4037 23.3575 27.3339 23.3575C26.2641 23.3575 25.5509 22.6007 25.5509 21.4654C25.5509 20.33 26.2641 19.5732 27.3339 19.5732ZM27.3339 27.1419C28.4037 27.1419 29.1169 27.8988 29.1169 29.0341C29.1169 30.1694 28.4037 30.9263 27.3339 30.9263C26.2641 30.9263 25.5509 30.1694 25.5509 29.0341C25.5509 27.8988 26.2641 27.1419 27.3339 27.1419ZM18.4188 19.5732C19.4886 19.5732 20.2018 20.33 20.2018 21.4654C20.2018 22.6007 19.4886 23.3575 18.4188 23.3575C17.349 23.3575 16.6358 22.6007 16.6358 21.4654C16.6358 20.33 17.349 19.5732 18.4188 19.5732ZM18.4188 27.1419C19.4886 27.1419 20.2018 27.8988 20.2018 29.0341C20.2018 30.1694 19.4886 30.9263 18.4188 30.9263C17.349 30.9263 16.6358 30.1694 16.6358 29.0341C16.6358 27.8988 17.349 27.1419 18.4188 27.1419ZM9.50371 19.5732C10.5735 19.5732 11.2867 20.33 11.2867 21.4654C11.2867 22.6007 10.5735 23.3575 9.50371 23.3575C8.4339 23.3575 7.72069 22.6007 7.72069 21.4654C7.72069 20.33 8.4339 19.5732 9.50371 19.5732ZM9.50371 27.1419C10.5735 27.1419 11.2867 27.8988 11.2867 29.0341C11.2867 30.1694 10.5735 30.9263 9.50371 30.9263C8.4339 30.9263 7.72069 30.1694 7.72069 29.0341C7.72069 27.8988 8.4339 27.1419 9.50371 27.1419Z" />
    </BaseIcon>
  );
};

export default CalenderIcon;
