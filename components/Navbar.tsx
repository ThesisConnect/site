"use client";
import { FaHome} from "react-icons/fa"
import { VscSignOut } from "react-icons/vsc";
import { FC } from "react";
import Link from "next/link";
import axiosBaseurl from "@/config/baseUrl";

import { useSetAtom } from 'jotai';
import { userAtom } from "@/stores/User";
import { clearUserAtom } from '../stores/User';
import { useRouter } from "next/navigation";


const Navbar: FC = () => {
  const clearUserAtomValue = useSetAtom(clearUserAtom)
  const  route = useRouter()
  const logout = async() => {
    console.log("logout")
    const res = await axiosBaseurl.get('/auth/logout', {withCredentials: true})
    if (res.status === 200) {
      clearUserAtomValue()
      route.push('/login')
    }
  }
  return (
    <div className="sticky top-0 z-40 w-screen bg-white">
      <div className="flex p-3 border-slate-10 border">
        <div className="text-3xl font-bold flex justify-center items-center ">
          <span>Thesisconect</span>
        </div>
        <div className="flex-grow" />
        <div className="flex justify-center items-center me-4">

          <Link href="/">
            <FaHome className="text-gray-800 cursor-pointer me-2" size={30} />
          </Link>
          <VscSignOut className="text-gray-800 cursor-pointer" onClick={logout} size={30} />
           
        </div>
      </div>
    </div>
  );
};

export default Navbar;
