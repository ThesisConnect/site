import { Controller } from 'react-hook-form';
import React, { forwardRef, FC, useState } from 'react';

interface SelectProps {
  pageType: string;
  setPage: (data: string) => void;
}

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
const DropdownApprove: FC<SelectProps> = ({ pageType, setPage }) => {
  // const [selectedValue, setSelectedValue] = useState<string>(pageType);
  // const handleValueChange = (newValue: string) => {
  //   // setSelectedValue(newValue);
  //   setValue(newValue)
  //   pageType = newValue;
  // };

  return (
    <div className={`w-40 relative`}>
      <div className="text-xs">
        <label>
          <Select value={pageType} onValueChange={setPage}>
            <SelectTrigger className="rounded-full border border-solid w-full p-4">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem defaultChecked value="ALL">
                  ALL
                </SelectItem>
                <SelectItem value="Gantt">Gantt</SelectItem>
                <SelectItem value="notGantt">Not gantt</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </label>
      </div>
    </div>
  );
};

export default DropdownApprove;
