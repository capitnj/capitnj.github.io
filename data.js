window.COLLEGES = [];

const CURATED_INTERNATIONAL = [
    "University of Toronto",
    "McGill University",
    "University of British Columbia",
    "University of Oxford",
    "University of Cambridge",
    "Imperial College London",
    "University of Melbourne",
    "University of Sydney",
    "National University of Singapore",
    "University of Waterloo"
];


/* ================================
   NEW JERSEY SCHOOLS
================================ */

const NJ_EXACT_NAMES = [
    "Rutgers University-New Brunswick",
    "Rutgers University-Newark",
    "Rutgers University-Camden",
    "Princeton University",
    "Rowan University",
    "Kean University",
    "Montclair State University",
    "New Jersey Institute of Technology",
    "Stockton University",
    "Seton Hall University",
    "Drew University",
    "William Paterson University",
    "The College of New Jersey",
    "Rider University",
    "Ramapo College of New Jersey",
    "Fairleigh Dickinson University",
    "Monmouth University",
    "Saint Peters University"
];


/* ================================
   STATE REGIONS
================================ */

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


/* ================================
   KNOWN STATE DETECTION

   The API does NOT reliably give us
   US state information, so we detect
   obvious states from school names.
================================ */

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

    California: [
        "california",
        "stanford",
        "usc",
        "university of southern california",
        "cal poly",
        "santa clara university",
        "pepperdine",
        "san diego state"
    ],

    Washington: [
        "university of washington",
        "washington state university",
        "seattle university"
    ],

    Oregon: [
        "university of oregon",
        "oregon state university",
        "portland state university"
    ],

    Arizona: [
        "university of arizona",
        "arizona state university",
        "northern arizona university"
    ],

    Colorado: [
        "university of colorado",
        "colorado state university",
        "university of denver"
    ],

    Texas: [
        "university of texas",
        "texas a&m",
        "texas tech",
        "baylor university",
        "rice university"
    ],

    Florida: [
        "university of florida",
        "florida state university",
        "university of miami",
        "university of central florida",
        "university of south florida"
    ],

    NewYork: [
        "new york university",
        "cornell university",
        "syracuse university",
        "university at buffalo",
        "stony brook university",
        "columbia university"
    ],

    Pennsylvania: [
        "university of pennsylvania",
        "penn state",
        "temple university",
        "drexel university",
        "carnegie mellon",
        "lehigh university",
        "villanova university"
    ],

    Massachusetts: [
        "harvard university",
        "massachusetts institute of technology",
        "mit",
        "boston university",
        "northeastern university",
        "tufts university",
        "university of massachusetts"
    ],

    Illinois: [
        "university of illinois",
        "northwestern university",
        "university of chicago",
        "depaul university"
    ],

    Michigan: [
        "university of michigan",
        "michigan state university"
    ],

    Ohio: [
        "ohio state university",
        "university of cincinnati",
        "case western"
    ]
};


/* ================================
   GET SCHOOL STATE
================================ */

function getSchoolState(school) {

    const apiState = (school["state-province"] || "").trim();

    if (apiState) {
        return apiState;
    }

    const name = school.name.toLowerCase();

    if (NJ_EXACT_NAMES.some(n =>
        n.toLowerCase() === name
    )) {
        return "New Jersey";
    }

    for (const stateKey in SCHOOL_STATE_KEYWORDS) {

        const keywords = SCHOOL_STATE_KEYWORDS[stateKey];

        if (
            keywords.some(keyword =>
                name.includes(keyword)
            )
        ) {

            return stateKey === "NewYork"
                ? "New York"
                : stateKey;
        }
    }

    return "";
}


/* ================================
   GPA ESTIMATION

   IMPORTANT:
   This is only used to stop Matches
   from treating every school equally.

   Schools without real admissions
   data are given a neutral GPA range.
================================ */

function estimateRequiredGPA(name) {

    const lower = name.toLowerCase();

    const highlySelective = [
        "harvard",
        "stanford",
        "princeton",
        "yale",
        "columbia",
        "mit",
        "massachusetts institute",
        "california institute of technology",
        "caltech",
        "university of chicago",
        "northwestern",
        "duke university",
        "brown university",
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
        highlySelective.some(keyword =>
            lower.includes(keyword)
        )
    ) {
        return 3.85;
    }

    if (
        selective.some(keyword =>
            lower.includes(keyword)
        )
    ) {
        return 3.65;
    }

    if (
        moderatelySelective.some(keyword =>
            lower.includes(keyword)
        )
    ) {
        return 3.2;
    }

    return 2.75;
}


/* ================================
   DATABASE LOADER
================================ */

async function loadGlobalCollegeDatabase() {

    try {

        const response = await fetch(
            "https://cdn.jsdelivr.net/gh/Hipo/university-domains-list/world_universities_and_domains.json"
        );

        if (!response.ok) {
            throw new Error(
                "Fetch failed: " + response.status
            );
        }

        const allSchools = await response.json();


        const usSchools = allSchools.filter(
            school => school.country === "United States"
        );


        const intlSchools = allSchools.filter(
            school =>
                CURATED_INTERNATIONAL.includes(
                    school.name
                )
        );


        const combined =
            usSchools.concat(intlSchools);


        window.COLLEGES =
            combined
                .map(function(school, index) {

                    const isUS =
                        school.country ===
                        "United States";


                    const detectedState =
                        isUS
                            ? getSchoolState(school)
                            : "";


                    const isNJ =
                        detectedState ===
                        "New Jersey";


                    const region =
                        Object.keys(REGIONS)
                            .find(regionName =>
                                REGIONS[regionName]
                                    .includes(detectedState)
                            ) || "";


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
                            isNJ
                                ? "Suburban"
                                : "Urban",

                        state:
                            detectedState,

                        region:
                            region,

                        country:
                            school.country,

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
                            isNJ
                                ? 16500
                                : isUS
                                    ? 24000
                                    : 31000

                    };

                })

                /* REMOVE US SCHOOLS
                   WHOSE LOCATION WE
                   CANNOT ACTUALLY VERIFY */
                .filter(school => {

                    if (
                        school.country !==
                        "United States"
                    ) {
                        return true;
                    }

                    return school.state !== "";

                });


        console.log(
            "Database initialized:",
            window.COLLEGES.length,
            "schools"
        );


        window.dispatchEvent(
            new CustomEvent(
                "database-ready"
            )
        );

    }

    catch (error) {

        console.error(
            "Database loading failed:",
            error
        );


        window.COLLEGES = [

            {
                id: "rutgers_nb",
                name:
                    "Rutgers University-New Brunswick",
                type: "University",
                setting: "Suburban",
                state: "New Jersey",
                region: "Northeast",
                country: "United States",
                netPrice: 17500,
                estimatedMinGPA: 3.2
            },

            {
                id: "princeton",
                name:
                    "Princeton University",
                type: "University",
                setting: "Suburban",
                state: "New Jersey",
                region: "Northeast",
                country: "United States",
                netPrice: 12000,
                estimatedMinGPA: 3.85
            },

            {
                id: "njit",
                name:
                    "New Jersey Institute of Technology",
                type: "University",
                setting: "Urban",
                state: "New Jersey",
                region: "Northeast",
                country: "United States",
                netPrice: 16000,
                estimatedMinGPA: 3.2
            },

            {
                id: "asu",
                name:
                    "Arizona State University",
                type: "University",
                setting: "Urban",
                state: "Arizona",
                region: "West",
                country: "United States",
                netPrice: 25000,
                estimatedMinGPA: 3.0
            },

            {
                id: "oregon",
                name:
                    "University of Oregon",
                type: "University",
                setting: "Urban",
                state: "Oregon",
                region: "West",
                country: "United States",
                netPrice: 26000,
                estimatedMinGPA: 3.1
            }

        ];


        window.dispatchEvent(
            new CustomEvent(
                "database-ready"
            )
        );
    }
}


loadGlobalCollegeDatabase();