"use client"
import { MdAttachFile } from 'react-icons/md';
import AutoResizingTextArea from '../AutoResizingTextArea';
import { FC,  useEffect,  useLayoutEffect, useRef, useState } from 'react';
interface MessageInputProps {
  handleInputHeightChange?: (newHeight: number) => void;
}
const MessageInput:FC<MessageInputProps> = ({
  handleInputHeightChange = () => {},
}) => {
  // const [inputHeight, setInputHeight] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const currentInputRef = inputRef.current;
    const handleInput = () => {
      if (inputRef.current) {
        handleInputHeightChange(inputRef.current.scrollHeight);
        // console.log(inputRef.current.scrollHeight)
      }
    };
    if (currentInputRef) {
      currentInputRef.addEventListener('input', handleInput);
    }

    return () => {
      if(currentInputRef)
        currentInputRef.removeEventListener('input', handleInput);
    };
  }, [
    inputRef,handleInputHeightChange
  ]);

  return (
    <div  className="flex w-full h-full justify-evenly items-center">
      <label htmlFor="fileUpload" className="cursor-pointer mb-2 h-10 self-end">
        
        <MdAttachFile size={38} className="text-neutral-300" />
      </label>
      <input type="file" id="fileUpload" className="hidden" accept="image/*" />
      <div  className="w-8/12 flex items-center ">
        <AutoResizingTextArea
          ref={inputRef}
          placeholder="Message..."
          className="w-full  bg-neutral-200  p-2 text-sm rounded-lg focus:outline-none placeholder:Text-neutral-400"
          minHeight={30}
          maxHeight={192}
        />
      </div>
      <button className="px-3 h-10 mb-2 w-2/12 text-neutral-800 bg-neutral-200 self-end rounded-full">
        Send
      </button>
    </div>
  );
};

export default MessageInput;
