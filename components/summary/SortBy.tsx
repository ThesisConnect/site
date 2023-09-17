import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
  const SortBySummary = () => {
    return (
      <Select>
        <SelectTrigger className="w-40 rounded-full">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="All">ALL</SelectItem>
            <SelectItem value="Task1">Task 1</SelectItem>
            <SelectItem value="Task2">Task 2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }; 
  
  export default SortBySummary;
  