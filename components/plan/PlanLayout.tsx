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

export interface DataModelInterface {
  _id: string;
  project_id: string;
  name: string;
  description: string;
  progress: number;
  start_date: string;
  end_date: string;
  task: boolean;
  // [x: string]: any;
}

interface PageType {
  search: string;
  pageType: string;
  projectID: string;
  create: boolean;
  onSuccess: () => void;
}

const LayoutPlanning: React.FC<PageType> = ({
  pageType,
  projectID,
  create,
  search,
  onSuccess,
}) => {
  const user = userStore((state) => state.user);
  const [Plans, setPlans] = useState<DataModelInterface[]>([]);
  const [SortPlans, setSortPlans] = useState<DataModelInterface[]>(Plans);
  const [SearchPlans, setSearchPlans] = useState<DataModelInterface[]>([]);
  const [state, setState] = React.useState<boolean>(false);

  useEffect(() => {
    //console.log(create);
    const res = axiosBaseurl
      .get(`page/plan/${projectID}`, {
        withCredentials: true,
      })
      .then((response) => {
        setPlans(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [create, projectID]);

  useEffect(() => {
    if (search === '') {
      setSearchPlans([]);
    }
    else {
      setSearchPlans(Plans.filter((item) =>
        item.name.toLowerCase().trim().includes(search)
      ));
    }
  }, [search, Plans]);


  return (
    <div className="grid relative xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 w-full gap-4">
      {SearchPlans.length === 0 && Plans.filter((obj) => (pageType === 'Gantt' ? obj.task === true : obj))
        .filter((obj) => (pageType === 'notGantt' ? obj.task === false : obj))
        .map((obj) => (
          <PlanCard
            projectID={projectID}
            id={obj._id}
            name={obj.name}
            description={obj.description}
            start_date={obj.start_date}
            end_date={obj.end_date}
            progress={obj.progress}
            task={obj.task}
            onSucces={onSuccess}
            key={obj._id}
          />
        ))}
      {SearchPlans.length !== 0 && SearchPlans.filter((obj) => (pageType === 'Gantt' ? obj.task === true : obj))
        .filter((obj) => (pageType === 'notGantt' ? obj.task === false : obj))
        .map((obj) => (
          <PlanCard
            projectID={projectID}
            id={obj._id}
            name={obj.name}
            description={obj.description}
            start_date={obj.start_date}
            end_date={obj.end_date}
            progress={obj.progress}
            task={obj.task}
            onSucces={onSuccess}
            key={obj._id}
          />
        ))}
    </div>
  );
};

export default LayoutPlanning;
