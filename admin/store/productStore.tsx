import {create} from 'zustand'
import axiosInstance from '@/lib/axiosInstance';
import { productType } from '@/schema/orderSchema';

type PaginationType = {
    totalProducts: number,
    limit: number,
    page: number,
    totalPages: number,
    serialNumberStartFrom: number,
    hasPrevPage: boolean,
    hasNextPage: boolean,
    prevPage: number | null,
    nextPage: number | null
}
type productStoreType = {
    products: productType[];
    pagination: PaginationType;
    fetchProducts: (page?:number,limit?:number)=> Promise<boolean>;
    fetchProductByID: (id:string)=> Promise<boolean|productType>;
    fetchProductsByCategory: (category:string,page:number,limit:number)=> Promise<boolean>;
    addProduct: (product:FormData)=> Promise<boolean>;
    updateProduct: (id:string,product:FormData)=> Promise<boolean>;
    deleteProduct: (id:string)=> Promise<boolean>;
};
export const useProductStore = create<productStoreType>((set) => ({
    products: [] as productType[],
    pagination: {
        totalProducts: 0,
        limit: 10,
        page: 1,
        totalPages: 0,
        serialNumberStartFrom: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    },
    fetchProducts: async(page=1,limit=10)=>{
        try{
            const res = await axiosInstance.get(`/ecommerce/products?page=${page}&limit=${limit}`)
            if(res.data.success){
                const data = res.data.data
                set({
                    products: data.products,
                    pagination:{
                        totalProducts: data.totalProducts,
                        limit: data.limit,
                        page: data.page,
                        totalPages: data.totalPages,
                        serialNumberStartFrom: data.serialNumberStartFrom,
                        hasPrevPage: data.hasPrevPage,
                        hasNextPage: data.hasNextPage,
                        prevPage: data.prevPage,
                        nextPage: data.nextPage
                    }
                })
            }
            return true
        }
        catch(e){
            console.log(e)
            return false
        }
    
    },
    fetchProductByID: async(id:string)=>{
        try{
            const res = await axiosInstance.get('/ecommerce/products/'+id)
            if(res.data.success){
                return res.data.data
            }
        }
        catch(e){
            console.log(e)
            return false
        }
    },
    fetchProductsByCategory: async (category:string,page:number,limit:number) => {
        try{
            const res = await axiosInstance.get(`/ecommerce/products/category/${category}?page=${page}&limit=${limit}`)
            if(res.data.success){
                const data = res.data.data
                set({
                    products: data.products,
                    pagination:{
                        totalProducts: data.totalProducts,
                        limit: data.limit,
                        page: data.page,
                        totalPages: data.totalPages,
                        serialNumberStartFrom: data.serialNumberStartFrom,
                        hasPrevPage: data.hasPrevPage,
                        hasNextPage: data.hasNextPage,
                        prevPage: data.prevPage,
                        nextPage: data.nextPage
                    }
                })
            }
            return true
            }
            catch(e){
                console.log(e)
                return false
            } 
    },
    addProduct: async(product:FormData)=>{
        try{
            const res = await axiosInstance.post('/ecommerce/products',product, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            if(res.data.success){
                return true
            }
            return false
        }
        catch(e){
            console.log(e)
            return false        
        }
    },
    updateProduct: async(id:string,product:FormData)=>{
        try{
            const res = await axiosInstance.patch('/ecommerce/products/'+id,product, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            if(res.data.success){
                return true
            }
            return false
        }
        catch(e){
            console.log(e)
            return false        
        }
    
    },
    deleteProduct: async(id:string)=>{
        try{
            const res = await axiosInstance.delete('/ecommerce/products/'+id)
            if(res.data.success){
                set((state)=>{
                    const products = state.products.filter((product)=>product._id!==id)
                    return {products,pagination:{...state.pagination,totalProducts:state.pagination.totalProducts-1}}
                })
                return true
            }
            return false
        }
        catch(e){
            console.log(e)
            return false        
        }
    
    }
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
                // console.log(res.data)
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
                // console.log(res.data)
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
                // console.log(res.data)
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

export type couponType = {
    __v: 0,
    _id: string,
    couponCode: string,
    createdAt: string,
    discountValue: number,
    expiryDate: string,
    isActive: boolean,
    minimumCartValue: number,
    name: string,
    owner: string,
    startDate: string,
    type: string,
    updatedAt: string
}
export type couponStoreType = {
    coupons: couponType[];
    fetchCoupons: ()=> Promise<boolean>;
    deleteCoupon: (id:string)=> Promise<boolean>;
    createCoupon: (coupon:{name:string,couponCode:string,type:string,discountValue:number,minimumCartValue:number,expiryDate:string,startDate:string})=> Promise<boolean>;
    updateCoupon: (id:string,coupon:{name:string,couponCode:string,type:string,discountValue:number,minimumCartValue:number,expiryDate:string,startDate:string})=> Promise<boolean>;
}
export const useCouponStore = create<couponStoreType>((set) => ({
    coupons: [],
    fetchCoupons: async()=>{
        try{
            const res = await axiosInstance.get('/ecommerce/coupons?page=1&limit=100')
            if(res.data.success){
                set({coupons: res.data.data.coupons})
            }
            return true
        }
        catch(e){
            console.log(e)
            return false
        }
    },
    deleteCoupon: async(id:string)=>{
        try{
            const res = await axiosInstance.delete('/ecommerce/coupons/'+id)
            if(res.data.success){
                set((state)=>{
                    const coupons = state.coupons.filter((coupon)=>coupon._id!==id)
                    return {coupons}
                })
            }
            return true
        }
        catch(e){
            console.log(e)
            return false
        }
    },
    createCoupon: async(coupon:{name:string,couponCode:string,type:string,discountValue:number,minimumCartValue:number,expiryDate:string,startDate:string})=>{
        try{
            const res = await axiosInstance.post('/ecommerce/coupons',coupon)
            if(res.data.success){
                set((state)=>{
                    const coupons = [...state.coupons,res.data.data]
                    return {coupons}
                })
            }
            return true
        }
        catch(e){
            console.log(e)
            return false
        }
    },
    updateCoupon: async(id:string,coupon:{name:string,couponCode:string,type:string,discountValue:number,minimumCartValue:number,expiryDate:string,startDate:string})=>{
        try{
            const res = await axiosInstance.patch('/ecommerce/coupons/'+id,coupon)
            if(res.data.success){
                set((state)=>{
                    const coupons = state.coupons.map((coupon)=>coupon._id===id?res.data.data:coupon)
                    return {coupons}
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
