"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ResumePage() {
  const { theme } = useTheme()

  // Set title
  useEffect(() => {
    document.title = "Vikas Thirumanyam | Resume"
  }, [])

  return (
    <div className="min-h-screen py-12 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft size={16} />
              Back to Portfolio
            </Button>
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="p-8 border-primary/20">
            <header className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Vikas Thirumanyam</h1>
              <p className="text-muted-foreground">
                vikastirumanyam@gmail.com • 6300440576 • Bengaluru, Karnataka, India •{" "}
                <a
                  href="https://www.linkedin.com/in/vikas-aiml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  LinkedIn
                </a>{" "}
                •{" "}
                <a
                  href="https://github.com/vikas-pydev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  GitHub
                </a>
              </p>
            </header>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 border-b pb-2">PROFESSIONAL SUMMARY</h2>
              <p className="text-foreground/90">
                AI/ML Data Scientist with hands-on experience building scalable, real-time fraud detection systems using
                XGBoost, BERT, and explainable AI techniques. Proven track record in developing high-precision models
                (up to 95% fraud detection accuracy), deploying REST APIs, and visualizing fraud trends via interactive
                dashboards. Skilled in translating complex data into actionable insights, with deployments on AWS using
                Docker. Passionate about privacy-compliant AI innovation, large-scale data analysis, and building
                secure, transparent machine learning solutions.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 border-b pb-2">EXPERIENCE</h2>
              <div className="mb-4">
                <div className="flex justify-between items-start flex-wrap">
                  <h3 className="text-lg font-medium">Artificial Intelligence Intern</h3>
                  <span className="text-muted-foreground text-sm">Sep 2024 – Oct 2024</span>
                </div>
                <p className="text-primary mb-2">Btech Walleh in association with Teachnook | Remote</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Achieved 90%+ accuracy in sentiment classification using DistilBERT, deployed via Flask API.</li>
                  <li>
                    Reduced manual feedback analysis time by 40% through automated sentiment chatbot implementation.
                  </li>
                  <li>
                    Improved customer sentiment understanding by 85% by providing instant analysis using the developed
                    chatbot.
                  </li>
                  <li>Decreased API latency by 15% through optimized DistilBERT model deployment in Flask.</li>
                </ul>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 border-b pb-2">PROJECTS</h2>

              <div className="mb-4">
                <h3 className="text-lg font-medium">Ad Click Fraud Detection using Machine Learning</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Engineered an XGBoost model that identified click fraud with 92.5% F1-score, using SHAP for
                    interpretable ML insights.
                  </li>
                  <li>Applied advanced feature engineering and SMOTE for class balancing across 100k+ records.</li>
                  <li>
                    Integrated real-time visual dashboards to monitor fraud trends, improving analyst decision speed by
                    ~40%.
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium">BERT-Powered LLM for Comment & Metadata Flagging</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Fine-tuned a BERT-based model to detect fraudulent ad comments and metadata with 89% classification
                    accuracy.
                  </li>
                  <li>Deployed a Flask-based REST API for real-time fraud probability scoring and label prediction.</li>
                  <li>
                    Incorporated explainable AI (SHAP) for transparent model interpretation, enabling regulatory audit
                    compliance.
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium">Ad Fraud Trend Dashboard & Visualization Tool</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Designed and deployed a Streamlit-powered dashboard visualizing fraud trends across geo, device, and
                    publisher segments.
                  </li>
                  <li>
                    Leveraged Matplotlib, Plotly, and Pandas for interactive insights from 250k+ ad event records.
                  </li>
                  <li>
                    Containerized using Docker and deployed on AWS EC2, ensuring scalable, secure, and low-latency
                    access.
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 border-b pb-2">CERTIFICATIONS</h2>
              <ul className="space-y-2">
                <li>
                  <span className="font-medium">Certification in Master Course in Full Stack Development</span>
                  <p className="text-muted-foreground">Great Learning</p>
                </li>
                <li>
                  <span className="font-medium">AWS for Beginners</span>
                  <p className="text-muted-foreground">Great Learning</p>
                </li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 border-b pb-2">SKILLS</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="bg-primary/10 px-3 py-1 rounded-md text-center">AI</div>
                <div className="bg-primary/10 px-3 py-1 rounded-md text-center">Machine Learning</div>
                <div className="bg-primary/10 px-3 py-1 rounded-md text-center">Deep Learning</div>
                <div className="bg-primary/10 px-3 py-1 rounded-md text-center">Reinforcement Learning</div>
                <div className="bg-primary/10 px-3 py-1 rounded-md text-center">Data Science</div>
                <div className="bg-primary/10 px-3 py-1 rounded-md text-center">Python</div>
                <div className="bg-primary/10 px-3 py-1 rounded-md text-center">HTML</div>
                <div className="bg-primary/10 px-3 py-1 rounded-md text-center">AI/ML Algorithms</div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 border-b pb-2">EDUCATION</h2>
              <div className="mb-4">
                <div className="flex justify-between items-start flex-wrap">
                  <h3 className="text-lg font-medium">Presidency University, Bengaluru</h3>
                  <span className="text-muted-foreground text-sm">Aug 2023 – present</span>
                </div>
                <p className="text-primary">Master of Computer Applications - (MCA) in Computer Applications</p>
              </div>

              <div>
                <div className="flex justify-between items-start flex-wrap">
                  <h3 className="text-lg font-medium">Sri Venkateswara University, Tirupati</h3>
                  <span className="text-muted-foreground text-sm">Aug 2018 – May 2021</span>
                </div>
                <p className="text-primary">Bachelor of Commerce - (BCom) in Computer Applications</p>
              </div>
            </section>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
