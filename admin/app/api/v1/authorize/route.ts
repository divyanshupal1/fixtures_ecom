import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {accessToken} = await req.json() 
    let response =  NextResponse.json({message:"authorized"})     
    response.cookies.set("accessToken", accessToken)
    return response

}