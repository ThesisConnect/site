import { TableFile } from '@/app/mainPage/[project]/detail/page';
import { v4 } from 'uuid';

interface FileProp {
  files: TableFile[];
}

const FileSummary: React.FC<FileProp> = ({ files }) => {
  //console.log(files);
  if (files.length == 0)
    return (
      <div className="w-[120px] flex h-[27px] border border-teal-800 rounded-full bg-neutral-100 px-3  justify-center items-center text-sm scroll-ml-6 snap-start">
        <div className="truncate overflow-hidden">No attach file</div>
      </div>
    );
  return files.slice(0, 2).map((fileName) => (
    <div
      className="w-[100px] flex h-[27px] border border-teal-800 rounded-full bg-neutral-100 px-3  justify-center items-center text-sm scroll-ml-6 snap-start"
      key={v4()}
    >
      <div className="truncate overflow-hidden">{fileName.name}</div>
    </div>
  ));
};

export default FileSummary;
