'use client'
import SearchBar from '@/app/(main)/components/SearchBar/SearchBar';
import { TopRated } from '@/app/interface/topRated';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function page() {

     const {media , category} = useParams();
     let [top , setTop] = useState<TopRated>()


      const searchParams = useSearchParams();
     
       const currentPage = Number(searchParams.get("page")) || 1;
     
         const totalPages = Math.min(top?.total_pages ?? 1, 500);
         const pageLimit = 6; 
     
     
     let startPage = Math.max(1, currentPage - 2);
     let endPage = startPage + pageLimit - 1;
     
     if (endPage > totalPages) {
       endPage = totalPages;
       startPage = Math.max(1, endPage - pageLimit + 1);
     }
     
     
     const pages = [];
     for (let i = startPage; i <= endPage; i++) {
       pages.push(i);
     }
     

      async function getTopRated() {
      const res = await fetch(`https://api.themoviedb.org/3/${media}/${category}?language=en-US&page=${currentPage}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTk2YTY3ZjY4MmQyYWIyZjgwOTk5OWE3MzU4MTJmNiIsIm5iZiI6MTc2Mzc1MTg4My4xNDksInN1YiI6IjY5MjBiN2NiNWFlMDM4OGMwNzRhMzE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DevpJv_3L3zB123khbskCqC44cL8oI-n40Ws4eT4QoQ`,
          accept: "application/json",
        },
      });
    
      const data = await res.json();
      console.log(data);
      setTop(data)
    }

    useEffect(()=>{
        getTopRated()
    },[])
  return (
    <div className='p-10'>

      <SearchBar/>

          {media === "movie" ? <> <div className='mb-5'> <h1 className='text-3xl font-bold'>{category} movies</h1></div></> : <> <div className='mb-5'> <h1 className='text-3xl font-bold'>{category} Tv shows</h1></div></>}
          

          <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5  md:gap-5'>

               {top?.results?.map((ele)=>{

            return <div key={ele.id} className=' relative border-2 shadow-2xl rounded-2xl my-10 md:my-0 hover:scale-105 transition-transform duration-300 mt-4'>

                    <div className="relative w-full aspect-2/3  p-0">
                          <Link href={`/${media}/${ele.id}`}> <Image
                                    src={`https://image.tmdb.org/t/p/original${ele.poster_path}`}
                                    alt="background"
                                    fill
                                    className="object-cover rounded-t-xl"
                                  /></Link>

                                    <div className="absolute left-3 -bottom-5 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center z-20">
    <svg viewBox="0 0 36 36" className="w-10 h-10">
      <circle
        className="stroke-gray-800"
        cx="18"
        cy="18"
        r="15.9155"
        strokeWidth="3.8"
        fill="none"
      />

      <circle
        className={`${
          Math.round(ele.vote_average * 10) >= 70
            ? "stroke-green-600"
            : Math.round(ele.vote_average * 10) >= 50
            ? "stroke-amber-400"
            : "stroke-red-600"
        }`}
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
        fill="white"
      >
        {Math.round(ele.vote_average * 10)}%
      </text>
    </svg>
  </div>
                    </div>

 
 <div className='p-3'>
   <Link href={`/${media}/${ele.id}`}>  <h3 className='text-black mt-5 hover:text-blue-700'>{ele.original_name || ele.name || ele.original_title}</h3></Link>
    <span className='text-gray-500 font-light'>{ele.release_date ? new Date(ele.release_date).toDateString() : ele.first_air_date ? new Date(ele.first_air_date).toDateString() : "" }</span>
</div>




            </div>
          })}

          </div>

         <div className="mt-5">
<Pagination>
  <PaginationContent>
   
    <PaginationItem>
      <PaginationPrevious
        href={`?page=${currentPage > 1 ? currentPage - 1 : 1}`}
      />
    </PaginationItem>

    
    {startPage > 1 && (
      <PaginationItem>
        <PaginationLink href="?page=1" isActive={currentPage === 1}>
          1
        </PaginationLink>
      </PaginationItem>
    )}

    {startPage > 2 && (
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
    )}

    
    {pages.map((page) => (
      <PaginationItem key={page}>
        <PaginationLink href={`?page=${page}`} isActive={currentPage === page}>
          {page}
        </PaginationLink>
      </PaginationItem>
    ))}

    
    {endPage < totalPages - 1 && (
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
    )}

    
    {endPage < totalPages && (
      <PaginationItem>
        <PaginationLink
          href={`?page=${totalPages}`}
          isActive={currentPage === totalPages}
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    )}

    
    <PaginationItem>
      <PaginationNext
        href={`?page=${currentPage < totalPages ? currentPage + 1 : currentPage}`}
      />
    </PaginationItem>
  </PaginationContent>
</Pagination>
      </div>
     
    </div>
  )
}
