import {create} from 'zustand'
import axiosInstance from '@/lib/axiosInstance';
import { productType } from '@/schema/orderSchema';

type productStoreType = {
  products: productType[];
};

export const useUserStore = create<productStoreType>((set) => ({
    products: [] as productType[],
}));


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
    deleteCategory: (id:string)=> Promise<boolean>;
    createCategory: (name:string)=> Promise<boolean>;
    updateCategory: (id:string,name:string)=> Promise<boolean>;
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
    deleteCategory: async(id:string)=>{
        try{
            const res = await axiosInstance.delete('/ecommerce/categories/'+id)
            if(res.data.success){
                console.log(res.data)
                set((state)=>{
                    const categories = {...state.categories}
                    delete categories[id]
                    return {categories}
                })
            }
            return true
        }
        catch(e){
            console.log(e)
            return false
        }
    },
    createCategory: async(name:string)=>{
        try{
            const res = await axiosInstance.post('/ecommerce/categories',{name})
            if(res.data.success){
                console.log(res.data)
                set((state)=>{
                    let categories = {...state.categories}
                    categories[res.data.data._id] = res.data.data
                    categories = sortCategories(categories)
                    return {categories:categories}
                })
            }
            return true
        }
        catch(e){
            console.log(e)
            return false
        }
    },
    updateCategory: async(id:string,name:string)=>{
        try{
            const res = await axiosInstance.patch('/ecommerce/categories/'+id,{name})
            if(res.data.success){
                console.log(res.data)
                set((state)=>{
                    let categories = {...state.categories}
                    categories[id] = res.data.data
                    categories = sortCategories(categories)
                    return {categories:categories}
                })
            }
            return true
        }
        catch(e){
            console.log(e)
            return false
        }
    }
}));