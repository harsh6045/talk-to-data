"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AnimatedButton from "../components/AnimatedButton"
import AnimatedCard from "../components/AnimatedCard"

// Mock schema data
const mockSchemas = [
  {
    name: "users",
    columns: [
      { name: "id", type: "INTEGER", primary: true },
      { name: "name", type: "VARCHAR(255)", primary: false },
      { name: "email", type: "VARCHAR(255)", primary: false },
      { name: "created_at", type: "TIMESTAMP", primary: false },
    ],
    rowCount: 1250,
  },
  {
    name: "orders",
    columns: [
      { name: "order_id", type: "INTEGER", primary: true },
      { name: "user_id", type: "INTEGER", primary: false },
      { name: "total", type: "DECIMAL(10,2)", primary: false },
      { name: "status", type: "VARCHAR(50)", primary: false },
      { name: "order_date", type: "TIMESTAMP", primary: false },
    ],
    rowCount: 3420,
  },
  {
    name: "products",
    columns: [
      { name: "product_id", type: "INTEGER", primary: true },
      { name: "name", type: "VARCHAR(255)", primary: false },
      { name: "price", type: "DECIMAL(10,2)", primary: false },
      { name: "category", type: "VARCHAR(100)", primary: false },
      { name: "stock", type: "INTEGER", primary: false },
    ],
    rowCount: 856,
  },
]

// Mock query results
const mockQueryResults = {
  "show me all users": [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", created_at: "2024-01-15" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", created_at: "2024-01-16" },
    { id: 3, name: "Carol Davis", email: "carol@example.com", created_at: "2024-01-17" },
  ],
  "total orders by status": [
    { status: "completed", count: 2150 },
    { status: "pending", count: 890 },
    { status: "cancelled", count: 380 },
  ],
  "top selling products": [
    { name: "Wireless Headphones", sales: 245, revenue: 12250.0 },
    { name: "Smart Watch", sales: 189, revenue: 37800.0 },
    { name: "Laptop Stand", sales: 156, revenue: 4680.0 },
  ],
}

export default function SchemaPage() {
  const [expandedTables, setExpandedTables] = useState({})
  const [query, setQuery] = useState("")
  const [isQuerying, setIsQuerying] = useState(false)
  const [queryResult, setQueryResult] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTable = (tableName) => {
    setExpandedTables((prev) => ({
      ...prev,
      [tableName]: !prev[tableName],
    }))
  }

  const handleQuery = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsQuerying(true)
    setQueryResult(null)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const lowerQuery = query.toLowerCase()
    let result = null

    for (const [key, value] of Object.entries(mockQueryResults)) {
      if (lowerQuery.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerQuery)) {
        result = value
        break
      }
    }

    if (!result) {
      result = [{ message: "Query executed successfully", rows_affected: Math.floor(Math.random() * 100) + 1 }]
    }

    setQueryResult(result)
    setIsQuerying(false)
  }

  if (!mounted) return null

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

  const tableVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.4, ease: "easeInOut" },
        opacity: { duration: 0.3, delay: 0.1 },
      },
    },
  }

  return (
    <motion.div
      className="min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Navigation */}
      <motion.nav
        className="max-w-7xl mx-auto mb-8 flex justify-between items-center"
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

        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            className="w-3 h-3 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <span className="text-green-400 text-sm">Connected</span>
        </motion.div>
      </motion.nav>

      <motion.div className="max-w-7xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
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
            Database Schema
          </motion.h1>
          <p className="text-xl text-gray-300">
            Explore your database structure and query your data with natural language
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Schema Explorer */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h2 className="text-2xl font-semibold text-white mb-6">Tables & Schemas</h2>

            {mockSchemas.map((table, index) => (
              <AnimatedCard
                key={table.name}
                delay={index * 0.1}
                className="overflow-hidden"
                onClick={() => toggleTable(table.name)}
              >
                <motion.div className="p-6 cursor-pointer hover:bg-gray-800/30 transition-colors duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{table.name}</h3>
                      <p className="text-gray-400 text-sm">{table.rowCount.toLocaleString()} rows</p>
                    </div>
                    <motion.svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: expandedTables[table.name] ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {expandedTables[table.name] && (
                    <motion.div
                      variants={tableVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="px-6 pb-6 overflow-hidden"
                    >
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-300 mb-3">Columns</h4>
                        <div className="space-y-2">
                          {table.columns.map((column, colIndex) => (
                            <motion.div
                              key={column.name}
                              className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-b-0"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: colIndex * 0.1 }}
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-white font-medium">{column.name}</span>
                                {column.primary && (
                                  <motion.span
                                    className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 300, delay: colIndex * 0.1 + 0.2 }}
                                  >
                                    PRIMARY
                                  </motion.span>
                                )}
                              </div>
                              <span className="text-gray-400 text-sm">{column.type}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </AnimatedCard>
            ))}
          </motion.div>

          {/* Query Interface */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h2 className="text-2xl font-semibold text-white mb-6">Natural Language Query</h2>

            <AnimatedCard className="p-6" delay={0.3}>
              <form onSubmit={handleQuery} className="space-y-4">
                <div>
                  <label htmlFor="query" className="block text-sm font-medium text-gray-300 mb-2">
                    Ask your data anything
                  </label>
                  <motion.textarea
                    id="query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., Show me all users, What are the top selling products?, How many orders are pending?"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </div>

                <AnimatedButton
                  type="submit"
                  disabled={isQuerying || !query.trim()}
                  variant="primary"
                  className="w-full py-3"
                >
                  <AnimatePresence mode="wait">
                    {isQuerying ? (
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
                        Analyzing...
                      </motion.div>
                    ) : (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Execute Query
                      </motion.span>
                    )}
                  </AnimatePresence>
                </AnimatedButton>
              </form>

              {/* Sample Queries */}
              <motion.div className="mt-6" variants={itemVariants}>
                <h4 className="text-sm font-medium text-gray-300 mb-3">Try these examples:</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(mockQueryResults).map((sampleQuery, index) => (
                    <motion.button
                      key={sampleQuery}
                      onClick={() => setQuery(sampleQuery)}
                      className="px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 text-sm rounded-full transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {sampleQuery}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatedCard>

            {/* Query Results */}
            <AnimatePresence>
              {queryResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <AnimatedCard className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Query Results</h3>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-700">
                            {Object.keys(queryResult[0] || {}).map((key, index) => (
                              <motion.th
                                key={key}
                                className="text-left py-3 px-4 text-gray-300 font-medium"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                              >
                                {key.replace("_", " ").toUpperCase()}
                              </motion.th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {queryResult.map((row, rowIndex) => (
                            <motion.tr
                              key={rowIndex}
                              className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors duration-200"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: rowIndex * 0.1 }}
                              whileHover={{ x: 5 }}
                            >
                              {Object.values(row).map((value, cellIndex) => (
                                <td key={cellIndex} className="py-3 px-4 text-gray-300">
                                  {typeof value === "number" ? value.toLocaleString() : value}
                                </td>
                              ))}
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <motion.div
                      className="mt-4 text-sm text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      Showing {queryResult.length} result{queryResult.length !== 1 ? "s" : ""}
                    </motion.div>
                  </AnimatedCard>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
