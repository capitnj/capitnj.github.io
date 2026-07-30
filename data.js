// CapItNJ Global Database Loader
// Loads real university data from the open Hipo university-domains-list dataset,
// covering thousands of US schools plus international options.

window.COLLEGES = [];

const CURATED_INTERNATIONAL = [
    "University of Toronto", "McGill University", "University of British Columbia",
    "University of Oxford", "University of Cambridge", "Imperial College London",
    "University of Melbourne", "University of Sydney", "National University of Singapore",
    "University of Waterloo"
];

async function loadGlobalCollegeDatabase() {
    try {
        const response = await fetch('https://cdn.jsdelivr.net/gh/Hipo/university-domains-list/world_universities_and_domains.json');
        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
        const allSchools = await response.json();

        const usSchools = allSchools.filter(s => s.country === "United States");
        const intlSchools = allSchools.filter(s => CURATED_INTERNATIONAL.includes(s.name));

        const combined = [...usSchools, ...intlSchools];

        window.COLLEGES = combined.map(school => {
            const isUS = school.country === "United States";
            const nameLower = school.name.toLowerCase();
            const isNJ = school["state-province"] === "New Jersey" ||
                         nameLower.includes("new jersey") ||
                         nameLower.includes("rutgers") ||
                         nameLower.includes("princeton") ||
                         nameLower.includes("rowan") ||
                         nameLower.includes("kean") ||
                         nameLower.includes("montclair") ||
                         nameLower.includes("njit") ||
                         nameLower.includes("stockton") ||
                         nameLower.includes("seton hall") ||
                         nameLower.includes("drew university") ||
                         nameLower.includes("william paterson");

            return {
                name: school.name,
                type: nameLower.includes("university") ? "University" : "College",
                setting: isNJ ? "Suburban" : "Urban",
                state: isNJ ? "NJ" : (isUS ? "US" : "INTL"),
                country: school.country,
                webPage: (school.web_pages && school.web_pages[0]) || "",
                netPrice: isNJ ? 16500 : (isUS ? 24000 : 31000), // placeholder estimate until real cost data is added
                distanceTier: isNJ ? "local" : (isUS ? "far" : "international")
            };
        });

        window.dispatchEvent(new CustomEvent('database-ready'));
        console.log(`Database initialized. Loaded ${window.COLLEGES.length} institutions.`);
    } catch (error) {
        console.error("Database loading failed:", error);
        window.COLLEGES = [
            { name: "Rutgers University - New Brunswick", type: "Public", setting: "Suburban", state: "NJ", country: "United States", netPrice: 17500, distanceTier: "local" },
            { name: "Princeton University", type: "Private", setting: "Suburban", state: "NJ", country: "United States", netPrice: 12000, distanceTier: "local" },
            { name: "New Jersey Institute of Technology (NJIT)", type: "Public", setting: "Urban", state: "NJ", country: "United States", netPrice: 16000, distanceTier: "local" }
        ];
        window.dispatchEvent(new CustomEvent('database-ready'));
    }
}

loadGlobalCollegeDatabase();