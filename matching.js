const API_KEY = "GtNXgFPhac42LoNAwniX9lRIP757nArl7BV9Xkvg";

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
      
      const nearbyColleges = window.getCollegesByZipCode(userZipCode, 50); 

      if (nearbyColleges.length === 0) {
        console.warn("No colleges found within 50 miles of zip code " + userZipCode);
        alert("No colleges found near that zip code. Please try a different one.");
        if (loader) loader.style.display = "none";
        if (saveBtn) saveBtn.textContent = "Save Preferences";
        return;
      }

      
      const matchedResults = nearbyColleges.filter(college => {
        
        if (college.netPrice > budgetCap) return false;

        
        if (userGPA < 3.0 && college.state === "NJ") {
          
          return true;
        }

        
        if (userCollegeType === "public" && college.type !== "Public") return false;
        if (userCollegeType === "private" && college.type !== "Private") return false;

        return true;
      });

      
      const safetySchools = matchedResults.filter(c => c.netPrice < budgetCap * 0.6);
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

      console.log("Matched " + matchedResults.length + " colleges near zip " + userZipCode);
      console.log("Safety: " + safetySchools.length + ", Match: " + matchSchools.length + ", Reach: " + reachSchools.length);

      

    } catch (err) {
      console.error("Failed to match colleges:", err);
      alert("Error matching colleges. Please try again.");
    } finally {
      if (loader) loader.style.display = "none";
      if (saveBtn) saveBtn.textContent = "Save Preferences";
    }
  });
}