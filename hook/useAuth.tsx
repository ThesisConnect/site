import { userStore } from '@/stores/User';
import { useCallback, useEffect } from 'react';
import axiosBaseurl from '@/config/baseUrl';
import { User } from '@/stores/User';
import * as _ from 'lodash';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/config/firebase';
interface Auth {
  user: User;
  clearUser: () => void;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
}

export const useAuth = (): Auth => {
  const { user, clearUser, setUser } = userStore((state) => ({
    user: state.user,
    clearUser: state.clearUser,
    setUser: state.setUser,
  }));
  const checkUserAuth = useCallback(async () => {
    try {
      const res = await axiosBaseurl.get('/auth/checkAuth', {
        withCredentials: true,
      });
      console.log('check');
      const data = res.data as User;
      // console.log(data)
      console.log(data);
      const { isAuthenticated } = data;
      if (isAuthenticated) {
        // console.log("data",data.customToken)
        await signInWithCustomToken(auth, data.customToken!);
        setUser(data);
      }
      else {
        clearUser();
      }
    } catch (err) {
      console.log(err);
      clearUser();
    }
  }, [setUser, clearUser]);

  useEffect(() => {
    checkUserAuth();
  }, [checkUserAuth]);
  return {
    user,
    clearUser,
    setUser,
    isAuthenticated: user.isAuthenticated || false,
  };
};

export default useAuth;
