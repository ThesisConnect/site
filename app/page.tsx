'use client';

import Link from 'next/link';
import Button from '@/components/login/Button';
import userStore, { userAtom } from '@/stores/User';
import ProtectedPage from '@/components/ProtectedPage';
import dynamic from 'next/dynamic';
import LoadingNormal from '@/components/loading/LoadingNormal';
import { motion } from 'framer-motion';
const Home = () => {
  const user = userStore((state) => state.user);

  return (
    // <ProtectedPage>
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.75 }}
    className="  flex flex-col justify-center items-center">
      <Link href={'/login'}>
        <Button type="button" className="w-24 bg-purple-500">
          Login
        </Button>
      </Link>
      <Link href={'/register'}>
        <Button type="button" className="w-24 bg-blue-500">
          Register
        </Button>
      </Link>
      <Link href={'/editprofile'}>
        <Button type="button" className="w-24 bg-blue-300">
          editprofile
        </Button>
      </Link>
      <Link href={'/mainPage'}>
        <Button type="button" className="w-24 bg-green-400">
          MainPage
        </Button>
      </Link>
      <Link href={'/mainPage/projectTest/calendar'}>
        <Button type="button" className="w-24 bg-yellow-400">
          Calendar
        </Button>
      </Link>
      <Link href={'/mainPage/projectTest/chat'}>
        <Button type="button" className="w-24 bg-orange-400">
          Chat
        </Button>
      </Link>
      <Link href={'/mainPage/projectTest/detail'}>
        <Button type="button" className="w-24 bg-red-400">
          Detail
        </Button>
      </Link>
      <Link href={'/mainPage/projectTest/files'}>
        <Button type="button" className="w-24 bg-orange-400">
          Files
        </Button>
      </Link>
      <Link href={'/mainPage/projectTest/ganttChart'}>
        <Button type="button" className="w-24 bg-yellow-400">
          Gantt Chart
        </Button>
      </Link>
      <Link href={'/mainPage/projectTest/planning'}>
        <Button type="button" className="w-24 bg-blue-300">
          Planning
        </Button>
      </Link>

      <div className="text-2xl font-bold text-green-900">
        Welcome {user.name} {user.surname}
      </div>
      <div className="text-2xl font-bold text-green-900">
        email {user.email}
      </div>
    </motion.div>
    // </ProtectedPage>
  );
};

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
  loading: () => (
    <LoadingNormal/>
  ),
});
