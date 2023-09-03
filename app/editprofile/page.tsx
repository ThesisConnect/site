'use client';
import Sidebar from '@/components/Sidebar';
import userStore from '@/stores/User';
import Image from 'next/image';
import profileDownload from '@/utils/profileImage';
import { useCallback, useRef, useState } from 'react';
import Input from '@/components/login/Input';
import SelectRole from '@/components/register/SelectRole';
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
const EditProfile = () => {
  const route = useRouter();
  const { user, setUser, clearUser, isAuthenticated } = useAuth();
  const [edit, setEdit] = useState<boolean>(false);
  const [uploadProgess, setUploadProgess] = useState<number>(0);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const logout = async () => {
    console.log('logout');
    const res = await axiosBaseurl.get('/auth/logout', {
      withCredentials: true,
    });
    signOut(auth);
    if (res.status === 200) {
      clearUser();
      route.push('/login');
    }
  };
  const handleButtonUploadImage = () => {
    inputFileRef.current?.click();
  };
  const handleEditProfile = useCallback(() => {
    setEdit(true);
  }, []);
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
          const res = await axiosBaseurl.post(
            '/auth/update/profileImage',
            data,
            {
              withCredentials: true,
            }
          );
          if(user.avatar){
            const filename = extractFilenameFromURL(user.avatar);
            const storageRef = ref(storage, `imageProfile/${filename}`);
            await deleteObject(storageRef);
          }
          if (res.status === 200) {
            setUser({ ...user, avatar: url });
            setUploadProgess(0);
          }
          
        }
      );
    } catch (err) {
      console.log(err);
      const storageRef = ref(storage, `imageProfile/${filename}`);
      await deleteObject(storageRef);
      setUser({ ...user, avatar: '' });
    }
  }, [user, setUser]);
  const handleButtonRemove = useCallback(async () => {
    try {
      if (!user.avatar) return;
      const filename = extractFilenameFromURL(user.avatar);
      console.log(filename);
      const storageRef = ref(storage, `imageProfile/${filename}`);
      await deleteObject(storageRef);
      const data = { avatar: '' };
      const res = await axiosBaseurl.post(
        '/auth/update/deleteProfileImage',
        data,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setUser({ ...user, avatar: '' });
      }
    } catch (err) {
      console.log(err);
      setUser({ ...user, avatar: '' });
    }
  }, [user, setUser]);
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

          <form className="flex flex-col items-center justify-evenly w-5/12">
            <div className="flex flex-row w-10/12 justify-center gap-x-2 ">
              <Input
                label="Name"
                placeholder="Name"
                type="text"
                width="w-6/12"
                defaultValue={user.name}
                readOnly={!edit}
                disabled={!edit}
                className="disabled:opacity-50 focus:outline-none"
              />
              <Input
                label="Surname"
                placeholder="Surname"
                type="text"
                width="w-6/12"
                defaultValue={user.surname}
                readOnly={!edit}
                disabled={!edit}
                className="disabled:opacity-50 focus:outline-none"
              />
            </div>

            <div className="flex flex-row w-10/12 justify-center gap-x-2">
              <Input
                label="Username"
                placeholder="Username"
                type="text"
                width="w-6/12"
                className="disabled:opacity-50 focus:outline-none"
                readOnly={!edit}
                disabled={!edit}
                defaultValue={user.username}
              />
              <Input
                label="Role"
                placeholder="Role"
                type="text"
                width="w-6/12"
                value={user.role}
                className="disabled:opacity-50 focus:outline-none"
                readOnly
                disabled
              />
            </div>
            <Input
              label="Email"
              placeholder="Email"
              type="text"
              value={user.email}
              className="disabled:opacity-50 focus:outline-none"
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
              disabled={!edit}
              readOnly={!edit}
              eye
              placeholder="newPassword"
            />
            {!edit && (
              <div className="flex">
                <button
                  className="bg-neutral-200 h-10 px-5 rounded-full me-3"
                  type="button"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </button>
                {isAuthenticated && (
                  <button
                    className="bg-neutral-200 h-10 px-5 rounded-full "
                    type="button"
                    onClick={logout}
                  >
                    logout
                  </button>
                )}
              </div>
            )}

            {edit && (
              <div className="flex flex-row justify-end w-10/12">
                <button
                  className="bg-neutral-200 h-10 px-5 rounded-full me-5"
                  type="button"
                  onClick={() => setEdit(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-neutral-200 h-10 px-5 rounded-full"
                  type="button"
                >
                  Save
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
