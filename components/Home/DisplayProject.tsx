'use client';
import { FC, use, useCallback, useState } from 'react';
import Progress from './Progress';
import Profile from '../Profile';
import { v4 as uuid4 } from 'uuid';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { IProject, IUserInProject } from '@/stores/Project';
import ShowDataHoverProfile from './ShowDataHoverProfile';
interface DisplayProjectProps {
  project: IProject;
}
const DisplayProject: FC<DisplayProjectProps> = ({
  project: {
    name: projectName,
    progress,
    status,
    co_advisors,
    advisors: advisor,
    advisee,
    chat_id: chatID,
    _id: projectID,
  },
}) => {
  const router = useRouter();
  const handleChat = useCallback(() => {
    router.push(`mainPage/${projectID}/chat?chatID=${chatID}`);
  }, [chatID, router, projectID]);
  const handleHoverChat = useCallback(() => {
    router.prefetch(`mainPage/${projectID}/chat?chatID=${chatID}`);
  }, [chatID, router, projectID]);
  return (
    <div className="flex justify-center items-center h-[78px]  border-b-[1px] border-neutral-400">
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
                      {user.email}
                    </div>
                  ))}
                </div>
              </div>
            }
          >
            <div>
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
        <div className="w-1/3 justify-center items-center flex ">
          <BsFillChatDotsFill
            size={35}
            className="text-teal-800 cursor-pointer"
            onClick={handleChat}
            onMouseOver={handleHoverChat}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayProject;
