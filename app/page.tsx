"use client"

import type React from "react"
import { useState, useRef, Suspense, useEffect } from "react"
import dynamic from 'next/dynamic'
import { Environment, PerspectiveCamera, OrbitControls, Text3D, Float } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Twitter, Instagram, Code, Cpu, Database, Server, HardDrive } from "lucide-react"


const Scene3D = dynamic(() => import('./components/Scene3D').then(mod => mod.Scene3D), {
  ssr: false
})

export default function GTALaunchingScreen() {
  const [currentPanel, setCurrentPanel] = useState(0)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [showLoadingText, setShowLoadingText] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [currentCodeSnippet, setCurrentCodeSnippet] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [currentChar, setCurrentChar] = useState(0)

  // Tech code snippets
  const codeSnippets = [
    `function initTechSystem() {
  const data = fetchTechData();
  return new TechPlatform(data);
}`,
    `class AI {
  constructor() {
    this.neural = new NeuralNetwork();
    this.learning = true;
  }
  
  process(input) {
    return this.neural.compute(input);
  }
}`,
    `async function loadDatabase() {
  const connection = await createConnection();
  const schema = await connection.getSchema();
  return new DatabaseClient(connection);
}`,
    `const encryptData = (data, key) => {
  const algorithm = 'AES-256-GCM';
  const iv = crypto.randomBytes(16);
  return crypto.encrypt(data, key, iv);
};`,
  ]

  // GTA-style panels that will transition
  const panels = [
    {
      color: "#001a33", // Dark blue tech color
      position: "object-center",
    },
    {
      color: "#002233", // Dark teal tech color
      position: "object-center",
    },
    {
      color: "#001a1a", // Dark cyan tech color
      position: "object-center",
    },
    {
      color: "#000d1a", // Dark navy tech color
      position: "object-center",
    },
  ]

  // Panel transition effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPanel((prev) => (prev + 1) % panels.length)
    }, 8000) // Change panel every 8 seconds

    return () => clearInterval(interval)
  }, [panels.length])

  // Loading bar progress effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        // Simulate loading progress
        const newProgress = prev + Math.random() * 2
        return newProgress > 100 ? 100 : newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  // Loading text blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowLoadingText((prev) => !prev)
    }, 800)

    return () => clearInterval(interval)
  }, [])

  // Code snippet rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCodeSnippet((prev) => (prev + 1) % codeSnippets.length)
      setCurrentChar(0)
      setTypedText("")
    }, 8000) // Change code snippet every 8 seconds

    return () => clearInterval(interval)
  }, [codeSnippets.length])

  // Typewriter effect for code snippets
  useEffect(() => {
    if (currentChar < codeSnippets[currentCodeSnippet].length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + codeSnippets[currentCodeSnippet][currentChar])
        setCurrentChar((prev) => prev + 1)
      }, 30) // Typing speed

      return () => clearTimeout(timeout)
    }
  }, [currentChar, currentCodeSnippet, codeSnippets])

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/gta-loading.mp3")
    audioRef.current.volume = 0.5
    audioRef.current.loop = true

    // Uncomment to enable audio (browsers often block autoplay)
    // audioRef.current.play()

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  // Tech loading tips
  const techTips = [
    "Optimizing neural network parameters...",
    "Compiling quantum algorithms...",
    "Synchronizing distributed databases...",
    "Initializing blockchain validators...",
    "Calibrating AI learning models...",
    "Establishing secure connections...",
    "Loading virtual environment...",
    "Analyzing big data clusters...",
  ]

  const [currentTip, setCurrentTip] = useState(0)

  // Rotate tech tips
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % techTips.length)
    }, 3000) // Change tip every 3 seconds

    return () => clearInterval(interval)
  }, [techTips.length])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background color overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900 to-black z-0"></div>

      {/* Panel transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPanel}
          className="absolute inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div
            className={`w-full h-full bg-cover bg-no-repeat ${panels[currentPanel].position} opacity-40 saturate-150 contrast-125`}
            style={{ backgroundColor: panels[currentPanel].color }}
          ></div>
        </motion.div>
      </AnimatePresence>

      {/* Binary code background */}
      <div className="absolute inset-0 z-15 opacity-10 overflow-hidden binary-rain">
        <div className="h-full w-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-cyan-500 text-xs font-mono whitespace-nowrap"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}px`,
                animation: `fall ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              {Array.from({ length: 20 })
                .map((_, j) => (Math.random() > 0.5 ? "1" : "0"))
                .join("")}
            </div>
          ))}
        </div>
      </div>

      {/* Overlay grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent opacity-20 z-20"></div>

      {/* Content container */}
      <div className="relative z-30 flex flex-col h-full w-full p-6 md:p-12">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl md:text-2xl gta-text-shadow">TECHEIPEDIA</div>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-yellow-400 transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-yellow-400 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-yellow-400 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center items-center">
          {/* GTA-style logo */}
          <div className="mb-8 relative">
            <h1
              className="gta-title text-7xl md:text-9xl font-extrabold tracking-tighter uppercase text-center glitch-text"
              data-text="TECHEIPEDIA"
            >
              <span className="text-white gta-text-shadow">TECHEI</span>
              <span className="text-yellow-400 gta-text-shadow">PEDIA</span>
            </h1>
            <div className="absolute -top-4 right-0 bg-yellow-400 text-black px-2 py-1 text-xs font-bold transform rotate-12 uppercase">
              Beta
            </div>
          </div>

          {/* Subtitle */}
          <div className="relative mb-16">
            <h2
              className="text-3xl md:text-5xl font-bold uppercase text-white gta-text-shadow tracking-wide glitch-subtitle"
              data-text="LAUNCHING SOON UNDEFINED"
            >
              LAUNCHING SOON UNDEFINED
            </h2>
            <div className="absolute -right-4 -bottom-4 w-20 h-1 bg-yellow-400"></div>
            <div className="absolute -left-4 -top-4 w-20 h-1 bg-yellow-400"></div>
          </div>

          {/* Code snippet display */}
          <div className="w-full max-w-xl mb-8 bg-black/70 border border-cyan-500/30 rounded-md overflow-hidden">
            <div className="flex items-center bg-gray-900/80 px-3 py-1 border-b border-cyan-500/30">
              <Code className="h-4 w-4 text-cyan-400 mr-2" />
              <span className="text-xs text-cyan-400 font-mono">system_code.js</span>
            </div>
            <pre className="p-4 text-xs text-cyan-400 font-mono h-32 overflow-hidden">
              <code>
                {typedText}
                <span className="animate-blink">|</span>
              </code>
            </pre>
          </div>

          {/* Loading bar */}
          <div className="w-full max-w-xl mb-4">
            <div className="h-2 w-full bg-gray-800 relative">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 loading-pulse"
                style={{ width: `${loadingProgress}%`, transition: "width 0.2s ease-out" }}
              ></div>
            </div>
          </div>

          {/* Loading text */}
          <div className="flex justify-between w-full max-w-xl text-sm text-gray-400">
            <div className="uppercase font-mono">{showLoadingText && "Loading..."}</div>
            <div className="font-mono">{Math.floor(loadingProgress)}%</div>
          </div>

          {/* Tech tip */}
          <div className="mt-4 text-cyan-400 text-sm font-mono max-w-xl text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTip}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {techTips[currentTip]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tech icons */}
          <div className="absolute bottom-8 left-8 flex space-x-4 opacity-50">
            <Cpu className="h-6 w-6 text-cyan-400 animate-pulse" style={{ animationDelay: "0s" }} />
            <Database className="h-6 w-6 text-cyan-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
            <Server className="h-6 w-6 text-cyan-400 animate-pulse" style={{ animationDelay: "1s" }} />
            <HardDrive className="h-6 w-6 text-cyan-400 animate-pulse" style={{ animationDelay: "1.5s" }} />
          </div>
        </div>
      </div>

      {/* Digital scan effect */}
      <div className="absolute inset-0 pointer-events-none z-40">
        <div className="h-full w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-20 animate-scan"></div>
        </div>
      </div>

      {/* Horizontal scan lines */}
      <div className="absolute inset-0 pointer-events-none z-41 scan-lines"></div>

      {/* Circuit traces */}
      <div className="absolute inset-0 pointer-events-none z-42 circuit-traces"></div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black opacity-70 pointer-events-none z-50"></div>

      {/* 3D Canvas */}
      <Scene3D />

      {/* Digital noise overlay */}
      <div className="absolute inset-0 bg-black opacity-[0.05] mix-blend-overlay pointer-events-none z-40 noise-overlay"></div>

      {/* Glitch overlay */}
      <div className="absolute inset-0 pointer-events-none z-45 glitch-overlay"></div>

      {/* Form */}
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {/* Intentionally left empty */}
      </motion.div>
    </div>
  )
}
