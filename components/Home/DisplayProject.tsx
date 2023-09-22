'use client';
import { FC, use, useCallback, useEffect, useRef, useState } from 'react';
import Progress from './Progress';
import Profile from '../Profile';
import { v4 as uuid4 } from 'uuid';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { IProject, IUserInProject } from '@/stores/Project';
import ShowDataHoverProfile from './ShowDataHoverProfile';
import { IoMdMore } from 'react-icons/io';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import DeletePopup from './DeleteProject';

import EditProject from './EditProject';
interface DisplayProjectProps {
  project: IProject;
}
const DisplayProject: FC<DisplayProjectProps> = ({ project }) => {
  const {name: projectName,progress,status,co_advisors,
    advisors: advisor,advisee,chat_id: chatID,_id: projectID,} = project;
  const router = useRouter();
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
    setSelect(!select);
  });
  function showEdit() {
    setSelect(!select);
    return select;
  }
  return (
    <div className="flex justify-center items-center h-[78px]  border-b-[1px] border-neutral-400">
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
      <div className="w-1/5 justify-center items-center flex ">
        {projectName}
      </div>
      <div className="w-1/5 h-full">
        <Progress progress={progress} />
      </div>
      <div className="w-1/5 justify-center items-center flex ps-20">
        {status.name}
      </div>
      <div className="w-2/5  flex-row  justify-center items-center flex ">
        <div className="w-1/3 justify-center items-center flex ">
          {advisor?.map((user) => (
            <ShowDataHoverProfile
              TransitionProps={{
                timeout: 80,
              }}
              title={
                <>
                  <div className="text-base text-center">Advisor</div>
                  <div className="text-base">{user.email}</div>
                </>
              }
              key={uuid4()}
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
                <div className="text-base text-center">Advisor</div>
                <div className="flex flex-col">
                  {advisee?.map((user) => (
                    <div className="text-base" key={uuid4()}>
                      {user?.email}
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
                  key={uuid4()}
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
          {select && (
            <div
              ref={ref}
              className="z-10 right-[10px] top-[40px] absolute w-[120px] rounded-[3px] h-auto bg-white divide-y drop-shadow-lg"
            >
              <button
                className="flex items-center w-full h-full hover:bg-neutral-100 p-2 gap-2"
                onClick={showPlanEdit}
              >
                <AiOutlineEdit className="text-xl" />
                Edit
              </button>
              <button
                className="flex items-center w-full h-full hover:bg-neutral-100 p-2 gap-2 text-red-500"
                onClick={showDeletePlan}
              >
                <AiOutlineDelete className="text-xl" />
                Delete
              </button>
            </div>
          )}
          <BsFillChatDotsFill
            size={35}
            className="text-teal-800 cursor-pointer place-self-center"
            onClick={handleChat}
            onMouseOver={handleHoverChat}
          />
          <IoMdMore
            size={30}
            className="text-neutral-400 cursor-pointer me-2  justify-self-end "
            onClick={showEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayProject;
