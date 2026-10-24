/* ==========================================================
   TECHBRIDGE INTERNSHIP ROADMAP
   Switches between the Data Analytics and Web Development
   tracks without refreshing the page.
   ========================================================== */


/* ----------------------------------------------------------
   1. ARRAYS AND OBJECTS
   "tracks" is an ARRAY holding two track OBJECTS.
   Each track has a "tasks" ARRAY, and each task is an OBJECT.
   ---------------------------------------------------------- */
const tracks = [
  {
    id: "data-analytics",
    name: "Data Analytics",
    tagline: "Working with data and extracting insights",
    tasks: [
      {
        number: 1,
        title: "Data Cleaning Basics",
        day: 1,
        description: "Clean a messy dataset using Google Sheets or Excel. Identify and fix duplicate rows, blank cells, inconsistent formatting, and incorrect data types.",
        difficulty: "Beginner"
      },
      {
        number: 2,
        title: "Formulas & Pivot Tables",
        day: 4,
        description: "Use spreadsheet formulas and Pivot Tables to answer questions and extract useful insights from a dataset.",
        difficulty: "Beginner"
      },
      {
        number: 3,
        title: "Data Visualization",
        day: 8,
        description: "Create charts and a simple dashboard that communicate useful insights from a dataset.",
        difficulty: "Beginner → Intermediate"
      },
      {
        number: 4,
        title: "Introduction to SQL",
        day: 11,
        description: "Practice basic SQL queries and use them to answer real-world questions about data.",
        difficulty: "Beginner → Intermediate"
      },
      {
        number: 5,
        title: "SQL Joins & Aggregations",
        day: 15,
        description: "Use JOIN, GROUP BY and aggregate functions such as COUNT, SUM and AVG to analyze information across multiple tables.",
        difficulty: "Intermediate"
      },
      {
        number: 6,
        title: "Lookup Functions & Data Wrangling",
        day: 19,
        description: "Use VLOOKUP or XLOOKUP to combine related datasets and handle data mismatches.",
        difficulty: "Intermediate"
      },
      {
        number: 7,
        title: "Mini Analysis Project",
        day: 22,
        description: "Complete a small end-to-end analysis involving data cleaning, formulas, Pivot Tables, charts and recommendations.",
        difficulty: "Intermediate"
      },
      {
        number: 8,
        title: "Capstone Project",
        day: 26,
        description: "Complete a larger project combining spreadsheet analysis and SQL using at least two related tables.",
        difficulty: "Intermediate"
      }
    ]
  },
  {
    id: "web-development",
    name: "Web Development",
    tagline: "Designing and building websites and web applications",
    tasks: [
      {
        number: 1,
        title: "Build the TechBridge Homepage",
        day: 1,
        description: "Create the first version of the TechBridge website using HTML and CSS.",
        difficulty: "Beginner"
      },
      {
        number: 2,
        title: "Build the TechBridge Programs Experience",
        day: 4,
        description: "Create a Programs experience presenting TechBridge's available learning programs.",
        difficulty: "Beginner"
      },
      {
        number: 3,
        title: "Build the Internship Tasks Experience",
        day: 8,
        description: "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey.",
        difficulty: "Beginner → Intermediate"
      },
      {
        number: 4,
        title: "Build an Interactive Internship Roadmap",
        day: 11,
        description: "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks.",
        difficulty: "Beginner → Intermediate"
      },
      {
        number: 5,
        title: "Build the Intern Registration Experience",
        day: 15,
        description: "Create a professional registration and onboarding interface for TechBridge interns.",
        difficulty: "Intermediate"
      },
      {
        number: 6,
        title: "Build the Task Submission System",
        day: 19,
        description: "Create an interface through which interns can prepare and submit their task work.",
        difficulty: "Intermediate"
      },
      {
        number: 7,
        title: "Build the Intern Dashboard",
        day: 22,
        description: "Create a dashboard where an intern can view their profile, progress, tasks and submissions.",
        difficulty: "Intermediate"
      },
      {
        number: 8,
        title: "Build the Complete TechBridge Internship Platform",
        day: 26,
        description: "Combine the different components created during the internship into a complete TechBridge platform.",
        difficulty: "Intermediate"
      }
    ]
  }
];


/* ----------------------------------------------------------
   2. VARIABLES
   Page elements we need, and the track currently selected.
   ---------------------------------------------------------- */
let currentTrackId = "data-analytics";   // changes when the visitor clicks a button

const trackButtons = document.querySelectorAll(".track-btn");
const timelineEl   = document.getElementById("timeline");
const trackNameEl  = document.getElementById("current-track");
const taglineEl    = document.getElementById("track-tagline");


/* ----------------------------------------------------------
   3. FUNCTIONS
   ---------------------------------------------------------- */

// CONDITIONAL LOGIC: choose the CSS class that fills the right number of bars
function getLevelClass(difficulty) {
  if (difficulty === "Beginner") {
    return "lvl-1";
  } else if (difficulty === "Beginner → Intermediate") {
    return "lvl-2";
  } else {
    return "lvl-3";
  }
}

// Build the HTML for ONE task card from a task object
function buildTaskCard(task, index) {
  const levelClass = getLevelClass(task.difficulty);

  return `
    <li class="t-item" style="animation-delay: ${index * 60}ms">
      <div class="t-day"><span>Day</span><strong>${task.day}</strong></div>
      <article class="t-card">
        <p class="t-num">Task ${task.number}</p>
        <h3>${task.title}</h3>
        <span class="level ${levelClass}">
          <span class="bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
          ${task.difficulty}
        </span>
        <p>${task.description}</p>
      </article>
    </li>
  `;
}

// Show the selected track: this is the main function
function showTrack(trackId) {
  // Find the track object whose id matches
  const track = tracks.find(function (t) {
    return t.id === trackId;
  });

  // If no track matches, stop (safety check)
  if (!track) {
    return;
  }

  currentTrackId = trackId;

  // DOM MANIPULATION: update the text on the page
  trackNameEl.textContent = track.name;
  taglineEl.textContent = track.tagline;

  // Turn every task object into a card, then put all cards in the timeline
  timelineEl.innerHTML = track.tasks.map(buildTaskCard).join("");

  // Mark the active button (the CSS styles aria-pressed="true")
  trackButtons.forEach(function (button) {
    if (button.dataset.track === trackId) {
      button.setAttribute("aria-pressed", "true");
    } else {
      button.setAttribute("aria-pressed", "false");
    }
  });
}


/* ----------------------------------------------------------
   4. EVENT LISTENERS
   Run showTrack() whenever a track button is clicked.
   ---------------------------------------------------------- */
trackButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    showTrack(button.dataset.track);
  });
});


/* ----------------------------------------------------------
   5. START THE PAGE
   Open on the track in the link (roadmap.html#web-development),
   otherwise open on Data Analytics.
   ---------------------------------------------------------- */
const hashId = window.location.hash.replace("#", "");
const hashIsATrack = tracks.some(function (t) {
  return t.id === hashId;
});

if (hashIsATrack) {
  showTrack(hashId);
} else {
  showTrack(currentTrackId);
}
