Found it. Your actual data.js file has extra text stuck onto the end of it — a chunk of instructions and an HTML code block that were meant for matches.html, but got pasted into data.js instead. That text isn't valid JavaScript, so the whole file fails to parse, which means window.COLLEGES never gets set and the "database-ready" event never fires. That's why every college disappeared.

Fix: replace your data.js with this (clean, nothing after loadGlobalCollegeDatabase();):

javascript
window.COLLEGES = [];

const CURATED_INTERNATIONAL = [
    "University of Toronto", "McGill University", "University of British Columbia",
    "University of Oxford", "University of Cambridge", "Imperial College London",
    "University of Melbourne", "University of Sydney", "National University of Singapore",
    "University of Waterloo"
];

// Exact-name whitelist for major NJ schools whose "state-province" field
// is sometimes missing/blank in the source dataset. Using exact names
// instead of loose substrings avoids false positives like
// "Rowan-Cabarrus Community College" (NC) matching on "rowan".
const NJ_EXACT_NAMES = [
    "Rutgers University-New Brunswick", "Rutgers University-Newark", "Rutgers University-Camden",
    "Princeton University", "Rowan University", "Kean University",
    "Montclair State University", "New Jersey Institute of Technology",
    "Stockton University", "Seton Hall University", "Drew University",
    "William Paterson University", "The College of New Jersey",
    "Rider University", "Ramapo College of New Jersey",
    "Fairleigh Dickinson University", "Monmouth University", "Saint Peter's University"
];

const NEARBY_STATES = [
    "New York", "Pennsylvania", "Connecticut", "Delaware",
    "Maryland", "Massachusetts", "Rhode Island", "District of Columbia"
];

async function loadGlobalCollegeDatabase() {
    try {
        const response = await fetch(
            "https://cdn.jsdelivr.net/gh/Hipo/university-domains-list/world_universities_and_domains.json"
        );

        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

        const allSchools = await response.json();

        const usSchools = allSchools.filter(s => s.country === "United States");
        const intlSchools = allSchools.filter(s => CURATED_INTERNATIONAL.includes(s.name));

        const combined = [...usSchools, ...intlSchools];

        window.COLLEGES = combined.map((school, index) => {
            const isUS = school.country === "United States";
            const apiState = (school["state-province"] || "").trim();

            // Primary NJ check: real state field. Fallback: exact-name match
            // (only for the small set of flagship schools that lack the field).
            const isNJ =
                apiState === "New Jersey" ||
                NJ_EXACT_NAMES.includes(school.name);

            let stateValue = "NJ";
            let distanceTier = "local";

            if (!isNJ) {
                if (isUS) {
                    stateValue = apiState || "OOS";
                    distanceTier = NEARBY_STATES.includes(apiState) ? "regional" : "far";
                } else {
                    stateValue = "INTL";
                    distanceTier = "international";
                }
            }

            let estimatedNetPrice = isNJ ? 16500 : (isUS ? 24000 : 31000);

            return {
                id: `school_${index}`,
                name: school.name,
                type: school.name.toLowerCase().includes("university") ? "University" : "College",
                setting: isNJ ? "Suburban" : "Urban",
                state: stateValue,
                country: school.country,
                webPage: (school.web_pages && school.web_pages[0]) || "",
                netPrice: estimatedNetPrice,
                distanceTier: distanceTier
            };
        });

        window.dispatchEvent(new CustomEvent("database-ready"));
        console.log(`Database initialized. Loaded ${window.COLLEGES.length} institutions.`);
    } catch (error) {
        console.error("Database loading failed:", error);

        window.COLLEGES = [
            {
                id: "rutgers_nb",
                name: "Rutgers University - New Brunswick",
                type: "Public",
                setting: "Suburban",
                state: "NJ",
                country: "United States",
                netPrice: 17500,
                distanceTier: "local"
            },
            {
                id: "princeton",
                name: "Princeton University",
                type: "Private",
                setting: "Suburban",
                state: "NJ",
                country: "United States",
                netPrice: 12000,
                distanceTier: "local"
            },
            {
                id: "njit",
                name: "New Jersey Institute of Technology (NJIT)",
                type: "Public",
                setting: "Urban",
                state: "NJ",
                country: "United States",
                netPrice: 16000,
                distanceTier: "local"
            }
        ];

        window.dispatchEvent(new CustomEvent("database-ready"));
    }
}

loadGlobalCollegeDatabase();