import FolderIcon from '../icon/FolderIcon';
import { FcFolder } from 'react-icons/fc';
import { FC } from 'react';
import { DateTime } from 'luxon';
interface DisplayFolderProps {
  name: string;
  onClick?: () => void;
  shareWith?:string[];
  size?:string;
  dataModified?:string;
}
export const DisplayFolder: FC<DisplayFolderProps> = ({ name, onClick,shareWith,size }) => {
  const date = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
  return (
    <div className="h-10 flex">
      <div className="w-1/5 flex  cursor-pointer items-center" >
        <div className="w-2/5 flex justify-end me-4  " >
        <FcFolder size={35}/>
        </div>
        <div className='cursor-pointer' onClick={onClick}>{name}</div>
      </div>
      <div className="w-1/5 flex justify-center items-center">
        {date}
      </div>
      <div className="w-1/5 flex justify-center items-center">{
        shareWith?.map((item,index)=>{
            if(index===0){
                return item
            }else{
                return `,${item}`
            }
            })
      }</div>
      <div className="w-1/5 flex justify-center items-center">

      </div>
      <div className="w-1/5 flex justify-center items-center">{size}</div>
    </div>
  );
};

export default DisplayFolder;
