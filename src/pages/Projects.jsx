import ProjectCard from "../components/ProjectCard.jsx";
import { profile } from "../data/profile.js";

export default function Projects() {
  return (
    <section className="page">
      <div className="page-heading">
        <p className="eyebrow">Selected Work</p>
        <h2>Projects that show practical full-stack thinking.</h2>
        <p>
          A mix of marketplace, mobile commerce, and job platform work using React,
          Flutter, Node.js, and MongoDB.
        </p>
      </div>

      <div className="projects-grid">
        {profile.projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>

      <article className="research-banner">
        <p className="eyebrow">Research</p>
        <h2>{profile.research.title}</h2>
        <a href={profile.research.url} target="_blank" rel="noreferrer">
          Read research paper
        </a>
      </article>
    </section>
  );
}
