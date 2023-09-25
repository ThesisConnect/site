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
};


const PagePlanning = ({ params: { project: projectID } }: {
  params: {
    project: string;
  };
}) => {
  const user = userStore((state) => state.user);
  const [Plans, setPlans] = useState<DataModelInterface[]>([])
  const [SortPlans, setSortPlans] = useState<DataModelInterface[]>(Plans)
  const [searchplans, setSearchPlans] = useState(Plans)
  const [state, setState] = React.useState<boolean>(false);
  const [create, setCreate] = React.useState<boolean>(false);
  const [sort, setSort] = React.useState<boolean>(false);

  function showCreatePopup() {
    setState(!state);
  }
  const handleCancel = () => {
    setState(!state);
  };
  const handleOnSuccess = () => {
    console.log(create);
    setState(false);
    setCreate(!create);
  };
  // console.log(Plans)
  // console.log(projectID)

  const [selectedValue, setSelectedValue] = useState<string>("ALL");
  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    if (newValue == "ALL") {
      setSortPlans(Plans);
    }
    else if (newValue == "Gantt") {
      const SortPlan = Plans.filter((obj) => obj.task === true)
      setSortPlans(SortPlan)
    }
    else if (newValue === "notGantt") {
      const SortPlan = Plans.filter((obj) => obj.task === false)
      setSortPlans(SortPlan)
    }
  };
  const [projectName, setProjectName] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const projectRes = await axiosBaseurl.get(`/project/${projectID}`, {
          withCredentials: true
        });
        if (projectRes?.data?.name) {
          setProjectName(projectRes.data.name);
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(create);
    const res = axiosBaseurl
      .get(`page/plan/${projectID}`, {
        withCredentials: true,
      })
      .then((response) => {
        setPlans(response.data);
        setSortPlans(response.data);
      }).catch(err => {
        console.log(err);
      })
  }, [create, projectID]);

  function getDayDiff(StartPlan: string, EndPlan: string): number {
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.round(
      Math.abs(+new Date(StartPlan) - +new Date(EndPlan)) / msInDay
    );
  }

  return (
    <div className="flex relative flex-row h-full  overflow-hidden">
      <div className="flex flex-col w-full h-full overflow-hidden">
        <div className="flex w-full h-[50px] p-2 p-b-0 items-center text-lg font-semibold">
          {projectName}
        </div>

        <div className="px-2 flex w-full justify-between items-center h-[50px]">
          {user.role === "advisor" && (
            <div
              className="hover:bg-teal-700 hover:transition hover:ease-in-out "
            >
              <div className="text-white"></div>
            </div>
          )}

          {user.role === "advisee" && (
            <Button
              type="submit"
              className="hover:bg-teal-700 hover:transition hover:ease-in-out "
              onClick={showCreatePopup}
            >
              <div className="text-white">Create Plan</div>
            </Button>
          )}
          <div className="flex gap-2 items-center">
            <SortByPlan pageType={selectedValue} setPage={handleValueChange} />
            <SearchPlanInput data={SortPlans.map((obj) => obj.name)} />
          </div>
        </div>
        <div className="relative h-full w-full overflow-hidden ">
          <div className="flex w-full p-2 h-full">
            <div className="w-full h-full overflow-scroll scroll-x-none">
              <div className="grid relative lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 w-full gap-4 ">
                {SortPlans.map((obj) =>
                  <PlanCard projectID={projectID} id={obj._id}
                    name={obj.name} description={obj.description}
                    start_date={obj.start_date} end_date={obj.end_date}
                    progress={obj.progress} task={obj.task} onSucces={handleOnSuccess}
                    key={v4()}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreatePopup
        key={v4()}
        show={state}
        onClose={handleCancel}
        projectID={projectID}
        onSucces={handleOnSuccess}
      />
    </div>
  );
};

export default PagePlanning;
