import { redirect } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/login/Button';

export default function Home() {
  return (
    <div className=' h-44 flex flex-col justify-center items-center' >
      <Link  href={"/login"}>
        <Button  type='button' className='w-24 bg-amber-300'   >
              Login
        </Button>
      </Link>
    </div>
  )
}
