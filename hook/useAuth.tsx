import { userStore } from '@/stores/User';
import { useCallback, useEffect } from 'react';
import axiosBaseurl from '@/config/baseUrl';
import { User } from '@/stores/User';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/config/firebase';
import useSWR from 'swr';
interface Auth {
  user: User;
  clearUser: () => void
  isAuthenticated: boolean;
  updateUser: (user: Partial<User>) => void;
  setUserNew: (user: User) => void;
  mutate: () => void;
}

const fetcher = async (url: string) => {
  try {
    const res = await axiosBaseurl.get(url, { withCredentials: true });
    return res.data as User;
  } catch (err) {
    throw err;
  }
};
const ONE_HOUR_IN_MS = 60 * 60 * 1000;
export const useAuth = (): Auth => {
  const { user, clearUser, setUser } = userStore((state) => ({
    user: state.user,
    clearUser: state.clearUser,
    setUser: state.setUser,
  }));
  const { data, error,mutate } = useSWR<User,Error>('/auth/checkAuth', fetcher,{
    dedupingInterval: ONE_HOUR_IN_MS
  });
  const updateUser = useCallback(
    async (updateData:Partial<User>) => {
      try{
        console.log("updateData",updateData)
        setUser({...user,...updateData});
        await axiosBaseurl.post('/auth/update/profile', updateData, { withCredentials: true });
        mutate({...user,...updateData})
      }
      catch(err){
        console.log(err)
      }
    }
  , [setUser,mutate,user]);
  const setUserNew = useCallback((user: User) => {
    setUser(user);
    mutate();
  }
  , [setUser,mutate]);
  // const checkUserAuth = useCallback(async () => {
  //   try {
  //     const res = await axiosBaseurl.get('/auth/checkAuth', {
  //       withCredentials: true,
  //     });
  //     console.log('check');
  //     const data = res.data as User;
  //     // console.log(data)
  //     // console.log(data);
  //     const { isAuthenticated } = data;
  //     if (isAuthenticated) {
  //       // console.log("data",data.customToken)
  //       await signInWithCustomToken(auth, data.customToken!);
  //       setUser(data);
  //     } else {
  //       clearUser();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     clearUser();
  //   }
  // }, [setUser, clearUser]);
  useEffect(() => {
    if (data?.isAuthenticated) {
      signInWithCustomToken(auth, data.customToken!)
        .then(() => 
        setUser(data)
        )
        .catch((err) => {
          console.log('sign', err);
          clearUser();
          mutate();
        });
    } else if (error || !data?.isAuthenticated) {
      clearUser();
    }
  }, [data, error, setUser, clearUser,mutate]);
  return {
    user,
    clearUser,
    isAuthenticated: user.isAuthenticated || false,
    updateUser,
    setUserNew,
    mutate
  };
};

export default useAuth;
