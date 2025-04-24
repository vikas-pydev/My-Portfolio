"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import TextAnimation from "./text-animation"

const Hero = () => {
  const [scrollY, setScrollY] = useState(0)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.5

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background elements with parallax effect */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/30 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl md:text-2xl font-medium text-primary"
              >
                Hello, I'm
              </motion.h2>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-4xl md:text-6xl font-bold mt-2"
              >
                Vikas Thirumanyam
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-xl md:text-2xl text-muted-foreground mt-4 max-w-xl"
              >
                <span className="text-primary font-medium">MCA Student</span> specializing in{" "}
                <TextAnimation
                  phrases={["Vibe Coding", "Artificial Intelligence", "Machine Learning", "Web Development"]}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-wrap gap-4 mt-2"
            >
              <a href="#contact">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Contact Me</Button>
              </a>
              <a href="#projects">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  View Projects
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="flex gap-4 mt-2"
            >
              <a
                href="https://www.linkedin.com/in/vikas-aiml"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-primary/10 text-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/vikas-pydev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-primary/10 text-foreground hover:text-primary transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:vikastirumanyam@gmail.com"
                className="p-2 rounded-full bg-secondary hover:bg-primary/10 text-foreground hover:text-primary transition-colors"
                aria-label="Email Contact"
              >
                <Mail size={20} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
            style={{ transform: `translateY(${-parallaxOffset * 0.1}px)` }}
          >
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-background border border-primary/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent rounded-full animate-pulse"></div>
                  <div className="absolute inset-4 bg-gradient-to-tl from-background to-primary/5 rounded-full flex items-center justify-center">
                    <div className="text-4xl font-bold text-primary">AI/ML</div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div
                className="absolute top-1/4 left-1/4 p-3 bg-background/80 backdrop-blur-sm rounded-lg border border-primary/20 shadow-lg animate-bounce"
                style={{ animationDuration: "3s" }}
              >
                <div className="text-sm font-medium">Machine Learning</div>
              </div>
              <div
                className="absolute bottom-1/3 right-1/4 p-3 bg-background/80 backdrop-blur-sm rounded-lg border border-primary/20 shadow-lg animate-bounce"
                style={{ animationDuration: "4s", animationDelay: "1s" }}
              >
                <div className="text-sm font-medium">Data Science</div>
              </div>
              <div
                className="absolute top-1/2 right-1/3 p-3 bg-background/80 backdrop-blur-sm rounded-lg border border-primary/20 shadow-lg animate-bounce"
                style={{ animationDuration: "5s", animationDelay: "0.5s" }}
              >
                <div className="text-sm font-medium">Python</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
