// mylist.js - Read saved colleges data fields live from Cloud Firestore

function initializeMyListDisplay() {
  const container = document.getElementById("myListContainer");
  if (!container) return;

  // Listen for confirmation that a user is successfully signed in
  firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) {
      container.innerHTML = `<p style="color: #c0392b; font-family: 'IBM Plex Mono', monospace;">Please sign in via your profile panel page to analyze your customized college shortlist tracking dashboard folders.</p>`;
      return;
    }

    try {
      // Pull saved college document nodes matching this unique authenticated individual
      const snapshot = await db.collection('users').doc(user.uid).collection('savedColleges').orderBy('priority').get();
      
      if (snapshot.empty) {
        container.innerHTML = `
          <div style="text-align: center; padding: 40px; border: 1px dashed #ccc; border-radius: 8px; background: #fafafa;">
            <h3 style="font-family: 'Fraunces', serif; margin-bottom: 8px;">Your saved checklist folder is empty!</h3>
            <p style="color:#666; font-size:14px; margin-bottom: 0;">Run your search filter on your <a href="matches.html" style="color: #111; font-weight: 600;">Matches page</a> and tag entries to populate layout targets.</p>
          </div>`;
        return;
      }

      container.innerHTML = ""; // Wipe loading indicators clean

      snapshot.forEach(doc => {
        const data = doc.data();
        const docId = doc.id;

        // Set up emoji configurations dynamically based on choice ranking selections
        let rankBadgeColor = "#e1f5fe";
        let rankTextColor = "#0288d1";
        if (data.priority === "Top Choice") {
          rankBadgeColor = "#fff9c4";
          rankTextColor = "#f57f17";
        } else if (data.priority === "Safety Backup") {
          rankBadgeColor = "#f5f5f5";
          rankTextColor = "#616161";
        }

        const trackCard = document.createElement("div");
        trackCard.className = "college-card";
        trackCard.style = "background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #eaeaea; box-shadow: 0 2px 4px rgba(0,0,0,0.015); position: relative;";
        
        trackCard.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
            <div>
              <span style="display: inline-block; background: ${rankBadgeColor}; color: ${rankTextColor}; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-family: 'IBM Plex Mono', monospace; font-weight: bold; margin-bottom: 8px;">📌 ${data.priority}</span>
              <h3 style="margin: 0 0 6px 0; font-family: 'Fraunces', serif; font-size: 22px; color: #111;">${data.name}</h3>
              <p style="margin: 4px 0; font-size: 14px; color: #555;">📍 State: ${data.state} | Acceptance Rate: ${data.rate}</p>
            </div>
            <button onclick="removeCollegeFromCloud('${docId}')" style="background: none; border: none; color: #e74c3c; font-size: 13px; font-weight: 500; cursor: pointer; padding: 4px;">❌ Remove</button>
          </div>
          <div style="margin-top: 14px; padding: 12px; background: #f9f9f9; border-left: 3px solid #111; font-size: 14px; color: #444; font-style: italic; border-radius: 0 4px 4px 0;">
            "${data.notes || 'No custom remarks specified yet.'}"
          </div>
        `;
        container.appendChild(trackCard);
      });

    } catch (err) {
      console.error("Failed to query user shortlist datasets:", err);
      container.innerHTML = `<p style="color: red;">Error reading checklist targets.</p>`;
    }
  });
}

// Global removal functionality hook execution module
async function removeCollegeFromCloud(docId) {
  const userId = firebase.auth().currentUser.uid;
  if (confirm("Remove this college tracking node from your saved shortlist layout folder?")) {
    try {
      await db.collection('users').doc(userId).collection('savedColleges').doc(docId).delete();
      initializeMyListDisplay(); // Instant screen dashboard re-indexing layout update
    } catch (err) {
      console.error("Removal failure orchestration index error:", err);
    }
  }
}

window.onload = initializeMyListDisplay;