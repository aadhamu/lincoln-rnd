import React, { useEffect, useState } from 'react';
import { API_ENDPOINT } from './Config';

const Hero = () => {
  return (
    <div
      style={{
        backgroundColor: '#dc2626',
        color: '#ffffff',
        padding: '5rem 2rem',
        textAlign: 'center',
        backgroundImage: 'linear-gradient(to right, #dc2626, #7f1d1d)',
        boxShadow: 'inset 0 -10px 30px rgba(0,0,0,0.2)',
      }}
    >
      <h1
        style={{
          fontSize: '3rem',
          fontWeight: '800',
          marginBottom: '1rem',
          letterSpacing: '1px',
        }}
      >
        Student Projects
      </h1>
      <h3
        style={{
          fontWeight: '400',
          fontSize: '1.2rem',
          color: '#f3f4f6',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        Here is a list of projects done by our students so far:
      </h3>
    </div>
  );
};

const Modal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          padding: '2rem',
          borderRadius: '12px',
          maxWidth: '700px',
          width: '90%',
          boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            fontSize: '1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#dc2626',
          }}
        >
          &times;
        </button>

        <img
          src={API_ENDPOINT + project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            marginBottom: '1.5rem',
          }}
        />

        <div>
          <h2 style={{ marginBottom: '0.5rem', color: '#111827' }}>
            {project.title}
          </h2>
          <p style={{ color: '#dc2626', marginBottom: '1rem' }}>
            <strong>Student Name:</strong> {project.student}
          </p>

          <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
            <a
              href={API_ENDPOINT + project.document}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#dc2626',
                color: '#fff',
                padding: '0.6rem 1.2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
              }}
            >
              Download
            </a>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#111827',
                color: '#fff',
                padding: '0.6rem 1.2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
              }}
            >
              Visit Link
            </a>
          </div>

          <div>
            <h3 style={{ textDecoration: 'underline', marginBottom: '0.5rem' }}>
              Abstract
            </h3>
            <p style={{ color: '#374151', lineHeight: '1.6' }}>{project.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Areas = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT + 'student_projects.php');
        const result = await response.json();
        setProjects(result.data);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchData();
  }, []);

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
  };

  const cardHover = {
    transform: 'translateY(-5px)',
  };

  return (
    <div
      style={{
        backgroundColor: '#f9fafb',
        padding: '4rem 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
      }}
    >
      {projects.map((project, index) => (
        <div
          key={index}
          style={cardStyle}
          onClick={() => setSelectedProject(project)}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
        >
          <img
            src={API_ENDPOINT + project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
            }}
          />
          <div style={{ padding: '1.5rem' }}>
            <h2
              style={{
                fontSize: '1.2rem',
                color: '#111827',
                marginBottom: '0.5rem',
              }}
            >
              {project.title}
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: '1.5' }}>
              {project.description.length > 120
                ? project.description.substring(0, 120) + '...'
                : project.description}
            </p>
            <p style={{ fontWeight: 'bold', color: '#dc2626', marginTop: '0.8rem' }}>
              Student: {project.student}
            </p>
          </div>
        </div>
      ))}
      <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};

function ProjectList() {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#ffffff' }}>
      <Hero />
      <Areas />
    </div>
  );
}

export default ProjectList;
