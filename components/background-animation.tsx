"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function BackgroundAnimation() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]"
        animate={{
          x: mousePosition.x * 0.05,
          y: mousePosition.y * 0.05,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 100 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px]"
        animate={{
          x: -mousePosition.x * 0.03,
          y: -mousePosition.y * 0.03,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 100 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px]"
        animate={{
          x: mousePosition.x * 0.02,
          y: -mousePosition.y * 0.02,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 100 }}
      />
    </div>
  )
}

