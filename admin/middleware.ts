import { NextRequest, NextResponse } from 'next/server'
import jwt, { decode } from "jsonwebtoken";

export function middleware(request:NextRequest) {

  const path = request.nextUrl.pathname
  if(path === '/'){
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }
  
  const isPublicPath = path === '/login'

  const token = request.cookies.get('accessToken')?.value || false

  if(token==false && !isPublicPath){
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  const decoded = jwt.decode(token as string,{complete:true})?.payload || {}
  const role = Object(decoded).role || ''

  if(decoded==null && !isPublicPath){
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  if((role==='ADMIN'|| role === 'SUPERADMIN') && isPublicPath  ){
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))    
  }
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/login',
    '/signup',
    '/verifyemail'
  ]
}