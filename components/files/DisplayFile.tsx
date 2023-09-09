import { FC } from 'react';
import fileStore, { Folder, File } from '../../stores/Files';
import { v4 } from 'uuid';

export const DisplayFile: FC<File> = ({
  type,
  size,
  type_file,
  lastModified,
  link,
}) => {
  return (
    <div className="h-10flex">
      <div className="w-1/5 flex justify-center items-center">{type_file}</div>
      <div className="w-1/5 flex justify-center items-center">
        {lastModified}
      </div>
      <div className="w-1/5 flex justify-center items-center">Share with</div>
      <div className="w-1/5 flex justify-center items-center">{type}</div>
      <div className="w-1/5 flex justify-center items-center">{size}</div>
    </div>
  );
};

export default DisplayFile;
