import { Header } from './components/layout/header'
import { Footer } from './components/layout/footer'
import { Hero } from './components/sections/hero'
import { About } from './components/sections/about'
import { Projects } from './components/sections/projects'
import { Journey } from './components/sections/journey'
import { Contact } from './components/sections/contact'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
