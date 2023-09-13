import { userStore } from '@/stores/User';
import { use, useCallback, useEffect, useMemo } from 'react';
import axiosBaseurl from '@/config/baseUrl';
import { User } from '@/stores/User';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/config/firebase';
import useSWR from 'swr';

interface Auth {
  user: User;
  clearUser: () => void;
  isAuthenticated: boolean|undefined;
  updateUser: (user: Partial<User>) => void;
  setUserNew: (user: User) => void;
  mutate: () => void;
  isLoading:boolean
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
  const { data, error, mutate } = useSWR<User, Error>(
    '/auth/checkAuth',
    fetcher,
    {
      dedupingInterval: ONE_HOUR_IN_MS,
    }
  );
  const updateUser = useCallback(
    async (updateData: Partial<User>) => {
      try {
        console.log('updateData', updateData);
        const updateNew= { ...user, ...updateData }
        setUser(updateNew);
        await axiosBaseurl.post('/auth/update/profile', (updateNew), {
          withCredentials: true,
        });
        mutate(updateNew);
      } catch (err) {
        console.log(err);
      }
    },
    [setUser, mutate, user]
  );
  const setUserNew = useCallback(
    (user: User) => {
      setUser(user);
      mutate();
    },
    [setUser, mutate]
  );
  
  useEffect(() => {
    if (!data && !error) {
      // If there's no data and no error, it means the SWR fetching is still ongoing
      // Do nothing and wait for the fetching to complete
      return;
    }
    if (data?.isAuthenticated) {
      signInWithCustomToken(auth, data.customToken!)
        .then(() => setUser(data))
        .catch((err) => {
          console.log('sign', err);
          clearUser();
          mutate();
        });
    } else if (error || !data?.isAuthenticated) {
      clearUser();
    }
  }, [data, error, setUser, clearUser, mutate]);
  return {
    user,
    clearUser,
    isAuthenticated :user.isAuthenticated,
    updateUser,
    setUserNew,
    mutate,
    isLoading:!data&&!error,
  };
};

export default useAuth;
