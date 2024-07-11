/* eslint-disable react/no-unescaped-entities */
"use client"
import {useEffect, useState} from "react"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/lib/axiosInstance";
// import useCurrentUser from "@/hooks/loggedUser";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter ,redirect } from 'next/navigation'
import { CheckCircle, Eye} from "lucide-react";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";

export function LoginForm() {
  // const {user,loading} = useCurrentUser();

  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [msg, setMsg] = useState<null|string>(null)

  const [loading, setLoading] = useState(0)

  useEffect(() => {
    if(username.length>5&&password.length>5) setLoading(0)
    else setLoading(3)
  }, [username,password])

  function SignMeIN(){
      setLoading(1)
      axiosInstance.post("/users/login",{ 
        username:username,
        password:password 
      })
      .then((res) => res.data).then((data)=>{
        if(data.success) {
          axios.post("/api/v1/authorize", {accessToken: data.data.accessToken})
          .then(()=>{
            setMsg("Successfully logged in")
            document.location.reload()
          }); 
          setLoading(2)
        }
        else{ 
          if(data.statusCode==401) setMsg("Invalid Credentials")
          if(data.statusCode==404) setMsg("User not found")
          else setMsg("Something went wrong")
          setLoading(0)
        }
      }).catch((err)=>{
        setMsg("Something went wrong")
        console.log(err)
        setLoading(0)
      })
  }

  return (

        <div className="w-[380px] max-sm:w-11/12 p-6 max-sm:p-3 max-sm:py-6 rounded-3xl -mt-10 max-sm:mt-[-200px] dark:bg-slate-900 bg-slate-100 bg-opacity-80 border drop-shadow-md">
          <div >
            <div className="text-lg font-bold leading-4 p-4">Login</div>
          </div>
          <div className="space-y-5 mt-3 p-4">
            <form onSubmit={(e)=>{
              e.preventDefault()
              SignMeIN()
            }}
            className="space-y-5"
            >
            <div className="space-y-2">
              <Label htmlFor="name">Username or Email</Label>
              <Input id="name" name="username" placeholder="Username" className="py-5 bg-primary-foreground" value={username} onChange={(e)=>setUsername(e.target.value)} />
            </div>
            <div className="space-y-2 relative">
              {showPassword?
                <Eye className="absolute bottom-2 right-2 cursor-pointer" onClick={()=>setShowPassword(!showPassword)} onMouseLeave={()=>setShowPassword(!showPassword)}/>:
                <EyeClosedIcon className="absolute bottom-3 right-3 cursor-pointer" onClick={()=>setShowPassword(!showPassword)}/>
              }
              <Label htmlFor="username">Password</Label>
              <Input id="password" name="password" type={showPassword?"text":"password"} className="py-5 bg-primary-foreground" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className="space-y-2 gap-x-4 w-full flex pt-5 justify-center">
              <Button className="px-8 py-5 w-full rounded-full cursor-pointer" type="submit" disabled={loading!=0&&true}>
                {
                  loading==0?"Login":
                  loading==1?<div className="scale-125"><AiOutlineLoading3Quarters className="animate-spin"/></div>:
                  loading==2?<CheckCircle/>:
                  "Login"
                }
              </Button>
            </div>
            </form>
            {msg&& <div className="space-y-2"><div className="text-sm text-center text-red-700 font-medium">{msg}</div></div>}
          </div>

        </div>
  )
}



