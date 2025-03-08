"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"

export function Projects() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("all")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Project data with translation keys
  const projects = [
    {
      id: 1,
      titleKey: "project1.title",
      descriptionKey: "project1.description",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "fullstack",
    },
    {
      id: 2,
      titleKey: "project2.title",
      descriptionKey: "project2.description",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "D3.js", "Firebase", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "frontend",
    },
    {
      id: 3,
      titleKey: "project3.title",
      descriptionKey: "project3.description",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Node.js", "Express", "PostgreSQL", "Swagger", "JWT"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "backend",
    },
    {
      id: 4,
      titleKey: "project4.title",
      descriptionKey: "project4.description",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "OpenWeather API", "Geolocation API", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "frontend",
    },
    {
      id: 5,
      titleKey: "project5.title",
      descriptionKey: "project5.description",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "Node.js", "MySQL", "Express", "Chart.js"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "fullstack",
    },
    {
      id: 6,
      titleKey: "project6.title",
      descriptionKey: "project6.description",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Node.js", "Express", "MongoDB", "OAuth", "Docker"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "backend",
    },
  ]

  // Filter categories with translation keys
  const categories = [
    { id: "all", name: t("projects.allProjects") },
    { id: "frontend", name: t("projects.frontend") },
    { id: "backend", name: t("projects.backend") },
    { id: "fullstack", name: t("projects.fullStack") },
  ]

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const categoryVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.3,
      },
    }),
  }

  // Optimized card variants with faster transitions
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  }

  return (
    <section id="projects" className="py-24 bg-muted/50 overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          className="flex flex-col items-center justify-center space-y-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="space-y-2" variants={titleVariants}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("projects.title")}</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{t("projects.subtitle")}</p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 mb-12">
            {categories.map((category, i) => (
              <motion.div
                key={category.id}
                custom={i}
                variants={categoryVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className="rounded-full"
                >
                  {category.name}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Projects Grid - Optimized Animation */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ y: -5 }}
                  className="flex"
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="aspect-video overflow-hidden">
                      <motion.img
                        src={project.image || "/placeholder.svg"}
                        alt={t(project.titleKey)}
                        className="h-full w-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{t(project.titleKey)}</CardTitle>
                      <CardDescription>{t(project.descriptionKey)}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button asChild variant="outline" size="sm">
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          {t("projects.code")}
                        </Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {t("projects.liveDemo")}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

