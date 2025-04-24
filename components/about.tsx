"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Code, Database, LineChart } from "lucide-react"

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              I'm a final-year MCA student specializing in AI/ML with hands-on experience in building scalable,
              real-time fraud detection systems and machine learning solutions.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12 max-w-3xl mx-auto">
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <p className="text-foreground/90 leading-relaxed">
                  As an AI/ML Data Scientist, I have a proven track record in developing high-precision models (up to
                  95% fraud detection accuracy), deploying REST APIs, and visualizing fraud trends via interactive
                  dashboards. I'm skilled in translating complex data into actionable insights, with deployments on AWS
                  using Docker. I'm passionate about privacy-compliant AI innovation, large-scale data analysis, and
                  building secure, transparent machine learning solutions.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <Card className="border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">AI & ML</h3>
                <p className="text-muted-foreground">
                  Experienced in developing machine learning models with high accuracy for real-world applications.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Development</h3>
                <p className="text-muted-foreground">
                  Proficient in Python and web development technologies to create responsive and functional
                  applications.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Data Science</h3>
                <p className="text-muted-foreground">
                  Skilled in analyzing large datasets and extracting valuable insights for business decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Visualization</h3>
                <p className="text-muted-foreground">
                  Creating interactive dashboards and visualizations to communicate complex data effectively.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
