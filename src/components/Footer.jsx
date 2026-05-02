import Icon from "./Icon.jsx";
import { profile } from "../data/profile.js";

export default function Footer() {
  return (
    <footer className="footer">
      <p>Designed and built with React by {profile.name}.</p>
      <div className="footer-links">
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <Icon name="github" size={18} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <Icon name="linkedin" size={18} />
        </a>
        <a href={`mailto:${profile.email}`} aria-label="Email">
          <Icon name="mail" size={18} />
        </a>
      </div>
    </footer>
  );
}
