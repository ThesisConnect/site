import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
const SortByHome = () => {
  return (
    <Select>
      <SelectTrigger className="w-40 rounded-full">
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
