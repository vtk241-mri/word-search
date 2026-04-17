import React from "react";
import { Link } from "react-router-dom";

const documents = [
  { id: "readme", label: "README" },
  { id: "license", label: "License" },
  { id: "privacy-policy", label: "Privacy Policy" },
  { id: "user-guide", label: "User Guide" },
];

export default function Footer() {
  return (
    <footer className="container footer">
      <div className="card footer-card">
        <strong className="footer-brand">Word Search</strong>
        <p className="small-muted footer-copy">
          Проєкт для пошуку слів, розпочатий у 2025 році.
        </p>
        <p className="small-muted footer-copy">© 2025 Rostyslav</p>

        <nav className="footer-links" aria-label="Документи проєкту">
          {documents.map((document) => (
            <Link
              key={document.id}
              to={`/documents/${document.id}`}
              className="footer-link"
            >
              {document.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
