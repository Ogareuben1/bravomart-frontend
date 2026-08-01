import React, { useState, useEffect } from "react";
import { calculateGpsDistanceKm, calculateShippingCost } from "../utils/distanceCalculator";

export default function DispatchRiderTracker({ order }) {
  const [riderCoords, setRiderCoords] = useState(null);
  const [gpsError, setGpsError] = useState(null);

  // Default coordinate fallbacks if geolocation fails (e.g., Lagos, Nigeria base)
  const vendorCoords = order?.vendorCoords || { lat: 6.4531, lng: 3.3958 }; // Alaba / Lagos Island Market
  const customerCoords = order?.customerCoords || { lat: 6.5244, lng: 3.3792 }; // Ikeja / Yaba area

  // Request browser/phone device real-time GPS location
  const fetchRiderLocation = () => {
    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported by your browser or device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setRiderCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setGpsError(null);
      },
      (error) => {
        setGpsError("Unable to acquire live GPS location. Please enable location permissions.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    fetchRiderLocation();
  }, []);

  // Distance Calculations
  const riderToVendorKm = riderCoords
    ? calculateGpsDistanceKm(riderCoords.lat, riderCoords.lng, vendorCoords.lat, vendorCoords.lng)
    : 0;

  const vendorToCustomerKm = calculateGpsDistanceKm(
    vendorCoords.lat,
    vendorCoords.lng,
    customerCoords.lat,
    customerCoords.lng
  );

  const productWeightKg = order?.weightKg || 2.5; // Example package weight
  const ratePerKgPerKm = 50; // ₦50 / kg / km

  const totalShippingFee = calculateShippingCost({
    weightKg: productWeightKg,
    distanceKm: vendorToCustomerKm,
    ratePerKgPerKm
  });

  return (
    <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", maxWidth: "600px", margin: "20px auto" }}>
      <h3 style={{ margin: "0 0 10px 0", color: "#0f172a" }}>🛵 Dispatch Rider Real-Time GPS Terminal</h3>

      {gpsError && (
        <div style={{ background: "#fef2f2", color: "#dc2626", padding: "10px", borderRadius: "6px", fontSize: "13px", marginBottom: "15px" }}>
          ⚠️ {gpsError}
        </div>
      )}

      {/* GPS Status & Refresh */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc", padding: "12px", borderRadius: "8px", marginBottom: "15px" }}>
        <div>
          <span style={{ fontSize: "12px", color: "#64748b", display: "block" }}>Rider Live Coordinates:</span>
          <strong style={{ fontSize: "14px", fontFamily: "monospace" }}>
            {riderCoords ? `${riderCoords.lat.toFixed(4)}, ${riderCoords.lng.toFixed(4)}` : "Acquiring GPS Signal..."}
          </strong>
        </div>
        <button onClick={fetchRiderLocation} style={{ padding: "8px 12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}>
          🔄 Refresh GPS
        </button>
      </div>

      {/* Distance Metrics Table */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "15px" }}>
        <div style={{ border: "1px solid #cbd5e1", padding: "12px", borderRadius: "8px" }}>
          <div style={{ fontSize: "11px", color: "#64748b" }}>1. Rider ➔ Vendor Pickup</div>
          <div style={{ fontSize: "18px", fontWeight: "bold", color: "#7c3aed" }}>{riderToVendorKm} km away</div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${vendorCoords.lat},${vendorCoords.lng}`}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: "12px", color: "#2563eb", display: "inline-block", marginTop: "6px", textDecoration: "underline" }}
          >
            📍 Navigate to Pickup
          </a>
        </div>

        <div style={{ border: "1px solid #cbd5e1", padding: "12px", borderRadius: "8px" }}>
          <div style={{ fontSize: "11px", color: "#64748b" }}>2. Vendor ➔ Customer Dropoff</div>
          <div style={{ fontSize: "18px", fontWeight: "bold", color: "#2563eb" }}>{vendorToCustomerKm} km away</div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${customerCoords.lat},${customerCoords.lng}`}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: "12px", color: "#2563eb", display: "inline-block", marginTop: "6px", textDecoration: "underline" }}
          >
            🏁 Navigate to Delivery
          </a>
        </div>
      </div>

      {/* Dynamic Shipping Breakdown */}
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "15px", borderRadius: "8px" }}>
        <h4 style={{ margin: "0 0 8px 0", color: "#166534" }}>💰 Shipping Calculation Breakdown</h4>
        <div style={{ fontSize: "13px", color: "#15803d", display: "grid", gap: "4px" }}>
          <div><b>Package Weight:</b> {productWeightKg} kg</div>
          <div><b>Delivery Distance:</b> {vendorToCustomerKm} km</div>
          <div><b>Rate per kg/km:</b> ₦{ratePerKgPerKm}</div>
          <hr style={{ border: "none", borderTop: "1px dashed #bbf7d0", margin: "6px 0" }} />
          <div style={{ fontSize: "16px", fontWeight: "bold", color: "#166534" }}>
            Total Delivery Fee = ₦{totalShippingFee.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}