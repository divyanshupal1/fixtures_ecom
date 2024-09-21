import axiosInstance from "@/lib/axiosInstance";
import { create } from "zustand";

export interface GridItem {
    imageUrl: string,
    title: string,
    description: string,
    buttonAction: string,
    textColor:string
    _id: string
}

export interface Grid {
    _id:string
    gridName:string
    leftImage:GridItem
    rightTopImage:GridItem
    rightBottomLeftImage:GridItem
    rightBottomRightImage:GridItem
}
interface GridStore {
    grid:Grid|null,
    fetchGrid:()=>Promise<boolean>
    updateGrid:(id:String,data:Grid)=>Promise<boolean>
}

export const useGridStore = create<GridStore>((set)=>({
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
    },
    updateGrid: async (id:String,data:Grid) => {
        try {
            const updatedData = {
                leftImage:data?.leftImage,
                rightTopImage:data?.rightTopImage,
                rightBottomRightImage:data?.rightBottomRightImage,
                rightBottomLeftImage:data?.rightBottomLeftImage,
            } 
            const res = await axiosInstance.patch("/ecommerce/grid/"+id,updatedData);
            if(res.status==200){
                set({grid:res.data})
                return true
            }else{
                return false
            }
        } catch (error) {
            console.log("error updating grid")
            return false
        }
    }
}))
