"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const skillCategories = [
  {
    id: "all",
    name: "All Skills",
    skills: [
      "Python", "HTML", "CSS", "JavaScript", "SQL", "Machine Learning", 
      "Artificial Intelligence", "Natural Language Processing", "NLTK", 
      "Bootstrap", "PHP", "MySQL", "Data Visualization", "Power BI", "AWS"
    ]
  },
  {
    id: "ai-ml",
    name: "AI & ML",
    skills: ["Machine Learning", "Artificial Intelligence", "Natural Language Processing", "NLTK"]
  },
  {
    id: "programming",
    name: "Programming",
    skills: ["Python", "JavaScript", "PHP"]
  },
  {
    id: "web",
    name: "Web Development",
    skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP"]
  },
  {
    id: "database",
    name: "Database",
    skills: ["SQL", "MySQL"]
  },
  {
    id: "data",
    name: "Data",
    skills: ["Data Visualization", "Power BI"]
  },
  {
    id: "cloud",
    name: "Cloud",
    skills: ["AWS"]
  }
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all")

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
  }

  const activeSkills = skillCategories.find(category => category.id === activeCategory)?.skills || []

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My technical expertise and capabilities
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {skillCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => handleCategoryChange(category.id)}
              className="rounded-full transition-all duration-300"
            >
              {category.name}
            </Button>
          ))}
        </div>

        <motion.div 
          layout
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap justify-center gap-3 w-full"
            >
              {activeSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Badge 
                    variant="secondary" 
                    className="px-4 py-2 text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
