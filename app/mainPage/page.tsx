'use client';
import HomePageLayout from '@/components/layout/HomePageLayout';
import DisplayProject from '../../components/Home/DisplayProject';
import dynamic from 'next/dynamic';
import LoadingNormal from '@/components/loading/LoadingNormal';
import useProjectStore from '@/stores/Project';
import { motion } from 'framer-motion';
import ProtectedPage from '@/components/ProtectedPage';
const PageHomeRole = () => {
  const { project, filterProject } = useProjectStore((state) => ({
    project: state.project,
    filterProject: state.filterProject,
  }));
  const projectList = filterProject.length > 0 ? filterProject : project;
  return (
    <>
      {(project.length===0||!project ) && (
        <div className="empty-state-container flex flex-col items-center justify-center h-full w-full text-center space-y-4">
          <h2 className="text-2xl font-semibold">No Projects Yet</h2>
          <p className="text-gray-500">It looks like you haven&apos;t created any projects. Let&apos;s get started!</p>
        </div>
      )
      }
      {projectList?.map((item, index) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          key={item._id}
        >
          <DisplayProject project={item} />
        </motion.div>
      ))}
    </>
  );
};
const PageHomeRoleDynamic = dynamic(() => Promise.resolve(PageHomeRole), {
  ssr: false,
  loading: () => <LoadingNormal />,
});
const MainPage = () => {
  return (
    <ProtectedPage>
      <HomePageLayout>
        <PageHomeRoleDynamic />
      </HomePageLayout>
    </ProtectedPage>
  );
};
export default MainPage;