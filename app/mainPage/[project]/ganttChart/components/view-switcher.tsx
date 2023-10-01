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
  return (
    <div className="p-4 space-y-2 ">
      <div className="space-x-2">
        <button
          className="bg-gradient-to-r from-green-500 to-teal-500 text-neutral-900 font-bold py-2 px-4 rounded hover:from-teal-500 hover:to-green-500 transition duration-300"
          onClick={() => onViewModeChange(ViewMode.Day)}
        >
          Day
        </button>
        <button
          className="bg-gradient-to-r from-green-500 to-teal-500 text-neutral-900 font-bold py-2 px-4 rounded hover:from-teal-500 hover:to-green-500 transition duration-300"
          onClick={() => onViewModeChange(ViewMode.Week)}
        >
          Week
        </button>
        <button
          className="bg-gradient-to-r from-green-500 to-teal-500 text-neutral-900 font-bold py-2 px-4 rounded hover:from-teal-500 hover:to-green-500 transition duration-300"
          onClick={() => onViewModeChange(ViewMode.Month)}
        >
          Month
        </button>
        <button
          className="bg-gradient-to-r from-green-500 to-teal-500 text-neutral-900 font-bold py-2 px-4 rounded hover:from-teal-500 hover:to-green-500 transition duration-300"
          onClick={() => onViewModeChange(ViewMode.Year)}
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
