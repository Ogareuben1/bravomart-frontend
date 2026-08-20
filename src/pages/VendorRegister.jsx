import React, { useState } from "react";

export default function VendorRegister({ onRegisterSuccess, onGoToLogin, onGoToHome }) {
  const [formData, setFormData] = useState({
    fullName: "",
    homeAddress: "",
    shopName: "",
    shopAddress: "",
    businessType: "retail",
    phone: "",
    email: "",
    username: "",
    password: "",
    idCardFile: null
  });

  const [idPreview, setIdPreview] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, idCardFile: file }));
      setIdPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.fullName ||
      !formData.homeAddress ||
      !formData.shopName ||
      !formData.shopAddress ||
      !formData.phone ||
      !formData.username ||
      !formData.password
    ) {
      setError("Please fill in all mandatory fields (including ID card document).");
      return;
    }
    if (!formData.idCardFile) {
      setError("Uploading a national means of identification is required.");
      return;
    }

    const newVendorRequest = {
      id: `v-req-${Date.now()}`,
      ...formData,
      status: "pending_verification",
      idCardUrl: idPreview,
      createdAt: new Date().toLocaleDateString(),
      walletId: `${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      walletBalance: 0
    };

    onRegisterSuccess(newVendorRequest);
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
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

      <h2 style={{ margin: "0 0 10px 0", color: "#0f172a", fontSize: "26px", fontWeight: "700" }}>
        🏪 Register Your Shop on BravoMart
      </h2>
      <p style={{ color: "#64748b", fontSize: "15px", marginBottom: "28px", lineHeight: "1.5" }}>
        Fill out your business details below for physical verification by the BravoMart admin team.
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

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "18px" }}>
        <div>
          <label style={{ fontSize: "14px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "6px" }}>
            Full Name (As shown on National ID Card) *
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Chukwuma Emmanuel"
            style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none" }}
            required
          />
        </div>

        <div>
          <label style={{ fontSize: "14px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "6px" }}>
            Residential Home Address (Private — BravoMart Admin Use Only) *
          </label>
          <textarea
            rows="2"
            value={formData.homeAddress}
            onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
            placeholder="House number, street, city, state"
            style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none" }}
            required
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
          <div>
            <label style={{ fontSize: "14px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "6px" }}>
              Shop Name *
            </label>
            <input
              type="text"
              value={formData.shopName}
              onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
              placeholder="e.g. Bravo Electronics & Logistics"
              style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none" }}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: "14px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "6px" }}>
              Business Type *
            </label>
            <select
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none", background: "#fff" }}
            >
              <option value="groceries">Groceries & Food</option>
              <option value="electronics">Electronics & Tech</option>
              <option value="fashion">Fashion & Boutique</option>
              <option value="general">General Merchant</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ fontSize: "14px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "6px" }}>
            Shop Physical Address (For Customers, Dispatch Riders & GPS Navigation) *
          </label>
          <textarea
            rows="2"
            value={formData.shopAddress}
            onChange={(e) => setFormData({ ...formData, shopAddress: e.target.value })}
            placeholder="Shop 14, Alaba International Market, Ojo, Lagos"
            style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none" }}
            required
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
          <div>
            <label style={{ fontSize: "14px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "6px" }}>
              Contact Phone Number (Compulsory) *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="08012345678"
              style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none" }}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: "14px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "6px" }}>
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="vendor@bravomart.com"
              style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none" }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: "14px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "6px" }}>
            Upload Means of Identification (NIN / Voter's Card / Drivers License / Passport) *
          </label>
          <input type="file" accept="image/*,.pdf" onChange={handleFileChange} style={{ marginBottom: "10px", fontSize: "14px" }} />
          {idPreview && (
            <img src={idPreview} alt="ID preview" style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
          <div>
            <label style={{ fontSize: "14px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "6px" }}>
              Create Login Username *
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="bravovendor1"
              style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none" }}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: "14px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "6px" }}>
              Create Password *
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none" }}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            padding: "14px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "12px",
            boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
            transition: "background 0.2s ease"
          }}
        >
          Submit Shop Application
        </button>
      </form>

      <hr style={{ margin: "28px 0 20px 0", border: "none", borderTop: "1px solid #f1f5f9" }} />

      {/* Route to Vendor Login */}
      <div style={{ textAlign: "center", fontSize: "15px", color: "#475569" }}>
        Already have a shop?{" "}
        <a
          href="http://localhost:5173/vendor_login"
          onClick={(e) => {
            if (onGoToLogin) {
              e.preventDefault();
              onGoToLogin();
            }
          }}
          style={{
            color: "#2563eb",
            fontWeight: "600",
            textDecoration: "underline",
            marginLeft: "4px"
          }}
        >
          Log In
        </a>
      </div>
    </div>
  );
}