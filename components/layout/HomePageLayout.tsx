'use client';
import useProject from '@/hook/useProject';
import SortByHome from '../Home/SortByHome';
import { ChangeEvent, useEffect, useState } from 'react';
import { useCallback } from 'react';
import ModalCreateProject from '../Home/ModalCreateProject';
import Search from '../Search';
import useProjectStore from '@/stores/Project';
import * as _ from 'lodash';
const HomePageLayout = ({ children }: { children?: React.ReactNode }) => {
  const { project, isLoading, mutate, updateProject, createNewProject, error } =
    useProject();
  const { setFilterProject } = useProjectStore((state) => ({
    setFilterProject: state.setFilterProject,
  }));
  const [showNotFound, setShowNotFound] = useState(false);
  const [openModalCreateProject, setOpenModalCreateProject] = useState(false);
  const handleSearchDebounced = _.debounce(
    (searchValue, project, setFilterProject) => {
      if (searchValue === '') {
        setShowNotFound(false);
        return setFilterProject([]);
      }
      const searchResult = _.filter(project, (item) => {
        return item.name.toLowerCase().trim().includes(searchValue);
      });
      if (searchResult.length === 0) {
        setShowNotFound(true);
      }
      setFilterProject(searchResult);
    },
    200
  );
  const handleSearch = useCallback(
    (e: React.SyntheticEvent, value: string, reason: string) => {
      // console.log(e)
      // console.log(reason)
      // console.log(value)
      const searchValue = value.toLowerCase().trim();
      handleSearchDebounced(searchValue, project, setFilterProject);
    },
    [project, setFilterProject, handleSearchDebounced]
  );
  useEffect(() => {
    setFilterProject([]);
  }, [setFilterProject]);
  const handleCreateProject = async () => {
    setOpenModalCreateProject(true);
  };
  return (
    <div className="h-[calc(100vh-62px)]  w-full px-8">
      <div className="h-[10%] flex items-center  ">
        <button
          className="font-semibold px-5 rounded-full h-10
         text-white text-base  bg-teal-800
         cursor-pointer hover:bg-teal-900
         "
          onClick={handleCreateProject}
        >
          New Project
        </button>
        {openModalCreateProject && (
          <ModalCreateProject
            isOpen={openModalCreateProject}
            onClose={() => setOpenModalCreateProject(false)}
          />
        )}
        <div className="flex-grow" />
        <SortByHome className="me-4 " />
        <Search
          data={project.map((items) => items.name)}
          onChange={handleSearch}
        />
      </div>
      <div className="flex flex-col h-[90%]">
        <div
          className="flex bg-teal-800 text-white justify-center items-center 
        rounded-t-sm h-[53px] text-center font-semibold"
        >
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
          {showNotFound ? (
            <div
              className="w-full h-full
               flex text-2xl text-gray-500 font-semiboldcs
           items-center justify-center"
            >
              Project not found
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePageLayout;
