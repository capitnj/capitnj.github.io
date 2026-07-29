// matching.js - Real-Time Federal Update Integration

// Your verified government api.data.gov access key
const API_KEY = "GtNXgFPhac42LoNAwniX9lRIP757nArl7BV9Xkvg"; 

// Using your exact HTML ID "profile-form"
const profileForm = document.getElementById("profile-form");

if (profileForm) {
  profileForm.addEventListener("submit", async function (e) {
        e.preventDefault();
    document.getElementById("matching-loader").style.display = "block";
    document.getElementById("save-btn").textContent = "Analyzing Fits...";
    // We let Firebase finish saving the profile data first, then handle matching
    
    // 1. Grab values using your exact HTML form IDs
    const userGPA = parseFloat(document.getElementById("gpa").value);
    const userIncome = document.getElementById("budget").value; // 'low', 'mid', or 'high'
    const userDistance = document.getElementById("distance").value; // 'local', 'regional', etc.
    const userCollegeType = document.getElementById("college-type").value; // 'public', 'private', 'either'

    // 2. Map your 'budget' dropdown values directly to official federal update brackets
    let incomeCostField = "latest.cost.net_price.public.by_income_level.0-30000"; 
    let budgetCap = 15000;

    if (userIncome === "mid") {
      incomeCostField = "latest.cost.net_price.public.by_income_level.48001-75000";
      budgetCap = 30000;
    } else if (userIncome === "high") {
      incomeCostField = "latest.cost.net_price.public.by_income_level.110001plus";
      budgetCap = 999999; // Unlimited budget
    }

    // 3. Build the government database API URL
    // Pulls Name, State, Admission Rate, and the custom Net Price bracket data fields
     let governmentApiUrl = `https://data.gov{API_KEY}&_fields=id,school.name,school.state,school.ownership,latest.admissions.admission_rate.overall,${incomeCostField}&_sort=${incomeCostField}&_per_page=100`;
    // Local filter optimization: if they choose 'local', prioritize NJ colleges instantly
    if (userDistance === "local") {
      governmentApiUrl += "&school.state=NJ";
    }

    try {
      console.log("Fetching live data packages from federal servers...");
      const response = await fetch(governmentApiUrl);
      const resultData = await response.json();
      const liveCollegesList = resultData.results;

      // 4. Run your algorithm filtration process over live data rows
      const matchedResults = liveCollegesList.filter(college => {
        const liveNetPrice = college[incomeCostField];
        const liveAdmissionRate = college["latest.admissions.admission_rate.overall"];
        const ownershipType = college["school.ownership"]; // 1 = Public, 2 = Private Non-Profit

        // Budget constraint rule check
        if (liveNetPrice && liveNetPrice > budgetCap) return false;

        // Academic safety check using live admission selectiveness 
        // Skips ultra-selective schools if GPA is below 3.0
        if (userGPA < 3.0 && liveAdmissionRate && liveAdmissionRate < 0.20) return false;

        // Public vs Private preferences calibration
        if (userCollegeType === "public" && ownershipType !== 1) return false;
        if (userCollegeType === "private" && ownershipType !== 2) return false;

        return true;
      });

      // 5. Cache the filtered database match structure into browser memory
      localStorage.setItem("userShortlist", JSON.stringify(matchedResults));
       localStorage.setItem("userGpa", userGPA);
      localStorage.setItem("userIncomeTier", userIncome);
      
      // Delays redirect slightly so Firebase code block can finish syncing simultaneously
      setTimeout(() => {
        window.location.href = "matches.html";
      }, 800);

    } catch (err) {
      console.error("Failed to sync with real-time federal statistics:", err);
    }
  });
}