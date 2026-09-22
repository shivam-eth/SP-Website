import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { External, SiteFooter, SiteHeader } from '../components/Chrome';
import resumePDF from '../assets/Shivam_Pandiya_Resume.pdf';
import {
  certifications,
  education,
  experiences,
  projects,
  skills,
  summary,
} from '../data/resumeData';

const sections = [
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
];

function useActiveSection() {
  const [active, setActive] = useState('summary');
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: '-20% 0px -65% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export default function ResumePage() {
  const active = useActiveSection();

  return (
    <>
      <SiteHeader>
        <Link to="/#work">Work</Link>
        <a href={resumePDF} download="Shivam_Pandiya_Resume.pdf">
          Download PDF
        </a>
      </SiteHeader>

      <main id="main" className="wrap cv">
        <nav className="cv__toc" aria-label="Resume sections">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? 'true' : undefined}>
              {s.label}
            </a>
          ))}
        </nav>

        <div>
          <header className="cv__head">
            <h1 className="display">Shivam Pandiya</h1>
            <p className="lede">
              Senior Product Owner for AI, FinTech and Platform Products, based in Chandigarh.
            </p>
          </header>

          <section id="summary" className="cv__section" aria-labelledby="summary-title">
            <h2 id="summary-title" className="h2">
              Summary
            </h2>
            <p className="cv__summary">{summary}</p>
          </section>

          <section id="experience" className="cv__section" aria-labelledby="experience-title">
            <h2 id="experience-title" className="h2">
              Experience
            </h2>
            {experiences.map((job) => (
              <article className="job" key={job.company}>
                <div className="job__head">
                  <div>
                    <h3 className="h3">{job.position}</h3>
                    <p className="meta">{job.company}</p>
                  </div>
                  <p className="job__when meta">
                    {job.duration}
                    <br />
                    {job.location}
                  </p>
                </div>
                <ul>
                  {job.achievements.map((a) => (
                    <li key={a.slice(0, 32)}>{a}</li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          <section id="projects" className="cv__section" aria-labelledby="projects-title">
            <h2 id="projects-title" className="h2">
              Projects
            </h2>
            <ul className="cv-list">
              {projects.map((p) => (
                <li key={p.name}>
                  <div>
                    <h3 className="h3">
                      {p.link && p.link !== '#' ? (
                        <External href={p.link} className="link link--quiet">
                          {p.name}
                        </External>
                      ) : (
                        p.name
                      )}
                    </h3>
                    <p className="meta">{p.description}</p>
                  </div>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f.slice(0, 32)}>{f}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section id="skills" className="cv__section" aria-labelledby="skills-title">
            <h2 id="skills-title" className="h2">
              Skills
            </h2>
            <div className="skills">
              {skills.map((g) => (
                <div key={g.category}>
                  <h3 className="h3">{g.category}</h3>
                  <p>{g.items.join(', ')}.</p>
                </div>
              ))}
            </div>
          </section>

          <section id="certifications" className="cv__section" aria-labelledby="certs-title">
            <h2 id="certs-title" className="h2">
              Certifications
            </h2>
            <ul className="cv-list">
              {certifications.map((c) => (
                <li key={c.name}>
                  <p className="meta">{c.tag}</p>
                  <div>
                    <h3 className="h3">{c.name}</h3>
                    <p className="meta">{c.issuer}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section id="education" className="cv__section" aria-labelledby="edu-title">
            <h2 id="edu-title" className="h2">
              Education
            </h2>
            <ul className="cv-list">
              {education.map((e) => (
                <li key={e.degree}>
                  <p className="meta">{e.year}</p>
                  <div>
                    <h3 className="h3">{e.degree}</h3>
                    <p className="meta">
                      {e.institution}, {e.location}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <p className="cv__section">
            <a className="button button--quiet" href={resumePDF} download="Shivam_Pandiya_Resume.pdf">
              Download the PDF
            </a>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
