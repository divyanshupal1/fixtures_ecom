/* eslint-disable react-hooks/exhaustive-deps */
import {create} from 'zustand';
import axiosInstance from '@/lib/axiosInstance';

type User = {
  _id: string,
  avatar: {
    url: string,
    localPath: string,
    _id: string
  },
  username: string,
  email: string,
  role: string,
  loginType: string,
  isEmailVerified: boolean,
  createdAt: string,
  updatedAt: string,
  __v: number
}

type UserStore = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  session: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  login: (user) => set((state) => ({ user })),
  logout: () => set((state) => ({ user: null })),
  session : () => {
    const fetchUser = async () => {
      const response = await axiosInstance.get("/users/current-user");
      if (response.status!=200) set((state) => ({ user: null }));
      const user = response.data.data;
      set((state) => ({ user }));
    };
    fetchUser();
  }
}));

