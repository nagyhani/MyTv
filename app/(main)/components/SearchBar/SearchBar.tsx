'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query") || ""; 
  const pageParam = Number(searchParams.get("page")) || 1;

  const [query, setQuery] = useState(queryParam);
  const [media, setMedia] = useState<"movie" | "tv" | "person">("movie");
 
 

 


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", `?query=${encodeURIComponent(query)}&page=1&media=${media}`);
  };

  return (
    <div className=' flex items-start justify-center' >
      <form onSubmit={handleSubmit} className=" flex flex-col md:flex-row gap-2 items-center justify-center my-7 w-3/4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search movies, TV shows, or people`}
          className="border p-2 rounded w-full md:w-1/2"
        />

  
        <select
          value={media}
          onChange={(e) => setMedia(e.target.value as "movie" | "tv" | "person")}
          className="border p-2 rounded"
        >
          <option value="movie">Movie</option>
          <option value="tv">TV</option>
          <option value="person">Person</option>
        </select>

      <Link href={`/Search/${media}/${query}`}>   <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Search
        </button></Link>
      </form>

    

      
    </div>
  );
}
