"use client";

import React, { use, useEffect, useState } from "react";
import { Task, ViewMode, Gantt } from "gantt-task-react";
import axiosBaseurl from "@/config/baseUrl";
import { ViewSwitcher } from "./components/view-switcher";
import { initTasks } from "./components/helper";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "next/navigation";

function PageGantt() {
  const {project} = useParams();
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
  const [dataItem, setData] = useState<any[]>([]);
  const [tasks, setTasks] = React.useState<Task[]>(initTasks());
  const [isChecked, setIsChecked] = React.useState(true);
  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosBaseurl.get(`/page/plan/${project}`, {
          withCredentials: true
        });

        if (Array.isArray(res?.data)) {
          let arrData = (res.data || []).map((o: any) => {
            let dd = {
              _id: o._id,
              project_id: o.project_id,
              name: o.name,
              description: o.description,
              progress: o.progress,
              task: o.task,
              start_date: new Date(o.start_date),
              end_date: new Date(o.end_date),
            };
            return dd;
          });

          const filteredData = arrData.filter((obj) => obj.task === true);

          setData(filteredData);

          setTasks(filteredData.map((item) => ({
            id: item._id,
            name: item.name,
            start: item.start_date,
            end: item.end_date,
            progress: item.progress,
            type: "task",
          })));
        } else {
          setData([]);
          setTasks([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })()
  }, [project]);

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  return (
    <div className="Wrapper">
      <ViewSwitcher
        onViewModeChange={viewMode => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <Gantt
        barProgressColor="#115e59"
        tasks={tasks}
        viewMode={view}
        onSelect={handleSelect}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
      />
    </div>
  );
};

// const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
//   return (
//     <div role="alert">
//       <p>Something went wrong:</p>
//       <pre>{error.message}</pre>
//       <button onClick={resetErrorBoundary}>Try again</button>
//     </div>
//   );
// }

export default PageGantt;
