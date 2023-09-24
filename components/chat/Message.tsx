import useProjectStore, { IUserInProject } from '@/stores/Project';
import { handleFilePreview } from '@/utils/PreviewFile';
import { Avatar } from '@mui/material';
import bytes from 'bytes';
import React, { useEffect } from 'react';
import { AiOutlineFileText } from 'react-icons/ai';

export interface FileCom {
  type: 'file';
  name: string;
  fileID: string;
  size: number;
  type_file: string;
  lastModified: string;
  link: string;
  memo?: string;
}

export type MessageProps = {
  username: string;
  content: string | FileCom;
  isOwnMessage: boolean;
  type?: 'file' | 'text';
  uid?: string;
};

const Message: React.FC<MessageProps> = ({
  username,
  content,
  isOwnMessage,
  type = 'text',
  uid,
}) => {
  const isFile = type === 'file';
  const [userEachMessage, setUserEachMessage] = React.useState<IUserInProject>();
  const currentProject = useProjectStore((state) => state.currentProject);
  useEffect(()=>{
    
    if (currentProject && uid) {
      const allUser = [...currentProject.advisee, ...currentProject.advisors,... currentProject.co_advisors]as IUserInProject[];
      // console.log("allUser",allUser)
      const user = allUser.find((user:IUserInProject) => user._id === uid);
      // console.log("user",user)
      setUserEachMessage(user);
    }
  },[uid,currentProject])
  if (isFile) {
    const fileContent = content as FileCom;
    return (
      <div
        className={`flex ${
          isOwnMessage ? 'justify-end' : 'justify-start'
        } mb-2 space-x-2`}
      >
         {!isOwnMessage&&<Avatar src={userEachMessage?.avatar} alt={userEachMessage?.userName}  sx={{ width: 40, height: 40}} />}
        <div
          className={`max-w-lg px-4 py-2 rounded-lg ${
            isOwnMessage ? 'bg-teal-600 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          {!isOwnMessage && <p className="text-sm text-gray-600">{username}</p>}
          <div className="flex items-center my-2 space-x-2">
            <AiOutlineFileText size={35} className="text-neutral-600" />
            <div className='flex-1 min-w-0 cursor-pointer' onClick={()=>handleFilePreview(fileContent.link,fileContent.type_file)}>
                {fileContent.name}
            </div>
          </div>
          {
            fileContent.size && (
              <p className="text-xs text-gray-500">
                {bytes(fileContent.size)}
              </p>
            )
          }
          {/* {fileContent.memo && (
            <p className="text-xs text-gray-500">{fileContent.memo}</p>
          )} */}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2 space-x-2`}
    >
       {!isOwnMessage&&<Avatar src={userEachMessage?.avatar} alt={userEachMessage?.userName}  sx={{ width: 40, height: 40}} />}
      <div
        className={`max-w-lg px-4 py-2 rounded-lg ${
          isOwnMessage ? 'bg-teal-600 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        {!isOwnMessage && <p className="text-sm text-gray-600">{username}</p>}
        <p>{content as string}</p>
      </div>
    </div>
  );
};

export default Message;
