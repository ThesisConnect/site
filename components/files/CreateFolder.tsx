import { useState,useRef, useEffect, useCallback } from 'react';
import { FcFolder } from 'react-icons/fc';
import { FC } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { mutate } from 'swr';
import axiosBaseurl from '@/config/baseUrl';
interface CreateFolderProps {
  onCreate?: (name: string) => void;
  onClose?: () => void;
}

export const CreateFolder: FC<CreateFolderProps> = ({ onCreate,onClose }) => {
  const [name, setName] = useState<string>('');
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const params = useParams();
  const handleSubmit = useCallback(async() => {
    if (name) {
       await axiosBaseurl.post('/folder/create', {
        name,
        parent: params.folderID[params.folderID.length - 1],
      });
      onCreate && onCreate(name);
      mutate(`/folder/${params.folderID[params.folderID.length - 1]}`);
      onClose?.()
    }
  }, [name, onCreate,onClose,params.folderID]);
  useEffect(() => {
    nameInputRef.current?.focus();
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }else if (event.key === 'Enter') {
        handleSubmit();
      }
    };
    document.addEventListener('keydown', handleEscapePress);
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleEscapePress);
    };

  }, [onClose,handleSubmit]);
  return (
    <div className="h-10 flex">
      <div className="w-1/5 flex items-center">
        <div className="w-2/5 flex justify-end me-4">
          <FcFolder size={35} />
        </div>
        <div className="w-3/5">
          <input 
            ref={nameInputRef}
            className="border rounded p-1 w-full"
            placeholder="Folder Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="w-1/5 flex justify-center items-center">
        
      </div>
      <div className="w-1/5 flex justify-center items-center"></div>
      <div className="w-1/5 flex justify-center items-center">
        
      </div>
      <div className="w-1/5 flex justify-center gap-4 items-center">
        <button className="px-2 py-1 bg-neutral-400 hover:bg-neutral-500  ease-in-out 
        duration-150 hover:scale-105 text-white rounded" 
        onClick={onClose}>
          Cancel
        </button>
        <button className="px-2 py-1 bg-teal-600 hover:bg-teal-700 
        ease-in-out duration-150 hover:scale-105 transform
         text-white rounded" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateFolder;
