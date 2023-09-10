'use client';

import Sidebar from "@/components/Sidebar";
import Button from "@/components/plan/Button";
import CreatePopup from "@/components/plan/CreatePlanPopup";
import PlanCard from "@/components/plan/PlanCard";
import axios from "axios";
import axiosBaseurl from '@/config/baseUrl';
import React, { useCallback, useRef, useState, MouseEvent, useEffect, ChangeEvent } from 'react';
import SortByPlan from "@/components/plan/SortBy";



const PagePlanning = ({ params: { project: projectID } }: {
  params: {
    project: string
  }
}) => {
  const [Plans, setPlans] = useState([])
  const [searchplans, setSearchPlans] = useState(Plans)
  const [state, setState] = React.useState<boolean>(false);
  const [create, setCreate] = React.useState<boolean>(false);

  function showCreatePopup() {
    setState(!state)
  }
  const handleCancel = () => {
    setState(!state)
  }
  const handleOnSuccess = () => {
    console.log(create);
    setState(false)
    setCreate(!create)
  }
  // console.log(Plans)

  useEffect(() => {
    console.log(create);
    const res = axiosBaseurl.get(`page/plan/${projectID}`, {
      withCredentials: true,
    })
      .then(response => {
        setPlans(response.data);
      }).catch(err => {
        console.log(err);
      })

  }, [create]);

  // function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
  //   console.log(event.target.value)
  //   console.log(Plans)
  //   setSearchPlans(Plans.filter((obj) => {
  //     console.log("obj", obj.name.toLowerCase() === event.target.value.toLowerCase())
  //   }))
  // }
  console.log(searchplans)
  function getDayDiff(StartPlan: string, EndPlan: string): number {
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.round(
      Math.abs(+(new Date(StartPlan)) - +(new Date(EndPlan))) / msInDay
    );
  }

  const SortPlan = Plans.sort((p1, p2) => ((getDayDiff(p1["start_date"], p1["end_date"]) > getDayDiff(p2["start_date"], p2["end_date"]))) ? 1 : (getDayDiff(p1["start_date"], p1["end_date"]) < getDayDiff(p2["start_date"], p2["end_date"])) ? -1 : 0)

  return (
    <div className="flex relative flex-row h-full  overflow-hidden">
      <div className="flex flex-col w-full h-full overflow-hidden">
        <div className="flex w-full h-[50px] p-2 p-b-0 items-center text-lg font-semibold">
          Project name
        </div>
        <div className="px-2 flex w-full justify-between items-center h-[50px]">
          <Button
            type="submit"
            className="hover:bg-teal-700 hover:transition hover:ease-in-out "
            onClick={showCreatePopup}
          >
            <div className="text-white">Create Plan</div>
          </Button>
          <div className="flex gap-2 items-center">
            <SortByPlan />

            <input
              className={"rounded-full border focus:border-teal-800 border-solid border-neutral-300 w-80 py-2 px-3 text-base"}
              placeholder="Search"
              // onChange={handleQueryChange}
            />

          </div>

        </div>
        <div className="relative h-full w-full overflow-hidden ">
          <div className="flex w-full p-2 h-full">
            <div className="w-full h-full overflow-scroll scroll-x-none">
              <div className="grid relative lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 w-full gap-4 ">
                {SortPlan.map(({ _id, name, description, start_date, end_date, progress, task }) =>
                  <PlanCard projectID={projectID} id={_id} name={name} description={description} start_date={start_date} end_date={end_date} progress={progress} task={task} onSucces={handleOnSuccess} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreatePopup show={state} onClose={handleCancel} projectID={projectID} onSucces={handleOnSuccess} />
    </div>
  )
};

export default PagePlanning;
