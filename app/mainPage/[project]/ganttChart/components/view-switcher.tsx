import React from 'react';
import 'gantt-task-react/dist/index.css';
import { ViewMode } from 'gantt-task-react';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      main: '#38A169', // Teal 500 color
    },
  },
});
type ViewSwitcherProps = {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};
export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
}) => {
  const [mode, setMode] = React.useState<ViewMode>(ViewMode.Day);

  return (
    <div className="p-4 space-y-2 ">
      <div className="space-x-2">
        <button
          className={"bg-teal-600 text-neutral-100 font-bold py-2 px-4 rounded hover:scale-[103%] hover:bg-teal-700 transition duration-300"+(mode===ViewMode.Day?" bg-teal-700":"")}
          onClick={() => {
            onViewModeChange(ViewMode.Day)
            setMode(ViewMode.Day)
          }}
        >
          Day
        </button>
        <button
          className={"bg-teal-600 text-neutral-100 font-bold py-2 px-4 rounded hover:scale-[103%] hover:bg-teal-700 transition duration-300"+(mode===ViewMode.Week?" bg-teal-700":"")}
          onClick={() => {
            onViewModeChange(ViewMode.Week)
            setMode(ViewMode.Week)
          }}
        >
          Week
        </button>
        <button
          className={"bg-teal-600 text-neutral-100 font-bold py-2 px-4 rounded hover:scale-[103%] hover:bg-teal-700 transition duration-300"+(mode===ViewMode.Month?" bg-teal-700":"")}
          onClick={() => {
            onViewModeChange(ViewMode.Month)
            setMode(ViewMode.Month)
          }}
        >
          Month
        </button>
        <button
          className={"bg-teal-600 text-neutral-100 font-bold py-2 px-4 rounded hover:scale-[103%] hover:bg-teal-700 transition duration-300"+(mode===ViewMode.Year?" bg-teal-700":"")}
          onClick={() => {
            onViewModeChange(ViewMode.Year)
            setMode(ViewMode.Year)
          }}
        >
          Year
        </button>
      </div>
      <div className="flex">
        <ThemeProvider theme={theme}>
          <Switch
            defaultChecked={isChecked}
            onClick={() => onViewListChange(!isChecked)}
          />
        </ThemeProvider>
        <span className="text-gray-700 flex items-center">Show Task List</span>
      </div>
    </div>
  );
};
