import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useUserStore } from '@/store/userStore'
import { Skeleton } from '../ui/skeleton'
  

const UserCard = () => {
  const {user} = useUserStore((state)=>({user:state.user})) 
  return (
    <div className='w-full rounded-lg bg-secondary flex justify-start items-center gap-x-4 p-3 px-4'>
        <div>
            {
                user===null ?
                <Skeleton className='w-10 h-10 rounded-full'/>
                : 
                <Avatar>
                    <AvatarImage src={user?.avatar?.url} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            }            
        </div>
        <div className='overflow-hidden w-full'>
            {
                user?
                <>
                    <div className='text-left font-medium'>{user?.username}</div>
                    <div className='text-left text-xs'>{user?.role}</div>
                </>
                :
                <>
                    <Skeleton className='max-w-28 w-full h-4 mb-2 rounded-md'/>
                    <Skeleton className='w-20 h-4 rounded-md'/>
                </>
            }
        </div>
    </div>
  )
}

export default UserCard