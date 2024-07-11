import {create} from 'zustand';
import axiosInstance from '@/lib/axiosInstance';

export type categoryType={
    _id: string,
    name: string,
    owner: {
        _id: string,
        username: string,
        email: string
    },
    __v: 0,
    createdAt: string,
    updatedAt: string
}
type categoryStoreType = {
    categories: Record<string,categoryType>;
    fetchCategories: ()=> Promise<boolean>;
}
const sortCategories = (categories:Record<string,categoryType>)=>{
    return Object.keys(categories)
    .sort((a, b) => categories[a].name.localeCompare(categories[b].name))
    .reduce((acc:Record<string,categoryType>, key) => {
        acc[key] = categories[key];
        return acc;
    }, {});
}
export const useCategoryStore = create<categoryStoreType>((set) => ({
    categories: {},
    fetchCategories: async()=>{
        try{
            const res = await axiosInstance.get('/ecommerce/categories')
            if(res.data.success){
                const categories = res.data.data.reduce((acc:Record<string,categoryType>, curr:categoryType) => {
                    const { _id} = curr;
                    acc[_id] = curr;
                    return acc;
                }, {});
                const sortedData = sortCategories(categories)
                set({categories: sortedData})
            }
            return true
        }
        catch(e){
            console.log(e)
            return false
        }
    },
}));