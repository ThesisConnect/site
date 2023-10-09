import { FC, useCallback } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import bytes from "bytes";

export interface TableMember {
  file: File;
}

interface TableComponentProps {
  table: TableMember[];
  onChange?: (table: TableMember[]) => void;
}

const TableInModal: FC<TableComponentProps> = ({ table = [], onChange }) => {
  const handleDelete = useCallback(
    (index: number) => {
      const newTable = table.filter((_, i) => i !== index);
      if (onChange) onChange(newTable);
    },
    [table, onChange]
  );
  return (
    <>
      <table className="w-full mt-10 '">
        <thead className="bg-neutral-200 h-[47px] ">
          <tr>
            <th className="w-2/5 rounded-l-md">File</th>
            <th className="w-2/5">Size</th>
            <th className="w-1/5 rounded-r-md">Delete</th>
          </tr>
        </thead>
        <tbody>
          {table?.map((item, index) => (
            <tr
              className={`bg-neutral-100 h-[40px] ${
                index === 0 ? 'rounded-t-md' : ''
              } ${index === table.length - 1 ? 'rounded-b-md' : ''}`}
              key={index}
            >
              <td
                className={`ps-5 ${index === 0 ? 'rounded-tl-md' : ''} ${
                  index === table.length - 1 ? 'rounded-bl-md' : ''
                } text-center`}
              >
                {item?.file?.name}
              </td>
              <td className="text-center">{item?.file && bytes(item.file.size)}</td>
              <td
                className={`flex items-center h-[40px] justify-center ${
                  index === 0 ? '' : ''
                } ${index === table.length - 1 ? 'rounded-br-md' : ''}`}
              >
                  <RiDeleteBin6Line
                    onClick={() => handleDelete(index)}
                    size={20}
                    className="text-red-400 cursor-pointer"
                  />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default TableInModal;
