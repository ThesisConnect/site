'use client';
import axiosBaseurl from '@/config/baseUrl';

import { DateTime } from 'luxon';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import LoadingNormal from '../loading/LoadingNormal';
import { File } from '@/stores/Files';
import Tooltip from '@mui/material/Tooltip';
import { handleFilePreview } from '@/utils/PreviewFile';
import { motion } from 'framer-motion';
const FecherChatFile = async (url: string) => {
  const res = await axiosBaseurl.get(url);
  return res.data;
};
const DisplayFileChat = () => {
  const searchParams = useSearchParams();
  const { data, error, isLoading } = useSWR<File[], Error>(
    `/file/chat/${searchParams.get('chatID')}`,
    FecherChatFile
  );
  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="w-full h-full gap-2  flex items-center justify-center ">
        <div className="rounded-full border-solid animate-spin border-teal-300 w-8 h-8 border-t-2" />
        <div>loading...</div>
      </div>
    );
  console.log(data);
  return (
    <div className="w-full flex flex-col">
      {data?.filter(Boolean).map((file) => {
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex"
            key={file._id}
          >
            <Tooltip
              title={
                <div className="flex flex-col">
                  <button
                    className="px-2 py-1 bg-teal-600
                  ease-in-out duration-150 hover:scale-[102%] transform
                  text-white rounded my-1"
                    onClick={() => handleFilePreview(file.link, file.file_type)}
                  >
                    Download Click
                  </button>
                  <div className="text-sm">name: {file?.name}</div>
                  <div className="text-xs">memo: {file?.memo}</div>
                </div>
              }
              placement="left"
              arrow
            >
              <div
                className="mt-1 ps-4 truncate w-3/5 cursor-pointer"
                onClick={() => handleFilePreview(file.link, file.file_type)}
              >
                {file?.name}
              </div>
            </Tooltip>
            <div className="ps-3">
              {DateTime.fromISO(file?.lastModified).toFormat('dd/MM/yyyy')}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DisplayFileChat;
