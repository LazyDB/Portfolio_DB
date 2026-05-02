import Icon from "./Icon.jsx";

export default function ProjectCard({ project, index }) {
  return (
    <article className="project-card">
      <div className="project-number">0{index + 1}</div>
      <div>
        <p className="eyebrow">{project.period}</p>
        <h2>{project.title}</h2>
        <h3>{project.subtitle}</h3>
        <p>{project.description}</p>
      </div>

      <ul className="project-highlights">
        {project.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>

      <div className="tech-list">
        {project.tech.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>

      <div className="project-card-accent" aria-hidden="true">
        <Icon name="arrowUpRight" size={22} />
      </div>
    </article>
  );
}
