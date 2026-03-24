"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span>🧠</span>
            <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>Explainify</span>
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            Understand anything in seconds.
          </p>
        </div>

        {/* Links */}
        <nav style={{ display: "flex", gap: "24px" }}>
          {[
            { href: "/", label: "Home" },
            { href: "/app", label: "App" },
            { href: "/pricing", label: "Pricing" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{ fontSize: "14px", color: "var(--text-muted)", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text-secondary)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} Explainify. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
