"use client";

import { useEffect } from "react";
import Link from "next/link";

declare global {
  interface Window {
    Razorpay: new (opts: Record<string, unknown>) => { open(): void };
  }
}

const PRO_PRICE_PAISE = 19900; // ₹199

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function PricingPage() {
  useEffect(() => {
    loadRazorpay();
  }, []);

  const handleCheckout = async () => {
    const ok = await loadRazorpay();
    if (!ok) {
      alert("Failed to load payment gateway. Please try again.");
      return;
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!keyId || keyId === "rzp_test_...") {
      alert("Razorpay key not configured yet. Contact support.");
      return;
    }

    const rzp = new window.Razorpay({
      key: keyId,
      amount: PRO_PRICE_PAISE,
      currency: "INR",
      name: "Explainify",
      description: "Pro Plan — Unlimited Explanations",
      image: "",
      handler: () => {
        alert("🎉 Payment successful! Your Pro plan is now active.");
      },
      prefill: { email: "", contact: "" },
      theme: { color: "#6366f1" },
    });
    rzp.open();
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "60px 24px 100px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 900, marginBottom: "16px" }}>
          Simple,{" "}
          <span className="gradient-text">transparent</span> pricing
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "18px" }}>
          Start free. Upgrade whenever you need unlimited access.
        </p>
      </div>

      {/* Plans */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          maxWidth: "720px",
          margin: "0 auto 80px",
        }}
      >
        {/* Free Plan */}
        <div className="card" style={{ padding: "36px 32px" }}>
          <div style={{ marginBottom: "24px" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Free
            </div>
            <div style={{ fontSize: "48px", fontWeight: 900, lineHeight: 1, marginBottom: "4px" }}>₹0</div>
            <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>forever</div>
          </div>

          <ul style={{ listStyle: "none", marginBottom: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {freeFeatures.map((f) => (
              <li key={f.text} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ color: f.included ? "var(--success)" : "var(--text-muted)", marginTop: "1px", flexShrink: 0 }}>
                  {f.included ? "✓" : "✕"}
                </span>
                <span style={{ fontSize: "15px", color: f.included ? "var(--text-primary)" : "var(--text-muted)" }}>
                  {f.text}
                </span>
              </li>
            ))}
          </ul>

          <Link href="/app" className="btn-secondary" style={{ width: "100%", justifyContent: "center", padding: "14px" }}>
            Get Started Free
          </Link>
        </div>

        {/* Pro Plan */}
        <div
          className="card"
          style={{
            padding: "36px 32px",
            border: "1px solid var(--accent)",
            boxShadow: "var(--shadow-glow)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Popular badge */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg,var(--brand-from),var(--brand-to))",
            }}
          />

          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Pro
              </span>
              <span
                style={{
                  background: "linear-gradient(135deg,var(--brand-from),var(--brand-to))",
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: 700,
                  borderRadius: "9999px",
                  padding: "2px 8px",
                }}
              >
                MOST POPULAR
              </span>
            </div>
            <div style={{ fontSize: "48px", fontWeight: 900, lineHeight: 1, marginBottom: "4px" }}>
              <span className="gradient-text">₹199</span>
            </div>
            <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>per month</div>
          </div>

          <ul style={{ listStyle: "none", marginBottom: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {proFeatures.map((f) => (
              <li key={f.text} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ color: "var(--success)", marginTop: "1px", flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: "15px", color: "var(--text-primary)" }}>{f.text}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleCheckout}
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "15px" }}
          >
            Get Pro — ₹199/mo
          </button>
          <p style={{ marginTop: "12px", textAlign: "center", fontSize: "12px", color: "var(--text-muted)" }}>
            Secure payment via Razorpay · Cancel anytime
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, marginBottom: "32px", textAlign: "center" }}>
          Frequently asked questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {faqs.map((faq, i) => (
            <div key={i} className="card" style={{ padding: "20px 24px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>{faq.q}</h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const freeFeatures = [
  { text: "5 explanations per day", included: true },
  { text: "All 3 tone options", included: true },
  { text: "Copy to clipboard", included: true },
  { text: "Last 5 history items", included: true },
  { text: "Unlimited explanations", included: false },
  { text: "Priority AI responses", included: false },
];

const proFeatures = [
  { text: "Unlimited explanations daily" },
  { text: "All 3 tone options" },
  { text: "Copy to clipboard" },
  { text: "Last 25 history items" },
  { text: "Priority AI responses" },
  { text: "Early access to new features" },
];

const faqs = [
  {
    q: "What happens when I hit the free limit?",
    a: "You'll see a message letting you know you've used your 5 free explanations for the day. The limit resets every 24 hours, or you can upgrade to Pro for unlimited access.",
  },
  {
    q: "Can I cancel my Pro subscription?",
    a: "Yes, you can cancel anytime from your account settings. You won't be charged again after cancellation.",
  },
  {
    q: "What AI powers Explainify?",
    a: "Explainify uses OpenAI's GPT-4o-mini model — fast, accurate, and optimised for clear, friendly explanations.",
  },
  {
    q: "Is my data private?",
    a: "Your input is sent to OpenAI's API for processing. We do not store your input text on our servers. History is saved locally in your browser only.",
  },
];
