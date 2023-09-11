import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { FC } from 'react';

interface SortByHomeProps {
  className?: string;
}

const SortByHome:FC<SortByHomeProps> = ({className}) => {
  return (
    <Select>
      <SelectTrigger className={cn("w-40 rounded-full",className)}>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Date">Date</SelectItem>
          <SelectItem value="Name">ProjectName</SelectItem>
          <SelectItem value="Progress">Progress</SelectItem>
          <SelectItem value="Cancel">Cancel</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortByHome;
