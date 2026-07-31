window.COLLEGES = [];

const CURATED_INTERNATIONAL = [
    "University of Toronto", "McGill University", "University of British Columbia",
    "University of Oxford", "University of Cambridge", "Imperial College London",
    "University of Melbourne", "University of Sydney", "National University of Singapore",
    "University of Waterloo"
];

// Exact-name whitelist for major NJ schools whose "state-province" field
// is sometimes missing/blank in the source dataset. Using exact names
// instead of loose substrings avoids false positives like
// "Rowan-Cabarrus Community College" (NC) matching on "rowan".
const NJ_EXACT_NAMES = [
    "Rutgers University-New Brunswick", "Rutgers University-Newark", "Rutgers University-Camden",
    "Princeton University", "Rowan University", "Kean University",
    "Montclair State University", "New Jersey Institute of Technology",
    "Stockton University", "Seton Hall University", "Drew University",
    "William Paterson University", "The College of New Jersey",
    "Rider University", "Ramapo College of New Jersey",
    "Fairleigh Dickinson University", "Monmouth University", "Saint Peter's University"
];

const NEARBY_STATES = [
    "New York", "Pennsylvania", "Connecticut", "Delaware",
    "Maryland", "Massachusetts", "Rhode Island", "District of Columbia"
];

async function loadGlobalCollegeDatabase() {
    try {
        const response = await fetch(
            "https://cdn.jsdelivr.net/gh/Hipo/university-domains-list/world_universities_and_domains.json"
        );

        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

        const allSchools = await response.json();

        const usSchools = allSchools.filter(s => s.country === "United States");
        const intlSchools = allSchools.filter(s => CURATED_INTERNATIONAL.includes(s.name));

        const combined = [...usSchools, ...intlSchools];

        window.COLLEGES = combined.map((school, index) => {
            const isUS = school.country === "United States";
            const apiState = (school["state-province"] || "").trim();

            // Primary NJ check: real state field. Fallback: exact-name match
            // (only for the small set of flagship schools that lack the field).
            const isNJ =
                apiState === "New Jersey" ||
                NJ_EXACT_NAMES.includes(school.name);

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

            return {
                id: `school_${index}`,
                name: school.name,
                type: school.name.toLowerCase().includes("university") ? "University" : "College",
                setting: isNJ ? "Suburban" : "Urban",
                state: stateValue,
                country: school.country,
                webPage: (school.web_pages && school.web_pages[0]) || "",
                netPrice: estimatedNetPrice,
                distanceTier: distanceTier
            };
        });

        window.dispatchEvent(new CustomEvent("database-ready"));
        console.log(`Database initialized. Loaded ${window.COLLEGES.length} institutions.`);
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
                distanceTier: "local"
            },
            {
                id: "princeton",
                name: "Princeton University",
                type: "Private",
                setting: "Suburban",
                state: "NJ",
                country: "United States",
                netPrice: 12000,
                distanceTier: "local"
            },
            {
                id: "njit",
                name: "New Jersey Institute of Technology (NJIT)",
                type: "Public",
                setting: "Urban",
                state: "NJ",
                country: "United States",
                netPrice: 16000,
                distanceTier: "local"
            }
        ];

        window.dispatchEvent(new CustomEvent("database-ready"));
    }
}

loadGlobalCollegeDatabase();

matches.html — replace just the <script type="module"> block (everything above it stays the same as your current file):

html
    <script type="module" src="firebase-init.js"></script>
    <script src="data.js"></script>
    <script type="module">
        if (!window.capitnjFirebase?.ready) {
            await new Promise((resolve) => window.addEventListener("firebase-ready", resolve, { once: true }));
        }
        const firebase = await window.capitnjFirebase.ready;
        const { doc, getDoc, setDoc } = firebase.firestoreFns;
        const db = firebase.db;

        const SCORECARD_API_KEY = "GtNXgFPhac42LoNAwniX9lRIP757nArl7BV9Xkvg";
        const FALLBACK_NET_PRICE = 22000;
        const MAX_LIVE_LOOKUPS_PER_SECTION = 12; // cap live API calls so the page stays fast
        let currentUser = null;

        function formatCurrency(num) {
            return '$' + Number(num).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
        }

        function sanitizeId(name) {
            return name.replace(/[^a-zA-Z0-9]/g, '');
        }

        function isUS(country) {
            if (!country) return true;
            const c = country.trim().toLowerCase();
            return c === 'us' || c === 'usa' || c === 'united states' || c === 'united states of america';
        }

        firebase.authFns.onAuthStateChanged(firebase.auth, (user) => {
            if (!user) {
                document.getElementById('matches-content').innerHTML = `
                    <div class="login-gate">
                        <h2>Log in to get customized results!</h2>
                        <p>Set your GPA, budget, and location preferences once, then see colleges ranked just for you.</p>
                        <a href="login.html" class="btn">Sign up / Log in</a>
                    </div>`;
                return;
            }
            loadMatches(user);
        });

        async function loadMatches(user) {
            currentUser = user;
            const userDocRef = doc(db, "users", user.uid);
            let data = null;

            try {
                const docSnap = await getDoc(userDocRef);
                data = docSnap.exists() ? docSnap.data() : null;
            } catch (error) {
                console.error("Error reading matches database profile:", error);
            }

            if (!data || !data.maxTuition) {
                document.getElementById('no-profile').style.display = 'block';
                return;
            }

            const maxBudget = parseFloat(data.maxTuition) || 999999;

            const matchedColleges = (window.COLLEGES || []).filter(c => {
                const netPrice = c.netPrice || FALLBACK_NET_PRICE;
                return netPrice <= maxBudget;
            });

            renderGroups(matchedColleges, maxBudget);
        }

        function locationPhrase(college) {
            if (college.state === 'NJ') return "it's close to home, right here in New Jersey";
            if (isUS(college.country)) return "it's a solid option outside New Jersey";
            return "it's an international option that broadens your search";
        }

        function whyMatchedText(college, maxBudget, price) {
            const pctOfBudget = Math.round((price / maxBudget) * 100);
            const budgetPhrase = pctOfBudget <= 80
                ? `it runs well under your ${formatCurrency(maxBudget)} budget cap (about ${pctOfBudget}% of it)`
                : `it fits inside your ${formatCurrency(maxBudget)} budget cap, though it's close to the limit`;
            return `Matched because ${budgetPhrase}, and ${locationPhrase(college)}.`;
        }

        function cardHtml(college, maxBudget) {
            const price = college.netPrice || FALLBACK_NET_PRICE;
            const statusLabel = price <= maxBudget * 0.8 ? "Safe budget choice" : "Near your limit";
            const statusColor = price <= maxBudget * 0.8 ? "#1d7a4f" : "#b8791a";
            const uid = sanitizeId(college.name);

            return `
                <div class="result-card" data-uid="${uid}" style="border: 1px solid var(--line); border-radius: 8px; padding: 20px; margin-bottom: 16px; background: var(--bg);">
                    <div class="result-top" style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <div class="result-name" style="font-weight: 600; font-size: 18px; color: var(--ink);">${college.name}</div>
                            <div class="result-meta" style="color: var(--ink-soft); font-size: 13px; margin-top: 4px;">
                                ${college.type} · ${college.setting} · ${college.state}, ${college.country}
                            </div>
                        </div>
                        <div style="text-align:right">
                            <div class="result-price-label" id="price-label-${uid}" style="font-size: 11px; text-transform: uppercase; color: var(--ink-faint); font-weight: 500;">Est. cost / yr</div>
                            <div class="result-price" id="price-${uid}" style="font-size: 20px; font-weight: 700; color: var(--ink); margin-top: 2px;">${formatCurrency(price)}</div>
                        </div>
                    </div>
                    <div class="result-tip" id="tip-${uid}" style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--line); font-size: 14px; color: ${statusColor}; font-weight: 500;">
                        ${statusLabel}. Estimated costs fit inside your parameters, keep an eye on local scholarship updates in your Improve tab.
                    </div>
                    <div class="why-matched" id="why-${uid}">${whyMatchedText(college, maxBudget, price)}</div>
                    <div style="margin-top: 15px; padding: 12px; background: var(--surface); border-radius: 6px; border: 1px dashed var(--line); display: flex; flex-direction: column; gap: 10px;">
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <label style="font-size: 13px; font-weight: 500; color: var(--ink);">Rank Priority:</label>
                            <select id="rank-${uid}" style="padding: 4px; border-radius: 4px; border: 1px solid var(--line); font-size: 13px;">
                                <option value="Top Choice">Top Choice / #1 Pick</option>
                                <option value="Considering" selected>Considering</option>
                                <option value="Safety Backup">Safety Backup</option>
                            </select>
                        </div>
                        <textarea id="notes-${uid}" placeholder="Add your research notes (e.g. spoke to counselor, requires extra essays)" style="width: 100%; min-height: 50px; padding: 8px; border: 1px solid var(--line); border-radius: 4px; font-size: 13px; font-family: inherit; resize: vertical; box-sizing: border-box;"></textarea>
                        <button class="btn-save-match" data-uid="${uid}" data-name="${encodeURIComponent(college.name)}" data-state="${college.state}" style="background: var(--accent); color: #fff; border: none; padding: 8px 12px; border-radius: 4px; font-size: 13px; font-weight: 500; cursor: pointer; align-self: flex-start;">Save to My List</button>
                    </div>
                </div>
            `;
        }

        function sectionHtml(title, subtitle, items, maxBudget) {
            if (items.length === 0) return '';
            const cards = items.map((c) => cardHtml(c, maxBudget)).join('');
            return `
                <section class="result-section" style="margin-bottom: 40px;">
                    <div class="result-section-head" style="margin-bottom: 16px;">
                        <h2 style="font-family: 'Fraunces', serif; font-size: 24px; color: var(--ink);">${title}</h2>
                        <p style="color: var(--ink-soft); font-size: 14px; margin-top: 2px;">${subtitle}</p>
                    </div>
                    ${cards}
                </section>
            `;
        }

        function attachSaveHandlers() {
            document.querySelectorAll('.btn-save-match').forEach(btn => {
                btn.addEventListener('click', () => {
                    const uid = btn.getAttribute('data-uid');
                    const name = decodeURIComponent(btn.getAttribute('data-name'));
                    const state = btn.getAttribute('data-state');
                    saveCollegeToList(name, state, uid);
                });
            });
        }

        async function saveCollegeToList(collegeName, state, uid) {
            if (!currentUser) {
                alert("Please sign in first to save colleges to your dashboard list.");
                return;
            }

            const rankSelection = document.getElementById(`rank-${uid}`).value;
            const noteContent = document.getElementById(`notes-${uid}`).value;

            try {
                await setDoc(doc(db, "users", currentUser.uid, "savedColleges", uid), {
                    name: collegeName,
                    state: state,
                    rate: "N/A",
                    priority: rankSelection,
                    notes: noteContent,
                    timestamp: new Date().toISOString()
                });
                alert(`Saved ${collegeName} to your list.`);
            } catch (err) {
                console.error("Cloud storage sync failed:", err);
                alert("Failed to save college data. Make sure you are signed in.");
            }
        }

        // Fetches real per-school net price / admit rate from College Scorecard,
        // for a bounded set of U.S. schools per section, and updates the card in place.
        async function hydrateRealPrices(sectionItems, maxBudget) {
            const usItems = sectionItems.filter(c => isUS(c.country)).slice(0, MAX_LIVE_LOOKUPS_PER_SECTION);

            await Promise.all(usItems.map(async (college) => {
                const uid = sanitizeId(college.name);
                try {
                    const fields = "school.name,latest.cost.net_price.overall.overall,latest.admissions.admission_rate.overall";
                    const url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${SCORECARD_API_KEY}&school.name=${encodeURIComponent(college.name)}&_fields=${fields}&_per_page=5`;
                    const res = await fetch(url);
                    const json = await res.json();
                    const candidates = json.results || [];
                    const result = candidates.find(r => r["school.name"].toLowerCase() === college.name.toLowerCase()) || candidates[0];
                    const realPrice = result && result["latest.cost.net_price.overall.overall"];

                    if (realPrice) {
                        const priceEl = document.getElementById(`price-${uid}`);
                        const labelEl = document.getElementById(`price-label-${uid}`);
                        const whyEl = document.getElementById(`why-${uid}`);
                        const tipEl = document.getElementById(`tip-${uid}`);
                        if (priceEl) priceEl.textContent = formatCurrency(realPrice);
                        if (labelEl) labelEl.textContent = "Actual net price / yr";
                        if (whyEl) whyEl.textContent = whyMatchedText(college, maxBudget, realPrice);
                        if (tipEl) {
                            const overBudget = realPrice > maxBudget;
                            tipEl.style.color = overBudget ? "#b8791a" : "#1d7a4f";
                            tipEl.textContent = overBudget
                                ? "Actual cost data came in higher than the estimate — still worth checking financial aid options."
                                : "Actual cost data confirms this fits your budget.";
                        }
                    }
                } catch (err) {
                    console.error("Scorecard lookup failed for", college.name, err);
                }
            }));
        }

        function renderGroups(colleges, maxBudget) {
            const wrap = document.getElementById('results-groups');
            wrap.innerHTML = '';

            if (colleges.length === 0) {
                wrap.innerHTML = `<div class="empty-state" style="padding: 40px; text-align: center; color: var(--ink-soft);">No schools match your budget threshold currently, try widening your tuition cap on your Profile page.</div>`;
                return;
            }

            const nearHome = colleges.filter(c => c.state === 'NJ');
            const outsideNJ = colleges.filter(c => c.state !== 'NJ' && isUS(c.country));
            const international = colleges.filter(c => !isUS(c.country));

            let html = '';
            html += sectionHtml('Near Home', 'Colleges close by, inside New Jersey.', nearHome, maxBudget);
            html += sectionHtml('Outside NJ', 'Options located across other US states.', outsideNJ, maxBudget);
            html += sectionHtml('Out of Country', 'International paths that expand your options.', international, maxBudget);

            wrap.innerHTML = html || `<div class="empty-state" style="padding: 40px; text-align: center; color: var(--ink-soft);">No schools match your exact criteria. Try adjusting your preferences.</div>`;
            attachSaveHandlers();

            // Kick off live price lookups per section (bounded, non-blocking)
            hydrateRealPrices(nearHome, maxBudget);
            hydrateRealPrices(outsideNJ, maxBudget);
            hydrateRealPrices(international, maxBudget);
        }
    </script>