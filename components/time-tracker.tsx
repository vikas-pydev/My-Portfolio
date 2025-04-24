"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useMobile } from "@/hooks/use-mobile"

const TimeTracker = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const trackerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Initialize position to bottom right corner
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPosition({
        x: window.innerWidth - 220, // Adjusted for margin
        y: window.innerHeight - 80, // Adjusted for margin
      })
    }
  }, [])

  // Update timer
  useEffect(() => {
    const startTime = new Date().getTime()

    const updateTimer = () => {
      const currentTime = new Date().getTime()
      const elapsedTime = Math.floor((currentTime - startTime) / 1000)

      const hours = Math.floor(elapsedTime / 3600)
      const minutes = Math.floor((elapsedTime % 3600) / 60)
      const seconds = elapsedTime % 60

      setTime({ hours, minutes, seconds })
    }

    const timerId = setInterval(updateTimer, 1000)
    return () => clearInterval(timerId)
  }, [])

  // Handle mouse/touch events for dragging
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    if (trackerRef.current) {
      const rect = trackerRef.current.getBoundingClientRect()
      setDragOffset({
        x: clientX - rect.left,
        y: clientY - rect.top,
      })
    }
  }

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    setPosition({
      x: clientX - dragOffset.x,
      y: clientY - dragOffset.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("touchmove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchend", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging])

  // Keep tracker within viewport bounds
  useEffect(() => {
    if (typeof window !== "undefined" && trackerRef.current) {
      const rect = trackerRef.current.getBoundingClientRect()

      if (position.x < 0) {
        setPosition((prev) => ({ ...prev, x: 0 }))
      } else if (position.x + rect.width > window.innerWidth) {
        setPosition((prev) => ({ ...prev, x: window.innerWidth - rect.width }))
      }

      if (position.y < 0) {
        setPosition((prev) => ({ ...prev, y: 0 }))
      } else if (position.y + rect.height > window.innerHeight) {
        setPosition((prev) => ({ ...prev, y: window.innerHeight - rect.height }))
      }
    }
  }, [position])

  return (
    <div
      ref={trackerRef}
      className="fixed z-40 cursor-move"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      <Card className="p-2 shadow-lg bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 rounded-lg">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary animate-pulse" />
          <div className="text-sm font-medium">
            Time Spent: {time.minutes.toString().padStart(2, "0")}m {time.seconds.toString().padStart(2, "0")}s
          </div>
        </div>
      </Card>
    </div>
  )
}

export default TimeTracker
