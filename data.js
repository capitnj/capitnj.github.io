const ZIPCODE_STATE_MAP = {
  "00": "HI", "01": "MA", "02": "MA", "03": "NH", "04": "ME", "05": "VT", "06": "CT", "07": "NJ", "08": "NJ", "09": "PR",
  "10": "NY", "11": "NY", "12": "NY", "13": "NY", "14": "NY", "15": "PA", "16": "PA", "17": "PA", "18": "PA", "19": "PA",
  "20": "DC", "21": "MD", "22": "VA", "23": "VA", "24": "VA", "25": "WV", "26": "WV", "27": "NC", "28": "NC", "29": "SC",
  "30": "GA", "31": "GA", "32": "FL", "33": "FL", "34": "FL", "35": "AL", "36": "AL", "37": "TN", "38": "TN", "39": "MS",
  "40": "KY", "41": "KY", "42": "KY", "43": "OH", "44": "OH", "45": "OH", "46": "IN", "47": "TN", "48": "MI", "49": "MI",
  "50": "IA", "51": "IA", "52": "IA", "53": "WI", "54": "WI", "55": "MN", "56": "MN", "57": "SD", "58": "ND", "59": "MT",
  "60": "IL", "61": "IL", "62": "IL", "63": "MO", "64": "MO", "65": "MO", "66": "KS", "67": "KS", "68": "NE", "69": "NE",
  "70": "LA", "71": "LA", "72": "AR", "73": "OK", "74": "OK", "75": "TX", "76": "TX", "77": "TX", "78": "TX", "79": "TX",
  "80": "CO", "81": "CO", "82": "WY", "83": "ID", "84": "UT", "85": "AZ", "86": "AZ", "87": "NM", "88": "NM", "89": "NV",
  "90": "CA", "91": "CA", "92": "CA", "93": "CA", "94": "CA", "95": "CA", "96": "HI", "97": "OR", "98": "WA", "99": "AK",
};

const ZIP_CODE_COORDS = {
  "00501": { lat: 21.3099, lng: -157.8581 }, "10001": { lat: 40.7506, lng: -73.9972 }, "02108": { lat: 42.3601, lng: -71.0589 },
  "03031": { lat: 43.0731, lng: -71.3492 }, "04001": { lat: 43.6629, lng: -70.2626 }, "05001": { lat: 44.2601, lng: -72.5754 },
  "06001": { lat: 41.8240, lng: -72.7554 }, "07001": { lat: 40.8357, lng: -74.2591 }, "08001": { lat: 39.8564, lng: -74.7962 },
  "20001": { lat: 38.9072, lng: -77.0369 }, "21201": { lat: 39.2904, lng: -76.6122 }, "22202": { lat: 38.8816, lng: -77.0910 },
  "25301": { lat: 38.3498, lng: -81.6326 }, "27601": { lat: 35.7796, lng: -78.6382 }, "29201": { lat: 34.0007, lng: -81.0348 },
  "30303": { lat: 33.7490, lng: -84.3880 }, "32099": { lat: 30.3322, lng: -81.6557 }, "35203": { lat: 33.4484, lng: -86.8104 },
  "37501": { lat: 36.1627, lng: -86.7816 }, "39501": { lat: 32.2988, lng: -90.1848 }, "40202": { lat: 38.2527, lng: -85.7585 },
  "43085": { lat: 39.9612, lng: -82.9988 }, "46201": { lat: 39.7684, lng: -86.1581 }, "48201": { lat: 42.3314, lng: -83.0458 },
  "50301": { lat: 42.0006, lng: -93.2092 }, "53201": { lat: 43.0389, lng: -87.9065 }, "55401": { lat: 44.9778, lng: -93.2650 },
  "57101": { lat: 43.5460, lng: -96.7313 }, "58101": { lat: 46.8083, lng: -100.7837 }, "59601": { lat: 46.5891, lng: -112.0391 },
  "60601": { lat: 41.8819, lng: -87.6278 }, "63101": { lat: 38.6270, lng: -90.1994 }, "66101": { lat: 39.0997, lng: -94.6803 },
  "68102": { lat: 41.2565, lng: -95.9345 }, "70112": { lat: 29.9511, lng: -90.2623 }, "72201": { lat: 34.7465, lng: -92.2896 },
  "73101": { lat: 35.4676, lng: -97.5164 }, "75201": { lat: 32.7767, lng: -96.7970 }, "80202": { lat: 39.7392, lng: -104.9903 },
  "82001": { lat: 41.1400, lng: -104.8202 }, "83702": { lat: 43.6150, lng: -116.2023 }, "84101": { lat: 40.7608, lng: -111.8919 },
  "85001": { lat: 33.4484, lng: -112.0742 }, "87101": { lat: 35.0853, lng: -106.6504 }, "89101": { lat: 36.1699, lng: -115.1398 },
  "90001": { lat: 33.9731, lng: -118.2479 }, "97201": { lat: 45.5152, lng: -122.6784 }, "98101": { lat: 47.6062, lng: -122.3321 },
  "99501": { lat: 61.2181, lng: -149.9003 },
};

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 3959;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getStateFromZipCode(zipCode) {
  if (!zipCode) return null;
  const prefix = zipCode.substring(0, 2);
  return ZIPCODE_STATE_MAP[prefix] || null;
}

function getCoordinatesFromZipCode(zipCode) {
  if (!zipCode) return null;
  const zip5 = zipCode.substring(0, 5);
  return ZIP_CODE_COORDS[zip5] || null;
}

window.getCollegesByZipCode = function(userZipCode, searchRadiusMiles) {
  if (!window.COLLEGES || window.COLLEGES.length === 0) return [];
  if (!userZipCode) return [];

  const userState = getStateFromZipCode(userZipCode);
  if (!userState) {
    console.warn(`Zipcode ${userZipCode} is not supported.`);
    return [];
  }

  const userCoords = getCoordinatesFromZipCode(userZipCode);
  if (!userCoords) {
    return window.COLLEGES.filter(college => college.state === userState);
  }

  const nearby = window.COLLEGES.filter(college => {
    if (college.latitude === undefined || college.longitude === undefined) return false;
    const distance = haversineDistance(userCoords.lat, userCoords.lng, college.latitude, college.longitude);
    return distance <= searchRadiusMiles;
  });

  if (nearby.length === 0) {
    return window.COLLEGES.filter(college => college.state === userState);
  }

  return nearby;
};

window.COLLEGES = [];

const cacheKey = 'capitnj_colleges_cache';
const cacheExpiry = 'capitnj_colleges_expiry';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000;

function loadCollegesFromCache() {
  const cached = localStorage.getItem(cacheKey);
  const expiry = localStorage.getItem(cacheExpiry);
  
  if (cached && expiry && Date.now() < parseInt(expiry)) {
    return JSON.parse(cached);
  }
  return null;
}

function saveCollegeesToCache(data) {
  localStorage.setItem(cacheKey, JSON.stringify(data));
  localStorage.setItem(cacheExpiry, (Date.now() + CACHE_DURATION).toString());
}

function initializeColleges() {
  const cached = loadCollegesFromCache();
  
  if (cached) {
    window.COLLEGES = cached;
    window.dispatchEvent(new Event('database-ready'));
    return;
  }

  fetch('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json')
    .then(response => response.json())
    .then(data => {
      const filtered = data
        .filter(college => college.country === 'United States')
        .map(college => ({
          name: college.name || '',
          state: college.state || '',
          latitude: college.latitude || null,
          longitude: college.longitude || null,
          domains: college.domains || [],
        }));
      
      window.COLLEGES = filtered;
      saveCollegeesToCache(filtered);
      window.dispatchEvent(new Event('database-ready'));
    })
    .catch(error => {
      console.error('Error loading college data:', error);
      window.dispatchEvent(new Event('database-ready'));
    });
}

initializeColleges();