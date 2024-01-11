import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_API ,MODE } from '@/constants';
import { detailedOrderParser ,detailedOrderType} from '@/schema/orderSchema';
import { getDummydetailedOrderData } from '@/dummyData/orderData';

const useOrderById = (id:string) => {

  const [order_data, setData] = useState<detailedOrderType|undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(MODE=="demo"){
          const data = getDummydetailedOrderData();
          setData(data);
          setLoading(false);
        }
        else{
          const response = await axios.get(BASE_API+"/ecommerce/orders/"+id,{
              withCredentials:true,
          });
          const data = detailedOrderParser(response.data.data.order);
          setData(data);
          setLoading(false);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);



  return { order_data, loading, error };
};

export default useOrderById;