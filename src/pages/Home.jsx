import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { profile } from "../data/profile.js";

export default function Home() {
  const featuredStats = [
    { value: "Full-stack", label: "React, Vue, Node and MongoDB" },
    { value: "CloudTech", label: "Professional software developer experience" },
    { value: "MCS", label: "Master of Computer Science background" },
  ];

  return (
    <section className="page home-page">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Software Engineer · Full-Stack Developer</p>
          <h1>Dipesh Baral</h1>
          <h2>
            Building clean, scalable web experiences with a sharp eye for product detail.
          </h2>
          <p className="hero-summary">{profile.summary}</p>

          <div className="hero-actions">
            <Link to="/projects" className="btn primary-btn">
              View Projects <Icon name="arrowRight" size={18} />
            </Link>
            <Link to="/resume" className="btn ghost-btn">
              See Resume
            </Link>
          </div>
        </div>

        <div className="profile-card">
          <div className="avatar-orb">DB</div>
          <div>
            <p className="eyebrow">Available for</p>
            <h2>Frontend, backend and support-focused software roles</h2>
          </div>
          <div className="profile-card-lines">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {featuredStats.map((stat) => (
          <div className="stat-card" key={stat.value}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="section-grid">
        <article className="glass-panel">
          <Icon name="briefcase" />
          <h2>Experience</h2>
          {profile.experience.map((item) => (
            <div className="timeline-item" key={item.company}>
              <span>{item.dates}</span>
              <h3>{item.role} · {item.company}</h3>
              <p>{item.bullets[0]}</p>
            </div>
          ))}
        </article>

        <article className="glass-panel">
          <Icon name="sparkles" />
          <h2>Core Skills</h2>
          <div className="skill-cloud">
            {profile.skills.slice(0, 14).map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </article>

        <article className="glass-panel">
          <Icon name="graduation" />
          <h2>Education</h2>
          {profile.education.slice(0, 2).map((item) => (
            <div className="timeline-item" key={item.degree}>
              <span>{item.dates}</span>
              <h3>{item.degree}</h3>
              <p>{item.school}</p>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
