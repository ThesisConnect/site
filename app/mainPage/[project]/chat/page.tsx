'use client';
import ChatLayout from '@/components/layout/ChatLayout';
import { useSearchParams } from 'next/navigation';
import MessageInput from '../../../../components/chat/MessageInput';
import Message from '@/components/chat/Message';
import { use, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import LoadingNormal from '@/components/loading/LoadingNormal';

const PageChat = () => {
  const searchParams = useSearchParams();
  const [chat, setChat] = useState(messages);
  const [displayCount, setDisplayCount] = useState(30);
  const devRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef(null);
  const handleInputHeightChange = (newHeight: number) => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ });
    }
  };
  useEffect(() => {
    const currentLoadMoreRef = loadMoreRef.current;
    let initialRender = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !initialRender) {
          setDisplayCount((prevCount) => prevCount + 30);
        }
        initialRender = false;
      },
      { threshold: 1 }
    );

    if (currentLoadMoreRef) {
      observer.observe(currentLoadMoreRef);
    }
    return () => {
      if (currentLoadMoreRef) {
        observer.unobserve(currentLoadMoreRef);
      }
    };
  }, []);
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  useEffect(() => {
    const currentDevRef = devRef.current;
    const observer = new ResizeObserver((entries) => {
      handleInputHeightChange(entries[0].contentRect.height);
    });
    if (currentDevRef) {
      observer.observe(currentDevRef);
    }
    return () => {
      if (currentDevRef) {
        observer.unobserve(currentDevRef);
      }
    };
  }
  , []);
  return (
    <ChatLayout>
      <div className="flex flex-col w-full h-full">
        <div className="flex-grow overflow-y-scroll  max-h-[calc(100% - 14rem)]">
          <div className="p-4">
            <div ref={loadMoreRef}></div>
            {messages.slice(-displayCount).map((msg, index) => (
              <Message
                key={index}
                username={msg.username}
                content={msg.content}
                isOwnMessage={msg.isOwnMessage}
              />
            ))}
            <Message
              username="Paxwell"
              content={{
                  type:"file",
                  name:"test.txt",
                  fileID:"1234",
                  size:1234,
                  type_file:"text/plain",
                  lastModified:"2021-10-10",
                  link:"https://www.google.com",
                  memo:"memo"
              }
              }
              isOwnMessage={false}
              type='file'
            />
            <div ref={messageEndRef}></div>
          </div>
        </div>
        <div className=" bg-teal-800 relative min-h-[8%] flex-shrink-0 max-h-[14rem]  py-2  ">
          <MessageInput 
            handleInputHeightChange={handleInputHeightChange}
          />
        </div>
      </div>
    </ChatLayout>
  );
};

const DynamicHome = dynamic(() => Promise.resolve(PageChat), {
  ssr: false,
  loading: () => (
    <LoadingNormal/>
  ),
});
const messages = [
  { username: 'Alice', content: 'Hello! start', isOwnMessage: false },
  { username: 'You', content: 'Hi Alice!', isOwnMessage: true },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'Hello! start', isOwnMessage: false },
  { username: 'You', content: 'Hi Alice!', isOwnMessage: true },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },

];
export default DynamicHome;
