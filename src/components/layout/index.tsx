import React from 'react'
import Footer from '@/components/footer'
import PortfolioHead from '@/components/header'
import Navbar from '@/components/navbar'

interface LayoutProps {
   children: React.ReactNode
}
export default function PageLayout({ children }: LayoutProps) {
   return (
      <main>
         <PortfolioHead />
         <Navbar />
         {children}
         <Footer />
      </main>
   )
}
