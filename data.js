window.COLLEGES = [];

/* =========================================================
   CAPITNJ COLLEGE DATABASE
   Curated schools with reliable location information.
   ========================================================= */

const COLLEGES = [

    /* =========================
       NEW JERSEY
    ========================= */

    {
        id: "rutgers_nb",
        name: "Rutgers University-New Brunswick",
        type: "University",
        setting: "Suburban",
        state: "New Jersey",
        region: "Northeast",
        country: "United States",
        netPrice: 17500,
        estimatedMinGPA: 3.2
    },

    {
        id: "rutgers_newark",
        name: "Rutgers University-Newark",
        type: "University",
        setting: "Urban",
        state: "New Jersey",
        region: "Northeast",
        country: "United States",
        netPrice: 17000,
        estimatedMinGPA: 3.2
    },

    {
        id: "rutgers_camden",
        name: "Rutgers University-Camden",
        type: "University",
        setting: "Urban",
        state: "New Jersey",
        region: "Northeast",
        country: "United States",
        netPrice: 16500,
        estimatedMinGPA: 3.2
    },

    {
        id: "princeton",
        name: "Princeton University",
        type: "University",
        setting: "Suburban",
        state: "New Jersey",
        region: "Northeast",
        country: "United States",
        netPrice: 12000,
        estimatedMinGPA: 3.85
    },

    {
        id: "rowan",
        name: "Rowan University",
        type: "University",
        setting: "Suburban",
        state: "New Jersey",
        region: "Northeast",
        country: "United States",
        netPrice: 18500,
        estimatedMinGPA: 3.1
    },

    {
        id: "kean",
        name: "Kean University",
        type: "University",
        setting: "Suburban",
        state: "New Jersey",
        region: "Northeast",
        country: "United States",
        netPrice: 15500,
        estimatedMinGPA: 2.8
    },

    {
        id: "montclair",
        name: "Montclair State University",
        type: "University",
        setting: "Suburban",
        state: "New Jersey",
        region: "Northeast",
        country: "United States",
        netPrice: 17000,
        estimatedMinGPA: 2.9
    },

    {
        id: "njit",
        name: "New Jersey Institute of Technology",
        type: "University",
        setting: "Urban",
        state: "New Jersey",
        region: "Northeast",
        country: "United States",
        netPrice: 16000,
        estimatedMinGPA: 3.2
    },

    {
        id: "stockton",
        name: "Stockton University",
        type: "University",
        setting: "Suburban",
        state: "New Jersey",
        region: "Northeast",
        country: "United States",
        netPrice: 16500,
        estimatedMinGPA: 2.9
    },

    {
        id: "seton_hall",
        name: "Seton Hall University",
        type: "University",
        setting: "Suburban",
        state: "New Jersey",
        region: "Northeast",
        country: "United States",
        netPrice: 31000,
        estimatedMinGPA: 3.4
    },

    {
        id: "drew",
        name: "Drew University",
        type: "University",
        setting: "Suburban",
        state: "New Jersey",
        region: "Northeast",
        country: "United States",
        netPrice: 29000,
        estimatedMinGPA: 3.2
    },

    {
        id: "william_paterson",
        name: "William Paterson University",
        type: "University",
        setting: "Suburban",
        state: "New Jersey",
        region: "Northeast",
        country: "United States",
        netPrice: 15500,
        estimatedMinGPA: 2.8
    },

    {
        id: "tcnj",
        name: "The College of New Jersey",
        type: "College",
        setting: "Suburban",
        state: "New Jersey",
        region: "Northeast",
        country: "United States",
        netPrice: 22000,
        estimatedMinGPA: 3.5
    },

    {
        id: "rider",
        name: "Rider University",
        type: "University",
        setting: "Suburban",
        state: "New Jersey",
        region: "Northeast",
        country: "United States",
        netPrice: 28000,
        estimatedMinGPA: 3.1
    },

    {
        id: "ramapo",
        name: "Ramapo College of New Jersey",
        type: "College",
        setting: "Suburban",
        state: "New Jersey",
        region: "Northeast",
        country: "United States",
        netPrice: 16000,
        estimatedMinGPA: 3.0
    },

    {
        id: "fdu",
        name: "Fairleigh Dickinson University",
        type: "University",
        setting: "Suburban",
        state: "New Jersey",
        region: "Northeast",
        country: "United States",
        netPrice: 25000,
        estimatedMinGPA: 2.9
    },

    {
        id: "monmouth",
        name: "Monmouth University",
        type: "University",
        setting: "Suburban",
        state: "New Jersey",
        region: "Northeast",
        country: "United States",
        netPrice: 29000,
        estimatedMinGPA: 3.1
    },

    {
        id: "saint_peters",
        name: "Saint Peter's University",
        type: "University",
        setting: "Urban",
        state: "New Jersey",
        region: "Northeast",
        country: "United States",
        netPrice: 15000,
        estimatedMinGPA: 2.8
    },


    /* =========================
       NEW YORK
    ========================= */

    {
        id: "nyu",
        name: "New York University",
        type: "University",
        setting: "Urban",
        state: "New York",
        region: "Northeast",
        country: "United States",
        netPrice: 45000,
        estimatedMinGPA: 3.65
    },

    {
        id: "columbia",
        name: "Columbia University",
        type: "University",
        setting: "Urban",
        state: "New York",
        region: "Northeast",
        country: "United States",
        netPrice: 28000,
        estimatedMinGPA: 3.85
    },

    {
        id: "cornell",
        name: "Cornell University",
        type: "University",
        setting: "Rural",
        state: "New York",
        region: "Northeast",
        country: "United States",
        netPrice: 31000,
        estimatedMinGPA: 3.85
    },

    {
        id: "syracuse",
        name: "Syracuse University",
        type: "University",
        setting: "Urban",
        state: "New York",
        region: "Northeast",
        country: "United States",
        netPrice: 40000,
        estimatedMinGPA: 3.4
    },

    {
        id: "buffalo",
        name: "University at Buffalo",
        type: "University",
        setting: "Suburban",
        state: "New York",
        region: "Northeast",
        country: "United States",
        netPrice: 19000,
        estimatedMinGPA: 3.2
    },

    {
        id: "stony_brook",
        name: "Stony Brook University",
        type: "University",
        setting: "Suburban",
        state: "New York",
        region: "Northeast",
        country: "United States",
        netPrice: 18000,
        estimatedMinGPA: 3.3
    },

    {
        id: "fordham",
        name: "Fordham University",
        type: "University",
        setting: "Urban",
        state: "New York",
        region: "Northeast",
        country: "United States",
        netPrice: 37000,
        estimatedMinGPA: 3.5
    },

    {
        id: "rochester",
        name: "University of Rochester",
        type: "University",
        setting: "Suburban",
        state: "New York",
        region: "Northeast",
        country: "United States",
        netPrice: 34000,
        estimatedMinGPA: 3.6
    },


    /* =========================
       PENNSYLVANIA
    ========================= */

    {
        id: "upenn",
        name: "University of Pennsylvania",
        type: "University",
        setting: "Urban",
        state: "Pennsylvania",
        region: "Northeast",
        country: "United States",
        netPrice: 26000,
        estimatedMinGPA: 3.85
    },

    {
        id: "penn_state",
        name: "Pennsylvania State University",
        type: "University",
        setting: "Suburban",
        state: "Pennsylvania",
        region: "Northeast",
        country: "United States",
        netPrice: 25000,
        estimatedMinGPA: 3.2
    },

    {
        id: "temple",
        name: "Temple University",
        type: "University",
        setting: "Urban",
        state: "Pennsylvania",
        region: "Northeast",
        country: "United States",
        netPrice: 23000,
        estimatedMinGPA: 3.1
    },

    {
        id: "drexel",
        name: "Drexel University",
        type: "University",
        setting: "Urban",
        state: "Pennsylvania",
        region: "Northeast",
        country: "United States",
        netPrice: 38000,
        estimatedMinGPA: 3.4
    },

    {
        id: "villanova",
        name: "Villanova University",
        type: "University",
        setting: "Suburban",
        state: "Pennsylvania",
        region: "Northeast",
        country: "United States",
        netPrice: 34000,
        estimatedMinGPA: 3.6
    },

    {
        id: "lehigh",
        name: "Lehigh University",
        type: "University",
        setting: "Suburban",
        state: "Pennsylvania",
        region: "Northeast",
        country: "United States",
        netPrice: 33000,
        estimatedMinGPA: 3.6
    },

    {
        id: "carnegie_mellon",
        name: "Carnegie Mellon University",
        type: "University",
        setting: "Urban",
        state: "Pennsylvania",
        region: "Northeast",
        country: "United States",
        netPrice: 37000,
        estimatedMinGPA: 3.65
    },


    /* =========================
       MASSACHUSETTS
    ========================= */

    {
        id: "harvard",
        name: "Harvard University",
        type: "University",
        setting: "Urban",
        state: "Massachusetts",
        region: "Northeast",
        country: "United States",
        netPrice: 18000,
        estimatedMinGPA: 3.85
    },

    {
        id: "mit",
        name: "Massachusetts Institute of Technology",
        type: "University",
        setting: "Urban",
        state: "Massachusetts",
        region: "Northeast",
        country: "United States",
        netPrice: 20000,
        estimatedMinGPA: 3.85
    },

    {
        id: "boston_university",
        name: "Boston University",
        type: "University",
        setting: "Urban",
        state: "Massachusetts",
        region: "Northeast",
        country: "United States",
        netPrice: 35000,
        estimatedMinGPA: 3.65
    },

    {
        id: "northeastern",
        name: "Northeastern University",
        type: "University",
        setting: "Urban",
        state: "Massachusetts",
        region: "Northeast",
        country: "United States",
        netPrice: 36000,
        estimatedMinGPA: 3.65
    },

    {
        id: "tufts",
        name: "Tufts University",
        type: "University",
        setting: "Suburban",
        state: "Massachusetts",
        region: "Northeast",
        country: "United States",
        netPrice: 30000,
        estimatedMinGPA: 3.65
    },

    {
        id: "umass",
        name: "University of Massachusetts Amherst",
        type: "University",
        setting: "Suburban",
        state: "Massachusetts",
        region: "Northeast",
        country: "United States",
        netPrice: 22000,
        estimatedMinGPA: 3.3
    },


    /* =========================
       CONNECTICUT
    ========================= */

    {
        id: "yale",
        name: "Yale University",
        type: "University",
        setting: "Urban",
        state: "Connecticut",
        region: "Northeast",
        country: "United States",
        netPrice: 18000,
        estimatedMinGPA: 3.85
    },

    {
        id: "uconn",
        name: "University of Connecticut",
        type: "University",
        setting: "Suburban",
        state: "Connecticut",
        region: "Northeast",
        country: "United States",
        netPrice: 23000,
        estimatedMinGPA: 3.4
    },

    {
        id: "wesleyan",
        name: "Wesleyan University",
        type: "University",
        setting: "Suburban",
        state: "Connecticut",
        region: "Northeast",
        country: "United States",
        netPrice: 28000,
        estimatedMinGPA: 3.7
    },


    /* =========================
       MARYLAND / DC / VIRGINIA
    ========================= */

    {
        id: "umd",
        name: "University of Maryland, College Park",
        type: "University",
        setting: "Suburban",
        state: "Maryland",
        region: "South",
        country: "United States",
        netPrice: 20000,
        estimatedMinGPA: 3.5
    },

    {
        id: "georgetown",
        name: "Georgetown University",
        type: "University",
        setting: "Urban",
        state: "District of Columbia",
        region: "South",
        country: "United States",
        netPrice: 32000,
        estimatedMinGPA: 3.65
    },

    {
        id: "virginia",
        name: "University of Virginia",
        type: "University",
        setting: "Suburban",
        state: "Virginia",
        region: "South",
        country: "United States",
        netPrice: 20000,
        estimatedMinGPA: 3.65
    },

    {
        id: "vt",
        name: "Virginia Tech",
        type: "University",
        setting: "Suburban",
        state: "Virginia",
        region: "South",
        country: "United States",
        netPrice: 21000,
        estimatedMinGPA: 3.4
    },


    /* =========================
       MIDWEST
    ========================= */

    {
        id: "michigan",
        name: "University of Michigan",
        type: "University",
        setting: "Urban",
        state: "Michigan",
        region: "Midwest",
        country: "United States",
        netPrice: 22000,
        estimatedMinGPA: 3.65
    },

    {
        id: "michigan_state",
        name: "Michigan State University",
        type: "University",
        setting: "Suburban",
        state: "Michigan",
        region: "Midwest",
        country: "United States",
        netPrice: 19000,
        estimatedMinGPA: 3.2
    },

    {
        id: "osu",
        name: "Ohio State University",
        type: "University",
        setting: "Urban",
        state: "Ohio",
        region: "Midwest",
        country: "United States",
        netPrice: 21000,
        estimatedMinGPA: 3.2
    },

    {
        id: "northwestern",
        name: "Northwestern University",
        type: "University",
        setting: "Suburban",
        state: "Illinois",
        region: "Midwest",
        country: "United States",
        netPrice: 30000,
        estimatedMinGPA: 3.85
    },

    {
        id: "uchicago",
        name: "University of Chicago",
        type: "University",
        setting: "Urban",
        state: "Illinois",
        region: "Midwest",
        country: "United States",
        netPrice: 32000,
        estimatedMinGPA: 3.85
    },

    {
        id: "uiuc",
        name: "University of Illinois Urbana-Champaign",
        type: "University",
        setting: "Urban",
        state: "Illinois",
        region: "Midwest",
        country: "United States",
        netPrice: 21000,
        estimatedMinGPA: 3.5
    },

    {
        id: "indiana",
        name: "Indiana University Bloomington",
        type: "University",
        setting: "Suburban",
        state: "Indiana",
        region: "Midwest",
        country: "United States",
        netPrice: 22000,
        estimatedMinGPA: 3.2
    },

    {
        id: "wisconsin",
        name: "University of Wisconsin-Madison",
        type: "University",
        setting: "Urban",
        state: "Wisconsin",
        region: "Midwest",
        country: "United States",
        netPrice: 20000,
        estimatedMinGPA: 3.4
    },


    /* =========================
       SOUTH
    ========================= */

    {
        id: "duke",
        name: "Duke University",
        type: "University",
        setting: "Suburban",
        state: "North Carolina",
        region: "South",
        country: "United States",
        netPrice: 27000,
        estimatedMinGPA: 3.85
    },

    {
        id: "unc",
        name: "University of North Carolina at Chapel Hill",
        type: "University",
        setting: "Suburban",
        state: "North Carolina",
        region: "South",
        country: "United States",
        netPrice: 18000,
        estimatedMinGPA: 3.6
    },

    {
        id: "vanderbilt",
        name: "Vanderbilt University",
        type: "University",
        setting: "Urban",
        state: "Tennessee",
        region: "South",
        country: "United States",
        netPrice: 28000,
        estimatedMinGPA: 3.85
    },

    {
        id: "emory",
        name: "Emory University",
        type: "University",
        setting: "Suburban",
        state: "Georgia",
        region: "South",
        country: "United States",
        netPrice: 30000,
        estimatedMinGPA: 3.7
    },

    {
        id: "uf",
        name: "University of Florida",
        type: "University",
        setting: "Urban",
        state: "Florida",
        region: "South",
        country: "United States",
        netPrice: 15000,
        estimatedMinGPA: 3.2
    },

    {
        id: "fsu",
        name: "Florida State University",
        type: "University",
        setting: "Urban",
        state: "Florida",
        region: "South",
        country: "United States",
        netPrice: 15000,
        estimatedMinGPA: 3.2
    },

    {
        id: "miami",
        name: "University of Miami",
        type: "University",
        setting: "Suburban",
        state: "Florida",
        region: "South",
        country: "United States",
        netPrice: 34000,
        estimatedMinGPA: 3.6
    },

    {
        id: "ut_austin",
        name: "University of Texas at Austin",
        type: "University",
        setting: "Urban",
        state: "Texas",
        region: "South",
        country: "United States",
        netPrice: 18000,
        estimatedMinGPA: 3.6
    },

    {
        id: "texas_am",
        name: "Texas A&M University",
        type: "University",
        setting: "Suburban",
        state: "Texas",
        region: "South",
        country: "United States",
        netPrice: 19000,
        estimatedMinGPA: 3.3
    },

    {
        id: "rice",
        name: "Rice University",
        type: "University",
        setting: "Urban",
        state: "Texas",
        region: "South",
        country: "United States",
        netPrice: 22000,
        estimatedMinGPA: 3.85
    },


    /* =========================
       WEST
    ========================= */

    {
        id: "stanford",
        name: "Stanford University",
        type: "University",
        setting: "Suburban",
        state: "California",
        region: "West",
        country: "United States",
        netPrice: 18000,
        estimatedMinGPA: 3.85
    },

    {
        id: "usc",
        name: "University of Southern California",
        type: "University",
        setting: "Urban",
        state: "California",
        region: "West",
        country: "United States",
        netPrice: 38000,
        estimatedMinGPA: 3.65
    },

    {
        id: "ucla",
        name: "University of California, Los Angeles",
        type: "University",
        setting: "Urban",
        state: "California",
        region: "West",
        country: "United States",
        netPrice: 16000,
        estimatedMinGPA: 3.65
    },

    {
        id: "berkeley",
        name: "University of California, Berkeley",
        type: "University",
        setting: "Urban",
        state: "California",
        region: "West",
        country: "United States",
        netPrice: 17000,
        estimatedMinGPA: 3.65
    },

    {
        id: "ucsd",
        name: "University of California, San Diego",
        type: "University",
        setting: "Urban",
        state: "California",
        region: "West",
        country: "United States",
        netPrice: 18000,
        estimatedMinGPA: 3.6
    },

    {
        id: "cal_poly",
        name: "California Polytechnic State University",
        type: "University",
        setting: "Suburban",
        state: "California",
        region: "West",
        country: "United States",
        netPrice: 21000,
        estimatedMinGPA: 3.5
    },

    {
        id: "uw",
        name: "University of Washington",
        type: "University",
        setting: "Urban",
        state: "Washington",
        region: "West",
        country: "United States",
        netPrice: 19000,
        estimatedMinGPA: 3.4
    },

    {
        id: "oregon",
        name: "University of Oregon",
        type: "University",
        setting: "Urban",
        state: "Oregon",
        region: "West",
        country: "United States",
        netPrice: 26000,
        estimatedMinGPA: 3.1
    },

    {
        id: "asu",
        name: "Arizona State University",
        type: "University",
        setting: "Urban",
        state: "Arizona",
        region: "West",
        country: "United States",
        netPrice: 25000,
        estimatedMinGPA: 3.0
    },

    {
        id: "arizona",
        name: "University of Arizona",
        type: "University",
        setting: "Urban",
        state: "Arizona",
        region: "West",
        country: "United States",
        netPrice: 22000,
        estimatedMinGPA: 3.1
    },

    {
        id: "colorado",
        name: "University of Colorado Boulder",
        type: "University",
        setting: "Suburban",
        state: "Colorado",
        region: "West",
        country: "United States",
        netPrice: 25000,
        estimatedMinGPA: 3.3
    },


    /* =========================
       INTERNATIONAL
    ========================= */

    {
        id: "toronto",
        name: "University of Toronto",
        type: "University",
        setting: "Urban",
        state: "Ontario",
        region: "",
        country: "Canada",
        netPrice: 31000,
        estimatedMinGPA: 3.6
    },

    {
        id: "mcgill",
        name: "McGill University",
        type: "University",
        setting: "Urban",
        state: "Quebec",
        region: "",
        country: "Canada",
        netPrice: 28000,
        estimatedMinGPA: 3.6
    },

    {
        id: "ubc",
        name: "University of British Columbia",
        type: "University",
        setting: "Urban",
        state: "British Columbia",
        region: "",
        country: "Canada",
        netPrice: 30000,
        estimatedMinGPA: 3.6
    },

    {
        id: "oxford",
        name: "University of Oxford",
        type: "University",
        setting: "Urban",
        state: "England",
        region: "",
        country: "United Kingdom",
        netPrice: 31000,
        estimatedMinGPA: 3.8
    },

    {
        id: "cambridge",
        name: "University of Cambridge",
        type: "University",
        setting: "Urban",
        state: "England",
        region: "",
        country: "United Kingdom",
        netPrice: 31000,
        estimatedMinGPA: 3.8
    },

    {
        id: "imperial",
        name: "Imperial College London",
        type: "University",
        setting: "Urban",
        state: "England",
        region: "",
        country: "United Kingdom",
        netPrice: 33000,
        estimatedMinGPA: 3.8
    },

    {
        id: "melbourne",
        name: "University of Melbourne",
        type: "University",
        setting: "Urban",
        state: "Victoria",
        region: "",
        country: "Australia",
        netPrice: 31000,
        estimatedMinGPA: 3.5
    },

    {
        id: "sydney",
        name: "University of Sydney",
        type: "University",
        setting: "Urban",
        state: "New South Wales",
        region: "",
        country: "Australia",
        netPrice: 31000,
        estimatedMinGPA: 3.5
    },

    {
        id: "nus",
        name: "National University of Singapore",
        type: "University",
        setting: "Urban",
        state: "Singapore",
        region: "",
        country: "Singapore",
        netPrice: 28000,
        estimatedMinGPA: 3.7
    },

    {
        id: "waterloo",
        name: "University of Waterloo",
        type: "University",
        setting: "Urban",
        state: "Ontario",
        region: "",
        country: "Canada",
        netPrice: 29000,
        estimatedMinGPA: 3.6
    }

];


/* =========================================================
   ADD DISTANCE TIERS
   ========================================================= */

function assignDistanceTier(college) {

    if (college.country !== "United States") {
        return "international";
    }

    if (college.state === "New Jersey") {
        return "local";
    }

    const nearbyStates = [
        "New York",
        "Pennsylvania",
        "Connecticut",
        "Delaware",
        "Maryland"
    ];

    if (nearbyStates.includes(college.state)) {
        return "regional";
    }

    return "far";
}


/* =========================================================
   FINALIZE DATABASE
   ========================================================= */

window.COLLEGES = COLLEGES.map(college => ({
    ...college,
    distanceTier: assignDistanceTier(college)
}));


console.log(
    "CapItNJ database loaded:",
    window.COLLEGES.length,
    "schools"
);


/* Tell explore.html that the database exists */

window.dispatchEvent(
    new CustomEvent("database-ready")
);