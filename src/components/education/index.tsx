import React from 'react'
import Image from 'next/image'
import { StaticImageData } from 'next/image'
import { educationList } from '@/components/data/educationData'

interface EducationComponentProps {
   logo: StaticImageData
   degree: string
   university: string
   duration: string
   grade: string
   learnings: string[]
}

const EducationComponent = ({
   logo,
   degree,
   university,
   duration,
   grade,
   learnings,
}: EducationComponentProps) => {
   return (
      <div className="card p-4 flex flex-col md:flex-row gap-4 justify-center items-center rounded-[30px] shadow-sm shadow-white transition duration-300">
         <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="rounded-[20px] sm:w-1/6 bg-slate-200 p-4"
         />
         <div className="flex flex-col gap-2 w-full px-4">
            <h2 className="text-xl font-semibold card p-2 rounded-full">
               {degree}
            </h2>
            <div className="flex flex-col md:flex-row gap-2 justify-between card rounded-full">
               <p className=" p-2 px-4 ">{university}</p>
               <p className=" p-2 px-4 font-semibold ">{grade}</p>
               <p className=" p-2 px-4 ">{duration}</p>
            </div>
            <ul className="list-disc pl-5 mt-2 text-left">
               {learnings.map((learning, i) => (
                  <li key={i}>{learning}</li>
               ))}
            </ul>
         </div>
      </div>
   )
}
const Education = () => {
   return (
      <div
         id="experience"
         className="w-full text-center min-md:h-[80vh] h-auto text-textColor mb-5 "
      >
         <div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center flex-col ">
            <p className="uppercase text-sm tracking-widest">Education</p>
            <h1 className="text-3xl font-bold mb-8 w-full text-center">
               Where I Studied
            </h1>

            <div className="flex flex-col gap-4 w-full">
               {educationList.map((education, index) => (
                  <EducationComponent
                     key={index}
                     logo={education.logo}
                     degree={education.degree}
                     university={education.university}
                     duration={education.duration}
                     grade={education.grade}
                     learnings={education.learnings}
                  />
               ))}
            </div>
         </div>
      </div>
   )
}

export default Education
