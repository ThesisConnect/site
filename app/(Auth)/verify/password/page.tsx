"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Input from "@/components/login/Input";
import Button from "@/components/login/Button";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordSchema,
  ResetSchemaType,
} from "@/models/Auth/ForgotPassword";
import { useRouter } from "next/navigation";
import { applyActionCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useSearchParams } from "next/navigation";
const Register: React.FC = () => {
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("resetPassword" as const);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const route = useRouter();

  const onSubmit: SubmitHandler<ResetSchemaType> = async (data) => {
    try {
      const oobCode = searchParams.get("oobCode") as string;
      await confirmPasswordReset(auth, oobCode, data.password);
      setSuccess(true);
      reset();
    } catch (err: any) {
      setSuccess(false);
    }
  };
  useEffect(() => {
    if (searchParams.get("oobCode") === null) {
      route.push("/login");
    } else if (searchParams.get("mode") === "verifyEmail") {
      setMode("verifyEmail");
    }
  }, [route, searchParams]);
  if (mode === "verifyEmail") {
    return (
      <div className="flex justify-center items-center w-full h-screen ">
        <form
          className="relative flex flex-col items-center rounded-xl bg-[#F6F6F6]
       w-[600px] h-[350px] py-6 shadow-lg justify-evenly"
          onSubmit={async () => {
            const oobcode = searchParams.get("oobCode") as string;
            await applyActionCode(auth, oobcode);
            route.push("/login");
          }}
        >
          <div className="text-2xl font-bold text-green-900 flex flex-col">
            {success ? "Verify email success" : "Verify email"}
          </div>
          <Button
            type="submit"
            className="hover:bg-green-700 hover:transition hover:ease-in-out"
          >
            <div className="text-white">Verify</div>
          </Button>
        </form>
      </div>
    )}
  else if (mode === "resetPassword"){
    return (
      <div className="flex justify-center items-center w-full h-screen ">
        <form
          className="relative flex flex-col items-center rounded-xl bg-[#F6F6F6]
       w-[600px] h-[350px] py-6 shadow-lg justify-evenly"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-2xl font-bold text-green-900 flex flex-col">
            {success ? "Reset password success" : "Reset password"}
          </div>
          {!success && (
            <Input
              label="newPassword*"
              placeholder="newPassword"
              eye
              {...register("password", { required: true })}
            />
          )}
          {errors.password && (
            <div className="text-red-500 text-sm">
              {errors.password?.message}
            </div>
          )}
          {!success && (
            <Button
              type="submit"
              className="hover:bg-green-700 hover:transition hover:ease-in-out"
            >
              <div className="text-white">Reset password</div>
            </Button>
          )}
          {success && (
            <Button
              type="button"
              className="hover:bg-green-700 hover:transition hover:ease-in-out"
              onClick={() => route.push("/login")}
            >
              <div className="text-white">Sign in</div>
            </Button>
          )}
        </form>
      </div>
    )}
  else 
      return <></>
};

export default Register;
