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

import {
    Mountain,
    Bike,
    Trophy,
    Target,
    Code,
    Layers,
    Users,
    Zap,
    Shield,
    Rocket,
    GitBranch,
    Database
} from 'lucide-react';
import React from 'react';

// Hero metrics for social proof
export const heroMetrics = [
    { value: "5+", label: "Years Experience", icon: <Zap className="w-5 h-5" /> },
    { value: "100M+", label: "Transactions Processed", icon: <Database className="w-5 h-5" /> },
    { value: "120+", label: "Engineers Led", icon: <Users className="w-5 h-5" /> },
    { value: "8+", label: "Products Shipped", icon: <Rocket className="w-5 h-5" /> }
];

// Companies/projects for social proof strip
export const companies = [
    { name: "5irechain", url: "https://5ire.org" },
    { name: "Qubetics", url: "https://qubetics.com" },
    { name: "BlockDAG", url: "https://blockdag.network" },
    { name: "Tomi", url: "https://tomi.com" },
    { name: "Antier Solutions", url: "https://antiersolutions.com" }
];

// Tech stack for hero
export const techStack = [
    "Cosmos SDK", "Substrate", "EVM", "DeFi", "DePIN", "Tokenomics"
];

export const heroTexts = [
    "Senior Web3 Product Manager",
    "Layer-1 Blockchain Specialist",
    "DeFi & DePIN Expert"
];

export const galleryImages = [
    { src: gallery1, alt: 'Mountain Adventure', category: 'trekking' },
    { src: gallery2, alt: 'Cycling Journey', category: 'cycling' },
    { src: gallery3, alt: 'Running Challenge', category: 'running' },
    { src: gallery4, alt: 'Team Sports', category: 'football' },
    { src: gallery5, alt: 'Outdoor Exploration', category: 'adventure' },
    { src: gallery6, alt: 'Peak Achievement', category: 'trekking' },
];

export const activities = [
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

export const aboutItems = [
    {
        icon: <Layers className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-primary" />,
        title: "Product Strategy",
        description: "I translate complex blockchain architectures into user-friendly experiences. From tokenomics to UX flows, I bridge the gap between protocol teams and end users."
    },
    {
        icon: <Users className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-secondary" />,
        title: "Cross-functional Leadership",
        description: "Led 120+ engineers across protocol, backend, DevOps, and wallet teams. I ensure aligned roadmaps and coordinated releases across decentralized applications."
    },
    {
        icon: <Shield className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-accent" />,
        title: "Web3 Native",
        description: "Deep expertise in Cosmos SDK, Substrate, EVM, and Hyperledger. I've shipped DeFi, DePIN, and Layer-1 products with security partners like CertiK and Hacken."
    }
];
