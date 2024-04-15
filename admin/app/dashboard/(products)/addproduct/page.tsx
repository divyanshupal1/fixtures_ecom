"use client"

import dynamic from 'next/dynamic'
import React,{ Suspense, useContext } from "react";

type SubImage = {
    get: File[]|undefined|null,
    set: (i:number,img:File)=>void
}

// export const subImgContext = React.createContext<SubImage>({get:null,set:(i:number,img:File)=>{}})

export default function Page() {

    // const SubImage = useContext(subImgContext)
    const [subImages, setSubImages] = React.useState<File[]|undefined|null>(null)
    function undateSubImage(i:number,img:File){
        let temp = subImages
        if(temp!=null)
            temp[i]=img
        setSubImages(temp)
    }

    const PageComponent = dynamic(
        () => import("./component"),{
            ssr: false
        }
    );

    return (
    <div className='w-full h-full mb-4'>
        {/* <subImgContext.Provider value={{get:subImages,set:undateSubImage}}> */}
        <Suspense fallback={<div>Loading...</div>}>
            <PageComponent />
        </Suspense>
        {/* </subImgContext.Provider> */}
    </div>
    );
}