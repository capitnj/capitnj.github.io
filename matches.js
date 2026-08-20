 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your College Matches — CapItNJ</title>
    <link rel="preconnect" href="https://googleapis.com">
    <link href="https://googleapis.com/css2?family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="nav">
        <div class="nav-inner">
            <a href="index.html" class="wordmark">CapItNJ</a>
            <div class="nav-links">
                <a href="index.html">Home</a>
                <a href="improve.html">Improve</a>
                <a href="explore.html">Explore</a>
                <a href="matches.html" class="active">Matches</a>
                <a href="mylist.html">My List</a>
                <a href="profile.html">Profile</a>
                <a href="login.html" id="nav-login-btn">Log in</a>
            </div>
        </div>
    </header>
 
    <main>
        <div class="wrap">
            <!-- LOGIN PROMPT -->
            <section id="login-section" style="display:none;">
                <div style="background: var(--accent); color: #fff; padding: 48px 24px; margin: 0 -24px 0; margin-bottom: 32px;">
                    <div style="max-width: var(--max-w); margin: 0 auto;">
                        <p class="eyebrow" style="color: rgba(255,255,255,0.6); margin-bottom: 20px;">GET MATCHED</p>
                        <h1 style="color: #fff; margin: 0;">Colleges tailored to you</h1>
                        <p style="color: rgba(255,255,255,0.85); font-size: 15px; margin: 12px 0 0; max-width: 460px;">Create an account or log in to see colleges matched to your GPA, budget, and preferences.</p>
                    </div>
                </div>
 
                <div style="text-align: center; padding: 60px 24px;">
                    <div style="max-width: 360px; margin: 0 auto;">
                        <div class="empty-state" style="border: none; padding: 0; background: none;">
                            <p style="font-size: 15px; color: var(--ink-soft); margin-bottom: 24px;">Ready to find your perfect college fit?</p>
                            <div style="display: flex; gap: 12px; flex-direction: column;">
                                <a href="login.html" class="btn" style="text-align: center; padding: 12px 22px;">Log In or Create Account</a>
                                <a href="explore.html" class="link-btn" style="text-align: center; padding: 12px; font-size: 13px;">Browse all colleges first →</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
 
            <!-- MATCHES DISPLAY -->
            <section id="matches-section" style="display:none;">
                <div style="background: var(--accent); color: #fff; padding: 48px 24px; margin: 0 -24px 0; margin-bottom: 32px;">
                    <div style="max-width: var(--max-w); margin: 0 auto;">
                        <p class="eyebrow" style="color: rgba(255,255,255,0.6); margin-bottom: 20px;">PERSONALIZED</p>
                        <h1 style="color: #fff; margin: 0;">Your matches</h1>
                        <p id="profile-summary" style="color: rgba(255,255,255,0.85); font-size: 13px; margin: 12px 0 0; font-family: var(--font-mono); letter-spacing: 0.03em;"></p>
                    </div>
                </div>
 
                <!-- FILTERS -->
                <div style="display: flex; gap: 10px; flex-wrap: wrap; margin: 28px 0 8px; padding-bottom: 16px; border-bottom: 1px solid var(--line);">
                    <button class="explore-controls" style="border: 1px solid var(--line); background: white; color: var(--ink); padding: 9px 14px; border-radius: 2px; font-size: 13px; cursor: pointer; display: inline-block;" onclick="filterMatches('all')" id="filter-all">All Matches</button>
                    <button class="explore-controls" style="border: 1px solid var(--line); background: white; color: var(--ink); padding: 9px 14px; border-radius: 2px; font-size: 13px; cursor: pointer; display: inline-block;" onclick="filterMatches('reach')" id="filter-reach">Reach</button>
                    <button class="explore-controls" style="border: 1px solid var(--line); background: white; color: var(--ink); padding: 9px 14px; border-radius: 2px; font-size: 13px; cursor: pointer; display: inline-block;" onclick="filterMatches('match')" id="filter-match">Match</button>
                    <button class="explore-controls" style="border: 1px solid var(--line); background: white; color: var(--ink); padding: 9px 14px; border-radius: 2px; font-size: 13px; cursor: pointer; display: inline-block;" onclick="filterMatches('safety')" id="filter-safety">Safety</button>
                </div>
 
                <!-- RESULTS -->
                <section id="matches-container" style="padding: 0;">
                    <p style="text-align: center; color: var(--ink-faint); padding: 40px 0;">Loading matches...</p>
                </section>
            </section>
        </div>
    </main>
 
    <footer class="home-footer">
        <div class="wrap">
            <p>© 2024 CapItNJ. Built for the Congressional App Challenge.</p>
        </div>
    </footer>
 
    <script src="data.js"></script>
    <script src="matching.js"></script>
    <script>
        let currentFilter = 'all';
        let userProfile = null;
 
        document.addEventListener('DOMContentLoaded', function() {
            checkLoginAndDisplay();
        });
 
        function checkLoginAndDisplay() {
            const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
            userProfile = JSON.parse(localStorage.getItem('userProfile') || 'null');
 
            if (isLoggedIn && userProfile) {
                document.getElementById('login-section').style.display = 'none';
                document.getElementById('matches-section').style.display = 'block';
                showMatches();
            } else {
                document.getElementById('login-section').style.display = 'block';
                document.getElementById('matches-section').style.display = 'none';
            }
        }
 
        function showMatches() {
            const summary = document.getElementById('profile-summary');
            summary.textContent = `GPA ${userProfile.gpa} | $${(userProfile.budget || 50000).toLocaleString()}/yr | ${userProfile.preferredLocation || 'Flexible'}`;
 
            const matches = calculateMatches(userProfile);
            updateFilterButtons();
            displayMatches(matches);
        }
 
        function calculateMatches(profile) {
            if (!collegesData) return [];
 
            return collegesData.map(college => {
                let category = 'match';
                const gpaGap = (college.avgGPA || 3.5) - profile.gpa;
                
                if (gpaGap > 0.5) category = 'reach';
                else if (gpaGap < -0.5) category = 'safety';
 
                const affordable = (college.netPrice || 50000) <= (profile.budget || 50000);
 
                return { ...college, category, affordable };
            }).sort((a, b) => {
                const order = { reach: 0, match: 1, safety: 2 };
                return order[a.category] - order[b.category];
            });
        }
 
        function filterMatches(filter) {
            currentFilter = filter;
            updateFilterButtons();
            
            const matches = calculateMatches(userProfile);
            displayMatches(matches);
        }
 
        function updateFilterButtons() {
            document.querySelectorAll('[id^="filter-"]').forEach(btn => {
                btn.style.background = 'white';
                btn.style.color = 'var(--ink)';
                btn.style.borderColor = 'var(--line)';
            });
 
            const activeBtn = document.getElementById('filter-' + currentFilter);
            if (activeBtn) {
                activeBtn.style.background = 'var(--accent)';
                activeBtn.style.color = '#fff';
                activeBtn.style.borderColor = 'var(--accent)';
            }
        }
 
        function displayMatches(matches) {
            const container = document.getElementById('matches-container');
            
            let filtered = matches;
            if (currentFilter !== 'all') {
                filtered = matches.filter(m => m.category === currentFilter);
            }
 
            if (filtered.length === 0) {
                container.innerHTML = '<p style="text-align: center; color: var(--ink-faint); padding: 40px 0;">No matches in this category.</p>';
                return;
            }
 
            let html = '';
            filtered.forEach(college => {
                const badgeColor = college.category === 'reach' ? '#FF8B5A' : college.category === 'match' ? '#51CF66' : '#4DABF7';
                const isSaved = isSavedCollege(college.id);
 
                html += `
                    <div class="explore-row" style="padding: 20px 0;">
                        <div style="flex: 1;">
                            <div class="explore-row-name" style="position: relative; padding-left: 60px;">
                                <span style="position: absolute; left: 0; top: 0; font-family: var(--font-mono); font-size: 10px; background: ${badgeColor}; color: white; padding: 3px 8px; border-radius: 2px; letter-spacing: 0.05em; font-weight: 600;">${college.category.toUpperCase()}</span>
                                ${college.name}
                            </div>
                            <div class="explore-row-meta">
                                GPA ${userProfile.gpa} vs ${college.avgGPA || 'N/A'} · Est. \$${(college.netPrice || 0).toLocaleString()} · ${college.affordable ? '✓ Fits budget' : '✗ Over budget'}
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                            <span class="explore-row-tag">${college.state}</span>
                            <button class="btn" style="padding: 8px 16px; font-size: 12px; background: #22A84A; color: white; border: 1px solid #22A84A;" onclick="toggleSave('${college.id}', '${college.name.replace(/'/g, "\\'")}', this)">
                                <span class="save-text-${college.id}">${isSaved ? 'Saved ✓' : 'Save'}</span>
                            </button>
                        </div>
                    </div>
                `;
            });
 
            container.innerHTML = html;
        }
 
        function isSavedCollege(collegeId) {
            const saved = JSON.parse(localStorage.getItem('savedColleges') || '[]');
            return saved.some(c => c.id === collegeId);
        }
 
        function toggleSave(collegeId, collegeName, btn) {
            let saved = JSON.parse(localStorage.getItem('savedColleges') || '[]');
            const isSaved = saved.some(c => c.id === collegeId);
 
            if (isSaved) {
                saved = saved.filter(c => c.id !== collegeId);
                document.querySelector('.save-text-' + collegeId).textContent = 'Save';
            } else {
                saved.push({ id: collegeId, name: collegeName });
                document.querySelector('.save-text-' + collegeId).textContent = 'Saved ✓';
            }
 
            localStorage.setItem('savedColleges', JSON.stringify(saved));
        }
    </script>
</body>
</html>