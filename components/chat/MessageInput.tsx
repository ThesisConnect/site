"use client"
import { MdAttachFile } from 'react-icons/md';
import AutoResizingTextArea from '../AutoResizingTextArea';
import { ChangeEvent, FC,  useEffect,  useLayoutEffect, useRef, useState } from 'react';
import uploadFileToFirebase from '@/utils/uploadfile';
import { mutate } from 'swr';
import { useSearchParams } from 'next/navigation';
interface contents {
  file:File,
  url:string,
  path:string,
  uid:string
}
interface MessageInputProps {
  handleInputHeightChange?: (newHeight: number) => void;
  onClickSend?: (data:string|contents) => void;
}

const MessageInput:FC<MessageInputProps> = ({
  handleInputHeightChange = () => {},
  onClickSend=()=>{}
}) => {
  // const [inputHeight, setInputHeight] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [File, setFile] = useState<File|null>(null);
  const [isloading, setIsloading] = useState(false);
  const searchParams = useSearchParams();
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
  const handleClickSend = async() => {
    // console.log(inputValue)
    if(inputValue.trim()==="") return;
    if(inputValue==='Transferring...') return;
    if (inputValue||File) {
      if(File){
        setIsloading(true);
        setInputValue('Transferring...');
        const [url ,path,uid] = await uploadFileToFirebase(File);
        setIsloading(false);
        setFile(null);
        setInputValue(File.name);
        onClickSend({file:File,url,path,uid});
        setInputValue('');
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
      else{
        onClickSend(inputValue);
        setInputValue('');
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    }


  }
  const handleFileUpload = async(e:ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      console.log(e.target.files)
      setFile(e.target.files[0]);
      const [url ,path,uid] = await uploadFileToFirebase(e.target.files[0]);
      setInputValue(e.target.files[0].name)
      return {url,path,uid}

    }
  }
  
  return (
    <div  className="flex w-full h-full justify-evenly items-center">
      <label htmlFor="fileUpload" className="cursor-pointer mb-2 h-10 self-end">
        
        <MdAttachFile size={38} className="text-neutral-300" />
      </label>
      <input type="file" id="fileUpload" className="hidden" onChange={handleFileUpload} />
      <div  className="w-8/12 flex items-center self-end mb-2 ">
        <AutoResizingTextArea
          ref={inputRef}
          placeholder="Message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full  bg-neutral-200  p-2 text-sm rounded-lg 
          focus:outline-none placeholder:Text-neutral-400"
          minHeight={30}
          maxHeight={192}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleClickSend();
            }
          }}
        />
      </div>
      <button className="px-3 h-10 mb-2 w-2/12 text-neutral-800
       bg-neutral-200 self-end rounded-full"
       onClick={handleClickSend}
      disabled={isloading}
       >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
