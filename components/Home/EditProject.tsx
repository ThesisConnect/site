'use client';
import {
  FC,
  useCallback,
  useRef,
  useState,
  forwardRef,
  MouseEvent,
  ButtonHTMLAttributes,
  useEffect,
} from 'react';
import InputText from '../login/Input';
import AutoResizingTextArea from '../AutoResizingTextArea';
import { RiDeleteBin6Line } from 'react-icons/ri';
import SelectRole, { SelectRoleRef } from './selectRole';
import { checkEmail } from '@/utils/schemaEmail';
import { checkSchemaCreateProject } from '@/models/Project/createNewProject';
import { set, max } from 'lodash';
import { create } from 'zustand';
import useProject from '@/hook/useProject';
import userStore from '@/stores/User';
import {IProject, IUserInProject} from '@/stores/Project';
import axiosBaseurl from "@/config/baseUrl";

interface EditProjectProps {
  isOpen: boolean;
  onClose: () => void;
  project: IProject;
}
interface TableMember {
  email: string;
  role: 'Co_advisor' | 'Advisee' | 'Advisor';
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
            <th className="w-2/5 rounded-l-md">Email</th>
            <th className="w-2/5">Member type</th>
            <th className="w-1/5 rounded-r-md"></th>
          </tr>
        </thead>
        <tbody>
          {table.map((item, index) => (
            <tr
              className={`bg-neutral-100 h-[40px] ${
                index === 0 ? 'rounded-t-md' : ''
              } ${index === table.length - 1 ? 'rounded-b-md' : ''}`}
              key={index}
            >
              <td
                className={`ps-5 ${index === 0 ? 'rounded-tl-md' : ''} ${
                  index === table.length - 1 ? 'rounded-bl-md' : ''
                }`}
              >
                {item.email}
              </td>
              <td className="text-center">{item.role}</td>
              <td
                className={`flex items-center h-[40px] justify-center ${
                  index === 0 ? '' : ''
                } ${index === table.length - 1 ? 'rounded-br-md' : ''}`}
              >
                {item.role !== 'Advisor' && (
                  <RiDeleteBin6Line
                    onClick={() => handleDelete(index)}
                    size={20}
                    className="text-red-400 cursor-pointer"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const EditProject: FC<EditProjectProps> = ({ isOpen, onClose, project }) => {
  const [error, setError] = useState('');
  const user = userStore((state) => state.user);
  const [isLoad, setIsLoad] = useState(false);
  const [table, setTable] = useState<TableMember[]>(() => {
    if (project) {
      const advisee: TableMember[] = project.advisee.map((item) => ({
        email: item.email,
        role: 'Advisee',
      }));
      const co_advisor: TableMember[] = project.co_advisors.map((item) => ({
        email: item.email,
        role: 'Co_advisor',
      }));
      const advisor: TableMember[] = project.advisors.map((item) => ({
        email: item.email,
        role: 'Advisor',
      }));
      return [...advisor, ...co_advisor, ...advisee];
    }
    return [];
  });
  const [createLoading, setCreateLoading] = useState(false);
  const { updateProject } = useProject();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleAddMember = async () => {
    const email = emailInputRef.current?.value;
    if (email) {
      
      const data = checkEmail(email);
      //console.log(data);
      if (table.some((item) => item.email === email)) {
        setError(`Email ${email} already exists in the table`);
        return;
      } else if (data.email) {
        setIsLoad(true);
        try {
            const dataUser = (await axiosBaseurl.get(`/user/email/${email}`)).data as IUserInProject;
            setError('');
            setTable([...table, { email, role: (dataUser.role==='advisor')?'Co_advisor':'Advisee' }]);
            setIsLoad(false);
        }catch (e: any){
            setError(e.message);
            setIsLoad(false);
        }
      } else {
        setError(data.error);
      }
    }
  };

  const handleSummit = (e: MouseEvent<HTMLFormElement>) => {
    setCreateLoading(true);
    e.preventDefault();
    const projectName = textAreaRef.current?.value;
    if (projectName) {
      const checkData = checkSchemaCreateProject({
        projectName,
        userInProject: [...table],
      });
      if (checkData.data) {
        // console.log(checkData.data);
        setError('');
        const formatData = {
          name: projectName,
          advisors: [] as string[],
          co_advisors: [] as string[],
          advisee: [] as string[],
        };
        for (const user of checkData.data.userInProject) {
          if (user.role === 'Advisor') {
            formatData.advisors.push(user.email);
          } else if (user.role === 'Co_advisor') {
            formatData.co_advisors.push(user.email);
          } else if (user.role === 'Advisee') {
            formatData.advisee.push(user.email);
          }
        }
        updateProject(
          {
            ...formatData,
            id: project._id,
            status: project.status,
            progress: project.progress,
          },
          project._id
        )
          .then(() => {
            console.log('edit success');
            setCreateLoading(false);
            onClose();
          })
          .catch((err) => {
            if(err.response.data.message||err.message)
              setError(err.response.data.message||err.message);
            else
              setError('Something went wrong');
            setIsLoad(false);
          });
        // onClose();
      } else {
        setCreateLoading(false);
        setError(checkData.error);
      }
    }
  };
  // useEffect(() => {
  //   if (isOpen) {
  //     setError('');
  //     setTable([]);
  //     emailInputRef.current?.focus();
  //   }
  // }
  // , [isOpen]);
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 flex-col  bg-black bg-opacity-50">
      {createLoading ? (
        <div className="bg-white rounded-lg  flex flex-col w-7/12 h-[75%]  items-center">
          <div className="border-b-[1px] w-full border-teal-800 h-[10%] flex items-center ps-10  font-semibold text-neutral-800">
            Edit project
          </div>
          <div className="flex h-full w-full px-10 flex-row justify-center items-center overflow-y-scroll ">
            <div className="w-16 h-16 border-t-4 border-teal-400 border-solid rounded-full animate-spin"></div>
            <div className="text-center text-2xl ms-5 font-semibold text-neutral-800">
              Edit project {project.name}
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSummit}
          className="bg-white rounded-lg  flex flex-col w-7/12 h-[75%]  items-center"
        >
          <div className="border-b-[1px] w-full border-teal-800 h-[10%] flex items-center ps-10  font-semibold text-neutral-800">
            Edit project
          </div>
          <div className="flex h-full w-full px-10 flex-col overflow-y-scroll ">
            <AutoResizingTextArea
              ref={textAreaRef}
              defaultValue={project.name}
              minHeight={56}
              maxHeight={150}
              classNameLabel="text-base mt-10"
              label="Project name*"
              placeholder="Project name"
              className="border
             border-neutral-400 rounded-lg text-base py-[17px]
             ps-2
             "
            />
            <div className="relative flex">
              <div className="absolute flex w-full">
                <div className="flex-grow" />
                {isLoad && (
                    <div className="translate-y-[64px] z-20">
                      <div className="w-10 h-10 border-t-4 border-teal-400 border-solid rounded-full   animate-spin"/>
                    </div>
                )}
                <button
                  className="bg-neutral-200 text-neutral-800 py-1 mx-2 h-10
               rounded-full px-8 translate-y-[64px] z-20 "
                  type="button"
                  onClick={handleAddMember}
                >
                  Add
                </button>
              </div>
              <InputText
                label="Add member"
                placeholder="Email"
                classNameLabel="text-base mt-8"
                width="w-full"
                className="border-neutral-400 border text-base placeholder:text-base"
                ref={emailInputRef}
                type="text"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div>
              <TableInModal table={table} onChange={setTable} />
            </div>
          </div>
          <div className="h-[10%] self-end mx-10">
            <button
              className="bg-neutral-300 rounded-full px-10 py-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-neutral-300 rounded-full ms-2 px-10 py-2"
              type="submit"
            >
              Edit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProject;
