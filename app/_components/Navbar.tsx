"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(10,10,18,0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <nav
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg,var(--brand-from),var(--brand-to))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            🧠
          </span>
          <span style={{ fontWeight: 700, fontSize: "18px", color: "var(--text-primary)" }}>
            Explainify
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
          className="desktop-nav"
        >
          <NavLinks />
          <Link href="/app" className="btn-primary" style={{ padding: "8px 20px", fontSize: "14px" }}>
            Try for Free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-primary)",
            fontSize: "20px",
            padding: "8px",
          }}
          className="hamburger"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: "var(--surface)",
            borderTop: "1px solid var(--border)",
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <NavLinks mobile onClose={() => setOpen(false)} />
          <Link
            href="/app"
            className="btn-primary"
            style={{ textAlign: "center" }}
            onClick={() => setOpen(false)}
          >
            Try for Free
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

function NavLinks({ mobile = false, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/app", label: "App" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={onClose}
          style={{
            color: "var(--text-secondary)",
            fontSize: mobile ? "16px" : "14px",
            fontWeight: 500,
            transition: "color 0.2s",
            padding: mobile ? "8px 0" : undefined,
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text-primary)")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-secondary)")}
        >
          {label}
        </Link>
      ))}
    </>
  );
}
