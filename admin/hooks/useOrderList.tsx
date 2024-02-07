import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_API ,MODE } from '@/constants';
import {orderListParser,orderListResponseDataType} from '@/schema/orderSchema';
import { getDummyOrderListData } from '@/dummyData/orderData';

const useOrderList = (status:"PENDING"|"DELIVERED"|"CANCELLED"="PENDING",page:number=1,limit:number=10) => {

  const [orders, setData] = useState<orderListResponseDataType|undefined>(undefined);
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
          const response = await axios.get(BASE_API+`/ecommerce/orders/list/admin?status=${status}&page=${page}&limit=${limit}`,{
              withCredentials:true,
          });
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
  }, [status,page,limit]);



  return { orders, loading, error };
};

export default useOrderList;