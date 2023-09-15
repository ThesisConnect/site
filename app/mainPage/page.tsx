import HomePageLayout from '@/components/layout/HomePageLayout';
import DisplayProject from '../../components/Home/DisplayProject';
import dynamic from 'next/dynamic';
import LoadingNormal from '@/components/loading/LoadingNormal';
const PageHomeRole = () => {
  return (
    <HomePageLayout>
      <DisplayProject />
    </HomePageLayout>
  );
};

export default dynamic(() => Promise.resolve(PageHomeRole), {
  loading: () => <LoadingNormal />,
});
