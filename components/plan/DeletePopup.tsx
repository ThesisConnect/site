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

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const onDelete = async () => {
    setIsLoading(true);
    console.log("Begin Delete")
    try {
      const resData = await axiosBaseurl.delete(`/plan/delete/${id}`)
      console.log("delete success")
      setIsLoading(false);
      onSuccess()
      onClose()
    }
    catch (err: any) {
      console.log(err);
      setIsLoading(false);
      onClose()
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center z-50 flex-col items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-t-lg  p-3 w-96 h-32 flex flex-col  justify-evenly items-center">
        <h2 className='font-bold'>
          Delete Plan
        </h2>
        {isLoading ? (
          <div className='flex gap-1'>
            <div
              className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-teal-800 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">
            </div>
            <p className="text-center text-sm ">Deleting</p>
            <p className="text-center text-sm font-semibold">{name}</p>
            <p className="text-center text-sm "></p>
          </div>
        ) : (
          <div className='flex gap-1'>
            <p className="text-center text-sm ">Are you sure you want to delete</p>
            <p className="text-center text-sm font-semibold">{name}</p>
            <p className="text-center text-sm ">?</p>
          </div>
        )}

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
