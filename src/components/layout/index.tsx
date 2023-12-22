import React from 'react'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Navbar from '@/components/navbar'

interface LayoutProps {
   children: React.ReactNode
}
export default function PageLayout({ children }: LayoutProps) {
   return (
      <main>
         <Header />
         <Navbar />
         {children}
         <Footer />
      </main>
   )
}
