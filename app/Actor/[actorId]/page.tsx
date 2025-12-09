'use client'
import { Account } from '@/app/interface/Account';
import { Actor } from '@/app/interface/Actor';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { SiInstagram } from "react-icons/si";
import { FaFacebook } from "react-icons/fa";
import { BsTiktok } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import Trending from '@/app/(main)/components/Trending/Trending';
import CombinedCredits from './../../(main)/components/CombinedCredits/CombinedCredits';

export default function page() {

     const {actorId} = useParams();

     let [actor , setActor] = useState<Actor>()
     let [account , setAccount] = useState<Account>()

       async function getActor() {
    const res = await fetch(`https://api.themoviedb.org/3/person/${actorId}?language=en-US`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTk2YTY3ZjY4MmQyYWIyZjgwOTk5OWE3MzU4MTJmNiIsIm5iZiI6MTc2Mzc1MTg4My4xNDksInN1YiI6IjY5MjBiN2NiNWFlMDM4OGMwNzRhMzE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DevpJv_3L3zB123khbskCqC44cL8oI-n40Ws4eT4QoQ`,
        accept: "application/json",
      },
    });

    const data = await res.json();
    setActor(data)
    console.log(data);
  }


         async function getActorAccounts() {
    const res = await fetch(`https://api.themoviedb.org/3/person/${actorId}/external_ids`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTk2YTY3ZjY4MmQyYWIyZjgwOTk5OWE3MzU4MTJmNiIsIm5iZiI6MTc2Mzc1MTg4My4xNDksInN1YiI6IjY5MjBiN2NiNWFlMDM4OGMwNzRhMzE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DevpJv_3L3zB123khbskCqC44cL8oI-n40Ws4eT4QoQ`,
        accept: "application/json",
      },
    });

    const data = await res.json();
    setAccount(data)
    console.log(data);
  }

  useEffect(()=>{
    getActor()
  },[])

  useEffect(()=>{
    getActorAccounts()
  },[])
  return (
    <div>

        <div className='flex items-center justify-center flex-col md:flex-row md:justify-start md:items-start md:p-8'>
            <div className=' w-[150px]   md:w-[300px] lg:w-[286px]  my-5'>
                <Image src={`https://image.tmdb.org/t/p/original${actor?.profile_path}`} alt={"actor"} width={500} height={150} className='rounded-2xl' />
               
            </div>

            <div className=' md:ml-5 md:mt-4'>

                <div>
               <h1 className='text-3xl font-bold w-full md:text-4xl'>{actor?.name}</h1>
            </div>

          <div className='flex gap-2.5 justify-center items-center'>
            {account?.instagram_id ? <a href= {`https://www.instagram.com/${account?.instagram_id}/`} target="_blank">  <SiInstagram className="size-6 my-2.5" /></a> : ""}
            {account?.facebook_id ? <a href= {`https://www.facebook.com/${account?.facebook_id}/`} target="_blank">  <FaFacebook className="size-6 my-2.5" /></a> : ""}
            {account?.tiktok_id ? <a href= {`https://www.tiktok.com/${account?.tiktok_id}/`} target="_blank">  <BsTiktok className="size-6 my-2.5" /></a> : ""}
            {account?.twitter_id ? <a href= {`https://www.x.com/${account?.twitter_id}/`} target="_blank">  <FaXTwitter className="size-6 my-2.5" /></a> : ""}
             {account?.youtube_id ? <a href= {`https://www.youtube.com/${account?.youtube_id}/`} target="_blank">  <IoLogoYoutube className="size-6 my-2.5" /></a> : ""}
          </div>

          
        <div className='p-6 md:p-8 '>
          <h1 className=' text-lg md:text-2xl font-bold mb-4'>
            Personal Info
          </h1>

          <div>
            <h1 className=' font-bold md:text-xl '>
              Known for
            </h1>
            <h1 className='mb-3 text-lg'>
              {actor?.known_for_department}
            </h1>

            <h1 className=' font-bold md:text-xl '>
              Gender
            </h1>
            <h1 className='mb-3 text-lg'>
              {actor?.gender == 2 ? "Male" : "Female"}
            </h1>


             <h1 className=' font-bold md:text-xl '>
              Birthday
            </h1>
            <h1 className='mb-3 text-lg'>
              {actor?.birthday ? new Date(actor?.birthday).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }) + (actor.deathday ? "" :  ` (${(new Date().getFullYear() - new Date(actor.birthday).getFullYear()) + " Years old"})`)  : ""}
            </h1>



{actor?.deathday ? <div>
   <h1 className=' font-bold md:text-xl '>
              Deathday
            </h1>
            <h1 className='mb-3 text-lg'>
              {actor?.deathday ? new Date(actor?.deathday).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }) + (actor.deathday ? ` (${(new Date(actor.deathday).getFullYear() - new Date(actor.birthday).getFullYear()) + " Years old"})` : "" )  : ""}
            </h1>

</div> : ""}


           <h1 className=' font-bold md:text-xl '>
              Place of birth
            </h1>
            <h1 className='mb-3 text-lg'>
              {actor?.place_of_birth}
            </h1>


          </div>
        </div>


            </div>

          
        </div>



        <div className='p-6'>
           <h1 className=' text-xl font-bold mb-3 '>
            Biography
          </h1>

          <h1 className='text-lg'>{actor?.biography}</h1>


        </div>

       {actor?.id && <CombinedCredits actorId={actor.id} />}
      
    </div>
  )
}
