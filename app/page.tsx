import { Header } from './components/layout/header'
import { Footer } from './components/layout/footer'
import { Hero } from './components/sections/hero'
import { About } from './components/sections/about'
import { Projects } from './components/sections/projects'
import { Experience } from './components/sections/experience'
import { Contact } from './components/sections/contact'
import { ScrollToTop } from './components/ui/scroll-to-top'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="opacity-0 animate-fade-in">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
