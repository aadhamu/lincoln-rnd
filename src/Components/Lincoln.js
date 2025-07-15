import React, { useState, useEffect } from "react";
import "../Css/Lincoln.css";
import { API_ENDPOINT } from "./Config";

// Floating bubbles background
const FloatingBubbles = () => (
  <div className="floating-bubbles">
    {[...Array(12)].map((_, i) => (
      <span
        key={i}
        className={
          `bubble bubble-${i}` + (i % 2 === 0 ? " bubble-red" : " bubble-black")
        }
      >
        {" "}
      </span>
    ))}
  </div>
);

// Floating bubbles overlay
const FloatingBubblesOverlay = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(255,255,255,0.85)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "opacity 0.5s",
    }}
  >
    <FloatingBubbles />
  </div>
);

// Modernized hero section
const Hero = () => (
  <section className="hero">
    <div className="hero-content">
      <h1>Research & Development Unit</h1>
      <h3>Lincoln College & Lincoln University</h3>
      <p>
        The R&D Unit is the driving force behind our commitment to academic
        excellence, innovation, and societal impact. We empower faculty and
        students to engage in impactful research across various disciplines.
      </p>
    </div>
  </section>
);

// Modernized mission/vision section
const MissionVision = () => (
  <section className="mission">
    <div className="mission-text">
      <h1>Mission</h1>
      <p>
        To advance the frontiers of knowledge, foster interdisciplinary
        collaborations, and contribute to global progress by providing a dynamic
        and innovative environment for impactful research.
      </p>
    </div>
    <div className="mission-text">
      <h1>Vision</h1>
      <p>
        To be a globally recognized center of excellence in research, known for
        pioneering discoveries, innovative solutions, and a commitment to
        addressing societal challenges.
      </p>
    </div>
  </section>
);

// Modernized expertise section (unchanged except for What We Do card size)
const Expertise = () => (
  <section
    className="pictures"
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "2.5rem",
      padding: "3rem 2rem",
      background: "var(--off-white)",
    }}
  >
    {/* Gallery Row 1: 3 images full width */}
    <div
      className="gallery-row"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1.2rem",
        width: "100%",
      }}
    >
      <div className="gal gal-1"></div>
      <div className="gal gal-2"></div>
      <div className="gal gal-3"></div>
    </div>
    {/* Gallery Row 2: Expertise & Functionality card, then 2 images */}
    <div
      className="gallery-row"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1.2rem",
        width: "100%",
      }}
    >
      <div className="gal gal-4">
        <h1>Expertise & Functionality</h1>
        <p>
          Our dedicated team of researchers brings diverse expertise across
          science, technology, management, and humanities. The R&D Unit is a
          dynamic hub for ideation, exploration, and innovation, integrating
          theory and practice to support groundbreaking research and empower
          students and staff.
        </p>
      </div>
      <div className="gal gal-5"></div>
      {/* <div className="gal gal-6"></div> */}
    </div>
    {/* Gallery Row 3: 2 images, then What We Do card */}
    <div
      className="gallery-row"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "1.2rem",
        width: "100%",
      }}
    >
      <div className="gal gal-7"></div>
      <div className="gal gal-8"></div>
      <div className="gal gal-4">
        <div className="">
          <h1>What We Do</h1>
          <p>
            We facilitate research, foster innovation, and support the academic
            community in achieving excellence.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// Modernized project section head
const ProjectCardHead = () => (
  <div className="CardHead">Latest Student Projects</div>
);

// Modernized modal
const Modal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <img src={project.image} alt={project.title} className="modal-image" />
        <div className="project-details">
          <div className="project-details-header">
            <h1>{project.title}</h1>
            <p className="project-student">by {project.student}</p>
          </div>
          <div className="project-links">
            <a
              href={project.document}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              Download
            </a>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="button"
              >
                Link
              </a>
            )}
          </div>
          <div className="project-abstract">
            <strong>Abstract:</strong>
            <p>{project.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modernized project gallery
const ProjectGallery = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          API_ENDPOINT + "latest_student_projects.php"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        const projectsWithUpdatedImageUrls = result.data.map((project) => ({
          ...project,
          image: API_ENDPOINT + project.image,
          document: API_ENDPOINT + project.document,
        }));
        setProjects(projectsWithUpdatedImageUrls);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchData();
  }, []);

  if (!Array.isArray(projects) || projects.length === 0) {
    return <h3 className="card-body">No projects available</h3>;
  }

  return (
    <section className="project-pictures">
      {projects.map((project, index) => (
        <div
          key={index}
          className="p-sub-L"
          onClick={() => setSelectedProject(project)}
        >
          <img className="p-img" src={project.image} alt={project.title} />
          <div className="p-h3">{project.title}</div>
          <div className="p-p">by {project.student}</div>
        </div>
      ))}
      <Modal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

// Modernized partners section
const Partners = () => (
  <section className="CardHead2">
    <div className="card-head">Collaboration</div>
    <div className="card-body">
      We actively seek collaborations with industry partners, governmental
      agencies, and international institutions to enrich our research ecosystem
      and amplify the impact of our research.
    </div>
    <div className="l-flex-container">
      <div className="l-flex-box">
        <span className="card-cards">NITDA</span>
      </div>
      <div className="l-flex-box">
        <span className="card-cards">NGOs</span>
      </div>
      <div className="l-flex-box">
        <span className="card-cards">BOI</span>
      </div>
      <div className="l-flex-box">
        <span className="card-cards">NSEL</span>
      </div>
    </div>
  </section>
);

// Modernized about section
const About = () => (
  <section
    className="about"
    style={{
      // background:
      //   "linear-gradient(90deg, var(--pure-black) 70%, var(--primary-red) 100%)",
      padding: "2.5rem 1rem",
    }}
  >
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: 220,
      }}
    >
      <img
        src={require("./linclogo.png")}
        alt="logo"
        style={{
          maxWidth: 400,
          width: "100%",
          borderRadius: "1.2rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
        }}
      />
    </div>
    <div
      className="about-text"
      style={{
        flex: 2,
        minWidth: 220,
        maxWidth: 700,
        background: "rgba(255,255,255,0.06)",
        borderRadius: "1rem",
        padding: "2rem 1.5rem",
        boxShadow: "var(--shadow)",
      }}
    >
      <h1
        style={{
          color: "var(--primary-red)",
          fontSize: "1.5rem",
          marginBottom: "1rem",
        }}
      >
        About The R&D Unit
      </h1>
      <p
        style={{
          color: "var(--mid-gray)",
          fontSize: "1.05rem",
          marginBottom: "0.7rem",
        }}
      >
        In the dynamic realm of higher education, innovation serves as the
        heartbeat of progress. At Lincoln University and Lincoln College, we
        take pride in pushing the boundaries of knowledge and charting new
        territories of discovery. Our Research and Development Unit stands at
        the forefront of this intellectual frontier, a dynamic powerhouse
        dedicated to shaping the future of education, fostering groundbreaking
        research, and propelling our institutions into the vanguard of global
        academic excellence.
      </p>
      <p style={{ color: "var(--mid-gray)", fontSize: "1.05rem" }}>
        With an unwavering commitment to curiosity and exploration, the Research
        and Development Unit at Lincoln is not merely a department; it's an
        incubator of ideas, a crucible of innovation, and a catalyst for
        transformative change. In this introduction, we invite you to delve into
        the vibrant world of our research endeavors, where cutting-edge
        projects, interdisciplinary collaborations, and a spirit of relentless
        inquiry converge to redefine the landscape of knowledge creation.
      </p>
      <p style={{ color: "var(--mid-gray)", fontSize: "1.05rem" }}>
        Join us on this exhilarating journey as we unveil the ethos, objectives,
        and remarkable contributions of the Research and Development Unit at
        Lincoln University and Lincoln College, where the pursuit of knowledge
        knows no bounds, and the future is shaped by the tenacity of
        intellectual exploration.
      </p>
    </div>
  </section>
);

function Lincoln() {
  const [showBubbles, setShowBubbles] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubbles(false), 1200); // 1.2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showBubbles && <FloatingBubblesOverlay />}
      <div className="landing-maxwidth">
        <Hero />
        <MissionVision />
        <Expertise />
        <ProjectCardHead />
        <ProjectGallery />
        <Partners />
        <About />
      </div>
    </>
  );
}

export default Lincoln;
