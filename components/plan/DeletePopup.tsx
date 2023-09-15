// components/Modal.tsx
import React from 'react';
import axiosBaseurl from '@/config/baseUrl';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
  name: string;
  id: string;
}

const DeletePopup: React.FC<ModalProps> = ({
  show,
  onClose,
  name,
  id,
  onSuccess,
}) => {
  if (!show) return null;
  
  const onDelete = async () => {
    console.log("Begin Delete")
    try {
      const resData = await axiosBaseurl.delete(`/plan/delete/${id}`)
      console.log("delete success")
      onSuccess()
      onClose()
    }
    catch (err: any) {
      console.log(err);
      onClose()
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center z-50 flex-col items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-t-lg  p-3 w-96 h-32 flex flex-col  justify-evenly items-center">
        <h2 className='font-bold'>
          Delete Plan
        </h2>
        <div className='flex gap-1'>
          <p className="text-center text-sm ">Are you sure you want to delete</p>
          <p className="text-center text-sm font-semibold">{name}</p>
          <p className="text-center text-sm ">?</p>
        </div>
      </div>
      <div className='flex flex-row w-96'>
        <button
          className="bg-neutral-300 rounded-bl-lg w-[50%] h-10 hover:bg-neutral-200 hover:transition hover:ease-in-out"
          onClick={onClose}
        >
          cancel
        </button>
        <button
          className="bg-red-500 rounded-br-lg w-[50%] h-10 text-white hover:bg-red-400 hover:transition hover:ease-in-out"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>

    </div>
  );
};

export default DeletePopup;
