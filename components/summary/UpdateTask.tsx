'use client';

import { BsFillChatDotsFill } from 'react-icons/bs';
import FileSummary from './File';
import React, { useEffect, useState } from 'react';
import Profile from './Profile';
import axiosBaseurl from '@/config/baseUrl';
import {
  TableFile,
  IUser,
  ISummary,
} from '@/app/mainPage/[project]/detail/page';
import { HiMiniEye } from 'react-icons/hi2';
import { AiFillEdit } from 'react-icons/ai';
import userStore from '@/stores/User';

import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from '@firebase/storage';
import { v4 as uuid4, v4 } from 'uuid';
import useAuth from '@/hook/useAuth';
import { getAuth } from 'firebase/auth';
import SummaryPopup from './SummaryPopup';
import DetailSummaryPopup from './DetailSummary';

interface DataSummary {
  id: string;
  project_id: string;
  plan_id: string;
  plan_name: string;
  reciever_id: IUser;
  sender_id: IUser;
  comment: string;
  progress: number;
  files: TableFile[];
  chat_id: string;
  updateAt: string;
  status: string;
  onSuccess: () => void;
}

interface DataModelInterface {
  _id: string;
  name: string;
}

const UpdateTask: React.FC<DataSummary> = ({
  id,
  project_id,
  plan_id,
  plan_name,
  reciever_id,
  sender_id,
  comment,
  progress,
  files,
  chat_id,
  updateAt,
  status,
  onSuccess,
}) => {
  const user = userStore((state) => state.user);
  const [Taskname, setTask] = useState([]);
  const [sender, setSender] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);

  console.log('UpdateAt', updateAt);
  const C_Date = updateAt.toString().slice(0, 10).split('-');
  const CreateDate = C_Date[2] + '/' + C_Date[1] + '/' + C_Date[0];
  const CreateTime =
    new Date(updateAt.toString()).getHours() +
    ':' +
    ('0' + new Date(updateAt.toString()).getMinutes()).slice(-2);
  const [checkstate, setcheckState] = React.useState<boolean>(false);
  const [detailstate, setdetailcheckState] = React.useState<boolean>(false);

  const showCheckSummaryPopup = () => {
    setcheckState(!checkstate);
  };
  const showDetailSummaryPopup = () => {
    setdetailcheckState(!detailstate);
  };

  return (
    <div
      className="relative flex flex-col items-center
        bg-white border border-neutral-200 w-[101%] h-[75px] justify-evenly overflow-hidden "
    >
      {checkstate && (
        <SummaryPopup
          key={v4()}
          show={checkstate}
          onClose={showCheckSummaryPopup}
          onSuccess={onSuccess}
          id={id}
          project_id={project_id}
          plan_id={plan_id}
          plan_name={plan_name}
          reciever_id={reciever_id}
          sender_id={sender_id}
          comment={comment}
          progress={progress}
          chat_id={chat_id}
          files={files}
        />
      )}
      {detailstate && (
        <DetailSummaryPopup
          key={v4()}
          id={id}
          show={detailstate}
          onClose={showDetailSummaryPopup}
          project_id={project_id}
          plan_id={plan_id}
          plan_name={plan_name}
          reciever_id={reciever_id}
          sender_id={sender_id}
          comment={comment}
          progress={progress}
          status={status}
          chat_id={chat_id}
          date={new Date(updateAt)
            .toUTCString()
            .split(' ')
            .slice(0, 4)
            .join(' ')}
          time={CreateTime}
          files={files}
        />
      )}
      <div className="w-full h-full cursor-default">
        {/* <div className="w-full h-full cursor-pointer " onClick={showSummaryPopup}> */}
        <div className="grid grid-cols-8 gap-2 h-full justify-items-center items-center w-full bg-neutral-100 ">
          <div className="col-span-2 truncate">{plan_name}</div>
          <div>
            {new Date(updateAt).toUTCString().split(' ').slice(0, 4).join(' ')}
          </div>
          <div>{CreateTime}</div>
          <div className="col-span-2 flex-col justify-center items-center w-full">
            <div className="w-full flex items-center">
              <div className="w-[100%] rounded-lg h-2 bg-neutral-400">
                <div
                  className={`bg-teal-800 h-2 rounded-full`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="">progress</div>
              <div className="">{progress} %</div>
            </div>
          </div>
          <div>
            {status === 'pending' && (
              <div className="flex font-bold rounded-full items-center text-[12px] text-yellow-700 py-0 px-3 border border-yellow-700 bg-yellow-100">
                {status.toUpperCase()}
              </div>
            )}
            {status === 'reject' && (
              <div className="flex font-bold rounded-full items-center text-[12px] text-red-700 py-0 px-3 border border-red-700 bg-red-100">
                {status.toUpperCase()}
              </div>
            )}
            {status === 'approve' && (
              <div className="flex font-bold rounded-full items-center text-[12px] text-sky-700 py-0 px-3 border border-sky-700 bg-sky-100">
                {status.toUpperCase()}
              </div>
            )}
            {status === 'complete' && (
              <div className="flex font-bold rounded-full items-center text-[12px] text-teal-700 py-0 px-3 border border-teal-700 bg-teal-100">
                {status.toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className="w-[35px] h-[35px] flex items-center justify-center rounded-full hover:bg-neutral-300"
              onClick={showDetailSummaryPopup}
            >
              <HiMiniEye className="text-2xl text-teal-800" />
            </button>
            {status === 'pending' && user.role === 'advisor' && (
              <button
                className="w-[35px] h-[35px] flex items-center justify-center rounded-full hover:bg-neutral-300 hover:transition hover:ease-in-out"
                onClick={showCheckSummaryPopup}
              >
                <AiFillEdit className="text-2xl text-teal-800" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateTask;
