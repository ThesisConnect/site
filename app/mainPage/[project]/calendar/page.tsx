'use client';
import React, { useState, useEffect } from 'react';
import axiosBaseurl from '@/config/baseUrl';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from 'date-fns';
import { truncate } from 'lodash';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import DetailPopup from '@/components/plan/PlanDetailPopup';
import { v4 } from 'uuid';

const MAX_NAME_LENGTH = 15;
const MAX_PLANS_PER_DAY = 2;

export interface DataModelInterface {
  _id: string;
  project_id: string;
  name: string;
  description: string;
  progress: number;
  start_date: string;
  end_date: string;
  task: boolean;
  [x: string]: any;
}

function PageCalendar({
  params: { project },
}: {
  params: { project: string };
}) {
  const [dataItem, setData] = useState<any[]>([]);
  const [selectItem, setselectItem] = useState<DataModelInterface[]>([]);
  const [currMonth, setCurrMonth] = useState(() =>
    format(startOfToday(), 'MMM-yyyy')
  );
  let firstDayOfMonth = parse(currMonth, 'MMM-yyyy', new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(endOfMonth(firstDayOfMonth)),
  });

  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  const colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
  ];

  const [state, setState] = React.useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const projectRes = await axiosBaseurl.get(`/project/${project}`, {
          withCredentials: true,
        });
        //console.log('projectRes', projectRes);
        if (projectRes?.data?.name) {
          setProjectName(projectRes.data.name);
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    })();
  }, [project]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosBaseurl.get(`/page/plan/${project}`, {
          withCredentials: true,
        });
        if (Array.isArray(res?.data)) {
          let arrData = (res.data || []).map((o: any) => {
            let dd = {
              _id: o._id,
              project_id: o.project_id,
              name: o.name,
              description: o.description,
              progress: o.progress,
              task: o.task,
              start_date: new Date(o.start_date),
              end_date: new Date(o.end_date),
            };
            return dd;
          });
          const FilterDate = arrData.filter((obj) => obj.task === false);
          setData(FilterDate);
          //console.log('arrData', FilterDate);
        } else {
          setData([]);
        }
        // console.log('resp', dataItem)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, [project]);

  const today = startOfToday();

  function showPlanDetail() {
    setState(!state);
  }

  const handleSelectDate = (data: string) => {
    const selPlan = dataItem.filter((obj) => obj._id === data);
    setselectItem(selPlan);
    setState(!state);
  };

  const GetFormatDate = (data: string) => {
   // console.log(new Date(data).toISOString());
    const DateFormat = new Date(data).toISOString().slice(0, 10).split('-');
    return DateFormat[2] + '/' + DateFormat[1] + '/' + DateFormat[0];
  };

  function getDayDiff(start_date: string, end_date: string): number {
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.round(
      Math.abs(+new Date(start_date) - +new Date(end_date)) / msInDay
    );
  }

  function getDayLate(start_date: string, end_date: string): number {
    const now = new Date();
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const duration = new Date(end_date).getTime() - now.getTime(); // Difference in milliseconds
    const days = Math.floor(duration / millisecondsPerDay);
    return days + 1;
  }

  const newDate = (date: Date) =>
    new Date(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
  const isDDay = (day: Date) => {
    let curr = newDate(day);
    let isday = dataItem.filter((o) => {
      return (
        curr.getTime() >= newDate(o.start_date).getTime() &&
        curr.getTime() <= newDate(o.end_date).getTime()
      );
    });
    if (isday.length) {
      //console.log('curr', day);
      //console.log(isday);
    }

    return isday;
  };

  const getPrevMonth = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
    setCurrMonth(format(firstDayOfPrevMonth, 'MMM-yyyy'));
  };

  const getNextMonth = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
    setCurrMonth(format(firstDayOfNextMonth, 'MMM-yyyy'));
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      {state &&
        selectItem.map((obj) => (
          <DetailPopup
            key={v4()}
            show={state}
            id={obj._id}
            name={obj.name}
            description={obj.description}
            start_date={GetFormatDate(obj.start_date)}
            end_date={GetFormatDate(obj.end_date)}
            progress={obj.progress}
            task={obj.task}
            late={getDayLate(obj.start_date, obj.end_date)}
            duration={getDayDiff(obj.start_date, obj.end_date)}
            onClose={showPlanDetail}
          />
        ))}

      <div className="flex w-full h-[50px] p-2 items-center text-lg font-semibold">
        {projectName}
      </div>
      <div className="flex w-full items-center h-[50px] px-2">
        <div className="hover:bg-teal-700 hover:transition hover:ease-in-out "></div>
      </div>
      <div className="h-[calc(100vh-165px)] flex flex-col justify-center overflow-hidden px-2">
        <div className="w-[98%] h-[600px] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between h-[35px] rounded-t-[3px] bg-teal-800">
            <p
              className="font-semibold text-xl"
              style={{ color: 'white', paddingLeft: '3%' }}
            >
              {format(firstDayOfMonth, 'MMMM yyyy')}
            </p>
            <div
              className="flex items-center justify-evenly gap-6 sm:gap-12"
              style={{ color: 'white ' }}
            >
              <ChevronLeftIcon
                className="w-6 h-6 cursor-pointer"
                onClick={getPrevMonth}
              />
              <ChevronRightIcon
                className="w-6 hx-6 cursor-pointer"
                onClick={getNextMonth}
              />
              <button
                className="cursor-pointer rounded-full bg-white text-teal-800 margin-right-20px"
                onClick={() => setCurrMonth(format(startOfToday(), 'MMM-yyyy'))}
                style={{ marginRight: '20px', width: '80px' }}
              >
                Today
              </button>
            </div>
          </div>
          {/* Content */}
          <div className="grid grid-cols-7 gap-6 sm:gap-12 place-items-start">
            {days.map((day, idx) => {
              return (
                <div key={idx} className="font-semibold text-left pl-2"></div>
              );
            })}
          </div>
          <div className="grid grid-cols-7 gap-6 sm:gap-12 place-items-start">
            {daysInMonth.map((day, idx) => {
              let calEvents = isDDay(day);
              let evItems = [];
              for (
                let i = 0;
                i < Math.min(calEvents.length, MAX_PLANS_PER_DAY);
                i++
              ) {
                const ev = calEvents[i];
                const truncatedName = truncate(ev.name, {
                  length: MAX_NAME_LENGTH,
                });
                evItems.push(
                  <div
                    key={ev._id}
                    className={`px-2 hover:bg-teal-700  cursor-pointer hover:transition hover:ease-in-out ${
                      ev._id ? 'bg-teal-800' : ''
                    }`}
                    style={{
                      color: 'white',
                      borderRadius: '3px',
                      marginTop: '5%',
                      minWidth: '115px',
                    }}
                    onClick={() => handleSelectDate(ev._id)}
                  >
                    {ev._id ? truncatedName : ''}
                  </div>
                );
              }
              return (
                <div
                  key={idx}
                  className={colStartClasses[getDay(day)] + ' text-left pl-2'}
                >
                  <p
                    className={`cursor-pointer flex items-center justify-center font-semibold h-8 w-8 rounded-full  hover:text-white ${
                      isSameMonth(day, today)
                        ? 'text-gray-900'
                        : 'text-gray-400'
                    } ${!isToday(day) && 'hover:bg-teal-800'} ${
                      isToday(day) && 'bg-neutral-300 text-black'
                    }`}
                  >
                    {format(day, 'd')}
                  </p>
                  {evItems}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageCalendar;
