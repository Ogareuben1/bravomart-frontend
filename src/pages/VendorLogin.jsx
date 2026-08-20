import React, { useState } from "react";

export default function VendorLogin({ onLogin, onGoToRegister, onGoToHome }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    const success = onLogin(username, password);
    if (!success) {
      setError("Invalid credentials or shop verification is still pending by BravoMart Admin.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "480px",
        margin: "60px auto",
        padding: "36px",
        background: "#ffffff",
        borderRadius: "16px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)"
      }}
    >
      {/* Route Back to Marketplace */}
      <a
        href="http://localhost:5173/marketplace"
        onClick={(e) => {
          if (onGoToHome) {
            e.preventDefault();
            onGoToHome();
          }
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          color: "#475569",
          textDecoration: "none",
          marginBottom: "20px",
          fontWeight: "600",
          fontSize: "15px",
          transition: "color 0.2s ease"
        }}
      >
        ← Back to BravoMart
      </a>

      <h2 style={{ margin: "0 0 8px 0", color: "#0f172a", fontSize: "26px", fontWeight: "700" }}>
        🔑 BravoMart Sign In
      </h2>
      <p style={{ color: "#64748b", fontSize: "15px", marginBottom: "28px", lineHeight: "1.5" }}>
        Enter your credentials to access your store dashboard or customer account.
      </p>

      {error && (
        <div
          style={{
            background: "#fef2f2",
            color: "#dc2626",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            marginBottom: "20px",
            border: "1px solid #fecaca"
          }}
        >
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleLogin} style={{ display: "grid", gap: "18px" }}>
        <div>
          <label style={{ fontSize: "14px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "6px" }}>
            Username or Phone
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username or phone"
            style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none" }}
            required
          />
        </div>

        <div>
          <label style={{ fontSize: "14px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "6px" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none" }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "14px",
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "6px",
            boxShadow: "0 4px 6px -1px rgba(22, 163, 74, 0.2)",
            transition: "background 0.2s ease"
          }}
        >
          Login to Account
        </button>
      </form>

      <hr style={{ margin: "28px 0 20px 0", border: "none", borderTop: "1px solid #f1f5f9" }} />

      {/* Route to Vendor Register */}
      <div style={{ textAlign: "center", fontSize: "15px", color: "#475569" }}>
        Want to sell on BravoMart?{" "}
        <a
          href="http://localhost:5173/vendor_register"
          onClick={(e) => {
            if (onGoToRegister) {
              e.preventDefault();
              onGoToRegister();
            }
          }}
          style={{
            color: "#2563eb",
            fontWeight: "600",
            textDecoration: "underline",
            marginLeft: "4px"
          }}
        >
          Create Your Shop
        </a>
      </div>
    </div>
  );
}