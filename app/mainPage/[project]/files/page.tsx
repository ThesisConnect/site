'use client';
import fileStore from '@/stores/Files';
import { DisplayFile } from '../../../../components/files/DisplayFile';
import DisplayFolder from '@/components/files/DisplayFolder';
import { usePathname, useRouter } from 'next/navigation';
const Pagefiles = () => {
  const defaultFiles = fileStore((state) => state.defaultFiles);
  const pathName = usePathname();
  const route = useRouter();

  return (
    <div className="w-full">
      {defaultFiles.map((item) => {
        if (item.type === 'folder')
          return (
            <div className="my-4">
              <DisplayFolder name={item.name} key={item.folderID} 
              onClick={()=>{
                route.push(`${pathName}/${item.name.replace(" ","_")}`)
              }}
              />
            </div>
          );
        else return <></>;
      })}
    </div>
  );
};

export default Pagefiles;
