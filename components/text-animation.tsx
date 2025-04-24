"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TextAnimationProps {
  phrases: string[]
  interval?: number
}

const TextAnimation = ({ phrases, interval = 3000 }: TextAnimationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const typingSpeed = 50 // Fast typing speed
  const deletingSpeed = 30 // Fast deleting speed

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[currentIndex]
      if (isDeleting) {
        setDisplayedText((prev) => prev.slice(0, -1))
        if (displayedText === "") {
          setIsDeleting(false)
          setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length)
        }
      } else {
        setDisplayedText((prev) => currentPhrase.slice(0, prev.length + 1))
        if (displayedText === currentPhrase) {
          setTimeout(() => setIsDeleting(true), interval)
        }
      }
    }

    const typingInterval = setInterval(handleTyping, isDeleting ? deletingSpeed : typingSpeed)
    return () => clearInterval(typingInterval)
  }, [displayedText, isDeleting, currentIndex, phrases, interval])

  return (
    <span className="inline-block min-w-[180px]">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-primary font-medium inline-block"
      >
        {displayedText}
        <span className="animate-blink">|</span>
      </motion.span>
    </span>
  )
}

export default TextAnimation
