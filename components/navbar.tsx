"use client"

import React, { useState, useEffect, useRef } from "react"
import { Github, Linkedin, Mail, Home, Globe, LayoutGrid, Briefcase, FolderGit2, GraduationCap, Menu } from "lucide-react"
import Link from "next/link"
import ThemeToggle from "./theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const Navbar = () => {
  const { isMobile } = useMobile()
  const [isOpen, setIsOpen] = useState(false)
  const navbarRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const [navItems, setNavItems] = useState([
    { name: "About", href: "#about", icon: Globe },
    { name: "Skills", href: "#skills", icon: LayoutGrid },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Projects", href: "#projects", icon: FolderGit2 },
    { name: "Education", href: "#education", icon: GraduationCap },
    { name: "Contact", href: "#contact", icon: Mail },
    { name: "GitHub", href: "https://github.com/vikas-pydev", icon: Github, external: true },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/vikas-aiml", external: true, icon: Linkedin },
    { name: "Resume", href: "/resume", icon: Briefcase },
  ]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false) // Close mobile menu after clicking a link
    }
  }

  const handleDragEnd = (event: any, info: any, index: number) => {
    const newOrder = [...navItems];
    const draggedItem = newOrder[index];
    newOrder.splice(index, 1);
    
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollRect = scrollContainer.getBoundingClientRect();
    const itemWidth = scrollContainer.scrollWidth / newOrder.length; // Approximate width of each item
    const newIndex = Math.floor((info.point.x - scrollRect.left + scrollContainer.scrollLeft) / itemWidth);

    newOrder.splice(newIndex, 0, draggedItem);
    setNavItems(newOrder);
  };

  return (
    <>
      {isMobile ? (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button
              className="fixed bottom-10 right-10 z-50 p-3 bg-background/80 backdrop-blur-md shadow-lg rounded-full"
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px]">
            <nav className="flex flex-col items-start gap-4 p-4">
              <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Navigation</h2>
                <ThemeToggle />
              </div>
              <Link
                href="#home"
                onClick={(e) => scrollToSection(e, "#home")}
                className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors"
              >
                <Home size={20} />
                Home
              </Link>
              {navItems.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    target={link.external ? "_blank" : "_self"}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        scrollToSection(e, link.href);
                      } else {
                        setIsOpen(false);
                      }
                    }}
                    className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors"
                  >
                    <Icon size={20} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      ) : (
        <nav
          ref={navbarRef}
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
          <TooltipProvider>
            <motion.a
              href="#home"
              onClick={(e) => scrollToSection(e, "#home")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="group relative flex flex-col items-center p-2 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="Home"
            >
              <Home size={20} className="text-foreground group-hover:text-primary" />
              <span className="absolute -top-8 px-2 py-1 bg-foreground text-background text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Home
              </span>
            </motion.a>
            <div ref={scrollRef} className="flex overflow-x-auto thin-scrollbar">
              {navItems.map((link, index) => {
                const Icon = link.icon;
                return (
                  <React.Fragment key={link.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
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
                          drag="x"
                          dragConstraints={scrollRef}
                          dragElastic={0.2}
                          onDragEnd={(event, info) => handleDragEnd(event, info, index)}
                          style={{ cursor: "grab" }}
                        >
                          <Icon size={20} className="text-foreground group-hover:text-primary" />
                        </motion.a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{link.name}</p>
                      </TooltipContent>
                    </Tooltip>
                    {link.name === "Contact" && (
                      <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </TooltipProvider>
        </nav>
      )}
    </>
  );
};

export default Navbar;
