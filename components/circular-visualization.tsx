"use client"

import { useState } from "react"
import { motion } from "framer-motion"

type Category = {
  name: string
  skills: string[]
}

interface CircularVisualizationProps {
  categories: Category[]
}

const CircularVisualization = ({ categories }: CircularVisualizationProps) => {
  if (!categories || categories.length === 0) {
    return <div className="circle-container">No categories available.</div>
  }

  const [activeTab, setActiveTab] = useState(categories[0].name)

  return (
    <div className="circle-container">
      <div className="tabs">
        {categories.map((category) => (
          <button
            key={category.name}
            className={`tab-button ${activeTab === category.name ? "active" : ""}`}
            onClick={() => setActiveTab(category.name)}
            aria-pressed={activeTab === category.name}
            aria-label={`Show skills for ${category.name}`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="skills-container">
        {categories.map((category) =>
          activeTab === category.name ? (
            category.skills.map((skill, index) => (
              <motion.div
                key={skill}
                className="circle-text"
                style={{
                  top: `${20 + index * 10}%`,
                  left: `${10 + (index % 5) * 15}%`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {skill}
              </motion.div>
            ))
          ) : null
        )}
      </div>
      <div className="center-text">{activeTab}</div>
    </div>
  )
}

export default CircularVisualization