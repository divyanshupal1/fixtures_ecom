"use client"

import Navbar from "@/components/system/navigation/navbar"
import Sidebar from "@/components/system/navigation/sidebar"
import { useState } from "react"




export default function StudentLayout({children}:{children:JSX.Element}) {
  const [open,setOpen]=useState(false)
  return (
    <main className="flex h-screen flex-col ">
      <div className="sm:hidden">
        <Navbar open={open} setOpen={setOpen}/>
      </div>
      <div className="w-full h-full flex ">
        <div className={`w-60  absolute top-0 transition-all duration-500 ease-in-out z-50 ${open?'left-[0%]':'max-sm:left-[-100%]'} max-sm:h-screen sm:relative`}>
          <Sidebar setOpen={setOpen}/>
        </div>
        <div className="sm:w-[calc(100%-15rem)] w-full p-1 max-sm:p-0 h-full ">
            <div className="w-full h-full rounded-xl max-sm:rounded-none bg-slate-50 dark:border-border dark:bg-slate-800 ">
              {children}
            </div>
        </div>        
      </div>
    </main>
  )
}
