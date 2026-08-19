document.addEventListener("DOMContentLoaded", function() {
  renderLiveCards();
  setupFilterListeners();
});

function renderLiveCards() {
  const container = document.getElementById("matchesContainer");
  if (!container) return;

  const matchedCollegesJson = localStorage.getItem("matchedColleges");
  const userZipcode = localStorage.getItem("userZipCode");
  const userGPA = parseFloat(localStorage.getItem("userGpa") || 3.0);

  if (!matchedCollegesJson) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; border: 1px dashed #ccc; border-radius: 8px; background: #fafafa;">
        <h3>No Profile Found</h3>
        <p>Please set your preferences first on the <a href="profile.html">Profile page</a>.</p>
      </div>`;
    return;
  }

  const matches = JSON.parse(matchedCollegesJson);
  localStorage.setItem("userShortlist", JSON.stringify(matches));
  container.innerHTML = "";

  if (matches.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; border: 1px dashed #ccc; border-radius: 8px; background: #fafafa;">
        <h3>No colleges found</h3>
        <p>Try a different zipcode on the <a href="profile.html">Profile page</a>.</p>
      </div>`;
    return;
  }

  matches.forEach((college, index) => {
    const card = createCollegeCard(college, index, userGPA, userZipcode);
    container.appendChild(card);
  });
}

function createCollegeCard(college, index, userGPA, userZipcode) {
  const card = document.createElement("div");
  card.className = "match-card";
  card.style.cssText = `
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 20px;
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  `;

  card.onmouseover = function() {
    this.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    this.style.transform = "translateY(-2px)";
  };

  card.onmouseout = function() {
    this.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
    this.style.transform = "translateY(0)";
  };

  const collegeName = college.name || "Unknown College";
  const collegeState = college.state || "Unknown";
  const userState = getStateFromZipCodeForDisplay(userZipcode);
  
  let geoBadgeText = "Out of State";
  let geoBadgeBg = "#f1f5f9";
  let geoTextColor = "#475569";

  if (collegeState === userState) {
    geoBadgeText = "In-State";
    geoBadgeBg = "#e0f2fe";
    geoTextColor = "#0369a1";
  }

  card.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
      <div>
        <h3 style="margin: 0 0 8px 0; font-family: 'Fraunces', serif; font-size: 20px; color: #111;">${collegeName}</h3>
        <p style="margin: 4px 0; font-size: 14px; color: #555;">📍 ${collegeState}</p>
      </div>
      <span style="background: ${geoBadgeBg}; color: ${geoTextColor}; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold;">${geoBadgeText}</span>
    </div>
  `;

  return card;
}

function getStateFromZipCodeForDisplay(zip) {
  const zipToState = {
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
  if (!zip) return "Unknown";
  return zipToState[zip.substring(0, 2)] || "Other";
}

function setupFilterListeners() {
  const filters = document.querySelectorAll("[data-filter]");
  filters.forEach(filter => {
    filter.addEventListener("change", renderLiveCards);
  });
}