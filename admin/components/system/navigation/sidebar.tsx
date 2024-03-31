"use client"
import {Menu} from 'lucide-react'
import { FaTshirt, FaCompass, FaUser   } from "react-icons/fa";
import { BiSolidCoupon } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi2";
import { IoBag } from "react-icons/io5";
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import {LOGO} from "@/constants";
import { ExitIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/themeToggle'
import { RiLogoutCircleRFill } from "react-icons/ri";

const links = [
  {href:"/admin/admin",icon:<FaUser/>,text:"Admin",active:"admin"},
  {href:"/admin",icon:<FaCompass/>,text:"Dashboard",active:"dashboard"},
  {href:"/admin/orders",icon:<IoBag />,text:"Orders",active:"orders"},
  {href:"/admin/products",icon:<FaTshirt />,text:"Products",active:"products"},
  {href:"/admin/coupons",icon:<BiSolidCoupon/>,text:"Coupons",active:"coupons"},
  {href:"/admin/customers",icon:<HiUserGroup/>,text:"Customers",active:"customers"},
]

function Sidebar({setOpen}:{setOpen:React.Dispatch<React.SetStateAction<boolean>>}) {
  const path = usePathname()

  return (
    <div className='h-full flex flex-col max-sm:bg-background'>
        <div className='w-full p-4  flex gap-x-4'>
            <div className='sm:hidden' onClick={()=>{setOpen(prev=>!prev)}}><Menu/></div>
            <span className="font-extrabold">{LOGO}</span>
        </div>
        {
          path.split('/')[1] === 'admin' && (
            <div className='w-full flex flex-col justify-center items-center pr-2 pt-6'>
              <div className='flex flex-col gap-y-2 w-full pl-2'>
                  {
                      links.map((item,index)=><NavTab key={index} item={item}/>)
                  }
              </div>
            </div>
          )
        }
        <div className='w-full mt-auto p-4 flex gap-x-4 max-sm:hidden justify-between'>
          <Button variant="ghost" className='rounded-md grow-0'><div className='mr-4 scale-125'><RiLogoutCircleRFill/></div> Logout</Button>
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
            <div className={`w-full flex transition-colors items-center gap-x-5 p-2 px-4 hover:bg-primary-foreground rounded-sm font-semibold text-sm hover:text-primary ${path.split('/')[2] === item.active ?'text-primary':""}`}>
                <div className='scale-150'>{item.icon}</div>
                {item.text}
            </div>
        </Link>
    )
}