import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'lucide-react';
import { FaHome } from 'react-icons/fa';
const LoadingNavbar = () => {
  return (
    <div className="sticky top-0 z-40 w-screen bg-white">
      <div className="flex p-3 border-slate-10 border">
        <div className="text-3xl font-bold flex justify-center items-center ">
          <span>ThesisConnect</span>
        </div>
        <div className="flex-grow" />
        <div className="flex justify-center items-center me-4">
          {/* <Link href="/">
            <FaHome className="text-gray-800 cursor-pointer me-2" size={30} />
          </Link> */}
          <Skeleton className="w-48 h-5 me-8" />
          <Skeleton className="h-[35px] w-[35px] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default LoadingNavbar;
