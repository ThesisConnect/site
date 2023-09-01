"use client";
import { FaHome } from "react-icons/fa";
import { VscSignOut } from "react-icons/vsc";
import { FC } from "react";
import Link from "next/link";
import axiosBaseurl from "@/config/baseUrl";

import { useRouter } from "next/navigation";
import userStore from "@/stores/User";

const Navbar: FC = () => {
  const { clearUser, isAuthenticated } = userStore((state) => ({
    clearUser: state.clearUser,
    isAuthenticated: state.user.isAuthenticated,
  }));
  const route = useRouter();
  const logout = async () => {
    console.log("logout");
    const res = await axiosBaseurl.get("/auth/logout", {
      withCredentials: true,
    });
    if (res.status === 200) {
      clearUser();
      route.push("/login");
    }
  };
  return (
    <div className="sticky top-0 z-40 w-screen bg-white">
      <div className="flex p-3 border-slate-10 border">
        <div className="text-3xl font-bold flex justify-center items-center ">
          <span>ThesisConnect</span>
        </div>
        <div className="flex-grow" />
        <div className="flex justify-center items-center me-4">
          <Link href="/">
            <FaHome className="text-gray-800 cursor-pointer me-2" size={30} />
          </Link>
          {isAuthenticated && (
            <VscSignOut
              className="text-gray-800 cursor-pointer"
              onClick={logout}
              size={30}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
