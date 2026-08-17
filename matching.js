const API_KEY = "GtNXgFPhac42LoNAwniX9lRIP757nArl7BV9Xkvg";

function initializeMatching() {
    const profileForm = document.getElementById("preferences-form");

    if (profileForm) {
        profileForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const loader = document.getElementById("matching-loader");
            const saveBtn = document.getElementById("save-btn");
            if (loader) loader.style.display = "block";
            if (saveBtn) saveBtn.textContent = "Analyzing Fits...";

            const userGPA = parseFloat(document.getElementById("gpa").value) || 3.0;
            const budgetCap = parseFloat(document.getElementById("max-tuition").value) || 999999;
            const userZipCode = document.getElementById("preferred-location").value || "08540";
            const userCollegeType = document.getElementById("school-type").value;

            try {
                if (!window.COLLEGES || window.COLLEGES.length === 0) {
                    throw new Error("College database not loaded. Please refresh the page.");
                }

                const nearbyColleges = window.getCollegesByZipCode(userZipCode, 50);

                if (nearbyColleges.length === 0) {
                    alert("No colleges found within 50 miles of that zip code. Try a different one.");
                    if (loader) loader.style.display = "none";
                    if (saveBtn) saveBtn.textContent = "Save Preferences";
                    return;
                }

                const matchedResults = nearbyColleges.filter(college => {
                    const withinBudget = !college.netPrice || college.netPrice <= budgetCap;
                    const typeMatch = !userCollegeType || userCollegeType === "all" || college.type === userCollegeType;
                    return withinBudget && typeMatch;
                });

                if (matchedResults.length === 0) {
                    alert("No colleges match your filters. Try adjusting your budget or school type.");
                    if (loader) loader.style.display = "none";
                    if (saveBtn) saveBtn.textContent = "Save Preferences";
                    return;
                }

                const safetySchools = matchedResults.filter(c => !c.netPrice || c.netPrice < budgetCap * 0.6);
                const matchSchools = matchedResults.filter(c => c.netPrice >= budgetCap * 0.6 && c.netPrice <= budgetCap);
                const reachSchools = matchedResults.filter(c => c.netPrice > budgetCap * 0.8 && c.netPrice <= budgetCap);

                const categorizedResults = {
                    safety: safetySchools,
                    match: matchSchools,
                    reach: reachSchools,
                    all: matchedResults
                };

                localStorage.setItem("userShortlist", JSON.stringify(categorizedResults));
                localStorage.setItem("userGpa", userGPA);
                localStorage.setItem("userZipCode", userZipCode);
                localStorage.setItem("userBudget", budgetCap);

                alert("Found " + matchedResults.length + " colleges! Safety: " + safetySchools.length + ", Match: " + matchSchools.length + ", Reach: " + reachSchools.length);

            } catch (err) {
                console.error("Error matching colleges:", err);
                alert("Error: " + err.message);
            } finally {
                if (loader) loader.style.display = "none";
                if (saveBtn) saveBtn.textContent = "Save Preferences";
            }
        });
    }
}

window.addEventListener("database-ready", initializeMatching);

if (window.COLLEGES && window.COLLEGES.length > 0) {
    initializeMatching();
}