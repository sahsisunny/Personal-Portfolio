import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { projectList } from '@/components/data/projectListData'
import { FaGithub } from 'react-icons/fa'
import { FaExternalLinkAlt } from 'react-icons/fa'

interface ProjectComponentProps {
   title: string
   description: string
   image: StaticImageData
   liveLink: string
   repoLink: string
   techStack: string[]
}

const ProjectComponent = ({
   title,
   description,
   image,
   liveLink,
   repoLink,
   techStack,
}: ProjectComponentProps) => {
   return (
      <div
         className="card w-full 
      sm:h-[380px] h-auto
      flex sm:flex-row flex-col  justify-between shadow-gray-600 shadow-md rounded-[25px] mx-4 my-6 p-4 border-[1px]"
      >
         <div className="flex justify-center items-center sm:w-1/2 w-full h-full p-6">
            <Image
               className="rounded-xl w-full h-full sm:mb-0 mb-4 object-cover"
               src={image}
               alt={title}
               width={300}
               height={200}
            />
         </div>

         <div className="flex flex-col items-center justify-center sm:w-1/2 w-full p-6">
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-md mb-4 text-gray-300">{description}</p>
            <div className="flex justify-center w-[80%] px-8">
               {techStack.map((tech) =>
                  tech.split(',').map((tech, index) => (
                     <p
                        className="bg-[#5651e5] rounded-full px-4 py-[4px] text-xs font-semibold text-white flex flex-col  items-center justify-center m-2"
                        key={index}
                     >
                        {tech}
                     </p>
                  )),
               )}
            </div>
            <div className=" flex justify-center gap-2 mt-2">
               <Link
                  href={repoLink}
                  className=" bg-primary rounded-xl p-2 px-4 flex items-center text-black hover:bg-gray-200"
               >
                  <FaGithub className="mr-2" /> Repo
               </Link>
               <Link
                  href={liveLink}
                  className=" bg-primary rounded-xl p-2 px-4 flex items-center text-black hover:bg-gray-200"
               >
                  <FaExternalLinkAlt className="mr-2" /> Live
               </Link>
            </div>
         </div>
      </div>
   )
}

const Projects = () => {
   return (
      <div
         id="projects"
         className="w-full text-center  h-auto text-textColor mb-5"
      >
         <div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center flex-col">
            <p className="uppercase text-sm tracking-widest ">Projects</p>
            <h1 className="text-3xl font-bold mb-8 w-full text-center">
               My Projects
            </h1>
            {projectList.map((project, index) => (
               <ProjectComponent
                  key={index}
                  title={project.title}
                  description={project.details}
                  image={project.image}
                  liveLink={project.liveLink}
                  repoLink={project.repoLink}
                  techStack={project.techStack}
               />
            ))}
         </div>
      </div>
   )
}

export default Projects
