'use client';
import { FC, use, useCallback } from 'react';
import Progress from './Progress';
import Profile from '../Profile';
import { v4 as uuid4 } from 'uuid';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
interface DisplayProjectProps {
  projectName?: string;
  progress?: number;
  status?: string;
  advisor?: string[];
  advisee?: string[];
  chatID?: string;
  projectID?: string;
}
const DisplayProject: FC<DisplayProjectProps> = ({
  projectName = 'Project Topic A',
  progress = 65,
  status = 'Started',
  advisor = ['Advisor A'],
  advisee = ['Advisee A', 'Advisee B'],
  chatID = 'test',
  projectID = 'test',
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
        {status}
      </div>
      <div className="w-2/5  flex-row  justify-center items-center flex ">
        <div className="w-1/3 justify-center items-center flex ">
          {advisor.map((name) => (
            <Profile
              user={{}}
              key={uuid4()}
              className="shadow-md border border-neutral-300"
              width="41"
            />
          ))}
        </div>
        <div className="w-1/3 justify-center items-center flex relative ">
          {advisee.map((name, index) => (
            <div
              className="relative flex justify-center items-center"
              key={uuid4()}
            >
              <div className={index !== 0 ? 'absolute -left-2 z-auto' : ''}>
                <Profile
                  user={{}}
                  className="shadow-md border border-neutral-300"
                  width="41"
                />
              </div>
            </div>
          ))}
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
