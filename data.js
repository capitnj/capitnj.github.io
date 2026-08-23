window.COLLEGES = [];

const WORLD_URL =
    "https://cdn.jsdelivr.net/gh/Hipo/university-domains-list/world_universities_and_domains.json";


/* =========================================================
   REGIONS
========================================================= */

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


/* =========================================================
   STATE DETECTION
========================================================= */

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
        "new jersey institute"
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
        "hofstra university"
    ],

    "Pennsylvania": [
        "university of pennsylvania",
        "penn state",
        "temple university",
        "drexel university",
        "carnegie mellon",
        "lehigh university",
        "villanova university"
    ],

    "Massachusetts": [
        "harvard university",
        "massachusetts institute of technology",
        "mit",
        "boston university",
        "northeastern university",
        "tufts university",
        "university of massachusetts"
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


function getSchoolState(school) {

    const apiState =
        (school["state-province"] || "").trim();

    if (apiState) {
        return apiState;
    }

    const name =
        String(school.name || "").toLowerCase();

    for (const state in SCHOOL_STATE_KEYWORDS) {

        const keywords =
            SCHOOL_STATE_KEYWORDS[state];

        if (
            keywords.some(keyword =>
                name.includes(keyword)
            )
        ) {
            return state;
        }
    }

    return "";
}


/* =========================================================
   GPA ESTIMATE
========================================================= */

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


/* =========================================================
   DISTANCE
========================================================= */

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


/* =========================================================
   LOAD DATABASE
========================================================= */

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


        /*
         * IMPORTANT:
         * Do NOT remove schools whose state
         * could not be detected.
         *
         * That's what was killing your
         * database count before.
         */


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


        /*
         * Keep the page from being permanently
         * blank if the API is temporarily down.
         */

        window.COLLEGES = [];


        window.dispatchEvent(
            new CustomEvent(
                "database-ready"
            )
        );

    }
}


loadGlobalCollegeDatabase();