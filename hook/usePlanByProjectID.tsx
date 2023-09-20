import axiosBaseurl from "@/config/baseUrl";
import useProjectStore, { IPlan } from "@/stores/Project";
import useSWR from "swr";

interface PlanHookReturn {
  plan: IPlan[];
  isLoading:boolean;
  mutate: any;
  error:Error|undefined
}
const fetcher = async (url: string) => {
  const res = await axiosBaseurl.get(url);
  return res.data
}
const usePlanByProjectID = (ProjectID:string):PlanHookReturn => {
  const { getPlanByProjectID,setPlanEachProject } = useProjectStore((state) => ({
    getPlanByProjectID: state.getPlanByProjectID,
    setPlanEachProject: state.setPlanEachProject,
  }));
  const { data, error, mutate,isLoading } = useSWR<IPlan[],Error>(`/page/plan/${ProjectID}`,fetcher,{
    onSuccess: (data) => {
      if(ProjectID)
        setPlanEachProject(ProjectID,data)
    }
  });
  
  return {
    plan: getPlanByProjectID(ProjectID) || data || [],
    isLoading,
    mutate,
    error
  }
}

export default usePlanByProjectID