"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BriefcaseBusiness, Calendar } from "lucide-react"

const Experience = () => {
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

  const experiences = [
    {
      title: "Artificial Intelligence Intern",
      company: "Btech Walleh in association with Teachnook",
      period: "Sep 2024 - Oct 2024",
      location: "Remote",
      achievements: [
        "Achieved 90%+ accuracy in sentiment classification using DistilBERT, deployed via Flask API.",
        "Reduced manual feedback analysis time by 40% through automated sentiment chatbot implementation.",
        "Improved customer sentiment understanding by 85% by providing instant analysis using the developed chatbot.",
        "Decreased API latency by 15% through optimized DistilBERT model deployment in Flask.",
      ],
    },
  ]

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              My professional journey in the field of AI and machine learning.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="w-full max-w-4xl">
            {experiences.map((exp, index) => (
              <motion.div key={exp.title + exp.company} variants={itemVariants} className="mb-8 relative">
                <Card className="border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-md">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <BriefcaseBusiness className="h-5 w-5 text-primary" />
                          {exp.title}
                        </CardTitle>
                        <CardDescription className="text-base mt-1">{exp.company}</CardDescription>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 w-fit">
                        <Calendar className="h-3 w-3" />
                        {exp.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{exp.location}</p>
                    <ul className="space-y-2 list-disc pl-5">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-foreground/90">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
