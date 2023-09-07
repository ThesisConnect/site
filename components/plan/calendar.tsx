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
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useState } from "react";

interface DatePickerProps {
  DateSelect?: Date;
  updateDate: (DateSelect: Date) => void;
}

const CalendarPick:React.FC<DatePickerProps> = ({DateSelect, updateDate}) => {
  const today = startOfToday();
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
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

  return (
    <div className="p-1 flex items-center justify-center">
      <div className="w-full h-auto">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm">
            {format(firstDayOfMonth, "MMMM yyyy")}
          </p>
          <div className="flex items-center justify-evenly gap-1 sm:gap-2">
            <GrFormPrevious
              className="w-6 h-6 cursor-pointer"
              onClick={getPrevMonth}
            />
            <GrFormNext
              className="w-6 h-6 cursor-pointer"
              onClick={getNextMonth}
            />
          </div>
        </div>
        <hr className="m-2" />
        <div className="grid grid-cols-7 gap-1 sm:gap-7 place-items-center">
          {days.map((day, idx) => {
            return (
              <div key={idx} className="font-semibold">
                {day}
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-7 gap-1 sm:gap-7 mt-2 place-items-center">
          {daysInMonth.map((day, idx) => {
            return (
              <div key={idx} className={colStartClasses[getDay(day)]} onClick={() => updateDate(day)} >
                <p
                  className={`cursor-pointer flex items-center justify-center hover:bg-neutral-100 font-semibold h-8 w-8 rounded-full ${isSameMonth(day, today) ? "text-gray-900" : "text-gray-400"
                    } ${!DateSelect && "hover:bg-neutral-100"} ${day.toDateString()===DateSelect?.toDateString() && "bg-teal-800 text-neutral-100"
                    }`}
                >
                  {format(day, "d")}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CalendarPick;