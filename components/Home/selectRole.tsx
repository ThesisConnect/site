import React, { FC, useImperativeHandle, forwardRef, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface SelectRoleProps {
  className?: string;
}
export interface SelectRoleRef {
  getValue: () => string;
}

const SelectRole=  forwardRef<SelectRoleRef,SelectRoleProps>((props, ref) => {
  const { className } = props;
  
  const [selectedValue, setSelectedValue] = useState<string>('Advisee');

  useImperativeHandle(ref, () => ({
    getValue: () => selectedValue,
  }), [selectedValue]);
  return (
    <Select defaultValue='Advisee' onValueChange={(value: string) => setSelectedValue(value)}>
      <SelectTrigger className={cn("w-40 rounded-full", className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Co_advisor">Co_advisor</SelectItem>
          <SelectItem value="Advisee">Advisee</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});


SelectRole.displayName = 'SelectRole';
export default SelectRole;
