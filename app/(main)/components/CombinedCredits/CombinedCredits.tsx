'use client'
import { Credits } from '@/app/interface/CombinedCredits'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function CombinedCredits({actorId} : {actorId : number}) {

    let [movie , setMovie] = useState<Credits>()

      async function getCombinedCredits(){

   const res = await fetch(`https://api.themoviedb.org/3/person/${actorId}/combined_credits`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTk2YTY3ZjY4MmQyYWIyZjgwOTk5OWE3MzU4MTJmNiIsIm5iZiI6MTc2Mzc1MTg4My4xNDksInN1YiI6IjY5MjBiN2NiNWFlMDM4OGMwNzRhMzE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DevpJv_3L3zB123khbskCqC44cL8oI-n40Ws4eT4QoQ`,
        accept: "application/json",
      },
    });

    const data = await res.json();
    setMovie(data)
    console.log(data);
}

useEffect(()=>{
    getCombinedCredits()
},[])
  return (
    <div className='p-9 md:p-14'>

        <h1 className=' text-xl font-bold mb-3 '>Known for</h1>

          <div className='flex justify-center items-center  '>
             <Carousel
      opts={{
        align: "start",
      }}
      className=" w-11/12 md:w-full p-0"
    >
    <CarouselContent className="p-0">
  {movie?.cast.slice(0,10).map((ele) => (
  
    <CarouselItem
      key={ele.id}
      className=" basis-1/2 md:basis-1/3 lg:basis-1/5" >

        <div className='relative'>

         <Link href = {`/${ele.media_type}/${ele.id}`}>
           <Card className='p-0'>
        <CardContent className="relative w-full aspect-2/3 overflow-hidden p-0">
          <Image
            src={`https://image.tmdb.org/t/p/original${ele.poster_path}`}
            alt="background"
            fill
            className="object-cover rounded-xl"
          />
        </CardContent>

      </Card>

         </Link>
<div className="absolute bg-gray-800 rounded-full left-4 -bottom-5 w-10 h-10 text-white">
  <svg viewBox="0 0 36 36" className="w-full h-full">
  
    <circle
      className="stroke-gray-800"
      cx="18"
      cy="18"
      r="15.9155"
      strokeWidth="3.8"
      fill="none"
    />
   
    <circle
      className = {`${Math.round(ele.vote_average * 10) >=70 ? "stroke-green-600" : Math.round(ele.vote_average * 10) >=50 ? "stroke-amber-400" : "stroke-red-600"  }`}
      cx="18"
      cy="18"
      r="15.9155"
      strokeWidth="3.8"
      fill="none"
      strokeDasharray={`${Math.round(ele.vote_average * 10)}, 100`}  // 70% progress
      strokeDashoffset="25"             // optional: rotate start to top
      strokeLinecap="round"
      transform="rotate(-90 18 18)"     // start from top
    />
    {/* Centered number */}
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dominantBaseline="central"        // perfect vertical centering
      className="text-sm"
      fill='white'
    >
      {Math.round(ele.vote_average * 10)}%
    </text>
  </svg>
</div>



        </div>
     
      <div>
    <h3 className='text-black mt-5'>{ele.original_name || ele.name || ele.original_title}</h3>
    <span className='text-gray-500 font-light'>{ele.release_date ? new Date(ele.release_date).toDateString() : ele.first_air_date ? new Date(ele.first_air_date).toDateString() : "" }</span>
</div>
    </CarouselItem>
  ))}
</CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    
        </div>
      
    </div>
  )
}
