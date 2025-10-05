"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TextAnimationProps {
  phrases: string[]
  interval?: number
  typingSpeed?: number
  deletingSpeed?: number
}

const TextAnimation = ({
  phrases,
  interval = 3000,
  typingSpeed = 30,
  deletingSpeed = 20,
}: TextAnimationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout

    const handleTyping = () => {
      const currentPhrase = phrases[currentIndex]
      if (isDeleting) {
        setDisplayedText(currentPhrase.substring(0, displayedText.length - 1))
        if (displayedText.length === 0) {
          setIsDeleting(false)
          setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length)
        }
      } else {
        setDisplayedText(currentPhrase.substring(0, displayedText.length + 1))
        if (displayedText.length === currentPhrase.length) {
          timer = setTimeout(() => setIsDeleting(true), interval)
          return
        }
      }
      timer = setTimeout(
        handleTyping,
        isDeleting ? deletingSpeed : typingSpeed
      )
    }

    timer = setTimeout(handleTyping, typingSpeed)

    return () => clearTimeout(timer)
  }, [currentIndex, displayedText, isDeleting, phrases, interval, typingSpeed, deletingSpeed])

  return (
    <span className="inline-flex items-center min-w-[250px] relative align-middle">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-primary font-medium h-8"
      >
        {displayedText}
        <motion.span
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop" }}
          className="inline-block w-1 h-full bg-primary ml-1 align-middle"
        />
      </motion.span>
    </span>
  )
}

export default TextAnimation
