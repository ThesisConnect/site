'use client';
import { FC, useEffect, useState } from 'react';
import useAuth from '../hook/useAuth';
import { useRouter } from 'next/navigation';
import LoadingNormal from './loading/LoadingNormal';
import { Check } from 'lucide-react';
import userStore from '@/stores/User';

interface ProtectedPageProps {
  children: React.ReactNode;
}

const ProtectedPage: FC<ProtectedPageProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [firstLoad, setFirstLoad] = userStore((state) => [
    state.firstLoad,
    state.setFirstLoad,
    state.user,
  ]);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
  if (!isMounted) return null;
  if (isAuthenticated === true)
    return (
      // The rest of your protected page content
      <div>{children}</div>
    );
  else if (isAuthenticated === false) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-62px)] bg-gray-200">
        <div className="p-6 max-w-sm w-full h-36 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-green-300"></div>
          </div>
        </div>
      </div>
    );
  } else if (firstLoad) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-62px)] bg-gray-200">
        <div className="p-6 max-w-md w-full h-52 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-4">CheckAuth</h1>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-green-300"></div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default ProtectedPage;
