import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, ChevronDown, Mail } from 'lucide-react';
import { heroTexts, heroMetrics, companies, techStack } from '../../data/homeData';

const HeroSection = () => {
    const [currentText, setCurrentText] = useState(0);

    useEffect(() => {
        const textInterval = setInterval(() => {
            setCurrentText((prev) => (prev + 1) % heroTexts.length);
        }, 3000);

        return () => clearInterval(textInterval);
    }, []);

    const scrollToWork = () => {
        document.getElementById('featured-work')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20 md:pt-24">
            {/* Gradient orbs background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
            </div>

            <div className="container-custom px-4 md:px-6 py-8 md:py-12 relative z-10 flex-1 flex flex-col justify-center">
                {/* Main Hero Content */}
                <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            Available for new opportunities
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 text-balance"
                    >
                        <span className="text-foreground">I ship </span>
                        <span className="gradient-text">blockchain products</span>
                        <br className="hidden sm:block" />
                        <span className="text-foreground"> at scale</span>
                    </motion.h1>

                    {/* Rotating subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-8 md:h-10 mb-6 flex items-center justify-center"
                    >
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentText}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="text-lg md:text-xl lg:text-2xl text-primary font-semibold"
                            >
                                {heroTexts[currentText]}
                            </motion.span>
                        </AnimatePresence>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8"
                    >
                        From Layer-1 launches to DeFi protocols and DePIN networks. 
                        I collaborate with engineering, design, and protocol teams to turn complex 
                        blockchain workflows into simple user experiences.
                    </motion.p>

                    {/* Tech Stack Pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-2 mb-10"
                    >
                        {techStack.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1.5 text-xs md:text-sm font-medium bg-card/50 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-default"
                            >
                                {tech}
                            </span>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <motion.button
                            onClick={scrollToWork}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full text-base font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg shadow-primary/25"
                        >
                            View My Work
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>

                        <Link to="/resume" onClick={() => window.scrollTo(0, 0)}>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="border border-border hover:border-primary/50 text-foreground px-8 py-4 rounded-full text-base font-semibold flex items-center gap-2 transition-all duration-300 hover:bg-card/50"
                            >
                                <Download className="w-4 h-4" />
                                Resume
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

                {/* Metrics Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-16"
                >
                    {heroMetrics.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                            className="metric-card text-center group"
                        >
                            <div className="text-primary mb-2 flex justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                                {metric.icon}
                            </div>
                            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1">
                                {metric.value}
                            </div>
                            <div className="text-xs md:text-sm text-muted-foreground">
                                {metric.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Companies Strip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="text-center pb-16"
                >
                    <p className="text-xs md:text-sm text-muted-foreground mb-6 uppercase tracking-wider">
                        Products shipped with
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
                        {companies.map((company) => (
                            <a
                                key={company.name}
                                href={company.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors text-sm md:text-base font-medium"
                            >
                                {company.name}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2"
            >
                <motion.button
                    onClick={scrollToWork}
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-muted-foreground hover:text-primary transition-colors"
                >
                    <ChevronDown className="w-6 h-6" />
                </motion.button>
            </motion.div>
        </section>
    );
};

export default HeroSection;
