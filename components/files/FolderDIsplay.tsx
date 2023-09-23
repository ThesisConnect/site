import { FC, useEffect } from 'react';
import fileStore, { Folder, File } from '../../stores/Files';
import { v4 } from 'uuid';
import DisplayFolder from './DisplayFolder';

import { useParams, usePathname, useRouter } from 'next/navigation';
import useFile from '@/hook/useFile';
import { DisplayFile } from './DisplayFile';
import { handleFilePreview } from '@/utils/PreviewFile';
interface FolderDisplayProps {
  showFolderID: string;
}
const FolderDisplay: FC<FolderDisplayProps> = ({ showFolderID  }) => {
  const router = useRouter();
  const pathName = usePathname();
  const {
    allfiles: allfiles ,
  } = useFile(showFolderID);
 
  return (
    <div className="h-full w-full">
      {allfiles?.map((item) => {
        if (item.type === 'folder') {
          return (
            <div key={v4()} className="my-4">
              <DisplayFolder
                name={item.name}
                key={v4()}
                onClick={() => {
                  router.push(`${pathName}/${item._id}`);
                }}
              />
            </div>
          );
        } else if (item.type === 'file') {
          return (
            <div key={v4()} className="my-4">
              <DisplayFile file={item}  
                onClick={handleFilePreview}
               />
            </div>
          );
        } else {
          return <div key={v4()}></div>;
        }
      })}
    </div>
  );
};

export default FolderDisplay;

// Layer_uuid4
