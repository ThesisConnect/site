"use client";

import { MdArrowBackIosNew } from "react-icons/md";
import UpdateTask from "@/components/summary/UpdateTask";
import Sidebar from "@/components/Sidebar";
import userStore from "@/stores/User";
import axiosBaseurl from '@/config/baseUrl';
import { useEffect, useState } from "react";
import { uniqueId } from "lodash";
import { v4 } from "uuid";

interface DataModelInterface {
  _id: string;
  project_id: string;
  name: string;
  desc: string;
  progress: number;
  startDate: Date;
  endDate: Date;
  [x: string]: any;
};

const PageDetail = ({ params: { project: projectID } }: {
  params: {
    project: string
  }
}) => {
  console.log(projectID)

  // const [summary, setData] = useState<DataModelInterface[]>([]);



  const [summary, setSummary] = useState([])
  useEffect(() => {
    const res = axiosBaseurl.get(`page/summary/${projectID}`, {
      withCredentials: true,
    })
      .then(response => {
        console.log(res)
        setSummary(response.data);
      }).catch(err => {
        console.log(err);
      })
  }, []);

  console.log("get summary", summary)
  return (
    <div className="flex relative flex-row h-full">
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-[100%]">
          <div className="flex w-full h-[50px] p-2 items-center text-lg font-semibold">
            Project name
          </div>
          <div className="w-full h-[50px] p-2">Sort By</div>
          <div className="flex w-full h-full px-2">
            <div className="relative w-full h-full bg-neutral-100 overflow-scroll snap-y">

              <div className="absolute grid grid-cols-7 h-screen w-full">
                <div className="flex justify-center w-full ">
                  <div className="w-[3px]  bg-neutral-400 rounded-full"></div>
                </div>
              </div>

              <div className="snap-center w-full h-[30%] grid grid-cols-7 items-center">
                <div className="flex justify-center items-center h-full w-full">
                  <div className="w-[30px] h-[30px] bg-neutral-400 rounded-full"></div>
                </div>
                {summary.map(({
                  project_id,
                  plan_id,
                  reciever_id,
                  sender_id,
                  comment,
                  progress,
                  files,
                  chat_id,
                  createdAt
                }) => (
                  <UpdateTask  project_id={project_id} plan_id={"ABD"} reciever_id={reciever_id} sender_id={sender_id} comment={comment} progress={progress} files={files} chat_id={chat_id} createdAt={createdAt} key={v4()}/>
                ))}

              </div>
            </div>
          </div>
        </div>
        <div className="w-[20%] bg-neutral-100">
          <div className="grid grid-cols-1 divide-y divide-teal-800">
            <div className="flex items-center text-lg font-semibold p-2">All Files</div>
            <div className="grid grid-flow-row auto-rows-max md:auto-rows-min">

              {/* map */}
              <div className="grid grid-cols-5 gap-1 h-[35px] px-2 flex items-center">
                <div className="truncate overflow-hidden col-span-3">Filename</div>
                <div>Date</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDetail;
