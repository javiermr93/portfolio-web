"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"

// Project data
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with payment processing, user authentication, and admin dashboard.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "fullstack",
  },
  {
    id: 2,
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media managers with real-time data visualization.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "D3.js", "Firebase", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "frontend",
  },
  {
    id: 3,
    title: "Task Management API",
    description: "RESTful API for task management with authentication, authorization, and documentation.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Node.js", "Express", "PostgreSQL", "Swagger", "JWT"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "backend",
  },
  {
    id: 4,
    title: "Weather Application",
    description: "Real-time weather application with location detection and 5-day forecast.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "OpenWeather API", "Geolocation API", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "frontend",
  },
  {
    id: 5,
    title: "Inventory Management System",
    description: "Complete inventory management system for small businesses with reporting features.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "Node.js", "MySQL", "Express", "Chart.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "fullstack",
  },
  {
    id: 6,
    title: "Authentication Microservice",
    description: "Standalone authentication microservice with OAuth integration and user management.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Node.js", "Express", "MongoDB", "OAuth", "Docker"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "backend",
  },
]

// Filter categories
const categories = [
  { id: "all", name: "All Projects" },
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "fullstack", name: "Full Stack" },
]

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="projects" className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Projects</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Check out some of my recent work</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="rounded-full"
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
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
                        Code
                      </Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

