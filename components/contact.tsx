"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone, CheckCircle, AlertCircle } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Form submitted:", formData)
      setSubmitSuccess(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setSubmitError(t("contact.error"))
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const formItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.5,
      },
    }),
  }

  const contactItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.5,
      },
    }),
  }

  const contactInfo = [
    { icon: Mail, titleKey: "contact.email", value: "javiermr.dev@gmail.com" },
    // { icon: Phone, titleKey: "contact.phone", value: "+1 (555) 123-4567" },
    { icon: MapPin, titleKey: "contact.location", value: "Sevilla, ES" },
  ]

  const formFields = [
    { id: "name", labelKey: "contact.name", type: "text", placeholderKey: "contact.namePlaceholder", required: true },
    {
      id: "email",
      labelKey: "contact.email",
      type: "email",
      placeholderKey: "contact.emailPlaceholder",
      required: true,
    },
    {
      id: "subject",
      labelKey: "contact.subject",
      type: "text",
      placeholderKey: "contact.subjectPlaceholder",
      required: true,
    },
  ]

  return (
    <section id="contact" className="py-24 bg-muted/50 overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          className="flex flex-col items-center justify-center space-y-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="space-y-2" variants={titleVariants}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("contact.title")}</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{t("contact.subtitle")}</p>
          </motion.div>

          <div className="grid w-full max-w-5xl gap-6 md:grid-cols-2 lg:gap-12 mt-8">
            {/* Contact Information */}
            <motion.div variants={cardVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>{t("contact.info")}</CardTitle>
                  <CardDescription>{t("contact.infoSubtitle")}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  {contactInfo.map((item, i) => (
                    <motion.div
                      key={item.titleKey}
                      className="flex items-center gap-4"
                      custom={i}
                      variants={contactItemVariants}
                      whileHover={{
                        x: 5,
                        transition: { type: "spring", stiffness: 300, damping: 10 },
                      }}
                    >
                      <motion.div
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <item.icon className="h-5 w-5 text-primary" />
                      </motion.div>
                      <div>
                        <h3 className="font-medium">{t(item.titleKey)}</h3>
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            {/* <motion.div variants={cardVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>{t("contact.sendMessage")}</CardTitle>
                  <CardDescription>{t("contact.sendMessageSubtitle")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="grid gap-4">
                    {formFields.map((field, i) => (
                      <motion.div key={field.id} className="grid gap-2" custom={i} variants={formItemVariants}>
                        <Label htmlFor={field.id}>{t(field.labelKey)}</Label>
                        <Input
                          id={field.id}
                          name={field.id}
                          type={field.type}
                          placeholder={t(field.placeholderKey)}
                          value={formData[field.id as keyof typeof formData]}
                          onChange={handleChange}
                          required={field.required}
                        />
                      </motion.div>
                    ))}

                    <motion.div className="grid gap-2" custom={3} variants={formItemVariants}>
                      <Label htmlFor="message">{t("contact.message")}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={t("contact.messagePlaceholder")}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="min-h-[120px]"
                      />
                    </motion.div>

                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-sm text-red-500"
                      >
                        <AlertCircle className="h-4 w-4" />
                        <span>{submitError}</span>
                      </motion.div>
                    )}

                    {submitSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-sm text-green-500"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>{t("contact.success")}</span>
                      </motion.div>
                    )}

                    <motion.div
                      custom={4}
                      variants={formItemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                          />
                        ) : null}
                        {isSubmitting ? t("contact.sending") : t("contact.send")}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div> */}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

