"use client"

import { motion } from "framer-motion"

export default function AnimatedCard({ children, className = "", delay = 0, hover = true, onClick }) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay,
        ease: "easeOut",
      },
    },
    hover: hover
      ? {
          y: -5,
          scale: 1.02,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
          },
        }
      : {},
  }

  return (
    <motion.div
      className={`glass-effect rounded-lg ${className} ${onClick ? "cursor-pointer" : ""}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
