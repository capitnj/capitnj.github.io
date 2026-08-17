function renderLiveCards() {
  const container = document.getElementById("matchesContainer");
  const rawData = localStorage.getItem("userShortlist");

  if (!container) return;

  if (!rawData || JSON.parse(rawData).length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; border: 1px dashed #ccc; border-radius: 8px; background: #fafafa;">
        <h3 style="font-family: 'Fraunces', serif; margin-bottom: 8px;">No direct matches found!</h3>
        <p style="color: #666; font-size: 14px;">Try returning to your <a href="profile.html" style="color: #111; font-weight: 600;">Profile Questionnaire</a> and adjusting your academic scores or tuition budget limit parameters.</p>
      </div>`;
    return;
  }

  const matches = JSON.parse(rawData);
  const userGPA = parseFloat(localStorage.getItem("userGpa") || 3.0);
  container.innerHTML = "";

  matches.forEach(college => {
    const name = college["school.name"];
    const state = college["school.state"];
    const ownership = college["school.ownership"] === 1 ? "Public University" : "Private University";

    const rate = college["latest.admissions.admission_rate.overall"]
      ? Math.round(college["latest.admissions.admission_rate.overall"] * 100) + "%"
      : "Open Enrollment / High Acceptance";

    let geoBadgeText = "Out of State";
    let geoBadgeBg = "#f1f5f9";
    let geoTextColor = "#475569";

    if (state === "NJ") {
      geoBadgeText = "Local / In-State";
      geoBadgeBg = "#e0f2fe";
      geoTextColor = "#0369a1";
    }

    let categoryBadgeText = "Target Fit";
    let categoryBadgeColor = "#fff3cd";
    let categoryTextColor = "#856404";

    if (userGPA >= 3.8) {
      categoryBadgeText = "Safety Option";
      categoryBadgeColor = "#d4edda";
      categoryTextColor = "#155724";
    } else if (userGPA < 3.2) {
      categoryBadgeText = "Reach Goal";
      categoryBadgeColor = "#f8d7da";
      categoryTextColor = "#721c24";
    }

    const card = document.createElement("div");
    card.className = "college-card";
    card.style = "background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #eaeaea; box-shadow: 0 2px 4px rgba(0,0,0,0.015); margin-bottom: 16px;";

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
        <div>
          <h3 style="margin: 0 0 8px 0; font-family: 'Fraunces', serif; font-size: 20px; color: #111;">${name}</h3>
          <p style="margin: 4px 0; font-size: 14px; color: #555;">📍 <strong>Location:</strong> ${state} | 🏛️ <strong>Classification:</strong> ${ownership}</p>
        </div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end;">
          <span style="background: ${geoBadgeBg}; color: ${geoTextColor}; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-family: 'IBM Plex Mono', monospace; font-weight: bold; white-space: nowrap;">${geoBadgeText}</span>
          <span style="background: ${categoryBadgeColor}; color: ${categoryTextColor}; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-family: 'IBM Plex Mono', monospace; font-weight: bold; white-space: nowrap;">${categoryBadgeText}</span>
          <span style="background: #e8f5e9; color: #2e7d32; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-family: 'IBM Plex Mono', monospace; font-weight: bold; white-space: nowrap;">✓ Live Feed</span>
        </div>
      </div>
      <hr style="border: 0; border-top: 1px solid #f5f5f5; margin: 12px 0;">
      <p style="margin: 4px 0; font-size: 14px; color: #333;">🎯 <strong>Admissions Acceptance Rate:</strong> ${rate}</p>

      <div style="margin-top: 15px; padding: 12px; background: #fafafa; border-radius: 6px; border: 1px dashed #ddd; display: flex; flex-direction: column; gap: 10px;">
        <div style="display: flex; gap: 10px; align-items: center;">
          <label style="font-size: 13px; font-weight: 500; color: #111;">Rank Priority:</label>
          <select id="rank-${name.replace(/\s+/g, '')}" style="padding: 4px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px;">
            <option value="Top Choice">🥇 Top Choice / #1 Pick</option>
            <option value="Target School" selected>🥈 Strong Target</option>
            <option value="Safety Backup">🥉 Safety Backup</option>
          </select>
        </div>
        <textarea id="notes-${name.replace(/\s+/g, '')}" placeholder="Add your research notes (e.g. Spoke to counselor, requires extra essays)" style="width: 100%; min-height: 50px; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px; font-family: inherit; resize: vertical; box-sizing: border-box;"></textarea>
        <button onclick="saveCollegeToList('${name.replace(/'/g, "\\'")}', '${state}', '${rate}', '${name.replace(/\s+/g, '')}')" style="background: #111; color: #fff; border: none; padding: 8px 12px; border-radius: 4px; font-size: 13px; font-weight: 500; cursor: pointer; align-self: flex-start;">✨ Save to My List</button>
      </div>
    `;
    container.appendChild(card);
  });
}

async function saveCollegeToList(collegeName, location, acceptanceRate, uniqueId) {
  if (!window.capitnjFirebase?.ready) {
    await new Promise((resolve) => window.addEventListener("firebase-ready", resolve, { once: true }));
  }
  const firebase = await window.capitnjFirebase.ready;
  const auth = firebase.auth;
  const db = firebase.db;
  const { doc, setDoc } = firebase.firestoreFns;

  const user = auth.currentUser;
  if (!user) {
    alert("Please sign in first to save colleges to your dashboard list!");
    return;
  }

  const rankSelection = document.getElementById(`rank-${uniqueId}`).value;
  const noteContent = document.getElementById(`notes-${uniqueId}`).value;

  try {
    await setDoc(doc(db, "users", user.uid, "savedColleges", uniqueId), {
      name: collegeName,
      state: location,
      rate: acceptanceRate,
      priority: rankSelection,
      notes: noteContent,
      timestamp: new Date().toISOString()
    });
    alert(`🎉 Successfully saved ${collegeName} to your list!`);
  } catch (err) {
    console.error("Cloud storage sync failed:", err);
    alert("Failed to save college data. Make sure you are signed in.");
  }
}

window.onload = renderLiveCards;

function getStateFromZip(zip) {
  const zipToState = {
    "00501": "NY", "00601": "PR", "01001": "MA", "02018": "MA", "02108": "MA",
    "03031": "NH", "04001": "ME", "05001": "VT", "06001": "CT", "07001": "NJ",
    "10001": "NY", "20001": "DC", "90001": "CA", "94101": "CA", "33101": "FL",
    "60601": "IL", "73301": "TX", "80201": "CO", "94102": "CA", "85201": "AZ",
    "99501": "AK"
  };
  return zipToState[zip] || null;
}

document.getElementById('zipInput').addEventListener('change', () => {
  const zip = document.getElementById('zipInput').value.trim();
  const state = getStateFromZip(zip);
  if (!state) {
    alert("Invalid or unsupported ZIP code");
    return;
  }
  filterCollegesByState(state);
});

function filterCollegesByState(state) {
  const rawData = localStorage.getItem("userShortlist");
  if (!rawData) return;
  const colleges = JSON.parse(rawData);
  const filtered = colleges.filter(college => college["school.state"] === state);
  localStorage.setItem("userShortlist", JSON.stringify(filtered));
  renderLiveCards();
}