'use client'

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { GenreMovies } from './../../../interface/genre';
import Link from 'next/link';
import Image from 'next/image';

export default function Genre() {

     const { genreId , category } = useParams();

     let [movie , setMovie] = useState<GenreMovies>()

     async function getGenre(){

   const res = await fetch(`https://api.themoviedb.org/3/discover/${category}?with_genres=${genreId}`, {
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
    getGenre()
},[])
  return (
    <div className='p-5 lg:px-20 '>
      {movie?.results.map((ele)=>{

        return <div key={ele.id} className="rounded-2xl border-2 shadow-2xs flex my-6 items-start hover:border-blue-900 hover:shadow-xl transition-all duration-300">


  <div className="shrink-0 w-[100px] h-[150px] sm:w-[120px] sm:h-[180px] md:w-[140px] md:h-[210px] overflow-hidden rounded-l-2xl bg-gray-200">
    <Link href={`/${category}/${ele.id}`}>
      <Image
        src={`https://image.tmdb.org/t/p/original${ele.poster_path}`}
        alt="Poster"
        width={500}
        height={750}
        className="w-full h-full object-cover"
      />
    </Link>
  </div> 

 
  <div className="p-5 flex-1">
    <Link href={`/${category}/${ele.id}`}>
      <h1 className="font-bold hover:text-blue-600">
        {ele.title}
        {ele.name}
        {ele.title !== ele.original_title && (
          <span className="text-gray-500"> ({ele.original_title})</span> )}
           {ele.name !== ele.original_name && (
          <span className="text-gray-500"> ({ele.original_name})</span> )}
      </h1>
    </Link>

    <span className="text-gray-600 font-bold text-sm">
    {new Date(ele.first_air_date || ele.release_date).toDateString()}
    </span>

    <p className="mt-3 line-clamp-2">{ele.overview}</p>
  </div>
</div>

      })}
    </div>
  )
}
