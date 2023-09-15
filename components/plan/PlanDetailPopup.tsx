// components/Modal.tsx
'use client';
import React, { useCallback, useRef, useState, MouseEvent, useEffect } from 'react';
import { PlanSchema, PlanSchemaType } from '@/models/Auth/Plan';
import { BsCheckSquare, BsCheckSquareFill, BsCalendarEvent } from "react-icons/bs";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from './Button';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import axiosBaseurl from '@/config/baseUrl';
import CalendarPick from './calendar';


interface DataPlan {
  show: boolean;
  onClose: () => void;
  id: string,
  name: string,
  description: string,
  start_date: string,
  end_date: string,
  progress: number,
  task: boolean,
  duration: number,
}


const DetailPopup: React.FC<DataPlan> = (
  {
    show,
    onClose,
    id,
    name,
    description,
    start_date,
    end_date,
    progress,
    task,
    duration
  }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanSchemaType>({
    resolver: zodResolver(PlanSchema),
  });

  const [pick_startDate, setPickStart] = React.useState<boolean>(false);
  function showDatePicker() {
    setPickStart(!pick_startDate)
    return pick_startDate
  }
  const [pick_endDate, setPickEnd] = React.useState<boolean>(false);
  function showEndDatePicker() {
    setPickEnd(!pick_endDate)
    return pick_endDate
  }

  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date)
  const updateDate = (selDate: Date) => {
    setSelectedDate(selDate);
  }
  const [selectedEndDate, setSelectedEndDate] = React.useState<Date>(new Date)
  const updateEndDate = (selDate: Date) => {
    setSelectedEndDate(selDate);
  }



  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center z-40 flex-col items-center bg-black bg-opacity-50 cursor-default">
      <div className=" bg-white rounded-lg w-[50%] h-3/5 flex flex-col">
        <div className="grid grid-cols-1 h-full divide-y divide-teal-800 ">
          <h2 className="flex h-full p-4 items-center text-lg font-semibold">Plan Detail</h2>
          <div className="flex flex-col py-3 px-4 gap-1">
            <div className='flex items-center gap-2'>
              <label className="flex items-center gap-3">
                <input
                  id="task"
                  type="checkbox"
                  checked={task}
                  className="w-4 h-4 accent-teal-700 border-teal-300 rounded focus:text-teal-400 "
                  disabled
                />
                Gantt
              </label>
            </div>
            <label className="text-xs">
              Plan name
              <input
                id="name"
                className={" rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base"}
                placeholder="Plan name"
                value={name}
                disabled
              />
            </label>
            <label className="text-xs">
              Description
              <textarea
                id="description"
                className={"min-h-[100px] max-h-[100px] rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base"}
                placeholder="Description"
                disabled
                value={description}
              />
            </label>
            <div className=' flex flex-row justify-between items-center gap-2 '>
              <div className=' flex flex-col w-[40%]'>
                <label className="text-xs relative block">
                  Start Date
                  <input
                    id="start_date"
                    className={" rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base"}
                    placeholder="Start date"
                    value={start_date}
                    disabled
                  />
                </label>
              </div>
              <hr className='w-[12%] h-[15px] border-b-2 border-t-0 border-dashed border-teal-800' />
              <div className='flex flex-col w-[40%] '>
                <label className="text-xs relative block">
                  End Date
                  <input
                    id="end_date"
                    className={"rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base"}
                    placeholder="End date"
                    onClick={showEndDatePicker}
                    value={end_date}
                    disabled
                  />
                </label>
              </div>
            </div>
            <div className='flex flex-row justify-between items-center gap-2 '>
              <div className=' flex flex-col w-[40%]'>
                <label className="text-xs relative block">
                  Progress
                  <div className='text-[20px] w-6 h-6 absolute bottom-[-3px] transform -translate-y-1/2 right-3'>%</div>
                  <input
                    id="start_date"
                    className={"rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base"}
                    placeholder="Start date"
                    value={progress}
                    disabled
                  />
                </label>
              </div>
              <div className='flex flex-col w-[40%] '>
                <label className="text-xs relative block">
                  Duration
                  <input
                    id="duration"
                    className={"rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base"}
                    placeholder="Duration"
                    value={duration.toString() + " Days"}
                    disabled
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='px-4 py-3 flex flex-row justify-end items-center gap-2 h-full'>
          <Button

            className="bg-neutral-200 hover:bg-neutral-100 hover:transition hover:ease-in-out "
            onClick={onClose}
            type="submit"
          >
            <div className="text-neutral-800">Cancel</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailPopup;
