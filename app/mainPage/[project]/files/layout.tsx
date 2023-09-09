'use client';
import SortBy from '@/components/files/SortBy';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import FolderPathInput from '../../../../components/files/FolderPathInput';
import { useParams } from 'next/navigation';
import { ChangeEvent, MouseEvent, useCallback, useRef } from 'react';
import { handleFile, handleZipFile } from '@/utils/managefile';
const FileLayout = ({
  children,
  params: { project },
}: {
  children: React.ReactNode;
  params: {
    project: string;
  };
}) => {
  const params = useParams();
  const Inputfile = useRef<HTMLInputElement | null>(null);
  const handleClickFile = useCallback(() => {
    Inputfile.current?.click();
  }, []);
  const handleChooseFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.currentTarget.files;
      if (!files) return;
      let newFiles = [];
      console.log(files);
      await Array.from(files).forEach(async (file) => {
        if (file.name.endsWith('.zip')) {
          newFiles = await handleZipFile(file, params.folderID);
        } else {
          newFiles = await Promise.all(
            Array.from(files).map((file) => handleFile(file, params.folderID))
          );
          // You can do something with the file, like uploading it to the server
        }
      });
      //post data to server
      //code here
    },

    [params.folderID]
  );
  return (
    <div className="mx-10 h-full flex flex-col ">
      {params.folderID}
      <div className="h-32 flex flex-col justify-evenly  ">
        <div className="text-[20px] font-semibold">Project: {project}</div>
        <div className="flex justify-end">
          {params.folderID?.startsWith('Private') && (
            <div>
              <button className="bg-teal-800 w-32 h-full text-white rounded-full me-4">
                Create Folder
              </button>

              <button
                className="bg-neutral-200 w-32 h-full  rounded-full"
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
          <IoChevronBackOutline className="text-neutral-300" size={30} />
          <IoChevronForwardOutline className="text-neutral-300" size={30} />
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
      <div className="h-full bg-neutral-100 ">{children}</div>
    </div>
  );
};

export default FileLayout;
