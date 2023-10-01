'use client';
import fileStore from '@/stores/Files';
import { DisplayFile } from '../../../../components/files/DisplayFile';
import DisplayFolder from '@/components/files/DisplayFolder';
import { usePathname, useRouter } from 'next/navigation';
import { object } from 'zod';
import FolderDisplay from '../../../../components/files/FolderDIsplay';
import FileMemo from '../../../../components/files/FileMemo';
import useProject from '@/hook/useProject';
import LoadingNormal from '@/components/loading/LoadingNormal';
import useProjectStore from '@/stores/Project';
import dynamic from 'next/dynamic';

const PageRootFiles = () => {
  const pathName = usePathname();
  const { currentProject } = useProjectStore((state) => ({
    currentProject: state.currentProject,
  }));

  return (
    <div>
      {currentProject && (
        <FolderDisplay showFolderID={currentProject.folder_id} />
      )}
      {/* <FileMemo/> */}
    </div>
  );
};
// const PageRootFilesDynamic = dynamic(() => Promise.resolve(PageRootFiles), {
//   ssr: false,
//   loading: () => <LoadingNormal />,
// });

export default PageRootFiles;
