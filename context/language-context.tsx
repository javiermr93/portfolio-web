"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "es"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Añadir las traducciones para el proyecto de portfolio
const translations = {
  en: {
    // Header
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",

    // Hero
    "hero.greeting": "Hi, I'm",
    "hero.role": "Full Stack Developer specializing in web and mobile application development using Angular, Ionic, Python (Django), and AWS.",
    "hero.contactMe": "Contact Me",
    "hero.downloadResume": "Download Resume",

    // Projects
    "projects.title": "My Projects",
    "projects.subtitle": "Check out some of my recent work",
    "projects.allProjects": "All Projects",
    "projects.frontend": "Frontend",
    "projects.backend": "Backend",
    "projects.fullStack": "Full Stack",
    "projects.code": "Code",
    "projects.liveDemo": "Live Demo",

    // Skills
    "skills.title": "My Skills",
    "skills.subtitle": "Technologies and tools I work with",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Tools & Others",

    // Contact
    "contact.title": "Get In Touch",
    "contact.subtitle": "Have a project in mind or want to chat? Feel free to reach out!",
    "contact.info": "Contact Information",
    "contact.infoSubtitle": "Feel free to reach out through any of these channels",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.location": "Location",
    "contact.sendMessage": "Send a Message",
    "contact.sendMessageSubtitle": "Fill out the form below and I'll get back to you as soon as possible",
    "contact.name": "Name",
    "contact.namePlaceholder": "Your name",
    "contact.emailPlaceholder": "Your email",
    "contact.subject": "Subject",
    "contact.subjectPlaceholder": "Subject",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Your message",
    "contact.sending": "Sending...",
    "contact.send": "Send Message",
    "contact.success": "Message sent successfully! I'll get back to you soon.",
    "contact.error": "There was an error submitting the form. Please try again.",

    // Footer
    "footer.rights": "All rights reserved.",

    // Project descriptions
    "project1.title": "Booking Management System",
    "project1.description":
      "A comprehensive booking management system for hotels with payment processing, user authentication, and admin dashboard.",
    "project2.title": "E-commerce Platform",
    "project2.description": "Full-featured e-commerce platform with React, Node.js and AWS infrastructure.",
    "project3.title": "Real Estate API",
    "project3.description":
      "RESTful API for real estate management with authentication, authorization, and documentation.",
    "project4.title": "Inventory Management System",
    "project4.description": "Complete inventory management system for small businesses with reporting features.",
    "project5.title": "CRM System",
    "project5.description": "Customer Relationship Management system with analytics dashboard and email integration.",
    "project6.title": "Authentication Service",
    "project6.description": "Standalone authentication service with OAuth integration and user management.",
    "project7.title": "Personal Portfolio",
    "project7.description":
      "Interactive portfolio website built with Next.js, React, Tailwind CSS and Framer Motion, featuring multilingual support.",
  },
  es: {
    // Header
    "nav.about": "Sobre mí",
    "nav.projects": "Proyectos",
    "nav.skills": "Habilidades",
    "nav.contact": "Contacto",

    // Hero
    "hero.greeting": "Hola, soy",
    "hero.role": "Desarrollador Full Stack especializado en desarrollo web con Angular, Ionic, Python (Django) y AWS.",
    "hero.contactMe": "Contáctame",
    "hero.downloadResume": "Descargar CV",

    // Projects
    "projects.title": "Mis Proyectos",
    "projects.subtitle": "Echa un vistazo a algunos de mis trabajos recientes",
    "projects.allProjects": "Todos los Proyectos",
    "projects.frontend": "Frontend",
    "projects.backend": "Backend",
    "projects.fullStack": "Full Stack",
    "projects.code": "Código",
    "projects.liveDemo": "Demo en vivo",

    // Skills
    "skills.title": "Mis Habilidades",
    "skills.subtitle": "Tecnologías y herramientas con las que trabajo",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Herramientas y Otros",

    // Contact
    "contact.title": "Ponte en Contacto",
    "contact.subtitle": "¿Tienes un proyecto en mente o quieres charlar? ¡No dudes en contactarme!",
    "contact.info": "Información de Contacto",
    "contact.infoSubtitle": "Puedes contactarme a través de cualquiera de estos canales",
    "contact.email": "Correo",
    "contact.phone": "Teléfono",
    "contact.location": "Ubicación",
    "contact.sendMessage": "Enviar un Mensaje",
    "contact.sendMessageSubtitle": "Completa el formulario a continuación y te responderé lo antes posible",
    "contact.name": "Nombre",
    "contact.namePlaceholder": "Tu nombre",
    "contact.emailPlaceholder": "Tu correo",
    "contact.subject": "Asunto",
    "contact.subjectPlaceholder": "Asunto",
    "contact.message": "Mensaje",
    "contact.messagePlaceholder": "Tu mensaje",
    "contact.sending": "Enviando...",
    "contact.send": "Enviar Mensaje",
    "contact.success": "¡Mensaje enviado con éxito! Te responderé pronto.",
    "contact.error": "Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.",

    // Footer
    "footer.rights": "Todos los derechos reservados.",

    // Project descriptions
    "project1.title": "Sistema de Gestión de Reservas",
    "project1.description":
      "Un sistema completo de gestión de reservas para hoteles con procesamiento de pagos, autenticación de usuarios y panel de administración.",
    "project2.title": "Plataforma de Comercio Electrónico",
    "project2.description": "Plataforma de comercio electrónico completa con React, Node.js e infraestructura AWS.",
    "project3.title": "API de Bienes Raíces",
    "project3.description":
      "API RESTful para gestión de bienes raíces con autenticación, autorización y documentación.",
    "project4.title": "Sistema de Gestión de Inventario",
    "project4.description":
      "Sistema completo de gestión de inventario para pequeñas empresas con funciones de informes.",
    "project5.title": "Sistema CRM",
    "project5.description":
      "Sistema de Gestión de Relaciones con Clientes con panel de análisis e integración de correo electrónico.",
    "project6.title": "Servicio de Autenticación",
    "project6.description": "Servicio de autenticación independiente con integración OAuth y gestión de usuarios.",
    "project7.title": "Portfolio Personal",
    "project7.description":
      "Sitio web de portfolio interactivo construido con Next.js, React, Tailwind CSS y Framer Motion, con soporte multilingüe.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

