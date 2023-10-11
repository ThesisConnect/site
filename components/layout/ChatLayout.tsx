'use client';
import { DateTime } from 'luxon';
import { useParams, useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import usePlanByProjectID from '@/hook/usePlanByProjectID';
import { v4 } from 'uuid';
import useProjectStore from '@/stores/Project';
import { useSearchParams } from 'next/navigation';
import DisplayFileChat from '../chat/DisplayFileChat';
import { motion } from 'framer-motion';

interface ChatLayoutProps {
  children?: React.ReactNode;
}

const ChatLayout: FC<ChatLayoutProps> = ({ children }) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const { plan, isLoading, mutate, error } = usePlanByProjectID(
    params.project as string
  );
  const getProjectByID = useProjectStore((state) => state.getProjectByID);
  const projectData = getProjectByID(params.project as string);
  const generalChatId = projectData?.chat_id;
  const route = useRouter();
  const [currentChatName, setCurrentChatName] = useState<string>('General');
  const handleClickChat = (id: string | undefined) => {
    if (!id) return null;
    route.push(`/mainPage/${params.project}/chat?chatID=${id}`);
  };
  return (
    <div className="w-full h-full flex">
      <div className="w-2/12 text-sm h-full  bg-neutral-100">
        <div className="h-[8%]" />
        <div className="h-[40%] flex flex-col ">
          <div className="h-5 ps-[10%] text-white bg-teal-800 mb-2">Thesis</div>
          <div className="overflow-y-scroll ">
            {/* taskhere */}
            {plan?.map((plan) => {
              if (plan.task && !plan.archived) {
                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className={
                      'mt-1 ps-[10%] hover:bg-neutral-200 cursor-pointer' +
                      (searchParams.get('chatID') === plan.chat_id
                        ? ' bg-neutral-200'
                        : '')
                    }
                    onClick={() => {
                      handleClickChat(plan.chat_id!);
                      setCurrentChatName(plan.name);
                    }}
                    key={plan._id}
                  >
                    {plan.name}
                  </motion.div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div className="h-[20%]">
          <div className="h-5 ps-[10%] text-white bg-teal-800 mb-2 ">
            Complete
          </div>
          <div className="overflow-y-scroll ">
            {/* taskhere */}
            {plan?.map((plan) => {
              if (plan.task && plan.archived) {
                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className={
                      'mt-1 ps-[10%] hover:bg-neutral-200 cursor-pointer' +
                      (searchParams.get('chatID') === plan.chat_id
                        ? ' bg-neutral-200'
                        : '')
                    }
                    onClick={() => {
                      handleClickChat(plan.chat_id!);
                      setCurrentChatName(plan.name);
                    }}
                    key={plan._id}
                  >
                    {plan.name}
                  </motion.div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div className="h-[30%]">
          <div className="h-5 ps-[10%] text-white bg-teal-800 mb-2">Text</div>
          <div className="overflow-y-scroll ">
            {/* Text*/}
            <div
              className={
                'mt-1 ps-[10%] hover:bg-neutral-200 cursor-pointer' +
                (searchParams.get('chatID') === generalChatId
                  ? ' bg-neutral-200'
                  : '')
              }
              onClick={() => {
                handleClickChat(generalChatId);
                setCurrentChatName('General');
              }}
            >
              General
            </div>
          </div>
        </div>
      </div>
      <div className="w-10/12 flex h-full flex-col">
        <div className="flex flex-col h-[8%] ps-[3%] bg-neutral-100 justify-center ">
          <span className="truncate pe-4">
             {currentChatName}
          </span>
         
        </div>
        <div className="flex h-[92%]">
          <div className="w-[80%]">{children}</div>
          <div className="w-[20%] flex flex-col bg-neutral-100 text-sm">
            <div className="h-5 ps-4 text-white bg-teal-800 mb-2">
              Files list
            </div>
            <div className="overflow-y-scroll h-full ">
              {/* file */}
              <DisplayFileChat />
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
