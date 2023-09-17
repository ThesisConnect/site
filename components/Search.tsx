import InputBase from '@mui/material/InputBase';
import { BiSearchAlt2 } from 'react-icons/bi';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { cn } from '@/lib/utils';



const testData=[
  "The Shawshank Redemption",
  "The Godfather",
  "The Godfather: Part II",
  "Pulp Fiction",
  "The Good, the Bad and the Ugly",
]
interface SearchInputProps {
  width?:string;
  height?:string;
  data?:string[];
  onChange?: (
    event: React.SyntheticEvent, value: string, reason: string
  ) => void;
  className?:string;
}
const SearchInput:FC<SearchInputProps> = ({width,height,onChange,className,data}) => {
  // const showInput = (e:ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value);
  // }
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("h-10",width,height,className)}>
      <Autocomplete
        open={open}
        onOpen={() => setOpen(true)}
        disablePortal
        options={data||testData}
        onInputChange={onChange}
        getOptionLabel={(option) => option}
        sx={{
          height: '100%',
        }}
        renderInput={(params) => (
          <div
          ref={params.InputProps.ref}
          className='h-full '
          >
            <InputBase
              {...params}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setOpen(false);
                }
              }}
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
              placeholder="search"
            />
          </div>
        )}
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option, inputValue, { insideWords: true });
          const parts = parse(option, matches);
          return (
            <li {...props} >
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
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


export default SearchInput;
