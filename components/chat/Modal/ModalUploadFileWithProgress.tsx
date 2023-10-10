'use client';
import {
  FC,
  useCallback,
  useRef,
  useState,
  forwardRef,
  MouseEvent,
  ButtonHTMLAttributes,
  useEffect, useMemo,
} from 'react';
import InputText from '../../login/Input';
import AutoResizingTextArea from '../../AutoResizingTextArea';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { checkEmail } from '@/utils/schemaEmail';
import { checkSchemaCreateProject } from '@/models/Project/createNewProject';
import { set } from 'lodash';
import { create } from 'zustand';
import useProject from '@/hook/useProject';
import userStore from '@/stores/User';
import axiosBaseurl from '@/config/baseUrl';
import useProjectStore, { IUserInProject } from '@/stores/Project';
import TableInModal, {
  TableMember,
} from '@/components/chat/Modal/TableInModal';
import { AiOutlinePercentage } from 'react-icons/ai';
import { z, ZodType } from 'zod';
import socket from '@/config/socket';
import { useSearchParams } from 'next/navigation';
import uploadFileToFirebase from '@/utils/uploadfile';
import file from '@/components/summary/File';
import { throws } from 'assert';
import {auth} from "@/config/firebase";

interface ModalUploadFileWithProgressProps {
  isOpen: boolean;
  onClose: () => void;
}

interface fileContents {
  file: File;
  url: string;
  path: string;
  uid: string;
}

const ModalUploadFileWithProgress: FC<ModalUploadFileWithProgressProps> = ({
  isOpen,
  onClose,
}) => {
  const searchParams = useSearchParams();
  const [error, setError] = useState('');
  const user = userStore((state) => state.user);
  const [isLoad, setIsLoad] = useState(false);
  const [table, setTable] = useState<TableMember[]>([]);
  const [createLoading, setCreateLoading] = useState(false);
  const {currentProject,getPlanByProjectID} = useProjectStore((state) => {
    return {
      currentProject: state.currentProject,
      getPlanByProjectID: state.getPlanByProjectID,
    };
  });
  const chatID = searchParams.get('chatID');
  const currentPlan = useMemo(() => () => {
    const allPlan = currentProject&&getPlanByProjectID(currentProject._id);
    return allPlan&&allPlan.find((plan) => plan.chat_id === chatID);
  }, [currentProject, getPlanByProjectID, chatID]);
  const progressInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
 

  const handleAddFile = () => {
    if (fileInputRef.current?.files) {
      const file = fileInputRef.current?.files[0];
      console.log(file);
      if (file) {
        const newTable = [...table, { file }];
        setTable(newTable);
      }
    }
  };
  const handleSendData = async (message: string | fileContents) => {
    const chatIDFromURL = searchParams.get('chatID');
    if (chatIDFromURL) {
      if (typeof message === 'string')
         await socket.emit('send message', chatIDFromURL, message);
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
          console.log(fileSent);
         await socket.emit('send message', chatIDFromURL, fileSent);
      }
    } else {
      console.error('Chat ID not found in URL');
    }
  };
  const handleSummit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = textAreaRef.current?.value;
    const progress = progressInputRef.current?.value;
    const singleFile = table[0].file;
    // console.log("single",singleFile);
    // console.log(singleFile instanceof File);
    // const { data:test, error:errortest } = safelyParse(fileSchema, singleFile);
    // console.log('Single file validation: ', test, errortest ,test instanceof File);
    
    const { data, error } = safelyParse(checkSchemaMessage, {
      message,
      progress,
      files: table.map((item) => item.file),
    });
    console.log('test', data, error);
    if (error) {
      console.log(error);
      setError(error);
      return;
    }
    if (data) {
      console.log('pass validation', data);
      setError('');
      setCreateLoading(true);
      try {
        const { message, progress, files } = data;
        const uploadAllfiles = files.map((file: unknown) => {
          if (
            typeof file === 'object' &&
            file !== null &&
            'name' in file &&
            'type' in file &&
            'size' in file &&
            'lastModified' in file
          ) {
            return uploadFileToFirebase(file as unknown as File);
          } else {
            return Promise.reject(new Error('Object must be a File'));
          }
        });
        const allFiles = await Promise.all(uploadAllfiles);
        // allFiles.map((items, index) => {
        //   const file = files[index] as unknown as File;
        //   const [url, path, uid] = items;
        //   handleSendData({ file, url, path, uid });
        // });
        const formatData ={
          project_id: currentProject?._id,
          plan_id: currentPlan()?._id,
          reciever_id: currentProject?.advisors[0]._id,
          sender_id: auth.currentUser?.uid,
          comment: message,
          files: allFiles.map((items)=>items[2]),
          chat_id: chatID,
          status: 'pending',
          progress: Number(progress),
        }
        await axiosBaseurl.post("/summary/create",formatData)
        await handleSendData(message);
        await handleSendData(`Progress: ${progress}%`);
        let index = 0;
        for(const items of allFiles){
          const file = files[index] as unknown as File;
          const [url, path, uid] = items;
          await handleSendData({ file, url, path, uid });
          index++;
        }
        setCreateLoading(false);
        onClose();
      } catch (err: any) {
        setError(err.message);
        setCreateLoading(false);
      }
    }
  };
  // useEffect(() => {
  //   if (isOpen) {
  //     setError('');
  //     setTable([]);
  //     emailInputRef.current?.focus();
  //   }
  // }
  // , [isOpen]);
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 flex-col  bg-black bg-opacity-50">
      {createLoading ? (
        <div className="bg-white rounded-lg  flex flex-col w-7/12 h-[75%]  items-center">
          <div className="border-b-[1px] w-full border-teal-800 h-[10%] flex items-center ps-10  font-semibold text-neutral-800">
            Proposal
          </div>
          <div className="flex h-full w-full px-10 flex-row justify-center items-center overflow-y-scroll ">
            <div className="w-16 h-16 border-t-4 border-teal-400 border-solid rounded-full animate-spin"></div>
            <div className="text-center text-2xl ms-5 font-semibold text-neutral-800">
              Uploading file and Progress...
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSummit}
          className="bg-white rounded-lg  flex flex-col w-7/12 h-[75%]  items-center"
        >
          <div className="border-b-[1px] w-full border-teal-800 h-[10%] flex items-center ps-10  font-semibold text-neutral-800">
            Upload File with Progress
          </div>
          <div className="flex h-full w-full px-10 flex-col overflow-y-scroll ">
            <AutoResizingTextArea
              ref={textAreaRef}
              minHeight={80}
              classNameLabel="text-base mt-10"
              label="Messages"
              placeholder="Messages..."
              className="border
             border-neutral-400 rounded-lg text-base py-[17px]
             px-2
             "
            />
            <div className="flex gap-x-2">
              <div className="relative flex w-1/5">
                <div className="absolute flex w-full">
                  <div className="flex-grow" />
                  <div className="py-1 h-10 mx-2rounded-full px-8 translate-y-[64px] z-20 flex items-center  ">
                    <AiOutlinePercentage
                      size={20}
                      className="text-neutral-400"
                    />
                  </div>
                </div>
                <InputText
                  label="progress"
                  placeholder="99"
                  classNameLabel="text-base mt-8"
                  width="w-full"
                  className="border-neutral-400 border text-base placeholder:text-base"
                  ref={progressInputRef}
                  type="text"
                />
              </div>
              {error && (
                <div className="flex flex-grow">
                  <div className="self-end bg-red-100  h-14 flex items-center justify-center rounded w-full  ">
                    <span className="truncate max-w-xl">{error}</span>
                  </div>
                </div>
              )}
            </div>
            <button
              className="bg-neutral-200 w-44 rounded-full px-10 py-2 mt-10 hover:bg-neutral-300"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              Attach file
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleAddFile}
            />
            <div>
              <TableInModal table={table} onChange={setTable} />
            </div>
          </div>
          <div className="h-[10%] self-end mx-10">
            <button
              className="bg-neutral-300 rounded-full px-10 py-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-neutral-300 rounded-full ms-2 px-10 py-2"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
const fileSchema = z
  .any()
  .refine(
    (data) => {
      return (
        typeof data === 'object' &&
        data !== null &&
        'name' in data &&
        'type' in data &&
        'size' in data &&
        'lastModified' in data
      );
    },
    {
      // Custom validation to check if it's a File object
      message: 'Object must be a File',
      path: [], // Add this line to avoid TypeScript error
    }
  ); // Allows additional properties (like the file data)

const checkSchemaMessage = z.object({
  message: z.string().nonempty('Message can not be empty'),
  progress: z
    .string()
    .nonempty('Progress can not be empty')
    .refine(
      (progress) =>
        /^\d+$/.test(progress) &&
        parseInt(progress, 10) >= 0 &&
        parseInt(progress, 10) <= 100,
      {
        message: 'Progress must be a numeric string between 0 and 100',
      }
    ),
  files: z.array(fileSchema).nonempty('You must upload at least one file'),
});

interface ParseResult<Data> {
  data?: Data;
  error?: string;
}

function safelyParse<Data>(
  schema: ZodType<Data, any, any>,
  objectToParse: any
): ParseResult<Data> {
  try {
    console.log(objectToParse);
    if (objectToParse.file instanceof File) {
      console.log('file');
    }
    const data = schema.parse(objectToParse);
    return { data };
  } catch (error: any) {
    // Handle specific ZodError if you are using Zod version 3.x
    if (error instanceof z.ZodError) {
      return { error: error.errors[0]?.message || 'Invalid input' };
    }
    // Generic error handling for other possible errors
    return { error: error.message || 'An error occurred' };
  }
}

export default ModalUploadFileWithProgress;
