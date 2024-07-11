"use client"
import React, { useEffect, useState } from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { IoCartOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
// import { Transition } from "@headlessui/react";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="w-full shadow-sm">
            <nav className="w-full flex justify-between px-8 items-center space-x-4">
                <div className="logo font-extrabold text-lg">Fixtures</div>
                <div className="flex justify-start items-center w-full h-full max-w-[1200px] ">
                    <div className="w-full h-[60px]  max-w-[300px] flex justify-between items-center ">
                        <NavTab href="/" active="">Home</NavTab>
                        <NavTab href="/products" active="products">Products</NavTab>
                        <NavTab href="/contact" active="contact">Contact</NavTab>
                    </div>
                    <div className="border-neutral-500 ml-auto border-2 rounded-full overflow-hidden p-2 px-2 flex items-center gap-x-2 w-full max-w-sm"><IoSearch/><input className="outline-none text-sm h-full w-full" placeholder="Search"/></div>
                    
                    <div className="user-actions flex space-x-8 items-center ml-auto">
                        {/* <div className="scale-125 p-2"><IoIosHeartEmpty strokeWidth={"px"}/></div> */}
                        <UserCart/>
                        <UserMenu/>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Nav;


const NavTab = ({href, active,children}:{href:string,active:string,children:React.ReactNode}) => {
    const path = usePathname();
    return (
        <Link href={href} className={cn("font-medium border-b-4 h-full flex items-center px-2",active==path.split("/")[1]?"border-primary text-primary ":"border-transparent")}>{children}</Link>
    )

}


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" 
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import useCartStore from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";

const UserMenu = () => {
    const router = useRouter()
    const {user,getUser,logout} = useUserStore((state)=>({
        user: state.user,
        getUser: state.getUser,
        logout: state.logout    
    }))
    useEffect(()=>{
        getUser()
    },[getUser])
    return (
        <>
        {
            user==null? <Button className="rounded-full px-4" size={"sm"} onClick={()=>router.push('/login')}>Login</Button> :
        
        <DropdownMenu>
            <DropdownMenuTrigger><div className="flex justify-center items-center scale-105 w-8 h-8 bg-primary text-primary-foreground rounded-full">{user!=null?user?.username.at(0)?.toUpperCase():<div></div>}</div></DropdownMenuTrigger>
            <DropdownMenuContent className="mr-2 mt-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        }
        </>
    )
}



const UserCart = () => {
    const {user} = useUserStore((state)=>({
        user: state.user,
    }))
    const {cart,getCart} = useCartStore((state)=>({
        cart: state.cart,
        getCart:state.getCart
    
    }))

    useEffect(()=>{
        if( user!=null) getCart()
    },[getCart,user])

    return (
        <Link href="/cart">
        <div className="relative">
            <div className="scale-125 p-2"><IoCartOutline/></div>
            <div className="absolute -right-1 -top-1 bg-primary rounded-full text-white p-0.5 w-6 h-6 text-center flex items-center justify-center scale-75">{cart.items.length}</div>
        </div>
        </Link>
    )
}