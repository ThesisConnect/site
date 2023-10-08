// components/Modal.tsx
import React from 'react';
import axiosBaseurl from '@/config/baseUrl';
import useProject from '@/hook/useProject';

interface ModalProps {
  show: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  name: string;
  id: string;
}

const DeletePopup: React.FC<ModalProps> = ({
  show,
  onClose = () => {},
  name,
  id,
  onSuccess = () => {},
}) => {
  const { deleteProject } = useProject();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  if (!show) return null;

  const onDelete = async () => {
    setIsLoading(true);
    try {
      const resData = await axiosBaseurl.delete(`/project/delete/${id}`);
      deleteProject(id);
      setIsLoading(false);
      //console.log('delete success');
      onSuccess();
      onClose();
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center z-50 flex-col items-center bg-black bg-opacity-50">
      <div
        className={
          'bg-white rounded-t-lg  p-3 w-96 h-32 flex flex-col  justify-evenly items-center' +
          (isLoading ? ' rounded-lg' : '')
        }
      >
        <h2 className="font-bold">Delete Project</h2>
        {isLoading ? (
          <div className="flex gap-2 justify-center items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-red-400" />
            <p>Deleting project {name}</p>
          </div>
        ) : (
          <div className="flex gap-1">
            <p className="text-center text-sm ">
              Are you sure you want to delete
            </p>
            <p className="text-center text-sm font-semibold">{name}</p>
            <p className="text-center text-sm ">?</p>
          </div>
        )}
      </div>
      {!isLoading && (
        <div className="flex flex-row w-96">
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
      )}
    </div>
  );
};

export default DeletePopup;
