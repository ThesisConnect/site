import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import axiosBaseurl from '../config/baseUrl';
import { createJSONStorage, persist } from 'zustand/middleware';
import { set } from 'lodash';
export interface IStatus {
  id: number;
  name: string;
  order: number;
}
export interface IUserInProject {
  avatar: string | undefined;
  email: string;
  name: string;
  surname: string;
  userName: string;
  role: string;
  _id: string;
}
export interface IProject {
  _id: string;
  name: string;
  progress: number;
  status: IStatus;
  advisors: IUserInProject[];
  co_advisors: IUserInProject[];
  advisee: IUserInProject[];
  chat_id: string;
  folder_id: string;
}
export type createSchema = {
  name: string;
  advisors: string[];
  co_advisors: string[];
  advisee: string[];
};
export type editSchema = {
  advisors: IUserInProject[];
  co_advisors: IUserInProject[];
  advisee: IUserInProject[];
  id: string;
  name?: string | undefined;
  status: IStatus;
  progress: number;
};
export interface IPlan {
  _id: string;
  project_id: string;
  name: string;
  description: string;
  progress: number;
  start_date: Date;
  end_date: Date;
  task: boolean;
  chat_id?: string;
  folder_id?: string;
  archived: boolean;
}

export interface ProjectStore {
  project: IProject[];
  filterProject: IProject[];
  currentProject: IProject | undefined;
  planEachProject: Record<string, IPlan[]>;
  setPlanEachProject: (projectID: string, plan: IPlan[]) => void;
  setFilterProject: (filterProject: IProject[]) => void;
  setProject: (project: IProject[]) => void;
  createProject: (data: createSchema) => Promise<IProject[]>;
  updateProject: (
    updateData: IProject,
    projectID: string
  ) => IProject | undefined;
  getPlanByProjectID: (projectID: string) => IPlan[];
  getProjectByID: (projectID: string) => IProject | undefined;
}

const useProjectStore = createWithEqualityFn<ProjectStore>()(
  persist(
    (set, get) => ({
      project: [],
      filterProject: [],
      planEachProject: {},
      currentProject: undefined,
      setFilterProject: (filterProject) => set({ filterProject }),
      setPlanEachProject: (projectID, plan) =>
        set({
          planEachProject: { ...get().planEachProject, [projectID]: plan },
        }),
      setProject: (project) => set({ project }),
      createProject: async (data: createSchema) => {
        const newProject = await axiosBaseurl.post('/project/create', data);
        //console.log(newProject.data);
        set({ project: [...get().project, newProject.data] });
        return get().project;
      },
      updateProject: (updateData, projectID) => {
        const project = get().project.find(
          (project) => project._id === projectID
        );
        if (project) {
          const updatedProject = { ...project, ...updateData };
          set({
            project: get().project.map((project) =>
              project._id === projectID ? updatedProject : project
            ),
          });
          return updatedProject;
        }
        return undefined;
      },
      getPlanByProjectID: (projectID) => {
        return get().planEachProject[projectID] || [];
      },
      getProjectByID: (projectID) => {
        set({
          currentProject: get().project.find(
            (project) => project._id === projectID
          ),
        });
        return get().project.find((project) => project._id === projectID);
      },
    }),
    {
      name: 'project-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  ),
  shallow
);

export default useProjectStore;
