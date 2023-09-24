// components/Modal.tsx
'use client';
import React, { useCallback, useRef, useState, MouseEvent, useEffect, ChangeEvent, FC } from 'react';
import { PlanEditSchema, PlanEditSchemaType } from '@/models/Auth/Plan';
import { BsCheckSquare, BsCheckSquareFill, BsCalendarEvent } from "react-icons/bs";
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


interface DataPlan {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
  id:string;
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
  file: File,
  url: string,
  path: string,
  uid: string
}

interface TableFile {
  name: string,
  url: string,
  path: string,
  uid: string
}

interface TableComponentProps {
  table: TableFile[];
  pageType: string;
  onChange?: (table: TableFile[]) => void;
}

const TableFileModal: FC<TableComponentProps> = ({ table = [], pageType, onChange }) => {
  const handleDelete = useCallback(
    (index: number) => {
      const newTable = table.filter((_, i) => i !== index);
      if (onChange) onChange(newTable);
    },
    [table, onChange]
  );
  return (
    <>
      <div className="w-full">
        <div className="bg-neutral-200 h-[35px] grid grid-cols-5 rounded-t-md">
          <div className="col-span-4 flex items-center px-4 rounded-tl-md font-semibold">File</div>
          <div className="col-span-1 flex items-center justify-centers rounded-tr-md font-semibold"></div>
        </div>
        <div className='bg-neutral-100 h-[125px] rounded-b-md overflow-hidden'>
          <div className='h-[115%] w-[105%] overflow-scroll'>
            {table.length === 0 && (
              <div className='w-full h-full bg-neutral-100 flex justify-center items-center text-neutral-600'>
                No attach file
              </div>
            )}
            {table.length !== 0 && (
              <div className='w-[100%]'>
                {table.map((item, index) => (
                  <div
                    className={`grid grid-cols-5 items-center bg-neutral-100 w-full h-[40px]`}
                    key={index}
                  >
                    <div className='col-span-4 py-2 px-4'>
                      {item.name}
                    </div>
                    <div
                      className="flex justify-center flex items-center h-[40px]"
                    >
                      {pageType === "Reject" && (
                        <div className='flex justify-center items-center rounded-full w-[30px] h-[30px] hover:bg-neutral-200 cursor-pointer hover:transition hover:ease-in-out'>
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
  )
};

const SummaryPopup: React.FC<DataPlan> = (
  {
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
  const [selectedValue, setSelectedValue] = useState<string>("Approve");
  const [table, setTable] = useState<TableFile[]>(files);
  const [File, setFile] = useState<File | null>(null);


  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    if (newValue === "Approve") {
      setTable(files);
    }
  };

  const onSubmit: SubmitHandler<createSummarySchema> = async (data) => {
    console.log("data : ", data);
    console.log(table.map((item) => item))
    try {
      const sendData = {
        id: id,
        comment: data.comment,
        status: selectedValue.toLowerCase() === 'approve' && progress === 100 ? 'complete' : selectedValue,
        progress: data.progress || progress,
      };
      console.log("send data", sendData)
      const resData = await axiosBaseurl.put('/summary/edit/', sendData)
      onSuccess()
      reset();
    }
    catch (err: any) {
      console.log(err);
      onClose()
      reset()
    }
  };

  const handleUploadFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const [url, path, uid] = await uploadFileToFirebase(e.target.files[0]);
      setTable([...table, { name: e.target.files[0].name, url, path, uid }]);
      return { url, path, uid }
    }
  }

  if (!show) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center z-40 flex-col items-center bg-black bg-opacity-50 cursor-default">
      <form className=" bg-white rounded-lg w-[700px] h-auto flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 h-full divide-y divide-teal-800 ">
          <div className='flex h-full p-4 justify-between items-center '>
            <div className='flex text-lg font-semibold'>{plan_name}</div>
            {user.role === "advisor" && (
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
          <div className='flex flex-col py-3 px-4 gap-1'>
            <div className='flex justify-end items-center w-full'>
              {selectedValue === "Reject" && user.role === "advisor" && (
                <label htmlFor="fileUpload" className="cursor-pointer mb-2 h-10 rounded-full flex bg-teal-800 items-center
                 hover:bg-teal-700 hover:transition hover:ease-in-out  justify-center w-[20%] px-2">
                  <div className='text-white items-center justify-center p-2'>
                    Attach file
                  </div>
                  <input type="file" id="fileUpload" className="hidden" onChange={handleUploadFiles} accept="image/*" />
                </label>
              )}
              {selectedValue === "Approve" && user.role === "advisor" && (
                <div
                  className='mb-2 h-10 rounded-full flex bg-neutral-200 items-center justify-center w-[20%] p-2'
                >
                  Attach file
                </div>
              )}
            </div>
            <div className=''>
              <TableFileModal table={table} pageType={selectedValue} onChange={setTable} />
            </div>
            {selectedValue === "Approve" && (
              <label className="text-xs">
                Comment
                <textarea
                  id="Comment"
                  className={"min-h-[120px] max-h-[120px] rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base"}
                  placeholder="Description"
                  disabled
                  value={comment}
                />
              </label>
            )}
            {selectedValue === "Reject" && (
              <label className="text-xs">
                Comment
                <textarea
                  id="comment"
                  className={"min-h-[100px] max-h-[100px] rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base"}
                  placeholder="Add comment.."
                  {...register('comment', { required: true })}
                />
              </label>
            )}
            {selectedValue === "Approve" && (
              <div className=' flex flex-col w-[40%]'>
                <label className="text-xs relative block">
                  Progress
                  <div className='text-[20px] w-6 h-6 absolute bottom-[-3px] transform -translate-y-1/2 right-3'>%</div>
                  <input
                    id="Progress"
                    className={"rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base"}
                    placeholder="Progress"
                    value={progress}
                    disabled
                  />
                </label>
              </div>
            )}

            {selectedValue === "Reject" && (
              <div className=' flex flex-col w-[40%]'>
                <label className="text-xs relative block">
                  Progress
                  <div className='text-[20px] w-6 h-6 absolute bottom-[13px] transform -translate-y-1/2 right-3'>%</div>
                  <input
                    id="Progress"
                    className={"rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base"}
                    placeholder="Progress"
                    defaultValue={progress}
                    {...register('progress', { valueAsNumber: true, required: true })}
                  />
                  {errors.progress ? (
                    <div className="text-red-500">{errors.progress?.message}</div>
                  ) : (
                    <div className="h-[16px]"></div>
                  )}
                </label>
              </div>
            )}
            <div className='p-2 flex flex-row justify-end items-center gap-2 h-auto w-full'>
              <Button
                className="w-[20%] bg-neutral-200 hover:bg-neutral-100 hover:transition hover:ease-in-out "
                onClick={onClose}
              >
                <div className="text-neutral-800">Cancel</div>
              </Button>
              {(selectedValue === "Approve" && user.role === "advisor") && (
                <Button
                  className="w-[20%] bg-teal-800 hover:bg-teal-700 hover:transition hover:ease-in-out "
                  // onClick={onClose}
                  type="submit"
                >
                  <div className="text-white">Approve</div>
                </Button>
              )}
              {selectedValue === "Reject" && user.role === "advisor" && (
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
