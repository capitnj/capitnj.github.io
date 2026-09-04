window.COLLEGES = [];

const WORLD_URL =
    "https://cdn.jsdelivr.net/gh/Hipo/university-domains-list/world_universities_and_domains.json";


const REGIONS = {
    Northeast: [
        "Maine",
        "New Hampshire",
        "Vermont",
        "Massachusetts",
        "Rhode Island",
        "Connecticut",
        "New York",
        "New Jersey",
        "Pennsylvania"
    ],

    Midwest: [
        "Ohio",
        "Michigan",
        "Indiana",
        "Illinois",
        "Wisconsin",
        "Minnesota",
        "Iowa",
        "Missouri",
        "North Dakota",
        "South Dakota",
        "Nebraska",
        "Kansas"
    ],

    South: [
        "Delaware",
        "Maryland",
        "District of Columbia",
        "Virginia",
        "West Virginia",
        "North Carolina",
        "South Carolina",
        "Georgia",
        "Florida",
        "Kentucky",
        "Tennessee",
        "Mississippi",
        "Alabama",
        "Oklahoma",
        "Texas",
        "Arkansas",
        "Louisiana"
    ],

    West: [
        "Montana",
        "Idaho",
        "Wyoming",
        "Colorado",
        "New Mexico",
        "Arizona",
        "Utah",
        "Nevada",
        "California",
        "Oregon",
        "Washington",
        "Alaska",
        "Hawaii"
    ]
};


const SCHOOL_STATE_KEYWORDS = {

    "New Jersey": [
        "rutgers",
        "princeton",
        "rowan",
        "kean",
        "montclair",
        "stockton university",
        "seton hall",
        "drew university",
        "william paterson",
        "college of new jersey",
        "rider university",
        "ramapo",
        "fairleigh dickinson",
        "monmouth university",
        "saint peter",
        "new jersey institute",
        "new jersey",
        "njit",
        "stevens institute"
    ],

    "New York": [
        "new york university",
        "cornell university",
        "syracuse university",
        "university at buffalo",
        "stony brook university",
        "columbia university",
        "fordham university",
        "pace university",
        "hofstra university",
        "new york",
        "cuny",
        "suny",
        "rochester institute",
        "vassar college",
        "bard college",
        "colgate university",
        "hamilton college"
    ],

    "Connecticut": [
        "yale",
        "university of connecticut",
        "uconn",
        "connecticut college",
        "connecticut state",
        "southern connecticut",
        "central connecticut",
        "eastern connecticut",
        "western connecticut",
        "fairfield university",
        "quinnipiac",
        "sacred heart university",
        "university of hartford",
        "university of new haven",
        "trinity college",
        "wesleyan university",
        "university of bridgeport",
        "albertus magnus",
        "connecticut"
    ],

    "Pennsylvania": [
        "university of pennsylvania",
        "penn state",
        "temple university",
        "drexel university",
        "carnegie mellon",
        "lehigh university",
        "villanova university",
        "pennsylvania",
        "pittsburgh",
        "bucknell",
        "swarthmore",
        "haverford",
        "lafayette college",
        "dickinson college"
    ],

    "Massachusetts": [
        "harvard university",
        "massachusetts institute of technology",
        "mit",
        "boston university",
        "northeastern university",
        "tufts university",
        "university of massachusetts",
        "massachusetts",
        "boston college",
        "brandeis",
        "amherst college",
        "williams college",
        "wellesley",
        "smith college",
        "mount holyoke",
        "babson",
        "bentley university"
    ],

    "Maine": [
        "university of maine",
        "bowdoin",
        "colby college",
        "bates college",
        "maine"
    ],

    "New Hampshire": [
        "university of new hampshire",
        "dartmouth",
        "new hampshire"
    ],

    "Vermont": [
        "university of vermont",
        "middlebury",
        "vermont"
    ],

    "Rhode Island": [
        "university of rhode island",
        "brown university",
        "rhode island school of design",
        "providence college",
        "rhode island"
    ],

    "Maryland": [
        "university of maryland",
        "johns hopkins",
        "towson university",
        "loyola university maryland",
        "maryland"
    ],

    "Virginia": [
        "university of virginia",
        "virginia tech",
        "virginia commonwealth",
        "george mason",
        "college of william",
        "james madison university",
        "virginia"
    ],

    "California": [
        "stanford",
        "usc",
        "university of southern california",
        "california",
        "cal poly",
        "santa clara university",
        "pepperdine",
        "san diego state",
        "ucla",
        "uc berkeley"
    ],

    "Washington": [
        "university of washington",
        "washington state university",
        "seattle university"
    ],

    "Oregon": [
        "university of oregon",
        "oregon state university",
        "portland state university"
    ],

    "Arizona": [
        "university of arizona",
        "arizona state university",
        "northern arizona university"
    ],

    "Colorado": [
        "university of colorado",
        "colorado state university",
        "university of denver"
    ],

    "Texas": [
        "university of texas",
        "texas a&m",
        "texas tech",
        "baylor university",
        "rice university"
    ],

    "Florida": [
        "university of florida",
        "florida state university",
        "university of miami",
        "university of central florida",
        "university of south florida"
    ],

    "Illinois": [
        "university of illinois",
        "northwestern university",
        "university of chicago",
        "depaul university"
    ],

    "Michigan": [
        "university of michigan",
        "michigan state university"
    ],

    "Ohio": [
        "ohio state university",
        "university of cincinnati",
        "case western"
    ]
};


const STATE_ABBREVIATIONS = {
    "al": "Alabama",
    "ak": "Alaska",
    "az": "Arizona",
    "ar": "Arkansas",
    "ca": "California",
    "co": "Colorado",
    "ct": "Connecticut",
    "de": "Delaware",
    "fl": "Florida",
    "ga": "Georgia",
    "hi": "Hawaii",
    "id": "Idaho",
    "il": "Illinois",
    "in": "Indiana",
    "ia": "Iowa",
    "ks": "Kansas",
    "ky": "Kentucky",
    "la": "Louisiana",
    "me": "Maine",
    "md": "Maryland",
    "ma": "Massachusetts",
    "mi": "Michigan",
    "mn": "Minnesota",
    "ms": "Mississippi",
    "mo": "Missouri",
    "mt": "Montana",
    "ne": "Nebraska",
    "nv": "Nevada",
    "nh": "New Hampshire",
    "nj": "New Jersey",
    "nm": "New Mexico",
    "ny": "New York",
    "nc": "North Carolina",
    "nd": "North Dakota",
    "oh": "Ohio",
    "ok": "Oklahoma",
    "or": "Oregon",
    "pa": "Pennsylvania",
    "ri": "Rhode Island",
    "sc": "South Carolina",
    "sd": "South Dakota",
    "tn": "Tennessee",
    "tx": "Texas",
    "ut": "Utah",
    "vt": "Vermont",
    "va": "Virginia",
    "wa": "Washington",
    "wv": "West Virginia",
    "wi": "Wisconsin",
    "wy": "Wyoming",
    "dc": "District of Columbia"
};


function expandStateName(value) {

    if (!value) return "";

    const cleaned = String(value)
        .trim()
        .replace(/\./g, "")
        .replace(/_/g, " ")
        .replace(/\s+/g, " ");

    const lower = cleaned.toLowerCase();

    if (STATE_ABBREVIATIONS[lower]) {
        return STATE_ABBREVIATIONS[lower];
    }

    for (const fullName of Object.values(STATE_ABBREVIATIONS)) {
        if (fullName.toLowerCase() === lower) {
            return fullName;
        }
    }

    for (const fullName of Object.keys(SCHOOL_STATE_KEYWORDS)) {
        if (fullName.toLowerCase() === lower) {
            return fullName;
        }
    }

    return cleaned;
}


function getSchoolState(school) {

    const apiState =
        (school["state-province"] || "").trim();

    if (apiState) {
        return expandStateName(apiState);
    }

    const name =
        String(school.name || "").toLowerCase();

    // Avoid tagging D.C.'s George Washington University as Washington state
    if (
        name.includes("george washington") &&
        !name.includes("washington state")
    ) {
        return "District of Columbia";
    }

    // Prefer longer / more specific keyword hits first
    const rankedStates = Object.keys(SCHOOL_STATE_KEYWORDS)
        .sort(function (a, b) {
            const aMax = Math.max.apply(
                null,
                SCHOOL_STATE_KEYWORDS[a].map(function (k) {
                    return k.length;
                })
            );
            const bMax = Math.max.apply(
                null,
                SCHOOL_STATE_KEYWORDS[b].map(function (k) {
                    return k.length;
                })
            );
            return bMax - aMax;
        });

    for (let i = 0; i < rankedStates.length; i++) {
        const state = rankedStates[i];
        const keywords = SCHOOL_STATE_KEYWORDS[state];

        if (
            keywords.some(function (keyword) {
                return name.includes(keyword);
            })
        ) {
            return state;
        }
    }

    return "";
}


function getSchoolOwnership(school) {

    const name =
        String(school.name || "").toLowerCase();

    const domain =
        String(
            (
                school.domains &&
                school.domains[0]
            ) || ""
        ).toLowerCase();


    const publicKeywords = [
        "state university",
        "state college",
        "university of ",
        "university at ",
        "university in ",
        "polytechnic institute",
        "polytechnic university"
    ];


    const knownPrivateKeywords = [
        "harvard",
        "princeton",
        "yale",
        "stanford",
        "columbia",
        "cornell",
        "brown",
        "dartmouth",
        "duke",
        "northwestern",
        "new york university",
        "nyu",
        "boston university",
        "northeastern",
        "tufts",
        "carnegie mellon",
        "university of pennsylvania",
        "upenn",
        "university of southern california",
        "usc",
        "rice university",
        "georgetown",
        "villanova",
        "drexel",
        "temple university",
        "fordham",
        "pace university",
        "hofstra",
        "seton hall",
        "rider university",
        "drew university",
        "fairleigh dickinson",
        "monmouth university",
        "saint peter",
        "pepperdine",
        "baylor university",
        "university of chicago",
        "case western"
    ];


    if (
        knownPrivateKeywords.some(keyword =>
            name.includes(keyword)
        )
    ) {
        return "Private";
    }


    if (
        publicKeywords.some(keyword =>
            name.includes(keyword)
        )
    ) {
        return "Public";
    }


    if (
        domain.endsWith(".edu") &&
        (
            name.includes("university") ||
            name.includes("college")
        )
    ) {
        return "Private";
    }


    return "Private";
}


function estimateRequiredGPA(name) {

    const lower =
        String(name || "").toLowerCase();

    const highlySelective = [
        "harvard",
        "stanford",
        "princeton",
        "yale",
        "columbia",
        "mit",
        "massachusetts institute",
        "caltech",
        "california institute of technology",
        "university of chicago",
        "northwestern",
        "duke",
        "brown",
        "dartmouth",
        "cornell",
        "university of pennsylvania"
    ];

    const selective = [
        "new york university",
        "northeastern",
        "boston university",
        "tufts",
        "carnegie mellon",
        "university of michigan",
        "university of southern california",
        "usc",
        "university of california",
        "uc berkeley",
        "ucla",
        "rice university",
        "georgetown"
    ];

    const moderatelySelective = [
        "rutgers",
        "njit",
        "new jersey institute",
        "penn state",
        "ohio state",
        "university of washington",
        "university of florida",
        "florida state",
        "university of texas",
        "arizona state",
        "university of colorado"
    ];

    if (
        highlySelective.some(x =>
            lower.includes(x)
        )
    ) {
        return 3.85;
    }

    if (
        selective.some(x =>
            lower.includes(x)
        )
    ) {
        return 3.65;
    }

    if (
        moderatelySelective.some(x =>
            lower.includes(x)
        )
    ) {
        return 3.20;
    }

    return 2.75;
}


function getDistanceTier(country, state) {

    if (country !== "United States") {
        return "international";
    }

    if (state === "New Jersey") {
        return "local";
    }

    if (
        [
            "New York",
            "Pennsylvania",
            "Connecticut",
            "Delaware"
        ].includes(state)
    ) {
        return "regional";
    }

    return "far";
}


async function loadGlobalCollegeDatabase() {

    console.log("CapItNJ: loading schools...");

    try {

        const response =
            await fetch(WORLD_URL);

        if (!response.ok) {
            throw new Error(
                "Database request failed: " +
                response.status
            );
        }

        const allSchools =
            await response.json();

        console.log(
            "CapItNJ: raw schools received:",
            allSchools.length
        );


        window.COLLEGES =
            allSchools
                .filter(school =>
                    school &&
                    school.name &&
                    school.country
                )
                .map((school, index) => {

                    const country =
                        school.country;

                    const state =
                        country === "United States"
                            ? getSchoolState(school)
                            : "";

                    const isUS =
                        country === "United States";

                    return {

                        id:
                            "school_" + index,

                        name:
                            school.name,

                        type:
                            school.name
                                .toLowerCase()
                                .includes("university")
                                ? "University"
                                : "College",

                        ownership:
                            getSchoolOwnership(
                                school
                            ),

                        setting:
                            "Unknown",

                        state:
                            state,

                        region:
                            isUS
                                ? (
                                    Object.keys(REGIONS)
                                        .find(region =>
                                            REGIONS[region]
                                                .includes(state)
                                        ) || ""
                                )
                                : "",

                        country:
                            country,

                        webPage:
                            (
                                school.web_pages &&
                                school.web_pages[0]
                            ) || "",

                        estimatedMinGPA:
                            estimateRequiredGPA(
                                school.name
                            ),

                        netPrice:
                            isUS
                                ? 24000
                                : 31000,

                        distanceTier:
                            getDistanceTier(
                                country,
                                state
                            )

                    };

                });


        console.log(
            "CapItNJ: FINAL SCHOOL COUNT:",
            window.COLLEGES.length
        );


        window.dispatchEvent(
            new CustomEvent(
                "database-ready"
            )
        );


    } catch (error) {

        console.error(
            "CapItNJ database failed:",
            error
        );


        window.COLLEGES = [];


        window.dispatchEvent(
            new CustomEvent(
                "database-ready"
            )
        );

    }

}


loadGlobalCollegeDatabase();