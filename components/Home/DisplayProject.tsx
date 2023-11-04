'use client';
import { FC, use, useCallback, useEffect, useRef, useState } from 'react';
import Progress from './Progress';
import Profile from '../Profile';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { IProject, IUserInProject } from '@/stores/Project';
import ShowDataHoverProfile from './ShowDataHoverProfile';
import { IoMdMore } from 'react-icons/io';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import DeletePopup from './DeleteProject';

import EditProject from './EditProject';
import userStore from '@/stores/User';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import {v4} from "uuid";

interface DisplayProjectProps {
  project: IProject;
}

const DisplayProject: FC<DisplayProjectProps> = ({ project }) => {
  const {
    name: projectName,
    progress,
    status,
    co_advisors,
    advisors: advisor,
    advisee,
    chat_id: chatID,
    _id: projectID,
  } = project;
  const router = useRouter();
  const currentUser = userStore((state) => state.user);
  const handleChat = useCallback(() => {
    router.push(`mainPage/${projectID}/chat?chatID=${chatID}`);
  }, [chatID, router, projectID]);
  const handleHoverChat = useCallback(() => {
    router.prefetch(`mainPage/${projectID}/chat?chatID=${chatID}`);
  }, [chatID, router, projectID]);
  const [select, setSelect] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [Delete, setDelete] = useState<boolean>(false);
  // const [state, setState] = useState<boolean>(false);
  const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [callback]);
    return ref;
  };

  function showPlanEdit() {
    setEdit(!edit);
    setSelect(false);
  }

  function showDeletePlan() {
    setDelete(!Delete);
    setSelect(false);
  }

  const ref = useOutsideClick(() => {
    setSelect(false)
  });

  function showEdit() {
    setSelect(!select);
    return select;
  }

  const preloadPage = () => {
    // console.log("pre")
    router.prefetch(`mainPage/${projectID}/chat?chatID=${chatID}`);
  };
  const handleClickProject = () => {
    router.push(`mainPage/${projectID}/planning`);
  };
  return (
    <div
      onMouseEnter={preloadPage}
      className="flex justify-center items-center h-[78px]  border-b-[1px] border-neutral-400"
    >
      {Delete && (
        <DeletePopup
          show={Delete}
          name={projectName}
          id={projectID}
          onClose={() => {
            setDelete(false);
          }}
        />
      )}
      {edit && (
        <EditProject isOpen={edit} onClose={showPlanEdit} project={project} />
      )}
      <div
        onClick={handleClickProject}
        className="w-1/5 justify-center items-center flex cursor-pointer h-full "
      >
        <Tooltip
          TransitionProps={{
            timeout: 80,
          }}
          title={
            <div>
              <div className="text-base text-center">Project Name</div>
              <div className="text-base text-center break-words">
                {projectName}
              </div>
            </div>
          }
        >
          <span className="w-4/5  text-center truncate">{projectName}</span>
        </Tooltip>
      </div>
      <div onClick={handleClickProject} className="w-1/5 h-full cursor-pointer">
        <Progress progress={progress} />
      </div>
      <div
        onClick={handleClickProject}
        className="w-1/5 justify-center items-center flex ps-20 cursor-pointer h-full"
      >
        <span className="w-4/5 text-center truncate ">
            {status.name}
        </span>
      </div>
      <div className="w-2/5  flex-row  justify-center items-center flex ">
        <div className="w-1/3 justify-center items-center flex ">
          {advisor?.map((user) => (
            <ShowDataHoverProfile
              TransitionProps={{
                timeout: 80,
              }}
              title={
                <div>
                  <div className="text-base text-center">Advisor</div>
                  <div className="text-base text-center truncate">
                    {user?.name} {user?.surname}
                  </div>
                  {co_advisors?.length > 0 && (
                    <div className="text-base text-center">CoAdvisor</div>
                  )}
                  {co_advisors?.map((user) => (
                    <div
                      className="text-base text-center truncate"
                      key={user?._id || v4()}
                    >
                      {user?.name} {user?.surname}
                    </div>
                  ))}
                </div>
              }
              key={user._id}
            >
              <Profile
                user={user}
                className="shadow-md border border-neutral-300"
                width="41"
              />
            </ShowDataHoverProfile>
          ))}
        </div>
        <div className="w-1/3 justify-center items-center flex relative ">
          <ShowDataHoverProfile
            TransitionProps={{
              timeout: 80,
            }}
            title={
              <div>
                <div className="text-base text-center">Advisee</div>
                <div className="flex flex-col">
                  {advisee?.map((user) => (
                    <div
                      className="text-base text-center truncate"
                      key={user?._id}
                    >
                      {user?.name} {user?.surname}
                    </div>
                  ))}
                </div>
              </div>
            }
          >
            <div className=" justify-center items-center flex relative ">
              {advisee?.map((user, index) => (
                <div
                  className="relative flex justify-center items-center"
                  key={user?._id}
                >
                  <div className={index !== 0 ? 'absolute -left-2 z-auto' : ''}>
                    <Profile
                      user={user}
                      className="shadow-md border border-neutral-300"
                      width="41"
                    />
                  </div>
                </div>
              ))}
            </div>
          </ShowDataHoverProfile>
        </div>
        <div className="w-1/3 items-center grid grid-cols-3  relative ">
          <div />
          
          <BsFillChatDotsFill
            size={35}
            className="text-teal-800 cursor-pointer place-self-center"
            onClick={handleChat}
            onMouseOver={handleHoverChat}
          />
          <div  ref={ref} className="justify-self-end me-2 relative ">
            {select && (
            <div
              
              className="z-10 right-[10px] top-[40px] absolute w-[120px] rounded-[3px] h-auto bg-white divide-y drop-shadow-lg"
            >
              <button
                className="flex items-center w-full h-full hover:bg-neutral-100 p-2 gap-2"
                onClick={showPlanEdit}
              >
                <AiOutlineEdit className="text-xl" />
                Edit
              </button>
              {currentUser.role === 'advisor' && (
                <button
                  className="flex items-center w-full h-full hover:bg-neutral-100 p-2 gap-2 text-red-500"
                  onClick={showDeletePlan}
                >
                  <AiOutlineDelete className="text-xl" />
                  Delete
                </button>
              )}
            </div>
          )}
            <IoMdMore
              size={30}
              className="text-neutral-400 cursor-pointer   "
              onClick={()=>{
               setSelect(!select)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayProject;
