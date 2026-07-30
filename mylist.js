// mylist.js — reads/removes saved colleges from users/{uid}/savedColleges (modular Firebase SDK)

async function initMyList() {
  if (!window.capitnjFirebase?.ready) {
    await new Promise((resolve) => window.addEventListener("firebase-ready", resolve, { once: true }));
  }
  const fb = await window.capitnjFirebase.ready;
  const { requireAuth, db } = fb;
  const { collection, getDocs, deleteDoc, doc, query, orderBy } = fb.firestoreFns;

  const container = document.getElementById("myListContainer");

  requireAuth((user) => renderList(user));

  async function renderList(user) {
    try {
      const collRef = collection(db, "users", user.uid, "savedColleges");
      const q = query(collRef, orderBy("name"));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        container.innerHTML = `
          <div style="padding: 24px; border: 1px dashed #ccc; border-radius: 8px; text-align: center; color: #666;">
            Your shortlist is currently empty! Explore colleges to save your favorites here.
            <br><br>
            <a href="explore.html" class="btn" style="text-decoration: none; display: inline-block;">Go Explore Schools</a>
          </div>`;
        return;
      }

      const priorityColors = {
        "Top Choice": { bg: "#fff9c4", text: "#f57f17" },
        "Considering": { bg: "#e1f5fe", text: "#0288d1" },
        "Safety Backup": { bg: "#f5f5f5", text: "#616161" }
      };

      container.innerHTML = "";
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const docId = docSnap.id;
        const colors = priorityColors[data.priority] || priorityColors["Considering"];

        const card = document.createElement("div");
        card.style = "background: #fff; border: 1px solid #e2e8f0; padding: 18px; border-radius: 8px; position: relative;";
        card.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px;">
            <div>
              <span style="display:inline-block; background:${colors.bg}; color:${colors.text}; padding:2px 6px; border-radius:4px; font-size:11px; font-family:'IBM Plex Mono', monospace; font-weight:bold; margin-bottom:8px;">${data.priority || "Considering"}</span>
              <h3 style="margin:0 0 6px 0; font-family:'Fraunces', serif; font-size:20px; color:#111;">${data.name}</h3>
              <p style="margin:4px 0; font-size:14px; color:#555;">📍 ${data.state || "N/A"} · Net price / rate: ${data.rate || "N/A"}</p>
            </div>
            <button data-doc-id="${docId}" class="remove-btn" style="background:none; border:none; color:#ef4444; font-size:13px; cursor:pointer; text-decoration:underline; font-family:inherit;">Remove</button>
          </div>
          ${data.notes ? `<div style="margin-top:14px; padding:12px; background:#f9f9f9; border-left:3px solid #111; font-size:14px; color:#444; font-style:italic; border-radius:0 4px 4px 0;">"${data.notes}"</div>` : ""}
        `;
        container.appendChild(card);
      });

      container.querySelectorAll(".remove-btn").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const docId = e.target.getAttribute("data-doc-id");
          if (!confirm("Remove this college from your saved list?")) return;
          e.target.textContent = "Removing…";
          try {
            await deleteDoc(doc(db, "users", user.uid, "savedColleges", docId));
            renderList(user);
          } catch (err) {
            console.error("Error removing college:", err);
            e.target.textContent = "Remove";
          }
        });
      });
    } catch (err) {
      console.error("Error loading saved colleges:", err);
      container.innerHTML = `<p style="color:#ef4444;">Error connecting to database records.</p>`;
    }
  }
}

initMyList();