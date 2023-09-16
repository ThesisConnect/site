'use client';
import ChatLayout from '@/components/layout/ChatLayout';
import { useSearchParams } from 'next/navigation';
import MessageInput from '../../../../components/chat/MessageInput';
import Message from '@/components/chat/Message';
import { useEffect, useRef, useState } from 'react';

const PageChat = () => {
  
  
  const searchParams = useSearchParams();
  const [chat, setChat] = useState(messages);
  const [displayCount, setDisplayCount] = useState(30);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef(null);
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
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);
  return (
    <ChatLayout>
      <div className="flex flex-col w-full h-full">
        <div className="flex-grow overflow-y-scroll max-h-[calc(100% - 14rem)]">
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
            <div ref={messageEndRef}></div>
          </div>
        </div>
        <div className=" bg-teal-800 relative min-h-[8%] max-h-[14rem]  py-3  ">
          <MessageInput />
        </div>
      </div>
    </ChatLayout>
  );
};
const messages = [
  { username: 'Alice', content: 'Hello! start', isOwnMessage: false },
  { username: 'You', content: 'Hi Alice!', isOwnMessage: true },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'You', content: 'Hi Alice!', isOwnMessage: true },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'You', content: 'Hi Alice!', isOwnMessage: true },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'You', content: 'Hi Alice!', isOwnMessage: true },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'You', content: 'Hi Alice!', isOwnMessage: true },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'You', content: 'Hi Alice!', isOwnMessage: true },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'How are you?', isOwnMessage: false },
  { username: 'Alice', content: 'end', isOwnMessage: false },
  
];
export default PageChat;
