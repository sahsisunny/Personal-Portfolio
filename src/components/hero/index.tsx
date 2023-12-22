import React from 'react'
import { socialLinks } from '@/components/data/socialLinksData'
import Link from 'next/link'

const Hero = () => {
   return (
      <div
         id="home"
         className="w-full md:h-[80vh] text-center text-textColor mb-5"
      >
         <div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center flex-col">
            <div>
               <p className="uppercase text-sm tracking-widest hidden sm:block">
                  SHALL WE COLLABORATE TO CREATE SOMETHING NEW?{' '}
               </p>
               <h1 className="py-4 text-5xl sm:text-6xl font-bold">
                  Hi, I am <span className="text">Sunny</span>
               </h1>
               <h1 className="py-4 text-5xl sm:text-6xl font-bold text">
                  Software Developer
               </h1>
               <p className="py-4 max-w-[70%] tracking-wider text-[16px] m-auto">
                  As an India-based software developer, I enjoy creating things
                  that live on the internet. My interest in to develop web
                  applications and mobile applications to solve real-world
                  problems.
               </p>
               <div className="items-center justify-between max-w-[430px] m-auto py-4 hidden sm:flex">
                  {socialLinks.map((link) => (
                     <Link
                        className="icon rounded-full shadow-lg shadow-gray-400 p-6  cursor-pointer hover:scale-110 ease-in duration-300"
                        href={link.href}
                     >
                        <link.icon size={25} />
                     </Link>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}

export default Hero
