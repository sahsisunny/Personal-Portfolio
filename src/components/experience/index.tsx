import React from 'react'
import Image from 'next/image'
import { experienceData } from './../data/experience'

const Experience = () => {
   return (
      <div
         id="experience"
         className="w-full text-center min-md:h-[80vh] h-auto text-textColor mb-5 "
      >
         <div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center flex-col ">
            <p className="uppercase text-sm tracking-widest">Experience</p>
            <h1 className="text-3xl font-bold mb-8 w-full text-center">
               My Experience
            </h1>

            <div className="flex flex-col gap-4 w-full">
               {experienceData.map((experience, index) => (
                  <div
                     key={index}
                     className="card p-4 flex flex-col md:flex-row gap-4
              \25justify-center items-center rounded-[30px] shadow-sm shadow-white transition duration-300 "
                  >
                     <Image
                        src={experience.logo}
                        alt="logo"
                        width={100}
                        height={100}
                        className="rounded-[20px] sm:w-1/6 bg-slate-200 p-4"
                     />
                     <div className="flex flex-col gap-2 w-full px-4">
                        <h2 className="text-xl font-semibold card p-2 rounded-full">
                           {experience.title}
                        </h2>
                        <div className="flex flex-col md:flex-row gap-2 justify-between">
                           <p className="card p-2 px-4 rounded-full">
                              {experience.organization}
                           </p>
                           <p className="card p-2 px-4 rounded-full">
                              {experience.duration}
                           </p>
                        </div>
                        <ul className="list-disc pl-5 mt-2 text-left">
                           {experience.responsibilities.map(
                              (responsibility, i) => (
                                 <li key={i}>{responsibility}</li>
                              ),
                           )}
                        </ul>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Experience
