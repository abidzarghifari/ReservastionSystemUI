/**
 * Mendapatkan deskripsi platform perangkat pengguna (aman untuk SSR).
 * @returns {string} Nama platform (cth: "Windows", "macOS", "Android") atau "Unknown".
 */
export default function getDeviceDescription(): string {
  // Cek jika kita berada di environment non-browser (saat SSR)
  if (typeof window === "undefined" || !window.navigator) {
    return "Unknown"; // Fallback aman untuk server
  }

  const navigator = window.navigator;

  // 1. Coba API modern (User-Agent Client Hints)
  if (navigator.userAgentData && navigator.userAgentData.platform) {
    const platform = navigator.userAgentData.platform;
    if (platform) {
      // Mengganti nama agar lebih umum (cth: "macOS" bukan "MacIntel")
      if (platform.match(/win/i)) return "Windows";
      if (platform.match(/mac/i)) return "macOS";
      if (platform.match(/linux/i)) return "Linux";
      if (platform.match(/android/i)) return "Android";
      if (platform.match(/ios/i)) return "iOS"; // 'iOS' jarang muncul di sini
      
      return platform; // "ChromeOS", "Linux", dll.
    }
  }

  // 2. Fallback ke parsing User Agent string (Klasik)
  const ua = navigator.userAgent;
  if (/Windows/i.test(ua)) return "Windows";
  if (/Macintosh|MacIntel|MacPPC|Mac68K/i.test(ua)) return "macOS";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Android/i.test(ua)) return "Android";
  if (/Linux/i.test(ua)) return "Linux";

  return "Unknown"; // Default jika tidak ada yang cocok
}