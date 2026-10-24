/* ==========================================================
   TECHBRIDGE CHALLENGE HUB
   - Filter challenges by track and difficulty
   - Open a pop-up with full challenge details
   Everything happens without refreshing the page.
   ========================================================== */


/* ----------------------------------------------------------
   1. DATA: an array of challenge objects.
   To add a challenge, copy one object, change the text,
   and make sure "id" is unique. The page updates by itself.
   Edit the wording below to make the challenges your own.
   ---------------------------------------------------------- */
const challenges = [
  {
    id: "sales-cleanup",
    name: "Sales Data Cleanup",
    track: "Data Analytics",
    difficulty: "Beginner",
    description: "Clean a small, messy sales spreadsheet so it can be analyzed.",
    outcome: "A clean dataset and a short summary of total sales by product.",
    objective: "Fix common data problems so the sales data can be analyzed reliably.",
    skills: ["Data cleaning", "Spreadsheet formulas", "Basic summaries"],
    tools: ["Google Sheets or Excel"],
    produce: "A cleaned spreadsheet with a short summary table.",
    time: "2-3 hours"
  },
  {
    id: "expense-analysis",
    name: "Expense Analysis",
    track: "Data Analytics",
    difficulty: "Beginner",
    description: "Analyze a month of company expenses to see where the money is going.",
    outcome: "A table and chart of spending by category, with two or three observations.",
    objective: "Group and summarize expenses to find the biggest areas of spending.",
    skills: ["Pivot Tables", "Basic formulas", "Charts"],
    tools: ["Google Sheets or Excel"],
    produce: "A Pivot Table, one chart and a few written observations.",
    time: "2-3 hours"
  },
  {
    id: "sales-dashboard",
    name: "Monthly Sales Dashboard",
    track: "Data Analytics",
    difficulty: "Intermediate",
    description: "Turn sales data into a dashboard that shows how a business is performing.",
    outcome: "A simple dashboard presenting the company's monthly sales performance.",
    objective: "Analyze sales information and communicate important trends clearly.",
    skills: ["Data cleaning", "Pivot Tables", "Data visualization"],
    tools: ["Excel or Google Sheets"],
    produce: "A dashboard with at least three charts and a short list of insights.",
    time: "4-5 hours"
  },
  {
    id: "churn-analysis",
    name: "Customer Churn Analysis",
    track: "Data Analytics",
    difficulty: "Advanced",
    description: "Study customer records to find patterns in who stays and who leaves.",
    outcome: "A short report with query results, charts and recommendations to reduce churn.",
    objective: "Use data from related tables to find factors linked to customers leaving.",
    skills: ["SQL joins and aggregations", "Lookup functions", "Data visualization", "Business-focused analysis"],
    tools: ["SQL", "Excel or Google Sheets"],
    produce: "SQL queries, supporting charts and a written recommendation.",
    time: "6-8 hours"
  },
  {
    id: "landing-page",
    name: "Responsive Landing Page",
    track: "Web Development",
    difficulty: "Beginner",
    description: "Build a one-page website for a small business that looks good on any screen.",
    outcome: "A responsive landing page with a clear headline, sections and a call-to-action button.",
    objective: "Practice structuring and styling a page with HTML and CSS.",
    skills: ["HTML structure", "CSS layout", "Responsive design"],
    tools: ["HTML", "CSS", "VS Code"],
    produce: "An index.html and style.css file, tested on mobile and desktop.",
    time: "3-4 hours"
  },
  {
    id: "product-page",
    name: "Product Page",
    track: "Web Development",
    difficulty: "Intermediate",
    description: "Design a product page with an image, details, pricing and a buy button.",
    outcome: "A responsive product page with a clear layout that adapts from phone to desktop.",
    objective: "Arrange product information in a layout that is easy to scan and use.",
    skills: ["CSS Grid and Flexbox", "Responsive images", "Visual hierarchy"],
    tools: ["HTML", "CSS"],
    produce: "A product page that works on phone, tablet and desktop.",
    time: "3-4 hours"
  },
  {
    id: "contact-form",
    name: "Contact Form with Validation",
    track: "Web Development",
    difficulty: "Intermediate",
    description: "Create a contact form that checks the visitor's input before accepting it.",
    outcome: "A form that shows helpful messages when fields are empty or incorrect.",
    objective: "Use JavaScript to respond to what the visitor types.",
    skills: ["HTML forms", "JavaScript events", "Conditional logic", "DOM manipulation"],
    tools: ["HTML", "CSS", "JavaScript"],
    produce: "A working form with clear error and success messages.",
    time: "3-4 hours"
  },
  {
    id: "task-manager",
    name: "Interactive Task Manager",
    track: "Web Development",
    difficulty: "Advanced",
    description: "Build a small app where users can add, complete and delete tasks.",
    outcome: "A working task manager that updates on the page without refreshing.",
    objective: "Combine arrays, objects and DOM updates in one small interactive project.",
    skills: ["JavaScript arrays and objects", "Event listeners", "DOM manipulation", "Git/GitHub"],
    tools: ["HTML", "CSS", "JavaScript", "Git/GitHub"],
    produce: "A deployed task manager with its code on GitHub.",
    time: "6-8 hours"
  }
];


/* ----------------------------------------------------------
   2. VARIABLES
   The two filters start on "All". These change when the
   visitor clicks a filter button.
   ---------------------------------------------------------- */
let selectedTrack = "All";
let selectedDifficulty = "All";

const gridEl        = document.getElementById("challenge-grid");
const noResultsEl   = document.getElementById("no-results");
const countEl       = document.getElementById("result-count");
const filterButtons = document.querySelectorAll(".chip-btn");
const resetButton   = document.getElementById("reset-filters");
const dialogEl      = document.getElementById("challenge-dialog");
const dialogBodyEl  = document.getElementById("dialog-body");
const dialogClose   = document.getElementById("dialog-close");


/* ----------------------------------------------------------
   3. FUNCTIONS
   ---------------------------------------------------------- */

// Returns only the challenges that match BOTH filters
function getFilteredChallenges() {
  return challenges.filter(function (challenge) {
    const trackMatches = selectedTrack === "All" || challenge.track === selectedTrack;
    const difficultyMatches = selectedDifficulty === "All" || challenge.difficulty === selectedDifficulty;
    return trackMatches && difficultyMatches;
  });
}

// Picks the CSS class for the difficulty bars (1, 2 or 3 bars filled)
function getLevelClass(difficulty) {
  if (difficulty === "Beginner") {
    return "lvl-1";
  } else if (difficulty === "Intermediate") {
    return "lvl-2";
  } else {
    return "lvl-3";
  }
}

// Picks the colour class for the track label
function getTrackClass(track) {
  if (track === "Data Analytics") {
    return "track-da";
  } else {
    return "track-wd";
  }
}

// Small piece of HTML showing the difficulty with 3 bars
function buildLevel(difficulty) {
  return `
    <span class="level ${getLevelClass(difficulty)}">
      <span class="bars" aria-hidden="true"><i></i><i></i><i></i></span>
      ${difficulty}
    </span>`;
}

// Builds ONE challenge card
function buildCard(challenge) {
  return `
    <article class="c-card ${getTrackClass(challenge.track)}">
      <p class="track-tag">${challenge.track}</p>
      <h3>${challenge.name}</h3>
      ${buildLevel(challenge.difficulty)}
      <p>${challenge.description}</p>
      <p class="outcome"><strong>Expected outcome:</strong> ${challenge.outcome}</p>
      <button type="button" class="btn btn-primary" data-id="${challenge.id}">View Challenge</button>
    </article>`;
}

// Draws the cards that match the current filters
function renderChallenges() {
  const visible = getFilteredChallenges();

  gridEl.innerHTML = visible.map(buildCard).join("");
  countEl.textContent = "Showing " + visible.length + " of " + challenges.length + " challenges";

  // Show the "no results" message only when nothing matches
  if (visible.length === 0) {
    noResultsEl.hidden = false;
  } else {
    noResultsEl.hidden = true;
  }
}

// Highlights the chosen button in each filter group
function updateFilterButtons() {
  filterButtons.forEach(function (button) {
    const group = button.dataset.filter;
    const value = button.dataset.value;
    const chosen = (group === "track") ? selectedTrack : selectedDifficulty;

    button.setAttribute("aria-pressed", value === chosen ? "true" : "false");
  });
}

// Builds a chip list (used for skills and tools)
function buildChips(items) {
  return '<ul class="skill-list">' +
    items.map(function (item) { return "<li>" + item + "</li>"; }).join("") +
    "</ul>";
}

// Fills the pop-up with one challenge's details and opens it
function openChallenge(id) {
  const challenge = challenges.find(function (c) {
    return c.id === id;
  });

  if (!challenge) {
    return;
  }

  dialogBodyEl.innerHTML = `
    <p class="track-tag ${getTrackClass(challenge.track)}">${challenge.track}</p>
    <h2 id="dialog-title">${challenge.name}</h2>
    ${buildLevel(challenge.difficulty)}

    <h4>Objective</h4>
    <p>${challenge.objective}</p>

    <h4>Skills required</h4>
    ${buildChips(challenge.skills)}

    <h4>Tools that may be used</h4>
    ${buildChips(challenge.tools)}

    <h4>What you will produce</h4>
    <p>${challenge.produce}</p>

    <h4>Estimated time</h4>
    <p>${challenge.time}</p>

    <h4>Expected result</h4>
    <p>${challenge.outcome}</p>
  `;

  dialogEl.showModal();
}

// Put both filters back to "All"
function resetFilters() {
  selectedTrack = "All";
  selectedDifficulty = "All";
  updateFilterButtons();
  renderChallenges();
}


/* ----------------------------------------------------------
   4. EVENT LISTENERS
   ---------------------------------------------------------- */

// Filter buttons: save the choice, then redraw
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (button.dataset.filter === "track") {
      selectedTrack = button.dataset.value;
    } else {
      selectedDifficulty = button.dataset.value;
    }
    updateFilterButtons();
    renderChallenges();
  });
});

// "View Challenge" buttons: the cards are created by JavaScript, so we listen on
// the grid and check which button was clicked (this is called event delegation)
gridEl.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-id]");
  if (button) {
    openChallenge(button.dataset.id);
  }
});

resetButton.addEventListener("click", resetFilters);

// Close the pop-up with the X button or by clicking the dark background
dialogClose.addEventListener("click", function () {
  dialogEl.close();
});
dialogEl.addEventListener("click", function (event) {
  if (event.target === dialogEl) {
    dialogEl.close();
  }
});


/* ----------------------------------------------------------
   5. START THE PAGE
   ---------------------------------------------------------- */
renderChallenges();
