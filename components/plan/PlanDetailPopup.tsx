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
      <div className=" bg-white rounded-lg w-[45%] h-auto flex flex-col">
        <div className="grid grid-cols-1 h-full divide-y divide-teal-800 ">
          <h2 className="flex h-full p-4 items-center text-lg font-semibold">Plan Detail</h2>
          <div className="flex flex-col py-3 px-4 gap-1">
            <div className='w-full flex flex-col gap-3'>
              <div className='w-full flex flex-row gap-4'>
                <div className='font-semibold w-[100px]'>Plan name</div>
                {/* <div className='col-span-6'>ประโยคจะสมบูรณ์ก็ต่อเมื่อมีทั้งภาคประธานและภาคแสดง ประโยคยังแบ่งเป็น 3 ประเภทคือ ประโยคความเดียว ที่มีประธานเดียวและภาคแสดงเดียว, ประโยคความรวม ที่รวมประโยคความเดียวตั้งแต่ 2 ประโยคเข้าด้วยกัน และ ประโยคความซ้อน ที่มีประโยคความเดียว 1 ประโยคเป็นประโยคหลัก แล้วมีประโยคความเดียวอื่นมาเสริม</div> */}
                <div className=''>{name}</div>
              </div>
              <div className='w-full flex flex-row gap-4'>
                <div className='font-semibold w-[100px]'>Type</div>
                <div className=''>
                  {task ? (
                    <div className='flex px-4 justify-center items-center rounded-full bg-teal-100 text-teal-800 font-semibold'>
                      Gantt
                    </div>
                  ) : (
                    <div className='flex px-4 justify-center items-center rounded-full bg-teal-100 text-teal-800 font-semibold'>
                      Not gantt
                    </div>
                  )}
                </div>
              </div>
              <div className='w-full flex flex-row gap-4'>
                <div className='font-semibold w-[100px]'>Timeline</div>
                <div className=''>{start_date} - {end_date}</div>
              </div>

              <div className='w-full flex flex-row gap-4'>
                <div className='font-semibold w-[100px]'>Duration</div>
                <div className=''>{duration.toString() + " Days"}</div>
              </div>

              <div className='w-full flex flex-row gap-4 items-center'>
                <div className='font-semibold w-[100px]'>Progress</div>
                <div className="h-[30%] w-[80%] flex items-center gap-2">
                  <div className="w-[80%] rounded-lg h-2 bg-neutral-400">
                    <div
                      className={`bg-teal-800 h-2 rounded-full`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="">{progress} %</div>
                </div>
              </div>

              <div className='w-full'>
                <div className='font-semibold'>Description</div>
                <div className='w-full min-h-[200px] max-h-[200px] p-4 rounded-lg bg-neutral-100 overflow-scroll'>
                {description}
                </div>
              </div>
            </div>


            {/* <div className='flex flex-row justify-between items-center gap-2 '>
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
            </div> */}
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
