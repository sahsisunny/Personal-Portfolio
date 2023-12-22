import Hero from '@/components/hero'
import PageLayout from '@/components/layout'
import Skill from '@/components/skills'
import Experience from '@/components/experience'
import Projects from '@/components/projects'
import Contact from '@/components/contact'
import Education from '@/components/education'
export default function Home() {
   return (
      <PageLayout>
         <Hero />
         <Experience />
         <Skill />
         <Projects />
         <Education />
         <Contact />
      </PageLayout>
   )
}
