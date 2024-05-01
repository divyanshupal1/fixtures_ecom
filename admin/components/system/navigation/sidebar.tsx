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
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/themeToggle'
import { RiLogoutCircleRFill } from "react-icons/ri";
import { FaTableList } from "react-icons/fa6";
import UserCard from '../userCard';
import { CollapsibleTabs } from './collapsibleTab';
import { MdCategory } from 'react-icons/md';
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { useUserStore } from '@/store/userStore';

const links = [
  {type:'tab',href:"/dashboard/admin",icon:<FaUser/>,text:"Admin",active:"admin"},
  {type:'tab',href:"/dashboard",icon:<FaCompass/>,text:"Dashboard",active:"dashboard"},
  {type:'tab',href:"/dashboard/orders",icon:<IoBag />,text:"Orders",active:"orders"},
  {type:'group',icon:<FaTshirt />,text:"Products",items:[
    {href:"/dashboard/categories",icon:<MdCategory/>,text:"Categories",active:"categories"},
    {href:"/dashboard/productlist",icon:<FaTableList/>,text:"Product List",active:"productlist"},
    {href:"/dashboard/addproduct",icon:<TbSquareRoundedPlusFilled/>,text:"Add Prodcut",active:"addproduct"},
  ]},
  {type:'tab',href:"/dashboard/coupons",icon:<BiSolidCoupon/>,text:"Coupons",active:"coupons"},
  {type:'tab',href:"/dashboard/customers",icon:<HiUserGroup/>,text:"Customers",active:"customers"},
]

function Sidebar({setOpen,open}:{open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>}) {
  const path = usePathname()

  const {logout} = useUserStore((state)=>({
    logout:state.logout
  }));


  return (
    <>
    <div className='h-full flex flex-col max-sm:bg-background sm:pt-4'>
        <div className='w-full p-4  flex gap-x-4'>
            <div className='sm:hidden' onClick={()=>{setOpen(prev=>!prev)}}><Menu/></div>
            <span className="font-extrabold">{LOGO}</span>
        </div>
        <div className='w-full p-2'>
         <UserCard/>
        </div>
        {
          path.split('/')[1] === 'dashboard' && (
            <div className='w-full flex flex-col justify-center items-center pr-2 pt-6'>
              <div className='flex flex-col gap-y-2 w-full pl-2'>
                  {
                    links.map((item,index)=> 
                    item.type === 'tab'?                     
                      <NavTab key={index} item={item} close={setOpen} />:     
                      <CollapsibleTabs key={index} item={item} close={setOpen}/>
                    )
                  }
              </div>
            </div>
          )
        }
        <div className='w-full mt-auto p-4 flex gap-x-4 max-sm:hidden justify-between'>
          <Button onClick={()=>{
            logout()
          }} variant="ghost" className='rounded-md grow-0'><div className='mr-4 scale-125'><RiLogoutCircleRFill/></div> Logout</Button>
          <ModeToggle/>
        </div>
    </div>
    {open&&<div onClick={()=>setOpen(false)} className='fixed sm:hidden -z-10 w-screen h-screen bg-black bg-opacity-45 top-0 left-0'/>}
    </>
  )
}

export default Sidebar

export function NavTab({item,close}:{item:{href?:string,icon:JSX.Element,text:string,active?:string},close:React.Dispatch<React.SetStateAction<boolean>>}){
    const path = usePathname()
    let active = path.split('/')[2]
    if(item.active=='dashboard' && path.split('/').length === 2){
        active = path.split('/')[1]
    }
    return (
        <Link href={item.href || "/"} className='w-full' onClick={()=>close(false)}>
            <div className={`w-full flex transition-colors items-center gap-x-5 p-2 px-4 hover:bg-primary-foreground rounded-sm font-semibold text-sm hover:text-primary ${active === item.active ?'text-primary':""}`}>
                <div className='scale-150'>{item.icon}</div>
                {item.text}
            </div>
        </Link>
    )
}