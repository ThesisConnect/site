'use client';
import { DateTime } from 'luxon';
import { useParams, useRouter } from 'next/navigation';
import { FC, use } from 'react';
import usePlanByProjectID from '@/hook/usePlanByProjectID';
import { v4 } from 'uuid';
import useProjectStore from '@/stores/Project';
import { useSearchParams } from 'next/navigation'
interface ChatLayoutProps {
  children?: React.ReactNode;
}
const ChatLayout: FC<ChatLayoutProps> = ({ children }) => {
  const params = useParams();
  const searchParams = useSearchParams()
  const { plan, isLoading, mutate, error } = usePlanByProjectID(
    params.project as string
  );
  const getProjectByID = useProjectStore((state) => state.getProjectByID);
  const projectData = getProjectByID(params.project as string);
  const generalChatId = projectData?.chat_id;
  const route = useRouter();
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
                  <div
                    className={"mt-1 ps-[10%] hover:bg-neutral-200 cursor-pointer"
                    +(searchParams.get('chatID')===plan.chat_id?" bg-neutral-200":"")}
                    onClick={() => {
                      handleClickChat(plan.chat_id!);
                    }}
                    key={v4()}
                  >
                    {plan.name}
                  </div>
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
                  <div
                    className={"mt-1 ps-[10%] hover:bg-neutral-200 cursor-pointer"+(searchParams.get('chatID')===plan.chat_id?" bg-neutral-200":"")}
                    onClick={() => handleClickChat(plan.chat_id!)}
                    key={v4()}
                  >
                    {plan.name}
                  </div>
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
              className={"mt-1 ps-[10%] hover:bg-neutral-200 cursor-pointer"+(searchParams.get('chatID')===generalChatId?" bg-neutral-200":"")}
              onClick={() => {
                handleClickChat(generalChatId);
              }}
            >
              General
            </div>
          </div>
        </div>
      </div>
      <div className="w-10/12 flex h-full flex-col">
        <div className="flex flex-col h-[8%] ps-[3%] bg-neutral-100 justify-center">
          Task 1
        </div>
        <div className="flex h-[92%]">
          <div className="w-[80%]">{children}</div>
          <div className="w-[20%] bg-neutral-100 text-sm">
            <div className="h-5 ps-4 text-white bg-teal-800 mb-2">
              Files list
            </div>
            <div className="overflow-y-scroll  flex items-center ">
              {/* file */}
              <div className="mt-1 ps-4 truncate w-3/5">
                {' '}
                Screen Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </div>
              <div className="ps-3">
                {DateTime.now().toFormat('dd/mm/yyyy')}
              </div>
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
