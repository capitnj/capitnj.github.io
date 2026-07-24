/*
  CapItNJ — matching engine (pure logic, no DOM)
  Placeholder dataset — see data.js for details on real data sources.
*/

const DISTANCE_RANK = { local: 0, regional: 1, far: 2, international: 3 };

function includesDistance(collegeTier, userWillingness) {
  return DISTANCE_RANK[collegeTier] <= DISTANCE_RANK[userWillingness];
}

function includesType(collegeType, typePref) {
  if (!typePref || typePref === "either") return true;
  return collegeType.toLowerCase() === typePref.toLowerCase();
}

function includesSize(collegeSize, sizePref) {
  if (!sizePref || sizePref === "either") return true;
  return collegeSize.toLowerCase() === sizePref.toLowerCase();
}

function includesSetting(collegeSetting, settingPref) {
  if (!settingPref || settingPref === "either") return true;
  return collegeSetting.toLowerCase() === settingPref.toLowerCase();
}

function priceCeiling(budgetTier) {
  return { low: 16000, mid: 30000, high: 55000 }[budgetTier];
}

// gpa, budget, distance are required. typePref, sizePref, settingPref ("either"
// or a specific value) and testScore are optional refinements. testScore isn't
// factored into fitScore yet since the demo dataset doesn't carry per-school SAT
// averages — it's stored so tipFor() and the UI can reference it.
function matchColleges({ gpa, budget, distance, typePref, sizePref, settingPref, testScore }) {
  const ceiling = priceCeiling(budget);
  const incomeTier = BUDGET_TO_INCOME_TIER[budget];

  return COLLEGES
    .map((college) => {
      const netPrice = college.netPrice[incomeTier];
      const gpaGap = gpa - college.avgGPA;
      const withinDistance = includesDistance(college.distanceTier, distance);
      const withinType = includesType(college.type, typePref);
      const withinSize = includesSize(college.size, sizePref);
      const withinSetting = includesSetting(college.setting, settingPref);
      const withinBudget = netPrice <= ceiling * 1.15;

      const gpaFitScore = Math.abs(gpaGap) < 0.15 ? 0 : Math.abs(gpaGap);
      const priceFitScore = Math.max(0, (netPrice - ceiling) / 1000);
      const fitScore = gpaFitScore * 4 + priceFitScore;

      return { college, netPrice, gpaGap, withinDistance, withinType, withinSize, withinSetting, withinBudget, fitScore };
    })
    .filter((r) => r.withinDistance && r.withinType && r.withinSize && r.withinSetting && r.withinBudget)
    .sort((a, b) => a.fitScore - b.fitScore);
}

// Splits a flat match list into the categories students actually think in:
// near home, best value for their budget, elsewhere in the US, and international.
// Each list is capped so the page stays scannable, not a wall of cards.
function groupMatches(matches) {
  const nearHome = matches.filter((m) => m.college.distanceTier === "local").slice(0, 6);

  const bestBudget = [...matches]
    .sort((a, b) => a.netPrice - b.netPrice)
    .slice(0, 6);

  const elsewhereUS = matches
    .filter((m) => m.college.distanceTier === "regional" || m.college.distanceTier === "far")
    .slice(0, 6);

  const international = matches
    .filter((m) => m.college.distanceTier === "international")
    .slice(0, 6);

  return { nearHome, bestBudget, elsewhereUS, international };
}

function tipFor({ college, netPrice, gpaGap }, budget) {
  if (gpaGap < -0.3) {
    return `Your GPA is a bit below ${college.name}'s typical admit — consider applying test-optional if available, and highlight upward grade trends in your application.`;
  }
  if (gpaGap > 0.3) {
    return `Your GPA is above ${college.name}'s typical admit — you may be a strong candidate for merit scholarships here, so check their merit aid page.`;
  }
  const ceiling = priceCeiling(budget);
  if (netPrice > ceiling) {
    return `Net price runs a bit over your target — file the FAFSA and CSS Profile early, and ask about work-study to close the gap.`;
  }
  return `Solid match on grades and cost — worth researching their financial aid deadlines so you don't miss out on aid.`;
}

function formatCurrency(n) {
  return `$${n.toLocaleString('en-US')}`;
}
