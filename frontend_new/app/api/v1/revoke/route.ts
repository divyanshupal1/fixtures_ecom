import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){ 
    let response =  NextResponse.json({message:"authorization revoked"})     
    response.cookies.set("token", "")
    return response
}