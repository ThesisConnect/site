// components/Modal.tsx
'use client';
import React, {
  useCallback,
  useRef,
  useState,
  MouseEvent,
  useEffect,
} from 'react';
import { PlanEditSchema, PlanEditSchemaType } from '@/models/Auth/Plan';
import {
  BsCheckSquare,
  BsCheckSquareFill,
  BsCalendarEvent,
} from 'react-icons/bs';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from './Button';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import axiosBaseurl from '@/config/baseUrl';
import CalendarPick from './calendar';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';

interface DataPlan {
  show: boolean;
  onClose: () => void;
  onSucces: () => void;
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  progress: number;
  task: boolean;
  duration: number;
}

const EditPopup: React.FC<DataPlan> = ({
  id,
  show,
  onClose,
  name,
  description,
  start_date,
  end_date,
  progress,
  task,
  duration,
  onSucces,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PlanEditSchemaType>({
    resolver: zodResolver(PlanEditSchema),
  });

  const [pick_startDate, setPickStart] = React.useState<boolean>(false);
  function showDatePicker() {
    setPickStart(!pick_startDate);
    return pick_startDate;
  }

  const originalDate = DateTime.fromFormat('1/29/2019', 'M/d/yyyy', {
    zone: 'America/New_York',
  });
  const isoDate = originalDate.toISO({ includeOffset: true });

  const Start = start_date.slice(0, 10).split('-');
  const StartDate = Start[2] + '/' + Start[1] + '/' + Start[0];
  const End = end_date.slice(0, 10).split('-');
  const EndDate = End[2] + '/' + End[1] + '/' + End[0];

  const [pick_endDate, setPickEnd] = React.useState<boolean>(false);
  function showEndDatePicker() {
    setPickEnd(!pick_endDate);
    return pick_endDate;
  }
  // const form = useRef(null);
  const [selectedDate, setSelectedDate] = React.useState<Date>(
    new Date(Start[1] + '/' + Start[2] + '/' + Start[0])
  );
  const updateDate = (selDate: Date) => {
    setSelectedDate(selDate);
  };
  const [selectedEndDate, setSelectedEndDate] = React.useState<Date>(
    new Date(End[1] + '/' + End[2] + '/' + End[0])
  );
  const updateEndDate = (selDate: Date) => {
    setSelectedEndDate(selDate);
  };

  const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const handleClickOutside = (event: Event) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [callback]);
    return ref;
  };

  const refStart = useOutsideClick(() => {
    setPickStart(!pick_startDate);
  });

  const refEnd = useOutsideClick(() => {
    setPickEnd(!pick_endDate);
  });

  const onSubmit: SubmitHandler<PlanEditSchemaType> = async (data) => {
    if (selectedDate < selectedEndDate) {
      //console.log(data);
      try {
        const sendData = {
          id: id,
          name: data.name,
          description: data.description,
          start_date: DateTime.fromFormat(
            ('0' + (Number(selectedDate.getMonth()) + 1).toString()).slice(-2) +
            '/' +
            ('0' + selectedDate.getDate()).slice(-2) +
            '/' +
            selectedDate.getFullYear(),
            'M/d/yyyy',
            { zone: 'America/New_York' }
          ).toISO({ includeOffset: true }),
          end_date: DateTime.fromFormat(
            ('0' + (Number(selectedEndDate.getMonth()) + 1).toString()).slice(
              -2
            ) +
            '/' +
            ('0' + selectedEndDate.getDate()).slice(-2) +
            '/' +
            selectedEndDate.getFullYear(),
            'M/d/yyyy',
            { zone: 'America/New_York' }
          ).toISO({ includeOffset: true }),
          progress: data.progress || progress,
        };
        console.log(sendData);
        const resData = await axiosBaseurl.put('/plan/edit', sendData);
        onSucces();
        onClose();
      } catch (err: any) {
        console.log(err);
        onClose();
        reset();
      }
    }
  };

  const nonvalidateDateRange = (start_date: Date, end_date: Date) => {
    return start_date >= end_date;
  };

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center z-40 flex-col items-center bg-black bg-opacity-50 cursor-default">
      <form
        className=" bg-white rounded-lg w-[50%] h-auto flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 h-full divide-y divide-teal-800 ">
          <h2 className="flex h-full p-4 items-center text-lg font-semibold">
            Plan Edit
          </h2>
          <div className="flex flex-col py-3 px-4 gap-1">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-3">
                <input
                  id="task"
                  type="checkbox"
                  defaultChecked={task}
                  disabled
                  className="w-4 h-4 accent-teal-700 border-teal-300 rounded focus:text-teal-400 "
                // {...register('task')}
                />
                Gantt
              </label>
            </div>
            <label className="text-xs">
              Plan name
              <input
                id="name"
                className={
                  ' rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base'
                }
                defaultValue={name}
                placeholder="Plan name"
                {...register('name', { required: true })}
              />
              {errors.name ? (
                <div className="text-red-500">{errors.name?.message}</div>
              ) : (
                <div className="h-[16px]"></div>
              )}
            </label>
            <label className="text-xs">
              Description
              <textarea
                id="description"
                className={
                  'resize-none min-h-[100px] max-h-[100px] rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base'
                }
                placeholder="Description"
                // disabled
                defaultValue={description}
                {...register('description', { required: true })}
              />
              {errors.description ? (
                <div className="text-red-500">
                  {errors.description?.message}
                </div>
              ) : (
                <div className="h-[16px]"></div>
              )}
            </label>
            <div className=" flex flex-row justify-between items-center gap-2 ">
              <div className=" flex flex-col w-[40%]">
                <label className="text-xs relative block">
                  Start Date
                  <BsCalendarEvent className="text-teal-800 w-6 h-6 absolute bottom-[15px] transform -translate-y-1/2 right-3" />
                  {pick_startDate && (
                    <div
                      ref={refStart}
                      className="absolute  h-auto bg-white shadow p-2 m-0 rounded-lg w-[17rem] top-[-350px]"
                    >
                      <CalendarPick
                        key={v4()}
                        DateSelect={selectedDate}
                        updateDate={updateDate}
                      />
                    </div>
                  )}
                  <input
                    id="start_date"
                    className={
                      'rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base'
                    }
                    placeholder="Start date"
                    onClick={showDatePicker}
                    defaultValue={start_date}
                    // value={new Date(selectedDate.setMinutes(originalDate.getMinutes() - originalTimezoneOffset)).toISOString().slice(0,10).split("-")[2] +}
                    value={
                      ('0' + selectedDate.getDate()).slice(-2) +
                      '/' +
                      (
                        '0' + (Number(selectedDate.getMonth()) + 1).toString()
                      ).slice(-2) +
                      '/' +
                      selectedDate.getFullYear()
                    }
                    // value={new Date(Start[1] + "/" + Start[2] + "/" + Start[0])}
                    // {...register('start_date')}
                    onChange={(event) => setSelectedDate}
                  />
                  <div className="h-[16px]">
                    {nonvalidateDateRange(selectedDate, selectedEndDate) ? (
                      <div className="text-red-500">
                        End date must be greater than start date.
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </label>
              </div>
              <hr className="w-[12%] h-[0px] border-b-2 border-t-0 border-dashed border-teal-800" />
              <div className="flex flex-col w-[40%] ">
                <label className="text-xs relative block">
                  End Date
                  <BsCalendarEvent className="text-teal-800 w-6 h-6 absolute bottom-[15px] transform -translate-y-1/2 right-3" />
                  {pick_endDate && (
                    <div
                      ref={refEnd}
                      className="absolute  h-auto bg-white shadow p-2 m-0 rounded-lg w-[17rem] top-[-350px]"
                    >
                      <CalendarPick
                        key={v4()}
                        DateSelect={selectedEndDate}
                        updateDate={updateEndDate}
                      />
                    </div>
                  )}
                  <input
                    id="end_date"
                    className={
                      'rounded-md border focus:border-teal-800 border-solid border-neutral-400 w-full h-12 p-2 text-base'
                    }
                    placeholder="End date"
                    onClick={showEndDatePicker}
                    defaultValue={end_date}
                    // value={end_date}
                    value={
                      ('0' + selectedEndDate.getDate()).slice(-2) +
                      '/' +
                      (
                        '0' +
                        (Number(selectedEndDate.getMonth()) + 1).toString()
                      ).slice(-2) +
                      '/' +
                      selectedEndDate.getFullYear()
                    }
                    // {...register('end_date')}
                    onChange={(event) => setSelectedEndDate}
                  />
                  <div className="h-[16px]"></div>
                </label>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-2 ">
            </div>
            <div className="py-2 flex flex-row justify-end items-center gap-2 h-full">
              <button
                className="w-[120px] h-10 rounded-full bg-neutral-200 hover:bg-neutral-100 hover:transition hover:ease-in-out "
                onClick={onClose}
                type="button"
              >
                Cancel
              </button>
              <button
                className="bg-teal-800 text-white w-[120px] h-10 rounded-full hover:bg-teal-700 hover:transition hover:ease-in-out"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPopup;
