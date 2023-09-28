'use client';
import { FaHome } from 'react-icons/fa';
import { VscSignOut } from 'react-icons/vsc';
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import axiosBaseurl from '@/config/baseUrl';
import { auth} from '@/config/firebase';
import { mutate } from 'swr';
import { useRouter } from 'next/navigation';
import userStore from '@/stores/User';
import Image from 'next/image';
import profileDownload from '@/utils/profileImage';
import Profile from './Profile';
import LoadingNavbar from './loading/LoadingNavbar';
import { Skeleton } from './ui/skeleton';
import { AnimatePresence, motion } from 'framer-motion';
import IconButton from '@mui/material/IconButton';
import { LuSettings } from 'react-icons/lu';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { FiLogOut } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
const ShowTootip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#f5f5f9',
    dropShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    dropShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)',
  },
}));
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
  const logout = async () => {
    console.log('logout');
    const res = await axiosBaseurl.get('/auth/logout', {
      withCredentials: true,
    });
    signOut(auth);
    if (res.status === 200) {
      clearUser();
      route.push('/login');
      mutate('/auth/checkAuth', null, false);
    }
  };
  if (!hasMounted) {
    return <LoadingNavbar />;
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
          className="flex justify-center items-center me-6"
        >
          {/* <Link href="/">
            <FaHome className="text-gray-800 cursor-pointer me-2" size={30} />
          </Link> */}
          {isAuth && (
            <>
              <span className="me-4 ">
                {user.name} {user.surname}
              </span>
              <ShowTootip
                arrow
                title={
                  <div className="flex flex-col ">
                    <div className="flex py-2 gap-x-1 cursor-pointer" onClick={logout}>
                      <FiLogOut size={20} />
                      <div className="flex items-center text-se">Logout</div>
                    </div>
                  </div>
                }
              >
                <Profile user={user} width="35" onClick={editprofile} />
                {/* <button className="p-1 ms-2 rounded-lg border border-neutral-100 shadow ease-in-out duration-150 hover:scale-[102%]">
                  <LuSettings size={20} className=" text-neutral-400" />
                </button> */}
              </ShowTootip>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
