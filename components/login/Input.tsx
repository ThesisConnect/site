'use client';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { InputHTMLAttributes, useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import React, { forwardRef, FC } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  eye?: boolean;
  width?: string;
  className?: string;
  disabled?: boolean;
  classNameLabel?: string;
}
const InputText = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      width = 'w-10/12',
      placeholder,
      classNameLabel,
      className,
      disabled,
      eye = false,
      ...props
    },
    ref
  ) => {
    const [show, setShow] = useState<boolean>(false);
    const handleShow = useCallback(() => {
      setShow((prev) => !prev);
    }, []);
    return (
      <div className={`${width} relative`}>
        <div className="text-xs">
          <label className={disabled ? 'opacity-50' : ''}>
            <div className={classNameLabel}>{label}</div>
            {eye && (
              <div className="w-full flex absolute">
                <div className="flex-grow"></div>
                {show ? (
                  <AiFillEyeInvisible
                    onClick={handleShow}
                    className="text-xl translate-y-5 -translate-x-3 cursor-pointer"
                  />
                ) : (
                  <AiFillEye
                    onClick={handleShow}
                    className="text-xl translate-y-5 -translate-x-3 cursor-pointer"
                  />
                )}
              </div>
            )}
            <input
              ref={ref}
              id={label}
              className={cn(
                'rounded-md border border-solid border-[#949494] w-full h-14 ps-2 ',
                className
              )}
              placeholder={`${placeholder}`}
              type={show ? 'text' : 'password'}
              {...props}
            />
          </label>
        </div>
      </div>
    );
  }
);

InputText.displayName = 'InputText';

export default InputText;
