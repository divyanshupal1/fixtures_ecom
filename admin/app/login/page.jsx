"use client"

import React from 'react'
import Navbar from '@/components/system/navigation/navbar'
import { LoginForm } from '@/components/system/login/form'

function Page() {
  return (
    <div className={"h-screen w-screen flex flex-col"}>
      <Navbar/>
      <div className='grow flex justify-center items-center bg-[linear-gradient(90deg,#56CCF2,#2F80ED)]'>
          <LoginForm/>
      </div>
    </div>
  )
}

export default Page

