import FolderIcon from '../icon/FolderIcon';
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';
import { FC, useState } from 'react';
import { DateTime } from 'luxon';

interface DisplayFolderProps {
  name: string;
  onClick?: () => void;
  shareWith?: string[];
  size?: string;
  dataModified?: string;
}
export const DisplayFolder: FC<DisplayFolderProps> = ({
  name,
  onClick,
  shareWith,
  size,
}) => {
  const [hoverFolder, setHoverFolder] = useState<boolean>(false);
  const date = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
  return (
    <div className="h-10 flex">
      <div className="w-1/5 flex   items-center">
        <div className="w-2/5 flex justify-end me-4  ">
          {hoverFolder ? (
            <FcOpenedFolder
              onMouseLeave={()=>setHoverFolder(false)}
              className="cursor-pointer"
              onClick={onClick}
              size={35}
            />
          ) : (
            <FcFolder onMouseEnter={()=>setHoverFolder(true)} 
            className="cursor-pointer" onClick={onClick} size={35} />
          )}
        </div>
        <div className="cursor-pointer w-3/5" onClick={onClick}>
          {name}
        </div>
      </div>
      <div className="w-1/5 flex justify-center items-center">{date}</div>
      <div className="w-1/5 flex justify-center items-center">
        {shareWith?.map((item, index) => {
          if (index === 0) {
            return item;
          } else {
            return `,${item}`;
          }
        })}
      </div>
      <div className="w-1/5 flex justify-center items-center"></div>
      <div className="w-1/5 flex justify-center items-center">{size}</div>
    </div>
  );
};

export default DisplayFolder;
