import React from "react";

export default function Footer() {
  return (
    <footer className="container footer">
      <div className="card">
        <strong>Word Search</strong>
        <p className="small-muted" style={{ marginBottom: 8 }}>
          Освітній React/Vite-проєкт, започаткований у 2025 році. Автор:
          {" "}
          Rostyslav.
        </p>
        <div className="footer-links">
          <span className="code-chip">README.md</span>
          <span className="code-chip">LICENSE</span>
          <span className="code-chip">PRIVACY_POLICY.md</span>
          <span className="code-chip">USER_GUIDE.md</span>
          <span className="code-chip">THIRD_PARTY_LICENSES.md</span>
          <span className="code-chip">docs/PROJECT_DOCUMENTATION.generated.md</span>
        </div>
      </div>
    </footer>
  );
}
