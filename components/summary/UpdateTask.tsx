"use client";

import { BsFillChatDotsFill } from "react-icons/bs";
import FileSummary from "./File";
import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import axiosBaseurl from '@/config/baseUrl';
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from '@firebase/storage';
import { v4 as uuid4 } from 'uuid';
import useAuth from "@/hook/useAuth";
import { getAuth } from "firebase/auth";
import SummaryPopup from "./SummaryPopup";


interface DataSummary {
  project_id: string
  plan_name: string
  reciever_id: string
  sender_id: string
  comment: string
  progress: number
  files: string[]
  chat_id: string
  createdAt: string
}

interface DataModelInterface {
  _id: string;
  name: string;
};

const UpdateTask: React.FC<DataSummary> = (
  {
    project_id,
    plan_name,
    reciever_id,
    sender_id,
    comment,
    progress,
    files,
    chat_id,
    createdAt
  }) => {

  const [Taskname, setTask] = useState([]);
  const [sender, setSender] = useState<string>("");
  const [opensummary, setopenSummary] = useState<boolean>(false);

  console.log(createdAt)
  const C_Date = createdAt.toString().slice(0, 10).split("-")
  const CreateDate = C_Date[2] + "/" + C_Date[1] + "/" + C_Date[0]
  const CreateTime = new Date(createdAt.toString()).getHours() + ":" + ("0" + new Date(createdAt.toString()).getMinutes()).slice(-2)
  const [state, setState] = React.useState<boolean>(false);

  function showSummaryPopup() {
    setState(!state)
  }

  return (
    <div
      className="relative flex flex-col items-center rounded-lg 
        bg-white border border-neutral-800 w-[700px] h-[160px] justify-evenly overflow-hidden "
    >
      {state && <SummaryPopup show={state} onClose={showSummaryPopup} plan_name={plan_name} 
      comment={comment} progress={progress} />}
      <div className="w-full h-full cursor-pointer hover:bg-neutral-100 hover:transition hover:ease-in-out p-6" onClick={showSummaryPopup}>
        <div className="w-full h-full " >
          <div className="w-full h-full grid grid-cols-7 gap-1 ">
            <div className="col-span-2 flex items-center w-full">
              <div className="">
                <div className="flex gap-1" >
                  <div className="font-semibold">
                    Date :
                  </div>
                  <div className="font-medium">
                    {CreateDate}
                  </div>
                </div>
                <div>Time : {CreateTime}</div>
                <div className="w-full h-[60px] py-2 flex space-x-2 items-center">
                  <div className="w-[40px] h-[40px] bg-neutral-200 rounded-full">
                    <Profile
                      user={{}}
                      key={uuid4()}
                      className="border border-neutral-300"
                      width="41" />
                  </div>
                  <div className="grid grid-cols-7 items-center">
                    <div className="col-span-5 w-[30px] h-[2px] bg-teal-800"></div>
                    <div className="col-span-2 w-[10px] h-[10px] bg-teal-800 rounded-full"></div>
                  </div>
                  <div className="w-[40px] h-[40px] bg-neutral-200 rounded-full">
                    <Profile
                      user={{}}
                      key={uuid4()}
                      className="border border-neutral-300"
                      width="41" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-5 flex space-x-4" onClick={showSummaryPopup}>
              <div className="h-[100%] w-[0.5px] bg-teal-800"></div>
              <div className="w-[90%] overflow-hidden">
                <div className="font-semibold">
                  {
                    plan_name
                  }
                </div>
                <div className="flex">
                  <div className="truncate">
                    Detail : {comment}
                  </div>
                </div>

                <div className="h-[30%] w-full flex items-center gap-2">
                  <div className="w-[85%] rounded-lg h-2 bg-neutral-400">
                    <div
                      className={`bg-teal-800 h-2 rounded-full`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="">{progress} %</div>
                </div>
                <div className="h-[100%]">
                  <div className=" flex items-center gap-2 line-clamp-1 snap-x overflow-scrolled scroll-smooth">
                    <FileSummary files={files} />
                  </div>
                </div>
              </div>
              <BsFillChatDotsFill className="text-3xl text-teal-800 hover:text-neutral-400 duration-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateTask;
