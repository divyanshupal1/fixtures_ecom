"use client"
import { Box, GlassWater, Menu,UserPlus2} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Presentation ,Users,Hand } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {LOGO} from "@/constants";
function Sidebar({open,setOpen}) {
  const path = usePathname()
  const links = [
      {href:"/teacher/students",icon:<UserPlus2/>,text:"Admin Plus+",active:"students"},
      {href:"/teacher/classes",icon:<Box/>,text:"Orders",active:"classes"},
      {href:"/teacher/attendance",icon:<GlassWater/>,text:"Products",active:"attendance"},
  ]
  return (
    <div className='h-full bg-primary-foreground flex flex-col'>
        <div className='w-full p-4  flex gap-x-4 sm:hidden'>
            <div className='' onClick={()=>{setOpen(prev=>!prev)}}><Menu/></div>
            <span className="font-extrabold">{LOGO}</span>
        </div>
        {
          path.split('/')[1] === 'teacher' && (
            <div className='w-full flex flex-col justify-center items-center pr-2 pt-9'>
              <div className='flex flex-col gap-y-2 w-full pl-2'>
                  {
                      links.map((item,index)=><NavTab key={index} item={item}/>)
                  }
              </div>
            </div>
          )
        }
        <div className='w-full mt-auto p-4'>
          hello
        </div>
    </div>
  )
}

export default Sidebar

function NavTab({item}){
    const path = usePathname()
    return (
        <Link href={item.href} className='w-full'>
            <div className={`w-full flex transition-colors items-center gap-x-3 p-3 px-6 rounded-full hover:bg-primary hover:text-white ${path.split('/')[2] === item.active ?'bg-primary text-white':""}`}>
                {item.icon}
                {item.text}
            </div>
        </Link>
    )
}