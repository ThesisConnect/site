import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SelectLabelsProps {
  onValueChange?: (
    value: string
  ) => void;
}
export default function SelectLabels({onValueChange}:SelectLabelsProps) {
  const [selectData,setSelectData] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    if(onValueChange)
      onValueChange(event.target.value)
    setSelectData(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 160  }} size="small" >
        <InputLabel 
        id="Sort Project">Sort by</InputLabel>
        <Select
          labelId="Sort Project"
          id="Sort Project"
          value={selectData}
          label="Sort by"
          onChange={handleChange}
          sx={{
            borderRadius:"50px",
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Progress"}>Progress</MenuItem>
          <MenuItem value={"ProjectName"}>Project Name</MenuItem>
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>
    </div>
  );
}