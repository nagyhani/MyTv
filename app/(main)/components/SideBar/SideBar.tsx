"use client"

import { useEffect, useState } from "react"
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton
} from "@/components/ui/sidebar"
import { MovieGenre } from "@/app/interface/movieGenre"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { Countries } from "@/app/interface/countries"
import { FaRegQuestionCircle } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type SideBarProps = {
  category?: string | string[]
  genreId?: string | string[]
}

export function SideBar({ category, genreId }: SideBarProps) {

     const safeCategory =  Array.isArray(category) ? category[0] : category ?? "default"
     const safeGenreId = Array.isArray(genreId) ? genreId[0] : genreId
  const [open, setOpen] = useState(false)

  const [openPop, setOpenPop] = useState(false)
  const [value, setValue] = useState("")

  const [genre , setGenre] = useState<MovieGenre>()

  const [country , setCountry] = useState<Countries[]>()

  const defaultCountry = "US"

    async function getMovieGenre(){
  
     const res = await fetch(`https://api.themoviedb.org/3/genre/${safeCategory}/list?language=en`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTk2YTY3ZjY4MmQyYWIyZjgwOTk5OWE3MzU4MTJmNiIsIm5iZiI6MTc2Mzc1MTg4My4xNDksInN1YiI6IjY5MjBiN2NiNWFlMDM4OGMwNzRhMzE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DevpJv_3L3zB123khbskCqC44cL8oI-n40Ws4eT4QoQ`,
          accept: "application/json",
        },
      });
  
      const data = await res.json();
      setGenre(data)
      console.log(data);
  }

 async function getCountries(){
  
     const res = await fetch(`https://api.themoviedb.org/3/configuration/countries?language=en-US`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTk2YTY3ZjY4MmQyYWIyZjgwOTk5OWE3MzU4MTJmNiIsIm5iZiI6MTc2Mzc1MTg4My4xNDksInN1YiI6IjY5MjBiN2NiNWFlMDM4OGMwNzRhMzE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DevpJv_3L3zB123khbskCqC44cL8oI-n40Ws4eT4QoQ`,
          accept: "application/json",
        },
      });
  
      const data = await res.json();
      setCountry(data)
      console.log(data);
  }

  
  
  useEffect(()=>{
      getMovieGenre()
  },[])

   useEffect(()=>{
      getCountries()
  },[])

 

  return (
    <div className="h-0">
        <SidebarProvider open={open} onOpenChange={setOpen} className=" ">
     
      <SidebarTrigger
        className={`
          fixed top-20 left-4 z-20 transition-all duration-300 cursor-pointer
          ${open ? "translate-x-64" : "translate-x-0"}
        `}
      />

      
      <Sidebar className="fixed top-16 left-0 ">
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-2xl text-black my-2">Filter</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
          <SidebarMenu className="text-xl font-bold">
            Genre

            {genre?.genres.map((ele)=>{

                return <Link href={`/Genre/${safeCategory}/${ele.id}/${defaultCountry}`} key={ele.id}>
                <SidebarMenuButton className="text-black hover:text-blue-800 cursor-pointer focus:text-blue-800" >

                    {ele.name}

            </SidebarMenuButton>
                </Link>
            })}
        </SidebarMenu>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

       


          <SidebarContent>
          <SidebarGroup>
        
            <SidebarGroupContent>
              <SidebarMenu>
          <SidebarMenu className="text-xl font-bold my-4">
           <div className="flex gap-1">
             
             <h1>Language</h1>
              <Tooltip >
      <TooltipTrigger asChild className="border-0 bg-transparent">
        <Button variant="outline"><FaRegQuestionCircle /></Button>
      </TooltipTrigger>
      <TooltipContent className="bg-blue-800 text-white">
        <p>Filter items based on their original language.</p>
      </TooltipContent>
    </Tooltip>
           </div>

          
    <Popover open={openPop} onOpenChange={setOpenPop}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={openPop}
          className="w-[200px] justify-between"
        >
          {value
            ? country?.find((cou) => cou.iso_3166_1 === value)?.english_name
            : "Select Language..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Language..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Country found.</CommandEmpty>
            <CommandGroup>
              {country?.map((cou) => (
                <CommandItem
                  key={cou.iso_3166_1}
                  value={cou.iso_3166_1}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                 <Link  href={`/Genre/${safeCategory}/${safeGenreId}/${cou.iso_3166_1}`}>
                 {cou.english_name}
                 </Link>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === cou.iso_3166_1 ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
        </SidebarMenu>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </SidebarProvider>



    </div>
  )
}