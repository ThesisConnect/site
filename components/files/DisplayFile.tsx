import { FC } from 'react';
import fileStore, { Folder, File } from '../../stores/Files';
import { v4 } from 'uuid';
import { BsFileText } from 'react-icons/bs';
import { DateTime } from 'luxon';
import bytes from 'bytes';


interface DisplayFile {
  file: File;
  onClick?: (url:string,fileType:string) => void;
}
export const DisplayFile: FC<DisplayFile> = ({file,onClick}) => {
  const date = DateTime.fromISO(file.lastModified).toLocaleString(DateTime.DATETIME_SHORT);
  const handleClick = (url:string,fileType:string) => {
    console.log(url,fileType)
    if(!onClick) return;
      onClick(url,fileType);
  }
  return (
    <div className="h-10 flex">
    <div className="w-1/5 flex   items-center">
      <div className="w-2/5 flex justify-end me-4  ">
        <BsFileText className="cursor-pointer text-neutral-500" onClick={()=>handleClick(file.link,file.file_type)} size={30} />
      </div>
      <div className="cursor-pointer w-3/5   truncate" >
        {/* {JSON.stringify(file)} */}
        {file?.name}
      </div>
    </div>
    <div className="w-1/5 flex justify-center items-center">{date}</div>
    <div className="w-1/5 flex justify-center items-center">

    </div>
    <div className="w-1/5 flex justify-center items-center"></div>
    <div className="w-1/5 flex justify-center items-center">{file?.size&&bytes(file.size)}</div>
  </div>
  );
};

export default DisplayFile;
