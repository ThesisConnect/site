'use client';
import SortBy from '@/components/files/SortBy';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import FolderPathInput from '../../../../components/files/FolderPathInput';
import { useParams } from 'next/navigation';
import {ChangeEvent, MouseEvent, useCallback, useEffect, useRef, useState} from 'react';
import { deleteFile, handleFile } from '@/utils/managefile';
import dynamic from 'next/dynamic';
import LoadingNormal from '@/components/loading/LoadingNormal';
import useProjectStore from '@/stores/Project';
import { useRouter } from 'next/navigation';
import fileStore from '@/stores/Files';
import { mutate } from 'swr';
import axiosBaseurl from '@/config/baseUrl';
import CreateFolder from '@/components/files/CreateFolder';
import {effect} from "zod";
const FileLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const Inputfile = useRef<HTMLInputElement | null>(null);
  const route = useRouter();
  const [showCreateFolder, setShowCreateFolder] = useState<boolean>(false);
  const parentFolder = params.folderID?params.folderID[params.folderID.length - 1]:null;
  const getProjectByID = useProjectStore((state) => state.getProjectByID);
  const currentProject = getProjectByID(params.project as string);
  useEffect(() => {
    // console.log('parentFolder', parentFolder);
    setShowCreateFolder(false)
  }, [parentFolder]);
  
  const { currentFolder } = fileStore((state) => ({
    currentFolder: state.getCurrentFolder,
  }));

  const handleClickFile = useCallback(() => {
    Inputfile.current?.click();
  }, []);
  
  const handleChooseFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.currentTarget.files;
      if (!files) return;
      //console.log(files);
      let newFiles = [];
      newFiles = await Promise.all(
        Array.from(files).map((file) =>
          handleFile(file, params.folderID[params.folderID.length - 1])
        )
      );
      newFiles = newFiles.map((file) => {
        return {
          _id: file._id,
          name: file.name,
          size: file.size,
          file_type: file.file_type,
          type: file.type,
          url: file.link,
          memo: file.memo,
        };
      });
      try {
        await axiosBaseurl.post('file/create/', {
          folder_id: params.folderID[params.folderID.length - 1],
          files: newFiles,
        });
      } catch (error) {
        console.log(error);
        for (const file of newFiles) {
          await deleteFile(file.name, file._id);
        }
      }
      mutate(`/folder/${params.folderID[params.folderID.length - 1]}`);
      // You can do something with the file, like uploading it to the server

      //post data to server
      //code here
    },

    [params.folderID]
  );
  const CheckCanCreateFolder = useCallback(() => {
    const baseFolder = currentFolder(params.folderID?.[0]);
    if (baseFolder?.name === 'Private') {
      return true;
    } else if (
      baseFolder?.name === 'All task' &&
      params.folderID?.length >= 2
    ) {
      return true;
    } else if (baseFolder?.name === 'General') return true;
    else if (baseFolder?.name === 'Literature review') return true;
    return false;
  }, [currentFolder, params.folderID]);
  
  return (
    <div className="mx-10 h-full flex flex-col ">
      <div className="h-32 flex flex-col justify-evenly  ">
        <div className="text-[20px] font-semibold">
          Project: {currentProject?.name}
        </div>
        <div className="flex justify-end">
          {CheckCanCreateFolder() && (
            <div>
              <button
                className="bg-teal-800 w-32 h-10
               text-white rounded-full me-4"
                onClick={() => {
                  setShowCreateFolder(true);
                }}
              >
                Create Folder
              </button>

              <button
                className="bg-neutral-200 w-32 h-10  rounded-full"
                onClick={handleClickFile}
              >
                import file
              </button>
              <input
                ref={Inputfile}
                type="file"
                id="file-input"
                style={{ display: 'none' }}
                multiple
                // {...({ webkitdirectory: 'true' } as React.HTMLAttributes<HTMLInputElement>)} // Remove this attribute if folder selection is not needed
                onChange={handleChooseFile}
              />
            </div>
          )}
          <div className="flex-grow" />
          <SortBy />
        </div>
      </div>
      <div className="h-12 bg-teal-800 rounded-t-sm flex items-center">
        <div className="flex gap-x-3 ms-3">
          <IoChevronBackOutline
            className="text-neutral-300 cursor-pointer"
            size={30}
            onClick={() => {
              if (params.folderID) return route.back();
            }}
          />
          <IoChevronForwardOutline
            className="text-neutral-300 cursor-pointer"
            size={30}
            onClick={() => route.forward()}
          />
        </div>
        <FolderPathInput />
      </div>
      <div className="h-[42px] bg-neutral-200 flex ">
        <span className="w-1/5 flex justify-center items-center">Name</span>
        <span className="w-1/5 flex justify-center items-center">
          Data modified
        </span>
        <span className="w-1/5 flex justify-center items-center">
          Share with
        </span>
        <span className="w-1/5 flex justify-center items-center">Type</span>
        <span className="w-1/5 flex justify-center items-center">size</span>
      </div>
      <div className="h-full bg-neutral-100 ">
        {showCreateFolder && (
          <div className="my-4">
            <CreateFolder
              onClose={() => {
                setShowCreateFolder(false);
              }}
            />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
const PageRootFilesDynamic = dynamic(() => Promise.resolve(FileLayout), {
  ssr: false,
  loading: () => <LoadingNormal />,
});

export default PageRootFilesDynamic;
