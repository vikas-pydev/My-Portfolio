"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Palette, Minimize, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils" // Ensure cn is imported if used

// Define themes array for consistency
const themes = [
  { theme: "normal", label: "Light", icon: Sun }, // Shortened label for display
  { theme: "dark", label: "Dark", icon: Moon },
  { theme: "flamingo", label: "Flamingo", icon: Palette },
  { theme: "minimal", label: "Minimal", icon: Minimize }
];

const ThemeToggle = () => {
  const { theme = 'normal', setTheme } = useTheme() // Default theme
  const [mounted, setMounted] = useState(false)
  const [isChanging, setIsChanging] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const lastClickTime = useRef(0)
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const longPressTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isLongPress = useRef(false)

  useEffect(() => {
    setMounted(true)
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        dropdownRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current);
      }
    }
  }, [theme])

  // --- Handlers (handleClick, handleTouchStart, handleTouchEnd, handleThemeChange) ---
  // Use the existing handlers, but ensure handleClick cycles through the 'themes' array
  const handleClick = () => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickTime.current;

    if (timeDiff < 300) { // Double click threshold
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
      }
      lastClickTime.current = 0; // Reset last click time
      setShowDropdown(prev => !prev); // Toggle dropdown on double click
      isLongPress.current = false; // Ensure long press flag is reset
      if (longPressTimeoutRef.current) {
          clearTimeout(longPressTimeoutRef.current);
          longPressTimeoutRef.current = null;
      }
    } else {
      // Single click logic (or start of potential double click)
      lastClickTime.current = currentTime;
      clickTimeoutRef.current = setTimeout(() => {
        // If timeout completes, it's a single click
        if (!isLongPress.current) { // Only cycle theme if not a long press
            const currentIndex = themes.findIndex(t => t.theme === theme);
            const nextIndex = (currentIndex + 1) % themes.length;
            handleThemeChange(themes[nextIndex].theme); // Use handleThemeChange for consistency
        }
        clickTimeoutRef.current = null;
      }, 300); // Wait 300ms for a potential second click
    }
  };

  const handleTouchStart = () => {
    isLongPress.current = false; // Reset long press flag
    if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current);
    }
    longPressTimeoutRef.current = setTimeout(() => {
        isLongPress.current = true;
        setShowDropdown(true); // Show dropdown on long press
    }, 500); // Long press threshold (500ms) - Adjusted from 800ms
  };

  const handleTouchEnd = () => {
    if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current);
        longPressTimeoutRef.current = null;
    }
    // Prevent theme cycling if it was a long press that opened the dropdown
    if (isLongPress.current) {
        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
            clickTimeoutRef.current = null;
        }
        lastClickTime.current = 0; // Reset click time to prevent accidental double click detection
    } else {
        // If it wasn't a long press, let the handleClick logic handle single/double tap
        // No need to call handleClick() directly here as it's handled by the click event itself
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setIsChanging(true)
    setTimeout(() => {
      setTheme(newTheme)
      // documentElement update is handled by next-themes and useEffect
      setShowDropdown(false)
      setTimeout(() => setIsChanging(false), 300)
    }, 150) // Short delay for visual feedback
  }
  // --- End Handlers ---


  // Remove the old getThemeIcon function as it's no longer needed
  // const getThemeIcon = () => { ... } // REMOVED

  // Add this function to handle ripple effect (if needed, keep as is)
  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rippleContainer = button.querySelector('.ripple-effect') as HTMLElement;
    
    if (rippleContainer) {
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;
      
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - radius;
      const y = event.clientY - rect.top - radius;
      
      rippleContainer.style.width = rippleContainer.style.height = `${diameter}px`;
      rippleContainer.style.left = `${x}px`;
      rippleContainer.style.top = `${y}px`;
      rippleContainer.classList.remove('ripple-effect');
      void rippleContainer.offsetWidth; // Force reflow
      rippleContainer.classList.add('ripple-effect');
    }
  };

  if (!mounted) {
    // Render a placeholder or null to avoid hydration mismatch
    return <div className="flex items-center"><div className="w-[88px] h-8 mr-2"></div><div className="w-8 h-8"></div></div>; // Placeholder matching layout
  }

  const currentThemeDetails = themes.find(t => t.theme === theme) || themes[0];
  const CurrentIcon = currentThemeDetails.icon;

  return (
    <div className="relative">
      {/* Futuristic glassmorphism overlay and other effects */}
      <AnimatePresence>
        {isChanging && (
          <>
            {/* Futuristic glassmorphism overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-40 pointer-events-none backdrop-blur-sm"
              style={{ 
                background: `rgba(var(--background-rgb), 0.4)`,
              }}
            />
            
            {/* Animated gradient flow */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.7, scale: 20 }}
              exit={{ opacity: 0, scale: 30 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.19, 1, 0.22, 1],
              }}
              className="fixed inset-0 z-0 pointer-events-none"
              style={{ 
                background: `radial-gradient(circle, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--secondary-rgb), 0.05) 50%, transparent 80%)`,
                transformOrigin: "center",
                filter: "blur(20px)"
              }}
            />
            
            {/* Neon edge highlight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: [0, 0.8, 0], scale: [0.9, 1, 1.1] }}
              transition={{ 
                duration: 0.8, 
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full z-0 pointer-events-none"
              style={{ 
                border: "1.5px solid rgba(var(--primary-rgb), 0.6)",
                boxShadow: "0 0 15px rgba(var(--primary-rgb), 0.5), inset 0 0 10px rgba(var(--primary-rgb), 0.3)",
                boxSizing: "border-box"
              }}
            />
            
            {/* Soft blur pulse effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.3, 0],
                scale: [0.8, 1.2, 1.5]
              }}
              transition={{ 
                duration: 1.5,
                ease: "easeOut",
                times: [0, 0.4, 1]
              }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full z-0 pointer-events-none"
              style={{ 
                background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.2) 0%, transparent 70%)",
                filter: "blur(15px)"
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Main container for display + button */}
      <div className="flex items-center">

        {/* Combined Theme Display (Icon + Name) */}
        <div className="flex items-center rounded-full px-3 py-1 bg-background/80 shadow-sm select-none border border-border/50 h-8"> {/* Fixed height */}
          {/* Removed Icon container */}
          {/* Theme label */}
          <AnimatePresence mode="wait">
            <motion.span
              key={theme} // Animate when theme changes
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-medium text-foreground whitespace-nowrap" // Use text-sm and ensure no wrapping
            >
              {currentThemeDetails.label}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Separate Toggle Button */}
        <Button
          ref={buttonRef}
          variant="ghost"
          size="icon"
          onClick={handleClick} // Use updated handler
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="ml-2 hover:bg-secondary/20 transition-all duration-300 relative z-10 overflow-hidden rounded-full backdrop-blur-[2px] border border-border/50 w-8 h-8" // Fixed size
          style={{
            background: "rgba(var(--card-rgb), 0.2)",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.03)"
          }}
          aria-label="Toggle theme"
        >
          {/* Hover glow effect (keep if desired) */}
          <motion.div
            className="absolute inset-0 opacity-0 hover:opacity-15 transition-opacity duration-300 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.3) 0%, transparent 70%)",
              filter: "blur(6px)"
            }}
          />

          {/* Animated Icon inside button */}
          <motion.div
            key={theme + "-btn"} // Ensure key is unique even if icon is same
            initial={{ rotate: -10, opacity: 0, scale: 0.9 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex items-center justify-center w-full h-full"
          >
            <CurrentIcon className="h-4 w-4" /> {/* Consistent icon size */}
          </motion.div>
        </Button>

        {/* Removed the separate theme name display div */}
        {/* <AnimatePresence mode="wait"> ... </AnimatePresence> */}

      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 5, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 bottom-full mb-2 backdrop-blur-[5px] rounded-lg p-1.5 z-50 min-w-[170px] border border-border/60" // Adjusted styles
            style={{
              background: "rgba(var(--card-rgb), 0.7)",
              boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.1), 0 6px 10px -6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Use the full labels in the dropdown */}
            {[
              { theme: "normal", label: "Light Mode", icon: Sun },
              { theme: "dark", label: "Dark Mode", icon: Moon },
              { theme: "flamingo", label: "Flamingo", icon: Palette },
              { theme: "minimal", label: "Minimal", icon: Minimize }
            ].map(({ theme: themeOption, label, icon: Icon }) => (
              <motion.button
                key={themeOption}
                onClick={() => handleThemeChange(themeOption)}
                whileHover={{
                  x: 1,
                  backgroundColor: "rgba(var(--primary-rgb), 0.08)",
                  transition: { duration: 0.15 }
                }}
                className={cn(
                  "flex items-center w-full text-left px-2.5 py-1.5 rounded-md mb-0.5 transition-colors duration-150 text-sm",
                  theme === themeOption
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground hover:text-primary"
                )}
              >
                {/* Icon container */}
                <span className="flex items-center justify-center w-5 h-5 mr-2 flex-shrink-0">
                  <Icon className="h-4 w-4" />
                </span>
                {/* Theme label */}
                <span className="flex-grow">{label}</span>
                {/* Active indicator */}
                {theme === themeOption && (
                  <motion.div
                    layoutId="activeThemeIndicator" // Unique layoutId
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                    style={{
                      boxShadow: "0 0 5px rgba(var(--primary-rgb), 0.7)"
                    }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeToggle
