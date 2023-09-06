'use client';
import { useParams, usePathname } from 'next/navigation';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import DetailIcon from './icon/DetailIcon';
import HomeIcon from './icon/HomeIcon';
import FileIcon from './icon/FileIcon';
import CalenderIcon from './icon/Calender';
import PlaningIcon from './icon/PlaningIcon';
import GanttIcon from './icon/GanttIcon';
import ChatIcon from './icon/ChatIcon';
import { MouseEvent } from 'react';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { project: projectID } = useParams();
  const back = () => {
    router.back();
  };
  if (pathname === '/editProfile')
    return (
      <>
        <div className="overflow-auto w-20 h-[calc(100vh-62px)] p-2 bg-neutral-100 ">
          <div
            className="flex flex-col justify-center items-center cursor-pointer"
            onClick={back}
          >
            <MdArrowBackIosNew className="text-neutral-400 mt-3" size={40} />
            <h2
              className="text-xs font-semibold 
            mt-1 
            text-neutral-400 "
            >
              Back
            </h2>
          </div>
        </div>
      </>
    );
  const handleHover = (e:MouseEvent<HTMLDivElement>) => {
    if(e.currentTarget.innerText === "Home"){
      router.prefetch("/mainPage")
    }
    else if (e.currentTarget.innerText === "Detail"){
      router.prefetch(`/mainPage/${projectID}/detail`)
    }
    else if (e.currentTarget.innerText === "File"){
      router.prefetch(`/mainPage/${projectID}/files`)
    }
    else if (e.currentTarget.innerText === "Calender"){
      router.prefetch(`/mainPage/${projectID}/calendar`)
    }
    else if (e.currentTarget.innerText === "Planning"){
      router.prefetch(`/mainPage/${projectID}/planning`)
    }
    else if (e.currentTarget.innerText === "Gantt Chart"){
      router.prefetch(`/mainPage/${projectID}/ganttChart`)
    }
    else if (e.currentTarget.innerText === "Chat"){
      router.prefetch(`/mainPage/${projectID}/chat`)
    }
  }

  return (
    <>
      <div className="overflow-auto w-[88px] h-full pt-8 bg-neutral-100 flex flex-col justify-start gap-8 ">
        <div
          className={`flex flex-col justify-center items-center cursor-pointer ${
            pathname === `/mainPage`
              ? 'bg-neutral-300'
              : ''
          }`}
          onClick={() => router.push('/mainPage')}
          onMouseOver={handleHover}
        >
          <HomeIcon className={pathname === `/mainPage`? "fill-teal-800":"fill-neutral-400"} />
          <h2
            className="text-xs font-semibold
            mt-1
            text-neutral-400 "
          >
            Home
          </h2>
        </div>
        <div
          className={`flex flex-col justify-center items-center cursor-pointe pt-2 ${
            pathname === `/mainPage/${projectID}/detail`
              ? 'bg-neutral-300'
              : ''
          }`}
          onClick={() => router.push(`/mainPage/${projectID}/detail`)}
          onMouseOver={handleHover}
        >
          <DetailIcon className={pathname === `/mainPage/${projectID}/detail`? "fill-teal-800":"fill-neutral-400"} />
          <h2
            className="text-xs font-semibold 
            mt-1 
            text-neutral-400 "
          >
            Detail
          </h2>
        </div>
        <div
          className={`flex flex-col justify-center items-center cursor-pointer pt-2 ${
            pathname === `/mainPage/${projectID}/files`
              ? 'bg-neutral-300'
              : ''
          }`}
          onClick={() => router.push(`/mainPage/${projectID}/files`)}
          onMouseOver={handleHover}
        >
          <FileIcon className={pathname === `/mainPage/${projectID}/files`? "fill-teal-800":"fill-neutral-400"} />
          <h2
            className="text-xs font-semibold
            mt-1
            text-neutral-400 "
          >
            File
          </h2>
        </div>
        <div
          className={`flex flex-col justify-center items-center cursor-pointer pt-2 ${
            pathname === `/mainPage/${projectID}/calendar`
              ? 'bg-neutral-300'
              : ''
          } `}
          onClick={() => router.push(`/mainPage/${projectID}/calendar`)}
          onMouseOver={handleHover}
        >
          <CalenderIcon
            className={
              pathname === `/mainPage/${projectID}/calendar`
                ? 'fill-teal-800'
                : 'fill-neutral-400'
            }
          />
          <h2
            className="text-xs font-semibold
            mt-1
            text-neutral-400 "
          >
            Calender
          </h2>
        </div>
        <div
          className={`flex flex-col justify-center items-center cursor-pointer pt-2 ${
            pathname === `/mainPage/${projectID}/planning`
              ? 'bg-neutral-300'
              : ''
          } `}
          onClick={() => router.push(`/mainPage/${projectID}/planning`)}
          onMouseOver={handleHover}
        >
          <PlaningIcon className={
              pathname === `/mainPage/${projectID}/planning`
                ? 'fill-teal-800'
                : 'fill-neutral-400'
            } />
          <h2
            className="text-xs font-semibold
            mt-1
            text-neutral-400 "
          >
            Planning
          </h2>
        </div>
        <div
          className={`flex flex-col justify-center items-center cursor-pointer pt-2 ${
            pathname === `/mainPage/${projectID}/ganttChart`
              ? 'bg-neutral-300'
              : ''
          } `}
          onClick={() => router.push(`/mainPage/${projectID}/ganttChart`)}
          onMouseOver={handleHover}
        >
          <GanttIcon className={
              pathname === `/mainPage/${projectID}/ganttChart`
                ? 'fill-teal-800'
                : 'fill-neutral-400'
            } />
          <h2
            className="text-xs font-semibold
            mt-1
            text-neutral-400 "
          >
            Gantt Chart
          </h2>
        </div>
        <div
          className={`flex flex-col justify-center items-center cursor-pointer pt-2 ${
            pathname === `/mainPage/${projectID}/chat`
              ? 'bg-neutral-300'
              : ''
          } `}
          onClick={() => router.push(`/mainPage/${projectID}/chat`)}
          onMouseOver={handleHover}
        >
          <ChatIcon className={
              pathname === `/mainPage/${projectID}/chat`
                ? 'fill-teal-800'
                : 'fill-neutral-400'
            } />
          <h2
            className="text-xs font-semibold
            mt-1
            text-neutral-400 "
          >
            Chat
          </h2>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
