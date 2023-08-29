"use client";
import React, { useCallback, useRef, useState } from "react";
import Input from "@/components/login/Input";
import Button from "@/components/login/Button";
import SelectRole from "@/components/register/SelectRole";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterSchemaType } from "@/models/Register";
import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, setPersistence } from "firebase/auth";
import {auth } from '@/config/firebase';
import  axiosBaseurl  from '@/config/baseUrl';
import userStore, { userAtom } from "@/stores/User";
import { useRouter } from "next/navigation";
const Register: React.FC = () => {
  const { register, handleSubmit, getValues,control,formState: { errors } } = useForm<RegisterSchemaType>(
    {
      resolver: zodResolver(RegisterSchema),
    }
  )
  const route = useRouter()
  const confirmPassword = useRef<HTMLInputElement>(null)
  const [show , setShow] = useState<boolean>(false)
  const  handleShow = useCallback(() => {
    setShow((prev) => !prev);
  },[]);
  const setUser = userStore((state) => state.setUser)
  const checkConfirmPassword = () => {
    if(getValues("password") !== confirmPassword.current?.value){
      setShow(true)
    }else{
      handleShow()
    }
  }
  const onSubmit:SubmitHandler<RegisterSchemaType> = async (data) => {
    // console.log("submit")
    //console.log(data)
    try{
      setPersistence(auth, browserSessionPersistence)
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
      const token = await userCredential.user.getIdToken()
      const sendData ={
        idToken:token,
        name:data.name,
        surname:data.surname,
        username:data.username,
        role:data.role,
      }
      const resData = await axiosBaseurl.post('/auth/register',sendData, {withCredentials: true})
      setUser(resData.data)
      // console.log(resData.data)
      if(resData.data.isAuthenticated){
        route.push('/')
      }
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="flex justify-center items-center w-full h-screen ">
      <form className="relative flex flex-col items-center rounded-xl bg-[#F6F6F6]
       w-[600px] h-[700px] py-6 shadow-lg justify-evenly" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-5xl font-bold text-green-900 flex flex-col">
          Register
        </div>
        <div className="flex flex-row w-10/12 justify-center gap-x-2 ">
          <Input label="Name*" placeholder="Name" type="text"  width="w-6/12" {...register("name",{required:true})} />
          
          <Input label="Surname*" placeholder="Surname" type="text" width="w-6/12" {...register("surname",{required:true})}/>
         
        </div>
          {
            errors.name && <div className="text-red-500 text-sm">{errors.name?.message}</div>
          }
          {
            errors.surname && <div className="text-red-500 text-sm">{errors.surname?.message}</div>
          }
        <div className="flex flex-row w-10/12 justify-center gap-x-2">
          <Input label="Username*" placeholder="Username" type="text"  width="w-6/12"{...register("username",{required:true})}/>
         
          <SelectRole label="Role*" placeholder="Select a role" width="w-6/12"  control={control} />
        </div>
        {
            errors.username && <div className="text-red-500 text-sm">{errors.username?.message}</div>
          }
          {
            errors.role && <div className="text-red-500 text-sm">{errors.role?.message}</div>
          }
        <Input label="Email*" placeholder="Email" type="text" {...register("email",{required:true})}/>
        {
          errors.email && <div className="text-red-500 text-sm">{errors.email?.message}</div>
        }
        <Input label="Password*" eye placeholder="Password" {...register("password",{required:true})}  />
        {
          errors.password && <div className="text-red-500 text-sm">{errors.password?.message}</div>
        }
        <Input
          label="Confirm Password*"
          eye
          placeholder="Confirm Password"
          ref = {confirmPassword}
          onChange={checkConfirmPassword}
        />
        {
          show && <div className="text-red-500 text-sm">Password does not match</div>
        }
        <Button
          type="submit"
          className="hover:bg-green-700 hover:transition hover:ease-in-out"
        >
          <div className="text-white">Register</div>
        </Button>
      </form>
    </div>
  );
};

export default Register;
