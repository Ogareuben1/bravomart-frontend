import React from "react";

export default function BravoSuperAdmin({ pendingVendors, approvedVendors, onApproveVendor, onGoToHome }) {
  const handleNotifyAndApprove = (vendor, channel) => {
    onApproveVendor(vendor.id);

    const msg = `Hello ${vendor.fullName}, your shop '${vendor.shopName}' has been physically verified and APPROVED on BravoMart! Log in now to access your AI Admin Assistant and 12-digit Wallet (${vendor.walletId}).`;

    if (channel === "whatsapp") {
      window.open(`https://wa.me/${vendor.phone}?text=${encodeURIComponent(msg)}`, "_blank");
    } else if (channel === "sms") {
      window.open(`sms:${vendor.phone}?body=${encodeURIComponent(msg)}`, "_blank");
    } else if (channel === "call") {
      window.open(`tel:${vendor.phone}`, "_self");
    } else if (channel === "email" && vendor.email) {
      window.open(`mailto:${vendor.email}?subject=BravoMart Shop Approval&body=${encodeURIComponent(msg)}`, "_self");
    }
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "20px auto", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>🛡️ BravoMart Super Admin Verification Center</h2>
        <button onClick={onGoToHome} style={{ padding: "8px 16px", background: "#0f172a", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Back to Main App
        </button>
      </div>

      <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", border: "1px solid #e2e8f0", marginBottom: "30px" }}>
        <h3>⏳ Pending Shop Physical Verification Requests ({pendingVendors.length})</h3>

        {pendingVendors.length === 0 ? (
          <p style={{ color: "#64748b" }}>No pending shop approvals.</p>
        ) : (
          <div style={{ display: "grid", gap: "20px" }}>
            {pendingVendors.map((vendor) => (
              <div key={vendor.id} style={{ border: "1px solid #cbd5e1", borderRadius: "8px", padding: "16px", background: "#f8fafc" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div>
                    <h4>🏪 {vendor.shopName} ({vendor.businessType.toUpperCase()})</h4>
                    <p><b>Applicant Name:</b> {vendor.fullName}</p>
                    <p><b>Phone:</b> {vendor.phone} | <b>Email:</b> {vendor.email || "N/A"}</p>
                    <p style={{ color: "#dc2626" }}><b>Home Address (Private):</b> {vendor.homeAddress}</p>
                    <p><b>Shop GPS Address:</b> {vendor.shopAddress}</p>
                    <p><b>Wallet ID Assigned:</b> <code>{vendor.walletId}</code></p>
                  </div>

                  <div>
                    <b>Uploaded ID Card Document:</b>
                    {vendor.idCardUrl ? (
                      <img src={vendor.idCardUrl} alt="National ID" style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "6px", marginTop: "5px", border: "1px solid #94a3b8" }} />
                    ) : (
                      <div style={{ padding: "20px", background: "#fee2e2", color: "#991b1b", borderRadius: "6px", marginTop: "5px" }}>No ID Uploaded</div>
                    )}
                  </div>
                </div>

                <div style={{ marginTop: "15px", paddingTop: "15px", borderTop: "1px solid #e2e8f0", display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", fontWeight: "bold" }}>Approve & Notify via:</span>
                  <button onClick={() => handleNotifyAndApprove(vendor, "whatsapp")} style={{ background: "#25d366", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
                    💬 WhatsApp Message
                  </button>
                  <button onClick={() => handleNotifyAndApprove(vendor, "sms")} style={{ background: "#0284c7", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
                    📱 Send SMS
                  </button>
                  <button onClick={() => handleNotifyAndApprove(vendor, "call")} style={{ background: "#eab308", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
                    📞 Direct Call
                  </button>
                  {vendor.email && (
                    <button onClick={() => handleNotifyAndApprove(vendor, "email")} style={{ background: "#6366f1", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
                      ✉️ Send Email
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
        <h3>✅ Active Verified Stores ({approvedVendors.length})</h3>
        <ul style={{ paddingLeft: "20px" }}>
          {approvedVendors.map((v) => (
            <li key={v.id} style={{ marginBottom: "8px" }}>
              <b>{v.shopName}</b> — Owner: {v.fullName} ({v.phone}) | Wallet: <code>{v.walletId}</code>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}