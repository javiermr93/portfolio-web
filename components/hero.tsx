"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail, Download } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useLanguage } from "@/context/language-context"
import { useToast } from "@/hooks/use-toast"

export function Hero() {
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [isVisible, setIsVisible] = useState(false)
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)

  // Get the translated role text
  const fullText = t("hero.role")

  useEffect(() => {
    setIsVisible(true)
    // Reset typing animation when language changes
    setText("")
    setIndex(0)
  }, [language])

  useEffect(() => {
    if (isVisible && index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prevText) => prevText + fullText[index])
        setIndex((prevIndex) => prevIndex + 1)
      }, 40)

      return () => clearTimeout(timeout)
    }
  }, [index, isVisible, fullText])

  const handleDownloadCV = async () => {
    try {
      setIsDownloading(true)

      // Determine which CV to download based on language
      const cvFileName = language === "es" ? "CV_JavierMartínRomero.pdf" : "CV_JavierMartínRomero.pdf"

      // Create a link element
      const link = document.createElement("a")
      link.href = `/${cvFileName}`
      link.setAttribute("download", cvFileName)

      // Append to the document, click it, and remove it
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Show success toast
      toast({
        title: language === "es" ? "CV descargado con éxito" : "CV downloaded successfully",
        description: language === "es" ? "Gracias por tu interés" : "Thank you for your interest",
        duration: 3000,
      })
    } catch (error) {
      // Show error toast
      toast({
        title: language === "es" ? "Error al descargar el CV" : "Error downloading CV",
        description: language === "es" ? "Por favor, inténtalo de nuevo más tarde" : "Please try again later",
        variant: "destructive",
        duration: 3000,
      })
      console.error("Error downloading CV:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    show: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1.2 + i * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    }),
  }

  return (
    <section id="about" className="py-24 md:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            variants={container}
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
          >
            <div className="space-y-2">
              <motion.h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none" variants={item}>
                {t("hero.greeting")}{" "}
                <motion.span
                  className="text-primary"
                  animate={{
                    color: ["#3b82f6", "#8b5cf6", "#ec4899", "#3b82f6"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  Javier Martín
                </motion.span>
              </motion.h1>
              <motion.p className="max-w-[600px] text-muted-foreground md:text-xl h-[60px]" variants={item}>
                {text}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle"
                />
              </motion.p>
            </div>
            <motion.div className="flex flex-col gap-2 min-[400px]:flex-row" variants={item}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild>
                  <Link href="#contact">
                    {t("hero.contactMe")}{" "}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" onClick={handleDownloadCV} disabled={isDownloading}>
                  {isDownloading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                      />
                      {language === "es" ? "Descargando..." : "Downloading..."}
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      {t("hero.downloadResume")}
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>
            <div className="flex gap-4 mt-4">
              {[Github, Linkedin, Mail].map((Icon, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={socialVariants}
                  initial="hidden"
                  animate={isVisible ? "show" : "hidden"}
                  whileHover={{
                    scale: 1.2,
                    rotate: 10,
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={i === 2 ? "mailto:javiermr.dev@gmail.com" : `https://${i === 0 ? "github.com/javiermr93" : "linkedin.com/in/javiermrdev/"}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="icon">
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{i === 0 ? "GitHub" : i === 1 ? "LinkedIn" : "Email"}</span>
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: {
                duration: 0.8,
                delay: 0.5,
                type: "spring",
                stiffness: 100,
              },
            }}
          >
            <motion.div
              className="relative h-[400px] w-[400px] rounded-full bg-gradient-to-r from-secondary to-secondary/50 p-1"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 40px rgba(59, 130, 246, 0.3)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <motion.div
                className="absolute inset-0 rounded-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img
                  src="/javi.png?height=400&width=400"
                  alt="javier martín"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

