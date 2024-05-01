"use client"
import {useEffect} from 'react';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';

const UserSession = () => {
  const router = useRouter();

  const {session} = useUserStore((state)=>({
    session:state.session,
    logout:state.logout
  }));

  // const {user} = useUserStore((state)=>({
  //   user:state.user
  // }))

  useEffect(() => {
    async function checkUser(){
      const res = await session();
      // if(res===null) router.push('/login');
    }
    checkUser();
  }, []);

  // useEffect(()=>{
  //   if(user===null ){
  //     router.push('/login');
  //   }
  // },[user])
  
  return <></>
};

export default UserSession;