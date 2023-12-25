import React from 'react'
import { FaCodePullRequest } from 'react-icons/fa6'
import { RiGitRepositoryLine } from 'react-icons/ri'

interface PrItemProps {
   title: string
   number: number
   html_url: string
   created_at: string
   merged_at?: string
   closed_at: string
   state: string
   repository_url: string
}

const PrItem: React.FC<PrItemProps> = ({
   title,
   number,
   html_url,
   created_at,
   merged_at,
   closed_at,
   state,
   repository_url,
}) => {
   return (
      <li
         className={`card  text-textColor flex flex-col items-center justify-center w-full h-full p-4 space-y-4 text-center bg-gray-100 rounded-md border-2
                   
                           ${
                              merged_at
                                 ? 'border-green-500'
                                 : closed_at
                                   ? 'border-red-500'
                                   : 'border-blue-500'
                           }
                    `}
      >
         <div className="flex flex-row items-center justify-center w-full h-full space-x-4">
            <div className="w-[5%] h-6">
               <FaCodePullRequest className="w-8 h-8 " />
            </div>
            <div className="flex flex-col items-start justify-center w-[90%] h-full space-y-2">
               <a
                  href={html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold text-start truncate w-full h-full"
               >
                  {title}
               </a>
               <div className="flex flex-row items-center justify-between w-full h-full space-x-2">
                  <span className="text-sm text-gray-300 font-semibold ">
                     #{number} opened on{' '}
                     {new Date(created_at).toLocaleDateString('en-US')}
                  </span>
                  {merged_at ? (
                     <span className="text-sm text-gray-300 font-semibold ">
                        Merged on{' '}
                        {new Date(merged_at).toLocaleDateString('en-US')}
                     </span>
                  ) : (
                     <span className="text-sm text-gray-300 font-semibold ">
                        {state.toUpperCase()}
                     </span>
                  )}
               </div>
               <div className="flex flex-row items-center justify-start w-full h-full space-x-2">
                  <RiGitRepositoryLine className="w-6 h-6 " />
                  <a
                     href={repository_url.replace(
                        'api.github.com/repos',
                        'github.com',
                     )}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-base font-semibold "
                  >
                     {repository_url.split('/').slice(-1)[0]}
                  </a>
               </div>
            </div>
         </div>
      </li>
   )
}

export default PrItem
