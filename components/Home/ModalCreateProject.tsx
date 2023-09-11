"use client"
import { FC, useState } from 'react';
import InputText from '../login/Input';
import AutoResizingTextArea from '../AutoResizingTextArea';
import { RiDeleteBin6Line } from 'react-icons/ri';
import SelectRole from './selectRole';

interface ModalCreateProjectProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateProject: FC<ModalCreateProjectProps> = ({
  isOpen,
  onClose,
}) => {
  const [table,setTable] = useState([])

  
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 flex-col  bg-black bg-opacity-50">
      <div className="bg-white rounded-lg  flex flex-col w-7/12 h-[75%]  items-center">
        <div className="border-b-[1px] w-full border-teal-800 h-[10%] flex items-center ps-10  font-semibold text-neutral-800">
          Create project
        </div>
        <div className="flex h-full w-full px-10 flex-col overflow-y-scroll ">
          <AutoResizingTextArea
            minHeight={56}
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
              <SelectRole  className='text-neutral-800 py-1 me-2 rounded-full px-8 translate-y-[64px] z-20'/>
              <button className="bg-neutral-200 text-neutral-800 py-1 me-2 rounded-full px-8 translate-y-[64px] z-20 ">
                Add
              </button>
            </div>
            <InputText
              label="Add member"
              placeholder="Email"
              classNameLabel="text-base mt-8"
              width="w-full"
              className="border-neutral-400 border placeholder:text-base"
            />
          </div>
          <div>
            <table className="w-full mt-10 '">
              <thead className='bg-neutral-200 h-[47px] '>
                <tr>
                  <th className='w-2/5 rounded-l-md'>Email</th>
                  <th className='w-2/5'>Member type</th>
                  <th className='w-1/5 rounded-r-md'></th>
                </tr>
              </thead>
              <tbody>
                <tr className='bg-neutral-100 h-[40px]'>
                  <td className='ps-5 rounded-tl-md'>pax@email.com</td>
                  <td className='text-center'>Advisor</td>
                  <td className='flex items-center h-[40px] justify-center'><RiDeleteBin6Line size={20} className='text-red-400'/></td>

                </tr>
                <tr className='bg-neutral-100 h-[40px]'>
                  <td className='ps-5 '>pax2@email.com</td>
                  <td className='text-center'>co_advisor</td>
                  <td className='flex items-center h-[40px] justify-center'><RiDeleteBin6Line size={20} className='text-red-400'/></td>
                </tr>
                
                <tr className='bg-neutral-100 h-[40px]'>
                  <td className='ps-5 '>pax2@email.com</td>
                  <td className='text-center'>co_advisor</td>
                  <td className='flex items-center h-[40px] justify-center'><RiDeleteBin6Line size={20} className='text-red-400'/></td>
                </tr>
                <tr className='bg-neutral-100 h-[40px]'>
                  <td className='ps-5  rounded-bl-md'>pax3@email.com</td>
                  <td className='text-center'>Advisee</td>
                  <td className='flex items-center h-[40px] justify-center rounded-br-md'><RiDeleteBin6Line  size={20} className='text-red-400'/></td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
        <div className='h-[10%] self-end mx-10'>
          <button
            className="bg-neutral-300 rounded-full px-10 py-2"
            onClick={onClose}
          >
            cancel
          </button>
          <button
            className="bg-neutral-300 rounded-full ms-2 px-10 py-2"
            type='submit'
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateProject;
