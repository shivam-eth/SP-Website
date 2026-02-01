import React from 'react';
import { motion } from 'framer-motion';
import { aboutItems } from '../../data/homeData';

const AboutSection = () => {
    return (
        <section id="about" className="py-24 md:py-32 px-4 md:px-6">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        <span className="gradient-text">What I Bring</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A unique blend of product strategy, technical depth, and cross-functional leadership.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {aboutItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative bg-card/30 border border-border hover:border-primary/30 rounded-2xl p-6 md:p-8 text-center transition-all duration-300">
                                <div className="flex justify-center mb-6">
                                    <div className="p-4 rounded-xl bg-primary/10 text-primary">
                                        {item.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl md:text-2xl font-semibold mb-4">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
