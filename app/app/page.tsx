"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface HistoryItem {
  id: string;
  text: string;
  tone: string;
  output: string;
  timestamp: number;
}

const TONE_OPTIONS = [
  { value: "eli5", label: "🧒 Explain like I'm 5" },
  { value: "beginner", label: "📖 Beginner" },
  { value: "intermediate", label: "🎓 Intermediate" },
];

const MAX_HISTORY = 5;

export default function AppPage() {
  const [text, setText] = useState("");
  const [tone, setTone] = useState("eli5");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [remaining, setRemaining] = useState<number | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("explainify_history");
      if (saved) setHistory(JSON.parse(saved));
    } catch {}
  }, []);

  const saveHistory = (item: HistoryItem) => {
    const updated = [item, ...history].slice(0, MAX_HISTORY);
    setHistory(updated);
    try {
      localStorage.setItem("explainify_history", JSON.stringify(updated));
    } catch {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Please enter some text to explain.");
      return;
    }
    setError("");
    setOutput("");
    setLoading(true);

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, tone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setOutput(data.output);
        if (typeof data.remaining === "number") setRemaining(data.remaining);
        saveHistory({
          id: crypto.randomUUID(),
          text: text.slice(0, 100),
          tone,
          output: data.output,
          timestamp: Date.now(),
        });
        setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadFromHistory = (item: HistoryItem) => {
    setText(item.text);
    setTone(item.tone);
    setOutput(item.output);
    setError("");
  };

  const clearHistory = () => {
    setHistory([]);
    try { localStorage.removeItem("explainify_history"); } catch {}
  };

  return (
    <div style={{ maxWidth: "780px", margin: "0 auto", padding: "40px 24px 80px" }}>
      {/* Page header */}
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, marginBottom: "8px" }}>
          Explain Simply 🧠
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "16px" }}>
          Paste any complex text and get a friendly, simple explanation.
        </p>
        {remaining !== null && (
          <div
            style={{
              marginTop: "12px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: remaining > 1 ? "rgba(52,211,153,0.1)" : "rgba(251,191,36,0.1)",
              border: `1px solid ${remaining > 1 ? "rgba(52,211,153,0.25)" : "rgba(251,191,36,0.25)"}`,
              borderRadius: "9999px",
              padding: "4px 14px",
              fontSize: "13px",
              color: remaining > 1 ? "var(--success)" : "var(--warning)",
            }}
          >
            {remaining > 0
              ? `⚡ ${remaining} free explanation${remaining === 1 ? "" : "s"} left today`
              : "⚠️ Daily limit reached — "}
            {remaining === 0 && (
              <Link href="/pricing" style={{ color: "var(--accent-light)", fontWeight: 600 }}>
                Upgrade to Pro
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit}>
        {/* Textarea */}
        <div style={{ marginBottom: "16px" }}>
          <label
            htmlFor="input-text"
            style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "var(--text-secondary)" }}
          >
            Your complex text
          </label>
          <textarea
            id="input-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type something complex..."
            rows={6}
            style={{
              width: "100%",
              background: "var(--surface)",
              border: `1px solid ${error && !text ? "var(--error)" : "var(--border)"}`,
              borderRadius: "var(--radius-md)",
              padding: "14px 16px",
              color: "var(--text-primary)",
              fontSize: "15px",
              lineHeight: 1.6,
              resize: "vertical",
              outline: "none",
              transition: "border-color 0.2s",
              fontFamily: "inherit",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = error && !text ? "var(--error)" : "var(--border)")}
          />

        </div>

        {/* Tone selector + Submit */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ flex: "1 1 200px" }}>
            <label
              htmlFor="tone-select"
              style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "var(--text-secondary)" }}
            >
              Explanation level
            </label>
            <select
              id="tone-select"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              style={{
                width: "100%",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "12px 16px",
                color: "var(--text-primary)",
                fontSize: "14px",
                outline: "none",
                cursor: "pointer",
                appearance: "none",
                fontFamily: "inherit",
              }}
            >
              {TONE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} style={{ background: "var(--surface)" }}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ flex: "0 0 auto", padding: "12px 32px", fontSize: "15px" }}
          >
            {loading ? (
              <>
                <span className="spinner" style={{ width: "16px", height: "16px" }} />
                Explaining…
              </>
            ) : (
              "Explain Simply ✨"
            )}
          </button>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div
          style={{
            marginTop: "16px",
            padding: "12px 16px",
            background: "rgba(248,113,113,0.1)",
            border: "1px solid rgba(248,113,113,0.25)",
            borderRadius: "var(--radius-md)",
            color: "var(--error)",
            fontSize: "14px",
            display: "flex",
            gap: "8px",
            alignItems: "flex-start",
          }}
        >
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Output */}
      {output && (
        <div
          ref={outputRef}
          className="animate-fade-in"
          style={{
            marginTop: "32px",
            background: "var(--surface)",
            border: "1px solid var(--accent)",
            borderRadius: "var(--radius-lg)",
            padding: "24px",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--success)",
                  display: "inline-block",
                }}
              />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>
                Simplified Explanation ·{" "}
                {TONE_OPTIONS.find((o) => o.value === tone)?.label}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="btn-secondary"
              style={{ padding: "6px 14px", fontSize: "13px" }}
            >
              {copied ? "✓ Copied!" : "📋 Copy"}
            </button>
          </div>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.75,
              color: "var(--text-primary)",
              whiteSpace: "pre-wrap",
            }}
          >
            {output}
          </p>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div style={{ marginTop: "48px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: 700 }}>Recent Explanations</h2>
            <button
              onClick={clearHistory}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                fontSize: "13px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--error)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}
            >
              Clear all
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => loadFromHistory(item)}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  padding: "12px 16px",
                  cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s",
                  textAlign: "left",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
                  (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.background = "var(--surface)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "14px", color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                    {item.text}…
                  </span>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", flexShrink: 0 }}>
                    {TONE_OPTIONS.find((o) => o.value === item.tone)?.label?.split(" ")[0]}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
