import React from 'react'
import Footer from '../footer'
import Header from '../header'
import Navbar from '../navbar'

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
