// components/Modal.tsx
'use client';
import React, { useCallback, useRef, useState, MouseEvent, useEffect } from 'react';
import { PlanEditSchema, PlanEditSchemaType } from '@/models/Auth/Plan';
import { BsCheckSquare, BsCheckSquareFill, BsCalendarEvent } from "react-icons/bs";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import axiosBaseurl from '@/config/baseUrl';
import { DateTime } from 'luxon';
import Button from '../login/Button';
import DropdownApprove from './Approve';


interface DataPlan {
  show: boolean;
  onClose: () => void;
  plan_name: string;
  comment: string;
  progress: number;
}

const SummaryPopup: React.FC<DataPlan> = (
  {
    show,
    plan_name,
    comment,
    progress,
    onClose,
  }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<PlanEditSchemaType>({
    resolver: zodResolver(PlanEditSchema),
  });


  const [selectedValue, setSelectedValue] = useState<string>("Approve");
  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
  };




  console.log(selectedValue)
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center z-40 flex-col items-center bg-black bg-opacity-50 cursor-default">
      <form className=" bg-white rounded-lg w-[50%] h-[70%] flex flex-col">
        <div className="grid grid-cols-1 h-full divide-y divide-teal-800 ">
          <div className='flex h-full p-4 justify-between items-center '>
            <div className='flex text-lg font-semibold'>{plan_name}</div>
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
          </div>
          <div className='flex flex-col py-3 px-4 gap-1'>
            <div className='flex justify-end items-center w-full'>
              {selectedValue === "Reject" ? (

                <label htmlFor="fileUpload" className="cursor-pointer w-10/12 mt-2 h-10 rounded-full flex bg-teal-800 items-center hover:bg-teal-700 hover:transition hover:ease-in-out  justify-center w-[20%] px-2">
                  <div className='text-white items-center justify-center px-2 '>
                    Attach file
                  </div>
                  <input type="file" id="fileUpload" className="hidden" accept="image/*" />
                </label>
              ) : (
                <div
                  className='w-10/12 mt-2 h-10 rounded-full flex bg-neutral-200 items-center justify-center w-[20%] px-2'
                >
                  Attach file
                </div>
              )}
            </div>
            <div className=''>
              <div className='text-sm'>Files</div>
              <div className='w-full h-36 bg-neutral-100 rounded-[3px]'>
                <div className='w-full h-8 bg-neutral-200 rounded-t-[3px] flex px-2 items-center font-semibold'>
                  <div className='w-3/4 flex justify-center'>
                    File
                  </div>
                  <div className='w-1/4 flex justify-center'>
                    Delete
                  </div>
                </div>

              </div>
            </div>
            {selectedValue === "Approve" && (
              <label className="text-xs">
                Comment
                <textarea
                  id="Comment"
                  className={"min-h-[100px] max-h-[100px] rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base"}
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
                />
              </label>
            )}
            {selectedValue === "Approve" ? (
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
            ) : (
              <div className=' flex flex-col w-[40%]'>
                <label className="text-xs relative block">
                  Progress
                  <div className='text-[20px] w-6 h-6 absolute bottom-[-3px] transform -translate-y-1/2 right-3'>%</div>
                  <input
                    id="Progress"
                    className={"rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base"}
                    placeholder="Progress"
                    defaultValue={progress}
                  />
                </label>
              </div>
            )}
            <div className='px-2 flex flex-row justify-end items-center gap-2 h-auto w-full'>
              <Button
                className="w-[20%] bg-neutral-200 hover:bg-neutral-100 hover:transition hover:ease-in-out "
                onClick={onClose}
                type="submit"
              >
                <div className="text-neutral-800">Cancel</div>
              </Button>
              {selectedValue === "Approve" ? (
                <Button
                  className="w-[20%] bg-teal-800 hover:bg-teal-700 hover:transition hover:ease-in-out "
                  onClick={onClose}
                  type="submit"
                >
                  <div className="text-white">Approve</div>
                </Button>
              ) : (
                <Button
                  className="w-[20%] bg-teal-800 hover:bg-teal-700 hover:transition hover:ease-in-out "
                  onClick={onClose}
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
