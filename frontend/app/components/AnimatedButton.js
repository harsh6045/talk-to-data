"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function AnimatedButton({
  href,
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  type = "button",
}) {
  const baseClasses =
    "relative inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 overflow-hidden"

  const variants = {
    primary:
      "px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white",
    secondary: "px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-white border border-gray-600 hover:border-gray-500",
    ghost: "px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/30",
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: {
      scale: 0.95,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  }

  const glowVariants = {
    initial: { opacity: 0.5, scale: 1 },
    hover: {
      opacity: 1,
      scale: 1.1,
      transition: { duration: 0.3 },
    },
  }

  const content = (
    <>
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75"
          variants={glowVariants}
          initial="initial"
          whileHover="hover"
        />
      )}
      <span className="relative z-10 flex items-center">{children}</span>
    </>
  )

  const combinedClasses = `${baseClasses} ${variants[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`

  if (href) {
    return (
      <Link href={href} className="inline-block">
        <motion.div
          className={combinedClasses}
          variants={buttonVariants}
          initial="initial"
          whileHover={!disabled ? "hover" : "initial"}
          whileTap={!disabled ? "tap" : "initial"}
        >
          {content}
        </motion.div>
      </Link>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      variants={buttonVariants}
      initial="initial"
      whileHover={!disabled ? "hover" : "initial"}
      whileTap={!disabled ? "tap" : "initial"}
    >
      {content}
    </motion.button>
  )
}
