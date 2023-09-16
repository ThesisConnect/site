import React from 'react';

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
};

const Message: React.FC<MessageProps> = ({ username, content, isOwnMessage }) => {
  const isFile = typeof content === 'object' && content?.type === 'file';

  if (isFile) {
    const fileContent = content as File;
    return (
      <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}>
        <div className={`max-w-lg px-4 py-2 rounded-lg ${isOwnMessage ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'}`}>
          {!isOwnMessage && <p className="text-sm text-gray-600">{username}</p>}
          <p>
            <a href={fileContent.link} target="_blank" rel="noopener noreferrer">
              {fileContent.name}
            </a>
          </p>
          {fileContent.memo && <p className="text-xs text-gray-500">{fileContent.memo}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-lg px-4 py-2 rounded-lg ${isOwnMessage ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'}`}>
        {!isOwnMessage && <p className="text-sm text-gray-600">{username}</p>}
        <p>{content as string}</p>
      </div>
    </div>
  );
};

export default Message;
