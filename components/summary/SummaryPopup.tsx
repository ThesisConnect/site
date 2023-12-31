// components/Modal.tsx
'use client';
import React, {
  useCallback,
  useRef,
  useState,
  MouseEvent,
  useEffect,
  ChangeEvent,
  FC,
} from 'react';
import { PlanEditSchema, PlanEditSchemaType } from '@/models/Auth/Plan';
import {
  BsCheckSquare,
  BsCheckSquareFill,
  BsCalendarEvent,
} from 'react-icons/bs';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import axiosBaseurl from '@/config/baseUrl';
import { DateTime } from 'luxon';
import Button from '../login/Button';
import DropdownApprove from './Approve';
import userStore from '@/stores/User';
import { createSummarySchema } from '@/models/Auth/Summary';
import uploadFileToFirebase from '@/utils/uploadfile';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IUser } from '@/app/mainPage/[project]/detail/page';
import { handleFilePreview } from '@/utils/PreviewFile';
import socket from '@/config/socket';
import "@/components/summary/Scrollbar.css";

interface DataPlan {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
  id: string;
  project_id: string;
  plan_id: string;
  plan_name: string;
  reciever_id: IUser;
  sender_id: IUser;
  files: TableFile[];
  chat_id: string;
  comment: string;
  progress: number;
}

interface contents {
  file: TableFile;
  url: string;
  path: string;
  uid: string;
}

interface TableFile {
  name: string;
  url: string;
  _id: string;
  size: number;
  file_type: string;
}

interface TableComponentProps {
  table: TableFile[];
  pageType: string;
  onChange?: (table: TableFile[]) => void;
}

const TableFileModal: FC<TableComponentProps> = ({
  table = [],
  pageType,
  onChange,
}) => {
  const handleDelete = useCallback(
    (index: number) => {
      const newTable = table.filter((_, i) => i !== index);
      if (onChange) onChange(newTable);
    },
    [table, onChange]
  );

  const handleClick = (url: string, fileType: string) => {
    if (!handleFilePreview) return;
    handleFilePreview(url, fileType);
  };
  return (
    <>
      <div className="w-full">
        <div className="bg-neutral-200 h-[35px] grid grid-cols-5 rounded-t-md">
          <div className="col-span-4 flex items-center px-4 rounded-tl-md font-semibold">
            File
          </div>
          <div className="col-span-1 flex items-center justify-centers rounded-tr-md font-semibold"></div>
        </div>
        <div className="bg-neutral-100 h-[125px] rounded-b-md overflow-hidden">
          <div className="h-[100%] w-[100%] full-scrollbar">
            {table.length === 0 && (
              <div className="w-full h-full bg-neutral-100 flex justify-center items-center text-neutral-600">
                No attach file
              </div>
            )}
            {table.length !== 0 && (
              <div className="w-[100%]">
                {table.map((item, index) => (
                  <div
                    className={`grid grid-cols-5 items-center bg-neutral-100 w-full h-[40px]`}
                    key={index}
                  >
                    <div className="col-span-4 py-2 px-4 flex">
                      <div
                        className="truncate w-auto hover:underline hover:cursor-pointer"
                        onClick={() => handleClick(item.url, item.file_type)}
                      >
                        {item.name}
                      </div>
                    </div>
                    <div className="flex justify-center flex items-center h-[40px]">
                      {pageType === 'Reject' && (
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] hover:bg-neutral-200 cursor-pointer hover:transition hover:ease-in-out">
                          <RiDeleteBin6Line
                            onClick={() => handleDelete(index)}
                            size={20}
                            className="text-red-400 cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const SummaryPopup: React.FC<DataPlan> = ({
  show,
  id,
  project_id,
  plan_id,
  reciever_id,
  sender_id,
  plan_name,
  files,
  comment,
  progress,
  chat_id,
  onClose,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<createSummarySchema>({
    resolver: zodResolver(createSummarySchema),
  });

  const user = userStore((state) => state.user);
  const [selectedValue, setSelectedValue] = useState<string>('Approve');
  const [sendStatus, setsendStatus] = React.useState<string>('');
  const [table, setTable] = useState<TableFile[]>(files);
  const [File, setFile] = useState<File | null>(null);
  const initIDfile = files.map((item) => item._id);

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    if (newValue === 'Approve') {
      setTable(files);
    }
  };

  const [send, setSend] = React.useState<boolean>(false);
  const onSubmit: SubmitHandler<createSummarySchema> = async (data) => {
    if (send) return
    setSend(true)
    let SendStatus = '';
    if (selectedValue === 'Approve' && progress != 100) {
      setsendStatus('approved');
      SendStatus = 'approved'
      await handleSendData("Approve")
      await handleSendData("Progress : " + progress + "%")
    }
    else if (selectedValue === 'Reject') {
      console.log(initIDfile);
      setsendStatus('rejected');
      SendStatus = 'rejected'
      await handleSendData("Reject : " + data.comment)
      await handleSendData("Progress : " + data.progress + "%")
      for (const itemintable of table) {
        if (!initIDfile.includes(itemintable._id)) {
          console.log("itemintable ", itemintable);
          await handleSendData(itemintable)
        }
      }
    }
    else if (selectedValue === 'Approve' && progress == 100) {
      setsendStatus('completed');
      SendStatus = 'completed'
      await handleSendData("Approve")
      await handleSendData("Progress : " + progress + "%")
    }
    try {
      const fileSend = await axiosBaseurl.post('/file/create/', {
        folder_id: chat_id,
        files: table,
      });
      const sendData = {
        project_id: project_id,
        id: id,
        comment: data.comment,
        status: SendStatus,
        files: table.map((obj) => obj._id),
        progress: data.progress || progress,
      };
      console.log('send data', sendData);
      const resData = await axiosBaseurl.put('/summary/edit/', sendData);
      onSuccess();
      setSend(false)
      reset();
    } catch (err: any) {
      console.log(err);
      onClose();
      reset();
      setSend(false)
    }
  };

  const handleUploadFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const [url, path, uid] = await uploadFileToFirebase(e.target.files[0]);
      setTable([
        ...table,
        {
          name: e.target.files[0].name,
          url,
          _id: uid,
          size: e.target.files[0].size,
          file_type: e.target.files[0].type,
        },
      ]);
      return { url, path, uid };
    }
  };

  const handleSendData = async (message: string | TableFile) => {
    if (chat_id) {
      if (typeof message === 'string')
        await socket.emit('send message', chat_id, message);
      else {
        const fileSent = {
          name: message.name,
          fileID: message._id,
          size: message.size,
          type_file: message.file_type,
          lastModified: Date.now(),
          link: message.url,
          memo: '',
        };
        console.log(fileSent);
        await socket.emit('send message', chat_id, fileSent);
      }
    } else {
      console.error('Chat ID not found in URL');
    }
  };

  useEffect(() => {
    console.log(chat_id)
    if (chat_id) {
      socket.emit('join room', chat_id);
      return () => {
        if (chat_id) {

          socket.emit('leave room', chat_id);
        }
      };
    }

  }, [chat_id])

  if (!show) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center z-40 flex-col items-center bg-black bg-opacity-50 cursor-default">
      <form
        className=" bg-white rounded-lg w-[700px] h-auto flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 h-full divide-y divide-teal-800 ">
          <div className="flex h-full p-4 justify-between items-center ">
            <div className='flex h-auto'>
              <div className="flex text-lg font-semibold pr-2 ">{plan_name}</div>
            </div>
            {user.role === 'advisor' && (
              <div>
                <DropdownApprove
                  label=""
                  placeholder="select"
                  width="w-6/12"
                  control={control}
                  pageType={selectedValue}
                  setPage={handleValueChange}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col py-3 px-4 gap-1">
            <div className="flex justify-end items-center w-full">
              {selectedValue === 'Reject' && user.role === 'advisor' && (
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer mb-2 h-10 rounded-full flex bg-teal-800 items-center
                  hover:bg-teal-700 hover:transition hover:ease-in-out justify-center w-[20%] px-2"
                >
                  <div className="text-white items-center justify-center p-2">
                    Attach file
                  </div>
                  <input
                    type="file"
                    id="fileUpload"
                    className="hidden"
                    onChange={handleUploadFiles}
                    accept="image/*"
                  />
                </label>
              )}
              {selectedValue === 'Approve' && user.role === 'advisor' && (
                <div className="mb-2 h-10 rounded-full flex bg-neutral-200 items-center justify-center w-[20%] p-2">
                  Attach file
                </div>
              )}
            </div>
            <div className="">
              <TableFileModal
                table={table}
                pageType={selectedValue}
                onChange={setTable}
              />
            </div>
            {selectedValue === 'Approve' && (
              <label className="text-xs">
                Comment
                <textarea
                  id="Comment"
                  className={
                    'resize-none min-h-[120px] max-h-[120px] rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base'
                  }
                  placeholder="Description"
                  disabled
                  value={comment}
                />
              </label>
            )}
            {selectedValue === 'Reject' && (
              <label className="text-xs">
                Comment
                <textarea
                  id="comment"
                  className={
                    'resize-none min-h-[100px] max-h-[100px] rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base'
                  }
                  placeholder="Add comment.."
                  {...register('comment', { required: true })}
                />
              </label>
            )}
            {selectedValue === 'Approve' && (
              <div className=" flex flex-col w-[40%]">
                <label className="text-xs relative block">
                  Progress
                  <div className="text-[20px] w-6 h-6 absolute bottom-[-3px] transform -translate-y-1/2 right-3">
                    %
                  </div>
                  <input
                    id="Progress"
                    className={
                      'rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base'
                    }
                    placeholder="Progress"
                    value={progress}
                    disabled
                  />
                </label>
              </div>
            )}

            {selectedValue === 'Reject' && (
              <div className=" flex flex-col w-[40%]">
                <label className="text-xs relative block">
                  Progress
                  <div className="text-[20px] w-6 h-6 absolute bottom-[13px] transform -translate-y-1/2 right-3">
                    %
                  </div>
                  <input
                    id="Progress"
                    className={
                      'rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base'
                    }
                    placeholder="Progress"
                    defaultValue={progress}
                    {...register('progress', {
                      valueAsNumber: true,
                      required: true,
                    })}
                  />
                  {errors.progress ? (
                    <div className="text-red-500">
                      {errors.progress?.message}
                    </div>
                  ) : (
                    <div className="h-[16px]"></div>
                  )}
                </label>
              </div>
            )}
            <div className="p-2 flex flex-row justify-end items-center gap-2 h-auto w-full">
              <Button
                className="w-[20%] bg-neutral-200 hover:bg-neutral-100 hover:transition hover:ease-in-out "
                onClick={onClose}
              >
                <div className="text-neutral-800">Cancel</div>
              </Button>
              {selectedValue === 'Approve' && user.role === 'advisor' && (
                <Button
                  className="w-[20%] bg-teal-800 hover:bg-teal-700 hover:transition hover:ease-in-out "
                  // onClick={onClose}
                  type="submit"
                >
                  <div className="text-white">Approve</div>
                </Button>
              )}
              {selectedValue === 'Reject' && user.role === 'advisor' && (
                <Button
                  className="w-[20%] bg-teal-800 hover:bg-teal-700 hover:transition hover:ease-in-out "
                  type="submit"
                >
                  <div className="text-white">Reject</div>
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SummaryPopup;