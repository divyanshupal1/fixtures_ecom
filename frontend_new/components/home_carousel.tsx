"use client"

import React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { type CarouselApi } from "@/components/ui/carousel"
import { MdNavigateNext } from "react-icons/md";
import Autoplay from 'embla-carousel-autoplay'


const HomeCarousel = () => {

    const [api, setApi] = React.useState<CarouselApi>()

    const scrollNext = () => {
        if (!api) return
        api.scrollNext();
    }
    const scrollPrev = () => {
        if(!api) return
        api.scrollPrev();
        console.log("scrolling",api.slidesInView())
    }

    return (
        <Carousel className="w-full relative group rounded-md overflow-hidden shadow-md" setApi={setApi} opts={{loop:true}} plugins={[Autoplay({delay:5000})]} >
            <CarouselContent>
                {Array.from({ length: 3 }).map((_, index) => (
                    <CarouselItem key={index} className=" rounded-md overflow-hidden">
                            <div className="flex aspect-[5/2] items-center rounded-md justify-center p-6 bg-[url('https://sp-ao.shortpixel.ai/client/q_glossy,ret_img,w_1024/https://blog.bathselect.com/wp-content/uploads/2018/03/bathroom-1024x582.jpg')] bg-no-repeat bg-cover">
                            </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <button onClick={scrollPrev} className="group-hover:block hidden absolute top-1/2 -translate-y-1/2 left-2 rounded-full bg-primary p-2 text-primary-foreground ">
                <div className="scale-150 rotate-180"><MdNavigateNext/></div>
            </button>
            <button onClick={scrollNext} className="group-hover:block hidden absolute top-1/2 -translate-y-1/2 right-2 rounded-full bg-primary p-2 text-primary-foreground ">
                <div className="scale-150"><MdNavigateNext/></div>
            </button>
        </Carousel>
    )
}

export default HomeCarousel