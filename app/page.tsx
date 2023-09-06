'use client';

import Link from 'next/link';
import Button from '@/components/login/Button';
import userStore, { userAtom } from '@/stores/User';
import ProtectedPage from '@/components/ProtectedPage';

export default function Home() {
  const user = userStore((state) => state.user);
  return (
    // <ProtectedPage>
    <div className="  flex flex-col justify-center items-center">
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
      <Link href={'/editProfile'}>
        <Button type="button" className="w-24 bg-blue-300">
          EditProfile
        </Button>
      </Link>
      <Link href={'/mainPage/projectTest'}>
        <Button type="button" className="w-24 bg-green-400">
          ProjecTest
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
    </div>
    // </ProtectedPage>
  );
}
