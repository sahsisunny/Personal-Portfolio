import { FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'
import { BsFillPersonLinesFill } from 'react-icons/bs'
export const socialLinks = [
    {
       label: 'LinkedIn',
       href: 'https://www.linkedin.com/in/sahsisunny/',
       icon: FaLinkedinIn,
       color: 'hover:bg-[#0077B5]',
    },
    {
       label: 'Github',
       href: 'https://www.github.com/sahsisunny',
       icon: FaGithub,
       color: 'hover:bg-[#24292e]',
    },
    {
       label: 'Twitter',
       href: 'https://www.twitter.com/sahsisunny',
       icon: FaTwitter,
         color: 'hover:bg-[#1DA1F2]',
    },
    { label: 'Mail', href: 'mailto:sahsisunny@gmail.com', icon: AiOutlineMail 
    , color: 'hover:bg-[#ea4335]',
   },
    { label: 'Resume', href: 'https://drive.google.com/file/d/1ZQxVt4ohbz5utsfU1Xa2ADEccDVMMXNq/view?usp=sharing', icon: BsFillPersonLinesFill 
      , color: 'hover:bg-[#24292e]',
   },
 ]
 