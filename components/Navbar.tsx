'use client';
import { FaHome } from 'react-icons/fa';
import { VscSignOut } from 'react-icons/vsc';
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import axiosBaseurl from '@/config/baseUrl';

import { useRouter } from 'next/navigation';
import userStore from '@/stores/User';
import Image from 'next/image';
import profileDownload from '@/utils/profileImage';
import Profile from './Profile';
import LoadingNavbar from './loading/LoadingNavbar';
import { Skeleton } from './ui/skeleton';
import { AnimatePresence, motion } from 'framer-motion';
const Navbar: FC = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const { user, clearUser, isAuth } = userStore((state) => ({
    clearUser: state.clearUser,
    isAuth: state.isAuth(),
    user: state.user,
  }));
  const route = useRouter();
  const editprofile = () => {
    route.push('/editprofile');
  };
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
          <LoadingNavbar />
    );
  }
  return (
    <div className="sticky top-0 z-40 w-screen bg-white">
      <div className="flex p-3 border-slate-10 border">
        <div className="text-3xl font-bold flex justify-center items-center ">
          <span>ThesisConnect</span>
        </div>
        <div className="flex-grow" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75 }}
          className="flex justify-center items-center me-4"
        >
          <Link href="/">
            <FaHome className="text-gray-800 cursor-pointer me-2" size={30} />
          </Link>
          {isAuth && (
            <>
              <span className="me-4 ">
                {user.name} {user.surname}
              </span>
              <Profile user={user} width="35" onClick={editprofile} />
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
