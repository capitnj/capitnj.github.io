<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile - CapItNJ</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        .profile-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
        }

        .profile-header {
            text-align: center;
            margin-bottom: 3rem;
            border-bottom: 2px solid #ddd;
            padding-bottom: 2rem;
        }

        .profile-header h1 {
            font-size: 2.5rem;
            font-family: 'Fraunces', serif;
            margin: 0.5rem 0;
            color: #111;
        }

        .profile-header p {
            font-size: 1.1rem;
            color: #666;
            margin: 0.5rem 0;
        }

        .logout-btn {
            background-color: #e74c3c;
            color: white;
            border: none;
            padding: 0.6rem 1.5rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.95rem;
            margin-top: 1rem;
        }

        .logout-btn:hover {
            background-color: #c0392b;
        }

        .form-section {
            background: white;
            padding: 2rem;
            margin-bottom: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .form-section h2 {
            font-size: 1.5rem;
            font-family: 'Fraunces', serif;
            margin-top: 0;
            margin-bottom: 1.5rem;
            color: #111;
            border-bottom: 2px solid #007bff;
            padding-bottom: 0.5rem;
        }

        .form-section h3 {
            font-family: 'Fraunces', serif;
            color: #333;
            font-size: 1.1rem;
            margin-top: 0;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #333;
        }

        .form-group input,
        .form-group select {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
            box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group select:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 5px rgba(0,123,255,0.25);
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }

        @media (max-width: 600px) {
            .form-row {
                grid-template-columns: 1fr;
            }
        }

        .btn-group {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
        }

        .btn {
            flex: 1;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .btn-primary {
            background-color: #007bff;
            color: white;
        }

        .btn-primary:hover {
            background-color: #0056b3;
        }

        .btn-secondary {
            background-color: #6c757d;
            color: white;
        }

        .btn-secondary:hover {
            background-color: #5a6268;
        }

        .btn-danger {
            background-color: #e74c3c;
            color: white;
        }

        .btn-danger:hover {
            background-color: #c0392b;
        }

        .status-msg {
            margin-top: 1rem;
            padding: 0.75rem;
            border-radius: 4px;
            text-align: center;
            font-weight: 600;
        }

        .status-msg.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .status-msg.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        #loading {
            text-align: center;
            padding: 3rem;
            font-size: 1.2rem;
            color: #666;
        }

        #profile-content {
            display: none;
        }

        .danger-section {
            border: 2px solid #e74c3c;
            background-color: #fff5f5;
        }

        .danger-section h2 {
            color: #c0392b;
            border-bottom-color: #e74c3c;
        }

        #delete-confirm-area {
            display: none;
            margin-top: 1.5rem;
            padding: 1.5rem;
            background-color: #f8d7da;
            border-radius: 4px;
            border: 1px solid #f5c6cb;
        }

        #delete-confirm-area .form-group {
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <a href="index.html" class="nav-logo">CapItNJ</a>
            <ul class="nav-menu">
                <li><a href="index.html">Home</a></li>
                <li><a href="profile.html" class="active">Profile</a></li>
                <li><a href="matches.html">Find Colleges</a></li>
            </ul>
        </div>
    </nav>

    <div id="loading">
        <p>Loading your profile...</p>
    </div>

    <div id="profile-content">
        <div class="profile-container">
            <div class="profile-header">
                <h1>Your Profile</h1>
                <p id="greeting-text"></p>
                <p><strong id="user-name"></strong></p>
                <p id="user-email"></p>
                <button id="logout-btn" class="logout-btn">Log Out</button>
            </div>

            <div class="form-section">
                <h2>College Preferences</h2>
                <form id="preferences-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="gpa">GPA</label>
                            <input type="number" id="gpa" step="0.01" min="0" max="4.0" placeholder="3.8">
                        </div>
                        <div class="form-group">
                            <label for="sat">SAT Score</label>
                            <input type="number" id="sat" min="400" max="1600" placeholder="1200">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="preferred-location">Home Zip Code</label>
                            <input type="text" id="preferred-location" placeholder="08901" maxlength="5">
                        </div>
                        <div class="form-group">
                            <label for="search-radius">Max Distance from Home</label>
                            <select id="search-radius">
                                <option value="50">50 miles</option>
                                <option value="150">150 miles</option>
                                <option value="300">300 miles</option>
                                <option value="999">Anywhere</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="max-tuition">Max Annual Tuition ($)</label>
                            <input type="number" id="max-tuition" min="0" step="1000" placeholder="50000">
                        </div>
                        <div class="form-group">
                            <label for="school-type">School Type</label>
                            <select id="school-type">
                                <option value="all">Any</option>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                    </div>

                    <div class="btn-group">
                        <button type="submit" id="save-btn" class="btn btn-primary">Save Preferences</button>
                    </div>
                    <div id="status-message" class="status-msg" style="display: none;"></div>
                </form>
            </div>

            <div class="form-section">
                <h2>Account Settings</h2>

                <form id="name-form">
                    <h3>Update Name</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="first-name">First Name</label>
                            <input type="text" id="first-name" placeholder="First Name">
                        </div>
                        <div class="form-group">
                            <label for="last-name">Last Name</label>
                            <input type="text" id="last-name" placeholder="Last Name">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Update Name</button>
                    <div id="name-status" class="status-msg" style="display: none;"></div>
                </form>

                <form id="email-form" style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #ddd;">
                    <h3>Update Email</h3>
                    <div class="form-group">
                        <label for="new-email">New Email Address</label>
                        <input type="email" id="new-email" placeholder="your-new-email@example.com">
                    </div>
                    <div class="form-group">
                        <label for="email-current-password">Current Password</label>
                        <input type="password" id="email-current-password" placeholder="Enter your password">
                    </div>
                    <button type="submit" class="btn btn-primary">Update Email</button>
                    <div id="email-status" class="status-msg" style="display: none;"></div>
                </form>

                <form id="password-form" style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #ddd;">
                    <h3>Change Password</h3>
                    <div class="form-group">
                        <label for="pw-current-password">Current Password</label>
                        <input type="password" id="pw-current-password" placeholder="Enter your current password">
                    </div>
                    <div class="form-group">
                        <label for="new-password">New Password</label>
                        <input type="password" id="new-password" placeholder="Enter a new password">
                    </div>
                    <button type="submit" class="btn btn-primary">Change Password</button>
                    <div id="password-status" class="status-msg" style="display: none;"></div>
                </form>
            </div>

            <div class="form-section danger-section">
                <h2>Danger Zone</h2>
                <p style="color: #c0392b; margin-bottom: 1.5rem;">
                    <strong>Warning:</strong> Actions in this section cannot be undone.
                </p>
                <button id="delete-account-btn" class="btn btn-danger">Delete Account</button>
                <div id="delete-confirm-area">
                    <div class="form-group">
                        <label for="delete-password">Confirm with Your Password</label>
                        <input type="password" id="delete-password" placeholder="Enter your password to confirm">
                    </div>
                    <p style="color: #721c24; font-weight: 600;">This action is permanent and cannot be reversed.</p>
                </div>
                <div id="danger-status" class="status-msg" style="display: none;"></div>
            </div>
        </div>
    </div>

    <div id="matching-loader" style="display: none; text-align: center; padding: 2rem;">
        <p>Analyzing Fits...</p>
    </div>

    <script src="firebase-init.js"></script>
    <script>
        (async () => {
            const firebase = await window.capitnjFirebase.ready;
            const { requireAuth, logOut } = firebase;
            const { doc, getDoc, setDoc, deleteDoc } = firebase.firestoreFns;
            const { updateProfile, updateEmail, updatePassword, deleteUser, EmailAuthProvider, reauthenticateWithCredential } = firebase.authFns;
            const db = firebase.db;

            const loadingEl = document.getElementById("loading");
            const contentEl = document.getElementById("profile-content");
            const logoutBtn = document.getElementById("logout-btn");
            const nameEl = document.getElementById("user-name");
            const emailEl = document.getElementById("user-email");
            const greetingEl = document.getElementById("greeting-text");

            const gpaInput = document.getElementById("gpa");
            const satInput = document.getElementById("sat");
            const locationInput = document.getElementById("preferred-location");
            const searchRadiusSelect = document.getElementById("search-radius");
            const tuitionInput = document.getElementById("max-tuition");
            const typeSelect = document.getElementById("school-type");
            const prefForm = document.getElementById("preferences-form");
            const statusMsg = document.getElementById("status-message");
            const matchingLoader = document.getElementById("matching-loader");

            const firstNameInput = document.getElementById("first-name");
            const lastNameInput = document.getElementById("last-name");
            const nameForm = document.getElementById("name-form");
            const nameStatus = document.getElementById("name-status");

            const newEmailInput = document.getElementById("new-email");
            const emailCurrentPwInput = document.getElementById("email-current-password");
            const emailForm = document.getElementById("email-form");
            const emailStatus = document.getElementById("email-status");

            const pwCurrentInput = document.getElementById("pw-current-password");
            const newPwInput = document.getElementById("new-password");
            const passwordForm = document.getElementById("password-form");
            const passwordStatus = document.getElementById("password-status");

            const deleteAccountBtn = document.getElementById("delete-account-btn");
            const deleteConfirmArea = document.getElementById("delete-confirm-area");
            const deletePasswordInput = document.getElementById("delete-password");
            const dangerStatus = document.getElementById("danger-status");

            logoutBtn.addEventListener("click", () => logOut());

            function reauth(user, password) {
                const credential = EmailAuthProvider.credential(user.email, password);
                return reauthenticateWithCredential(user, credential);
            }

            function showStatus(element, message, isSuccess) {
                element.textContent = message;
                element.className = `status-msg ${isSuccess ? "success" : "error"}`;
                element.style.display = "block";
            }

            requireAuth(async (user) => {
                loadingEl.style.display = "none";
                contentEl.style.display = "block";

                const displayName = user.displayName || sessionStorage.getItem("capitnj_name") || "Student";
                nameEl.textContent = displayName;
                emailEl.textContent = user.email;
                greetingEl.textContent = `Hi, ${displayName.split(" ")[0]}! Manage your account and college preferences here.`;

                const [first, ...rest] = displayName.split(" ");
                firstNameInput.value = first || "";
                lastNameInput.value = rest.join(" ") || "";
                newEmailInput.placeholder = user.email;

                const userDocRef = doc(db, "users", user.uid);
                try {
                    const docSnap = await getDoc(userDocRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        if (data.gpa) gpaInput.value = data.gpa;
                        if (data.sat) satInput.value = data.sat;
                        if (data.maxTuition) tuitionInput.value = data.maxTuition;
                        if (data.preferred_location) locationInput.value = data.preferred_location;
                        if (data.searchRadius) searchRadiusSelect.value = data.searchRadius;
                        if (data.schoolType) typeSelect.value = data.schoolType;
                    }
                } catch (error) {
                    console.error("Error fetching profile document:", error);
                }

                prefForm.addEventListener("submit", async (event) => {
                    event.preventDefault();
                    matchingLoader.style.display = "block";
                    statusMsg.style.display = "block";
                    statusMsg.textContent = "Analyzing Fits...";

                    try {
                        const zipCode = locationInput.value.trim();
                        if (!zipCode) {
                            throw new Error("Please enter a zipcode");
                        }

                        await setDoc(userDocRef, {
                            gpa: gpaInput.value,
                            sat: satInput.value,
                            maxTuition: tuitionInput.value,
                            preferred_location: zipCode,
                            searchRadius: searchRadiusSelect.value,
                            schoolType: typeSelect.value,
                            email: user.email,
                            updatedAt: new Date().toISOString()
                        }, { merge: true });

                        localStorage.setItem("userGpa", gpaInput.value);
                        localStorage.setItem("userSat", satInput.value);
                        localStorage.setItem("userBudget", tuitionInput.value);
                        localStorage.setItem("userZipCode", zipCode);
                        localStorage.setItem("searchRadius", searchRadiusSelect.value);
                        localStorage.setItem("userCollegeType", typeSelect.value);

                        setTimeout(() => {
                            window.location.href = "matches.html";
                        }, 1000);
                    } catch (error) {
                        console.error("Error saving preferences:", error);
                        showStatus(statusMsg, `Error: ${error.message}`, false);
                        matchingLoader.style.display = "none";
                    }
                });

                nameForm.addEventListener("submit", async (event) => {
                    event.preventDefault();
                    nameStatus.style.display = "block";
                    nameStatus.textContent = "Saving...";
                    const fullName = `${firstNameInput.value.trim()} ${lastNameInput.value.trim()}`.trim();
                    try {
                        await updateProfile(user, { displayName: fullName });
                        await setDoc(userDocRef, { name: fullName }, { merge: true });
                        sessionStorage.setItem("capitnj_name", fullName);
                        nameEl.textContent = fullName;
                        greetingEl.textContent = `Hi, ${firstNameInput.value.trim()}! Manage your account and college preferences here.`;
                        showStatus(nameStatus, "✅ Name updated.", true);
                    } catch (error) {
                        console.error(error);
                        showStatus(nameStatus, "❌ Could not update name.", false);
                    }
                });

                emailForm.addEventListener("submit", async (event) => {
                    event.preventDefault();
                    const newEmail = newEmailInput.value.trim();
                    const currentPw = emailCurrentPwInput.value;
                    if (!newEmail || !currentPw) {
                        showStatus(emailStatus, "❌ Enter a new email and your current password.", false);
                        return;
                    }
                    emailStatus.style.display = "block";
                    emailStatus.textContent = "Updating...";
                    try {
                        await reauth(user, currentPw);
                        await updateEmail(user, newEmail);
                        await setDoc(userDocRef, { email: newEmail }, { merge: true });
                        emailEl.textContent = newEmail;
                        showStatus(emailStatus, "✅ Email updated.", true);
                        emailCurrentPwInput.value = "";
                    } catch (error) {
                        console.error(error);
                        showStatus(emailStatus, "❌ Could not update email. Check your password and try again.", false);
                    }
                });

                passwordForm.addEventListener("submit", async (event) => {
                    event.preventDefault();
                    const currentPw = pwCurrentInput.value;
                    const newPw = newPwInput.value;
                    if (!currentPw || !newPw) {
                        showStatus(passwordStatus, "❌ Fill in both password fields.", false);
                        return;
                    }
                    passwordStatus.style.display = "block";
                    passwordStatus.textContent = "Updating...";
                    try {
                        await reauth(user, currentPw);
                        await updatePassword(user, newPw);
                        showStatus(passwordStatus, "✅ Password updated.", true);
                        pwCurrentInput.value = "";
                        newPwInput.value = "";
                    } catch (error) {
                        console.error(error);
                        showStatus(passwordStatus, "❌ Could not update password. Check your current password.", false);
                    }
                });

                deleteAccountBtn.addEventListener("click", async () => {
                    if (deleteConfirmArea.style.display === "none") {
                        deleteConfirmArea.style.display = "block";
                        dangerStatus.style.display = "block";
                        dangerStatus.textContent = "Enter your password above, then click Delete Account again to confirm.";
                        dangerStatus.className = "status-msg";
                        return;
                    }
                    const pw = deletePasswordInput.value;
                    if (!pw) {
                        showStatus(dangerStatus, "❌ Please enter your password to confirm deletion.", false);
                        return;
                    }
                    if (!confirm("This will permanently delete your account. Are you absolutely sure?")) return;
                    dangerStatus.style.display = "block";
                    dangerStatus.textContent = "Deleting...";
                    try {
                        await reauth(user, pw);
                        await deleteDoc(userDocRef);
                        await deleteUser(user);
                        window.location.replace("login.html");
                    } catch (error) {
                        console.error(error);
                        showStatus(dangerStatus, "❌ Could not delete account. Check your password and try again.", false);
                    }
                });
            });
        })();
    </script>
    <script src="data.js"></script>
    <script src="matching.js"></script>
</body>
</html>