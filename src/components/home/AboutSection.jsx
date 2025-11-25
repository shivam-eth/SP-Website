import React from 'react';
import { motion } from 'framer-motion';
import { aboutItems } from '../../data/homeData';

const AboutSection = () => {
    return (
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
                    {aboutItems.map((item, index) => (
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
    );
};

export default AboutSection;
