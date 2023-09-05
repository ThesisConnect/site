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
        <Button type="button" className="w-24 bg-green-300">
          Login
        </Button>
      </Link>
      <Link href={'/register'}>
        <Button type="button" className="w-24 bg-pink-500">
          Register
        </Button>
      </Link>
      <Link href={'/editProfile'}>
        <Button type="button" className="w-24 bg-yellow-400">
          EditProfile
        </Button>
      </Link>
      <Link href={'/mainPage/projectTest'}>
        <Button type="button" className="w-24 bg-blue-400">
          ProjecTest
        </Button>
      </Link>

      <div className="text-2xl font-bold text-green-900">
        Welcome {user.name}
      </div>
      <div className="text-2xl font-bold text-green-900">
        email {user.email}
      </div>
    </div>
    // </ProtectedPage>
  );
}
