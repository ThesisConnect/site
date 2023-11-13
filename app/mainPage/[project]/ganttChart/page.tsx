'use client';

import React, { use, useEffect, useState } from 'react';
import { Task, ViewMode, Gantt } from 'gantt-task-react';
import axiosBaseurl from '@/config/baseUrl';
import { ViewSwitcher } from './components/view-switcher';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'next/navigation';


function NoDataMessage() {
  return (
    <div className="NoDataMessage">
      <h2>No data available yet!</h2>
      <p>Please add your plan in planning</p>
    </div>
  );
}

function PageGantt() {
  const { project } = useParams();
  const [view, setView] = useState<ViewMode>(ViewMode.Day);
  const [dataItem, setData] = useState<any[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosBaseurl.get(`/page/plan/${project}`, {
          withCredentials: true,
        });

        if (Array.isArray(res?.data) && res.data.length > 0) {
          let arrData = res.data.map((o) => ({
            _id: o._id,
            project_id: o.project_id,
            name: o.name,
            description: o.description,
            progress: o.progress,
            task: o.task,
            start_date: new Date(o.start_date),
            end_date: new Date(o.end_date),
          }));

          const filteredData = arrData.filter((obj) => obj.task === true);
          setData(filteredData);
          let tasks: Task[] = filteredData.map((item) => ({
            id: item._id,
            name: item.name,
            start: new Date(item.start_date),
            end: new Date(item.end_date),
            progress: item.progress || 0,
            type: 'task',
          }));
          setTasks(tasks);
        } else {
          setShowNoDataMessage(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [project]);
  useEffect(() => {
    
   if(!dataItem||dataItem.length === 0){
     console.log("pass")
      setShowNoDataMessage(true);
   }
   else{
    setShowNoDataMessage(false);
   }
  }, [dataItem]);

  const handleSelect = (task: Task, isSelected: boolean) => {
    //console.log(task.name + ' has ' + (isSelected ? 'selected' : 'unselected'));
  };

  return (
    <div className="Wrapper">
      <ViewSwitcher
        onViewModeChange={(viewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      {showNoDataMessage ? (
        <NoDataMessage />
      ) : (
        <div className="GanttContainer" style={{ height: '500px', overflow: 'auto' }}>
          {tasks?.length > 0 && (
            <Gantt
              barProgressColor="#115e59"
              tasks={tasks}
              viewMode={view}
              onSelect={handleSelect}
              listCellWidth={isChecked ? '155px' : ''}
              columnWidth={columnWidth}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default PageGantt;

