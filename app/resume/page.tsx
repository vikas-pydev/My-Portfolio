"use client"

import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function ResumePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const cardRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Vikas Thirumanyam | Resume";
  }, []);

  const handleOutsideClick = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      router.push("/");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [router]);

  return (
    <div className="min-h-screen py-12 px-4 bg-background text-foreground">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card ref={cardRef} className="p-8 border-primary/20 shadow-lg">
            <header className="mb-8 text-center">
              <h1 className="text-4xl font-bold mb-2">VIKAS THIRUMANYAM</h1>
              <p className="text-muted-foreground text-lg">
                Bengaluru, Karnataka | vikastirumanyam@gmail.com | +91 6300440576
              </p>
              <p className="text-primary text-lg mt-1">
                <a
                  href="https://www.linkedin.com/in/vikas-aiml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  LinkedIn
                </a>{" "}
                |{" "}
                <a
                  href="https://github.com/vikas-pydev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  GitHub
                </a>{" "}
                |{" "}
                <a href="/" className="hover:underline">
                  Portfolio
                </a>
              </p>
            </header>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3 border-b pb-2">SUMMARY</h2>
              <p className="text-foreground/90 leading-relaxed">
                Innovative Software Engineer with hands-on experience in AI/ML, distributed backend systems, and scalable API
                design. Skilled in Python, Flask, JavaScript, and cloud-native technologies (Docker, Google Cloud) with a deep
                passion for building impactful, data-driven solutions. Brings a blend of algorithmic thinking, full-stack versatility,
                and practical engineering to solve complex problems at scale — aligned with Google’s mission to organize and
                enhance access to information.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3 border-b pb-2">CORE TECHNICAL SKILLS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground/90">
                <div>
                  <h3 className="font-medium mb-1">Languages:</h3>
                  <p>Python, R, HTML/CSS, JavaScript</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Frameworks:</h3>
                  <p>Flask, TensorFlow, PyTorch, Hugging Face</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Databases:</h3>
                  <p>MySQL, Cassandra, Firebase</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Cloud:</h3>
                  <p>Google Cloud, Docker, Render, Vercel</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-medium mb-1">Concepts:</h3>
                  <p>REST APIs, Distributed Computing, NLP, System Design, Debugging</p>
                </div>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3 border-b pb-2">EXPERIENCE</h2>
              <div className="mb-4">
                <h3 className="text-xl font-medium">Artificial Intelligence Intern</h3>
                <p className="text-primary">IBM SkillsBuild – Edunet Foundation | Remote | Jun 2025 – Jul 2025</p>
                <ul className="list-disc pl-5 text-foreground/90 leading-relaxed">
                  <li>Built end-to-end ML pipeline for employee salary prediction achieving 94% accuracy.</li>
                  <li>Deployed model as real-time Flask API and integrated UI for instant insights.</li>
                  <li>Collaborated remotely ensuring quality deliverables.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium">Artificial Intelligence Intern</h3>
                <p className="text-primary">BTech Walleh (Teachnook) | Remote | Sep 2024 – Oct 2024</p>
                <ul className="list-disc pl-5 text-foreground/90 leading-relaxed">
                  <li>Developed Sentiment Analysis Chatbot using DistilBERT achieving 90%+ accuracy.</li>
                  <li>Optimized inference reducing API latency by 15%.</li>
                  <li>Built frontend on Vercel improving accessibility and UX.</li>
                </ul>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3 border-b pb-2">PROJECTS</h2>
              <div className="mb-4">
                <h3 className="text-xl font-medium">PredictWise – AI-Powered Stock Market Analysis Platform</h3>
                <ul className="list-disc pl-5 text-foreground/90 leading-relaxed">
                  <li>Flask + Cassandra backend (Dockerized) handling real-time data.</li>
                  <li>Integrated ML forecasting, trade signal generation, and structured logging.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium">Parrot – Real-Time Sentiment Analysis Chatbot</h3>
                <ul className="list-disc pl-5 text-foreground/90 leading-relaxed">
                  <li>Flask backend with DistilBERT via REST API, 90%+ accuracy.</li>
                  <li>Deployed backend on Render, frontend on Vercel.</li>
                </ul>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3 border-b pb-2">CERTIFICATIONS</h2>
              <ul className="list-disc pl-5 text-foreground/90 leading-relaxed">
                <li>Build Real World AI Applications with Gemini & Imagen – Google Cloud</li>
                <li>Prompt Design in Vertex AI – Google Cloud</li>
                <li>Artificial Intelligence Fundamentals – IBM SkillsBuild</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3 border-b pb-2">EDUCATION</h2>
              <ul className="list-disc pl-5 text-foreground/90 leading-relaxed">
                <li>MCA – Presidency University, Bengaluru (2023–2025)</li>
                <li>BCom (Computer Applications) – Sri Venkateswara University, Tirupati (2018–2021)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 border-b pb-2">HIGHLIGHTED ACHIEVEMENTS</h2>
              <ul className="list-disc pl-5 text-foreground/90 leading-relaxed">
                <li>Delivered 5+ end-to-end AI/ML projects with 95%+ uptime and production-grade APIs.</li>
                <li>Recognized for clean, modular, and documented code (PEP8).</li>
                <li>Strong interest in distributed systems, NLP, and accessibility.</li>
              </ul>
            </section>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}