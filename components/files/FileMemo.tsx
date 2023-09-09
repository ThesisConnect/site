import Input from '@/components/login/Input';
import AutoResizingTextArea from '../AutoResizingTextArea';
import { Ref, useEffect, useLayoutEffect, useRef } from 'react';
import { debounce } from 'lodash';
const FileMemo = () => {
  // const scrollRef = useRef<HTMLDivElement>(null);
  // const handleScroll = debounce(() => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  //   }
  // }, 300);

  // useEffect(() => {
  //   handleScroll();
  // }, [handleScroll]);
  return (
    <div
      className="fixed top-0 left-0 w-full h-full 
     z-50  bg-black bg-opacity-50 flex  justify-end"
    >
      <div className="bg-white h-full w-5/12 flex flex-col relative overflow-y-scroll justify-start ">
        <div className="h-20 px-5 font-bold text-base border-b-[1px] border-neutral-200 flex items-center">
          Memo
        </div>
        <div className="flex flex-col h-full px-5 overflow-y-scroll mt-10 ">
          <div>
            <Input
              label="File name"
              placeholder=""
              readOnly
              width="w-full"
              defaultValue={'file name'}
              classNameLabel="text-xs font-bold"
              className="bg-neutral-100 border-none "
              type="text"
            />
          </div>
          <div className="mt-10">
            <AutoResizingTextArea
              className="w-full border
             border-neutral-300 rounded-lg
            p-4
             "
              minHeight={500}
              maxHeight={800}
              placeholder="Add memo.."
              label="Memo"
              classNameLabel="text-xs font-bold "
            />
          </div>
        </div>
        <div className="flex justify-end w-full h-[9%] items-center bg-white border border-t-[1px]">
          <button
            type="button"
            className="rounded-full w-40 h-12 bg-neutral-200 me-4 "
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-full w-40 h-12 text-white  bg-teal-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileMemo;
