export const getUserLocation = async () => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      () => {
        resolve();
      },
    );
  });
};

export const getDistance = (lat2, lon2, current = null) => {
  if (current) {
    const lat1 = current.latitude;
    const lon1 = current.longitude;
    const p = 0.017453292519943295; // Math.PI / 180
    const c = Math.cos;
    const a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
    const result = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    return result.toFixed(2);
  }
  return 0;
};
