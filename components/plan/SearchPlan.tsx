import InputBase from '@mui/material/InputBase';
import { BiSearchAlt2 } from 'react-icons/bi';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import {
  ChangeEvent,
  FC,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  width?: string;
  height?: string;
  data?: string[];
  onChange?: (
    event: React.SyntheticEvent,
    value: string,
    reason: string
  ) => void;
  className?: string;
}
const SearchPlanInput: FC<SearchInputProps> = ({
  width,
  height,
  onChange,
  className,
  data,
}) => {
  return (
    <div className={cn('h-10', width, height, className)}>
      <Autocomplete
        autoComplete
        includeInputInList
        noOptionsText="Plan not found"
        options={data || []}
        onInputChange={onChange}
        getOptionLabel={(option) => option}
        sx={{
          height: '100%',
        }}
        renderInput={(params) => (
          <div ref={params.InputProps.ref} className="h-full ">
            <InputBase
              {...params}
              sx={{
                border: '1px solid #d4d4d4',
                borderRadius: 50,
                height: '100%',
                padding: '0 15px',
                color: '#262626',
              }}
              startAdornment={
                <>
                  <BiSearchAlt2 size={20} className="text-neutral-400 me-2" />
                </>
              }
              placeholder="Search"
            />
          </div>
        )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option, inputValue, { insideWords: true });
        const parts = parse(option, matches);
        return (
          <li {...props}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  className='whitespace-pre'
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
      />
    </div>
  );
};

export default SearchPlanInput;
