"use client"
import React from 'react';
import { ModeToggle } from '@/components/themeToggle';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {LOGO} from "@/constants";
import { Button } from '@/components/ui/button';
import { ExitIcon } from '@radix-ui/react-icons';

function Navbar({ open, setOpen }:{open?:boolean, setOpen?:React.Dispatch<React.SetStateAction<boolean>>}) {
  const path = usePathname()

  return (
    <div className="w-full p-3 bg-primary-foreground flex items-center justify-between">
      <div className="flex items-center gap-x-4">
       {path!='/login' && <div className="sm:hidden" onClick={() =>setOpen && setOpen((prev) => !prev)}>
          <Menu />
        </div>}
        <span className="font-extrabold">{LOGO}</span>
      </div>
      <div>
      <div className='w-full flex gap-x-4'>
          <Button variant="outline" className='rounded-md flex-grow'><ExitIcon className='mr-4'/> Logout</Button>
          <ModeToggle/>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
