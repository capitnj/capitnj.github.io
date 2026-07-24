/*
  CapItNJ — college dataset
  ----------------------------------
  PLACEHOLDER DATA: figures below are realistic approximations for demo
  purposes (avg admitted GPA, avg net price by income tier, size, setting).
  Before final submission, swap these for verified numbers from
  collegescorecard.ed.gov or each school's Common Data Set. Distances are
  relative to central NJ.

  distanceTier: "local" (near home, <1hr), "regional" (nearby states, 1-4hr),
                "far" (elsewhere in the US), "international" (outside the US)
  size: "Small" (<5k undergrad), "Medium" (5k-15k), "Large" (>15k)
  netPrice: estimated annual net price (after aid) by family income tier
*/

const COLLEGES = [
  // ---------- NEAR HOME (NJ) ----------
  { name: "Rutgers University–New Brunswick", state: "NJ", country: "USA", type: "Public", size: "Large", setting: "Suburban", avgGPA: 3.7, sticker: 33000, netPrice: { low: 13000, mid: 20000, high: 28000 }, distanceTier: "local" },
  { name: "Rutgers University–Newark", state: "NJ", country: "USA", type: "Public", size: "Medium", setting: "Urban", avgGPA: 3.4, sticker: 30000, netPrice: { low: 11000, mid: 17000, high: 24000 }, distanceTier: "local" },
  { name: "Rutgers University–Camden", state: "NJ", country: "USA", type: "Public", size: "Small", setting: "Urban", avgGPA: 3.4, sticker: 29500, netPrice: { low: 11000, mid: 16500, high: 23500 }, distanceTier: "local" },
  { name: "The College of New Jersey", state: "NJ", country: "USA", type: "Public", size: "Medium", setting: "Suburban", avgGPA: 3.8, sticker: 31000, netPrice: { low: 14000, mid: 21000, high: 27000 }, distanceTier: "local" },
  { name: "Montclair State University", state: "NJ", country: "USA", type: "Public", size: "Large", setting: "Suburban", avgGPA: 3.3, sticker: 27500, netPrice: { low: 10000, mid: 16000, high: 22000 }, distanceTier: "local" },
  { name: "Rowan University", state: "NJ", country: "USA", type: "Public", size: "Medium", setting: "Suburban", avgGPA: 3.4, sticker: 28000, netPrice: { low: 10500, mid: 16500, high: 22500 }, distanceTier: "local" },
  { name: "NJ Institute of Technology", state: "NJ", country: "USA", type: "Public", size: "Medium", setting: "Urban", avgGPA: 3.5, sticker: 34500, netPrice: { low: 15000, mid: 22000, high: 29000 }, distanceTier: "local" },
  { name: "Kean University", state: "NJ", country: "USA", type: "Public", size: "Medium", setting: "Suburban", avgGPA: 3.1, sticker: 26000, netPrice: { low: 9000, mid: 14000, high: 19500 }, distanceTier: "local" },
  { name: "Stockton University", state: "NJ", country: "USA", type: "Public", size: "Medium", setting: "Rural", avgGPA: 3.3, sticker: 28500, netPrice: { low: 11000, mid: 17000, high: 23000 }, distanceTier: "local" },
  { name: "William Paterson University", state: "NJ", country: "USA", type: "Public", size: "Medium", setting: "Suburban", avgGPA: 3.1, sticker: 26500, netPrice: { low: 9500, mid: 14500, high: 20000 }, distanceTier: "local" },
  { name: "Ramapo College of NJ", state: "NJ", country: "USA", type: "Public", size: "Small", setting: "Suburban", avgGPA: 3.4, sticker: 29000, netPrice: { low: 12000, mid: 18000, high: 24000 }, distanceTier: "local" },
  { name: "New Jersey City University", state: "NJ", country: "USA", type: "Public", size: "Small", setting: "Urban", avgGPA: 3.0, sticker: 25500, netPrice: { low: 8500, mid: 13500, high: 19000 }, distanceTier: "local" },
  { name: "Seton Hall University", state: "NJ", country: "USA", type: "Private", size: "Medium", setting: "Suburban", avgGPA: 3.5, sticker: 54000, netPrice: { low: 22000, mid: 32000, high: 42000 }, distanceTier: "local" },
  { name: "Fairleigh Dickinson University", state: "NJ", country: "USA", type: "Private", size: "Medium", setting: "Suburban", avgGPA: 3.2, sticker: 48000, netPrice: { low: 18000, mid: 26000, high: 35000 }, distanceTier: "local" },
  { name: "Rider University", state: "NJ", country: "USA", type: "Private", size: "Small", setting: "Suburban", avgGPA: 3.3, sticker: 47000, netPrice: { low: 19000, mid: 27000, high: 35000 }, distanceTier: "local" },
  { name: "Drew University", state: "NJ", country: "USA", type: "Private", size: "Small", setting: "Suburban", avgGPA: 3.5, sticker: 56000, netPrice: { low: 21000, mid: 30000, high: 40000 }, distanceTier: "local" },
  { name: "Stevens Institute of Technology", state: "NJ", country: "USA", type: "Private", size: "Small", setting: "Urban", avgGPA: 3.9, sticker: 62000, netPrice: { low: 28000, mid: 38000, high: 50000 }, distanceTier: "local" },
  { name: "Princeton University", state: "NJ", country: "USA", type: "Private", size: "Small", setting: "Suburban", avgGPA: 3.95, sticker: 62000, netPrice: { low: 4000, mid: 14000, high: 32000 }, distanceTier: "local" },

  // ---------- OUTSIDE NJ, NEARBY REGION ----------
  { name: "Temple University", state: "PA", country: "USA", type: "Public", size: "Large", setting: "Urban", avgGPA: 3.4, sticker: 32000, netPrice: { low: 14000, mid: 20000, high: 27000 }, distanceTier: "regional" },
  { name: "Penn State University Park", state: "PA", country: "USA", type: "Public", size: "Large", setting: "Rural", avgGPA: 3.6, sticker: 37000, netPrice: { low: 17000, mid: 25000, high: 33000 }, distanceTier: "regional" },
  { name: "University of Delaware", state: "DE", country: "USA", type: "Public", size: "Large", setting: "Suburban", avgGPA: 3.6, sticker: 35500, netPrice: { low: 16000, mid: 24000, high: 31000 }, distanceTier: "regional" },
  { name: "University of Maryland, College Park", state: "MD", country: "USA", type: "Public", size: "Large", setting: "Suburban", avgGPA: 3.7, sticker: 36500, netPrice: { low: 17000, mid: 25000, high: 33000 }, distanceTier: "regional" },
  { name: "University of Connecticut", state: "CT", country: "USA", type: "Public", size: "Large", setting: "Rural", avgGPA: 3.6, sticker: 38000, netPrice: { low: 17000, mid: 25000, high: 33000 }, distanceTier: "regional" },
  { name: "Villanova University", state: "PA", country: "USA", type: "Private", size: "Medium", setting: "Suburban", avgGPA: 3.9, sticker: 65000, netPrice: { low: 24000, mid: 36000, high: 50000 }, distanceTier: "regional" },
  { name: "Lehigh University", state: "PA", country: "USA", type: "Private", size: "Small", setting: "Suburban", avgGPA: 3.8, sticker: 63000, netPrice: { low: 22000, mid: 34000, high: 47000 }, distanceTier: "regional" },
  { name: "Fordham University", state: "NY", country: "USA", type: "Private", size: "Medium", setting: "Urban", avgGPA: 3.6, sticker: 62000, netPrice: { low: 25000, mid: 36000, high: 47000 }, distanceTier: "regional" },
  { name: "NYU", state: "NY", country: "USA", type: "Private", size: "Large", setting: "Urban", avgGPA: 3.8, sticker: 65000, netPrice: { low: 26000, mid: 38000, high: 52000 }, distanceTier: "regional" },
  { name: "Columbia University", state: "NY", country: "USA", type: "Private", size: "Medium", setting: "Urban", avgGPA: 3.95, sticker: 68000, netPrice: { low: 6000, mid: 20000, high: 45000 }, distanceTier: "regional" },
  { name: "Cornell University", state: "NY", country: "USA", type: "Private", size: "Medium", setting: "Rural", avgGPA: 3.9, sticker: 66000, netPrice: { low: 8000, mid: 22000, high: 46000 }, distanceTier: "regional" },
  { name: "University of Pennsylvania", state: "PA", country: "USA", type: "Private", size: "Medium", setting: "Urban", avgGPA: 3.95, sticker: 67000, netPrice: { low: 7000, mid: 20000, high: 45000 }, distanceTier: "regional" },
  { name: "Johns Hopkins University", state: "MD", country: "USA", type: "Private", size: "Medium", setting: "Urban", avgGPA: 3.9, sticker: 66000, netPrice: { low: 8000, mid: 22000, high: 46000 }, distanceTier: "regional" },
  { name: "Georgetown University", state: "DC", country: "USA", type: "Private", size: "Medium", setting: "Urban", avgGPA: 3.9, sticker: 65000, netPrice: { low: 12000, mid: 26000, high: 47000 }, distanceTier: "regional" },
  { name: "American University", state: "DC", country: "USA", type: "Private", size: "Medium", setting: "Urban", avgGPA: 3.5, sticker: 58000, netPrice: { low: 22000, mid: 32000, high: 43000 }, distanceTier: "regional" },
  { name: "Yale University", state: "CT", country: "USA", type: "Private", size: "Small", setting: "Urban", avgGPA: 3.95, sticker: 68000, netPrice: { low: 5000, mid: 18000, high: 42000 }, distanceTier: "regional" },

  // ---------- ELSEWHERE IN THE US ----------
  { name: "Syracuse University", state: "NY", country: "USA", type: "Private", size: "Medium", setting: "Urban", avgGPA: 3.5, sticker: 58000, netPrice: { low: 22000, mid: 32000, high: 43000 }, distanceTier: "far" },
  { name: "Boston University", state: "MA", country: "USA", type: "Private", size: "Large", setting: "Urban", avgGPA: 3.8, sticker: 65000, netPrice: { low: 25000, mid: 37000, high: 49000 }, distanceTier: "far" },
  { name: "University of Pittsburgh", state: "PA", country: "USA", type: "Public", size: "Large", setting: "Urban", avgGPA: 3.6, sticker: 34000, netPrice: { low: 15000, mid: 22000, high: 29000 }, distanceTier: "far" },
  { name: "Duke University", state: "NC", country: "USA", type: "Private", size: "Medium", setting: "Suburban", avgGPA: 3.95, sticker: 66000, netPrice: { low: 8000, mid: 22000, high: 46000 }, distanceTier: "far" },
  { name: "University of North Carolina at Chapel Hill", state: "NC", country: "USA", type: "Public", size: "Large", setting: "Suburban", avgGPA: 3.7, sticker: 37000, netPrice: { low: 12000, mid: 20000, high: 30000 }, distanceTier: "far" },
  { name: "University of Virginia", state: "VA", country: "USA", type: "Public", size: "Large", setting: "Suburban", avgGPA: 3.8, sticker: 39000, netPrice: { low: 14000, mid: 22000, high: 32000 }, distanceTier: "far" },
  { name: "Vanderbilt University", state: "TN", country: "USA", type: "Private", size: "Medium", setting: "Urban", avgGPA: 3.9, sticker: 67000, netPrice: { low: 9000, mid: 23000, high: 47000 }, distanceTier: "far" },
  { name: "Emory University", state: "GA", country: "USA", type: "Private", size: "Medium", setting: "Suburban", avgGPA: 3.8, sticker: 65000, netPrice: { low: 15000, mid: 28000, high: 46000 }, distanceTier: "far" },
  { name: "University of Michigan–Ann Arbor", state: "MI", country: "USA", type: "Public", size: "Large", setting: "Suburban", avgGPA: 3.8, sticker: 40000, netPrice: { low: 16000, mid: 26000, high: 36000 }, distanceTier: "far" },
  { name: "Ohio State University", state: "OH", country: "USA", type: "Public", size: "Large", setting: "Urban", avgGPA: 3.6, sticker: 34000, netPrice: { low: 14000, mid: 21000, high: 29000 }, distanceTier: "far" },
  { name: "Purdue University", state: "IN", country: "USA", type: "Public", size: "Large", setting: "Rural", avgGPA: 3.6, sticker: 32000, netPrice: { low: 13000, mid: 20000, high: 27000 }, distanceTier: "far" },
  { name: "University of Wisconsin–Madison", state: "WI", country: "USA", type: "Public", size: "Large", setting: "Urban", avgGPA: 3.7, sticker: 37000, netPrice: { low: 15000, mid: 23000, high: 31000 }, distanceTier: "far" },
  { name: "Northwestern University", state: "IL", country: "USA", type: "Private", size: "Medium", setting: "Suburban", avgGPA: 3.9, sticker: 67000, netPrice: { low: 10000, mid: 24000, high: 47000 }, distanceTier: "far" },
  { name: "Georgia Institute of Technology", state: "GA", country: "USA", type: "Public", size: "Large", setting: "Urban", avgGPA: 3.85, sticker: 34000, netPrice: { low: 14000, mid: 21000, high: 29000 }, distanceTier: "far" },
  { name: "University of Texas at Austin", state: "TX", country: "USA", type: "Public", size: "Large", setting: "Urban", avgGPA: 3.7, sticker: 41000, netPrice: { low: 15000, mid: 23000, high: 31000 }, distanceTier: "far" },
  { name: "Stanford University", state: "CA", country: "USA", type: "Private", size: "Medium", setting: "Suburban", avgGPA: 3.95, sticker: 69000, netPrice: { low: 5000, mid: 17000, high: 40000 }, distanceTier: "far" },
  { name: "UC Berkeley", state: "CA", country: "USA", type: "Public", size: "Large", setting: "Urban", avgGPA: 3.85, sticker: 44000, netPrice: { low: 15000, mid: 24000, high: 34000 }, distanceTier: "far" },
  { name: "University of Washington", state: "WA", country: "USA", type: "Public", size: "Large", setting: "Urban", avgGPA: 3.7, sticker: 39000, netPrice: { low: 15000, mid: 23000, high: 31000 }, distanceTier: "far" },

  // ---------- OUT OF COUNTRY ----------
  // Placeholder figures — tuition converted to approx. USD/yr for international
  // students; verify against each school's official site before submission.
  { name: "University of Toronto", state: "ON", country: "Canada", type: "Public", size: "Large", setting: "Urban", avgGPA: 3.6, sticker: 45000, netPrice: { low: 30000, mid: 38000, high: 45000 }, distanceTier: "international" },
  { name: "McGill University", state: "QC", country: "Canada", type: "Public", size: "Large", setting: "Urban", avgGPA: 3.5, sticker: 32000, netPrice: { low: 20000, mid: 26000, high: 32000 }, distanceTier: "international" },
  { name: "University of Waterloo", state: "ON", country: "Canada", type: "Public", size: "Large", setting: "Suburban", avgGPA: 3.6, sticker: 38000, netPrice: { low: 25000, mid: 31000, high: 38000 }, distanceTier: "international" },
  { name: "University of British Columbia", state: "BC", country: "Canada", type: "Public", size: "Large", setting: "Urban", avgGPA: 3.6, sticker: 37000, netPrice: { low: 24000, mid: 30000, high: 37000 }, distanceTier: "international" },
  { name: "University of Oxford", state: "England", country: "UK", type: "Public", size: "Medium", setting: "Urban", avgGPA: 3.9, sticker: 45000, netPrice: { low: 35000, mid: 40000, high: 45000 }, distanceTier: "international" },
  { name: "University of Edinburgh", state: "Scotland", country: "UK", type: "Public", size: "Large", setting: "Urban", avgGPA: 3.6, sticker: 36000, netPrice: { low: 26000, mid: 31000, high: 36000 }, distanceTier: "international" },
  { name: "Trinity College Dublin", state: "Dublin", country: "Ireland", type: "Public", size: "Medium", setting: "Urban", avgGPA: 3.5, sticker: 28000, netPrice: { low: 20000, mid: 24000, high: 28000 }, distanceTier: "international" },
  { name: "National University of Singapore", state: "Singapore", country: "Singapore", type: "Public", size: "Large", setting: "Urban", avgGPA: 3.8, sticker: 30000, netPrice: { low: 20000, mid: 25000, high: 30000 }, distanceTier: "international" },
  { name: "University of Melbourne", state: "VIC", country: "Australia", type: "Public", size: "Large", setting: "Urban", avgGPA: 3.5, sticker: 34000, netPrice: { low: 24000, mid: 29000, high: 34000 }, distanceTier: "international" },
  { name: "University of Amsterdam", state: "NH", country: "Netherlands", type: "Public", size: "Large", setting: "Urban", avgGPA: 3.4, sticker: 16000, netPrice: { low: 12000, mid: 14000, high: 16000 }, distanceTier: "international" },
  { name: "Technical University of Munich", state: "BY", country: "Germany", type: "Public", size: "Large", setting: "Urban", avgGPA: 3.5, sticker: 8000, netPrice: { low: 5000, mid: 6500, high: 8000 }, distanceTier: "international" },
  { name: "University of Hong Kong", state: "HK", country: "Hong Kong", type: "Public", size: "Medium", setting: "Urban", avgGPA: 3.7, sticker: 26000, netPrice: { low: 18000, mid: 22000, high: 26000 }, distanceTier: "international" },
  { name: "University of Tokyo", state: "Tokyo", country: "Japan", type: "Public", size: "Large", setting: "Urban", avgGPA: 3.8, sticker: 12000, netPrice: { low: 7000, mid: 9500, high: 12000 }, distanceTier: "international" },
];

const BUDGET_TO_INCOME_TIER = {
  low: "low",     // "I need a lot of aid" — budget under ~15k/yr
  mid: "mid",     // moderate budget — 15k-30k/yr
  high: "high",   // can pay more out of pocket — 30k+/yr
};

// distanceTier: "local" (near home) | "regional"/"far" (outside NJ, still US) | "international" (out of country)
