import Icon from "./Icon.jsx";

export default function ProjectCard({ project, index }) {
  return (
    <article className="project-card">
      <div className="project-image-wrap">
        <img
          src={project.image}
          alt={`${project.title} project screenshot`}
          className="project-image"
        />
      </div>

      <div className="project-content">
        <div className="project-topline">
          <div className="project-number">0{index + 1}</div>
          <p className="eyebrow">{project.period}</p>
        </div>

        <h2>{project.title}</h2>
        <h3>{project.subtitle}</h3>
        <p>{project.description}</p>

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

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="project-github"
          >
            View GitHub
            <Icon name="arrowUpRight" size={18} />
          </a>
        )}
      </div>

      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="project-card-accent"
          aria-label={`Open ${project.title} GitHub repository`}
        >
          <Icon name="arrowUpRight" size={22} />
        </a>
      )}
    </article>
  );
}