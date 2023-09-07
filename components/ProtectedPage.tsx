'use client';
import { Children, FC, useEffect } from 'react';
import useAuth from '../hook/useAuth';
import { useRouter } from 'next/navigation';

interface ProtectedPageProps {
  children: React.ReactNode;
}

const ProtectedPage: FC<ProtectedPageProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-62px)] bg-gray-200">
        <div className="p-6 max-w-sm w-full h-36 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-4">
            Redirecting...
          </h1>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-green-300"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    // The rest of your protected page content
    <div>{children}</div>
  );
};

export default ProtectedPage;
