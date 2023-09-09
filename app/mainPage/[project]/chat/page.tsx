'use client';
import ChatLayout from '@/components/layout/ChatLayout';
import { useSearchParams } from 'next/navigation';
import MessageInput from '../../../../components/chat/MessageInput';
const PageChat = () => {
  const searchParams = useSearchParams();
  return (
    <ChatLayout>
      <div className="flex flex-col w-full h-full">
        <div className="flex-grow "></div>
        <div className=" bg-teal-800 relative min-h-[8%] max-h-[50%] py-2  ">
          <MessageInput />
        </div>
      </div>
    </ChatLayout>
  );
};

export default PageChat;
