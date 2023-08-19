import { FaHome} from "react-icons/fa"
import { FC } from "react";
import Link from "next/link";

const Navbar: FC = () => {
  return (
    <div className="sticky top-0 z-40 w-screen bg-white">
      <div className="flex p-3 border-slate-10 border">
        <div className="text-3xl font-bold flex justify-center items-center ">
          <span>Thesisconect</span>
        </div>
        <div className="flex-grow" />
        <div className="flex justify-center items-center me-4">
          <Link href="/">
            <FaHome className="text-gray-800 cursor-pointer" size={30} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
