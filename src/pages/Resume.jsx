import Icon from "../components/Icon.jsx";

const resumePath = "/assets/resume.pdf";

export default function Resume() {
  return (
    <section className="page resume-page">
      <div className="page-heading resume-heading">
        <div>
          <p className="eyebrow">Resume</p>
          <h2>View or download my resume.</h2>
          <p>
            The PDF below is loaded from the assets folder, so you can replace it
            anytime without changing the page design.
          </p>
        </div>
        <a className="btn primary-btn" href={resumePath} download>
          <Icon name="download" size={18} /> Download PDF
        </a>
      </div>

      <div className="resume-viewer-shell">
        <div className="resume-toolbar">
          <span>
            <Icon name="file" size={18} /> Dipesh-Baral-Resume.pdf
          </span>
          <a href={resumePath} target="_blank" rel="noreferrer">
            Open in new tab
          </a>
        </div>
        <iframe
          title="Dipesh Baral Resume"
          src={resumePath}
          className="resume-viewer"
        />
      </div>
    </section>
  );
}
