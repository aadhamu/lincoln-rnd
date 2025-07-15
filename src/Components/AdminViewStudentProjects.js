import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../Css/List.css";
import { API_ENDPOINT } from "./Config";
import { FaEllipsisV, FaTrash, FaArchive } from "react-icons/fa";

function List() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT + "student_projects.php");
        const result = await response.json();

        if (result.success) {
          setTableData(result.data);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const handler = () => fetchData();
    window.addEventListener('studentProjectUpdated', handler);
    return () => window.removeEventListener('studentProjectUpdated', handler);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div id="content">
      <div className="listbody">
        <div className="list">
          <div className="tabletop">
            <h3>Student Projects</h3>
            <Link className="text-link button" to="/admindash">
              Back To Dashboard
            </Link>
          </div>
          {tableData.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Student</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Link</th>
                    <th>Document</th>
                    <th>Created At</th>
                    <th>Status</th>
                    <th>Action</th> {/* Added Action column */}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex} style={row.archive === 1 ? { opacity: 0.6, background: '#f3f4f6' } : {}}>
                      <td>{row.title}</td>
                      <td>{row.student}</td>
                      <td>{row.category}</td>
                      <td>
                        {row.image ? (
                          <img
                            src={API_ENDPOINT + row.image}
                            alt={row.title}
                            style={{
                              width: 60,
                              height: 40,
                              objectFit: "cover",
                              cursor: "pointer",
                              borderRadius: 4,
                            }}
                            onClick={() =>
                              setModalImage(API_ENDPOINT + row.image)
                            }
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td>
                        {row.link ? (
                          <a
                            href={row.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-link"
                            style={{
                              background: "#dc2626",
                              color: "#fff",
                              padding: "0.4rem 1rem",
                              borderRadius: "6px",
                              textDecoration: "none",
                              fontWeight: 600,
                            }}
                          >
                            Visit
                          </a>
                        ) : (
                          "No Link"
                        )}
                      </td>
                      <td>
                        {row.document ? (
                          <a
                            href={API_ENDPOINT + row.document}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-link"
                            style={{
                              background: "#111827",
                              color: "#fff",
                              padding: "0.4rem 1rem",
                              borderRadius: "6px",
                              textDecoration: "none",
                              fontWeight: 600,
                            }}
                          >
                            View Document
                          </a>
                        ) : (
                          "No Document"
                        )}
                      </td>
                      <td>{row.created_at}</td>
                      <td>
                        {row.archive === 1 ? (
                          <span style={{ color: '#b91c1c', fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>
                            Archived
                          </span>
                        ) : (
                          <span style={{ color: '#059669', fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>
                            Active
                          </span>
                        )}
                      </td>
                      <td style={{ position: "relative" }}>
                        <ActionMenu rowIndex={rowIndex} row={row} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No data available</p>
          )}
          {/* Modal for image preview */}
          {modalImage && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
              }}
              onClick={() => setModalImage(null)}
            >
              <img
                src={modalImage}
                alt="Preview"
                style={{
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  borderRadius: 8,
                  boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                  background: "#fff",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActionMenu({ rowIndex, row }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete project: ${row.title}?`)) return;
    try {
      const response = await fetch(`${API_ENDPOINT}delete_student_project.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: row.id })
      });
      const result = await response.json();
      if (result.success) {
        // Remove from UI
        if (typeof window !== 'undefined' && window.dispatchEvent) {
          window.dispatchEvent(new CustomEvent('studentProjectUpdated'));
        }
      } else {
        alert(result.message || "Failed to delete project.");
      }
    } catch (e) {
      alert("Error deleting project.");
    }
    setOpen(false);
  };
  const handleArchive = async () => {
    if (row.archive === 1) {
      // Unarchive
      if (!window.confirm(`Unarchive project: ${row.title}?`)) return;
      try {
        const response = await fetch(`${API_ENDPOINT}archive_student_project.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: row.id, archive: 0 })
        });
        const result = await response.json();
        if (result.success) {
          if (typeof window !== 'undefined' && window.dispatchEvent) {
            window.dispatchEvent(new CustomEvent('studentProjectUpdated'));
          }
        } else {
          alert(result.message || "Failed to unarchive project.");
        }
      } catch (e) {
        alert("Error unarchiving project.");
      }
    } else {
      // Archive
      if (!window.confirm(`Archive project: ${row.title}?`)) return;
      try {
        const response = await fetch(`${API_ENDPOINT}archive_student_project.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: row.id, archive: 1 })
        });
        const result = await response.json();
        if (result.success) {
          if (typeof window !== 'undefined' && window.dispatchEvent) {
            window.dispatchEvent(new CustomEvent('studentProjectUpdated'));
          }
        } else {
          alert(result.message || "Failed to archive project.");
        }
      } catch (e) {
        alert("Error archiving project.");
      }
    }
    setOpen(false);
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      ref={menuRef}
    >
      <button
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 4,
        }}
        aria-label="Actions"
        onClick={() => setOpen((v) => !v)}
      >
        <FaEllipsisV size={18} color="#555" />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 28,
            background: "#fff",
            border: "1px solid #eee",
            borderRadius: 6,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            zIndex: 10,
            minWidth: 120,
          }}
        >
          <button
            onClick={handleDelete}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              background: "none",
              border: "none",
              color: "#dc2626",
              padding: "8px 16px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            <FaTrash style={{ marginRight: 8 }} /> Delete
          </button>
          <button
            onClick={handleArchive}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              background: "none",
              border: "none",
              color: row.archive === 1 ? "#059669" : "#111827",
              padding: "8px 16px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            <FaArchive style={{ marginRight: 8 }} /> {row.archive === 1 ? "Unarchive" : "Archive"}
          </button>
        </div>
      )}
    </div>
  );
}

export default List;
