"use client"
import {useEffect} from 'react';
import { useUserStore } from '@/store/userStore';

const UserSession = () => {
  const {session} = useUserStore((state)=>({session:state.session}));
  useEffect(() => {
    session();
  }, []);
  return <></>
};

export default UserSession;