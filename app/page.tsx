import Link from "next/link";

export default function Home() {
  return (
    <div style={{ overflow: "hidden" }}>
      {/* ── HERO ─────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          padding: "100px 24px 120px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Gradient blobs */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "600px",
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "0",
            left: "-10%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", maxWidth: "720px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: "9999px",
              padding: "6px 16px",
              fontSize: "13px",
              color: "var(--accent-light)",
              marginBottom: "28px",
              fontWeight: 500,
            }}
          >
            <span>✨</span> Powered by AI
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: "24px",
              letterSpacing: "-0.02em",
            }}
          >
            Understand Anything{" "}
            <span className="gradient-text">Instantly</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "var(--text-secondary)",
              maxWidth: "540px",
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Paste complex text and get a crystal-clear explanation — like you&apos;re talking to a
            curious 5-year-old. Powered by GPT-4.
          </p>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/app" className="btn-primary" style={{ fontSize: "16px", padding: "14px 36px" }}>
              Start for Free ✨
            </Link>
          </div>

          {/* Trust bar */}
          <p style={{ marginTop: "40px", fontSize: "13px", color: "var(--text-muted)" }}>
            🚀 Instant Access · ⚡ Results in seconds · 🌍 Any topic
          </p>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, marginBottom: "12px" }}>
            Why{" "}
            <span className="gradient-text">Explainify?</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px" }}>
            Built for anyone who wants to learn — fast.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="card"
              style={{
                animationDelay: `${i * 100}ms`,
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  background: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  marginBottom: "16px",
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>{f.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, marginBottom: "12px" }}>
            How it works
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "56px" }}>
            Three steps to clarity
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "32px",
            }}
          >
            {steps.map((s, i) => (
              <div key={i}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,var(--brand-from),var(--brand-to))",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  {i + 1}
                </div>
                <h3 style={{ fontWeight: 700, marginBottom: "8px", fontSize: "18px" }}>{s.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ────────────────────────────── */}
      <section style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, marginBottom: "12px" }}>
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <p style={{ color: "var(--text-secondary)" }}>Start free, upgrade when you need more.</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            maxWidth: "640px",
            margin: "0 auto",
          }}
        >
          {/* Free */}
          <div className="card">
            <h3 style={{ fontWeight: 700, fontSize: "20px", marginBottom: "4px" }}>Free</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "20px" }}>
              Get started instantly
            </p>
            <div style={{ fontSize: "36px", fontWeight: 900, marginBottom: "20px" }}>
              ₹0
              <span style={{ fontSize: "14px", fontWeight: 400, color: "var(--text-muted)" }}>/mo</span>
            </div>
            <ul style={{ listStyle: "none", marginBottom: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {["5 explanations / day", "All tone options", "Copy output"].map((item) => (
                <li key={item} style={{ fontSize: "14px", color: "var(--text-secondary)", display: "flex", gap: "8px", alignItems: "center" }}>
                  <span style={{ color: "var(--success)" }}>✓</span> {item}
                </li>
              ))}
            </ul>
            <Link href="/app" className="btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
              Get Started
            </Link>
          </div>

          {/* Pro */}
          <div
            className="card"
            style={{
              border: "1px solid var(--accent)",
              boxShadow: "var(--shadow-glow)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "linear-gradient(135deg,var(--brand-from),var(--brand-to))",
                color: "#fff",
                fontSize: "11px",
                fontWeight: 700,
                borderRadius: "9999px",
                padding: "3px 10px",
              }}
            >
              POPULAR
            </div>
            <h3 style={{ fontWeight: 700, fontSize: "20px", marginBottom: "4px" }}>Pro</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "20px" }}>
              Unlimited learning
            </p>
            <div style={{ fontSize: "36px", fontWeight: 900, marginBottom: "20px" }}>
              <span className="gradient-text">₹199</span>
              <span style={{ fontSize: "14px", fontWeight: 400, color: "var(--text-muted)" }}>/mo</span>
            </div>
            <ul style={{ listStyle: "none", marginBottom: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Unlimited explanations", "All tone options", "Copy output", "History (last 25)", "Priority AI responses"].map((item) => (
                <li key={item} style={{ fontSize: "14px", color: "var(--text-secondary)", display: "flex", gap: "8px", alignItems: "center" }}>
                  <span style={{ color: "var(--success)" }}>✓</span> {item}
                </li>
              ))}
            </ul>
            <Link href="/pricing" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Get Pro
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
          textAlign: "center",
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, marginBottom: "16px" }}>
          Ready to learn{" "}
          <span className="gradient-text">smarter</span>?
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "32px", fontSize: "16px" }}>
          Get started instantly and start explaining any complex text.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link href="/app" className="btn-primary" style={{ fontSize: "16px", padding: "14px 36px" }}>
            Go to App →
          </Link>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: "🧒",
    title: "Dead Simple Explanations",
    desc: "Complex jargon, scientific concepts, legal documents — explained in plain English anyone can understand.",
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    desc: "Powered by GPT-4o-mini, get your simplified explanation in seconds, not minutes.",
  },
  {
    icon: "🎯",
    title: "Works for Any Topic",
    desc: "Science, history, finance, technology, medicine — Explainify handles all domains effortlessly.",
  },
];

const steps = [
  { title: "Paste your text", desc: "Copy any complex passage, article, or topic and paste it in." },
  { title: "Choose your level", desc: "Select ELI5, Beginner, or Intermediate depending on how simple you want it." },
  { title: "Get clarity", desc: "Hit \"Explain Simply\" and get a friendly, easy-to-read explanation instantly." },
];
