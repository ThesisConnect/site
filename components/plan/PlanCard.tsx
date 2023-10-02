import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineMore, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import DetailPopup from './PlanDetailPopup';
import { CgDetailsMore } from 'react-icons/cg';
import EditPopup from './PlanEditPopup';
import DeletePopup from './DeletePopup';
import { v4 } from 'uuid';
import userStore from '@/stores/User';
import { motion } from 'framer-motion';

interface DataPlan {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  progress: number;
  task: boolean;
  projectID: string | undefined;
  onSucces: () => void;
}

const PlanCard: React.FC<DataPlan> = ({
  id,
  name,
  description,
  start_date,
  end_date,
  progress,
  task,
  projectID,
  onSucces,
}) => {
  const user = userStore((state) => state.user);
  const Start = start_date.slice(0, 10).split('-');
  const StartDate = Start[2] + '/' + Start[1] + '/' + Start[0];
  const End = end_date.slice(0, 10).split('-');
  const EndDate = End[2] + '/' + End[1] + '/' + End[0];

  function getDayDiff(): number {
    const now = new Date();
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const duration = new Date(end_date).getTime() - now.getTime(); // Difference in milliseconds
    const days = Math.floor(duration / millisecondsPerDay);
    return days + 1;
  }

  const [select, setSelect] = useState<boolean>(false);
  function showEdit() {
    setSelect(!select);
    setState(false);
    return select;
  }

  const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
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

  const ref = useOutsideClick(() => {
    setSelect(!select);
  });

  const [state, setState] = React.useState<boolean>(false);
  const [edit, setEdit] = React.useState<boolean>(false);
  const [Delete, setDelete] = React.useState<boolean>(false);

  const showPlanDetail = () => {
    setState(!state);
  };

  const showPlanEdit = () => {
    setEdit(!edit);
    setSelect(false);
  };

  const showDeletePlan = () => {
    setDelete(!Delete);
    setSelect(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex w-full aspect-square bg-neutral-100 py-5 px-4 rounded-lg overflow-hidden"
    >
      <DetailPopup
        show={state}
        id={id}
        name={name}
        description={description}
        start_date={StartDate}
        end_date={EndDate}
        progress={progress}
        task={task}
        duration={getDayDiff()}
        onClose={showPlanDetail}
      />
      <EditPopup
        show={edit}
        id={id}
        name={name}
        description={description}
        start_date={start_date}
        end_date={end_date}
        progress={progress}
        task={task}
        duration={getDayDiff()}
        onClose={showPlanEdit}
        onSucces={onSucces}
      />
      <DeletePopup
        show={Delete}
        onClose={showDeletePlan}
        name={name}
        id={id}
        onSuccess={onSucces}
      />
      <div className="relative w-full">
        {select && user.role === 'advisee' && (
          <div
            ref={ref}
            className="z-10 right-[10px] top-[40px] absolute w-[120px] rounded-[3px] h-auto bg-white divide-y drop-shadow-lg"
          >
            <button
              className="flex items-center w-full h-full hover:bg-neutral-100 p-2 gap-2"
              onClick={showPlanEdit}
            >
              <AiOutlineEdit className="text-xl" />
              Edit
            </button>
            <button
              className="flex items-center w-full h-full hover:bg-neutral-100 p-2 gap-2 text-red-500"
              onClick={showDeletePlan}
            >
              <AiOutlineDelete className="text-xl" />
              Delete
            </button>
          </div>
        )}
        <div className="z-0 relative flex flex-col h-full w-full gap-2 ">
          <div className=" grid w-full h-full content-between">
            <div className="flex flex-row justify-between gap-2">
              <div className=" w-full grid grid-rows-2  items-center gap-2">
                <div className="row-span-1 text-base font-semibold truncate">
                  {name}
                </div>
                {task ? (
                  <div className="flex items-center">
                    <div className="flex justify-center w-[70px] rounded-full bg-neutral-200 border border-teal-800 text-teal-800 text-sm font-semibold">
                      Gantt
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="flex justify-center w-[85px] rounded-full bg-neutral-200 border border-teal-800 text-teal-800 text-sm font-semibold">
                      Not gantt
                    </div>
                  </div>
                )}
              </div>
              <div className="grid relative z-100">
                {user.role === 'advisee' && (
                  <button
                    type="button"
                    className="flex relative w-[40px] h-[40px] items-center rounded-full aspect-square hover:bg-neutral-300 hover:transition hover:ease-in-out"
                    onClick={showEdit}
                  >
                    <AiOutlineMore className="w-full text-[35px] text-neutral-400" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex h-full flex-col gap-2 text-sm">
              <div>
                Date : {StartDate} - {EndDate}
              </div>
              <div className="flex w-full h-full">
                <div className="h-[100%] w-full flex flex-col items-center">
                  <div className="w-[100%] rounded-lg h-2 bg-neutral-400">
                    <div
                      className={`bg-teal-800 h-2 rounded-full`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex flex-row w-full justify-between">
                    <div>progress</div>
                    <div>{progress} %</div>
                  </div>
                </div>
              </div>
              <div className="flex h-auto items-center justify-between md:hidden lg:flex">
                <div
                  className="flex h-[100%] rounded-full py-1.5 items-center justify-center cursor-pointer"
                  onClick={showPlanDetail}
                >
                  <CgDetailsMore className="text-[30px]  text-neutral-400  hover:text-neutral-300 hover:transition hover:ease-in-out" />
                </div>
                <div className="flex w-auto min-w-[40%] h-[80%] rounded-full px-4 bg-teal-800 items-center justify-center ">
                  <div className="text-white text-sm">
                    {getDayDiff() > 1 ? Math.abs(getDayDiff()) + " Days" : ''}
                    {getDayDiff() >= 0 && getDayDiff() <= 1 ? Math.abs(getDayDiff()) + " Day" : ''}
                    {/* {Math.abs(getDayDiff()) > 1 && getDayDiff() >= 0 ? ' days' : ' day'} */}
                    {getDayDiff() >= 0 ? ' Left' : ' Past Due'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default PlanCard;
