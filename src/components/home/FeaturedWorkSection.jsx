import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Calendar, MapPin } from 'lucide-react';

// Featured projects data
const featuredProjects = [
    {
        name: "Qubetics",
        type: "Layer-1 Blockchain",
        description: "Defined product flows for chain abstraction, validator roles, staking logic, and early dVPN features. Translated technical constraints into intuitive UI behaviors.",
        tags: ["Chain Abstraction", "DePIN", "Tokenomics"],
        link: "https://www.qubetics.com/",
        featured: true
    },
    {
        name: "5irechain",
        type: "Sustainable Layer-1",
        description: "Led development & launch achieving 100M+ transactions in the first month. Managed ecosystem products: staking, governance, bridge, wallets, and developer tools.",
        tags: ["Substrate", "Rust", "100M+ Txns"],
        link: "https://5ire.org",
        featured: true
    },
    {
        name: "BlockDAG",
        type: "DAG Blockchain + Mobile App",
        description: "Reworked onboarding and mining UX flows, contributing to ~35% increase in app downloads after v2 release.",
        tags: ["Mobile", "Mining", "UX"],
        link: "https://blockdag.network/",
        featured: false
    },
    {
        name: "Tomi DePIN",
        type: "Decentralized Hosting & Storage",
        description: "Designed dashboard UX for usage tracking, billing, developer APIs, and lifecycle management.",
        tags: ["DePIN", "Storage", "APIs"],
        link: "https://tomi.com/storage",
        featured: false
    }
];

// Featured experience
const featuredExperience = [
    {
        company: "Antier Solutions",
        role: "Product Manager",
        period: "Jun 2021 - Present",
        highlight: "Own end-to-end product delivery for Web3 platforms, DeFi applications, and crypto exchanges. Led 120+ engineers across protocol, backend, DevOps, and wallet teams.",
        location: "Chandigarh, IN"
    },
    {
        company: "5irechain",
        role: "Product Owner",
        period: "Oct 2022 - Mar 2025",
        highlight: "Launched Layer-1 blockchain with 100M+ transactions in month one. Managed staking, governance, bridge, wallets, and developer tools.",
        location: "Remote"
    }
];

const FeaturedWorkSection = () => {
    return (
        <section id="featured-work" className="py-24 md:py-32 px-4 md:px-6 relative">
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16"
                >
                    <div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            <span className="gradient-text">Featured Work</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-xl">
                            Blockchain products I've shipped — from Layer-1 launches to DeFi protocols.
                        </p>
                    </div>
                    <Link 
                        to="/resume" 
                        onClick={() => window.scrollTo(0, 0)}
                        className="mt-4 md:mt-0 text-primary hover:text-primary/80 flex items-center gap-2 font-medium transition-colors"
                    >
                        View all projects
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-20">
                    {featuredProjects.map((project, index) => (
                        <motion.a
                            key={project.name}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`group relative overflow-hidden rounded-2xl border border-border bg-card/30 p-6 md:p-8 hover:border-primary/30 transition-all duration-300 ${
                                project.featured ? 'md:col-span-1' : ''
                            }`}
                        >
                            {/* Hover gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <p className="text-xs md:text-sm text-primary font-medium mb-1">
                                            {project.type}
                                        </p>
                                        <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                            {project.name}
                                        </h3>
                                    </div>
                                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                
                                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                                    {project.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Experience Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-8">
                        Experience
                    </h3>
                </motion.div>

                <div className="space-y-6">
                    {featuredExperience.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative pl-8 border-l-2 border-border hover:border-primary/50 transition-colors"
                        >
                            {/* Timeline dot */}
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />
                            
                            <div className="pb-8">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                    <div>
                                        <h4 className="text-lg md:text-xl font-semibold text-foreground">
                                            {exp.role}
                                        </h4>
                                        <p className="text-primary font-medium">
                                            {exp.company}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2 md:mt-0">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {exp.period}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {exp.location}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {exp.highlight}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View Full Resume CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <Link to="/resume" onClick={() => window.scrollTo(0, 0)}>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full text-foreground hover:border-primary/50 hover:bg-card/50 transition-all duration-300"
                        >
                            View Full Resume & All Projects
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedWorkSection;
