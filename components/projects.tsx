"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Layers, QrCode, BarChart, Shield, Code2, ExternalLink, TrendingUp, BotMessageSquare } from "lucide-react" // Added Shield, TrendingUp, BotMessageSquare
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils" // Ensure cn is imported

// --- Data Definitions (Placeholders - Replace with your actual data) ---

const FILTERS = ["All", "AI & ML", "Web Dev", "Data Visualization", "NLP"]

// Example Project Structure - Ensure your actual PROJECTS array follows this structure
const PROJECTS = [
  {
    title: "QR Code Attendance System",
    description: "A dynamic QR code-based attendance tracking system for educational institutions",
    icon: <QrCode className="h-8 w-8 text-primary" />,
    tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    category: "Web Dev",
    details: {
      overview: "Developed a QR code attendance system using PHP and MySQL. Features include real-time tracking, report generation, and user management.",
      features: ["Real-time attendance tracking", "QR code generation & scanning", "Admin dashboard", "Report export"],
      achievements: ["Reduced manual attendance time by 90%", "Successfully deployed in 3 departments"],
      code: "https://github.com/vikas-pydev/qr-code-attendance", // Replace with actual link
      demo: "#", // Replace with actual link or remove if none
    },
  },
  {
    title: "Multiple Responsive Web Pages",
    description: "Collection of responsive web pages designed for optimal viewing across devices",
    icon: <Layers className="h-8 w-8 text-primary" />,
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "Responsive Design"],
    category: "Web Dev",
    details: {
      overview: "Designed and developed 5 responsive web pages using HTML, CSS, Bootstrap, and JavaScript, ensuring seamless viewing across various devices.",
      features: ["Fully responsive layouts", "Cross-browser compatibility", "Modern UI/UX principles", "Performance optimized"],
      achievements: ["Achieved perfect scores on Google PageSpeed Insights for mobile and desktop", "Used semantic HTML5 and modern CSS3"],
      code: "https://github.com/vikas-pydev/responsive-webpages", // Replace with actual link
      demo: "#", // Replace with actual link
    },
  },
  {
    title: "Sentiment Analysis Chatbot",
    description: "AI-powered chatbot that analyzes and responds based on user sentiment",
    icon: <BotMessageSquare className="h-8 w-8 text-primary" />, // Changed icon
    tags: ["Python", "NLP", "NLTK", "Flask", "DistilBERT"],
    category: "AI & ML",
    details: {
      overview: "Built an AI chatbot using Python, NLTK, and DistilBERT for sentiment analysis. Deployed via a Flask API.",
      features: ["Real-time sentiment classification", "Contextual responses", "Flask API deployment", "NLTK for text processing"],
      achievements: ["Achieved 90%+ accuracy in sentiment classification", "Reduced manual feedback analysis time by 40%"],
      code: "https://github.com/vikas-pydev/sentiment-chatbot", // Replace with actual link
      demo: "#", // Replace with actual link
    },
  },
  {
    title: "Ad Click Fraud Detection",
    description: "Machine learning system to identify fraudulent ad clicks with high accuracy",
    icon: <Shield className="h-8 w-8 text-primary" />,
    tags: ["Python", "XGBoost", "SHAP", "Scikit-learn", "Pandas"],
    category: "AI & ML",
    details: {
      overview: "Developed a high-accuracy machine learning model using XGBoost to detect fraudulent ad clicks. Integrated SHAP for model explainability.",
      features: ["Real-time fraud detection", "XGBoost model training", "SHAP value interpretation", "Feature engineering"],
      achievements: ["Achieved 95% fraud detection accuracy", "Provided actionable insights into fraud patterns"],
      code: "https://github.com/vikas-pydev/ad-fraud-detection", // Replace with actual link
      demo: "#", // Replace with actual link
    },
  },
  {
    title: "BERT-Powered LLM for Comment Flagging",
    description: "Fine-tuned BERT model to detect fraudulent ad comments and metadata",
    icon: <BarChart className="h-8 w-8 text-primary" />, // Reused icon, consider a more specific one
    tags: ["Python", "BERT", "Flask", "Hugging Face", "NLP"],
    category: "NLP",
    details: {
      overview: "Fine-tuned a BERT model for flagging fraudulent comments using Hugging Face Transformers. Deployed the model via a Flask REST API.",
      features: ["Comment content analysis", "Metadata analysis", "BERT fine-tuning", "REST API deployment"],
      achievements: ["Improved fraud detection recall by 25%", "Enabled automated moderation workflow"],
      code: "https://github.com/vikas-pydev/comment-flagging-bert", // Replace with actual link
      demo: "#", // Replace with actual link
    },
  },
  {
    title: "Ad Fraud Trend Dashboard",
    description: "Interactive visualization tool for monitoring fraud trends across segments",
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    tags: ["Streamlit", "Matplotlib", "Plotly", "Pandas", "Data Visualization"],
    category: "Data Visualization",
    details: {
      overview: "Created an interactive dashboard using Streamlit, Matplotlib, and Plotly to visualize ad fraud trends and patterns.",
      features: ["Interactive charts and graphs", "Data filtering by segment", "Trend analysis", "User-friendly interface"],
      achievements: ["Provided clear visualization of fraud hotspots", "Facilitated data-driven decision-making for fraud prevention"],
      code: "https://github.com/vikas-pydev/fraud-dashboard", // Replace with actual link
      demo: "#", // Replace with actual link
    },
  },
  // Add more projects following the same structure
]

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
}

const loadingCardVariants = {
  initial: { opacity: 0.5, scale: 0.98 },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    scale: [0.98, 1.01, 0.98],
    transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
  },
}

// --- Component ---

export default function Projects() {
  const ref = useRef(null)
  const [activeFilter, setActiveFilter] = useState("All")
  const [loading, setLoading] = useState(false)
  const [filteredProjects, setFilteredProjects] = useState(PROJECTS)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [tab, setTab] = useState("overview")

  // Effect for filtering projects with loading state
  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      setFilteredProjects(
        activeFilter === "All"
          ? PROJECTS
          : PROJECTS.filter((project) => project.category === activeFilter)
      )
      setLoading(false)
    }, 400) // Simulate loading time
    return () => clearTimeout(timeout)
  }, [activeFilter])

  // Modal open handler
  const openModal = (project: any) => {
    setSelectedProject(project)
    setTab("overview") // Reset to overview tab when opening
    setModalOpen(true)
  }

  // Modal close handler
  const closeModal = () => {
    setModalOpen(false)
    // Delay clearing selected project for exit animation
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <section id="projects" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // Trigger animation when 10% is visible
          variants={containerVariants}
          className="flex flex-col items-center"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Showcasing my work in AI, ML, Web Development, and Data Visualization
            </p>
          </motion.div>

          {/* Filter Bar */}
          <motion.div variants={itemVariants} className="flex justify-center mb-10 w-full overflow-x-auto pb-2">
            <div className="inline-flex bg-secondary/50 rounded-lg p-1 shadow-sm space-x-1">
              {FILTERS.map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    `px-4 py-2 sm:px-6 rounded-md text-sm sm:text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-200 ease-in-out`,
                    activeFilter === filter
                      ? "bg-background text-foreground shadow-md scale-105"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  )}
                  whileTap={{ scale: 0.97 }}
                  aria-pressed={activeFilter === filter}
                  tabIndex={0}
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout // Animate layout changes during filtering
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
          >
            <AnimatePresence mode="wait">
              {loading
                ? // Loading Skeletons
                  Array(3)
                    .fill(0)
                    .map((_, idx) => (
                      <motion.div
                        key={`loading-${idx}`}
                        variants={loadingCardVariants}
                        initial="initial"
                        animate="animate"
                        exit={{ opacity: 0 }}
                        className="h-72 bg-muted rounded-xl shadow-sm" // Adjusted height
                      />
                    ))
                : // Filtered Project Cards
                  filteredProjects.map((project) => (
                    <motion.div
                      key={project.title}
                      layout // Animate position changes
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover={{ scale: 1.03, y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="flex flex-col h-full" // Ensure cards take full height
                    >
                      <Card className="border-primary/10 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-lg h-full flex flex-col overflow-hidden rounded-xl">
                        <CardContent className="p-6 flex flex-col flex-grow h-full">
                          <div className="mb-4 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                              {project.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-auto pt-4 mb-5">
                            {project.tags.slice(0, 3).map((tag) => ( // Show first 3 tags
                              <span
                                key={tag}
                                className="px-2.5 py-0.5 bg-secondary text-xs rounded-full text-muted-foreground font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                               <span className="px-2.5 py-0.5 bg-secondary text-xs rounded-full text-muted-foreground font-medium">
                                +{project.tags.length - 3} more
                              </span>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            className="w-full mt-auto flex items-center justify-center gap-2 transition-all hover:bg-primary/5 focus:scale-[1.02]"
                            onClick={() => openModal(project)}
                            tabIndex={0}
                            aria-label={`View details for ${project.title}`}
                          >
                            View Details
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal for Project Details */}
      <Dialog open={modalOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-3xl w-[95%] sm:w-full p-0 overflow-hidden rounded-xl">
          {selectedProject && selectedProject.details && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-background"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                       {selectedProject.icon}
                    </div>
                    <DialogTitle className="text-xl font-semibold">{selectedProject.title}</DialogTitle>
                 </div>
                {/* Remove the redundant close button that was here */}
                {/*
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeModal}
                  className="text-muted-foreground hover:bg-secondary rounded-full"
                  aria-label="Close"
                >
                  <X size={20} />
                </Button>
                */}
              </div>

              {/* Optional: Add DialogDescription if applicable */}
              {/* <DialogDescription className="sr-only">Detailed information about the {selectedProject.title} project.</DialogDescription> */}


              {/* Modal Content with Tabs */}
              <Tabs value={tab} onValueChange={setTab} className="px-6 pt-4 pb-6">
                <TabsList className="mb-4 grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TabsContent value="overview" className="mt-2 text-foreground/90 text-sm leading-relaxed">
                      <p>{selectedProject.details.overview}</p>
                       {/* Visualization Example for specific project */}
                       {selectedProject.title === "Multiple Responsive Web Pages" && (
                        <div className="mt-6">
                          <h4 className="font-semibold mb-3 text-base">Visualization</h4>
                          <div className="bg-muted/50 border rounded-lg p-6 flex flex-col items-center">
                            <span className="mb-3 text-sm text-muted-foreground">Responsive Design Preview</span>
                            <div className="flex gap-4 mb-4">
                              <Button variant="outline" size="icon" aria-label="Desktop Preview" className="data-[state=active]:bg-primary/10 data-[state=active]:border-primary">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="14" rx="1"/><path d="M8 21h8"/></svg>
                              </Button>
                              <Button variant="outline" size="icon" aria-label="Tablet Preview" className="data-[state=active]:bg-primary/10 data-[state=active]:border-primary" data-state="active">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="6" y="3" width="12" height="18" rx="1"/><path d="M12 18h.01"/></svg>
                              </Button>
                              <Button variant="outline" size="icon" aria-label="Mobile Preview" className="data-[state=active]:bg-primary/10 data-[state=active]:border-primary">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="1"/><path d="M12 18h.01"/></svg>
                              </Button>
                            </div>
                            <div className="w-full flex justify-center">
                              <div className="bg-primary/10 rounded-md px-6 py-4 text-center text-primary font-medium text-sm">
                                Tablet View Active
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="features" className="mt-2 text-foreground/90 text-sm">
                      <ul className="list-disc pl-5 space-y-1.5">
                        {selectedProject.details.features.map((f: string, index: number) => (
                          <li key={index}>{f}</li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="achievements" className="mt-2 text-foreground/90 text-sm">
                       <ul className="list-disc pl-5 space-y-1.5">
                        {selectedProject.details.achievements.map((a: string, index: number) => (
                          <li key={index}>{a}</li>
                        ))}
                      </ul>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 px-6 pb-5 border-t pt-5">
                {selectedProject.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary text-xs rounded-full text-muted-foreground font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 px-6 pb-6 bg-secondary/30 border-t pt-4">
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 flex items-center gap-2"
                  tabIndex={0}
                  aria-label="View Code on GitHub"
                  disabled={!selectedProject.details.code || selectedProject.details.code === "#"}
                >
                  <a
                    href={selectedProject.details.code}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Code2 className="w-4 h-4" />
                    View Code
                  </a>
                </Button>
                <Button
                  asChild
                  variant="default"
                  className="flex-1 flex items-center gap-2"
                  tabIndex={0}
                  aria-label="View Live Demo"
                  disabled={!selectedProject.details.demo || selectedProject.details.demo === "#"}
                >
                  <a
                    href={selectedProject.details.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

// Helper component for closing modal (X icon) - Ensure this is correctly defined
const X = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
); // Add a semicolon here if needed by your linter/formatter, or ensure it's correctly placed outside the Projects component scope.
