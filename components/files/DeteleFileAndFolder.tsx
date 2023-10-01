// components/Modal.tsx
import React from 'react';
import axiosBaseurl from '@/config/baseUrl';
import useProject from '@/hook/useProject';
import { useParams } from 'next/navigation';
import fileStore, { Item } from '@/stores/Files';
import { mutate } from 'swr';
import { deleteFile } from '@/utils/managefile';
interface ModalProps {
  show: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  dataFileOrFolder: Item;
  deleteType: 'file' | 'folder';
}

const DeleteFileAndFolderPopup: React.FC<ModalProps> = ({
  show,
  onClose = () => {},
  onSuccess = () => {},
  dataFileOrFolder,
  deleteType,
}) => {
  const params = useParams();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const deleteFileFromStore = fileStore((state) => state.deleteFileFromStore);
  if (!show) return null;

  const onDelete = async () => {
    setIsLoading(true);
    try {
      const resData = await axiosBaseurl.delete(
        `/file/delete/${dataFileOrFolder._id}`,
        {
          params: {
            parent_id: params.folderID as string,
          },
        }
      );
      // deleteFileFromStore(dataFileOrFolder._id)
      deleteFile(dataFileOrFolder.name, dataFileOrFolder._id);
      await mutate(`/folder/${params.folderID[params.folderID.length - 1]}`);
      setIsLoading(false);
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
          'bg-white rounded-t-lg overflow-y-scroll p-3 w-96 min-h-[10rem] max-h-80 flex flex-col  justify-evenly items-center' +
          (isLoading ? ' rounded-lg' : '')
        }
      >
        <h2 className="font-bold">Delete {deleteType}</h2>
        {isLoading ? (
          <div className="flex gap-2 justify-center items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-red-400" />
            <p>Deleting {deleteType}</p>
          </div>
        ) : (
          <div className="flex gap-1 flex-col">
            <p className="text-center text-sm ">
              Are you sure you want to delete{' '}
              {deleteType === 'file' ? 'file' : 'folder'}{' '}
            </p>
            <p className="text-center text-sm font-semibold">
              {dataFileOrFolder.type === 'folder'
                ? `
              ${dataFileOrFolder.name} and all its content?`
                : dataFileOrFolder.name + ' ?'}{' '}
            </p>
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

export default DeleteFileAndFolderPopup;
