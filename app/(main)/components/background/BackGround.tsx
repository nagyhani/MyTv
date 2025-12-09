import Image from 'next/image'
import React from 'react'

export default function BackGround() {
  return (
    <div className=' w-full min-h-[275] sm:h-[440px]  md:h-[380px] lg:h-[400px]  relative flex justify-center items-center'>
      <Image src="/marvel.jpg" alt="background"  fill
      className="object-cover"
    priority/>

    <div className='text-left p-10 md:p-7 lg:p-4'>
      <h1 className='text-3xl font-bold relative text-white z-20'><span className='text-5xl font-extrabold'>Welcome.</span> <br /> 
Millions of movies, TV shows and people to discover. Explore now.</h1>
    </div>

    <div className='bg-blue-600/55 absolute top-0 left-0 right-0 bottom-0'></div>
    </div>
  )
}
