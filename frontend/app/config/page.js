"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import AnimatedButton from "../components/AnimatedButton"
import AnimatedCard from "../components/AnimatedCard"

export default function ConfigPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    host: "",
    port: "",
    db_name: "",
    user: "",
    password: "",
  })
  const [isConnecting, setIsConnecting] = useState(false)
  const [errors, setErrors] = useState({})
  const [focusedField, setFocusedField] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.host.trim()) newErrors.host = "Host is required"
    if (!formData.port.trim()) newErrors.port = "Port is required"
    if (!formData.db_name.trim()) newErrors.db_name = "Database name is required"
    if (!formData.user.trim()) newErrors.user = "Username is required"
    if (!formData.password.trim()) newErrors.password = "Password is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsConnecting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const mockResponse = { success: true, message: "Connected successfully!" }

      if (mockResponse.success) {
        setTimeout(() => {
          router.push("/schema")
        }, 1000)
      }
    } catch (error) {
      console.error("Connection failed:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    blur: {
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  }

  const fields = [
    { name: "host", label: "Database Host", placeholder: "localhost or your-db-host.com", type: "text" },
    { name: "port", label: "Port", placeholder: "5432, 3306, 1433, etc.", type: "text" },
    { name: "db_name", label: "Database Name", placeholder: "your_database_name", type: "text" },
    { name: "user", label: "Username", placeholder: "database_user", type: "text" },
    { name: "password", label: "Password", placeholder: "••••••••", type: "password" },
  ]

  return (
    <motion.div
      className="min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Navigation */}
      <motion.nav
        className="max-w-4xl mx-auto mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatedButton href="/" variant="ghost">
          <motion.svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            whileHover={{ x: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </motion.svg>
          Back to Home
        </AnimatedButton>
      </motion.nav>

      <motion.div className="max-w-2xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
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
            Connect Your Database
          </motion.h1>
          <p className="text-xl text-gray-300">Enter your database credentials to start querying your data</p>
        </motion.div>

        {/* Connection Form */}
        <AnimatedCard className="p-8 shadow-2xl" delay={0.3}>
          <motion.form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field, index) => (
              <motion.div key={field.name} className="space-y-2" variants={itemVariants} custom={index}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-300">
                  {field.label}
                </label>
                <motion.div variants={inputVariants} animate={focusedField === field.name ? "focus" : "blur"}>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    placeholder={field.placeholder}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                      errors[field.name] ? "border-red-500" : "border-gray-600 hover:border-gray-500"
                    }`}
                  />
                </motion.div>
                <AnimatePresence>
                  {errors[field.name] && (
                    <motion.p
                      className="text-red-400 text-sm"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {errors[field.name]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Connect Button */}
            <motion.div variants={itemVariants}>
              <AnimatedButton type="submit" disabled={isConnecting} variant="primary" className="w-full py-4">
                <AnimatePresence mode="wait">
                  {isConnecting ? (
                    <motion.div
                      className="flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </motion.svg>
                      Connecting...
                    </motion.div>
                  ) : (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Connect to Database
                    </motion.span>
                  )}
                </AnimatePresence>
              </AnimatedButton>
            </motion.div>
          </motion.form>

          {/* Security Note */}
          <motion.div
            className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-start">
              <motion.svg
                className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </motion.svg>
              <div>
                <h4 className="text-blue-400 font-medium mb-1">Secure Connection</h4>
                <p className="text-gray-300 text-sm">
                  Your credentials are encrypted and never stored. We use secure protocols to connect to your database.
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatedCard>
      </motion.div>
    </motion.div>
  )
}
