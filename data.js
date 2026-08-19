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

function getStateFromZipCode(zipCode) {
  if (!zipCode) return null;
  const prefix = zipCode.substring(0, 2);
  return ZIPCODE_STATE_MAP[prefix] || null;
}

window.getCollegesByZipCode = function(userZipCode, searchRadiusMiles) {
  if (!window.COLLEGES || window.COLLEGES.length === 0) return [];
  if (!userZipCode) return [];

  const userState = getStateFromZipCode(userZipCode);
  if (!userState) {
    console.warn(`Zipcode ${userZipCode} is not supported.`);
    return [];
  }

  return window.COLLEGES.filter(college => college.state === userState);
};

window.COLLEGES = [];

fetch('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json')
  .then(response => response.json())
  .then(data => {
    window.COLLEGES = data
      .filter(college => college.country === 'United States')
      .map(college => ({
        name: college.name || '',
        state: college.state || '',
        latitude: college.latitude || null,
        longitude: college.longitude || null,
        domains: college.domains || [],
      }));
    
    window.dispatchEvent(new Event('database-ready'));
  })
  .catch(error => {
    console.error('Error loading college data:', error);
    window.dispatchEvent(new Event('database-ready'));
  });