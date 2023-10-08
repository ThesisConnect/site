'use client';
import Sidebar from '@/components/Sidebar';

import { useCallback, useRef, useState } from 'react';
import Input from '@/components/login/Input';
import { useAuth } from '@/hook/useAuth';
import axiosBaseurl from '@/config/baseUrl';
import { auth, storage } from '@/config/firebase';
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from '@firebase/storage';
import { v4 as uuid4 } from 'uuid';
import { extractFilenameFromURL } from '@/utils/extractFilenameFromURL';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import Profile from '../../components/Profile';
import { mutate } from 'swr';
import {
  EditProfileSchema,
  EditProfileSchemaType,
} from '@/models/Auth/Editprofile';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ProtectedPage from '@/components/ProtectedPage';
import useProjectStore from '@/stores/Project';
import CardProject from '@/app/editprofile/components/CardProject';

const ShowProFile = () => {
  const route = useRouter();
  const { user, clearUser } = useAuth();
  const project = useProjectStore((state) => state.project);
  const [edit, setEdit] = useState<boolean>(false);
  const logout = async () => {
    console.log('logout');
    const res = await axiosBaseurl.get('/auth/logout', {
      withCredentials: true,
    });
    signOut(auth);
    sessionStorage.clear();
    if (res.status === 200) {
      clearUser();
      route.push('/login');
      mutate('/auth/checkAuth', null, false);
    }
  };
  return (
    <>
      {edit ? (
        <EditProfile
          onCancel={() => setEdit(false)}
          onSave={() => setEdit(false)}
        />
      ) : (
        <div className="flex relative flex-row">
          <Sidebar />
          <div className="flex flex-col w-full   ">
            <div className="flex items-center ps-5 text-lg  h-16 font-semibold">
              My Profile
            </div>
            <div className="mx-10 bg-neutral-100 h-full px-5 py-10 flex justify-center ">
              <div className="w-2/12 flex flex-col">
                <div className={'w-full flex py-5 justify-center '}>
                  <Profile user={user} width="120" />
                </div>
                <div className="flex justify-center  items-center">
                  <button
                    className="bg-neutral-200 h-10 px-5 rounded-full hover:bg-neutral-300 ease-in-out duration-150 hover:scale-[102%]  "
                    type="button"
                    onClick={logout}
                  >
                    logout
                  </button>
                </div>
              </div>
              {/*section2*/}
              <div className="flex flex-col w-8/12 h-full ">
                <div className="flex h-1/4 ">
                  <div className="flex flex-col me-5 ">
                    <div className="font-bold text-teal-800 text-[20px] mb-2 ">
                      {user.name}
                    </div>
                    <div className="flex flex-col text-base text-neutral-400 h-4/5 justify-around">
                      <span>Role</span>
                      <span>Username</span>
                      <span>Email</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold text-teal-800 text-[20px] mb-2">
                      {user.surname}
                    </div>
                    <div className="flex flex-col text-base text-neutral-800 h-4/5 justify-around">
                      <span>{user.role}</span>
                      <span>{user.username}</span>
                      <span>{user.email}</span>
                    </div>
                  </div>
                </div>
                <div className="my-2  w-full border border-b-[1px] border-solid border-teal-800" />
                <div className="flex flex-col flex-grow justify-evenly ">
                  <div className="text-teal-800 text-[20px] font-bold my-3">
                    Projects
                  </div>
                  <div className="bg-white  h-4/5 rounded-lg overflow-y-scroll px-8">
                    {project?.map((item) => (
                      <CardProject key={item._id} project={item} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-2/12 flex justify-center  ">
                <button
                  className="bg-teal-700 text-white hover:bg-teal-800 ease-in-out duration-150 hover:scale-[102%] h-10 px-6 rounded-full me-3"
                  type="button"
                  onClick={() => setEdit(true)}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const EditProfile = ({
  onCancel,
  onSave,
}: {
  onCancel?: () => void;
  onSave?: () => void;
}) => {
  const { user, updateUser } = useAuth();
  const [uploadProgess, setUploadProgess] = useState<number>(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileSchemaType>({
    resolver: zodResolver(EditProfileSchema),
  });
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleButtonUploadImage = () => {
    inputFileRef.current?.click();
  };

  const handleUploadImageProfile = useCallback(async () => {
    let filename = '';
    try {
      const file = inputFileRef.current?.files?.[0];
      if (!file) return;
      filename = `${user.email}_${uuid4()}`;
      let storageRef = ref(storage, `imageProfile/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log('uploadTask', uploadTask);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgess(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          const data = { avatar: url };
          updateUser(data);
          if (user.avatar) {
            const filename = extractFilenameFromURL(user.avatar);
            const storageRef = ref(storage, `imageProfile/${filename}`);
            await deleteObject(storageRef);
          }
          setUploadProgess(0);
        }
      );
    } catch (err) {
      console.log(err);
      const storageRef = ref(storage, `imageProfile/${filename}`);
      await deleteObject(storageRef);
      setUploadProgess(0);
      updateUser({ avatar: '' });
    }
  }, [user, updateUser]);
  const handleButtonRemove = useCallback(async () => {
    try {
      if (!user.avatar) return;
      const filename = extractFilenameFromURL(user.avatar);
      console.log(filename);
      const storageRef = ref(storage, `imageProfile/${filename}`);
      await deleteObject(storageRef);
      updateUser({ avatar: '' });
    } catch (err) {
      console.log(err);
      updateUser({ avatar: '' });
    }
  }, [user, updateUser]);
  const handleSaveEditProfile = useCallback(
    async (data: EditProfileSchemaType) => {
      try {
        console.log(data);
        updateUser(data);
        onSave && onSave();
      } catch (err) {
        console.log(err);
      }
    },
    [updateUser, onSave]
  );

  return (
    <div className="flex relative flex-row ">
      <Sidebar />
      <div className="flex flex-col w-full   ">
        <div className="flex items-center ps-5 text-lg  h-16 font-semibold">
          Edit user information
        </div>
        <div className="mx-10 bg-neutral-100 h-full px-5 py-10 flex justify-center gap-x-10 ">
          <div className="flex flex-col text-base font-semibold w-5/12 ">
            <div>Profile image</div>
            <div className="flex flex-row items-center justify-start mt-4">
              <Profile user={user} progress={uploadProgess} />
              <button
                className="bg-neutral-200 h-12 ms-10 px-5 rounded-full"
                onClick={handleButtonUploadImage}
                type="button"
              >
                Upload image
              </button>
              <button
                className="bg-neutral-200 h-12 ms-10 px-5 rounded-full"
                type="button"
                onClick={handleButtonRemove}
              >
                Remove image
              </button>
              <input
                type="file"
                ref={inputFileRef}
                accept=".jpg, .jpeg, .png, .gif"
                className="hidden"
                onChange={handleUploadImageProfile}
              />
            </div>
          </div>
          <div className="border-l-[1px] border-solid border-black" />

          <form
            className="flex flex-col items-center justify-evenly w-5/12"
            onSubmit={handleSubmit(handleSaveEditProfile)}
          >
            <div className="flex flex-row w-10/12 justify-center gap-x-2 ">
              <Input
                label="Name"
                placeholder="Name"
                type="text"
                width="w-6/12"
                defaultValue={user.name}
                className="read-only:border-none   focus:outline-none"
                {...register('name')}
              />
              <Input
                label="Surname"
                placeholder="Surname"
                type="text"
                width="w-6/12"
                defaultValue={user.surname}
                className="read-only:border-none  focus:outline-none"
                {...register('surname')}
              />
            </div>

            <div className="flex flex-row w-10/12 justify-center gap-x-2">
              <Input
                label="Username"
                placeholder="Username"
                type="text"
                width="w-6/12"
                className="read-only:border-none  focus:outline-none"
                defaultValue={user.username}
                {...register('username')}
              />
              <Input
                label="Role"
                placeholder="Role"
                type="text"
                width="w-6/12"
                value={user.role}
                className="read-only:border-none  focus:outline-none"
                readOnly
                disabled
              />
            </div>
            <Input
              label="Email"
              placeholder="Email"
              type="text"
              value={user.email}
              className="read-only:border-none  focus:outline-none"
              readOnly
              disabled
            />

            <div className="flex flex-row w-10/12 items-center">
              <div className="w-3/12">Change password</div>
              <div className="border-b-[1px] border-solid border-black w-9/12" />
            </div>
            <Input
              label="newPassword"
              className="disabled:opacity-50 focus:outline-none"
              eye
              placeholder="newPassword"
              {...register('newPassword')}
            />

            {errors.newPassword && (
              <div className="text-red-500 text-sm">
                {errors.newPassword?.message}
              </div>
            )}

            <div className="flex flex-row justify-end w-10/12">
              <button
                className="bg-neutral-200 h-10 px-5 rounded-full me-5"
                type="button"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="bg-neutral-200 h-10 px-5 rounded-full"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ProtectEditProfile = () => {
  // const { isAuthenticated } = useAuth();
  // const route = useRouter();
  // if (!isAuthenticated) {
  //   route.push('/login');
  //   return null;
  // }
  return (
    <ProtectedPage>
      <ShowProFile />
    </ProtectedPage>
  );
};
export default ProtectEditProfile;
