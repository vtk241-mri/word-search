import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  getProjectDocument,
  PROJECT_DOCUMENTS,
} from "../data/projectDocuments";

export default function ProjectDocumentPage() {
  const { documentId } = useParams();
  const document = getProjectDocument(documentId);

  if (!document) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="container document-page">
      <div className="card document-card">
        <div className="document-header">
          <div>
            <h2 style={{ margin: 0 }}>{document.title}</h2>
            <p className="small-muted" style={{ margin: "6px 0 0" }}>
              Локальна сторінка документації для проєкту Word Search.
            </p>
          </div>
          <Link to="/" className="btn">
            На головну
          </Link>
        </div>

        <nav className="document-nav" aria-label="Документи проєкту">
          {PROJECT_DOCUMENTS.map((item) => (
            <Link
              key={item.id}
              to={`/documents/${item.id}`}
              className={`document-nav-link ${
                item.id === document.id ? "active" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <pre className="document-content">{document.content}</pre>
      </div>
    </main>
  );
}
