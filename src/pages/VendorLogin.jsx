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
    <div style={{ maxWidth: "450px", margin: "50px auto", padding: "28px", background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
      <button onClick={onGoToHome} style={{ border: "none", background: "none", color: "#64748b", cursor: "pointer", marginBottom: "15px", fontWeight: "bold" }}>
        ← Back to BravoMart
      </button>

      <h2 style={{ margin: "0 0 8px 0", color: "#0f172a" }}>🔑 BravoMart Sign In</h2>
      <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>
        Enter your credentials to access your store dashboard or customer account.
      </p>

      {error && (
        <div style={{ background: "#fef2f2", color: "#dc2626", padding: "10px 14px", borderRadius: "6px", fontSize: "13px", marginBottom: "15px" }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleLogin} style={{ display: "grid", gap: "15px" }}>
        <div>
          <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Username or Phone</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            required
          />
        </div>

        <div>
          <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            required
          />
        </div>

        <button type="submit" style={{ padding: "12px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
          Login to Account
        </button>
      </form>

      <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid #f1f5f9" }} />

      <div style={{ textAlign: "center", fontSize: "14px" }}>
        Want to sell on BravoMart?{" "}
        <button onClick={onGoToRegister} style={{ border: "none", background: "none", color: "#2563eb", fontWeight: "bold", cursor: "pointer", textDecoration: "underline" }}>
          Create Your Shop
        </button>
      </div>
    </div>
  );
}