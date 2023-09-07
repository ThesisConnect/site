import { BsFillChatDotsFill } from "react-icons/bs";
import FileSummary from "./File";

const UpdateTask = () => {
  const progress = 60
  return (
    <div
      className="relative flex flex-col items-center rounded-lg 
        bg-white border border-neutral-800 w-[700px] h-[160px] p-6 justify-evenly overflow-hidden"
    >
      <div className="w-full h-full">
        <div className="w-full h-full grid grid-cols-7 gap-1 ">
          <div className="col-span-2 flex items-center w-full">
            <div className="font-semibold">
              <div>Sun, Jan 15th 2566</div>
              <div>9:10 AM</div>
              <div className="w-full h-[60px] py-2 flex space-x-2 items-center">
                <div className="w-[40px] h-[40px] bg-neutral-200 rounded-full"></div>
                <div className="grid grid-cols-7 flex items-center">
                  <div className="col-span-5 w-[30px] h-[2px] bg-teal-800"></div>
                  <div className="col-span-2 w-[10px] h-[10px] bg-teal-800 rounded-full"></div>
                </div>
                <div className="w-[40px] h-[40px] bg-neutral-200 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="col-span-5 flex space-x-4">
            <div className="h-[100%] w-[0.5px] bg-teal-800"></div>
            <div className="w-[90%] overflow-hidden">
              <div className="font-semibold">Task name</div>
              <div className="flex">
                <div className="truncate">
                  Detail : A hydroelectric plant is a plant in which the turbine
                  generators are driven by falling water.
                </div>
              </div>

              <div className="h-[30%] w-full flex items-center gap-2">
                <div className="w-[85%] rounded-lg h-2 bg-neutral-400">
                  <div
                    className={`bg-teal-800 h-2 rounded-full w-[${progress}%]`}
                  ></div>
                </div>
                <div className="">{progress} %</div>
              </div>
              <div className="h-[100%]">
                <div className=" flex items-center gap-2 line-clamp-1 snap-x overflow-scrolled scroll-smooth">
                  <FileSummary />
                </div>
              </div>
            </div>
            <BsFillChatDotsFill className="text-3xl text-neutral-300 hover:text-neutral-400 duration-100" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateTask;
