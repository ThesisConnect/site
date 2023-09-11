"use client";

import React, { use, useState } from "react";
import axiosBaseurl from "@/config/baseUrl";
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
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { truncate } from "lodash";
import { useEffect } from "react";
import { DataModelInterface, dataModel } from "./dataModel";

const MAX_NAME_LENGTH = 15;

function PageCalendar({ params: { project } }: {
  params: {
    project: string
  }
}) {
  const [dataItem, setData] = useState<DataModelInterface[]>([]);
  // const [data, setData] = useState<DataModelInterface[]>([]);

  // let dataItem: DataModelInterface[] = dataModel.map((o) => {
  //   let dd = {
  //     _id: o._id,
  //     project_id: o.project_id,
  //     name: o.name,
  //     desc: o.description,
  //     progress: o.progress,
  //     startDate: new Date(o.start_date.$date),
  //     endDate: new Date(o.end_date.$date),
  //   } as DataModelInterface;
  //   return dd;
  // });

  useEffect(() => {
    (async () => {
      const res = await axiosBaseurl.get(`/page/plan/${project}`, {
        withCredentials: true
      });
      if (Array.isArray(res?.data)) {
        let arrData = (res.data || []).map((o) => {
          let dd = {
            _id: o.id,
            project_id: o?.project_id, 
            name: o.name,
            desc: o.description,
            progress: o.progress,
            startDate: new Date(o.start_date),
            endDate: new Date(o.end_date),
          } as DataModelInterface;
          return dd;
        });
        setData(arrData);
        console.log('arrData', arrData);
      } else {
        setData([])
      }
      console.log('resp', dataItem)
    })()
  }, []);


  const today = startOfToday();
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
  let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(endOfMonth(firstDayOfMonth)),
  });

  const getPrevMonth = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
    setCurrMonth(format(firstDayOfPrevMonth, "MMM-yyyy"));
  };

  const getNextMonth = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
    setCurrMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
  };

  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedData, setSelectedData] = useState<DataModelInterface[]>([]);

  const openPopup = (day: Date) => {
    setSelectedDay(day);

    const selectedDataItems = dataItem.filter((o) => {
      return (
        day.getTime() >= o.startDate.getTime() &&
        day.getTime() <= o.endDate.getTime()
      );
    });

    setSelectedData(selectedDataItems);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setSelectedDay(null);
    setSelectedData([]);
    setPopupVisible(false);
  };

  const isDDay = (day: Date) => {
    let isday = dataItem.filter((o) => {
      return (
        day.getTime() >= o.startDate.getTime() &&
        day.getTime() <= o.endDate.getTime()
      );
    });
    return isday;
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="flex w-full h-[50px] p-2 items-center text-lg font-semibold">
        Project name
      </div>
      <div className="flex w-full items-center h-[50px] px-2">
        <div
          className="hover:bg-teal-700 hover:transition hover:ease-in-out "
        // onClick={showCreatePopup}
        >
          <div className="text-white">Create Plan</div>
        </div>
      </div>
      <div className="h-[calc(100vh-165px)] flex flex-col justify-center overflow-hidden px-2">
        <div className="w-[98%] h-[600px] overflow-hidden">
          <div className="flex items-center justify-between height-50px bg-teal-800">
            <p
              className="font-semibold text-xl"
              style={{ color: "white", paddingLeft: "3%" }}
            >
              {format(firstDayOfMonth, "MMMM yyyy")}
            </p>
            <div
              className="flex items-center justify-evenly gap-6 sm:gap-12"
              style={{ color: "white " }}
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
                className="text-black cursor-pointer rounded-full bg-white text-teal-800 margin-right-20px"
                onClick={() => setCurrMonth(format(startOfToday(), "MMM-yyyy"))}
                style={{ marginRight: "20px", width: "80px" }}
              >
                Today
              </button>
            </div>
          </div>
          <div
            className="grid grid-cols-7 gap-6 sm:gap-12 place-items-start"
          >
            {days.map((day, idx) => {
              return (
                <div key={idx} className="font-semibold text-left pl-2">
                  {/* {capitalizeFirstLetter(day)} */}
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-7 gap-6 sm:gap-12 place-items-start">
            {daysInMonth.map((day, idx) => {
              let calEvents = isDDay(day);
              let evItems = [];
              for (let ev of calEvents) {
                // Truncate the event name if it exceeds MAX_NAME_LENGTH
                const truncatedName = truncate(ev.name, { length: MAX_NAME_LENGTH });

                evItems.push(
                  <div
                    key={ev._id}
                    className={`px-2  ${ev._id ? "bg-teal-800" : ""}`}
                    style={{ color: "white", borderRadius: "3px", marginTop: "5%", minWidth: "115px" }}
                  >
                    {ev._id ? truncatedName : ""}
                  </div>
                );
              }
              return (
                <div
                  key={idx}
                  className={colStartClasses[getDay(day)] + " text-left pl-2"}
                  onClick={() => openPopup(day)}
                >
                  <p
                    className={`cursor-pointer flex items-center justify-center font-semibold h-8 w-8 rounded-full  hover:text-white ${isSameMonth(day, today) ? "text-gray-900" : "text-gray-400"
                      } ${!isToday(day) && "hover:bg-teal-800"} ${isToday(day) && "bg-neutral-300 text-black"
                      }`}
                  >
                    {format(day, "d")}
                  </p>
                  {evItems}
                </div>
              );
            })}
          </div>
        </div>
        {popupVisible && (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-lg font-semibold">
                {format(selectedDay ?? new Date(), "MMMM d, yyyy")}
              </h2>
              {/* Display the selected data within the popup */}
              {selectedData.map((item) => (
                <div key={item._id}>
                  <p>Project ID: {item.project_id}</p>
                  <p>Name: {item.name}</p>
                  <p>Description: {item.desc}</p>
                  <p>Progress: {item.progress}</p>
                  <p>Start Date: {format(item.startDate, "MMMM d, yyyy")}</p>
                  <p>End Date: {format(item.endDate, "MMMM d, yyyy")}</p>
                </div>
              ))}
              {/* wait */}
              <button
                className="mt-2 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PageCalendar;