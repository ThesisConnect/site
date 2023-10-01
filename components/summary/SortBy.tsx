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
const DropdownSummary: FC<SelectProps> = ({ pageType, setPage }) => {
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
                <SelectItem defaultChecked value="pending">
                  Pending
                </SelectItem>
                <SelectItem value="approve">Approve</SelectItem>
                <SelectItem value="reject">Reject</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </label>
      </div>
    </div>
  );
};

export default DropdownSummary;
