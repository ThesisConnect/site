'use client';
import ChatLayout from '@/components/layout/ChatLayout';
import { useSearchParams } from 'next/navigation';
import MessageInput from '../../../../components/chat/MessageInput';
import Message, { MessageProps } from '@/components/chat/Message';
import { use, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import LoadingNormal from '@/components/loading/LoadingNormal';
import socket from '@/config/socket';
import userStore from '@/stores/User';
import { auth } from '@/config/firebase';

interface RecieveMessenger {
  _id: string
  uid: string
  username: string
  content: string | File
  type: 'file' | 'text'
}
const PageChat = () => {
  const searchParams = useSearchParams();
  const user = userStore((state) => state.user);
  const chatID = searchParams.get('chatID');
  const [chat, setChat] = useState<RecieveMessenger[]>([]);
  const [displayCount, setDisplayCount] = useState(30);
  const [loading ,setLoadingChat] =useState(false);
  const devRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef(null);
  const handleInputHeightChange = (newHeight: number) => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({});``
    }
  };
  //download more content
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
    if (chatID) {
      socket.emit('join room', chatID);

      socket.on('room messages', (newMessages:RecieveMessenger[]) => {
        setChat(newMessages)
      });
      socket.on('receive message', (newMessages) => {
        setChat((prev)=>([...prev,newMessages]))
      });
      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });
    }

    return () => {
      if (chatID) {
        socket.off('room messages');
        socket.off('receive message');
        socket.off('error');
        socket.emit('leave room', chatID);
      }
    };
  }, [chatID]);

  const handleSendData = (message: string) => {
    const chatIDFromURL = searchParams.get('chatID');
    if (chatIDFromURL) {
      socket.emit('send message', chatIDFromURL, message);
      
    } else {
      console.error('Chat ID not found in URL');
    }
  };
  return (
    <ChatLayout>
      <div className="flex flex-col w-full h-full">
        <div className="flex-grow overflow-y-scroll  max-h-[calc(100% - 14rem)]">
          <div className="p-4">
            <div ref={loadMoreRef}></div>
            {chat?.slice(-displayCount).map((msg, index) => (
              <Message
                key={index}
                username={msg.username}
                content={msg.content as string}
                isOwnMessage={auth.currentUser?.uid === msg.uid}
              />
            ))}
            {/* <Message
              username="Paxwell"
              content={{
                type: 'file',
                name: 'test.txt',
                fileID: '1234',
                size: 1234,
                type_file: 'text/plain',
                lastModified: '2021-10-10',
                link: 'https://www.google.com',
                memo: 'memo',
              }}
              isOwnMessage={false}
              type="file"
            /> */}
            <div ref={messageEndRef}></div>
          </div>
        </div>
        <div className=" bg-teal-800 relative min-h-[8%] flex-shrink-0 max-h-[14rem]  py-2  ">
          <MessageInput
            handleInputHeightChange={handleInputHeightChange}
            onClickSend={handleSendData}

          />
        </div>
      </div>
    </ChatLayout>
  );
};

const DynamicHome = dynamic(() => Promise.resolve(PageChat), {
  ssr: false,
  loading: () => <LoadingNormal />,
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
