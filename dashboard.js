/* ==========================================================
   TECHBRIDGE INTERN DASHBOARD

   The big idea (used all through this file):
     1. DATA   : the tasks live in an array of objects.
     2. STATE  : variables remember what is happening
                 (task statuses, selected filter).
     3. RENDER : functions draw the page from the data.
     4. EVENTS : clicks change the data, then we draw again.
   Because everything is drawn from the same data, the
   cards, counts and progress bar can never disagree.
   ========================================================== */


/* ----------------------------------------------------------
   1. DATA
   ---------------------------------------------------------- */

// A sample intern. Change these two values to personalise the page.
const intern = {
  name: "Muhammad",
  track: "Web Development"
};

// The three possible statuses and the words shown for each
const statusLabels = {
  "completed": "Completed",
  "in-progress": "In Progress...",
  "not-started": "Not Started"
};

// The 8 internship tasks. Tasks 7 and 8 are placeholders:
// update them when you get those task briefs.
const defaultTasks = [
  {
    number: 1,
    title: "Build the TechBridge Homepage",
    day: 1,
    description: "Create the first version of the TechBridge website using HTML and CSS.",
    details: "Plan the layout and build the TechBridge homepage with a header, introduction, programs, internship details, application and community links, and a footer that works on desktop, tablet and mobile.",
    tools: ["HTML5", "CSS3", "GitHub Pages"],
    status: "completed"
  },
  {
    number: 2,
    title: "Build the TechBridge Programs Experience",
    day: 4,
    description: "Present Data Analytics and Web Development on a dedicated Programs page.",
    details: "Build a Programs page that explains both programs, shows the skills for each and gives visitors a clear way to apply.",
    tools: ["HTML5", "CSS3"],
    status: "completed"
  },
  {
    number: 3,
    title: "Build the Internship Tasks Experience",
    day: 8,
    description: "Present the 8-task internship journey as a clear, responsive timeline.",
    details: "Show all 8 tasks with their days and difficulty so a visitor can understand the whole internship journey.",
    tools: ["HTML5", "CSS3"],
    status: "completed"
  },
  {
    number: 4,
    title: "Build an Interactive Internship Roadmap",
    day: 11,
    description: "Use JavaScript to switch between the Data Analytics and Web Development tracks.",
    details: "Store each track's tasks in arrays of objects, then use event listeners and DOM manipulation to show the selected track without refreshing the page.",
    tools: ["HTML5", "CSS3", "JavaScript"],
    status: "completed"
  },
  {
    number: 5,
    title: "Build the TechBridge Challenge Hub",
    day: 15,
    description: "Build an interactive hub where visitors browse and filter practical challenges.",
    details: "Create challenge cards, track and difficulty filters, and a details pop-up that opens without leaving the page.",
    tools: ["HTML5", "CSS3", "JavaScript"],
    status: "completed"
  },
  {
    number: 6,
    title: "Build the Intern Dashboard",
    day: 19,
    description: "Build this dashboard to track progress, tasks, challenges and web technologies.",
    details: "Generate the task tracker from JavaScript data, update the progress bar when tasks are completed, filter tasks by status and explore modern web technologies.",
    tools: ["HTML5", "CSS3", "JavaScript"],
    status: "in-progress"
  },
  {
    number: 7,
    title: "Build the Task Submission System",
    day: 22,
    description: "Create an interface through which interns can prepare and submit their task work.",
    details: "Design a submission interface where an intern can prepare and submit the work for a task.",
    tools: ["HTML5", "CSS3", "JavaScript"],
    status: "not-started"
  },
  {
    number: 8,
    title: "Build the Complete TechBridge Internship Platform",
    day: 26,
    description: "Combine the components created during the internship into a complete platform.",
    details: "Bring the pages and features from the earlier tasks together into one complete, consistent TechBridge platform.",
    tools: ["HTML5", "CSS3", "JavaScript"],
    status: "not-started"
  }
];

// Modern Web Technologies (used by the Technology Explorer)
const technologies = [
  {
    id: "nextjs",
    name: "Next.js",
    tagline: "A React framework for modern web applications",
    description: "Next.js is built on top of React. It adds features a real website needs out of the box, such as page routing, fast page loading and the ability to prepare pages on the server.",
    usedFor: [
      "Marketing sites and blogs that need to load fast",
      "Online stores",
      "Full web applications and dashboards"
    ],
    learnMore: "https://nextjs.org"
  },
  {
    id: "vue",
    name: "Vue.js",
    tagline: "An approachable JavaScript framework for user interfaces",
    description: "Vue.js helps developers build interactive interfaces. It is known for being beginner-friendly: you can add a little Vue to a page, or grow it into a full application.",
    usedFor: [
      "Interactive interfaces such as forms, dashboards and widgets",
      "Single-page applications",
      "Adding interactivity to an existing website"
    ],
    learnMore: "https://vuejs.org"
  },
  {
    id: "angular",
    name: "Angular",
    tagline: "A complete framework for large web applications",
    description: "Angular is a framework maintained by Google. It uses TypeScript and includes routing, forms and tools for working with data, which gives big projects a clear, consistent structure.",
    usedFor: [
      "Large business and enterprise applications",
      "Complex dashboards and admin systems",
      "Projects with big teams that need a shared structure"
    ],
    learnMore: "https://angular.dev"
  },
  {
    id: "backend",
    name: "Backend Development",
    tagline: "The server side of a web platform",
    description: "Backend development is the work that happens on the server, out of sight of the visitor. The frontend (what you see in the browser) sends requests to the backend, usually through an API. The backend works with the database and sends back the data the frontend needs to display.",
    usedFor: [
      "Saving and loading data from a database",
      "Signing users in and protecting their information",
      "Sending the frontend the data it needs, often as JSON"
    ],
    extras: [
      { name: "Node.js", note: "Runs JavaScript on the server" },
      { name: "Express.js", note: "A lightweight framework for building servers and APIs with Node.js" },
      { name: "Django", note: "A Python framework with many built-in features" },
      { name: "Flask", note: "A small, flexible Python framework" },
      { name: "Laravel", note: "A popular PHP framework" },
      { name: ".NET", note: "Microsoft's platform, commonly used with C#" }
    ],
    learnMore: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps"
  }
];


/* ----------------------------------------------------------
   2. VARIABLES (state) AND PAGE ELEMENTS
   ---------------------------------------------------------- */

// "tasks" is the working copy. Its statuses change as the intern
// completes tasks. "defaultTasks" stays untouched so Reset works.
const tasks = defaultTasks.map(function (task) {
  return { ...task };
});

let currentFilter = "all";                       // which status filter is selected
const STORAGE_KEY = "techbridge-dashboard-progress";

const els = {
  statusPill:  document.getElementById("status-pill"),
  internName:  document.getElementById("intern-name"),
  internTrack: document.getElementById("intern-track"),
  currentTask: document.getElementById("current-task-text"),
  completed:   document.getElementById("completed-count"),
  total:       document.getElementById("total-count"),
  bar:         document.getElementById("progress-bar"),
  fill:        document.getElementById("progress-fill"),
  percent:     document.getElementById("percent"),
  remaining:   document.getElementById("remaining-text"),
  message:     document.getElementById("progress-message"),
  grid:        document.getElementById("task-grid"),
  noTasks:     document.getElementById("no-tasks"),
  taskCount:   document.getElementById("task-count"),
  resetBtn:    document.getElementById("reset-progress"),
  filterBtns:  document.querySelectorAll("#tasks .chip-btn"),
  techBtns:    document.querySelectorAll("#technologies .chip-btn"),
  techPanel:   document.getElementById("tech-panel"),
  dialog:      document.getElementById("task-dialog"),
  dialogBody:  document.getElementById("dialog-body"),
  dialogClose: document.getElementById("dialog-close")
};


/* ----------------------------------------------------------
   3. SAVING AND LOADING (Local Storage)
   Local Storage keeps the statuses in the browser, so progress
   is still there after a refresh. try/catch stops the page from
   breaking if the browser blocks storage.
   ---------------------------------------------------------- */
function saveProgress() {
  try {
    const statuses = tasks.map(function (task) { return task.status; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
  } catch (error) {
    // Storage not available: the dashboard still works, it just won't remember.
  }
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (Array.isArray(saved) && saved.length === tasks.length) {
      tasks.forEach(function (task, index) {
        if (statusLabels.hasOwnProperty(saved[index])) {
          task.status = saved[index];
        }
      });
    }
  } catch (error) {
    // Nothing saved yet, or the data was unreadable: keep the defaults.
  }
}


/* ----------------------------------------------------------
   4. PROGRESS CALCULATIONS
   ---------------------------------------------------------- */
function calculateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(function (task) {
    return task.status === "completed";
  }).length;
  const remaining = total - completed;
  const percent = Math.round((completed / total) * 1000) / 10;   // 3/8 gives 37.5

  return { total: total, completed: completed, remaining: remaining, percent: percent };
}

// CONDITIONAL LOGIC: work out the overall internship status
function getInternshipStatus(progress) {
  const hasTaskInProgress = tasks.some(function (task) {
    return task.status === "in-progress";
  });

  if (progress.completed === progress.total) {
    return "Completed";
  } else if (progress.completed === 0 && !hasTaskInProgress) {
    return "Not Started";
  } else {
    return "In Progress";
  }
}

// When a task is finished and nothing is "In Progress",
// the next "Not Started" task becomes the current task.
function ensureCurrentTask() {
  const hasTaskInProgress = tasks.some(function (task) {
    return task.status === "in-progress";
  });

  if (!hasTaskInProgress) {
    const next = tasks.find(function (task) {
      return task.status === "not-started";
    });
    if (next) {
      next.status = "in-progress";
    }
  }
}


/* ----------------------------------------------------------
   5. RENDER FUNCTIONS (draw the page from the data)
   ---------------------------------------------------------- */

function renderWelcome(progress) {
  els.internName.textContent = intern.name;
  els.internTrack.textContent = intern.track;
  els.statusPill.textContent = "Internship Status: " + getInternshipStatus(progress);

  const current = tasks.find(function (task) {
    return task.status === "in-progress";
  });

  if (current) {
    els.currentTask.textContent = "Current task: Task " + current.number + " - " + current.title;
  } else if (progress.completed === progress.total) {
    els.currentTask.textContent = "All tasks completed.";
  } else {
    els.currentTask.textContent = "";
  }
}

function renderProgress(progress) {
  els.completed.textContent = progress.completed;
  els.total.textContent = progress.total;
  els.percent.textContent = progress.percent + "%";
  els.fill.style.width = progress.percent + "%";
  els.bar.setAttribute("aria-valuenow", progress.percent);

  if (progress.remaining === 1) {
    els.remaining.textContent = "1 Task Remaining";
  } else {
    els.remaining.textContent = progress.remaining + " Tasks Remaining";
  }

  if (progress.completed === progress.total) {
    els.message.textContent = "Congratulations! You have completed all 8 internship tasks.";
  } else {
    els.message.textContent = "";
  }
}

// Builds the HTML for ONE task card
function buildTaskCard(task) {
  // Completed tasks don't need a "Mark as Completed" button
  let completeButton = "";
  if (task.status !== "completed") {
    completeButton = `<button type="button" class="btn btn-accent btn-sm" data-action="complete" data-number="${task.number}">Mark as Completed</button>`;
  }

  return `
    <article class="d-card status-${task.status}">
      <p class="num">Task ${task.number} &middot; Day ${task.day}</p>
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p class="status-badge badge-${task.status}">${statusLabels[task.status]}</p>
      <div class="card-actions">
        <button type="button" class="btn btn-ghost btn-sm" data-action="view" data-number="${task.number}">View Task</button>
        ${completeButton}
      </div>
    </article>`;
}

// Draws the task cards that match the selected filter
function renderTasks() {
  let visible = tasks;

  if (currentFilter !== "all") {
    visible = tasks.filter(function (task) {
      return task.status === currentFilter;
    });
  }

  els.grid.innerHTML = visible.map(buildTaskCard).join("");
  els.taskCount.textContent = "Showing " + visible.length + " of " + tasks.length + " tasks";
  els.noTasks.hidden = visible.length !== 0;

  els.filterBtns.forEach(function (button) {
    button.setAttribute("aria-pressed", button.dataset.value === currentFilter ? "true" : "false");
  });
}

// Redraw everything that depends on the task data
function renderAll() {
  const progress = calculateProgress();
  renderWelcome(progress);
  renderProgress(progress);
  renderTasks();
}


/* ----------------------------------------------------------
   6. ACTIONS (things the user can do)
   ---------------------------------------------------------- */

function completeTask(number) {
  const task = tasks.find(function (t) {
    return t.number === number;
  });

  if (!task) {
    return;
  }

  task.status = "completed";     // 1. change the data
  ensureCurrentTask();           // 2. keep a current task going
  saveProgress();                // 3. remember it
  renderAll();                   // 4. redraw the page
}

function openTask(number) {
  const task = tasks.find(function (t) {
    return t.number === number;
  });

  if (!task) {
    return;
  }

  const toolChips = task.tools.map(function (tool) {
    return "<li>" + tool + "</li>";
  }).join("");

  els.dialogBody.innerHTML = `
    <p class="status-badge badge-${task.status}">${statusLabels[task.status]}</p>
    <h2 id="dialog-title">Task ${task.number}: ${task.title}</h2>
    <h4>Starts on</h4>
    <p>Day ${task.day} of the 30-day internship</p>
    <h4>What you will build</h4>
    <p>${task.details}</p>
    <h4>Tools</h4>
    <ul class="skill-list">${toolChips}</ul>
  `;

  els.dialog.showModal();
}

function resetProgress() {
  defaultTasks.forEach(function (original, index) {
    tasks[index].status = original.status;
  });
  currentFilter = "all";
  saveProgress();
  renderAll();
}

// Technology Explorer: show one technology's information
function showTech(id) {
  const tech = technologies.find(function (t) {
    return t.id === id;
  });

  if (!tech) {
    return;
  }

  const usedForList = tech.usedFor.map(function (item) {
    return "<li>" + item + "</li>";
  }).join("");

  // Only the Backend entry has "extras" (a list of backend technologies)
  let extrasHtml = "";
  if (tech.extras) {
    const items = tech.extras.map(function (extra) {
      return "<li><strong>" + extra.name + "</strong>: " + extra.note + "</li>";
    }).join("");
    extrasHtml = "<h4>Popular backend technologies</h4><ul class=\"plain\">" + items + "</ul>";
  }

  els.techPanel.innerHTML = `
    <h3>${tech.name}</h3>
    <p class="tech-tagline">${tech.tagline}</p>
    <p>${tech.description}</p>
    <h4>Commonly used for</h4>
    <ul class="plain">${usedForList}</ul>
    ${extrasHtml}
    <a href="${tech.learnMore}" class="btn btn-primary btn-sm" target="_blank" rel="noopener">Learn More</a>
  `;

  els.techBtns.forEach(function (button) {
    button.setAttribute("aria-pressed", button.dataset.tech === id ? "true" : "false");
  });
}


/* ----------------------------------------------------------
   7. EVENT LISTENERS
   ---------------------------------------------------------- */

// Status filter buttons
els.filterBtns.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.value;
    renderTasks();
  });
});

// Task card buttons. The cards are created by JavaScript, so we listen on the
// grid and check which button was clicked (event delegation).
els.grid.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  const number = Number(button.dataset.number);

  if (button.dataset.action === "complete") {
    completeTask(number);
  } else if (button.dataset.action === "view") {
    openTask(number);
  }
});

els.resetBtn.addEventListener("click", resetProgress);

// Technology buttons
els.techBtns.forEach(function (button) {
  button.addEventListener("click", function () {
    showTech(button.dataset.tech);
  });
});

// Close the pop-up with the X or by clicking the dark background
els.dialogClose.addEventListener("click", function () {
  els.dialog.close();
});
els.dialog.addEventListener("click", function (event) {
  if (event.target === els.dialog) {
    els.dialog.close();
  }
});


/* ----------------------------------------------------------
   8. START THE PAGE
   ---------------------------------------------------------- */
loadProgress();        // restore saved progress, if any
ensureCurrentTask();   // make sure one task is marked as current
renderAll();
showTech("nextjs");
