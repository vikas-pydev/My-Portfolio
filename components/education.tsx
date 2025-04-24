"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Calendar } from "lucide-react"

const Education = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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
    <section id="education" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              My academic journey and educational qualifications.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full max-w-5xl">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/30"></div>

              {/* MCA Degree */}
              <div className="flex flex-col md:flex-row items-center mb-16 relative">
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center z-10">
                  <GraduationCap className="text-white h-6 w-6" />
                </div>

                {/* Left side (empty for first item) */}
                <div className="md:w-1/2"></div>

                {/* Right side (content) */}
                <div className="md:w-1/2 md:pl-12 mt-16 md:mt-0">
                  <Card className="border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-1">Master of Computer Applications (MCA)</h3>
                      <h4 className="text-xl font-semibold mb-2">Presidency University, Bengaluru</h4>
                      <p className="text-muted-foreground mb-3">Computer Applications</p>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Aug 2023 - Present</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* BCom Degree */}
              <div className="flex flex-col md:flex-row items-center relative">
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center z-10">
                  <GraduationCap className="text-white h-6 w-6" />
                </div>

                {/* Left side (content) */}
                <div className="md:w-1/2 md:pr-12 mt-16 md:mt-0 md:text-right">
                  <Card className="border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-1">Bachelor of Commerce (BCom)</h3>
                      <h4 className="text-xl font-semibold mb-2">Sri Venkateswara University, Tirupati</h4>
                      <p className="text-muted-foreground mb-3">Computer Applications</p>
                      <div className="flex items-center text-muted-foreground md:justify-end">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Aug 2018 - May 2021</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right side (empty for second item) */}
                <div className="md:w-1/2"></div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-16 w-full max-w-3xl">
            <h3 className="text-2xl font-semibold mb-6 text-center flex items-center justify-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              Certifications
            </h3>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <GraduationCap className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Master Course in Full Stack Development</h4>
                      <p className="text-sm text-muted-foreground">Great Learning</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <GraduationCap className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Data visualization with Power BI</h4>
                      <p className="text-sm text-muted-foreground">Great Learning</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <GraduationCap className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">AWS for Beginners</h4>
                      <p className="text-sm text-muted-foreground">Great Learning</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education
