import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="brand" onClick={closeSidebar}>
          <img src="/assets/logo.png" alt="Dipesh Baral Logo" className="nav-logo" />
          <span>Dipesh Baral</span>
        </Link>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/resume">Resume</NavLink>
          <NavLink to="/contact">Contact Me</NavLink>
          <NavLink to="/game">Game</NavLink>
        </div>

        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
        >
          ☰
        </button>
      </nav>

      <div
        className={sidebarOpen ? "sidebar-overlay show" : "sidebar-overlay"}
        onClick={closeSidebar}
      />

      <aside className={sidebarOpen ? "sidebar show" : "sidebar"}>
        <button
          className="close-btn"
          onClick={closeSidebar}
          aria-label="Close navigation menu"
        >
          ×
        </button>

        <div className="sidebar-brand">
          <img src="/assets/logo.png" alt="Dipesh Baral Logo" className="sidebar-logo" />
          <h3>Dipesh Baral</h3>
        </div>

        <NavLink to="/" onClick={closeSidebar}>
          Home
        </NavLink>
        <NavLink to="/projects" onClick={closeSidebar}>
          Projects
        </NavLink>
        <NavLink to="/resume" onClick={closeSidebar}>
          Resume
        </NavLink>
        <NavLink to="/contact" onClick={closeSidebar}>
          Contact Me
        </NavLink>
        <NavLink to="/game" onClick={closeSidebar}>
          Game
        </NavLink>
      </aside>
    </>
  );
}