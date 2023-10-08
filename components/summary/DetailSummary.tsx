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

interface DataPlan {
  show: boolean;
  onClose: () => void;
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
  status: string;
  date: string;
  time: string;
}

interface contents {
  file: File;
  url: string;
  path: string;
  uid: string;
}

interface TableFile {
  name: string;
  url: string;
  // path: string,
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
          <div className="col-span-4 flex items-center px-4 rounded-tl-[3px] font-semibold">
            File
          </div>
          <div className="col-span-1 flex items-center justify-centers rounded-tr-md font-semibold"></div>
        </div>
        <div className="bg-neutral-100 h-[125px] rounded-b-md overflow-hidden">
          <div className="h-[115%] w-[105%] overflow-scroll">
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

const DetailSummaryPopup: React.FC<DataPlan> = ({
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
  status,
  date,
  time,
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

  const [selectedValue, setSelectedValue] = useState<string>('Approve');
  const [table, setTable] = useState<TableFile[]>(files);
  const [File, setFile] = useState<File | null>(null);

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    if (newValue === 'Approve') {
      setTable(files);
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

  if (!show) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center z-40 flex-col items-center bg-black bg-opacity-50 cursor-default">
      <div className=" bg-white rounded-lg w-[650px] max-h-[660px] flex flex-col">
        <div className="grid grid-cols-1 h-full p-4">
          <div className="flex flex-col py-3 px-5 gap-1 overflow-y-scroll">
            <div className="w-full flex justify-end">
              <div className="flex justify-center items-center gap-2">
                {status === 'pending' && (
                  <div className="flex font-bold rounded-full items-center text-[12px] text-yellow-700 py-0 px-3 border border-yellow-700 bg-yellow-100">
                    {status.toUpperCase()}
                  </div>
                )}
                {status === 'reject' && (
                  <div className="flex font-bold rounded-full items-center text-[12px] text-red-700 py-0 px-3 border border-red-700 bg-red-100">
                    {status.toUpperCase()}
                  </div>
                )}
                {status === 'approve' && (
                  <div className="flex font-bold rounded-full items-center text-[12px] text-sky-700 py-0 px-3 border border-sky-700 bg-sky-100">
                    {status.toUpperCase()}
                  </div>
                )}
                {status === 'complete' && (
                  <div className="flex font-bold rounded-full items-center text-[12px] text-teal-700 py-0 px-3 border border-teal-700 bg-teal-100">
                    {status.toUpperCase()}
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-xl whitespace-pre-wrap font-semibold p-1 overflow-auto">{plan_name}</div>
            <hr></hr>
            <div className="grid grid-cols-4 items-center">
              <div className="text-teal-800 font-semibold p-1">Date</div>
              <div className="col-span-3">{date}</div>
            </div>
            <div className="grid grid-cols-4 items-center">
              <div className="text-teal-800 font-semibold p-1">Time</div>
              <div className="col-span-3">{time}</div>
            </div>
            <div className="grid grid-cols-4 items-center">
              <div className="text-teal-800 font-semibold p-1">Progress</div>
              <div className="col-span-3">{progress} %</div>
            </div>
            <div className="grid grid-cols-4">
              <div className="text-teal-800 font-semibold p-1">Message</div>
              <div className="col-span-3 h-auto overflow-hidden">
                <div className="py-2 pr-4 max-h-[150px] w-[105%] whitespace-pre-wrap overflow-y-scroll">
                  <div>{comment}</div>
                </div>
              </div>
            </div>
            <hr></hr>
            <TableFileModal
              table={table}
              pageType={selectedValue}
              onChange={setTable}
            />
          </div>
          <div className="px-4 py-3 flex flex-row justify-end items-center gap-2 h-full">
            <Button
              className="bg-neutral-200 w-[120px] hover:bg-neutral-100 hover:transition hover:ease-in-out "
              onClick={onClose}
              type="submit"
            >
              <div className="text-neutral-800">Cancel</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSummaryPopup;
