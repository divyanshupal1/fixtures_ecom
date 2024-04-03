"use client"

import * as React from "react"
import { ChevronDown, ChevronsUpDown, Plus, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { NavTab } from "./sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

type NavTabProps = {
    item:{
        href?:string,
        icon:JSX.Element,
        text:string,active?:string,
        type?:string,
        items?:{
            href?:string,
            icon:JSX.Element,
            text:string,
            active?:string
        }[]
    },
    close:React.Dispatch<React.SetStateAction<boolean>>
}


export function CollapsibleTabs({item,close}:NavTabProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const path = usePathname()
  let active = path.split('/')[2]
  const [groupOpen, setGroupOpen] = React.useState(false)

  React.useEffect(() => {
    let local = false;
    item.items?.forEach((item) => {
      if (item.active === active) {
        local = true
      }
    })
    setGroupOpen(local)
  }, [path])

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full"
    >    
      <CollapsibleTrigger asChild>
            <div className={`w-full flex transition-colors items-center gap-x-5 p-2 px-4 hover:bg-primary-foreground rounded-sm font-semibold text-sm hover:text-primary ${groupOpen ?'text-primary':""} `}>
                <div className='scale-150'>{item.icon}</div>
                <span> {item.text} </span> 
                <div className={`transition-all ml-auto ${isOpen?"rotate-180":""}`}>
                    <ChevronDown/>
                </div>                
            </div>
      </CollapsibleTrigger>
      {/* <div className={`w-full ${isOpen?"bg-slate-400 p-1":""} rounded-b-sm bg-opacity-20`}> */}
        <CollapsibleContent className="space-y-2 pl-4">
        {
          item?.items?.map((item, index) => (
            <NavTab key={index} item={item} close={close} />
          ))
        }
        </CollapsibleContent>
    {/* </div> */}
    </Collapsible>
  )
}
