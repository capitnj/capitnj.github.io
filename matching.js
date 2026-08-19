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
                    throw new Error(`No colleges found for zipcode ${userZipCode}. Try a different one.`);
                }

                localStorage.setItem("matchedColleges", JSON.stringify(nearbyColleges));
                localStorage.setItem("userGpa", userGPA);
                localStorage.setItem("userSat", userSAT);
                localStorage.setItem("userZipCode", userZipCode);
                localStorage.setItem("userBudget", budgetCap);
                localStorage.setItem("searchRadius", searchRadius);
                localStorage.setItem("userCollegeType", userCollegeType);

                alert(`Found ${nearbyColleges.length} colleges!`);

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