import axiosInstance from "../lib/axiosInstance";
import { create } from "zustand";

export const useGridStore = create((set)=>({
    grid:null,
    fetchGrid : async () => {
        try {
            const res = await axiosInstance.get('/ecommerce/grid')
            if(res.status==200){
                set({grid:res.data[0]})
                return true
            }else{
                return false
            }
        } catch (error) {
            console.log("Error fetching grids")
            return false
        }
    }
}))
