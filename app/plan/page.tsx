'use client';

import Sidebar from "@/components/Sidebar";
import Button from "@/components/plan/Button";
import Modal from "@/components/plan/CreatePlanPopup";
import PlanCard from "@/components/plan/PlanCard";
import axios from "axios";
import axiosBaseurl from '@/config/baseUrl';
import React, { useCallback, useRef, useState, MouseEvent, useEffect } from 'react';



const Plan = () => {

  const project_id = "OU3mOuC6dxg1nPtQKq74Ca9H8hx1";
  const [state, setState] = React.useState<boolean>(false);

  function showCreatePopup() {
    setState(!state)
  }

  // const res = axiosBaseurl.get(`/plan/${project_id}`, {
  //   withCredentials: true,
  // })
  // .then(response => {
  //   console.log(response);
  // }).catch(err => {
  //   console.log(err);
  // })


  const GetPlan = async () => {
    console.log('Get plan');
    try {
      const res = await axiosBaseurl.get(`/plan/${project_id}`, {
        withCredentials: true,
      });
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    GetPlan();
  }, [])

  
  const Fakeplan = [{
      "_id": "aef27580-b6c8-4697-ba10-995f2e85e7d3",
      "project_id": "55e99b38-b79e-4f18-803b-91329049188f",
      "name": "Delta",
      "description": "Delta is cute",
      "progress": 12,
      "start_date": {
        "$date": "2023-09-08T17:00:00.000Z"
      },
      "end_date": {
        "$date": "2023-12-08T17:00:00.000Z"
      },
      "task": true,
      "chat_id": "3b461862-c0a3-41ea-b182-8c56455e7bba",
      "folder_id": "9fd6f6d6-4cbe-4c16-afdb-303623105788",
      "__v": 0
  }]

  return (
    <div className="flex relative flex-row  overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full h-full overflow-hidden">
        <div className="flex w-full h-[50px] p-2 items-center text-lg font-semibold">
          Project name
        </div>
        <div className="flex w-full items-center h-[50px] px-2">
          <Button
            type="submit"
            className="hover:bg-teal-700 hover:transition hover:ease-in-out "
            onClick={showCreatePopup}
          >
            <div className="text-white">Create Plan</div>
          </Button>
        </div>
        <div className="relative h-full w-full overflow-hidden ">
          <div className="flex w-full p-2 h-[calc(100vh-165px)]">
            <div className="w-full h-full overflow-scroll scroll-x-none">
              <div className="grid relative lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 w-full gap-4 ">
                {Fakeplan.map((data) => 
                  <PlanCard id={data._id} name={data.name} description={data.description} start_date={data.start_date.$date} end_date={data.end_date.$date} progress={data.progress} task={data.task} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={state} onClose={showCreatePopup} />
      
    </div>
  )
};

export default Plan;
