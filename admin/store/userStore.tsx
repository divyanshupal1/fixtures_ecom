/* eslint-disable react-hooks/exhaustive-deps */
import {create} from 'zustand';
import axiosInstance from '@/lib/axiosInstance';
import axios from 'axios';

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
  logout: () => Promise<boolean>;
  session: () => Promise<User | null>;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  login: (user) => set((state) => ({ user })),
  logout: async () => {   
    const res = await axiosInstance.post("/users/logout");
    if (res.status===200){
      axios.post("/api/v1/authorize",{})
      .then(()=>
        document.location.reload()
      );      
    };
    return false;
  },
  session : async () => {   
      try{
        const response = await axiosInstance.get("/users/current-user");
        if (response.status!=200){
          set(() => ({ user: null }));
          return null;
        };
        const user = response.data.data;
        set(() => ({ user})); 
        return user;
      }
      catch(e){ 
        return null
      };  
  }

}));

