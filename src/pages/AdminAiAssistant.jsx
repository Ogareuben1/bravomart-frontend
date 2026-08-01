import React, { useState, useEffect } from "react";

// ==========================================
// 1. HELPER UTILITIES: GPS & SHIPPING COST
// ==========================================

// Calculates exact distance in kilometers using the Haversine Formula
export function calculateGpsDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;

  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return parseFloat(distance.toFixed(2));
}

// Dynamic Formula: Shipping Cost = Weight (kg) * Distance (km) * Rate per kg/km
export function calculateShippingCost({ weightKg = 1, distanceKm = 1, ratePerKgPerKm = 50 }) {
  const minDeliveryFee = 500; // Minimum delivery fee floor in Naira
  const calculatedCost = weightKg * distanceKm * ratePerKgPerKm;
  return Math.max(minDeliveryFee, Math.round(calculatedCost));
}

// ==========================================
// 2. MAIN ADMIN & DISPATCH COMPONENT
// ==========================================

export default function AdminAiAssistant({ activeVendor, vendorProducts, onAddProduct, onDeleteProduct, onUpdateStock }) {
  const [activeTab, setActiveTab] = useState("ai_poster"); // 'ai_poster' | 'my_products' | 'dispatch_tracker'

  // Form Inputs
  const [productName, setProductName] = useState("");
  const [briefDesc, setBriefDesc] = useState("");
  const [priceIdea, setPriceIdea] = useState("");
  const [productWeight, setProductWeight] = useState("2.5"); // Default 2.5 kg
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);
  const [videoError, setVideoError] = useState("");

  // Vendor Live GPS Coordinates State
  const [vendorGps, setVendorGps] = useState(activeVendor?.coords || { lat: 6.4531, lng: 3.3958 }); // Default fallback: Lagos Island
  const [isCapturingGps, setIsCapturingGps] = useState(false);

  // Dispatch Rider GPS Terminal States
  const [riderCoords, setRiderCoords] = useState(null);
  const [riderGpsError, setRiderGpsError] = useState("");
  const [simulatedCustomerCoords] = useState({ lat: 6.5244, lng: 3.3792 }); // Target Delivery Address (e.g., Ikeja/Yaba)
  const [ratePerKgKm, setRatePerKgKm] = useState(50); // Default ₦50 / kg / km

  // AI Generation States
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiGeneratedData, setAiGeneratedData] = useState(null);
  const [isPublished, setIsPublished] = useState(false);

  // Capture Vendor Physical Store GPS
  const handleCaptureVendorGps = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser/device.");
      return;
    }
    setIsCapturingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setVendorGps({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setIsCapturingGps(false);
      },
      (err) => {
        alert("Failed to acquire shop location. Please check device GPS permissions.");
        setIsCapturingGps(false);
      },
      { enableHighAccuracy: true }
    );
  };

  // Acquire Dispatch Rider Device GPS
  const fetchRiderLocation = () => {
    if (!navigator.geolocation) {
      setRiderGpsError("Geolocation is not supported by your device.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setRiderCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setRiderGpsError("");
      },
      (error) => {
        setRiderGpsError("Unable to acquire live GPS location. Enable GPS permissions.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    if (activeTab === "dispatch_tracker") {
      fetchRiderLocation();
    }
  }, [activeTab]);

  // Image Upload Handler
  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + photos.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      return;
    }
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPhotos((prev) => [...prev, ...newPreviews]);
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Video Upload Handler
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoError("");
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setVideoError("Video file size exceeds the 10MB limit.");
        setVideo(null);
        return;
      }
      setVideo(URL.createObjectURL(file));
    }
  };

  // AI Auto-Fill with Location & Weight
  const handleAiAutoFill = () => {
    if (!productName && !briefDesc) {
      alert("Please enter a basic Product Name or Brief Description first!");
      return;
    }

    setIsGenerating(true);
    setIsPublished(false);

    setTimeout(() => {
      let category = "groceries";
      const text = (productName + " " + briefDesc).toLowerCase();
      if (text.includes("garri") || text.includes("rice") || text.includes("oil") || text.includes("spaghetti")) {
        category = "groceries";
      } else if (text.includes("phone") || text.includes("tv") || text.includes("solar") || text.includes("inverter")) {
        category = "electronics";
      } else if (text.includes("shoe") || text.includes("bag") || text.includes("cloth")) {
        category = "fashion";
      }

      const parsedPrice = parseFloat(priceIdea.replace(/[^0-9.]/g, "")) || 25000;
      const parsedWeight = parseFloat(productWeight) || 1.0;

      setAiGeneratedData({
        title: productName ? `${productName.toUpperCase()} - Verified GeoStock` : "Premium Store Product",
        category: category,
        originalPrice: Math.round(parsedPrice * 1.15),
        salePrice: parsedPrice,
        weightKg: parsedWeight,
        vendorCoords: vendorGps,
        description: briefDesc || "Sourced directly with local store guarantee and GPS dispatch protection.",
        stockCount: 50,
        rating: 5.0,
        reviewsCount: 1,
        vendorName: activeVendor.shopName,
        vendorRating: 4.9,
        image: photos[0] || "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80",
        additionalImages: photos,
        videoUrl: video,
        aiScamReport: {
          trustScore: 98,
          status: "Verified Physical Merchant",
          positiveFlags: ["National ID Verified", `Store GPS Anchored (${vendorGps.lat.toFixed(3)}, ${vendorGps.lng.toFixed(3)})`],
          negativeFlags: []
        }
      });

      setIsGenerating(false);
    }, 1200);
  };

  const handlePublish = () => {
    if (!aiGeneratedData) return;
    const newProduct = {
      id: `p-vendor-${Date.now()}`,
      vendorId: activeVendor.id,
      ...aiGeneratedData
    };
    onAddProduct(newProduct);
    setIsPublished(true);
  };

  // Distance Metrics for Dispatch Tracker Tab
  const riderToVendorKm = riderCoords
    ? calculateGpsDistanceKm(riderCoords.lat, riderCoords.lng, vendorGps.lat, vendorGps.lng)
    : 0;

  const vendorToCustomerKm = calculateGpsDistanceKm(
    vendorGps.lat,
    vendorGps.lng,
    simulatedCustomerCoords.lat,
    simulatedCustomerCoords.lng
  );

  const activeSampleWeight = parseFloat(productWeight) || 2.5;
  const computedShippingFee = calculateShippingCost({
    weightKg: activeSampleWeight,
    distanceKm: vendorToCustomerKm,
    ratePerKgPerKm: ratePerKgKm
  });

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px" }}>
      {/* Top Banner & Wallet */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", color: "#fff", padding: "20px", borderRadius: "12px", marginBottom: "25px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "20px" }}>🏪 {activeVendor.shopName} Dashboard</h2>
          <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#94a3b8" }}>
            Owner: {activeVendor.fullName} | Address: {activeVendor.shopAddress}
          </p>
        </div>

        {/* Wallet Badge */}
        <div style={{ background: "#334155", padding: "12px 20px", borderRadius: "8px", border: "1px solid #475569" }}>
          <div style={{ fontSize: "11px", color: "#cbd5e1", textTransform: "uppercase" }}>Bravo Wallet ID</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", fontFamily: "monospace", color: "#38bdf8" }}>{activeVendor.walletId}</div>
          <div style={{ fontSize: "14px", color: "#4ade80", marginTop: "2px" }}>
            Balance: <b>₦{(activeVendor.walletBalance || 0).toLocaleString()}</b>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", borderBottom: "2px solid #e2e8f0", paddingBottom: "10px", flexWrap: "wrap" }}>
        <button
          onClick={() => setActiveTab("ai_poster")}
          style={{ padding: "10px 20px", borderRadius: "6px", border: "none", fontWeight: "bold", cursor: "pointer", background: activeTab === "ai_poster" ? "#7c3aed" : "#f1f5f9", color: activeTab === "ai_poster" ? "#fff" : "#64748b" }}
        >
          🤖 AI Admin Assistant
        </button>
        <button
          onClick={() => setActiveTab("my_products")}
          style={{ padding: "10px 20px", borderRadius: "6px", border: "none", fontWeight: "bold", cursor: "pointer", background: activeTab === "my_products" ? "#2563eb" : "#f1f5f9", color: activeTab === "my_products" ? "#fff" : "#64748b" }}
        >
          📦 Catalog ({vendorProducts.length})
        </button>
        <button
          onClick={() => setActiveTab("dispatch_tracker")}
          style={{ padding: "10px 20px", borderRadius: "6px", border: "none", fontWeight: "bold", cursor: "pointer", background: activeTab === "dispatch_tracker" ? "#059669" : "#f1f5f9", color: activeTab === "dispatch_tracker" ? "#fff" : "#64748b" }}
        >
          🛵 GPS Dispatch & Shipping Terminal
        </button>
      </div>

      {/* TAB 1: AI PRODUCT POSTER WITH WEIGHT & GPS */}
      {activeTab === "ai_poster" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
          {/* Input Form */}
          <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ marginTop: 0 }}>Add New Product</h3>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "12px", fontWeight: "bold", display: "block" }}>Posting Store Name (Auto)</label>
              <input type="text" value={activeVendor.shopName} disabled style={{ width: "100%", padding: "10px", background: "#e2e8f0", borderRadius: "6px", border: "1px solid #cbd5e1", fontWeight: "bold" }} />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "12px", fontWeight: "bold", display: "block" }}>Product Name *</label>
              <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="e.g. 5KW Hybrid Inverter" style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "bold", display: "block" }}>Price Idea (₦) *</label>
                <input type="text" value={priceIdea} onChange={(e) => setPriceIdea(e.target.value)} placeholder="e.g. 250000" style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "bold", display: "block" }}>Weight (kg) *</label>
                <input type="number" step="0.1" value={productWeight} onChange={(e) => setProductWeight(e.target.value)} placeholder="e.g. 2.5" style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
              </div>
            </div>

            {/* Shop GPS Location Capture */}
            <div style={{ background: "#f1f5f9", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "12px" }}>
              <div style={{ fontSize: "12px", fontWeight: "bold", color: "#334155", marginBottom: "4px" }}>📍 Vendor Shop Pickup Coordinates:</div>
              <div style={{ fontSize: "13px", fontFamily: "monospace", color: "#0284c7" }}>
                Lat: {vendorGps.lat.toFixed(4)}, Lng: {vendorGps.lng.toFixed(4)}
              </div>
              <button onClick={handleCaptureVendorGps} type="button" disabled={isCapturingGps} style={{ marginTop: "6px", padding: "6px 10px", background: "#0284c7", color: "#fff", border: "none", borderRadius: "4px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>
                {isCapturingGps ? "Acquiring Location..." : "📍 Update Shop GPS Position"}
              </button>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "12px", fontWeight: "bold", display: "block" }}>Brief Description</label>
              <textarea rows="2" value={briefDesc} onChange={(e) => setBriefDesc(e.target.value)} placeholder="Key features, warranty, condition..." style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
            </div>

            {/* Photos */}
            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "12px", fontWeight: "bold", display: "block" }}>Product Photos (Up to 5 images)</label>
              <input type="file" accept="image/*" multiple onChange={handlePhotosChange} disabled={photos.length >= 5} />
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                {photos.map((img, idx) => (
                  <div key={idx} style={{ position: "relative" }}>
                    <img src={img} alt="preview" style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }} />
                    <button onClick={() => removePhoto(idx)} style={{ position: "absolute", top: "-5px", right: "-5px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "50%", width: "18px", height: "18px", fontSize: "10px", cursor: "pointer" }}>✕</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Video */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "12px", fontWeight: "bold", display: "block" }}>Product Video (Optional, max 10MB)</label>
              <input type="file" accept="video/*" onChange={handleVideoChange} />
              {videoError && <p style={{ color: "#dc2626", fontSize: "12px", margin: "4px 0 0 0" }}>{videoError}</p>}
              {video && <p style={{ color: "#16a34a", fontSize: "12px", margin: "4px 0 0 0" }}>✅ Video attached</p>}
            </div>

            <button onClick={handleAiAutoFill} disabled={isGenerating} style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
              {isGenerating ? "⚡ AI Optimizing Product & GPS Matrix..." : "✨ Auto-Complete with AI"}
            </button>
          </div>

          {/* AI Preview */}
          <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "2px dashed #7c3aed" }}>
            <h3 style={{ marginTop: 0, color: "#7c3aed" }}>AI Generated App Listing Preview</h3>

            {!aiGeneratedData && !isGenerating && <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px 0" }}>Fill details and click Auto-Complete with AI.</p>}

            {isGenerating && <p style={{ color: "#7c3aed", textAlign: "center", padding: "40px 0" }}>⏳ AI formatting title, weight matrix, and location audit...</p>}

            {aiGeneratedData && !isGenerating && (
              <div>
                <img src={aiGeneratedData.image} alt="Preview" style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }} />
                <h4>{aiGeneratedData.title}</h4>
                <p style={{ fontSize: "13px", color: "#475569" }}>{aiGeneratedData.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                  <span style={{ fontSize: "18px", fontWeight: "bold", color: "#16a34a" }}>₦{aiGeneratedData.salePrice.toLocaleString()}</span>
                  <span style={{ fontSize: "13px", background: "#e0f2fe", color: "#0369a1", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold" }}>📦 Weight: {aiGeneratedData.weightKg} kg</span>
                </div>

                <div style={{ background: "#f8fafc", padding: "10px", borderRadius: "6px", fontSize: "12px", border: "1px solid #e2e8f0", marginBottom: "15px" }}>
                  <div style={{ fontWeight: "bold", color: "#15803d" }}>✅ Scam Audit: {aiGeneratedData.aiScamReport.status} ({aiGeneratedData.aiScamReport.trustScore}%)</div>
                  <ul style={{ margin: "4px 0 0 0", paddingLeft: "16px", color: "#475569" }}>
                    {aiGeneratedData.aiScamReport.positiveFlags.map((flag, idx) => <li key={idx}>{flag}</li>)}
                  </ul>
                </div>

                {isPublished ? (
                  <div style={{ padding: "10px", background: "#dcfce7", color: "#15803d", borderRadius: "6px", textAlign: "center", fontWeight: "bold" }}>
                    ✅ Product Posted to BravoMart Homepage & Your Store!
                  </div>
                ) : (
                  <button onClick={handlePublish} style={{ width: "100%", padding: "12px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                    🚀 Confirm & Post Product
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: STORE CATALOG */}
      {activeTab === "my_products" && (
        <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <h3>📦 Active Products in {activeVendor.shopName}</h3>

          {vendorProducts.length === 0 ? (
            <p style={{ color: "#64748b" }}>No products added yet.</p>
          ) : (
            <div style={{ display: "grid", gap: "15px" }}>
              {vendorProducts.map((product) => (
                <div key={product.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <img src={product.image} alt={product.title} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }} />
                    <div>
                      <h4 style={{ margin: "0 0 4px 0" }}>{product.title}</h4>
                      <div style={{ display: "flex", gap: "10px", fontSize: "13px" }}>
                        <span style={{ color: "#16a34a", fontWeight: "bold" }}>₦{product.salePrice?.toLocaleString()}</span>
                        <span style={{ color: "#64748b" }}>• Weight: {product.weightKg || 1} kg</span>
                      </div>
                      <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748b" }}>
                        Available Quantity: <b>{product.stockCount ?? 10}</b> units
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <button onClick={() => onUpdateStock(product.id, (product.stockCount ?? 10) + 5)} style={{ padding: "6px 12px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>
                      +5 Stock
                    </button>
                    <button onClick={() => onDeleteProduct(product.id)} style={{ padding: "6px 12px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DISPATCH RIDER GPS TERMINAL */}
      {activeTab === "dispatch_tracker" && (
        <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <h3 style={{ margin: 0, color: "#0f172a" }}>🛵 Dispatch Rider Real-Time GPS Terminal</h3>
            <button onClick={fetchRiderLocation} style={{ padding: "8px 14px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}>
              🔄 Refresh Rider GPS
            </button>
          </div>

          {riderGpsError && (
            <div style={{ background: "#fef2f2", color: "#dc2626", padding: "10px", borderRadius: "6px", fontSize: "13px", marginBottom: "15px" }}>
              ⚠️ {riderGpsError}
            </div>
          )}

          {/* Location Bar */}
          <div style={{ background: "#f8fafc", padding: "15px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "20px" }}>
            <span style={{ fontSize: "12px", color: "#64748b", display: "block" }}>Rider Device Live GPS Signals:</span>
            <strong style={{ fontSize: "15px", fontFamily: "monospace", color: "#0f172a" }}>
              {riderCoords ? `${riderCoords.lat.toFixed(5)}, ${riderCoords.lng.toFixed(5)}` : "Acquiring GPS Signal..."}
            </strong>
          </div>

          {/* Route Metrics Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
            {/* Pickup Segment */}
            <div style={{ border: "1px solid #cbd5e1", padding: "15px", borderRadius: "8px", background: "#faf5ff" }}>
              <div style={{ fontSize: "12px", color: "#7c3aed", fontWeight: "bold" }}>STEP 1: Pickup Location (Seller Shop)</div>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#5b21b6", margin: "6px 0" }}>{riderToVendorKm} km away</div>
              <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#64748b" }}>Shop: {activeVendor.shopName} ({vendorGps.lat.toFixed(3)}, {vendorGps.lng.toFixed(3)})</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${vendorGps.lat},${vendorGps.lng}`}
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-block", padding: "8px 12px", background: "#7c3aed", color: "#fff", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", textDecoration: "none" }}
              >
                📍 Navigate to Seller Pickup
              </a>
            </div>

            {/* Dropoff Segment */}
            <div style={{ border: "1px solid #cbd5e1", padding: "15px", borderRadius: "8px", background: "#eff6ff" }}>
              <div style={{ fontSize: "12px", color: "#2563eb", fontWeight: "bold" }}>STEP 2: Delivery Location (Buyer)</div>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#1d4ed8", margin: "6px 0" }}>{vendorToCustomerKm} km away</div>
              <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#64748b" }}>Destination ({simulatedCustomerCoords.lat.toFixed(3)}, {simulatedCustomerCoords.lng.toFixed(3)})</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${simulatedCustomerCoords.lat},${simulatedCustomerCoords.lng}`}
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-block", padding: "8px 12px", background: "#2563eb", color: "#fff", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", textDecoration: "none" }}
              >
                🏁 Navigate to Buyer Dropoff
              </a>
            </div>
          </div>

          {/* Live Dynamic Shipping Rate Calculator */}
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "18px", borderRadius: "10px" }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#166534" }}>🧮 Automated Shipping Cost Engine</h4>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "15px" }}>
              <div>
                <label style={{ fontSize: "11px", fontWeight: "bold", color: "#166534", display: "block" }}>Weight (kg)</label>
                <input type="number" step="0.1" value={productWeight} onChange={(e) => setProductWeight(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #86efac" }} />
              </div>

              <div>
                <label style={{ fontSize: "11px", fontWeight: "bold", color: "#166534", display: "block" }}>Distance (km)</label>
                <input type="text" value={`${vendorToCustomerKm} km`} disabled style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #86efac", background: "#dcfce7", fontWeight: "bold" }} />
              </div>

              <div>
                <label style={{ fontSize: "11px", fontWeight: "bold", color: "#166534", display: "block" }}>Rate (₦ / kg / km)</label>
                <input type="number" value={ratePerKgKm} onChange={(e) => setRatePerKgKm(Number(e.target.value))} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #86efac" }} />
              </div>
            </div>

            <div style={{ background: "#ffffff", padding: "12px 16px", borderRadius: "8px", border: "1px solid #86efac", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "12px", color: "#15803d" }}>
                  Formula: {activeSampleWeight}kg × {vendorToCustomerKm}km × ₦{ratePerKgKm}
                </div>
                <div style={{ fontSize: "11px", color: "#166534" }}>(Minimum charge floor of ₦500 applies)</div>
              </div>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#15803d" }}>
                Total Fee: ₦{computedShippingFee.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}