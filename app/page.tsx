import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Education from "@/components/education"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import TimeTracker from "@/components/time-tracker"
// Import PageTransition component
import PageTransition from "@/components/page-transition"

export default function Home() {
  return (
    <PageTransition>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
        <Footer />
        <TimeTracker />
      </main>
    </PageTransition>
  )
}
