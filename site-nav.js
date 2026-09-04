/**
 * CapItNJ shared navigation — keeps every page on the same planning suite map.
 * Usage: <div id="site-header" data-active="district"></div> + <script src="site-nav.js"></script>
 */
(function () {
  var mount = document.getElementById("site-header");
  if (!mount) return;

  var active = (mount.getAttribute("data-active") || "").toLowerCase();

  var links = [
    { id: "home", href: "index.html", label: "Home" },
    { id: "explore", href: "explore.html", label: "Explore" },
    { id: "matches", href: "matches.html", label: "Matches" },
    { id: "compare", href: "compare.html", label: "Compare" },
    { id: "planning", href: "planning.html", label: "Planning" },
    { id: "mylist", href: "mylist.html", label: "My List" },
    { id: "profile", href: "profile.html", label: "Profile" },
    { id: "askcapi", href: "askcapi.html", label: "Ask Capi" },
    { id: "support", href: "support.html", label: "Support" }
  ];

  var navHtml = links
    .map(function (link) {
      var isActive =
        active === link.id ||
        (active === "district" && link.id === "planning") ||
        (active === "deadlines" && link.id === "planning") ||
        (active === "net-cost" && link.id === "planning") ||
        (active === "recommendations" && link.id === "planning") ||
        (active === "gpa" && link.id === "planning") ||
        (active === "improve" && link.id === "planning");

      return (
        '<a href="' +
        link.href +
        '"' +
        (isActive ? ' class="active"' : "") +
        ">" +
        link.label +
        "</a>"
      );
    })
    .join("");

  mount.innerHTML =
    '<header class="nav">' +
    '<div class="nav-inner">' +
    '<a href="index.html" class="wordmark">CapItNJ</a>' +
    '<div class="nav-links">' +
    navHtml +
    "</div>" +
    "</div>" +
    "</header>";
})();
