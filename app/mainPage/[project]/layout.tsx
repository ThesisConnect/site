import Sidebar from '@/components/Sidebar';

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[calc(100vh-62px)] flex  ">
      <Sidebar />
      <div className="w-full overflow-y-scroll">{children}</div>
    </div>
  );
};

export default ProjectLayout;
