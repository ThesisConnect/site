import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
const SortBy = () => {
  return (
    <Select>
      <SelectTrigger className="w-40 rounded-full">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Date">Date modified</SelectItem>
          <SelectItem value="Name">Name</SelectItem>
          <SelectItem value="Size">Size</SelectItem>
          <SelectItem value="Cancel">Cancel</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortBy;
