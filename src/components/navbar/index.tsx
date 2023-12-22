import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

import LogoImage from './../../../public/assets/logos/logo.png'
import { socialLinks } from '../data/socialLinks'
import { menuItems } from '../data/menuItems'

const Navbar = () => {
   const [show, setShow] = useState(false)
   const [shadow, setShadow] = useState(false)
   const navHandler = () => {
      setShow(!show)
   }
   const shadowHandler = () => {
      if (window.scrollY >= 20) {
         setShadow(true)
      } else {
         setShadow(false)
      }
   }

   useEffect(() => {
      window.addEventListener('scroll', shadowHandler)
      return () => {
         window.removeEventListener('scroll', shadowHandler)
      }
   }, [])

   return (
      <nav
         className={`w-full nav sticky top-0 z-50 
         ${shadow ? 'shadow-sm shadow-black z-[1000]' : 'z-[100]'}`}
      >
         <div className="flex justify-between items-center w-full h-full px-2 py-3 2xl:px-16  text-textColor">
            <div className="flex items-center">
               <Image src={LogoImage} alt="logo" width={50} height={50} />
               <p
                  className="md:block text-xl ml-2"
                  style={{ fontFamily: 'Poppins' }}
               >
                  Sunny Sahsi
               </p>
            </div>
            <div>
               <ul className="hidden md:flex">
                  {menuItems.map((item) => (
                     <Link href={item.href}>
                        <li
                           onClick={() => setShow(false)}
                           key={item.label}
                           className="ml-10 text-sm uppercase hover:border-b"
                        >
                           {item.label}
                        </li>
                     </Link>
                  ))}
               </ul>
               <div className="md:hidden" onClick={navHandler}>
                  <AiOutlineMenu size={25} />
               </div>
            </div>
         </div>
         <div
            className={
               show
                  ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70'
                  : ''
            }
         >
            <div
               className={
                  show
                     ? 'nav fixed left-0 top-0 w-[100%] sm:w-[60%] md:w-[45%] h-screen text-textColor p-10 ease-in duration-500'
                     : 'fixed left-[-100%] top-0 bg-[#ecf0f3] p-10 ease-in duration-500'
               }
            >
               <div>
                  <div className="flex w-full items-center justify-between">
                     <div className="flex items-center">
                        <Image
                           src={LogoImage}
                           alt="logo"
                           width={50}
                           height={50}
                        />
                        <p
                           className=" text-xl ml-2"
                           style={{ fontFamily: 'Poppins' }}
                        >
                           Sunny Sahsi
                        </p>
                     </div>
                     <div
                        className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
                        onClick={navHandler}
                     >
                        <AiOutlineClose size={25} />
                     </div>
                  </div>
               </div>
               <div className="py-4 flex flex-col">
                  <ul className="uppercase">
                     {menuItems.map((item) => (
                        <Link href={item.href}>
                           <li
                              onClick={() => setShow(false)}
                              key={item.label}
                              className="py-4 text-sm"
                           >
                              {item.label}
                           </li>
                        </Link>
                     ))}
                  </ul>
                  <div className="pt-10 ">
                     <p className="uppercase tracking-widest text-textColor">
                        Lets Connect
                     </p>
                     <div className="flex items-center justify-between my-4 w-full sm:w-[80%]">
                        {socialLinks.map((item) => (
                           <Link
                              className="rounded-full shadow-lg shadow-gray-400 p-3  cursor-pointer hover:scale-105 ease-in duration-300"
                              href={item.href}
                              target="_blank"
                           >
                              <item.icon size={25} />
                           </Link>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </nav>
   )
}

export default Navbar
