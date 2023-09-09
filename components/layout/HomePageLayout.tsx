'use client';
import SortByHome from '../Home/SortByHome';

const HomePageLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="h-[calc(100vh-62px)]  w-full px-8">
      <div className="h-[10%] flex items-center justify-end  ">
        <SortByHome />
      </div>
      <div className="flex flex-col h-[90%]">
        <div className="flex bg-teal-800 text-white justify-center items-center rounded-t-sm h-[53px] text-center font-semibold">
          <div className="w-1/5">Project</div>
          <div className="w-1/5">Progress</div>
          <div className="w-1/5 ps-20">Status</div>
          <div className="w-2/5 flex flex-row ">
            <div className="w-1/3">Advisor</div>
            <div className="w-1/3">Advisee</div>
            <div className="w-1/3">Chat</div>
          </div>
        </div>
        <div className="bg-neutral-100 h-full overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};

export default HomePageLayout;
