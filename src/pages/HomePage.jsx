import { Link } from 'react-router-dom';
import { SiteFooter, SiteHeader } from '../components/Chrome';
import Hero from '../components/home/Hero';
import Story from '../components/home/Story';
import { Contact, HowIBuild, OffTheClock, WorkIndex } from '../components/home/Sections';

export default function HomePage() {
  return (
    <>
      <SiteHeader>
        <a href="#work">Work</a>
        <a href="#life">Life</a>
        <Link to="/resume">Resume</Link>
      </SiteHeader>
      <main id="main">
        <Hero />
        <Story />
        <HowIBuild />
        <WorkIndex />
        <OffTheClock />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
