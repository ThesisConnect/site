'use client';
import fileStore from '@/stores/Files';
import useProjectStore from '@/stores/Project';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { useStore } from 'zustand';

const FolderPathInput = () => {
  const param = useParams();
  const getPathName = fileStore((state) => state.getPathName);
  const pathFromId = useMemo(() => {
    if (!param.folderID) return '';
    return getPathName(param.folderID as string[]);
  }, [param.folderID, getPathName]);
  const currentProject = useProjectStore((state) => state.currentProject);
  return (
    <input
      type="text"
      readOnly
      value={` > ${currentProject?.name} ${
        pathFromId ? '>' : ''
      } ${pathFromId?.replace(/\//g, ' > ')}`}
      className="bg-neutral-100 w-[40%] h-[27px] text-sm rounded-sm focus:bg-white ms-4
       text-neutral-400 focus:outline-none overflow-y-scroll ps-2"
    />
  );
};

export default FolderPathInput;
