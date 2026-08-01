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
    if (!formData.fullName || !formData.homeAddress || !formData.shopName || !formData.shopAddress || !formData.phone || !formData.username || !formData.password) {
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
    <div style={{ maxWidth: "650px", margin: "30px auto", padding: "24px", background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
      <button onClick={onGoToHome} style={{ border: "none", background: "none", color: "#64748b", cursor: "pointer", marginBottom: "15px", fontWeight: "bold" }}>
        ← Back to BravoMart
      </button>

      <h2 style={{ margin: "0 0 10px 0", color: "#0f172a" }}>🏪 Register Your Shop on BravoMart</h2>
      <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>
        Fill out your business details below for physical verification by the BravoMart admin team.
      </p>

      {error && (
        <div style={{ background: "#fef2f2", color: "#dc2626", padding: "10px 14px", borderRadius: "6px", fontSize: "13px", marginBottom: "15px" }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
        <div>
          <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Full Name (As shown on National ID Card) *</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Chukwuma Emmanuel"
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            required
          />
        </div>

        <div>
          <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Residential Home Address (Private — BravoMart Admin Use Only) *</label>
          <textarea
            rows="2"
            value={formData.homeAddress}
            onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
            placeholder="House number, street, city, state"
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            required
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Shop Name *</label>
            <input
              type="text"
              value={formData.shopName}
              onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
              placeholder="e.g. Bravo Electronics & Logistics"
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Business Type *</label>
            <select
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            >
              <option value="groceries">Groceries & Food</option>
              <option value="electronics">Electronics & Tech</option>
              <option value="fashion">Fashion & Boutique</option>
              <option value="general">General Merchant</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Shop Physical Address (For Customers, Dispatch Riders & GPS Navigation) *</label>
          <textarea
            rows="2"
            value={formData.shopAddress}
            onChange={(e) => setFormData({ ...formData, shopAddress: e.target.value })}
            placeholder="Shop 14, Alaba International Market, Ojo, Lagos"
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            required
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Contact Phone Number (Compulsory) *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="08012345678"
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Email Address (Optional)</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="vendor@bravomart.com"
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Upload Means of Identification (NIN / Voter's Card / Drivers License / Passport) *</label>
          <input type="file" accept="image/*,.pdf" onChange={handleFileChange} style={{ marginBottom: "8px" }} />
          {idPreview && (
            <img src={idPreview} alt="ID preview" style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Create Login Username *</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="bravovendor1"
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Create Password *</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              required
            />
          </div>
        </div>

        <button type="submit" style={{ padding: "12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", marginTop: "10px" }}>
          Submit Shop Application
        </button>
      </form>

      <div style={{ marginTop: "20px", textAlign: "center", fontSize: "14px" }}>
        Already have a shop?{" "}
        <button onClick={onGoToLogin} style={{ border: "none", background: "none", color: "#2563eb", fontWeight: "bold", cursor: "pointer", textDecoration: "underline" }}>
          Log In
        </button>
      </div>
    </div>
  );
}