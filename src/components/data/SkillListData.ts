import {
   FaReact,
   FaHtml5,
   FaCss3Alt,
   FaJsSquare,
   FaNodeJs,
   FaGitAlt,
   FaLinux,
} from 'react-icons/fa'

import { TbBrandNextjs } from 'react-icons/tb'

import {
   SiTailwindcss,
   SiTypescript,
   SiMongodb,
   SiExpress,
   SiReactquery,
} from 'react-icons/si'

export const skillList = [
   // Front-end
   { icon: FaHtml5, title: 'HTML' },
   { icon: FaJsSquare, title: 'JavaScript' },
   { icon: SiTypescript, title: 'TypeScript' },
   { icon: FaCss3Alt, title: 'CSS' },

   // Back-end
   { icon: FaNodeJs, title: 'NodeJS' },
   { icon: SiExpress, title: 'Express' },
   { icon: SiMongodb, title: 'MongoDB' },

   // Version Control
   { icon: FaGitAlt, title: 'Git' },

   // Utilities
   { icon: FaLinux, title: 'Linux' },

   // Frameworks
   { icon: FaReact, title: 'ReactJS' },
   { icon: SiTailwindcss, title: 'TailwindCSS' },
   { icon: TbBrandNextjs, title: 'NextJS' },

   // State Management
   { icon: SiReactquery, title: 'React Query' },
]
