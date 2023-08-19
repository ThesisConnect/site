import { redirect } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/login/Button';
import Register from './register/page';

export default function Home() {
  return (
    <div className=' h-44 flex flex-col justify-center items-center' >
      <Link  href={"/login"}>
        <Button  type='button' className='w-24 bg-green-300'   >
              Login
        </Button>
      </Link>
      <Link  href={"/register"}>
        <Button  type='button' className='w-24 bg-pink-500'   >
              Register
        </Button>
      </Link>
    </div>
  )
}
