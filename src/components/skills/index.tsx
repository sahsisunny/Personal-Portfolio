import React from 'react'
import { skillList } from '../data/skillList'

const Skill = () => {
   return (
      <div
         id="skills"
         className="w-full text-center md:h-[80vh] text-textColor mb-5"
      >
         <div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center flex-col">
            <p className="uppercase text-sm tracking-widest ">Skills</p>
            <h1 className="text-3xl font-bold mb-8 w-full text-center">
               What I Know
            </h1>
            <div className="flex flex-wrap justify-center">
               {skillList.map((skill, index) => (
                  <div
                     className=" skill w-[120px] h-[120px] flex justify-center rounded-[25px]  shadow-sm mx-3 my-6 p-4 hover:scale-110 transition-all ease-in-out hover:border-b-[5px] hover:border-t-[5px] border-primary border-2
                  "
                     key={index}
                  >
                     <div className="text-center flex flex-col items-center justify-center">
                        <skill.icon size={50} className="mb-2" />
                        <h3 className="text-md text-textColor">
                           {skill.title}
                        </h3>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Skill
