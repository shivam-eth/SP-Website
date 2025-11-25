import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { activities } from '../../data/homeData';

const ActivitiesSection = () => {
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

    const nextActivity = () => {
        setCurrentActivityIndex((prev) => (prev + 1) % activities.length);
    };

    const prevActivity = () => {
        setCurrentActivityIndex((prev) => (prev - 1 + activities.length) % activities.length);
    };

    return (
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
                                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${index === currentActivityIndex ? 'bg-primary scale-125' : 'bg-primary/30'
                                    }`}
                                aria-label={`Go to activity ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ActivitiesSection;
