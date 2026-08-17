function initializeMatching() {
    const profileForm = document.getElementById("preferences-form");

    if (profileForm) {
        profileForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const loader = document.getElementById("matching-loader");
            const saveBtn = document.getElementById("save-btn");
            if (loader) loader.style.display = "block";
            if (saveBtn) saveBtn.textContent = "Analyzing Fits...";

            const userGPA = parseFloat(document.getElementById("gpa")?.value) || 3.0;
            const userSAT = parseFloat(document.getElementById("sat")?.value) || 1000;
            const budgetCap = parseFloat(document.getElementById("max-tuition")?.value) || 999999;
            const userZipCode = (document.getElementById("preferred-location")?.value || "").trim();
            const searchRadius = parseFloat(document.getElementById("search-radius")?.value) || 50;
            const userCollegeType = document.getElementById("school-type")?.value || "all";

            try {
                if (!window.COLLEGES || window.COLLEGES.length === 0) {
                    throw new Error("College database not loaded. Please refresh the page.");
                }

                if (!userZipCode) {
                    throw new Error("Please enter a valid zipcode.");
                }

                const nearbyColleges = window.getCollegesByZipCode(userZipCode, searchRadius);

                if (nearbyColleges.length === 0) {
                    throw new Error(`No colleges found within ${searchRadius} miles of zipcode ${userZipCode}. Try a larger radius or different zipcode.`);
                }

                const matchedResults = nearbyColleges.filter(college => {
                    const withinBudget = !college.netPrice || college.netPrice <= budgetCap;
                    const typeMatch = !userCollegeType || userCollegeType === "all" || college.type === userCollegeType;
                    return withinBudget && typeMatch;
                });

                if (matchedResults.length === 0) {
                    throw new Error("No colleges match your filters. Try adjusting your budget or school type.");
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
                localStorage.setItem("userSat", userSAT);
                localStorage.setItem("userZipCode", userZipCode);
                localStorage.setItem("userBudget", budgetCap);
                localStorage.setItem("searchRadius", searchRadius);
                localStorage.setItem("userCollegeType", userCollegeType);

                alert(`Found ${matchedResults.length} colleges! Safety: ${safetySchools.length}, Match: ${matchSchools.length}, Reach: ${reachSchools.length}`);

                setTimeout(() => {
                    window.location.href = "matches.html";
                }, 500);

            } catch (err) {
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
document.addEventListener("DOMContentLoaded", function() {
    if (window.COLLEGES && window.COLLEGES.length > 0) {
        initializeMatching();
    }
});