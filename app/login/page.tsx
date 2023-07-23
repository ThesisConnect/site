"use client";
import Input from "@/components/login/Input";
import Button from "@/components/login/Button";

const Login = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen ">
      <div
        className="relative flex flex-col items-center rounded-xl 
        bg-[#F6F6F6] w-[600px] h-[700px] py-6 shadow-lg justify-evenly"
      >
        <div className="text-5xl font-bold text-green-900">Login</div>
        <Input label="Username*" placeholder="username" type="text" />
        <Input label="Password*" eye placeholder="password" />
        <div className="flex mt-2 w-10/12">
          <div>
            <label htmlFor="remember" className="flex">
              <input type="checkbox" name="remember" id="remember" />
              <div className="ms-2 text-sm text-gray-400">Remember me</div>
            </label>
          </div>
          <div className="flex-grow"></div>
          <div className="text-sm text-gray-400">Forgot password?</div>
        </div>
        <Button type="submit">
          <div className="text-white">
            Sign in
          </div>
        </Button>
        <div className="flex w-10/12 ">
          
          <hr className="border-solid border-black w-5/12  mt-2 " />
          <div className="text-sm text-gray-400 flex-grow text-center mx-1">Or</div>
          <hr className="border-solid border-black w-5/12 mt-2 " />
        </div> 
        <Button type="button" color="bg-white" className="border border-[#A3A3A3] ">
          <div className="text-black">
            register
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Login;
