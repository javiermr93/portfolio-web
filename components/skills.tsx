"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Skill data
const skillCategories = [
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "HTML5", icon: "🌐", proficiency: 90 },
      { name: "CSS3", icon: "🎨", proficiency: 85 },
      { name: "JavaScript", icon: "📜", proficiency: 90 },
      { name: "TypeScript", icon: "🔷", proficiency: 85 },
      { name: "React", icon: "⚛️", proficiency: 90 },
      { name: "Next.js", icon: "▲", proficiency: 85 },
      { name: "Tailwind CSS", icon: "🌊", proficiency: 80 },
      { name: "Redux", icon: "🔄", proficiency: 75 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Node.js", icon: "🟢", proficiency: 85 },
      { name: "Express", icon: "🚂", proficiency: 85 },
      { name: "Python", icon: "🐍", proficiency: 75 },
      { name: "Django", icon: "🎸", proficiency: 70 },
      { name: "GraphQL", icon: "⬢", proficiency: 75 },
      { name: "REST API", icon: "🔌", proficiency: 90 },
      { name: "MongoDB", icon: "🍃", proficiency: 80 },
      { name: "PostgreSQL", icon: "🐘", proficiency: 75 },
    ],
  },
  {
    id: "tools",
    title: "Tools & Others",
    skills: [
      { name: "Git", icon: "🔄", proficiency: 90 },
      { name: "Docker", icon: "🐳", proficiency: 75 },
      { name: "AWS", icon: "☁️", proficiency: 70 },
      { name: "CI/CD", icon: "🔄", proficiency: 75 },
      { name: "Jest", icon: "🃏", proficiency: 80 },
      { name: "Cypress", icon: "🧪", proficiency: 75 },
      { name: "Figma", icon: "🎨", proficiency: 70 },
      { name: "Agile/Scrum", icon: "📊", proficiency: 85 },
    ],
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Skills</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Technologies and tools I work with</p>
          </div>

          <div className="w-full max-w-3xl mt-12">
            <Tabs defaultValue="frontend" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                {skillCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {skillCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {category.skills.map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="flex flex-col items-center gap-2"
                          >
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                              <span className="text-3xl">{skill.icon}</span>
                            </div>
                            <h3 className="font-medium">{skill.name}</h3>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <motion.div
                                className="h-full rounded-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.proficiency}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}

