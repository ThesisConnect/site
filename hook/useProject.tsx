
import axiosBaseurl from "@/config/baseUrl";
import useProjectStore, { IProject, createSchema, editSchema } from "@/stores/Project";
import { useCallback, useEffect } from "react";
import useSWR from "swr";
import { checkSchemaCreateProject, createNewProjectType } from '../models/Project/createNewProject';

const fetcher = async (url: string) => {
    const res = await axiosBaseurl.get(url);
    return res.data
}

interface IProjectHookReturn {
  project: IProject[];
  isLoading:boolean;
  mutate: any;
  updateProject: (updateData: editSchema,projectID:string) => Promise<void>;
  createNewProject: (createData: createNewProjectType) => Promise<void>;
  error:Error|undefined
}
const useProject = (suspense:boolean=false):IProjectHookReturn => {
  const { project, setProject, createProject,updateProject:updateProjectStore } = useProjectStore((state) => ({
    project: state.project,
    setProject: state.setProject,
    createProject: state.createProject,
    updateProject: state.updateProject,
  }));
  const { data, error, mutate,isLoading } = useSWR<IProject[],Error>("/test/page/main",fetcher);
  const updateProject = useCallback(async (updateData: editSchema,projectID:string) => {
    try {
      updateProjectStore(updateData,projectID)
      const  {data} = await axiosBaseurl.put("/page/main", updateData);
      mutate([...project,data]);
    } catch (err) {
      console.log(err);
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
  useEffect(() => {
    if (data) {
      setProject(data);
    }
  }
  , [data, setProject]);
  return {project,isLoading,mutate, updateProject,createNewProject,error};
};

export default useProject;
