"use client"
import { Box, GlassWater, LucideLayoutDashboard, Menu,User,UserPlus2,BadgePercent} from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import {LOGO} from "@/constants";
import { DashboardIcon, ExitIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/themeToggle'

const links = [
  {href:"/admin/admin",icon:<UserPlus2/>,text:"Admin",active:"admin"},
  {href:"/admin",icon:<LucideLayoutDashboard/>,text:"Dashboard",active:"dashboard"},
  {href:"/admin/orders",icon:<Box/>,text:"Orders",active:"orders"},
  {href:"/admin/products",icon:<GlassWater/>,text:"Products",active:"products"},
  {href:"/admin/coupons",icon:<BadgePercent/>,text:"Coupons",active:"coupons"},
  {href:"/admin/customers",icon:<User/>,text:"Customers",active:"customers"},
]

function Sidebar({setOpen}:{setOpen:React.Dispatch<React.SetStateAction<boolean>>}) {
  const path = usePathname()

  return (
    <div className='h-full flex flex-col'>
        <div className='w-full p-4  flex gap-x-4'>
            <div className='sm:hidden' onClick={()=>{setOpen(prev=>!prev)}}><Menu/></div>
            <span className="font-extrabold">{LOGO}</span>
        </div>
        {
          path.split('/')[1] === 'admin' && (
            <div className='w-full flex flex-col justify-center items-center pr-2 pt-6'>
              <div className='flex flex-col gap-y-1 w-full pl-2'>
                  {
                      links.map((item,index)=><NavTab key={index} item={item}/>)
                  }
              </div>
            </div>
          )
        }
        <div className='w-full mt-auto p-4 flex gap-x-4 max-sm:hidden'>
          <Button variant="outline" className='rounded-md flex-grow'><ExitIcon className='mr-4'/> Logout</Button>
          <ModeToggle/>
        </div>
    </div>
  )
}

export default Sidebar

function NavTab({item}:{item:{href:string,icon:JSX.Element,text:string,active:string}}){
    const path = usePathname()
    return (
        <Link href={item.href} className='w-full'>
            <div className={`w-full flex transition-colors items-center gap-x-3 p-2 px-4 rounded-sm hover:bg-primary hover:text-white ${path.split('/')[2] === item.active ?'bg-primary text-white':""}`}>
                {item.icon}
                {item.text}
            </div>
        </Link>
    )
}