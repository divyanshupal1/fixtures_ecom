import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import {MODE } from '@/constants';
import {orderListParser,orderListResponseDataType} from '@/schema/orderSchema';
import { getDummyOrderListData } from '@/dummyData/orderData';

const useProducts = (page:number=1,limit:number=10) => {

  const [products, setData] = useState<orderListResponseDataType|undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(MODE=="demo"){
          const data = getDummyOrderListData();
          setData(data);
          setLoading(false);
        }
        else{
          const response = await axiosInstance.get(`/ecommerce/products?page=${page}&limit=${limit}`);
          const data = orderListParser(response.data);
          setData(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page,limit]);



  return { products, loading, error };
};

export default useProducts;