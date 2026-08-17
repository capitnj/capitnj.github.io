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


const ZIP_CODE_COORDS = {
    "08540": { lat: 40.3573, lng: -74.6672, city: "Princeton, NJ" },
    "08901": { lat: 40.4774, lng: -74.4446, city: "New Brunswick, NJ" },
    "07102": { lat: 40.7282, lng: -74.1697, city: "Newark, NJ" },
    "07960": { lat: 40.8064, lng: -74.5213, city: "Madison, NJ" },
    "08105": { lat: 39.9526, lng: -74.5213, city: "Camden, NJ" },
    "07960": { lat: 40.8064, lng: -74.5213, city: "Madison, NJ" },
    "07470": { lat: 40.9956, lng: -74.2263, city: "Ramsey, NJ" },
    "07470": { lat: 40.9956, lng: -74.2263, city: "Mahwah, NJ" },
    "08873": { lat: 40.5606, lng: -74.4181, city: "Ewing, NJ" },
    "10027": { lat: 40.8075, lng: -73.9626, city: "New York, NY" },
    "19104": { lat: 39.9526, lng: -75.1904, city: "Philadelphia, PA" },
    "02906": { lat: 41.8240, lng: -71.4128, city: "Providence, RI" },
    "06510": { lat: 41.3083, lng: -72.9279, city: "New Haven, CT" }
};


const COLLEGE_LOCATIONS = {
    "Rutgers University-New Brunswick": { lat: 40.4774, lng: -74.4446 },
    "Rutgers University-Newark": { lat: 40.7282, lng: -74.1697 },
    "Rutgers University-Camden": { lat: 39.9526, lng: -74.7613 },
    "Princeton University": { lat: 40.3573, lng: -74.6672 },
    "New Jersey Institute of Technology": { lat: 40.7413, lng: -74.1760 },
    "Rowan University": { lat: 39.6856, lng: -75.1213 },
    "Kean University": { lat: 40.6687, lng: -74.2447 },
    "Montclair State University": { lat: 40.8213, lng: -74.1894 },
    "Stockton University": { lat: 39.4584, lng: -74.5185 },
    "Seton Hall University": { lat: 40.7389, lng: -74.2338 },
    "Drew University": { lat: 40.8064, lng: -74.5213 },
    "William Paterson University": { lat: 40.8925, lng: -74.1721 },
    "The College of New Jersey": { lat: 40.2511, lng: -74.7772 },
    "Rider University": { lat: 40.2291, lng: -74.6547 },
    "Ramapo College of New Jersey": { lat: 41.0953, lng: -74.2381 },
    "Fairleigh Dickinson University": { lat: 40.8553, lng: -74.0269 },
    "Monmouth University": { lat: 40.2204, lng: -74.1767 },
    "Saint Peters University": { lat: 40.7234, lng: -74.0073 }
};

function haversineDistance(lat1, lng1, lat2, lng2) {
    const R = 3959; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

async function loadGlobalCollegeDatabase() {
    try {
        const response = await fetch("https://cdn.jsdelivr.net/gh/Hipo/university-domains-list/world_universities_and_domains.json");

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

            
            const coords = COLLEGE_LOCATIONS[school.name] || { lat: 40.0583, lng: -74.4057 };

            return {
                id: "school_" + index,
                name: school.name,
                type: school.name.toLowerCase().includes("university") ? "University" : "College",
                setting: isNJ ? "Suburban" : "Urban",
                state: stateValue,
                country: school.country,
                webPage: (school.web_pages && school.web_pages[0]) || "",
                netPrice: estimatedNetPrice,
                distanceTier: distanceTier,
                lat: coords.lat,
                lng: coords.lng
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
                distanceTier: "local",
                lat: 40.4774,
                lng: -74.4446
            },
            {
                id: "princeton",
                name: "Princeton University",
                type: "Private",
                setting: "Suburban",
                state: "NJ",
                country: "United States",
                netPrice: 12000,
                distanceTier: "local",
                lat: 40.3573,
                lng: -74.6672
            },
            {
                id: "njit",
                name: "New Jersey Institute of Technology (NJIT)",
                type: "Public",
                setting: "Urban",
                state: "NJ",
                country: "United States",
                netPrice: 16000,
                distanceTier: "local",
                lat: 40.7413,
                lng: -74.1760
            }
        ];

        window.dispatchEvent(new CustomEvent("database-ready"));
    }
}


window.getCollegesByZipCode = function(zipCode, radiusMiles = 30) {
    const coords = ZIP_CODE_COORDS[zipCode];
    if (!coords) {
        console.warn("Zip code " + zipCode + " not found in database");
        return [];
    }

    return window.COLLEGES.filter(function(college) {
        const distance = haversineDistance(coords.lat, coords.lng, college.lat, college.lng);
        return distance <= radiusMiles;
    }).sort(function(a, b) {
        const distA = haversineDistance(coords.lat, coords.lng, a.lat, a.lng);
        const distB = haversineDistance(coords.lat, coords.lng, b.lat, b.lng);
        return distA - distB;
    });
};

loadGlobalCollegeDatabase();