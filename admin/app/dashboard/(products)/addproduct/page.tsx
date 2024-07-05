"use client"

import dynamic from 'next/dynamic'
import React,{ Suspense, useContext } from "react";

export default function Page() {

    const PageComponent = dynamic(
        () => import("./component"),{
            ssr: false
        }
    );

    return (
    <div className='w-full h-full mb-4'>
        <Suspense fallback={<div>Loading...</div>}>
            <PageComponent/>
        </Suspense>
    </div>
    );
}