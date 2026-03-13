import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Mail,
  Linkedin,
  Twitter,
  User,
  Briefcase,
  Code,
  Star,
  GraduationCap,
  FolderOpen,
  Calendar,
  MapPin,
  ExternalLink,
  Award,
  Menu,
  X,
  Zap,
  Database,
  Users,
  Rocket,
  Github,
  Globe,
  ChevronRight
} from 'lucide-react';

// Import resume PDF
import resumePDF from '../assets/Shivam_Pandiya_Resume.pdf';

// Import data
import {
  summary,
  experiences,
  projects,
  skills,
  education,
  certifications,
  portfolioItems
} from '../data/resumeData';

// Quick stats for the resume hero
const quickStats = [
  { value: "5+", label: "Years Experience", icon: <Zap className="w-4 h-4" /> },
  { value: "100M+", label: "Transactions", icon: <Database className="w-4 h-4" /> },
  { value: "120+", label: "Engineers Led", icon: <Users className="w-4 h-4" /> },
  { value: "8+", label: "Products Shipped", icon: <Rocket className="w-4 h-4" /> }
];

const ResumePage = () => {
  const [activeSection, setActiveSection] = useState('summary');
  const [skillsAnimated, setSkillsAnimated] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const canvasRef = useRef(null);
  const mobileNavRef = useRef(null);

  // Blockchain background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Blockchain network visualization
    const nodes = [];
    const connections = [];
    const nodeCount = window.innerWidth < 768 ? 15 : 25; // Reduced for performance

    class Node {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#00D4FF';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw hexagon around larger nodes
        if (this.size > 2) {
          ctx.strokeStyle = '#00D4FF';
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = this.x + Math.cos(angle) * (this.size * 3);
            const y = this.y + Math.sin(angle) * (this.size * 3);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.save();
            ctx.globalAlpha = (120 - distance) / 120 * 0.1;
            ctx.strokeStyle = '#00D4FF';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      // Update and draw nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Scroll spy for navigation and header state
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Header scroll state
          const isScrolled = window.scrollY > 50;
          setScrolled(prev => prev !== isScrolled ? isScrolled : prev);
      
      const sections = ['summary', 'experience', 'projects', 'skills', 'certifications', 'education', 'portfolio'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(prev => prev !== section ? section : prev);
            break;
          }
        }
      }
      
      ticking = false;
        });
        ticking = true;
      }
    };

    // Handle outside click for mobile nav
    const handleClickOutside = (event) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target) && mobileNavOpen) {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileNavOpen]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileNavOpen(false);
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Shivam_Pandiya_Resume.pdf';
    link.click();
  };

  const navigationItems = [
    { id: 'summary', icon: <User className="w-4 h-4 md:w-5 md:h-5" />, label: 'Summary' },
    { id: 'experience', icon: <Briefcase className="w-4 h-4 md:w-5 md:h-5" />, label: 'Experience' },
    { id: 'projects', icon: <Code className="w-4 h-4 md:w-5 md:h-5" />, label: 'Projects' },
    { id: 'skills', icon: <Star className="w-4 h-4 md:w-5 md:h-5" />, label: 'Skills' },
    { id: 'certifications', icon: <Award className="w-4 h-4 md:w-5 md:h-5" />, label: 'Certifications' },
    { id: 'education', icon: <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />, label: 'Education' },
    { id: 'portfolio', icon: <FolderOpen className="w-4 h-4 md:w-5 md:h-5" />, label: 'Portfolio' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-background text-foreground relative"
    >
      {/* Blockchain Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.2, willChange: 'auto' }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60]"
        style={{ scaleX: scrollYProgress, transformOrigin: '0%', willChange: 'transform' }}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 will-change-[background-color,backdrop-filter] ${
          scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container-custom px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
          <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </motion.button>
          </Link>

          {/* Desktop Section Nav - appears on scroll */}
          <AnimatePresence>
            {scrolled && (
              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="hidden md:flex items-center gap-1"
              >
                {navigationItems.slice(0, 5).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      activeSection === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadResume}
            className="bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-2 md:px-6 md:py-2 rounded-full flex items-center gap-2 transition-all duration-300 text-sm md:text-base shadow-lg shadow-primary/25"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </motion.button>
        </div>
      </motion.header>

      {/* Resume Hero Section */}
      <section className="pt-20 md:pt-24 pb-8 md:pb-12 px-4 md:px-6 lg:ml-80">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            {/* Name and Title */}
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-4 mb-4"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-bold text-primary-foreground lg:hidden">
                  SP
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                    Shivam Pandiya
                  </h1>
                  <p className="text-lg md:text-xl text-primary font-medium">
                    Senior Web3 Product Manager
                  </p>
                </div>
              </motion.div>
              
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6"
              >
                {quickStats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-card/30 border border-border"
                  >
                    <div className="text-primary">{stat.icon}</div>
                    <div>
                      <div className="text-lg md:text-xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Contact Row - Mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 lg:hidden"
            >
              <a href="mailto:shivampan98@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                <Mail className="w-4 h-4" />
                Email
              </a>
              <a href="https://linkedin.com/in/shivam-sot" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a href="https://x.com/ShivamPandiya3" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                <Twitter className="w-4 h-4" />
                Twitter
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="flex">
        {/* Desktop Sidebar Navigation */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="fixed left-0 top-16 md:top-20 h-full w-80 border-r border-border bg-background/80 backdrop-blur-xl p-6 md:p-8 z-40 hidden lg:block overflow-y-auto"
        >
          {/* Profile Section */}
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-bold text-primary-foreground mx-auto mb-4 shadow-lg shadow-primary/25"
            >
              SP
            </motion.div>
            <h1 className="text-xl md:text-2xl font-bold mb-1">SHIVAM PANDIYA</h1>
            <p className="text-primary font-semibold mb-1">Senior Web3 Product Manager</p>
            <p className="text-xs text-muted-foreground mb-6">Layer-1 • DeFi • DePIN</p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <a href="mailto:shivampan98@gmail.com" className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                <Mail className="w-4 h-4" />
                shivampan98@gmail.com
              </a>
              <a href="https://linkedin.com/in/shivam-sot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                <Linkedin className="w-4 h-4" />
                LinkedIn Profile
              </a>
              <a href="https://x.com/ShivamPandiya3" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                <Twitter className="w-4 h-4" />
                @ShivamPandiya3
              </a>
            </div>
          </div>
          
          <div className="border-t border-border pt-6 mb-6" />

          {/* Navigation */}
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-sm ${activeSection === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-card'
                  }`}
              >
                {item.icon}
                {item.label}
              </motion.button>
            ))}
          </nav>
        </motion.aside>

        {/* Mobile Navigation Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="lg:hidden fixed bottom-6 right-6 bg-primary hover:bg-primary/80 text-primary-foreground p-3 rounded-full shadow-lg z-50 transition-all duration-300"
          aria-label="Toggle navigation menu"
        >
          {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setMobileNavOpen(false)}
            >
              <motion.nav
                ref={mobileNavRef}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed right-0 top-0 h-full w-80 max-w-[80vw] glass-effect p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Mobile Profile Section */}
                <div className="text-center mb-8 pt-20">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-xl font-bold text-primary-foreground mx-auto mb-3">
                    SP
                  </div>
                  <h1 className="text-lg font-bold mb-1">SHIVAM PANDIYA</h1>
                  <p className="text-primary font-semibold text-sm mb-1">Senior Web3 Product Manager</p>
                  <p className="text-xs text-muted-foreground mb-4">Layer-1 • DeFi • DePIN</p>

                  {/* Mobile Contact Info */}
                  <div className="space-y-2 text-xs">

                    <a href="mailto:shivampan98@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="w-3 h-3" />
                      shivampan98@gmail.com
                    </a>
                    <a href="https://linkedin.com/in/shivam-sot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="w-3 h-3" />
                      LinkedIn Profile
                    </a>
                    <a href="https://x.com/ShivamPandiya3" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Twitter className="w-3 h-3" />
                      @ShivamPandiya3
                    </a>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-sm ${activeSection === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-card'
                        }`}
                    >
                      {item.icon}
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Main Content */}
        <main className="flex-1 lg:ml-80 relative z-10">
          <div className="container-custom px-4 md:px-6 py-6 md:py-8">

            {/* Summary Section */}
            <motion.section
              id="summary"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mb-12 md:mb-16 lg:mb-20"
            >
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card/30 p-6 md:p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                <div className="relative">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <User className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    Professional Summary
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                    {summary}
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Experience Section */}
            <motion.section
              id="experience"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mb-12 md:mb-16 lg:mb-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                Experience
              </h2>

              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-card/30 p-6 md:p-8 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="relative">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 md:mb-6">
                        <div className="mb-3 lg:mb-0">
                          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1">{exp.position}</h3>
                          <h4 className="text-lg md:text-xl font-medium text-primary">{exp.company}</h4>
                        </div>
                        <div className="flex flex-col lg:items-end gap-1 text-sm">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            <Calendar className="w-3 h-3" />
                            {exp.duration}
                          </span>
                          <span className="inline-flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm md:text-base leading-relaxed">{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Projects Section */}
            <motion.section
              id="projects"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mb-12 md:mb-16 lg:mb-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Code className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                Projects
              </h2>

              <div className="grid lg:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-card/30 p-6 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="relative">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
                      {project.link !== "#" && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                      )}
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm md:text-base">
                      {project.description}
                    </p>

                    <div className="flex flex-col gap-2">
                      {project.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-xs md:text-sm text-muted-foreground leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Skills Section */}
            <motion.section
              id="skills"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              onViewportEnter={() => setSkillsAnimated(true)}
              className="mb-12 md:mb-16 lg:mb-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Star className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                Skills
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {skills.map((skillGroup, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="rounded-2xl border border-border bg-card/30 p-6"
                  >
                    <h3 className="text-lg md:text-xl font-semibold mb-4 text-foreground">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {skillGroup.items.map((skill, i) => (
                        <motion.span
                          key={i}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={skillsAnimated ? { scale: 1, opacity: 1 } : {}}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          className="px-2 py-1 md:px-3 md:py-2 bg-card border border-border rounded-lg text-xs md:text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Certifications Section */}
            <motion.section
              id="certifications"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mb-12 md:mb-16 lg:mb-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Award className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                Certifications & Courses
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group rounded-2xl border border-border bg-card/30 p-6 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1">{cert.name}</h3>
                        <p className="text-primary text-sm">{cert.issuer}</p>
                      </div>
                    </div>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {cert.tag}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Education Section */}
            <motion.section
              id="education"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mb-12 md:mb-16 lg:mb-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                Education
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="rounded-2xl border border-border bg-card/30 p-6"
                  >
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">{edu.degree}</h3>
                    <p className="text-primary text-sm mb-2">{edu.institution}</p>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <span>{edu.year}</span>
                      <span>•</span>
                      <span>{edu.location}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Portfolio Section */}
            <motion.section
              id="portfolio"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mb-12 md:mb-16 lg:mb-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FolderOpen className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                Portfolio Highlights
              </h2>

              <div className="space-y-6">
                {portfolioItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-card/30 p-6 md:p-8 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="relative">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2 md:mb-0">{item.title}</h3>
                        {item.link !== "#" && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors self-start"
                          >
                            <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                          </a>
                        )}
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed text-sm md:text-base">
                        {item.description}
                      </p>

                      {item.techStack && (
                        <div className="flex flex-wrap gap-2">
                          {item.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Resume Footer CTA */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 mb-8"
            >
              <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card/50 to-secondary/10 p-8 md:p-12 text-center">
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Interested in working together?
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    I'm always open to discussing product management opportunities, blockchain projects, or partnerships.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="mailto:shivampan98@gmail.com">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-medium flex items-center gap-2 justify-center shadow-lg shadow-primary/25"
                      >
                        <Mail className="w-4 h-4" />
                        Get In Touch
                      </motion.button>
                    </a>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={downloadResume}
                      className="border border-border hover:border-primary/50 text-foreground px-8 py-3 rounded-full font-medium flex items-center gap-2 justify-center hover:bg-card/50 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Download Resume
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default ResumePage;
