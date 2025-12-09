"use client"
import {  TrendingMovies } from '@/app/interface/trending';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function Trending() {

   let [movie , setMovie] = useState<TrendingMovies>()

   let [category , setCategory] = useState<"all" | "movie" | "tv">("all")

    async function getTrendingMovies(type:"all" | "movie" | "tv") {
      const res = await fetch(`https://api.themoviedb.org/3/trending/${type}/day`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTk2YTY3ZjY4MmQyYWIyZjgwOTk5OWE3MzU4MTJmNiIsIm5iZiI6MTc2Mzc1MTg4My4xNDksInN1YiI6IjY5MjBiN2NiNWFlMDM4OGMwNzRhMzE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DevpJv_3L3zB123khbskCqC44cL8oI-n40Ws4eT4QoQ`,
          accept: "application/json",
        },
      });
    
      const data = await res.json();
      console.log(data);
      setMovie(data)
    }
    
   
    
      useEffect(() => {
        
        getTrendingMovies(category);
      }, [category]);
    
  return (
    <div className='py-10 px-16'>

       
       
  <div className="flex flex-col sm:flex-row sm:items-center mb-5 gap-4">
  <h1 className="text-2xl font-bold sm:ml-8 md:ml-20 lg:ml-36">
    Trending
  </h1>

  <Tabs
    className="sm:ml-4 rounded-2xl w-full sm:w-auto"
    value={category}
    onValueChange={(v) =>
      setCategory(v as "all" | "movie" | "tv")
    }
  >
    <TabsList
      className="
        bg-white border-2 border-black rounded-2xl
        w-full sm:w-auto flex justify-between sm:justify-start
      "
    >
      <TabsTrigger
        value="all"
        className="
          rounded-3xl px-6 py-2 text-black
          hover:bg-blue-950 hover:text-yellow-400 
          data-[state=active]:bg-blue-950 data-[state=active]:text-yellow-400
          flex-1 sm:flex-none
        "
      >
        All
      </TabsTrigger>

      <TabsTrigger
        value="movie"
        className="
          rounded-3xl px-6 py-2 text-black mx-2
          hover:bg-blue-950 hover:text-yellow-400 
          data-[state=active]:bg-blue-950 data-[state=active]:text-yellow-400
          flex-1 sm:flex-none
        "
      >
        Movie
      </TabsTrigger>

      <TabsTrigger
        value="tv"
        className="
          rounded-3xl px-6 py-2 text-black
          hover:bg-blue-950 hover:text-yellow-400 
          data-[state=active]:bg-blue-950 data-[state=active]:text-yellow-400
          flex-1 sm:flex-none
        "
      >
        TV
      </TabsTrigger>
    </TabsList>
  </Tabs>
</div>

        <div className='flex justify-center items-center  '>
             <Carousel
      opts={{
        align: "start",
      }}
      className=" w-11/12 md:w-full p-0"
    >
    <CarouselContent className="p-0">
  {movie?.results?.map((ele) => (
  
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
      strokeDasharray={`${Math.round(ele.vote_average * 10)}, 100`}  
      strokeDashoffset="25"             
      strokeLinecap="round"
      transform="rotate(-90 18 18)"    
    />
  
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dominantBaseline="central"        
      className="text-sm"
      fill='white'
    >
      {Math.round(ele.vote_average * 10)}%
    </text>
  </svg>
</div>



        </div>
     
      <div>
   <Link href={`/${ele.media_type}/${ele.id}`}>  <h3 className='text-black mt-5 hover:text-blue-700'>{ele.original_name || ele.name || ele.original_title}</h3></Link>
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
