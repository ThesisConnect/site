"use client";

import { InputHTMLAttributes, useCallback, useState } from "react";
import React, { forwardRef, FC } from "react";
import { Controller } from "react-hook-form";
import {

  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface SelectProps  {
  label: string;
  placeholder: string;
  width?: string;
  control : any
}
const SelectRole: FC<SelectProps> =
  ({ label, width = "w-10/12", placeholder,control }) => {

    return (
      <div className={`${width} relative`}>
        <div className="text-xs">
          <label>
            {label}
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <Select onValueChange={field.onChange}
                  {...field}
                >
                  <SelectTrigger  className="rounded-md border border-solid border-[#949494] w-full h-14 ps-2"  >
                    <SelectValue placeholder={placeholder}/>
                  </SelectTrigger>
                  <SelectContent  >
                    <SelectGroup>
                      <SelectLabel>Role</SelectLabel>
                      <SelectItem value="student">student</SelectItem>
                      <SelectItem value="teacher">teacher</SelectItem>
                      
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

SelectRole.displayName = "SelectRole";

export default SelectRole;
