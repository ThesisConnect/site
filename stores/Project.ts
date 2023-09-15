
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import axiosBaseurl from '../config/baseUrl';
import {createJSONStorage, persist} from 'zustand/middleware'
export interface IStatus {
    id: number
    name: string
    order: number
  }
export interface IProject {
    _id: string
    name: string
    progress: number
    status: IStatus
    advisors: string[]
    co_advisors: string[]
    advisee: string[]
    chat_id: string
    folder_id: string
  }
export type createSchema = {
      name: string;
      advisors: string[];
      co_advisors: string[];
      advisee: string[];
  }
export type editSchema = {
      advisors: string[];
      co_advisors: string[];
      advisee: string[];
      id: string;
      name?: string | undefined;
  
  }
export interface ProjectStore {
    project:IProject[]
    setProject: (project: IProject[]) => void
    createProject: (data: createSchema) => Promise<IProject[]>
    updateProject: (updateData: editSchema,projectID:string) => IProject|undefined
  }

const useProjectStore = createWithEqualityFn<ProjectStore>()(
  persist(
    (set, get) => ({
        project: [],
        setProject: (project) => set({ project }),
        createProject: async (data: createSchema) => {
          const newProject = await axiosBaseurl.post("/project/create", data);
          console.log(newProject.data)
          set({ project: [...get().project, newProject.data] });
          return get().project;
        },
        updateProject: (updateData,projectID) => {
          const project = get().project.find((project) => project._id === projectID);
          if (project) {
            const updatedProject = { ...project, ...updateData };
            set({
              project: get().project.map((project) =>
                project._id === projectID ? updatedProject : project
              ),
            });
            return updatedProject;
          };
          return undefined;
        },


    })
    ,{
      name: 'project-storage',
      storage: createJSONStorage(()=>sessionStorage),
    }
  )
    ,shallow

)
export default useProjectStore