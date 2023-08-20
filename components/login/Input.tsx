"use client"
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import { InputHTMLAttributes, useCallback, useState } from "react";
import { twMerge } from 'tailwind-merge';
import React, { forwardRef,FC } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  eye?: boolean;
}
const InputText = forwardRef<HTMLInputElement, InputProps>(({ label, placeholder,eye=false,...props},ref) => {
  const [show, setShow] = useState<boolean>(false);
  const  handleShow = useCallback(() => {
    setShow((prev) => !prev);
  },[]);
  return (
    <div className="w-10/12 relative">
      
      <div className="text-xs">
        <label htmlFor="username">{label}</label>
        {eye && (
          <div className='w-full flex absolute'>
            <div className='flex-grow'>
            </div>
            {
              show ? (<AiFillEyeInvisible onClick={handleShow} className='text-xl translate-y-5 -translate-x-3 cursor-pointer'/>):
              (<AiFillEye onClick={handleShow} className='text-xl translate-y-5 -translate-x-3 cursor-pointer' />)
            }
          </div>
        )
        }
        <input
          ref={ref}
          className="rounded-md border border-solid border-[#949494] w-full h-14 ps-2"
          placeholder={`${placeholder}`}
          type={show ? "text" : "password"}
          {...props}
        />
        
      </div>
    </div>
  );
});

InputText.displayName = "InputText";

export default InputText;
