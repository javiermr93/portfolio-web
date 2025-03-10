"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/context/language-context"

export function Skills() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Skill data
  const skillCategories = [
    {
      id: "frontend",
      titleKey: "skills.frontend",
      skills: [
        { name: "HTML5", icon: "🌐", proficiency: 90 },
        { name: "CSS3", icon: "🎨", proficiency: 90 },
        { name: "JavaScript", icon: "📜", proficiency: 90 },
        { name: "TypeScript", icon: "🔷", proficiency: 90 },
        { name: "React", icon: "⚛️", proficiency: 50 },
        { name: "Angular", icon: "🅰️", proficiency: 90 },
        { name: "Ionic", icon: "⚡", proficiency: 90 },
        { name: "Angular Material", icon: "🎨", proficiency: 90 },
        { name: "Tailwind CSS", icon: "🌊", proficiency: 50 },
      ],
    },
    {
      id: "backend",
      titleKey: "skills.backend",
      skills: [
        { name: "Node.js", icon: "🟢", proficiency: 50 },
        { name: "Express", icon: "🚂", proficiency: 50 },
        { name: "Python", icon: "🐍", proficiency: 80 },
        { name: "Django", icon: "🎸", proficiency: 80 },
        { name: "GraphQL", icon: "⬢", proficiency: 75 },
        { name: "REST API", icon: "🔌", proficiency: 90 },
        { name: "MongoDB", icon: "🍃", proficiency: 80 },
        { name: "PostgreSQL", icon: "🐘", proficiency: 80 },
      ],
    },
    {
      id: "tools",
      titleKey: "skills.tools",
      skills: [
        { name: "Git", icon: "🔄", proficiency: 90 },
        { name: "Docker", icon: "🐳", proficiency: 85 },
        { name: "AWS", icon: "☁️", proficiency: 85 },
        { name: "CI/CD", icon: "🔄", proficiency: 75 },
        { name: "Jest", icon: "🃏", proficiency: 80 },
        { name: "Cypress", icon: "🧪", proficiency: 75 },
        { name: "Figma", icon: "🎨", proficiency: 50 },
        { name: "Agile/Scrum", icon: "📊", proficiency: 70 },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        type: "spring",
        stiffness: 100,
      },
    }),
  }

  return (
    <section id="skills" className="py-24 overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          className="flex flex-col items-center justify-center space-y-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="space-y-2" variants={titleVariants}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("skills.title")}</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{t("skills.subtitle")}</p>
          </motion.div>

          <motion.div className="w-full max-w-3xl mt-12" variants={tabVariants}>
            <Tabs defaultValue="frontend" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                {skillCategories.map((category) => (
                  <motion.div key={category.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <TabsTrigger value={category.id}>{t(category.titleKey)}</TabsTrigger>
                  </motion.div>
                ))}
              </TabsList>

              {skillCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-6">
                  <motion.div variants={cardVariants} initial="hidden" animate="visible">
                    <Card>
                      <CardContent className="p-6">
                        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                          {category.skills.map((skill, index) => (
                            <motion.div
                              key={skill.name}
                              custom={index}
                              variants={skillItemVariants}
                              whileHover={{
                                y: -5,
                                transition: { type: "spring", stiffness: 300, damping: 10 },
                              }}
                              className="flex flex-col items-center gap-2"
                            >
                              <motion.div
                                className="flex h-20 w-20 items-center justify-center rounded-full bg-muted"
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                              >
                                <span className="text-3xl">{skill.icon}</span>
                              </motion.div>
                              <h3 className="font-medium">{skill.name}</h3>
                              <div className="h-2 w-full rounded-full bg-muted">
                                <motion.div
                                  className="h-full rounded-full bg-primary"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.proficiency}%` }}
                                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

