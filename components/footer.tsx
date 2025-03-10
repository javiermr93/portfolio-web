"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function Footer() {
  const { t } = useLanguage()

  const socialIcons = [
    { icon: Github, href: "https://github.com/javiermr93", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/javiermrdev/", label: "LinkedIn" },
    // { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:javiermr.dev@gmail.com", label: "Email" },
  ]

  return (
    <motion.footer
      className="border-t py-6 md:py-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <motion.p
          className="text-center text-sm leading-loose text-muted-foreground md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          © {new Date().getFullYear()} Javier Martín. {t("footer.rights")}
        </motion.p>
        <div className="flex items-center gap-4">
          {socialIcons.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.3 + i * 0.1,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              whileHover={{
                scale: 1.2,
                rotate: 10,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Link href={item.href} target="_blank" rel="noopener noreferrer">
                <item.icon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                <span className="sr-only">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.footer>
  )
}

