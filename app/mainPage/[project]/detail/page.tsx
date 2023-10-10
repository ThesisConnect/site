'use client';

import { MdArrowBackIosNew } from 'react-icons/md';
import UpdateTask from '@/components/summary/UpdateTask';
import Sidebar from '@/components/Sidebar';
import userStore from '@/stores/User';
import axiosBaseurl from '@/config/baseUrl';
import React, { useEffect, useRef, useState } from 'react';
import DropdownSummary from '@/components/summary/SortBy';
import { v4 } from 'uuid';
import '@/components/summary/Scrollbar.css';

interface IPlan {
  _id: string;
  project_id: string;
  name: string;
  description: string;
  progress: number;
  start_date: Date;
  end_date: Date;
  task: boolean;
  chat_id?: string;
  folder_id?: string;
  archived: boolean;
}

export interface IUser {
  avatar: string | undefined;
  email: string;
  name: string;
  surname: string;
  userName: string;
  role: string;
  _id: string;
}

export interface TableFile {
  name: string;
  url: string;
  path: string;
  _id: string;
  size: number;
  file_type: string;
}

export interface ISummary {
  _id: string;
  project_id: string;
  plan_id: IPlan;
  reciever_id: IUser;
  sender_id: IUser;
  comment: string;
  progress: number;
  files: TableFile[];
  chat_id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  [x: string]: any;
}

const PageDetail = ({
  params: { project: projectID },
}: {
  params: {
    project: string;
  };
}) => {
  const user = userStore((state) => state.user);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth', // Optional: Add smooth scrolling animation
    });
  }

  const [summary, setSummary] = useState<ISummary[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>(
    user.role === 'advisor' ? 'pending' : 'all'
  );
  const [sortsummary, setSortSummary] = useState<ISummary[]>([]);
  const [checkstate, setcheckState] = React.useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const projectRes = await axiosBaseurl.get(`/project/${projectID}`, {
          withCredentials: true,
        });
        if (projectRes?.data?.name) {
          setProjectName(projectRes.data.name);
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    })();
  }, [projectID]);

  useEffect(() => {
    const res = axiosBaseurl
      .get(`page/summary/${projectID}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('response', response.data);
        setSummary(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [projectID, checkstate]);

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
  };
  const handleOnSuccess = () => {
    setcheckState(!checkstate);
  };

  return (
    <div className="flex relative flex-row h-full">
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-[100%]">
          <div className="flex w-full h-[50px] p-2 items-center text-lg font-semibold">
            {projectName}
          </div>
          <div className="w-full p-2">
            <DropdownSummary
              pageType={selectedValue}
              setPage={handleValueChange}
            />
          </div>
          <div className="flex w-full h-[calc(100vh-175px)] px-2 overflow-hidden">
            <div className="relative w-full bg-neutral-100 ">
              <div className="grid grid-cols-8 gap-1 justify-items-center items-center w-full h-[50px] rounded-t-md font-semibold bg-teal-800 text-white">
                <div className="col-span-2">Task name</div>
                <div>Date</div>
                <div>Time</div>
                <div className="col-span-2">Progress</div>
                <div>Status</div>
                <div>Action</div>
              </div>
              <div className="h-[calc(100vh-225px)] w-full custom-scrollbar scroll-smooth focus:scroll-auto">
                {summary
                  .filter((obj) =>
                    selectedValue !== 'all' ? obj.status === selectedValue : obj
                  )
                  .sort(
                    (a, b) =>
                      new Date(a.updatedAt).getTime() -
                      new Date(b.updatedAt).getTime()
                  )
                  .map((obj) => (
                    <UpdateTask
                      id={obj._id}
                      project_id={projectID}
                      plan_name={obj.plan_id.name}
                      plan_id={obj.plan_id._id}
                      reciever_id={obj.reciever_id}
                      sender_id={obj.sender_id}
                      comment={obj.comment}
                      progress={obj.progress}
                      files={obj.files}
                      chat_id={obj.chat_id}
                      status={obj.status}
                      updateAt={obj.updatedAt}
                      onSuccess={handleOnSuccess}
                      key={v4()}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDetail;
