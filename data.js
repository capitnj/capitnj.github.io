window.COLLEGES = [];

const CURATED_INTERNATIONAL = [
    "University of Toronto", "McGill University", "University of British Columbia",
    "University of Oxford", "University of Cambridge", "Imperial College London",
    "University of Melbourne", "University of Sydney", "National University of Singapore",
    "University of Waterloo"
];

const NJ_EXACT_NAMES = [
    "Rutgers University-New Brunswick", "Rutgers University-Newark", "Rutgers University-Camden",
    "Princeton University", "Rowan University", "Kean University",
    "Montclair State University", "New Jersey Institute of Technology",
    "Stockton University", "Seton Hall University", "Drew University",
    "William Paterson University", "The College of New Jersey",
    "Rider University", "Ramapo College of New Jersey",
    "Fairleigh Dickinson University", "Monmouth University", "Saint Peters University"
];

const NEARBY_STATES = [
    "New York", "Pennsylvania", "Connecticut", "Delaware",
    "Maryland", "Massachusetts", "Rhode Island", "District of Columbia"
];

async function loadGlobalCollegeDatabase() {
    try {
        const response = await fetch("cdn.jsdelivr.net/gh/Hipo/university-domains-list/world_universities_and_domains.json");

        if (!response.ok) {
            throw new Error("Fetch failed: " + response.status);
        }

        const allSchools = await response.json();

        const usSchools = allSchools.filter(function(s) { return s.country === "United States"; });
        const intlSchools = allSchools.filter(function(s) { return CURATED_INTERNATIONAL.includes(s.name); });

        const combined = usSchools.concat(intlSchools);

        window.COLLEGES = combined.map(function(school, index) {
            const isUS = school.country === "United States";
            const apiState = (school["state-province"] || "").trim();

            const isNJ = apiState === "New Jersey" || NJ_EXACT_NAMES.includes(school.name);

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
                id: "school_" + index,
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
        console.log("Database initialized. Loaded " + window.COLLEGES.length + " institutions.");
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