import { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";

import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Resume from "./pages/Resume.jsx";
import Contact from "./pages/Contact.jsx";
import Game from "./pages/Game.jsx";

function AnimatedRoutes() {
  const location = useLocation();
  const firstRouteLoad = useRef(true);
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    if (firstRouteLoad.current) {
      firstRouteLoad.current = false;
      return;
    }

    setRouteLoading(true);

    const timer = setTimeout(() => {
      setRouteLoading(false);
    }, 650);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <div className={routeLoading ? "page-loader-bar show" : "page-loader-bar"} />

      <div className="route-transition" key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFirstLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-shell">
      {firstLoading && <LoadingScreen />}

      <Navbar />

      <main>
        <AnimatedRoutes />
      </main>

      <Footer />
    </div>
  );
}