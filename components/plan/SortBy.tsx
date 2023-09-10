import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
  const SortByPlan = () => {
    return (
      <Select>
        <SelectTrigger className="w-40 rounded-full">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="All">ALL</SelectItem>
            <SelectItem value="Gantt">Gantt</SelectItem>
            <SelectItem value="Notgantt">Not gantt</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };
  
  export default SortByPlan;
  