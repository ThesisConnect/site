import { FC, useEffect, useRef, useState } from 'react';
import fileStore, { Folder, File } from '../../stores/Files';
import { v4 } from 'uuid';
import { BsFileText } from 'react-icons/bs';
import { DateTime } from 'luxon';
import bytes from 'bytes';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { IoMdMore } from 'react-icons/io';
import DeleteFileAndFolderPopup from './DeteleFileAndFolder';
import FileMemo from './FileMemo';

interface DisplayFile {
  file: File;
  onClick?: (url: string, fileType: string) => void;
}
export const DisplayFile: FC<DisplayFile> = ({ file, onClick }) => {
  const date = DateTime.fromISO(file.lastModified).toLocaleString(
    DateTime.DATETIME_SHORT
  );
  const handleClick = (url: string, fileType: string) => {
    // console.log(url,fileType)
    if (!onClick) return;
    onClick(url, fileType);
  };
  const [select, setSelect] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [Delete, setDelete] = useState<boolean>(false);
  // const [state, setState] = useState<boolean>(false);
  const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [callback]);
    return ref;
  };
  function showPlanEdit() {
    setEdit(!edit);
    setSelect(false);
  }
  function showDeletePlan() {
    setDelete(!Delete);
    setSelect(false);
  }
  const ref = useOutsideClick(() => {
    setSelect(!select);
  });
  function showEdit() {
    setSelect(!select);
    return select;
  }
  return (
    <div className="h-10 flex">
      {Delete && (
        <DeleteFileAndFolderPopup
          deleteType="file"
          show={Delete}
          dataFileOrFolder={file}
          onClose={showDeletePlan}
        />
      )}
      {edit && <FileMemo show={edit} file={file} onClose={showPlanEdit} />}
      <div className="w-1/5 flex   items-center">
        <div className="w-2/5 flex justify-end me-4  ">
          <BsFileText
            className="cursor-pointer text-neutral-500"
            onClick={() => handleClick(file.link, file.file_type)}
            size={30}
          />
        </div>
        <div className="cursor-pointer w-3/5   truncate">
          {/* {JSON.stringify(file)} */}
          {file?.name}
        </div>
      </div>
      <div className="w-1/5 flex justify-center items-center">{date}</div>
      <div className="w-1/5 flex justify-center items-center"></div>
      <div className="w-1/5 flex justify-center items-center">
        {file?.file_type}
      </div>
      <div className="w-1/5 items-center grid grid-cols-3  relative">
        <div />
        {select && (
          <div
            ref={ref}
            className="z-10 right-[10px] top-[40px] absolute w-[120px] rounded-[3px] h-auto bg-white divide-y drop-shadow-lg"
          >
            <button
              className="flex items-center w-full h-full hover:bg-neutral-100 p-2 gap-2"
              onClick={showPlanEdit}
            >
              <AiOutlineEdit className="text-xl" />
              Edit
            </button>
            <button
              className="flex items-center w-full h-full hover:bg-neutral-100 p-2 gap-2 text-red-500"
              onClick={showDeletePlan}
            >
              <AiOutlineDelete className="text-xl" />
              Delete
            </button>
          </div>
        )}
        <div className="justify-self-center ">
          {file?.size && bytes(file.size)}
        </div>
        <IoMdMore
          size={30}
          className="text-neutral-400 cursor-pointer me-2  justify-self-end "
          onClick={showEdit}
        />
      </div>
    </div>
  );
};

export default DisplayFile;
