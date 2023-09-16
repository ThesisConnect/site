'use client';
import HomePageLayout from '@/components/layout/HomePageLayout';
import DisplayProject from '../../components/Home/DisplayProject';
import dynamic from 'next/dynamic';
import LoadingNormal from '@/components/loading/LoadingNormal';
import useProjectStore from '@/stores/Project';
import { motion } from 'framer-motion';
const PageHomeRole = () => {
  const { project } = useProjectStore((state) => ({
    project: state.project,
  }));
  return (
    <>
      {project?.map((item,index) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          key={item._id} 
        >
          <DisplayProject project={item}  />
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
    <HomePageLayout>
      <PageHomeRoleDynamic />
    </HomePageLayout>
  );
};
export default dynamic(() => Promise.resolve(MainPage), {
  loading: () => <LoadingNormal />,
});
