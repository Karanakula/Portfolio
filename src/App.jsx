import React from "react";
import { me } from "./data";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaMapMarkerAlt } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Reveal from "./components/Reveal";
import BlurImage from "./components/BlurImage";

const Pill = ({ children }) => <span className="pill">{children}</span>;
const Section = ({ id, title, children }) => (
  <section id={id} aria-labelledby={`${id}-title`} className="section">
    <div className="container">
      <h2 id={`${id}-title`} className="h2">{title}</h2>
      {children}
    </div>
  </section>
);

export default function App() {
  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container nav">
          <a className="brand" href="#top">{me.name}</a>
          <nav className="links" aria-label="Primary">
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#tech">Tech</a>
            <a href="#education">Education</a>
            <a href={me.links.resume} target="_blank" rel="noopener" className="btn small">
              <FaDownload aria-hidden /> Resume
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main id="top">
        <section className="hero">
          <div className="container heroInner">
            <Reveal><Pill>{me.available}</Pill></Reveal>

            <Reveal delay={0.08}>
              <h1 className="h1">Hi, I’m <span className="grad">{me.name}</span> — {me.title}.</h1>
            </Reveal>

            <Reveal delay={0.16}><p className="lead">{me.blurb}</p></Reveal>

            <Reveal delay={0.2}>
              <p className="muted contactLine">
                <FaMapMarkerAlt className="icon" aria-hidden /> {me.location} ·{" "}
                <a href={`mailto:${me.email}`} className="link">
                  <FaEnvelope className="icon" aria-hidden /> {me.email}
                </a>
              </p>
            </Reveal>

            {/* Social row */}
            <Reveal delay={0.28}>
              <div className="social">
                <a href={me.links.github}   target="_blank" rel="noopener" aria-label="GitHub"   className="iconBtn"><FaGithub /></a>
                <a href={me.links.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="iconBtn"><FaLinkedin /></a>
                <a href={me.links.leetcode} target="_blank" rel="noopener" aria-label="LeetCode" className="iconBtn"><SiLeetcode /></a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Tech */}
        <Section id="tech" title="Tech stack">
          <div className="grid three">
            {Object.entries(me.tech).map(([group, items]) => (
              <Reveal key={group}>
                <article className="card">
                  <h3 className="h3">{group}</h3>
                  <div className="chips">{items.map(s => <span key={s} className="chip">{s}</span>)}</div>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Projects — NOW horizontal, single row, scrollable if needed */}
       {/* Projects — 2 cards per row */}
<Section id="projects" title="Featured projects">
  <div className="grid two">
    {me.projects.map((p) => (
      <Reveal key={p.title}>
        <article className="proj">
          <div className="projMedia">
            <BlurImage src={p.image} alt={p.title} width="100%" height="240px" />
          </div>
          <div className="projBody">
            <header className="projHead">
              <h3 className="h3">{p.title}</h3>
              <span className="muted">{p.period}</span>
            </header>
            <div className="chips">{p.stack.map(s => <span className="chip" key={s}>{s}</span>)}</div>
            <ul className="list">
              {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        </article>
      </Reveal>
    ))}
  </div>
</Section>


        {/* Experience */}
        <Section id="experience" title="Experience">
          <div className="timeline">
            {me.experience.map((xp) => (
              <Reveal key={xp.company}>
                <article className="card">
                  <header className="cardHead">
                    <h3 className="h3">{xp.role} — {xp.company}</h3>
                    <span className="muted">{xp.period}</span>
                  </header>
                  <ul className="list">
                    {xp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section id="education" title="Education">
          <div className="grid two">
            {me.education.map((ed) => (
              <Reveal key={ed.school}>
                <article className="card">
                  <header className="cardHead">
                    <h3 className="h3">{ed.school}</h3>
                    <span className="muted">{ed.period}</span>
                  </header>
                  <p className="strong">{ed.degree}</p>
                  <details className="details">
                    <summary>Relevant coursework</summary>
                    <div className="chips">
                      {ed.coursework.map(c => <span className="chip" key={c}>{c}</span>)}
                    </div>
                  </details>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>
      </main>

      {/* Footer (section separators are added via CSS; no extra divider element needed) */}
      <footer className="footer" role="contentinfo">
        <div className="footerTop">
          <div className="container footerGrid">
            <div className="footBrand">
              <h3 className="h3">Let’s connect</h3>
              <p className="muted">Open to full-stack SWE internships. I care about clarity, usability, and shipping.</p>
              <div className="footerSocial">
                <a href={me.links.github}   target="_blank" rel="noopener" aria-label="GitHub"   className="iconBtn"><FaGithub /></a>
                <a href={me.links.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="iconBtn"><FaLinkedin /></a>
                <a href={me.links.leetcode} target="_blank" rel="noopener" aria-label="LeetCode" className="iconBtn"><SiLeetcode /></a>
                <a href={`mailto:${me.email}`} target="_blank" rel="noopener" aria-label="Email"   className="iconBtn"><FaEnvelope /></a>
              </div>
            </div>

            <nav className="footLinks" aria-label="Quick links">
              <h4 className="h4">Navigate</h4>
              <ul>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#tech">Tech stack</a></li>
                <li><a href="#education">Education</a></li>
              </ul>
            </nav>

            <div className="footResume">
              <h4 className="h4">Résumé</h4>
              <p className="muted">Prefer a quick PDF review?</p>
              <a className="btn small" href={me.links.resume} target="_blank" rel="noopener">
                <FaDownload aria-hidden /> Download PDF
              </a>
            </div>
          </div>
        </div>

        <div className="footerBottom">
          <div className="container footBottomInner">
            <small>© {new Date().getFullYear()} {me.name}. Built with React + Vite.</small>
            <small>Last updated {new Date().toLocaleDateString()}.</small>
          </div>
        </div>
      </footer>
    </>
  );
}
