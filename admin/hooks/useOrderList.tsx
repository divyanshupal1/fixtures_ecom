import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import {orderListParser,orderListResponseDataType} from '@/schema/orderSchema';

const useOrderList = (status:"PENDING"|"DELIVERED"|"CANCELLED"="PENDING",page:number=1,limit:number=10) => {

  const [orders, setData] = useState<orderListResponseDataType|undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/ecommerce/orders/list/admin?status=${status}&page=${page}&limit=${limit}`);
        const data = orderListParser(response.data);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [status,page,limit]);



  return { orders, loading, error };
};

export default useOrderList;