'use client'
import SearchBar from '@/app/(main)/components/SearchBar/SearchBar';
import { Search } from '@/app/interface/Search';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function page() {
  const {media , query} = useParams();



     const searchParams = useSearchParams();
      const pageParam = Number(searchParams.get("page")) || 1;
    
     

     const [results, setResults] = useState<Search>();

       useEffect(() => {
         if (!query) return;
     
         async function searchTMDB() {
         
           const res = await fetch(
             `https://api.themoviedb.org/3/search/${media}?query=${encodeURIComponent(query as string)}&page=${currentPage}&language=en-US`,
             {
               headers: {
                 Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTk2YTY3ZjY4MmQyYWIyZjgwOTk5OWE3MzU4MTJmNiIsIm5iZiI6MTc2Mzc1MTg4My4xNDksInN1YiI6IjY5MjBiN2NiNWFlMDM4OGMwNzRhMzE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DevpJv_3L3zB123khbskCqC44cL8oI-n40Ws4eT4QoQ`,
                 accept: "application/json",
               },
             }
           );
           const data = await res.json();
           console.log(data);
           
           setResults(data);
          
         }
     
         searchTMDB();
       }, [query, media, pageParam]);

       
         const currentPage = Number(searchParams.get("page")) || 1;
       
           const totalPages = Math.min(results?.total_pages ?? 1, 500);
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
       
  return (

    <>  <SearchBar/>
   
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5  p-20">
        {results?.results?.map((item) => (
          <div key={item.id} className="relative border rounded-xl hover:scale-105 transition ">
            <Link href={media == "person" ? `/Actor/${item.id}`  : `/${media}/${item.id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/original${item.poster_path || item.backdrop_path || item.profile_path}`}
                alt={item.title || item.original_title || item.original_name || item.name}
                width={350}
                height={200}
                className="rounded-t-xl"
              />
             <div className='p-2.5'> <h3 className="mt-2">{item.title || item.original_title || item.original_name || item.name}</h3></div>
            </Link>
          </div>
        ))}
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
     </>

   
  )
}
