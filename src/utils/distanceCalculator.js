// Calculates distance in kilometers between two GPS coordinates using the Haversine Formula
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

  return parseFloat(distance.toFixed(2)); // Returns distance rounded to 2 decimal places (e.g., 4.25 km)
}

/**
 * Formula: Total Shipping Cost = Weight (kg) * Distance (km) * Cost Rate
 * Default rate = ₦50 per kg per km (minimum charge floor applied)
 */
export function calculateShippingCost({ weightKg = 1, distanceKm = 1, ratePerKgPerKm = 50 }) {
  const minDeliveryFee = 500; // Minimum delivery fee threshold in Naira
  const calculatedCost = weightKg * distanceKm * ratePerKgPerKm;

  return Math.max(minDeliveryFee, Math.round(calculatedCost));
}