'use client';
import ChatLayout from '@/components/layout/ChatLayout';
import { useSearchParams } from 'next/navigation';
import MessageInput from '../../../../components/chat/MessageInput';
import Message, { FileCom, MessageProps } from '@/components/chat/Message';
import { use, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import LoadingNormal from '@/components/loading/LoadingNormal';
import socket from '@/config/socket';
import userStore from '@/stores/User';
import { auth } from '@/config/firebase';
import { ErrorBoundary } from 'react-error-boundary';
import { divide, set } from 'lodash';
import { mutate } from 'swr';
import { DateTime } from 'luxon';

interface fileContents {
  file: File;
  url: string;
  path: string;
  uid: string;
}
interface RecieveMessenger {
  _id: string;
  uid: string;
  username: string;
  content: string | FileCom;
  createdAt: string;
  type: 'file' | 'text';
}
const PageChat = () => {
  const searchParams = useSearchParams();
  const user = userStore((state) => state.user);
  const chatID = searchParams.get('chatID');
  const [chat, setChat] = useState<RecieveMessenger[]>([]);
  const [displayCount, setDisplayCount] = useState(30);
  const [loading, setLoadingChat] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef(null);
  const chatLengthRef = useRef(chat.length);
  const chatIDRef = useRef(chatID);
  const displayCountRef = useRef(displayCount);
  const lastMessageRef = useRef<RecieveMessenger|null>(null);
  const canFetchMore = useRef(true);
  const handleInputHeightChange = (newHeight: number) => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({});
    }
  };
  //download more content
  useEffect(() => {
    chatLengthRef.current = chat.length;
    chatIDRef.current = chatID;
    displayCountRef.current = displayCount;
    canFetchMore.current = true;
  }, [chat.length, chatID, displayCount]);

  useEffect(() => {
    lastMessageRef.current = chat[0];
  }, [chat]);

  useEffect(() => {
    setDisplayCount(30);
  }
  , [chatID]);
  useEffect(() => {
    const currentLoadMoreRef = loadMoreRef.current;
    let initialRender = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !initialRender) {
          console.log("checkEntry condition",displayCountRef.current <= chatLengthRef.current);
          console.log("checkEntry condition",displayCountRef.current,chatLengthRef.current);
          if (displayCountRef.current <= chatLengthRef.current) {
            
            // console.log("lastMessage",lastMessageRef.current);
            // console.log("timestamp",DateTime.fromISO(lastMessageRef.current.createdAt).toMillis());
            console.log("lastMessageRef",lastMessageRef.current);
            console.log("check",canFetchMore.current ,lastMessageRef.current);
            if (canFetchMore.current && lastMessageRef.current) {
              setLoadingChat(true);
              socket.emit(
                'request messages',
                chatIDRef.current,
                DateTime.fromISO(lastMessageRef.current.createdAt).toMillis()
              );
            }
            setDisplayCount((prevCount) => prevCount + 30);
          }
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

      socket.on('room messages', (initMessages: RecieveMessenger[]) => {
        // console.log(initMessages);
        setChat(initMessages);
      });
      socket.on('receive message', (newMessages) => {
        setChat((prev) => [...prev, newMessages]);
      });
      socket.on('update folder', () => {
        mutate(`/file/chat/${chatID}`);
      });
      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });
      socket.on('more messages', (messages: RecieveMessenger[]) => {
        console.log('more', messages);
        if (messages.length === 0) {
          canFetchMore.current = false;
          setLoadingChat(false);
          socket.off('more messages');
          return;
        }
        setChat((prev) => [...messages, ...prev]);
        setLoadingChat(false);
      });
    }

    return () => {
      if (chatID) {
        socket.off('room messages');
        socket.off('receive message');
        socket.off('error');
        socket.off('update folder');
        socket.off('more messages');
        socket.emit('leave room', chatID);
      }
    };
  }, [chatID]);

  const handleSendData = async (message: string | fileContents) => {
    const chatIDFromURL = searchParams.get('chatID');
    if (chatIDFromURL) {
      if (typeof message === 'string')
        socket.emit('send message', chatIDFromURL, message);
      else {
        const typeArr = message.file.type.split('/');
        const fileSent = {
          name: message.file.name,
          fileID: message.uid,
          size: message.file.size,
          type_file: typeArr[typeArr.length - 1],
          lastModified: message.file.lastModified,
          link: message.url,
          memo: '',
        };
        socket.emit('send message', chatIDFromURL, fileSent);
      }
    } else {
      console.error('Chat ID not found in URL');
    }
  };
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-grow overflow-y-scroll  max-h-[calc(100% - 14rem)]">
        <div className="p-4">
          <div ref={loadMoreRef}></div>
          {loading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          )}
          {chat?.slice(-displayCount).map((msg, index) => (
            <ErrorBoundary key={index} fallback={<div>error</div>}>
              <Message
                username={msg.username}
                content={
                  typeof msg.content === 'object'
                    ? (msg.content as FileCom)
                    : (msg.content as string)
                }
                uid={msg.uid}
                type={typeof msg.content === 'object' ? 'file' : 'text'}
                isOwnMessage={
                  auth.currentUser?.uid === msg.uid ||
                  user.username === msg.username
                }
              />
            </ErrorBoundary>
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
  );
};

const DynamicChatLayout = dynamic(
  () => import('@/components/layout/ChatLayout'),
  {
    ssr: false,
    loading: () => <LoadingNormal />,
  }
);
const RapLayoutChat = () => {
  return (
    <DynamicChatLayout>
      <PageChat />
    </DynamicChatLayout>
  );
};

export default RapLayoutChat;
