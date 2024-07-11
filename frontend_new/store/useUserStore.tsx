import {create} from 'zustand'
import axiosInstance from '@/lib/axiosInstance'
import axios from 'axios';

export type User = {
    _id:string,
    email: string,
    role: "ADMIN" | "USER",
    username: string
}

export interface UserStore {
    user: User | null;
    getUser: () => Promise<boolean>;
    logout: () => Promise<boolean>;
}

const useUserStore = create<UserStore>((set) => ({
    user:null,
    getUser: async () => {
        try {
            const res = await axiosInstance.get(`/users/current-user`)
            if (res.data.success) {
                set({ user: res.data.data })
                return true
            }
            return false
        } catch (e) {
            console.log(e)
            return false
        }
    },
    logout: async () => {
        try {
            const res = await axiosInstance.post(`/users/logout`)
            if (res.data.success) {
                axios.post('/api/v1/revoke').then(()=>{
                    set({ user: null })
                    return true
                })
                return false                
            }
            return false
        } catch (e) {
            console.log(e)
            return false
        }
    }
}))

export {useUserStore}