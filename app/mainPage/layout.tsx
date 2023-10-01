'use client';
import ProtectedPage from '@/components/ProtectedPage';

const ProtectLayout = ({ children }: { children: React.ReactNode }) => {
  return <ProtectedPage>{children}</ProtectedPage>;
};
export default ProtectLayout;
