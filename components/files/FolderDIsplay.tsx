import { FC, useEffect } from 'react';
import fileStore, { Folder, File } from '../../stores/Files';
import { v4 } from 'uuid';
import DisplayFolder from './DisplayFolder';

import { useParams, usePathname, useRouter } from 'next/navigation';
import useFile from '@/hook/useFile';
import { DisplayFile } from './DisplayFile';
import { handleFilePreview } from '@/utils/PreviewFile';
import { motion } from "framer-motion"
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
             key={item._id} className="my-4">
              <DisplayFolder
                name={item.name}
                onClick={() => {
                  router.push(`${pathName}/${item._id}`);
                }}
              />
            </motion.div>
          );
        } else if (item.type === 'file') {
          return (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              key={item._id} className="my-4">
              <DisplayFile file={item}  
                onClick={handleFilePreview}
               />
            </motion.div>
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
