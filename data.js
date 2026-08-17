
document.addEventListener("DOMContentLoaded", function() {
  renderLiveCards();
  setupFilterListeners();
});

function renderLiveCards() {
  const container = document.getElementById("matchesContainer");
  
  if (!container) return;

  
  const userZipcode = localStorage.getItem("userZipcode");
  const searchRadius = parseInt(localStorage.getItem("searchRadius") || 30);
  const userGPA = parseFloat(localStorage.getItem("userGpa") || 3.0);
  const userSAT = parseInt(localStorage.getItem("userSat") || 1000);
  const maxTuition = parseInt(localStorage.getItem("maxTuition") || 50000);

  
  let matches = [];
  
  if (userZipcode && window.COLLEGES && window.COLLEGES.length > 0) {
    matches = window.getCollegesByZipCode(userZipcode, searchRadius);
  } else if (window.COLLEGES && window.COLLEGES.length > 0) {
    // Fallback: show NJ colleges if no zipcode set
    matches = window.COLLEGES.filter(college => college.state === "NJ");
  }

  // Filter by tuition
  matches = matches.filter(college => college.netPrice <= maxTuition);

  // Store for later use
  localStorage.setItem("userShortlist", JSON.stringify(matches));

  container.innerHTML = "";

  if (matches.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; border: 1px dashed #ccc; border-radius: 8px; background: #fafafa;">
        <h3 style="font-family: 'Fraunces', serif; margin-bottom: 8px;">No colleges found near your location!</h3>
        <p style="color: #666; font-size: 14px;">Try <a href="profile.html" style="color: #111; font-weight: 600;">adjusting your location or search radius</a>.</p>
      </div>`;
    return;
  }

  matches.forEach((college, index) => {
    const card = createCollegeCard(college, index);
    container.appendChild(card);
  });
}

function createCollegeCard(college, index) {
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

  // Get distance from user
  const userZipcode = localStorage.getItem("userZipcode");
  const userCoords = ZIP_CODE_COORDS[userZipcode];
  let distance = "N/A";
  let distanceLabel = "Distance";

  if (userCoords) {
    distance = Math.round(
      haversineDistance(
        userCoords.lat,
        userCoords.lng,