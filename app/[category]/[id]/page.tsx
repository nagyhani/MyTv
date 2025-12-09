'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { TrendingMovies } from '../../interface/trending';
import Image from 'next/image';
import { Details } from '../../interface/details';
import { h1 } from 'framer-motion/client';
import Link from 'next/link';
import { log } from 'console';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Credits } from '@/app/interface/credits';
import { Trailers } from '@/app/interface/Trailers';

export default function Page() {

  const { id , category } = useParams();


  
  

  let [details , setDetails] = useState<Details>()

  let [credits , setCredits] = useState<Credits>()

  let [trailer , setTrailer] = useState<Trailers>()
 
async function getCredits(){

   const res = await fetch(`https://api.themoviedb.org/3/${category}/${id}/credits`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTk2YTY3ZjY4MmQyYWIyZjgwOTk5OWE3MzU4MTJmNiIsIm5iZiI6MTc2Mzc1MTg4My4xNDksInN1YiI6IjY5MjBiN2NiNWFlMDM4OGMwNzRhMzE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DevpJv_3L3zB123khbskCqC44cL8oI-n40Ws4eT4QoQ`,
        accept: "application/json",
      },
    });

    const data = await res.json();
    setCredits(data)
    console.log(data);


}


async function getTrailer(){

   const res = await fetch(`https://api.themoviedb.org/3/${category}/${id}/videos`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTk2YTY3ZjY4MmQyYWIyZjgwOTk5OWE3MzU4MTJmNiIsIm5iZiI6MTc2Mzc1MTg4My4xNDksInN1YiI6IjY5MjBiN2NiNWFlMDM4OGMwNzRhMzE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DevpJv_3L3zB123khbskCqC44cL8oI-n40Ws4eT4QoQ`,
        accept: "application/json",
      },
    });

    const data = await res.json();
     setTrailer(data)
    console.log(data);


}

  async function getMovieDetails() {
   

    const res = await fetch(`https://api.themoviedb.org/3/${category}/${id}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTk2YTY3ZjY4MmQyYWIyZjgwOTk5OWE3MzU4MTJmNiIsIm5iZiI6MTc2Mzc1MTg4My4xNDksInN1YiI6IjY5MjBiN2NiNWFlMDM4OGMwNzRhMzE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DevpJv_3L3zB123khbskCqC44cL8oI-n40Ws4eT4QoQ`,
        accept: "application/json",
      },
    });

    const data = await res.json();
setDetails(data)
    console.log(data);
   
  }

  useEffect(() => {
    if (id) getMovieDetails();
  }, [id]);

  useEffect(()=>{
    getCredits()
  },[])

  useEffect(()=>{
    getTrailer()
  },[])
  return <div>
    
    <div className="w-full h-[275px] sm:h-[400px] md:h-[500px]  relative  ">
      
  <Image
    src={`https://image.tmdb.org/t/p/original${details?.backdrop_path}`}
    alt="Backdrop"
    fill
    className="object-cover"
    priority
  />

<div className='z-20 flex flex-col p-3.5 md:p-5'>

  <div className="relative w-full max-w-[120px]  md:max-w-[250px] lg:max-w-[286px] aspect-2/3">
    <Image
      src={`https://image.tmdb.org/t/p/original${details?.poster_path}`}
      alt="Poster"
      fill
      className="rounded-xl object-cover z-20"
    />
  </div>

  <div className='flex  justify-center items-center mt-2.5'>
    <h1 className='z-20 text-xl md:text-3xl text-white font-bold'>
      {details?.original_title || details?.title || details?.original_name}
    </h1>

    <span className='z-20 text-gray-300 text-lg md:text-xl font-bold mx-1.5'>
     ({new Date(details?.first_air_date || details?.release_date || "").getFullYear()})
    </span>
  </div>

</div>
 
  <div className='bg-amber-900/55 absolute top-0 left-0 right-0 bottom-0'></div>
</div>

<div className='flex lg:items-center lg:justify-center  flex-col p-3.5 lg:flex-row'>
  <div className=" bg-gray-800 rounded-full  w-10 h-10 md:w-14 md:h-12 lg:w-14 lg:h-14 text-white z-20 m-3">
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
      className = {`${Math.round(details?.vote_average as number * 10) >=70 ? "stroke-green-600" : Math.round(details?.vote_average as number * 10) >=50 ? "stroke-amber-400" : "stroke-red-600"  }`}
      cx="18"
      cy="18"
      r="15.9155"
      strokeWidth="3.8"
      fill="none"
      strokeDasharray={`${Math.round(details?.vote_average as number * 10)}, 100`}  
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
      {Math.round(details?.vote_average as number * 10)}%
    </text>
  </svg>

</div>

<span className='font-bold  md:text-xl'>
  User Score
</span>

<span className=' text-white w-0 h-0 mx-1.5 font-bold md:text-xl '> |</span>

<span className='font-bold md:text-lg  lg:w-auto'>
  {details?.origin_country ?  (details?.origin_country[0]) : ""} <span className=' sm:w-0 sm:h-0 mx-1.5 font-bold md:text-xl '> |</span> {details?.runtime ? details?.runtime + " Mins"  : "" } {details?.number_of_seasons ? "Seasons: " + details.number_of_seasons : ""} <span className=' sm:w-0 sm:h-0 mx-1.5 font-bold md:text-xl '> |</span> {details?.number_of_episodes ? "Episodes: " + details.number_of_episodes : ""}

</span>




 <div className='flex lg:ml-1.5  font-bold md:text-xl'>


  <Link target='_blank' href={details?.homepage ? details?.homepage : "" }>

  <h2>Official website</h2>
  
  </Link>
</div>

<span className=' text-white lg:text-black lg:w-auto lg:h-auto w-0 h-0 mx-1.5 font-bold md:text-xl '> |</span>

<div className="flex font-bold gap-2  my-1 md:my-0 md:text-xl">
  {details?.genres?.map(g => (
    <Link key={g.id} href={`/Genre/${category}/${g.id}`}>
      <h1 className="cursor-pointer hover:underline ">
        {g.name}
      </h1>
    </Link>
  ))}
</div>

</div>


<div className='p-7 md:text-xl'>
  <h1 className=' text-gray-600 mb-4'>{details?.tagline}</h1>

  <h1 className='text-2xl font-bold my-0.5'>Overview</h1>

<h2>
  {details?.overview}
</h2>
</div>


{trailer?.results && trailer.results.length > 0 ? <div className='aspect-video w-full '>
  <iframe className='my-9 w-full h-full lg:h-4/5' src={`https://www.youtube.com/embed/${trailer?.results[0].key}`} title='Trailer' allowFullScreen >

  </iframe>
</div> : ""}

 <div className='flex justify-center items-center m-14  '>
             <Carousel
      opts={{
        align: "start",
      }}
      className="w-11/12 md:w-full p-0"
    >
    <CarouselContent className="p-0">
  {credits?.cast?.map((actor) => (
  
    <CarouselItem key={actor.cast_id}
      className=" basis-1/2 md:basis-1/3 lg:basis-1/5" >

        <div className='relative'>

              <Card className='p-0'>
      <Link href={`/Actor/${actor.id}`}>
        <CardContent className="relative w-full aspect-2/3 overflow-hidden p-0">
          <Image
            src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
            alt="background"
            fill
            className="object-cover rounded-t-xl"/>

           
        </CardContent>
      </Link>

         <div className='p-2'>
          <Link href={`/Actor/${actor.id}`}>
          <h1 className='text-lg font-bold hover:text-gray-500'>{actor.original_name}</h1>
          </Link>
            <h3 className='font-light'>{actor.character}</h3>
         </div>

      </Card>




        </div>
     
      <div>
    
</div>
    </CarouselItem>

     
  

    
  ))}
</CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    
        </div>

  </div>;
}