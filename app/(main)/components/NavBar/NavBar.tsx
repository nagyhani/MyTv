'use client' 
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  let [category , setCategory] = useState<"person" | "movie" | "tv">("person")


  const navLinks = [
    { name: 'Movies', href: '/movies' ,category : "movie" , topRated: "top_rated" , nowPlaying : "now_playing" , upcoming:"upcoming"},
    { name: 'TV Shows', href: '/tv' ,category : "tv" , topRated: "top_rated" , airingToday:"airing_today" , onTheAir: "on_the_air"},
    { name: 'People', href: '/people' ,category : "person" },
   
  ];


 return (
  <nav className="bg-blue-950 fixed w-full z-40 p-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <Link href={"/"}>
        <div className="text-white font-bold text-xl">MyTv</div>
      </Link>

    

      <div className="hidden md:flex space-x-6">
        {navLinks.map((link) => (
          <Menubar key={link.name} className='bg-transparent border-0 focus:bg-blue-900 focus:text-yellow-400'>
            <MenubarMenu key={link.name}>
              <MenubarTrigger
                onClick={() => setCategory(link.category as "person" | "movie" | "tv")}
                className='text-white font-semibold hover:text-yellow-400 transition bg-transparent cursor-pointer'
              >
                {link.name}
              </MenubarTrigger>
              <MenubarContent>
                <Link href={`/sort/${category}/popular`}>
                  <MenubarItem>Popular</MenubarItem>
                </Link>

                {link.name === "Movies" || link.name === "TV Shows" ? (
                  <Link href={`/sorting/${category}/${link.topRated}`}>
                    <MenubarItem>Top rated</MenubarItem>
                  </Link>
                ) : null}

                {link.name === "Movies" ? (
                  <Link href={`/sorting/${category}/${link.nowPlaying}`}>
                    <MenubarItem>Now playing</MenubarItem>
                  </Link>
                ) : null}

                {link.name === "Movies" ? (
                  <Link href={`/sorting/${category}/${link.upcoming}`}>
                    <MenubarItem>Upcoming</MenubarItem>
                  </Link>
                ) : null}

                {link.name === "TV Shows" ? (
                  <Link href={`/sorting/${category}/${link.airingToday}`}>
                    <MenubarItem>Airing today</MenubarItem>
                  </Link>
                ) : null}

                {link.name === "TV Shows" ? (
                  <Link href={`/sorting/${category}/${link.onTheAir}`}>
                    <MenubarItem>On tv</MenubarItem>
                  </Link>
                ) : null}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ))}
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>
    </div>

    {isOpen && (
      <div className="md:hidden mt-2 space-y-2 px-2">
        {navLinks.map((link) => (
          <Menubar key={link.name} className='bg-transparent border-0 focus:bg-blue-900 focus:text-yellow-400'>
            <MenubarMenu key={link.name}>
              <MenubarTrigger
                onClick={() => setCategory(link.category as "person" | "movie" | "tv")}
                className='text-white font-semibold hover:text-yellow-400 transition bg-transparent cursor-pointer'
              >
                {link.name}
              </MenubarTrigger>
              <MenubarContent>
                <Link href={`/sort/${category}/popular`}>
                  <MenubarItem>Popular</MenubarItem>
                </Link>

                {link.name === "Movies" || link.name === "TV Shows" ? (
                  <Link href={`/sorting/${category}/${link.topRated}`}>
                    <MenubarItem>Top rated</MenubarItem>
                  </Link>
                ) : null}

                {link.name === "Movies" ? (
                  <Link href={`/sorting/${category}/${link.nowPlaying}`}>
                    <MenubarItem>Now playing</MenubarItem>
                  </Link>
                ) : null}

                {link.name === "Movies" ? (
                  <Link href={`/sorting/${category}/${link.upcoming}`}>
                    <MenubarItem>Upcoming</MenubarItem>
                  </Link>
                ) : null}

                {link.name === "TV Shows" ? (
                  <Link href={`/sorting/${category}/${link.airingToday}`}>
                    <MenubarItem>Airing today</MenubarItem>
                  </Link>
                ) : null}

                {link.name === "TV Shows" ? (
                  <Link href={`/sorting/${category}/${link.onTheAir}`}>
                    <MenubarItem>On tv</MenubarItem>
                  </Link>
                ) : null}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ))}
      </div>
    )}
  </nav>
);
}