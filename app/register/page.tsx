  import React from "react";
  import Input from "@/components/login/Input";
  import Button from "@/components/login/Button";

  const Register: React.FC = () => {
    return (
      <div className="flex justify-center items-center w-full h-screen ">
        <div className="relative flex flex-col items-center rounded-xl bg-[#F6F6F6] w-[600px] h-[700px] py-6 shadow-lg justify-evenly">
          <div className="text-5xl font-bold text-green-900">Register</div>
          
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <Input label="Name*" placeholder="Name" type="text" />
              <Input label="Surname*" placeholder="Surname" type="text" />
            </div>
            <div className="flex space-x-2">
            <Input label="Username*" placeholder="Username" type="text" />
            <Input label="Role*" placeholder="Role" type="text" />
            </div>
            <div className="flex space-x-2">
              <Input label="Email*" placeholder="Email" type="text" />
            </div>
            <Input label="Password*" eye placeholder="Password" type="password" />
            <Input
              label="Confirm Password*"
              eye
              placeholder="Confirm Password"
              type="password"
            />
            
            <Button
              type="submit"
              className="hover:bg-green-700 hover:transition hover:ease-in-out"
            >
              <div className="text-white">Register</div>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  export default Register;
