import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Css/List.css";
import { API_ENDPOINT } from "./Config";

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
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
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

export default List;
