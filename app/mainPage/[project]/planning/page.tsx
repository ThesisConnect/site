'use client';

import Sidebar from "@/components/Sidebar";
import Button from "@/components/plan/Button";
import CreatePopup from "@/components/plan/CreatePlanPopup";
import PlanCard from "@/components/plan/PlanCard";
import axios from "axios";
import axiosBaseurl from '@/config/baseUrl';
import React, { useCallback, useRef, useState, MouseEvent, useEffect } from 'react';



const PagePlanning = ({params:{project:projectID}}:{
  params:{
    project:string
  }
}) => {
  const [Plans, setPlans] = useState([])
  // const project_id = "55e99b38-b79e-4f18-803b-91329049188f";
  const [state, setState] = React.useState<boolean>(false);
  const [create,setCreate] = React.useState<boolean>(false);

  function showCreatePopup() {
    setState(!state)
  }
  const handleCancel =()=>{
    setState(!state)
  }
  const handleOnSuccess =()=>{
    console.log(create);
    setState(false)
    setCreate(true)
  }

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

  return (
    <div className="flex relative flex-row h-full  overflow-hidden">
      <div className="flex flex-col w-full h-full overflow-hidden">
        <div className="flex w-full h-[50px] p-2 p-b-0 items-center text-lg font-semibold">
          Project name
        </div>
        <div className="px-2 flex w-full items-center h-[50px]">
          <Button
            type="submit"
            className="hover:bg-teal-700 hover:transition hover:ease-in-out "
            onClick={showCreatePopup}
          >
            <div className="text-white">Create Plan</div>
          </Button>
        </div>
        <div className="relative h-full w-full overflow-hidden ">
          <div className="flex w-full p-2 h-full">
            <div className="w-full h-full overflow-scroll scroll-x-none">
              <div className="grid relative lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 w-full gap-4 ">
                {Plans.map(({_id, name, description, start_date, end_date, progress, task}) => 
                  <PlanCard id={_id} name={name} description={description} start_date={start_date} end_date={end_date} progress={progress} task={task} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreatePopup show={state} onClose={handleCancel} projectID={projectID} onSucces={handleOnSuccess}/>
    </div>
  )
};

export default PagePlanning;
