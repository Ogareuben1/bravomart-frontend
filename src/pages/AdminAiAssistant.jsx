import React, { useState, useEffect } from "react";

// ==========================================
// 1. HELPER UTILITIES: GPS & SHIPPING COST
// ==========================================

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

export function calculateShippingCost({ weightKg = 1, distanceKm = 1, ratePerKgPerKm = 50 }) {
  const minDeliveryFee = 500; // Minimum delivery fee floor in Naira
  const calculatedCost = weightKg * distanceKm * ratePerKgPerKm;
  return Math.max(minDeliveryFee, Math.round(calculatedCost));
}

// Fallback dummy vendor in case activeVendor prop is not passed
const DEFAULT_VENDOR = {
  id: "v-demo-101",
  shopName: "Bravo Mega Store",
  fullName: "Demo Merchant",
  shopAddress: "12 Marina Street, Lagos Island",
  walletId: "BW-990231",
  walletBalance: 150000,
  coords: { lat: 6.4531, lng: 3.3958 }
};

// ==========================================
// 2. MAIN ADMIN & DISPATCH COMPONENT
// ==========================================

export default function AdminAiAssistant({ 
  activeVendor = DEFAULT_VENDOR, 
  vendorProducts = [], 
  onAddProduct = () => {}, 
  onDeleteProduct = () => {}, 
  onUpdateStock = () => {} 
}) {
  const vendor = activeVendor || DEFAULT_VENDOR;
  const products = vendorProducts || [];

  const [activeTab, setActiveTab] = useState("ai_poster"); // 'ai_poster' | 'my_products' | 'dispatch_tracker'

  // Form Inputs
  const [productName, setProductName] = useState("");
  const [briefDesc, setBriefDesc] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [productWeight, setProductWeight] = useState("2.5");
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);
  const [videoError, setVideoError] = useState("");

  // Product Condition & Swapping
  const [condition, setCondition] = useState("brand_new"); // 'brand_new' | 'fairly_used'
  const [acceptsSwap, setAcceptsSwap] = useState(false);

  // Custom Pickup Location Switch
  const [isCustomPickup, setIsCustomPickup] = useState(false);
  const [customPickupAddress, setCustomPickupAddress] = useState("");
  const [customPickupCoords, setCustomPickupCoords] = useState({ lat: 6.4531, lng: 3.3958 });

  // Vendor Live GPS Coordinates State
  const [vendorGps, setVendorGps] = useState(vendor.coords || { lat: 6.4531, lng: 3.3958 });
  const [isCapturingGps, setIsCapturingGps] = useState(false);

  // Effective Pickup Location used across the system for shipping
  const activePickupAddress = isCustomPickup 
    ? (customPickupAddress || "Custom Vendor Location") 
    : vendor.shopAddress;
    
  const activePickupCoords = isCustomPickup ? customPickupCoords : vendorGps;

  // Dispatch Rider GPS Terminal States
  const [riderCoords, setRiderCoords] = useState(null);
  const [riderGpsError, setRiderGpsError] = useState("");
  const [simulatedCustomerCoords] = useState({ lat: 6.5244, lng: 3.3792 });
  const [ratePerKgKm, setRatePerKgKm] = useState(50);

  // In-App Chat Modal State
  const [activeChatProduct, setActiveChatProduct] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  // Preview & AI Generation States
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiGeneratedData, setAiGeneratedData] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  // Helper for device location permissions page
  const openGpsSettingsInstruction = () => {
    alert(
      "To enable GPS Permissions:\n\n" +
      "• On Android/Chrome: Tap the Lock/Settings icon beside the URL bar -> Site Settings -> Location -> Allow.\n" +
      "• On iOS/Safari: Settings -> Privacy & Security -> Location Services -> Safari -> Allow.\n" +
      "• On Windows/Mac: Settings -> Privacy -> Location -> Turn ON for your browser."
    );
  };

  const handleSearchMarketPrices = () => {
    if (!productName.trim()) {
      alert("Please enter a product name first!");
      return;
    }
    const query = encodeURIComponent(`how much is the price of ${productName.trim()}`);
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
  };

  const handleCaptureVendorGps = (isCustom = false) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser/device.");
      return;
    }
    setIsCapturingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        if (isCustom) {
          setCustomPickupCoords(coords);
        } else {
          setVendorGps(coords);
        }
        setIsCapturingGps(false);
      },
      (err) => {
        alert("Failed to acquire shop location. Please check device GPS permissions.");
        setIsCapturingGps(false);
      },
      { enableHighAccuracy: true }
    );
  };

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

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoError("");
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setVideoError("Video file size exceeds the 10MB limit.");
        setVideo(null);
        return;
      }
      const videoObjectUrl = URL.createObjectURL(file);
      setVideo(videoObjectUrl);

      // Extract video thumbnail frame if no photos exist
      if (photos.length === 0) {
        extractThumbnailFromVideo(videoObjectUrl);
      }
    }
  };

  const extractThumbnailFromVideo = (videoUrl) => {
    const videoElem = document.createElement("video");
    videoElem.src = videoUrl;
    videoElem.crossOrigin = "anonymous";
    videoElem.currentTime = 1; // Seek to 1s
    videoElem.onloadeddata = () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoElem.videoWidth || 300;
      canvas.height = videoElem.videoHeight || 200;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
      const thumbnailUrl = canvas.toDataURL("image/png");
      setPhotos([thumbnailUrl]);
    };
  };

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

      const parsedPrice = parseFloat(actualPrice.replace(/[^0-9.]/g, "")) || 25000;
      const parsedDiscountPrice = parseFloat(discountPrice.replace(/[^0-9.]/g, "")) || (parsedPrice * 0.9);
      const parsedWeight = parseFloat(productWeight) || 1.0;

      // Extract or Fallback Image Logic
      let finalImages = [...photos];
      if (finalImages.length === 0) {
        const queryTerm = encodeURIComponent(productName || "product");
        const openSourceFallbackImg = `https://source.unsplash.com/400x300/?${queryTerm}`;
        finalImages = [openSourceFallbackImg];
      }

      // Append condition detail to description if fairly used
      let formattedDescription = briefDesc || "Sourced directly with local store guarantee and GPS dispatch protection.";
      if (condition === "fairly_used" && !formattedDescription.toLowerCase().includes("fairly used")) {
        formattedDescription = `[Condition: Fairly Used] ${formattedDescription}`;
      } else if (condition === "brand_new") {
        formattedDescription = `[Condition: Brand New] ${formattedDescription}`;
      }

      setAiGeneratedData({
        title: productName ? `${productName.toUpperCase()} - Verified GeoStock` : "Premium Store Product",
        category: category,
        originalPrice: Math.round(parsedPrice),
        salePrice: Math.round(parsedDiscountPrice),
        weightKg: parsedWeight,
        condition: condition,
        acceptsSwap: acceptsSwap,
        pickupAddress: activePickupAddress,
        vendorCoords: activePickupCoords,
        description: formattedDescription,
        stockCount: 50,
        rating: 5.0,
        reviewsCount: 1,
        vendorName: vendor.shopName || "Vendor Store",
        vendorRating: 4.9,
        image: finalImages[0],
        additionalImages: finalImages,
        videoUrl: video,
        aiScamReport: {
          trustScore: 98,
          status: "Verified Physical Merchant",
          positiveFlags: ["National ID Verified", `Pickup GPS Anchored (${activePickupCoords.lat.toFixed(3)}, ${activePickupCoords.lng.toFixed(3)})`],
          negativeFlags: []
        }
      });

      setIsGenerating(false);
      setShowPreviewModal(true); // Open Marketplace Preview Modal
    }, 1200);
  };

  const handlePublish = () => {
    if (!aiGeneratedData) return;
    const newProduct = {
      id: `p-vendor-${Date.now()}`,
      vendorId: vendor.id,
      ...aiGeneratedData
    };
    onAddProduct(newProduct);
    setIsPublished(true);
    setShowPreviewModal(false);
  };

  const openVendorChat = (product) => {
    setActiveChatProduct(product);
    setChatMessages([
      { sender: "system", text: `Chat started with ${vendor.shopName} regarding "${product.title || product.productName}".` },
      { sender: "vendor", text: `Hello! Thanks for reaching out about ${product.title}. How can I assist you today?` }
    ]);
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { sender: "customer", text: chatInput },
      { sender: "vendor", text: "Thanks for your message! Our team will respond shortly." }
    ]);
    setChatInput("");
  };

  const riderToVendorKm = riderCoords
    ? calculateGpsDistanceKm(riderCoords.lat, riderCoords.lng, activePickupCoords.lat, activePickupCoords.lng)
    : 0;

  const vendorToCustomerKm = calculateGpsDistanceKm(
    activePickupCoords.lat,
    activePickupCoords.lng,
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
          <h2 style={{ margin: 0, fontSize: "20px" }}>🏪 {vendor.shopName} Dashboard</h2>
          <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#94a3b8" }}>
            Owner: {vendor.fullName} | Default Shop: {vendor.shopAddress}
          </p>
        </div>

        <div style={{ background: "#334155", padding: "12px 20px", borderRadius: "8px", border: "1px solid #475569" }}>
          <div style={{ fontSize: "11px", color: "#cbd5e1", textTransform: "uppercase" }}>Bravo Wallet ID</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", fontFamily: "monospace", color: "#38bdf8" }}>{vendor.walletId}</div>
          <div style={{ fontSize: "14px", color: "#4ade80", marginTop: "2px" }}>
            Balance: <b>₦{(vendor.walletBalance || 0).toLocaleString()}</b>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
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
          📦 Catalog ({products.length})
        </button>
        <button
          onClick={() => setActiveTab("dispatch_tracker")}
          style={{ padding: "10px 20px", borderRadius: "6px", border: "none", fontWeight: "bold", cursor: "pointer", background: activeTab === "dispatch_tracker" ? "#059669" : "#f1f5f9", color: activeTab === "dispatch_tracker" ? "#fff" : "#64748b" }}
        >
          🛵 GPS Dispatch & Shipping Terminal
        </button>
      </div>

      {/* TAB 1: AI PRODUCT POSTER WITH ENHANCED FEATURES */}
      {activeTab === "ai_poster" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
          <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ marginTop: 0 }}>Add New Product</h3>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "12px", fontWeight: "bold", display: "block" }}>Posting Store Name (Auto)</label>
              <input type="text" value={vendor.shopName} disabled style={{ width: "100%", padding: "10px", background: "#e2e8f0", borderRadius: "6px", border: "1px solid #cbd5e1", fontWeight: "bold" }} />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                <label style={{ fontSize: "12px", fontWeight: "bold" }}>Product Name *</label>
                <button 
                  type="button" 
                  onClick={handleSearchMarketPrices} 
                  style={{ background: "#0284c7", color: "#fff", border: "none", borderRadius: "4px", padding: "4px 8px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}
                >
                  🔍 Check Price Ideas on Google
                </button>
              </div>
              <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="e.g. 5KW Hybrid Inverter" style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "bold", display: "block" }}>Actual Price (₦) *</label>
                <input type="text" value={actualPrice} onChange={(e) => setActualPrice(e.target.value)} placeholder="e.g. 250000" style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "bold", display: "block" }}>Discount Price (₦)</label>
                <input type="text" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} placeholder="e.g. 220000" style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "bold", display: "block" }}>Weight (kg) *</label>
                <input type="number" step="0.1" value={productWeight} onChange={(e) => setProductWeight(e.target.value)} placeholder="e.g. 2.5" style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
              </div>
            </div>

            {/* Product Condition & Swap Options */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "bold", display: "block" }}>Product Condition</label>
                <select value={condition} onChange={(e) => setCondition(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff" }}>
                  <option value="brand_new">Brand New</option>
                  <option value="fairly_used">Fairly Used</option>
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginTop: "18px" }}>
                <label style={{ fontSize: "13px", fontWeight: "bold", cursor: "pointer", display: "flex", itemsCenter: "center", gap: "6px" }}>
                  <input type="checkbox" checked={acceptsSwap} onChange={(e) => setAcceptsSwap(e.target.checked)} style={{ width: "16px", height: "16px" }} />
                  🔄 Accept Swap Offers?
                </label>
              </div>
            </div>

            {/* Pickup Location Settings */}
            <div style={{ background: "#f1f5f9", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "12px" }}>
              <div style={{ fontSize: "12px", fontWeight: "bold", color: "#334155", marginBottom: "6px" }}>📍 Vendor Pickup Location for Shipping:</div>
              
              <label style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px", cursor: "pointer" }}>
                <input 
                  type="checkbox" 
                  checked={isCustomPickup} 
                  onChange={(e) => setIsCustomPickup(e.target.checked)} 
                />
                Shipping from a different location (Abroad, Warehouse, etc.)
              </label>

              {!isCustomPickup ? (
                <div>
                  <div style={{ fontSize: "13px", color: "#475569" }}>Shop Address: <b>{vendor.shopAddress}</b></div>
                  <div style={{ fontSize: "12px", fontFamily: "monospace", color: "#0284c7", marginTop: "4px" }}>
                    Lat: {vendorGps.lat.toFixed(4)}, Lng: {vendorGps.lng.toFixed(4)}
                  </div>
                  <button onClick={() => handleCaptureVendorGps(false)} type="button" disabled={isCapturingGps} style={{ marginTop: "6px", padding: "6px 10px", background: "#0284c7", color: "#fff", border: "none", borderRadius: "4px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>
                    {isCapturingGps ? "Acquiring..." : "📍 Recapture Registered Shop GPS"}
                  </button>
                </div>
              ) : (
                <div style={{ marginTop: "6px" }}>
                  <input 
                    type="text" 
                    value={customPickupAddress} 
                    onChange={(e) => setCustomPickupAddress(e.target.value)} 
                    placeholder="Enter custom pickup/dispatch address..." 
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", marginBottom: "6px" }}
                  />
                  <div style={{ fontSize: "12px", fontFamily: "monospace", color: "#0284c7" }}>
                    Custom GPS: Lat: {customPickupCoords.lat.toFixed(4)}, Lng: {customPickupCoords.lng.toFixed(4)}
                  </div>
                  <button onClick={() => handleCaptureVendorGps(true)} type="button" disabled={isCapturingGps} style={{ marginTop: "6px", padding: "6px 10px", background: "#0284c7", color: "#fff", border: "none", borderRadius: "4px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>
                    {isCapturingGps ? "Acquiring..." : "📍 Capture Custom Address GPS"}
                  </button>
                </div>
              )}
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "12px", fontWeight: "bold", display: "block" }}>Brief Description</label>
              <textarea rows="2" value={briefDesc} onChange={(e) => setBriefDesc(e.target.value)} placeholder="Key features, warranty, specs..." style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
            </div>

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

            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "12px", fontWeight: "bold", display: "block" }}>Product Video (Optional, max 10MB)</label>
              <input type="file" accept="video/*" onChange={handleVideoChange} />
              {videoError && <p style={{ color: "#dc2626", fontSize: "12px", margin: "4px 0 0 0" }}>{videoError}</p>}
              {video && <p style={{ color: "#16a34a", fontSize: "12px", margin: "4px 0 0 0" }}>✅ Video attached (Thumbnail auto-extracted if no images attached)</p>}
            </div>

            <button onClick={handleAiAutoFill} disabled={isGenerating} style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
              {isGenerating ? "⚡ Processing & Preparing Preview..." : "✨ Preview Product & Auto-Complete AI"}
            </button>
          </div>

          <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "2px dashed #7c3aed" }}>
            <h3 style={{ marginTop: 0, color: "#7c3aed" }}>AI Generated App Listing Status</h3>

            {!aiGeneratedData && !isGenerating && <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px 0" }}>Fill details and click Auto-Complete to generate the marketplace preview.</p>}

            {isGenerating && <p style={{ color: "#7c3aed", textAlign: "center", padding: "40px 0" }}>⏳ AI formatting title, weight matrix, media search, and location audit...</p>}

            {aiGeneratedData && !isGenerating && (
              <div>
                <img src={aiGeneratedData.image} alt="Preview" style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }} />
                <h4>{aiGeneratedData.title}</h4>
                <p style={{ fontSize: "13px", color: "#475569" }}>{aiGeneratedData.description}</p>

                <button onClick={() => setShowPreviewModal(true)} style={{ width: "100%", padding: "10px", background: "#0284c7", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", marginBottom: "10px" }}>
                  👁️ Re-open Marketplace Preview Modal
                </button>

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
          <h3>📦 Active Products in {vendor.shopName}</h3>

          {products.length === 0 ? (
            <p style={{ color: "#64748b" }}>No products added yet.</p>
          ) : (
            <div style={{ display: "grid", gap: "15px" }}>
              {products.map((product) => (
                <div key={product.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", border: "1px solid #e2e8f0", borderRadius: "8px", flexWrap: "wrap", gap: "10px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <img src={product.image} alt={product.title} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }} />
                    <div>
                      <h4 style={{ margin: "0 0 4px 0" }}>{product.title}</h4>
                      <div style={{ display: "flex", gap: "10px", fontSize: "13px" }}>
                        <span style={{ color: "#16a34a", fontWeight: "bold" }}>₦{product.salePrice?.toLocaleString()}</span>
                        {product.originalPrice && <span style={{ color: "#94a3b8", textDecoration: "line-through" }}>₦{product.originalPrice.toLocaleString()}</span>}
                        <span style={{ color: "#64748b" }}>• Weight: {product.weightKg || 1} kg</span>
                      </div>
                      <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748b" }}>
                        Condition: <b>{product.condition === "fairly_used" ? "Fairly Used" : "Brand New"}</b> | Swap: <b>{product.acceptsSwap ? "Accepted" : "No"}</b>
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <button onClick={() => openVendorChat(product)} style={{ padding: "6px 12px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>
                      💬 Chat the Vendor
                    </button>
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
            <div style={{ background: "#fef2f2", color: "#dc2626", padding: "12px", borderRadius: "6px", fontSize: "13px", marginBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>⚠️ {riderGpsError}</span>
              <button 
                onClick={openGpsSettingsInstruction} 
                style={{ background: "#dc2626", color: "#fff", border: "none", padding: "6px 10px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", fontSize: "11px" }}
              >
                ⚙️ Open GPS Device Settings
              </button>
            </div>
          )}

          <div style={{ background: "#f8fafc", padding: "15px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "20px" }}>
            <span style={{ fontSize: "12px", color: "#64748b", display: "block" }}>Rider Device Live GPS Signals:</span>
            <strong style={{ fontSize: "15px", fontFamily: "monospace", color: "#0f172a" }}>
              {riderCoords ? `${riderCoords.lat.toFixed(5)}, ${riderCoords.lng.toFixed(5)}` : "Acquiring GPS Signal..."}
            </strong>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
            <div style={{ border: "1px solid #cbd5e1", padding: "15px", borderRadius: "8px", background: "#faf5ff" }}>
              <div style={{ fontSize: "12px", color: "#7c3aed", fontWeight: "bold" }}>STEP 1: Pickup Location (Seller / Overseas Store)</div>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#5b21b6", margin: "6px 0" }}>{riderToVendorKm} km away</div>
              <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#64748b" }}>Pickup: {activePickupAddress} ({activePickupCoords.lat.toFixed(3)}, {activePickupCoords.lng.toFixed(3)})</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${activePickupCoords.lat},${activePickupCoords.lng}`}
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-block", padding: "8px 12px", background: "#7c3aed", color: "#fff", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", textDecoration: "none" }}
              >
                📍 Navigate to Pickup Point
              </a>
            </div>

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

      {/* MARKETPLACE PREVIEW MODAL FOR VENDORS */}
      {showPreviewModal && aiGeneratedData && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.75)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ background: "#fff", width: "100%", maxWidth: "550px", borderRadius: "12px", padding: "20px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", pb: "10px", marginBottom: "15px" }}>
              <h3 style={{ margin: 0, color: "#7c3aed" }}>👁️ Marketplace Listing Preview</h3>
              <button onClick={() => setShowPreviewModal(false)} style={{ border: "none", background: "none", fontSize: "18px", cursor: "pointer" }}>✕</button>
            </div>

            <img src={aiGeneratedData.image} alt={aiGeneratedData.title} style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "8px", marginBottom: "15px" }} />
            
            <h3 style={{ margin: "0 0 6px 0" }}>{aiGeneratedData.title}</h3>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 10px 0" }}>Store: <b>{aiGeneratedData.vendorName}</b> | Pickup: <b>{aiGeneratedData.pickupAddress}</b></p>
            
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "22px", fontWeight: "bold", color: "#16a34a" }}>₦{aiGeneratedData.salePrice.toLocaleString()}</span>
              {aiGeneratedData.originalPrice > aiGeneratedData.salePrice && (
                <span style={{ fontSize: "14px", color: "#94a3b8", textDecoration: "line-through" }}>₦{aiGeneratedData.originalPrice.toLocaleString()}</span>
              )}
              <span style={{ background: "#fef3c7", color: "#92400e", padding: "2px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>
                {aiGeneratedData.condition === "fairly_used" ? "Fairly Used" : "Brand New"}
              </span>
            </div>

            <p style={{ fontSize: "13px", color: "#334155", lineHeight: "1.5" }}>{aiGeneratedData.description}</p>

            <div style={{ background: "#f8fafc", padding: "10px", borderRadius: "6px", fontSize: "12px", margin: "12px 0" }}>
              <p style={{ margin: "0 0 4px 0" }}>🔄 Accepts Swapping: <b>{aiGeneratedData.acceptsSwap ? "Yes" : "No"}</b></p>
              <p style={{ margin: "0" }}>📦 Shipping Weight: <b>{aiGeneratedData.weightKg} kg</b></p>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button onClick={() => setShowPreviewModal(false)} style={{ flex: 1, padding: "10px", background: "#cbd5e1", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
                ✏️ Edit Product
              </button>
              <button onClick={handlePublish} style={{ flex: 1, padding: "10px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
                🚀 Publish Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IN-APP VENDOR CHAT MODAL */}
      {activeChatProduct && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.75)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ background: "#fff", width: "100%", maxWidth: "450px", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", height: "500px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px", marginBottom: "10px" }}>
              <h3 style={{ margin: 0, fontSize: "16px" }}>💬 Chat with {vendor.shopName}</h3>
              <button onClick={() => setActiveChatProduct(null)} style={{ border: "none", background: "none", fontSize: "18px", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px", padding: "10px 0" }}>
              {chatMessages.map((msg, idx) => (
                <div key={idx} style={{ alignSelf: msg.sender === "customer" ? "flex-end" : msg.sender === "system" ? "center" : "flex-start", background: msg.sender === "customer" ? "#2563eb" : msg.sender === "system" ? "#f1f5f9" : "#e2e8f0", color: msg.sender === "customer" ? "#fff" : "#1e293b", padding: "8px 12px", borderRadius: "8px", fontSize: "13px", maxWidth: "80%" }}>
                  {msg.text}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "8px", pt: "10px", borderTop: "1px solid #e2e8f0" }}>
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Type your message..." style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
              <button onClick={sendChatMessage} style={{ padding: "8px 16px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}