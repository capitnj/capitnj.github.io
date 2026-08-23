/* =========================================================
   CAPITNJ — LARGE WORLDWIDE + U.S. COLLEGE DATABASE
   ========================================================= */

window.COLLEGES = [];

const SCORECARD_API_KEY = "GtNXgFPhac42LoNAwniX9lRIP757nArl7BV9Xkvg";

/*
   Worldwide university dataset
   Hipo University Domains List
*/
const WORLD_URL =
    "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json";

/*
   College Scorecard API
*/
const SCORECARD_URL =
    "https://api.data.gov/ed/collegescorecard/v1/schools";


/* =========================================================
   HELPERS
   ========================================================= */

function normalizeName(name) {
    return String(name || "")
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}


function getRegion(state) {

    const regions = {

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

    for (const region in regions) {

        if (regions[region].includes(state)) {
            return region;
        }

    }

    return "";
}


/* =========================================================
   DISTANCE TIER
   ========================================================= */

function getDistanceTier(country, state) {

    if (country !== "United States") {
        return "international";
    }

    if (state === "New Jersey") {
        return "local";
    }

    const nearbyStates = [
        "New York",
        "Pennsylvania",
        "Connecticut",
        "Delaware"
    ];

    if (nearbyStates.includes(state)) {
        return "regional";
    }

    return "far";
}


/* =========================================================
   SCHOOL TYPE
   ========================================================= */

function getSchoolType(name) {

    const lower = String(name || "").toLowerCase();

    if (
        lower.includes("college") ||
        lower.includes("institute") ||
        lower.includes("university") ||
        lower.includes("school")
    ) {
        return "University";
    }

    return "College";
}


/* =========================================================
   ESTIMATED GPA
   ========================================================= */

function estimateRequiredGPA(name) {

    const lower = String(name || "").toLowerCase();

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
        "usc",
        "university of southern california",
        "ucla",
        "uc berkeley",
        "rice university",
        "georgetown",
        "university of virginia"
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
        return 3.20;
    }

    return 2.75;
}


/* =========================================================
   WORLDWIDE DATASET
   ========================================================= */

async function loadWorldwideSchools() {

    console.log("🌎 Loading worldwide university database...");

    try {

        const response = await fetch(WORLD_URL, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(
                "Worldwide dataset HTTP " + response.status
            );
        }

        const schools = await response.json();

        console.log(
            "🌎 Worldwide raw schools:",
            schools.length
        );

        return schools
            .filter(school =>
                school &&
                school.name &&
                school.country
            )
            .map((school, index) => {

                const country =
                    school.country || "";

                const state =
                    school["state-province"] || "";

                const isUS =
                    country === "United States";

                return {

                    id:
                        "world_" + index,

                    name:
                        school.name,

                    type:
                        getSchoolType(school.name),

                    setting:
                        "Unknown",

                    state:
                        state,

                    region:
                        isUS
                            ? getRegion(state)
                            : "",

                    country:
                        country,

                    webPage:
                        school.web_pages &&
                        school.web_pages.length
                            ? school.web_pages[0]
                            : "",

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
                        ),

                    source:
                        "Worldwide University Database"

                };

            });

    } catch (error) {

        console.error(
            "❌ Worldwide database failed:",
            error
        );

        return [];

    }

}


/* =========================================================
   COLLEGE SCORECARD
   ========================================================= */

async function loadScorecardPage(page) {

    const params = new URLSearchParams({

        api_key:
            SCORECARD_API_KEY,

        _page:
            String(page),

        _per_page:
            "100",

        _fields:
            [
                "id",
                "school.name",
                "school.city",
                "school.state",
                "school.school_url",
                "school.ownership",
                "school.degrees_awarded.predominant",
                "latest.cost.net_price.overall",
                "latest.admissions.admission_rate.overall",
                "latest.admissions.sat_scores.average.overall"
            ].join(",")

    });

    const url =
        SCORECARD_URL +
        "?" +
        params.toString();

    const response =
        await fetch(url);

    if (!response.ok) {

        throw new Error(
            "Scorecard HTTP " +
            response.status
        );

    }

    return await response.json();

}


/* =========================================================
   LOAD ALL SCORECARD SCHOOLS
   ========================================================= */

async function loadAllScorecardSchools() {

    console.log(
        "🇺🇸 Loading U.S. College Scorecard schools..."
    );

    const results = [];

    /*
       We intentionally load in batches.

       This avoids one gigantic request and makes
       failures much easier to recover from.
    */

    const MAX_PAGES = 100;

    for (
        let page = 0;
        page < MAX_PAGES;
        page++
    ) {

        try {

            const data =
                await loadScorecardPage(page);

            const schools =
                data.results || [];

            if (!schools.length) {
                break;
            }

            console.log(
                `🇺🇸 Scorecard page ${page + 1}: ${schools.length} schools`
            );

            results.push(...schools);

            /*
               If fewer than 100 came back,
               we've reached the end.
            */

            if (schools.length < 100) {
                break;
            }

            /*
               Small pause so we don't hammer
               the federal API.
            */

            await new Promise(resolve =>
                setTimeout(resolve, 100)
            );

        } catch (error) {

            console.error(
                `❌ Scorecard page ${page + 1} failed:`,
                error
            );

            /*
               Don't destroy the whole database
               if one API page fails.
            */

            break;
        }

    }

    console.log(
        "🇺🇸 Total Scorecard schools loaded:",
        results.length
    );

    return results;

}


/* =========================================================
   CONVERT SCORECARD SCHOOL
   ========================================================= */

function convertScorecardSchool(school, index) {

    const name =
        school["school.name"] ||
        "";

    const state =
        school["school.state"] ||
        "";

    const ownership =
        school["school.ownership"];

    let type = "Private";

    /*
       College Scorecard ownership:

       1 = Public
       2 = Private nonprofit
       3 = Private for-profit
    */

    if (ownership === 1) {
        type = "Public";
    }

    const netPrice =
        school[
            "latest.cost.net_price.overall"
        ];

    const admissionRate =
        school[
            "latest.admissions.admission_rate.overall"
        ];

    const satAverage =
        school[
            "latest.admissions.sat_scores.average.overall"
        ];

    return {

        id:
            "scorecard_" +
            (
                school.id ||
                index
            ),

        name:

            name,

        type:
            type,

        setting:
            "Unknown",

        state:
            state,

        region:
            getRegion(state),

        country:
            "United States",

        webPage:
            school["school.school_url"] ||
            "",

        estimatedMinGPA:
            estimateRequiredGPA(name),

        netPrice:
            typeof netPrice === "number"
                ? netPrice
                : 24000,

        admissionRate:
            admissionRate,

        satAverage:
            satAverage,

        distanceTier:
            getDistanceTier(
                "United States",
                state
            ),

        source:
            "College Scorecard"

    };

}


/* =========================================================
   MERGE + DEDUPLICATE
   ========================================================= */

function mergeSchools(worldSchools, scorecardSchools) {

    const map = new Map();

    /*
       Put worldwide schools in first.
    */

    for (const school of worldSchools) {

        const key =
            normalizeName(
                school.name
            );

        if (!key) continue;

        map.set(key, school);
    }

    /*
       Scorecard data gets priority for U.S.
       schools because it contains actual
       federal school information.
    */

    for (
        const school of scorecardSchools
    ) {

        const key =
            normalizeName(
                school.name
            );

        if (!key) continue;

        const existing =
            map.get(key);

        if (existing) {

            map.set(key, {

                ...existing,

                ...school,

                /*
                   Preserve useful worldwide
                   website if Scorecard doesn't
                   have one.
                */

                webPage:
                    school.webPage ||
                    existing.webPage ||
                    ""

            });

        } else {

            map.set(
                key,
                school
            );

        }

    }

    return Array.from(
        map.values()
    );

}


/* =========================================================
   MAIN DATABASE INITIALIZER
   ========================================================= */

async function initializeDatabase() {

    console.log(
        "🚀 CapItNJ database starting..."
    );

    /*
       Start worldwide data immediately.
    */

    const worldSchools =
        await loadWorldwideSchools();

    /*
       Make worldwide schools available
       even if Scorecard later fails.
    */

    window.COLLEGES =
        worldSchools;

    console.log(
        "🌎 Worldwide schools ready:",
        window.COLLEGES.length
    );

    /*
       Tell Explore page that data exists.
    */

    window.dispatchEvent(
        new CustomEvent(
            "database-ready"
        )
    );


    /*
       Now load U.S. Scorecard data.
    */

    const scorecardRaw =
        await loadAllScorecardSchools();

    const scorecardSchools =
        scorecardRaw.map(
            convertScorecardSchool
        );


    /*
       Merge both datasets.
    */

    window.COLLEGES =
        mergeSchools(
            worldSchools,
            scorecardSchools
        );


    console.log(
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    );

    console.log(
        "🌎 Worldwide schools:",
        worldSchools.length
    );

    console.log(
        "🇺🇸 Scorecard schools:",
        scorecardSchools.length
    );

    console.log(
        "🎓 FINAL CapItNJ schools:",
        window.COLLEGES.length
    );

    console.log(
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    );


    /*
       Tell Explore page to render again
       with the full combined database.
    */

    window.dispatchEvent(
        new CustomEvent(
            "database-ready"
        )
    );

}


/* =========================================================
   START
   ========================================================= */

initializeDatabase();