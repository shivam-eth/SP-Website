import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Briefcase, ArrowRight, Heart } from 'lucide-react';
import heroImage from '../../assets/photo_2025-06-0718.12.09.jpeg';
import { heroTexts } from '../../data/homeData';

const HeroSection = ({ y }) => {
    const [currentText, setCurrentText] = useState(0);

    useEffect(() => {
        const textInterval = setInterval(() => {
            setCurrentText((prev) => (prev + 1) % heroTexts.length);
        }, 3000);

        return () => clearInterval(textInterval);
    }, []);

    return (
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
    );
};

export default HeroSection;
