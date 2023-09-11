
import axiosBaseurl from "@/config/baseUrl";
import useProjectStore, { IProject, createSchema, editSchema } from "@/stores/Project";
import { useCallback, useEffect } from "react";
import useSWR from "swr";

const fetcher = async (url: string) => {
    const res = await axiosBaseurl.get(url);
    return res.data
}

interface IProjectHookReturn {
  project: IProject[];
  isLoading:boolean;
  mutate: any;
  updateProject: (updateData: editSchema,projectID:string) => Promise<void>;
  createNewProject: (createData: createSchema) => Promise<void>;
  error:Error|undefined
}
const useProject = (suspense:boolean=false):IProjectHookReturn => {
  const { project, setProject, createProject,updateProject:updateProjectStore } = useProjectStore((state) => ({
    project: state.project,
    setProject: state.setProject,
    createProject: state.createProject,
    updateProject: state.updateProject,
  }));
  const { data, error, mutate,isLoading } = useSWR<IProject[],Error>("/test/page/main");
  const updateProject = useCallback(async (updateData: editSchema,projectID:string) => {
    try {
      updateProjectStore(updateData,projectID)
      const  {data} = await axiosBaseurl.put("/page/main", updateData);
      mutate([...project,data]);
    } catch (err) {
      console.log(err);
    }
  },[ mutate, updateProjectStore,project])
  const createNewProject = useCallback(async (createData: createSchema) => {
    try {
      const newAllProject = await createProject(createData)
      mutate(newAllProject);
    } catch (err) {
      console.log(err);
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
