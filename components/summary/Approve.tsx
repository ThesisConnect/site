import { Controller } from 'react-hook-form';
import React, { forwardRef, FC, useState } from 'react';

interface SelectProps {
  label: string;
  placeholder: string;
  width?: string;
  control: any;
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
const DropdownApprove: FC<SelectProps> = (
  {
    label,
    placeholder,
    control,
    pageType,
    setPage,
  }
) => {
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
          <Controller
            control={control}
            name="Approve"
            render={({}) => (
              <Select value={pageType} onValueChange={setPage}>
                <SelectTrigger className="rounded-full border border-solid border-neutral-800 w-full p-4">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem defaultChecked value="Approve">Approve</SelectItem>
                    <SelectItem value="Reject">Reject</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </label>
      </div>
    </div>
  );
};


export default DropdownApprove;
