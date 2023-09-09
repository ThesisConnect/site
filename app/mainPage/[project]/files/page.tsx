'use client';
import fileStore from '@/stores/Files';
import { DisplayFile } from '../../../../components/files/DisplayFile';
import DisplayFolder from '@/components/files/DisplayFolder';
import { usePathname, useRouter } from 'next/navigation';
import { object } from 'zod';
import FolderDisplay from '../../../../components/files/FolderDIsplay';
import FileMemo from '../../../../components/files/FileMemo';
const PageRootfiles = () => {
  const defaultFiles = fileStore((state) => state.defaultFiles);
  const pathName = usePathname();
  const route = useRouter();

  return (
    <div className="w-full">
      {Object.values(defaultFiles)
        .filter((item) => {
          if (item.type === 'folder') {
            return item.folderID[0] === '1';
          } else {
            return false;
          }
        })
        .map((item) => {
          if (item.type === 'folder')
            return (
              <div key={item.folderID} className="my-4">
                <DisplayFolder
                  name={item.name}
                  key={item.folderID}
                  onClick={() => {
                    route.push(`${pathName}/${item.name.replace(' ', '_')}`);
                  }}
                />
              </div>
            );
          else return <></>;
        })}
      <FolderDisplay />
      {/* <FileMemo/> */}
    </div>
  );
};

export default PageRootfiles;
