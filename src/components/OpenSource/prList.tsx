import { fetchPullRequests, GitHubPullRequest } from '@/utils/fetchPullRequests'
import { isDevToMainSync } from '@/utils/isDevToMainSync'
import React, { useEffect, useRef, useState } from 'react'
import Loader from '../loader'
import PrItem from './PrItem'

interface PrListProps {
   perPage: number
}

const PrList: React.FC<PrListProps> = ({ perPage }) => {
   const [pullRequests, setPullRequests] = useState<GitHubPullRequest[]>([])
   const [page, setPage] = useState(1)
   const [loading, setLoading] = useState(false)
   const loaderRef = useRef(null)

   const fetchMorePullRequests = async () => {
      setLoading(true)
      const newPullRequests = await fetchPullRequests(page, perPage)
      setPullRequests((prevPullRequests) => [
         ...prevPullRequests,
         ...newPullRequests,
      ])
      setPage((prevPage) => prevPage + 1)
      setLoading(false)
   }

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            if (entries[0].isIntersecting && !loading) {
               fetchMorePullRequests()
            }
         },
         { threshold: 1.0 },
      )

      if (loaderRef.current) {
         observer.observe(loaderRef.current)
      }

      return () => {
         if (loaderRef.current) {
            observer.unobserve(loaderRef.current)
         }
      }
   }, [loaderRef, fetchMorePullRequests, loading])

   return (
      <div className="card  flex flex-col items-center justify-center w-screen h-full p-4 space-y-4 text-center bg-gray-100 rounded-md">
         <ul className="space-y-4 lg:w-2/3 w-full">
            {pullRequests.map(
               (pr) =>
                  !isDevToMainSync(pr.title) && (
                     <PrItem
                        key={pr.id}
                        title={pr.title}
                        number={pr.number}
                        html_url={pr.html_url}
                        created_at={pr.created_at}
                        merged_at={pr.pull_request?.merged_at}
                        closed_at={pr.closed_at}
                        state={pr.state}
                        repository_url={pr.repository_url}
                     />
                  ),
            )}
         </ul>

         {loading && <Loader />}
         <div
            ref={loaderRef}
            style={{ height: '10px', background: 'transparent' }}
         />
      </div>
   )
}

export default PrList
