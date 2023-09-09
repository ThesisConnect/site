import { FC } from 'react';
import BaseIcon, { BaseIconProps } from './BaseIcon';

interface DetailIconProps extends Omit<BaseIconProps, 'children'> {}
const DetailIcon: FC<DetailIconProps> = ({ ...props }) => {
  return (
    <BaseIcon {...props}>
      <path d="M23.5706 17.7891C25.2894 17.7891 26.6827 19.1824 26.6827 20.9012V28.9095C26.6827 30.6282 25.2894 32.0215 23.5706 32.0215H3.11988C1.40113 32.0215 0.00780495 30.6282 0.00780495 28.9095V20.9012C0.00780495 19.1824 1.40113 17.7891 3.11988 17.7891H23.5706ZM33.797 21.1599L33.796 30.682C33.796 31.4186 33.1989 32.0157 32.4623 32.0157C31.7871 32.0157 31.229 31.5139 31.1407 30.8629L31.1286 30.682L31.1283 21.1791C31.5435 21.2828 31.978 21.3379 32.4254 21.3379C32.8996 21.3379 33.3593 21.276 33.797 21.1599ZM32.4627 12.6176C34.3367 12.6176 35.8559 14.1368 35.8559 16.0108C35.8559 17.8848 34.3367 19.4039 32.4627 19.4039C30.5887 19.4039 29.0695 17.8848 29.0695 16.0108C29.0695 14.1368 30.5887 12.6176 32.4627 12.6176ZM23.5628 0C25.2816 0 26.6749 1.39332 26.6749 3.11207V11.1204C26.6749 12.8391 25.2816 14.2324 23.5628 14.2324H3.11207C1.39332 14.2324 0 12.8391 0 11.1204V3.11207C0 1.47926 1.25747 0.140146 2.85683 0.0103164L3.11207 0H23.5628ZM32.4634 0.00581624C33.1386 0.00581624 33.6967 0.507578 33.785 1.15858L33.7972 1.33956L33.797 10.8459C33.3593 10.7298 32.8996 10.6679 32.4254 10.6679C31.978 10.6679 31.5435 10.723 31.1283 10.8267L31.1297 1.33956C31.1297 0.602954 31.7268 0.00581624 32.4634 0.00581624Z" />
    </BaseIcon>
  );
};

export default DetailIcon;
