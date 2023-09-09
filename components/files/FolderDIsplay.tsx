import { FC, useEffect } from 'react';
import fileStore, { Folder, File } from '../../stores/Files';
import { v4 } from 'uuid';
import DisplayFolder from './DisplayFolder';
import DisplayFile from './DisplayFile';
import { useParams, usePathname, useRouter } from 'next/navigation';

interface FolderDisplayProps {
  showFolderID?: string;
}
const FolderDisplay: FC<FolderDisplayProps> = ({ showFolderID = 'root' }) => {
  const router = useRouter();
  const pathName = usePathname();
  const getcontents = fileStore((state) => state.getcontent);
  const data = getcontents(showFolderID);

  return (
    <div className="h-full w-full">
      {data.map((item) => {
        if (item.type === 'folder') {
          return (
            <div key={v4()} className="my-4">
              <DisplayFolder
                name={item.name}
                key={v4()}
                onClick={() => {
                  router.push(`${pathName}/${item.folderID}`);
                }}
              />
            </div>
          );
        } else if (item.type === 'file') {
          return (
            <div key={v4()}>
              <DisplayFile {...item} key={v4()} />
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
