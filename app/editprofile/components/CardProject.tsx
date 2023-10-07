import {IProject} from "@/stores/Project";
import {FC} from "react";
import Progress from "@/components/Home/Progress";
interface ICardProjectProps {
  project: IProject;
  
}
const CardProject:FC<ICardProjectProps> = ({ project}) => { 
  return (
    <div className="flex w-full text-neutral-800 items-center h-14 ">
      <div className="truncate">
        {project.name}
      </div>
      <div className="flex-grow"/>
      <div className="w-3/12 h-full">
        <Progress
          progress={project.progress}
        />
      </div>
    </div>
  );
}

export default CardProject;