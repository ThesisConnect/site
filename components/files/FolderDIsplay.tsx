import { FC } from 'react';
import fileStore, { Folder, File } from '../../stores/Files';
import { v4 } from 'uuid';
import DisplayFolder from './DisplayFolder';
import DisplayFile from './DisplayFile';
import { useParams, usePathname, useRouter } from 'next/navigation';


interface FolderDisplayProps {
  contents: (Folder | File)[];
  showFolderID?: string;
}
const FolderDisplay: FC<FolderDisplayProps> = ({
  contents,
  showFolderID = 'root',
}) => {
  const router = useRouter();

  const pathName = usePathname();
  const getcontents = fileStore((state) => state.getcontent);
  const data = getcontents(showFolderID, contents);
  return (
    <div className="h-full w-full">
      {data.map((item) => {
        if (item.type === 'folder') {
          return (
            <DisplayFolder
              name={item.name}
              key={v4()}
              onClick={() => {
                router.push(`${pathName}/${item.folderID}`);
              }}
            />
          );
        } else if (item.type === 'file') {
          return <DisplayFile {...item} key={v4()} />;
        } else {
          return <div key={v4()}></div>;
        }
      })}
    </div>
  );
};

export default FolderDisplay;
