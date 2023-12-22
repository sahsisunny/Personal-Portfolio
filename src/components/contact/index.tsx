import Link from 'next/link'
import React from 'react'
import { socialLinks } from '../data/socialLinks'

function Contact() {
   return (
      <div
         id="projects"
         className="w-full text-center  h-auto text-textColor mt-10"
      >
         <div className="max-w-[1240px]  w-full h-full mx-auto p-2 flex justify-center items-center flex-col">
            <h1 className="text-3xl font-bold mb-8 w-full text-center">
               Contact Me
            </h1>
            <div className="flex sm:flex-row flex-col justify-center items-center py-4">
               {socialLinks.map((link) => (
                  <Link
                     className={`flex justify-around gap-2 m-2 px-6 py-2 min-w-[180px] rounded-lg cursor-pointer hover:scale-110 ease-in duration-300 ${link.color} border-[1px] hover:border-none shadow-sm shadow-white`}
                     href={link.href}
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <link.icon size={25} />
                     <span className="mr-4">{link.label}</span>
                  </Link>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Contact
