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
  const { isAuthenticated,isLoading,user } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    //console.log("userFromProtectPage",user)
    //console.log('isAuthenticatedFromProtectPage', isAuthenticated);
    if (!isLoading&&isAuthenticated === false) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading,router]);
  if (!isMounted) return null;
  if (isAuthenticated === true)
    return (
      // The rest of your protected page content
      <div>{children}</div>
    );
  else if (isLoading ) {
    return null;
  }
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
  } 
  return null;
};

export default ProtectedPage;
