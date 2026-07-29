// matches.js - Render live matching data onto the dashboard grid

function renderLiveCards() {
  const container = document.getElementById("matchesContainer");
  const rawData = localStorage.getItem("userShortlist");

  if (!container) return;

  // Fallback state if a user visits this page without executing a profile check first
  if (!rawData || JSON.parse(rawData).length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; border: 1px dashed #ccc; border-radius: 8px; background: #fafafa;">
        <h3 style="font-family: 'Fraunces', serif; margin-bottom: 8px;">No direct matches found!</h3>
        <p style="color: #666; font-size: 14px;">Try returning to your <a href="profile.html" style="color: #111; font-weight: 600;">Profile Questionnaire</a> and adjusting your academic scores or tuition budget limit parameters.</p>
      </div>`;
    return;
  }

  // Grabbing user input variables from storage to calculate badges on the fly
  const matches = JSON.parse(rawData);
  const userGPA = parseFloat(localStorage.getItem("userGpa") || 3.0);
  const userIncome = localStorage.getItem("userIncomeTier") || "mid";
  container.innerHTML = ""; 

  // Loop through every single entry matching your criteria from the US government database
  matches.forEach(college => {
    const name = college["school.name"];
    const state = college["school.state"];
    const ownership = college["school.ownership"] === 1 ? "Public University" : "Private University";
    
    // Convert 0.15 acceptance rate math into "15%" visually
    const rate = college["latest.admissions.admission_rate.overall"] 
      ? Math.round(college["latest.admissions.admission_rate.overall"] * 100) + "%" 
      : "Open Enrollment / High Acceptance";

    // 1. Geography Prioritization Badges
    let geoBadgeText = "Out of State";
    let geoBadgeBg = "#f1f5f9"; // Neutral slate grey tint
    let geoTextColor = "#475569";

    if (state === "NJ") {
      geoBadgeText = "Local / In-State";
      geoBadgeBg = "#e0f2fe"; // Light cyan sky tint
      geoTextColor = "#0369a1";
    }

    // 2. Safety / Target / Reach based on GPA
    let categoryBadgeText = "Target Fit";
    let categoryBadgeColor = "#fff3cd"; // Warm amber tint
    let categoryTextColor = "#856404";

    if (userGPA >= 3.8) {
      categoryBadgeText = "Safety Option";
      categoryBadgeColor = "#d4edda"; // Soft green tint
      categoryTextColor = "#155724";
    } else if (userGPA < 3.2) {
      categoryBadgeText = "Reach Goal";
      categoryBadgeColor = "#f8d7da"; // Light crimson tint
      categoryTextColor = "#721c24";
    }

    // 2. Calculate if they qualify for NJ Specific Grants
    let aidBonusHtml = "";
    if (state === "NJ" && userIncome === "low") {
      aidBonusHtml = `
        <div style="margin-top: 12px; background: #eef9f0; border: 1px solid #c3e6cb; border-radius: 4px; padding: 10px; font-size: 13px; color: #155724; display: flex; align-items: center; gap: 8px;">
          <span>💡</span>
          <span><strong>NJ Aid Match:</strong> You likely qualify for extra state funding through the <strong>NJ TAG Grant</strong> or <strong>EOF Program</strong> at this institution!</span>
        </div>
      `;
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
      
      ${aidBonusHtml}

      <!-- "My List" Saving Actions Overlay Container -->
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

// Function to push a college entry and its custom notes up to the cloud list
async function saveCollegeToList(collegeName, location, acceptanceRate, uniqueId) {
  const rankSelection = document.getElementById(`rank-${uniqueId}`).value;
  const noteContent = document.getElementById(`notes-${uniqueId}`).value;

  if (!firebase.auth().currentUser) {
    alert("Please sign in or save your user profile settings first to back up files to your dashboard list!");
    return;
  }

  const userId = firebase.auth().currentUser.uid;

  try {
    await db.collection('users').doc(userId).collection('savedColleges').doc(uniqueId).set({
      name: collegeName,
      state: location,
      rate: acceptanceRate,
      priority: rankSelection,
      notes: noteContent,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert(`🎉 Successfully saved ${collegeName} to your list!`);
  } catch (err) {
    console.error("Cloud storage sync failed:", err);
    alert("Failed to save college data. Make sure you are signed in.");
  }
}

window.onload = renderLiveCards;