import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { detailedOrderParser ,detailedOrderType} from '@/schema/orderSchema';


const useOrderById = (id:string) => {
  const [order_data, setData] = useState<detailedOrderType|undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await axiosInstance.get("/ecommerce/orders/"+id);
          const data = detailedOrderParser(response.data.data.order);
          setData(data);
          setLoading(false); 
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