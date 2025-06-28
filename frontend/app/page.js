"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import AnimatedButton from "./components/AnimatedButton"
import AnimatedCard from "./components/AnimatedCard"
import FloatingParticles from "./components/FloatingParticles"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Particles */}
      <FloatingParticles count={50} />

      {/* Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Navigation */}
      <motion.nav
        className="relative z-10 p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Talk to My Data
          </motion.div>
          <div className="hidden md:flex space-x-6">
            {["Features", "About"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition-colors duration-300"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <main className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated Title */}
          <motion.div variants={floatingVariants} animate="animate">
            <motion.h1 className="text-5xl md:text-7xl font-bold mb-6" variants={titleVariants}>
              <motion.span
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Talk to Your Data
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed" variants={itemVariants}>
            Transform your database queries into natural conversations.
            <br />
            <motion.span
              className="text-blue-400"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              AI-powered insights
            </motion.span>{" "}
            at your fingertips.
          </motion.p>

          {/* Feature Pills */}
          <motion.div className="flex flex-wrap justify-center gap-4 mb-12" variants={itemVariants}>
            {["Natural Language Queries", "Real-time Results", "Smart Analytics"].map((feature, index) => (
              <motion.div
                key={feature}
                className="glass-effect px-4 py-2 rounded-full text-sm text-gray-300 hover:text-white cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
              >
                {feature}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <AnimatedButton href="/config" variant="primary">
              Start Talking to Your Data
              <motion.svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </AnimatedButton>
          </motion.div>

          {/* Stats */}
          <motion.div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8" variants={itemVariants}>
            {[
              { number: "10K+", label: "Queries Processed" },
              { number: "99.9%", label: "Uptime" },
              { number: "< 100ms", label: "Response Time" },
            ].map((stat, index) => (
              <AnimatedCard key={stat.label} delay={1.2 + index * 0.2} className="p-6">
                <motion.div
                  className="text-3xl font-bold text-blue-400 mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: 1.4 + index * 0.2,
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-400">{stat.label}</div>
              </AnimatedCard>
            ))}
          </motion.div>
        </motion.div>
      </main>

      {/* Floating Action Hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        initial={{ opacity: 0 }}
      >
        <div className="text-gray-400 text-sm">Scroll to explore</div>
      </motion.div>
    </div>
  )
}
