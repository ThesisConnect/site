"use client";
import Sidebar from "@/components/Sidebar";
import userStore from "@/stores/User";

const EditProfile = () => {
  const user = userStore((state) => state.user);
  return (
    <div className="flex relative flex-row ">
      <Sidebar />
      <div className="flex flex-col w-full items-center justify-center ">
        <div className="w-32">
          <h1>Edit Profile</h1>
          <div>Name: {user.surname}</div>
          <div>Surname: {user.name}</div>
          <div>Email: {user.email}</div>
          <div>Role: {user.role}</div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
