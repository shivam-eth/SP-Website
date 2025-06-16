import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronUp, 
  Mountain, 
  Bike, 
  Trophy, 
  Zap,
  Target,
  Code,
  Briefcase,
  Heart,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Import images
import heroImage from '../assets/photo_2025-06-0718.12.09.jpeg';
import cyclingImage from '../assets/photo_2025-06-0718.12.07.jpeg';
import trekkingImage from '../assets/photo_2025-06-0718.12.04.jpeg';
import runningImage from '../assets/photo_2025-06-0718.12.06.jpeg';
import footballImage from '../assets/photo_2025-06-0718.12.03.jpeg';
import gallery1 from '../assets/photo_2025-06-0718.12.01.jpeg';
import gallery2 from '../assets/photo_2025-06-0718.11.59.jpeg';
import gallery3 from '../assets/photo_2025-06-0718.11.58.jpeg';
import gallery4 from '../assets/photo_2025-06-0718.11.56.jpeg';
import gallery5 from '../assets/photo_2025-06-0718.11.54.jpeg';
import gallery6 from '../assets/photo_2025-06-0718.11.49.jpeg';

// Import components
import BlockchainBackground from '../components/BlockchainBackground';

const HomePage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const mobileMenuRef = useRef(null);

  const heroTexts = [
    "Product Manager",
    "Blockchain Pioneer", 
    "Adventure Seeker",
    "Web3 Innovation Leader"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 3000);

    // Handle outside click for mobile menu
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      clearInterval(textInterval);
    };
  }, [mobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const galleryImages = [
    { src: gallery1, alt: 'Mountain Adventure', category: 'trekking' },
    { src: gallery2, alt: 'Cycling Journey', category: 'cycling' },
    { src: gallery3, alt: 'Running Challenge', category: 'running' },
    { src: gallery4, alt: 'Team Sports', category: 'football' },
    { src: gallery5, alt: 'Outdoor Exploration', category: 'adventure' },
    { src: gallery6, alt: 'Peak Achievement', category: 'trekking' },
  ];

  const activities = [
    {
      icon: <Bike className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Cycling Adventures",
      description: "Exploring scenic routes and mountain trails on two wheels, pushing boundaries with every pedal stroke.",
      image: cyclingImage,
      stat: "50km+",
      statLabel: "monthly distance",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Mountain className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Trekking & Hiking", 
      description: "Conquering peaks and discovering hidden trails, finding inspiration in nature's grandest challenges.",
      image: trekkingImage,
      stat: "15+",
      statLabel: "peaks climbed",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Trophy className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Marathon Running",
      description: "Pushing limits through long-distance challenges, building endurance for life's greatest adventures.",
      image: runningImage,
      stat: "3",
      statLabel: "marathons completed",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Target className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Football",
      description: "Strategic gameplay and team coordination, applying tactical thinking both on and off the field.",
      image: footballImage,
      stat: "Weekly",
      statLabel: "matches",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const nextActivity = () => {
    setCurrentActivityIndex((prev) => (prev + 1) % activities.length);
  };

  const prevActivity = () => {
    setCurrentActivityIndex((prev) => (prev - 1 + activities.length) % activities.length);
  };

  const nextGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-background text-foreground relative"
    >
      {/* Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 w-full z-50 glass-effect"
        ref={mobileMenuRef}
      >
        <div className="container-custom px-4 md:px-6 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <Link to="/">
              <motion.h1 
                whileHover={{ scale: 1.05 }}
                className="text-lg md:text-xl lg:text-2xl font-bold gradient-text"
              >
                Shivam Pandiya
              </motion.h1>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center">
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors text-sm lg:text-base">About</a>
              <a href="#activities" className="text-muted-foreground hover:text-primary transition-colors text-sm lg:text-base">Activities</a>
              <a href="#gallery" className="text-muted-foreground hover:text-primary transition-colors text-sm lg:text-base">Gallery</a>
              <Link 
                to="/resume" 
                onClick={() => window.scrollTo(0, 0)}
                className="bg-primary hover:bg-primary/80 text-primary-foreground px-3 py-2 lg:px-4 lg:py-2 rounded-full transition-all duration-300 hover-lift text-xs lg:text-sm"
              >
                Resume
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-3 pb-4 border-t border-border/20"
              >
                <div className="flex flex-col space-y-3 pt-4">
                  <a 
                    href="#about" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-muted-foreground hover:text-primary transition-colors py-2 text-sm"
                  >
                    About
                  </a>
                  <a 
                    href="#activities" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-muted-foreground hover:text-primary transition-colors py-2 text-sm"
                  >
                    Activities
                  </a>
                  <a 
                    href="#gallery" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-muted-foreground hover:text-primary transition-colors py-2 text-sm"
                  >
                    Gallery
                  </a>
                  <Link 
                    to="/resume" 
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setMobileMenuOpen(false);
                    }}
                    className="bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-3 rounded-full transition-all duration-300 text-center text-sm mt-2"
                  >
                    Resume
                  </Link>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 md:pt-20 lg:pt-0">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/70" />
        </motion.div>
        
        <div className="container-custom px-4 md:px-6 py-8 md:py-12 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="space-y-4 md:space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1"
            >
              <div className="space-y-3 md:space-y-4">
                <motion.h2
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                >
                  <span className="text-foreground">Digital</span>
                  <br />
                  <span className="gradient-text">Adventure</span>
                  <br />
                  <span className="text-foreground">Pioneer</span>
                </motion.h2>
                
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary font-semibold h-6 md:h-8 flex justify-center lg:justify-start"
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentText}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                      {heroTexts[currentText]}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              </div>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                Passionate about building innovative blockchain products while exploring the great outdoors. 
                I bring the same energy from mountain peaks to product roadmaps, creating solutions that push boundaries.
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
              >
                <Link to="/resume" onClick={() => window.scrollTo(0, 0)}>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 212, 255, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-5 py-3 md:px-6 md:py-3 rounded-full text-sm md:text-base font-semibold flex items-center gap-2 glow-effect w-full sm:w-auto justify-center"
                  >
                    <Briefcase className="w-4 h-4" />
                    My Resume
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-primary text-primary px-5 py-3 md:px-6 md:py-3 rounded-full text-sm md:text-base font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
                  onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                >
                  <Heart className="w-4 h-4" />
                  Discover My Journey
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 blur-xl"
                />
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={heroImage}
                  alt="Shivam Pandiya"
                  className="relative w-full max-w-sm md:max-w-lg mx-auto rounded-2xl md:rounded-3xl shadow-2xl floating-animation"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-2xl md:rounded-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="container-custom">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 lg:mb-16"
          >
            <span className="gradient-text">About Me</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Code className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-primary" />,
                title: "Professional",
                description: "Leading product development in blockchain and Web3 ecosystems, driving innovation and user adoption through strategic thinking and technical expertise."
              },
              {
                icon: <Mountain className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-secondary" />,
                title: "Adventurer", 
                description: "Exploring the great outdoors through trekking, cycling, and running. Nature fuels my creativity and problem-solving abilities."
              },
              {
                icon: <Target className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-accent" />,
                title: "Explorer",
                description: "Always seeking new challenges and experiences, both in technology and in the wilderness. Innovation thrives at the intersection of passion and purpose."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="glass-effect rounded-xl md:rounded-2xl p-6 md:p-8 text-center hover-lift"
              >
                <div className="flex justify-center mb-4 md:mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Activities Section with Carousel */}
      <section id="activities" className="py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="container-custom">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 lg:mb-16"
          >
            <span className="gradient-text">My Activities</span>
          </motion.h2>
          
          {/* Desktop Grid View */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect rounded-2xl overflow-hidden hover-lift group"
              >
                <div className="relative h-80">
                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <div className={`bg-gradient-to-r ${activity.color} p-3 rounded-full text-white`}>
                      {activity.icon}
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-6 text-right">
                    <div className="text-3xl font-bold text-primary">{activity.stat}</div>
                    <div className="text-sm text-muted-foreground">{activity.statLabel}</div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                    {activity.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{activity.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile/Tablet Carousel View */}
          <div className="lg:hidden relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentActivityIndex * 100}%)` }}
              >
                {activities.map((activity, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6 }}
                      className="glass-effect rounded-xl md:rounded-2xl overflow-hidden hover-lift group"
                    >
                      <div className="relative h-64 md:h-80">
                        <img 
                          src={activity.image} 
                          alt={activity.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                        <div className="absolute top-4 left-4 md:top-6 md:left-6">
                          <div className={`bg-gradient-to-r ${activity.color} p-2 md:p-3 rounded-full text-white`}>
                            {activity.icon}
                          </div>
                        </div>
                        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-right">
                          <div className="text-2xl md:text-3xl font-bold text-primary">{activity.stat}</div>
                          <div className="text-xs md:text-sm text-muted-foreground">{activity.statLabel}</div>
                        </div>
                      </div>
                      <div className="p-4 md:p-6">
                        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-3 md:mb-4 flex items-center gap-2">
                          {activity.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{activity.description}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevActivity}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary/20 hover:bg-primary/40 backdrop-blur-sm text-primary p-2 md:p-3 rounded-full transition-all duration-300 z-10"
              aria-label="Previous activity"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={nextActivity}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary/20 hover:bg-primary/40 backdrop-blur-sm text-primary p-2 md:p-3 rounded-full transition-all duration-300 z-10"
              aria-label="Next activity"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {activities.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentActivityIndex(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentActivityIndex ? 'bg-primary scale-125' : 'bg-primary/30'
                  }`}
                  aria-label={`Go to activity ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Adventure Gallery with Carousel */}
      <section id="gallery" className="py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="container-custom">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 lg:mb-16"
          >
            <span className="gradient-text">Adventure Gallery</span>
          </motion.h2>
          
          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg md:rounded-xl group cursor-pointer"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold text-sm md:text-lg">{image.alt}</p>
                  <p className="text-primary text-xs md:text-sm capitalize">{image.category}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Carousel View */}
          <div className="md:hidden relative">
            <div className="overflow-hidden rounded-xl">
              <motion.div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentGalleryIndex * 100}%)` }}
              >
                {galleryImages.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-1">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5 }}
                      className="relative overflow-hidden rounded-lg group cursor-pointer"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <p className="text-white font-semibold text-sm">{image.alt}</p>
                        <p className="text-primary text-xs capitalize">{image.category}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Gallery Carousel Controls */}
            <button
              onClick={prevGalleryImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary/20 hover:bg-primary/40 backdrop-blur-sm text-primary p-2 rounded-full transition-all duration-300 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextGalleryImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary/20 hover:bg-primary/40 backdrop-blur-sm text-primary p-2 rounded-full transition-all duration-300 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Gallery Carousel Indicators */}
            <div className="flex justify-center mt-4 space-x-1">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGalleryIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentGalleryIndex ? 'bg-primary scale-125' : 'bg-primary/30'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95">
          <BlockchainBackground />
        </div>
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="gradient-text">Ready to Collaborate?</span>
            </motion.h2>
            
            <motion.p 
              className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Let's build the next big blockchain innovation together.
            </motion.p>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link to="/resume" onClick={() => window.scrollTo(0, 0)}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 212, 255, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold glow-effect flex items-center gap-2 md:gap-3 mx-auto transition-all duration-300"
                >
                  <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
                  Check My Professional Resume
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-effect border-t border-border py-6 md:py-8 text-center px-4 md:px-6">
        <div className="container-custom">
          <p className="text-muted-foreground text-sm md:text-base">&copy; {new Date().getFullYear()} Shivam Pandiya. All rights reserved.</p>
          <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">Crafted with passion and precision</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-primary hover:bg-primary/80 text-primary-foreground p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 z-50 glow-effect"
          >
            <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HomePage;

