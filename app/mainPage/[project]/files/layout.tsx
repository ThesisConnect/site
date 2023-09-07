
import SortBy from "@/components/files/SortBy"
const FileLayout = ({ children,params:{project} }: { children: React.ReactNode,params:{
    project: string
} }) => {
  return (
    <div className="mx-10 h-full flex flex-col ">
        <div className="h-32 flex flex-col justify-evenly  ">
            <div className="text-[20px] font-semibold">
                Project: {project}
            </div>
            <div className='flex justify-end'>
                <SortBy/>
            </div>
        </div>
        <div className="h-10 bg-teal-800 rounded-t-sm">
            
        </div>
        <div className="h-[42px] bg-neutral-200 flex ">
            <span className="w-1/5 flex justify-center items-center">Name</span>
            <span className="w-1/5 flex justify-center items-center">Data modified</span>
            <span className="w-1/5 flex justify-center items-center">Share with</span>
            <span className="w-1/5 flex justify-center items-center">Type</span>
            <span className="w-1/5 flex justify-center items-center">size</span>
        </div>
        <div className="h-full bg-neutral-100 ">
            {children}
        </div>
    </div>
  )
}

export default FileLayout