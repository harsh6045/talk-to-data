import { Inter } from "next/font/google"
import "./globals.css"
import PageTransition from "./components/PageTransition"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Talk to My Data - AI Database Query Interface",
  description: "Connect to your database and query your data using natural language with AI",
  keywords: "AI, database, query, data analysis, SQL",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
          <PageTransition>{children}</PageTransition>
        </div>
      </body>
    </html>
  )
}
