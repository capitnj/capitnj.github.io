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
    const userLocation = document.getElementById("preferred-location").value; 
    const userCollegeType = document.getElementById("school-type").value; 

    const netPriceField = "latest.cost.net_price.overall.overall";
    let governmentApiUrl = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${API_KEY}&_fields=id,school.name,school.state,school.ownership,latest.admissions.admission_rate.overall,${netPriceField}&_sort=${netPriceField}&_per_page=100`;

    if (userLocation === "north-nj" || userLocation === "central-nj" || userLocation === "south-nj") {
      governmentApiUrl += "&school.state=NJ";
    }

    try {
      const response = await fetch(governmentApiUrl);
      if (!response.ok) throw new Error(`Scorecard API returned ${response.status}`);
      const resultData = await response.json();
      const liveCollegesList = resultData.results || [];

      const matchedResults = liveCollegesList.filter(college => {
        const liveNetPrice = college[netPriceField];
        const liveAdmissionRate = college["latest.admissions.admission_rate.overall"];
        const ownershipType = college["school.ownership"]; 

        if (liveNetPrice && liveNetPrice > budgetCap) return false;
        if (userGPA < 3.0 && liveAdmissionRate && liveAdmissionRate < 0.20) return false;
        if (userCollegeType === "public" && ownershipType !== 1) return false;
        if (userCollegeType === "private" && ownershipType !== 2) return false;

        return true;
      });

      localStorage.setItem("userShortlist", JSON.stringify(matchedResults));
      localStorage.setItem("userGpa", userGPA);

    } catch (err) {
      console.error("Failed to sync with federal college data:", err);
    } finally {
      if (loader) loader.style.display = "none";
      if (saveBtn) saveBtn.textContent = "Save Preferences";
    }
  });
}