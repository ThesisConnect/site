'use client';

import Sidebar from '@/components/Sidebar';
import Button from '@/components/plan/Button';
import CreatePopup from '@/components/plan/CreatePlanPopup';
import PlanCard from '@/components/plan/PlanCard';
import axios from 'axios';
import axiosBaseurl from '@/config/baseUrl';
import React, {
  useCallback,
  useRef,
  useState,
  MouseEvent,
  useEffect,
  ChangeEvent,
} from 'react';
import SortByPlan from '@/components/plan/SortBy';
import { v4 } from 'uuid';
import SearchInput from '@/components/Search';
import userStore from '@/stores/User';
import SearchPlanInput from '@/components/plan/SearchPlan';
import dynamic from 'next/dynamic';
import useProjectStore from '@/stores/Project';
// import LoadingNormal from '@/components/loading/LoadingNormal';
import LayoutPlanning from '@/components/plan/PlanLayout';
import LoadingPlan from '@/components/plan/LoadingUI';

const DynamicPlanLayout = dynamic(
  () => import('@/components/plan/PlanLayout'),
  {
    loading: () => <LoadingPlan />,
  }
);

export interface DataModelInterface {
  _id: string;
  project_id: string;
  name: string;
  description: string;
  progress: number;
  start_date: string;
  end_date: string;
  task: boolean;
  [x: string]: any;
}

const PagePlanning = ({
  params: { project: projectID },
}: {
  params: {
    project: string;
  };
}) => {
  const user = userStore((state) => state.user);
  const { currentProject } = useProjectStore((state) => ({
    currentProject: state.currentProject,
  }));

  const [Plans, setPlans] = useState<DataModelInterface[]>([]);
  const [SortPlans, setSortPlans] = useState<DataModelInterface[]>(Plans);
  const [searchplans, setSearchPlans] = useState<string>('');
  const [state, setState] = React.useState<boolean>(false);
  const [create, setCreate] = React.useState<boolean>(false);
  const [sort, setSort] = React.useState<boolean>(false);
  const [role, setRole] = useState<string>('advisor');

  function showCreatePopup() {
    setState(!state);
  }
  const handleCancel = () => {
    setState(!state);
  };
  const handleOnSuccess = () => {
    //console.log(create);
    setState(false);
    setCreate(!create);
  };

  const [selectedValue, setSelectedValue] = useState<string>('ALL');
  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
  };
  const [projectName, setProjectName] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const projectRes = await axiosBaseurl.get(`/project/${projectID}`, {
          withCredentials: true,
        });
        if (projectRes?.data?.name) {
          setProjectName(projectRes.data.name);
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    })();
  }, [projectID]);

  useEffect(() => {
    const res = axiosBaseurl
      .get(`page/plan/${projectID}`, {
        withCredentials: true,
      })
      .then((response) => {
        setPlans(response.data);
        setSortPlans(response.data);
        setRole(user.role);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [projectID, user.role]);

  function getDayDiff(StartPlan: string, EndPlan: string): number {
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.round(
      Math.abs(+new Date(StartPlan) - +new Date(EndPlan)) / msInDay
    );
  }

  const handleSearch = useCallback(
    (e: React.SyntheticEvent, value: string, reason: string) => {
      const searchValue = value.toLowerCase().trim();
      // console.log(searchValue)
      setSearchPlans(searchValue)
    },
    []
  );

  //console.log(searchplans);
  return (
    <div className="flex relative flex-row h-full  overflow-hidden">
      <div className="flex flex-col w-full h-full overflow-hidden">
        <div className="flex w-full h-[50px] p-2 p-b-0 items-center text-lg font-semibold">
          {projectName}
        </div>

        <div className="px-2 flex w-full justify-between items-center h-[50px]">
          {role === 'advisor' && (
            <div className="hover:bg-teal-700 hover:transition hover:ease-in-out ">
              <div className="text-white"></div>
            </div>
          )}
          {role === 'advisee' && (
            <button
              type="button"
              className="bg-teal-800 text-white w-[120px] h-10 rounded-full hover:bg-teal-700 hover:transition hover:ease-in-out "
              onClick={showCreatePopup}
            >
              Create Plan
            </button>
          )}
          <div className="flex gap-2 items-center">
            <SortByPlan pageType={selectedValue} setPage={handleValueChange} />
            <SearchPlanInput data={SortPlans.map((obj) => obj.name)} onChange={handleSearch} />
          </div>
        </div>
        <div className="relative h-full w-full overflow-hidden">
          <div className="flex w-full p-2 h-full">
            <div className="w-full h-full overflow-y-scroll scroll-x-none">
              <DynamicPlanLayout
                search={searchplans}
                create={create}
                pageType={selectedValue}
                projectID={projectID}
                onSuccess={handleOnSuccess}
              />
            </div>
          </div>
        </div>
      </div>
      {
        state && <CreatePopup
          show={state}
          onClose={handleCancel}
          projectID={projectID}
          onSucces={handleOnSuccess}
        />
      }

    </div>
  );
};

export default PagePlanning;
