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
    Code
} from 'lucide-react';
import React from 'react';

export const heroTexts = [
    "Product Manager",
    "Blockchain Pioneer",
    "Adventure Seeker",
    "Web3 Innovation Leader"
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
];
