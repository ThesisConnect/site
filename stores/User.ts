import { atom } from "jotai";

export interface User {
  name: string;
  surname: string;
  username: string;
  role: string;
  email: string;
  avatar?: string;
  isAuthenticated: boolean;
}

const defaultUser: User = {
  name: "",
  surname: "",
  username: "",
  role: "",
  email: "",
  avatar: "",
  isAuthenticated: false,
};

export const userAtom = atom<User>({
  name: "",
  surname: "",
  username: "",
  role: "",
  email: "",
  avatar: "",
  isAuthenticated: false,
});

export const clearUserAtom = atom(null, async (get, set) => {
  set(userAtom, defaultUser);
});

import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
interface UserStore {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const userStore = createWithEqualityFn<UserStore>((set) => ({
  user: defaultUser,
  setUser: (newUser: User) => {
    console.log("set");
    set({user: newUser});
  },
  clearUser: () => {
    console.log("clear");
    set({user: defaultUser});
  },
}), shallow);

userStore.subscribe(console.log);  // This will log the entire state every time it changes

export default userStore;