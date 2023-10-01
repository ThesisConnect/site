'use client';
import Input from '@/components/login/Input';
import Button from '@/components/login/Button';
import { useRouter } from 'next/navigation';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { SubmitHandler, set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginSchemaType } from '@/models/Auth/Login';
import axiosBaseurl from '@/config/baseUrl';
import {
  signInWithEmailAndPassword,
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import useAuth from '@/hook/useAuth';
import Link from 'next/link';
import Modal from '@/components/ModelPopup';
const Login = () => {
  const router = useRouter();
  const { user, setUserNew: setUser, isLoading, isAuthenticated } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });
  // console.log('isAuthenticated:', isAuthenticated);
  if (!isLoading && isAuthenticated) {
    router.push('/mainPage');
    return;
  }
  const clickRegister = (event: MouseEvent<HTMLButtonElement>) => {
    // console.log("click")
    event.preventDefault();
    router.push('/register');
  };
  const handleCloseErrorModal = () => {
    setErrorMessage(null);
  };
  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    // console.log("submit")
    // console.log(data)
    try {
      setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (userCredential.user.emailVerified === false) {
        setErrorMessage('Please verify your email address');
        return;
      }
      const token = await userCredential.user.getIdToken();
      const resData = await axiosBaseurl.post(
        '/auth/login',
        { idToken: token },
        { withCredentials: true }
      );
      setUser(resData.data);
      // console.log("user:",user)
      if (resData.data.role) {
        router.push('/');
      }
    } catch (err: any) {
      console.log(err);
      let errCode;
      if (err.code === 'auth/user-not-found') {
        errCode = 'Sorry, we could not find your account. Please try again.';
      }
      setErrorMessage(
        errCode || err.code.split('/')[1] || err.message || 'An error occurred'
      );
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-62px)] ">
      <form
        className="relative flex flex-col items-center rounded-xl 
        bg-[#F6F6F6] w-[600px] h-[700px] py-6 shadow-lg justify-evenly"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-5xl font-bold text-green-900">Login</div>
        <Input
          label="Email*"
          placeholder="Email"
          type="text"
          {...register('email', { required: true })}
        />
        {errors.email && (
          <div className="text-red-500 text-sm ">{errors.email?.message}</div>
        )}
        <Input
          label="Password*"
          eye
          placeholder="password"
          {...register('password', { required: true })}
        />
        {errors.password && (
          <div className="text-red-500 text-sm">{errors.password?.message}</div>
        )}
        <div className="flex mt-2 w-10/12">
          <div>
            <label htmlFor="remember" className="flex">
              <input
                type="checkbox"
                id="remember"
                defaultChecked={true}
                {...register('rememberMe')}
              />
              <div className="ms-2 text-sm text-gray-400">Remember me</div>
            </label>
          </div>
          <div className="flex-grow"></div>
          <div className="text-sm text-gray-400 hover:underline">
            <Link href="/verify" className="cursor-pointer">
              Forgot password?
            </Link>
          </div>
        </div>
        <Button
          type="submit"
          className="hover:bg-green-700 hover:transition hover:ease-in-out "
        >
          <div className="text-white">Sign in</div>
        </Button>
        <div className="flex w-10/12 ">
          <hr className="border-solid border-black w-5/12  mt-2 " />
          <div className="text-sm text-gray-400 flex-grow text-center mx-1">
            Or
          </div>
          <hr className="border-solid border-black w-5/12 mt-2  " />
        </div>
        <Button
          type="button"
          color="bg-white"
          className="border border-[#A3A3A3] "
          onClick={clickRegister}
        >
          <div className="text-black">register</div>
        </Button>
      </form>
      <Modal
        show={!!errorMessage}
        onClose={handleCloseErrorModal}
        message={errorMessage || ''}
      />
    </div>
  );
};

export default Login;
