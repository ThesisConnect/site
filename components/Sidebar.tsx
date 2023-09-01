"use client";
import { usePathname } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const back = () => {
    router.back();
  };
  if (pathname === "/editprofile")
    return (
      <>
        <div className="overflow-auto w-20 h-[calc(100vh-62px)] p-2 bg-neutral-100 ">
          <div className="flex flex-col justify-center items-center cursor-pointer" onClick={back}>
            <MdArrowBackIosNew className="text-neutral-400 mt-3" size={40} />
            <h2 className="text-xs font-semibold mt-1 text-neutral-400 ">
              Back
            </h2>
          </div>
        </div>
      </>
    );
  return (
    <></>
  );
};

export default Sidebar;
