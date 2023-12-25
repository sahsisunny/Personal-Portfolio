import PageLayout from '@/components/layout'
import PrList from '@/components/OpenSource/prList'

export default function OpenSource() {
   const perPage = 15

   return (
      <PageLayout>
         <h1 className="sm:text-4xl text-xl font-bold text-center text-textColor mb-5">
            Open Source Contributions
         </h1>
         <div className="flex flex-row items-center justify-center w-full h-full space-x-4">
            <div className="w-10 h-6 border-2 bg-green-400"></div>{' '}
            <span className="text-textColor font-semibold">Merged </span>
            <div className="w-10 h-6 border-2 bg-red-400"></div>{' '}
            <span className="text-textColor font-semibold">Open</span>
         </div>
         <PrList perPage={perPage} />{' '}
      </PageLayout>
   )
}
