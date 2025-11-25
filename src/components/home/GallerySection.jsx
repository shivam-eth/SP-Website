import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '../../data/homeData';

const GallerySection = () => {
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

    const nextGalleryImage = () => {
        setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevGalleryImage = () => {
        setCurrentGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    return (
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
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentGalleryIndex ? 'bg-primary scale-125' : 'bg-primary/30'
                                    }`}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
