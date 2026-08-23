/* =========================================================
   CAPITNJ — GLOBAL COLLEGE DATABASE
   ---------------------------------------------------------
   U.S.:
     College Scorecard API
     → loads all available operating U.S. institutions

   INTERNATIONAL:
     Hipo World Universities dataset
     → loads universities worldwide
     → removes U.S. duplicates because Scorecard handles US

   Result:
     window.COLLEGES = one combined database
========================================================= */

window.COLLEGES = [];

const SCORECARD_API_KEY =
    "GtNXgFPhac42LoNAwniX9lRIP757nArl7BV9Xkvg";

const SCORECARD_BASE =
    "https://api.data.gov/ed/collegescorecard/v1/schools";

const WORLD_UNIVERSITIES_URL =
    "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json";


/* =========================================================
   STATE REGIONS
========================================================= */

const STATE_REGIONS = {

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
   REGION HELPERS
========================================================= */

function getUSRegion(state) {

    if (!state) {
        return "";
    }

    for (const regionName of Object.keys(STATE_REGIONS)) {

        if (
            STATE_REGIONS[regionName].includes(state)
        ) {
            return regionName;
        }
    }

    return "";
}


function getDistanceTier(state) {

    if (!state) {
        return "far";
    }

    if (state === "New Jersey") {
        return "local";
    }

    const nearbyStates = [
        "New York",
        "Pennsylvania",
        "Connecticut",
        "Delaware",
        "Maryland"
    ];

    if (nearbyStates.includes(state)) {
        return "regional";
    }

    return "far";
}


/* =========================================================
   GPA ESTIMATE
   ---------------------------------------------------------
   This is ONLY a fallback for matching.
   It is NOT official admissions data.
========================================================= */

function estimateRequiredGPA(name) {

    const lower =
        String(name || "").toLowerCase();


    const highlySelective = [
        "harvard",
        "stanford",
        "princeton",
        "yale",
        "columbia university",
        "massachusetts institute of technology",
        "mit",
        "caltech",
        "california institute of technology",
        "university of chicago",
        "northwestern university",
        "duke university",
        "brown university",
        "dartmouth college",
        "cornell university",
        "university of pennsylvania"
    ];


    const selective = [
        "new york university",
        "northeastern university",
        "boston university",
        "tufts university",
        "carnegie mellon",
        "university of michigan",
        "university of southern california",
        "usc",
        "ucla",
        "university of california, berkeley",
        "uc berkeley",
        "rice university",
        "georgetown university",
        "university of virginia",
        "university of north carolina",
        "wake forest",
        "villanova university"
    ];


    const moderatelySelective = [
        "rutgers",
        "new jersey institute of technology",
        "njit",
        "penn state",
        "ohio state",
        "university of washington",
        "university of florida",
        "florida state",
        "university of texas",
        "arizona state",
        "university of colorado",
        "temple university",
        "drexel university",
        "syracuse university",
        "fordham university"
    ];


    if (
        highlySelective.some(
            keyword => lower.includes(keyword)
        )
    ) {
        return 3.85;
    }


    if (
        selective.some(
            keyword => lower.includes(keyword)
        )
    ) {
        return 3.65;
    }


    if (
        moderatelySelective.some(
            keyword => lower.includes(keyword)
        )
    ) {
        return 3.20;
    }


    return 2.75;
}


/* =========================================================
   SCHOOL TYPE
========================================================= */

function getScorecardSchoolType(ownership) {

    /*
       College Scorecard ownership:
       1 = Public
       2 = Private nonprofit
       3 = Private for-profit
    */

    if (ownership === 1) {
        return "Public";
    }

    if (ownership === 2) {
        return "Private";
    }

    if (ownership === 3) {
        return "Private";
    }

    return "College";
}


/* =========================================================
   LOAD ONE SCORECARD PAGE
========================================================= */

async function loadScorecardPage(page) {

    const fields = [
        "id",
        "school.name",
        "school.city",
        "school.state",
        "school.zip",
        "school.school_url",
        "school.ownership",
        "school.locale",
        "latest.cost.net_price.overall",
        "latest.admissions.admission_rate.overall",
        "latest.admissions.sat_scores.average.overall"
    ].join(",");


    const params = new URLSearchParams({

        api_key:
            SCORECARD_API_KEY,

        "school.operating":
            "1",

        "_fields":
            fields,

        "_per_page":
            "100",

        "_page":
            String(page)
    });


    const response =
        await fetch(
            SCORECARD_BASE +
            "?" +
            params.toString()
        );


    if (!response.ok) {

        throw new Error(
            `College Scorecard page ${page} failed: ${response.status}`
        );
    }


    return await response.json();
}


/* =========================================================
   LOAD ALL U.S. SCHOOLS
========================================================= */

async function loadAllUSSchools() {

    console.log(
        "CapItNJ: loading U.S. schools..."
    );


    const firstPage =
        await loadScorecardPage(0);


    const firstResults =
        firstPage.results || [];


    const total =
        Number(
            firstPage.metadata?.total || 0
        );


    const perPage = 100;


    const totalPages =
        Math.ceil(
            total / perPage
        );


    console.log(
        `CapItNJ: Scorecard reports ${total} U.S. institutions across ${totalPages} pages.`
    );


    let rawSchools = [
        ...firstResults
    ];


    /*
       Load every remaining page.

       Sequential requests are intentional.
       Doing hundreds of requests simultaneously
       can trigger browser/network rate limits.
    */

    for (
        let page = 1;
        page < totalPages;
        page++
    ) {

        try {

            const data =
                await loadScorecardPage(page);


            const results =
                data.results || [];


            rawSchools.push(
                ...results
            );


            /*
               Progress every 10 pages.
            */

            if (
                page % 10 === 0 ||
                page === totalPages - 1
            ) {

                console.log(
                    `CapItNJ: loaded ${rawSchools.length} / ${total} U.S. schools`
                );
            }

        }

        catch (error) {

            console.warn(
                `CapItNJ: skipping Scorecard page ${page}`,
                error
            );
        }
    }


    /*
       Convert into CapItNJ format.
    */

    const schools =
        rawSchools
            .filter(
                school =>
                    school &&
                    school["school.name"]
            )
            .map(
                school => {

                    const name =
                        school["school.name"] ||
                        "Unknown School";


                    const state =
                        school["school.state"] ||
                        "";


                    const ownership =
                        school["school.ownership"];


                    const type =
                        getScorecardSchoolType(
                            ownership
                        );


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
                            `us_${school.id}`,

                        name:
                            name,

                        type:
                            type,

                        setting:
                            "U.S.",

                        state:
                            state,

                        region:
                            getUSRegion(state),

                        country:
                            "United States",

                        distanceTier:
                            getDistanceTier(state),

                        city:
                            school["school.city"] || "",

                        zip:
                            school["school.zip"] || "",

                        webPage:
                            school["school.school_url"] || "",

                        estimatedMinGPA:
                            estimateRequiredGPA(
                                name
                            ),

                        netPrice:
                            Number.isFinite(
                                Number(netPrice)
                            )
                                ? Number(netPrice)
                                : null,

                        admissionRate:
                            Number.isFinite(
                                Number(admissionRate)
                            )
                                ? Number(admissionRate)
                                : null,

                        satAverage:
                            Number.isFinite(
                                Number(satAverage)
                            )
                                ? Number(satAverage)
                                : null
                    };
                }
            );


    /*
       Remove exact duplicate names.

       Scorecard can occasionally contain
       multiple records that normalize to the
       same school name.
    */

    const seen =
        new Set();


    const uniqueSchools =
        schools.filter(
            school => {

                const key =
                    school.name
                        .trim()
                        .toLowerCase();


                if (seen.has(key)) {
                    return false;
                }


                seen.add(key);

                return true;
            }
        );


    console.log(
        `CapItNJ: ${uniqueSchools.length} unique U.S. schools loaded.`
    );


    return uniqueSchools;
}


/* =========================================================
   LOAD WORLDWIDE UNIVERSITY DATABASE
========================================================= */

async function loadWorldwideSchools() {

    console.log(
        "CapItNJ: loading worldwide university database..."
    );


    const response =
        await fetch(
            WORLD_UNIVERSITIES_URL
        );


    if (!response.ok) {

        throw new Error(
            `Worldwide university database failed: ${response.status}`
        );
    }


    const allWorldSchools =
        await response.json();


    console.log(
        `CapItNJ: worldwide dataset contains ${allWorldSchools.length} records.`
    );


    /*
       We deliberately REMOVE U.S. schools here.

       Why?

       Because College Scorecard is our
       authoritative U.S. source.

       This prevents duplicates.
    */

    const international =
        allWorldSchools
            .filter(
                school =>
                    school &&
                    school.name &&
                    school.country &&
                    school.country !== "United States"
            )
            .map(
                (school, index) => {

                    const country =
                        school.country || "";


                    const state =
                        school["state-province"] ||
                        "";


                    const website =
                        (
                            Array.isArray(
                                school.web_pages
                            )
                                ? school.web_pages[0]
                                : ""
                        ) || "";


                    return {

                        id:
                            `intl_${index}`,

                        name:
                            school.name,

                        /*
                           Hipo doesn't provide
                           reliable public/private
                           classification.

                           "University" keeps the
                           international records
                           distinct instead of
                           falsely calling them
                           public/private.
                        */

                        type:
                            "University",

                        setting:
                            "International",

                        state:
                            state,

                        region:
                            "International",

                        country:
                            country,

                        distanceTier:
                            "international",

                        city:
                            "",

                        zip:
                            "",

                        webPage:
                            website,

                        estimatedMinGPA:
                            estimateRequiredGPA(
                                school.name
                            ),

                        netPrice:
                            null,

                        admissionRate:
                            null,

                        satAverage:
                            null,

                        alphaTwoCode:
                            school.alpha_two_code || "",

                        domains:
                            Array.isArray(
                                school.domains
                            )
                                ? school.domains
                                : []
                    };
                }
            );


    /*
       Remove duplicate international names.
    */

    const seen =
        new Set();


    const uniqueInternational =
        international.filter(
            school => {

                const key =
                    school.name
                        .trim()
                        .toLowerCase();


                if (seen.has(key)) {
                    return false;
                }


                seen.add(key);

                return true;
            }
        );


    console.log(
        `CapItNJ: ${uniqueInternational.length} unique international schools loaded.`
    );


    return uniqueInternational;
}


/* =========================================================
   COMBINE EVERYTHING
========================================================= */

async function loadGlobalCollegeDatabase() {

    console.log(
        "=========================================="
    );

    console.log(
        "CapItNJ database initialization started"
    );

    console.log(
        "=========================================="
    );


    try {

        /*
           Load both databases.

           They can load at the same time.
        */

        const [
            usSchools,
            internationalSchools
        ] = await Promise.all([

            loadAllUSSchools(),

            loadWorldwideSchools()

        ]);


        /*
           Combine them.
        */

        window.COLLEGES = [

            ...usSchools,

            ...internationalSchools

        ];


        /*
           Sort alphabetically.

           U.S. first, then international.
        */

        window.COLLEGES.sort(
            (a, b) => {

                if (
                    a.country ===
                    "United States" &&
                    b.country !==
                    "United States"
                ) {
                    return -1;
                }


                if (
                    a.country !==
                    "United States" &&
                    b.country ===
                    "United States"
                ) {
                    return 1;
                }


                return a.name.localeCompare(
                    b.name
                );
            }
        );


        console.log(
            "=========================================="
        );


        console.log(
            `CapItNJ TOTAL: ${window.COLLEGES.length} schools`
        );


        console.log(
            `U.S.: ${usSchools.length}`
        );


        console.log(
            `International: ${internationalSchools.length}`
        );


        console.log(
            "=========================================="
        );


        /*
           Tell Explore / Matches / anything else
           waiting for the database that loading
           is finished.
        */

        window.dispatchEvent(
            new CustomEvent(
                "database-ready"
            )
        );

    }

    catch (error) {

        console.error(
            "CapItNJ DATABASE ERROR:",
            error
        );


        /*
           Important:
           don't silently replace the entire
           database with 5 fake schools.
        */

        window.COLLEGES = [];


        window.dispatchEvent(
            new CustomEvent(
                "database-ready"
            )
        );


        /*
           Give the user a visible console message.
        */

        console.error(
            "The college database could not be loaded."
        );
    }
}


/* =========================================================
   START
========================================================= */

loadGlobalCollegeDatabase();