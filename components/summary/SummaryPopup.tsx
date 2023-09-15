// components/Modal.tsx
'use client';
import React, { useCallback, useRef, useState, MouseEvent, useEffect } from 'react';
import { PlanEditSchema, PlanEditSchemaType } from '@/models/Auth/Plan';
import { BsCheckSquare, BsCheckSquareFill, BsCalendarEvent } from "react-icons/bs";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import axiosBaseurl from '@/config/baseUrl';
import { DateTime } from 'luxon';
import Button from '../login/Button';


interface DataPlan {
  show: boolean;
  onClose: () => void;
  comment: string;
}

const SummaryPopup: React.FC<DataPlan> = (
  {
    show,
  }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PlanEditSchemaType>({
    resolver: zodResolver(PlanEditSchema),
  });

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center z-40 flex-col items-center bg-black bg-opacity-50 cursor-default">
      <form className=" bg-white rounded-lg w-[50%] h-[70%] flex flex-col">
        
      </form>

    </div>
  );
};

export default SummaryPopup;
