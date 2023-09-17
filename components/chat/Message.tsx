import { Avatar } from '@mui/material';
import React from 'react';
import { AiOutlineFileText } from 'react-icons/ai';

export interface File {
  type: 'file';
  name: string;
  fileID: string;
  size: number;
  type_file: string;
  lastModified: string;
  link: string;
  memo?: string;
}

type MessageProps = {
  username: string;
  content: string | File;
  isOwnMessage: boolean;
  type?: 'file' | 'text';
};

const Message: React.FC<MessageProps> = ({
  username,
  content,
  isOwnMessage,
  type = 'text',
}) => {
  const isFile = type === 'file';
  if (isFile) {
    const fileContent = content as File;
    return (
      <div
        className={`flex ${
          isOwnMessage ? 'justify-end' : 'justify-start'
        } mb-2 space-x-2`}
      >
        {/* {!isOwnMessage &&<Avatar sx={{ width: 40, height: 40}} />} */}
        <div
          className={`max-w-lg px-4 py-2 rounded-lg ${
            isOwnMessage ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          {!isOwnMessage && <p className="text-sm text-gray-600">{username}</p>}
          <div className="flex items-center my-2 space-x-2">
            <AiOutlineFileText size={35} className="text-neutral-600" />
            <div className='flex-1 min-w-0'>
              <a
                href={fileContent.link}
                className="break-words"
                target="_blank"
                rel="noopener noreferrer"
              >
                {fileContent.name}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
                explicabo quasi, nihil dt, reprehenderit assumenda iure quae ab
                fugiat? Nostrum dignissimos iure et voluptatibus!
              </a>
            </div>
          </div>
          {fileContent.memo && (
            <p className="text-xs text-gray-500">{fileContent.memo}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2 space-x-2`}
    >
       {/* {!isOwnMessage &&<Avatar sx={{ width: 40, height: 40}} />} */}
      <div
        className={`max-w-lg px-4 py-2 rounded-lg ${
          isOwnMessage ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        {!isOwnMessage && <p className="text-sm text-gray-600">{username}</p>}
        <p>{content as string}</p>
      </div>
    </div>
  );
};

export default Message;
