'use client';
import React, { useCallback, useRef, useState } from 'react';
import Input from '@/components/login/Input';
import Button from '@/components/login/Button';
import SelectRole from '@/components/register/SelectRole';
import { SubmitHandler, set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ForgotPasswordSchema,
  ForgotSchemaType,
} from '@/models/Auth/ForgotPassword';
import { useRouter } from 'next/navigation';
import axiosBaseurl from '@/config/baseUrl';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/config/firebase';
const Register: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<ForgotSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const route = useRouter();

  const onSubmit: SubmitHandler<ForgotSchemaType> = async (data) => {
    // console.log("submit")
    // console.log(data)
    try {
      await sendPasswordResetEmail(auth, data.email, {
        url: 'http://localhost:3000/login',
      });
      setSuccess('Check your email to reset password');
      setError('');
    } catch (err: any) {
      console.log(err);
      setError(err.code.split('/')[1]);
      setSuccess('');
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-62px)] ">
      <form
        className="relative flex flex-col items-center rounded-xl bg-[#F6F6F6]
       w-[600px] h-[350px] py-6 shadow-lg justify-evenly"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-2xl font-bold text-green-900 flex flex-col">
          FORGOT PASSWORD
        </div>
        <div className="text-sm font-bold flex flex-col">
          We will sent reset password link to your email
        </div>
        <Input
          label="Email*"
          placeholder="Email"
          type="text"
          {...register('email', { required: true })}
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email?.message}</div>
        )}
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-500 text-sm">{success}</div>}
        <Button
          type="submit"
          className="hover:bg-green-700 hover:transition hover:ease-in-out"
        >
          <div className="text-white">Reset password</div>
        </Button>
      </form>
    </div>
  );
};

export default Register;
