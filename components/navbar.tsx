"use client"

import React from "react"
import { Github, Linkedin, Mail, Home, Globe, LayoutGrid, Briefcase, FolderGit2, GraduationCap } from "lucide-react"
import Link from "next/link"
import ThemeToggle from "./theme-toggle"
import { motion } from "framer-motion"

const Navbar = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navLinks = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: Globe },
    { name: "Skills", href: "#skills", icon: LayoutGrid },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Projects", href: "#projects", icon: FolderGit2 },
    { name: "Education", href: "#education", icon: GraduationCap },
    { name: "Contact", href: "#contact", icon: Mail },
    { name: "GitHub", href: "https://github.com/vikas-pydev", icon: Github, external: true },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/vikas-aiml", icon: Linkedin, external: true },
    { name: "Resume", href: "/resume", icon: Briefcase },
  ];

  return (
    <nav
      className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md shadow-lg rounded-full
        flex justify-around items-center py-2 px-4 md:px-8 w-[90%] md:w-[60%] lg:w-[40%] max-w-screen-md`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="group relative flex flex-col items-center p-2 rounded-full hover:bg-primary/10 transition-colors"
      >
        <ThemeToggle />
        <span className="absolute -top-8 px-2 py-1 bg-foreground text-background text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Theme
        </span>
      </motion.div>
      {navLinks.map((link, index) => {
        const Icon = link.icon;
        return (
          <React.Fragment key={link.name}>
            <motion.a
              href={link.href}
              target={link.external ? "_blank" : "_self"}
              rel={link.external ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                if (link.href.startsWith('#')) {
                  scrollToSection(e, link.href);
                }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="group relative flex flex-col items-center p-2 rounded-full hover:bg-primary/10 transition-colors"
              aria-label={link.name}
            >
              <Icon size={20} className="text-foreground group-hover:text-primary" />
              <span className="absolute -top-8 px-2 py-1 bg-foreground text-background text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {link.name}
              </span>
            </motion.a>
            {link.name === "Contact" && (
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Navbar;
