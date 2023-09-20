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
      <div className=" bg-white rounded-lg w-[550px] h-auto flex flex-col">
        <div className="grid grid-cols-1 h-full p-4">
          {/* <h2 className="flex h-full p-5 items-center text-lg font-semibold">Plan Detail</h2> */}
          <div className="flex flex-col py-3 px-5 gap-1">
            <div className='w-full flex justify-end'>
              <div className='flex justify-center items-center gap-2'>
                {
                  task ? (
                    <div className='w-[75px] flex items-center justify-center rounded-full bg-[#B3D1D0] font-semibold text-teal-800 p-1 text-sm'>Gantt</div>
                  ) : (
                    <div className='w-[90px] flex items-center justify-center rounded-full bg-[#B3D1D0] font-semibold text-teal-800 p-1 text-sm'>Not gantt</div>
                  )
                }
              </div>
            </div>
            <div className='text-xl p-1'>
              {name}
            </div>
            <div className='p-1'>
              <div>{description}</div>
              {/* <div>And let’s end all this nonsense about how long sentences = run-on sentences. You can have a six-word run-on sentence (“I went shopping I ate donuts.”), while most of the sentences below are much, much longer than that and are not run-ons (except for a few examples like Jose Saramago).  But whether the sentence is grammatically correct isn’t nearly as important as whether the sentence is fun or beautiful.</div> */}
            </div>
            <hr></hr>
            <div className='flex'>
              <div className='flex w-[50%] gap-2 items-center'>
                <div className='grid grid-cols-3 items-center'>
                  <div className='text-teal-800 font-semibold p-1'>Start date</div>
                  <div className='span-col-2'>{start_date}</div>
                </div>
              </div>
              <div className='flex w-[50%] gap-2 items-center'>
                <div className='grid grid-cols-3 items-center'>
                  <div className='text-teal-800 font-semibold p-1'>End date</div>
                  <div className='span-col-2'>{end_date}</div>
                </div>
              </div>
            </div>

            <div className='flex'>
              <div className='flex w-[50%] gap-2 items-center'>
                <div className='text-teal-800 font-semibold p-1'>Duration</div>
                <div>{duration.toString() + " Days"}</div>
              </div>
              <div className='gap-2 flex w-[50%] items-center'>
                <div className='text-teal-800 font-semibold p-1'>Progress</div>
                <div>{progress} %</div>
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
    </div>
  );
};

export default DetailPopup;