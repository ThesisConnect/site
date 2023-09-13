import { atom } from 'jotai';

export interface User {
  name: string;
  surname: string;
  username: string;
  role: string;
  email: string;
  avatar?: string;
  isAuthenticated: boolean;
  customToken?: string;
}

const defaultUser: User = {
  name: '',
  surname: '',
  username: '',
  role: '',
  email: '',
  avatar: '',
  isAuthenticated: false,
};

export const userAtom = atom<User>({
  name: '',
  surname: '',
  username: '',
  role: '',
  email: '',
  avatar: '',
  isAuthenticated: false,
});


import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { createJSONStorage, persist } from 'zustand/middleware';
interface UserStore {
  user: User;
  isAuth: () => boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const userStore = createWithEqualityFn<UserStore>()(
  persist(
  (set, get) => ({
    user: defaultUser,
    isAuth: () => get().user.isAuthenticated,
    setUser: (newUser: User) => {
      console.log('set');
      set({ user: newUser });
    },
    clearUser: () => {
      console.log('clear');
      set({ user: defaultUser });
    },
  })
  ,
  {
    name: 'user-storage',
    storage: createJSONStorage(()=>sessionStorage),
  }
  ),
  shallow

);

userStore.subscribe(console.log); // This will log the entire state every time it changes

export default userStore;
