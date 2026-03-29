"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/firebase/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, signInWithGoogle, signOut, loading } = useAuth();

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
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {loading ? (
              <div style={{ width: "80px", height: "36px", background: "var(--border)", borderRadius: "9999px", opacity: 0.5 }}></div>
            ) : user ? (
              <>
                <Link
                  href="/app"
                  className="btn-primary"
                  style={{ padding: "8px 20px", fontSize: "14px", cursor: "pointer", border: "none", textDecoration: "none" }}
                >
                  Dashboard
                </Link>
                <button
                  onClick={signOut}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                  title="Sign Out"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--border)" }} />
                  ) : (
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,var(--brand-from),var(--brand-to))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "14px" }}>
                      {user.displayName?.charAt(0) || "U"}
                    </div>
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="btn-primary"
                style={{ padding: "8px 20px", fontSize: "14px", cursor: "pointer", border: "none" }}
              >
                Sign In
              </button>
            )}
          </div>
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
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
            {user ? (
               <>
                 <Link
                   href="/app"
                   className="btn-primary"
                   style={{ cursor: "pointer", border: "none", width: "100%", padding: "12px", textAlign: "center", textDecoration: "none" }}
                   onClick={() => setOpen(false)}
                 >
                   Dashboard
                 </Link>
                 <button
                   className="btn-secondary"
                   style={{ width: "100%", padding: "12px", cursor: "pointer", border: "1px solid var(--border)", background: "transparent", color: "var(--text-primary)", borderRadius: "9999px" }}
                   onClick={() => { signOut(); setOpen(false); }}
                 >
                   Sign Out
                 </button>
               </>
            ) : (
               <button
                 className="btn-primary"
                 style={{ width: "100%", padding: "12px", cursor: "pointer", border: "none" }}
                 onClick={() => { signInWithGoogle(); setOpen(false); }}
               >
                 Sign In
               </button>
            )}
          </div>
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
