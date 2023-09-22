
import axiosBaseurl from "@/config/baseUrl";
import useProjectStore, { IProject, createSchema, editSchema } from "@/stores/Project";
import { useCallback, useEffect } from "react";
import useSWR from "swr";
import { checkSchemaCreateProject, createNewProjectType } from '../models/Project/createNewProject';
import { extend, omit } from "lodash";

const fetcher = async (url: string) => {
    const res = await axiosBaseurl.get(url);
    return res.data
}
interface updateProjectType extends Omit<editSchema, 'advisors' | 'co_advisors' | 'advisee'> {
  advisors: string[];
  co_advisors: string[];
  advisee: string[];
}
interface IProjectHookReturn {
  project: IProject[];
  isLoading:boolean;
  mutate: any;
  updateProject: (updateData: updateProjectType,projectID:string) => Promise<void>;
  createNewProject: (createData: createNewProjectType) => Promise<void>;
  deleteProject: (projectID:string) => Promise<void>;
  error:Error|undefined
}
const useProject = (suspense:boolean=false):IProjectHookReturn => {
  const { project, setProject, createProject,updateProject:updateProjectStore } = useProjectStore((state) => ({
    project: state.project,
    setProject: state.setProject,
    createProject: state.createProject,
    updateProject: state.updateProject,
  }));
  const { data, error, mutate,isLoading } = useSWR<IProject[],Error>("/test/page/main",fetcher,{ revalidateOnFocus: true });
  const updateProject = useCallback(async (updateData: updateProjectType,projectID:string) => {
    try {
      const  {data} = await axiosBaseurl.put("/project/edit", updateData) ;
      updateProjectStore(data as editSchema,projectID)
      const newData = [...project,data]
      mutate(newData);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },[ mutate, updateProjectStore,project])
  const createNewProject = useCallback(async (createData: createNewProjectType) => {
    try {
      const newData = {
        name:createData.projectName,
        advisors:[]  as string[],
        co_advisors:[] as string[],
        advisee:[]  as string[],
      }
      for (const user of createData.userInProject) {
        if(user.role==="Advisor"){
          newData.advisors.push(user.email)
        }
        else if(user.role==="Co_advisor"){
          newData.co_advisors.push(user.email)
        }
        else if(user.role==="Advisee"){
          newData.advisee.push(user.email)
        }
      }
      const newAllProject = await createProject(newData)
      mutate(newAllProject);
    } catch (err) {
      throw err;
    }
  }
  , [ mutate,createProject]);
  const deleteProject = useCallback(async (projectID:string) => {
    try {
      const newDataWithDelete = project.filter((item)=>item._id!==projectID)
      mutate(newDataWithDelete);
    } catch (err) {
      console.log(err);
    }
  },[ mutate,project])
  useEffect(() => {
    if (data) {
      setProject(data);
    }
  }
  , [data, setProject]);
  return {project,isLoading,mutate, updateProject,createNewProject,deleteProject,error};
};

export default useProject;
