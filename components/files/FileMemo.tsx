import Input from '@/components/login/Input';
import AutoResizingTextArea from '../AutoResizingTextArea';
import { FC, Ref, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { File } from '@/stores/Files';
import axiosBaseurl from '@/config/baseUrl';
import { mutate } from 'swr';
import { useParams } from 'next/navigation';
interface FileMemoProps {
  show: boolean;
  onClose?: () => void;
  onSaved?: () => void;
  file: File;
}
const FileMemo:FC<FileMemoProps> = (
  {
    show,
    onClose,
    onSaved,
    file
  }
) => {
  const params = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('submit');
    if (!inputRef.current || !textAreaRef.current) return;
    const name = inputRef.current.value.trim();
    const memo = textAreaRef.current.value.trim();
    if (!name) return;
    if (name === file.name && (memo === file.memo||memo==="")) return;
    if (isSubmitting) return;
    setIsSubmitting(true);
    try{
      await axiosBaseurl.put("/file/edit",{
        _id:file._id,
        name,
        memo
      })
      await mutate(`/folder/${params.folderID[params.folderID.length - 1]}`);
      setIsSubmitting(false);
      // console.log(name, memo);
      onSaved && onSaved();
      onClose && onClose();

    }
    catch(err){
      console.log(err);
      setIsSubmitting(false);
      onClose && onClose();

    }
  }, [file.name, file.memo, onSaved, onClose,isSubmitting,setIsSubmitting,file._id,params.folderID]);
  useEffect(() => {
    inputRef.current?.focus();
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
      else if (event.key === 'Enter') {
        handleSubmit(event as any);
      }
    };
    document.addEventListener('keydown', handleEscapePress);
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleEscapePress);
    };

  }, [onClose, handleSubmit]);
  if(!show) return null;
  return (
    <div
      className="fixed top-0 left-0 w-full h-full 
     z-50  bg-black bg-opacity-50 flex  justify-end"
    >
      <form onSubmit={handleSubmit} className="bg-white h-full w-5/12 flex flex-col relative overflow-y-scroll justify-start ">
        <div className="h-20 px-5 font-bold text-base border-b-[1px] border-neutral-200 flex items-center">
          Memo
        </div>
        <div className="flex flex-col h-full px-5 overflow-y-scroll mt-10 ">
          <div>
            <Input
              ref={inputRef}
              label="File name"
              placeholder=""
              width="w-full"
              defaultValue={file.name}
              classNameLabel="text-xs font-bold"
              className="border border-gray-300  p-2 
                shadow-sm transition duration-150 ease-in-out"
              type="text"
            />
          </div>
          <div className="mt-10">
            <AutoResizingTextArea
              className="w-full border
             border-neutral-300 rounded-lg
            p-4
             "
             ref={textAreaRef}
              minHeight={500}
              maxHeight={800}
              defaultValue={file.memo}
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
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full w-40 h-12 text-white  bg-teal-800"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FileMemo;
