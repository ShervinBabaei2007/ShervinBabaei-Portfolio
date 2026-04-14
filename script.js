const projects = [
  {
    name: "GitScribe",
    folder: "gitscribe",
    desc: "A CLI tool and web app that auto-generates commit messages from git diffs using AI. Published to PyPI. Built at a hackathon — top 6 of 36 teams.",
    tags: ["React", "TypeScript", "Python", "Auth0", "PyPI"],
  },
  {
    name: "LLM Discord Bot",
    folder: "discord-bot",
    desc: "A Discord bot that connects to a locally hosted LLM via LM Studio. Responds to messages in real time using a Qwen model served on a local API endpoint.",
    tags: ["Python", "discord.py", "LM Studio", "LLM"],
  },
  {
    name: "ThinkBoard",
    folder: "notes-app",
    desc: "A full-stack MERN notes app with a React frontend and Express/MongoDB backend. Features full CRUD, REST API, and a clean component-based architecture.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
  },
  // {
  //   name: "DevJokes",
  //   folder: "devjokes",
  //   desc: "Full-stack joke app with voting, author ownership, and protected delete. Built with TanStack Start, Drizzle ORM, Neon PostgreSQL, and Better Auth.",
  //   tags: ["TanStack", "Drizzle ORM", "PostgreSQL", "Better Auth"],
  // },
  {
    name: "Pinterest Clone",
    folder: "moodjorts",
    desc: "A vanilla JS mood board SPA. Cards are resizable, reorderable, and persist via localStorage. Includes undo/redo, drag-and-drop, and keyboard navigation.",
    tags: ["HTML", "CSS", "JavaScript", "localStorage"],
  },
  {
    name: "Reddit Clone",
    folder: "jeddit",
    desc: "A Tiny-Reddit-like web app with voting, custom ordering, moderator management, and nested comments. Built with Node.js, Express, and EJS.",
    tags: ["Node.js", "Express", "EJS", "JavaScript"],
  },
  {
    name: "Wiki Clone",
    folder: "mini-wiki",
    desc: "A mini Wikipedia-style web app built with Node.js and Express. Features auto-linkification between articles, EJS-rendered pages, and a flat-file data store.",
    tags: ["Node.js", "Express", "EJS", "JavaScript"],
  },
  {
    name: "News Magazine",
    folder: "Magazine",
    desc: "A web application, that was built with HTML, CSS and JavaScript, for browsing football articles",
    tags: ["HTML", "CSS", "JavaScript"],
  },
];

// =====================
// RENDER PROJECT CARDS
// =====================
function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  projects.forEach(function (project, index) {
    const num = String(index + 1).padStart(2, "0");
    const projectPath = "./projects/" + project.folder + "/index.html";

    const card = document.createElement("div");
    card.className = "project-card reveal";

    const tagsHTML = project.tags
      .map(function (tag) {
        return "<span>" + tag + "</span>";
      })
      .join("");

    card.innerHTML =
      "<span class='project-num'>" +
      num +
      "</span>" +
      "<h3 class='project-name'>" +
      project.name +
      "</h3>" +
      "<p class='project-desc'>" +
      project.desc +
      "</p>" +
      "<div class='project-tags'>" +
      tagsHTML +
      "</div>" +
      "<a href='" +
      projectPath +
      "' class='project-link'>View Project</a>";

    grid.appendChild(card);
  });
}

// =====================
// SCROLL REVEAL
// =====================
function setupScrollReveal() {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".reveal").forEach(function (el) {
    observer.observe(el);
  });
}

// =====================
// STICKY NAV STYLE
// =====================
function setupNav() {
  const nav = document.querySelector(".nav");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 60) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
}

// =====================
// ADD REVEAL TO SECTIONS
// =====================
function addRevealToSections() {
  const targets = document.querySelectorAll(
    ".about-heading, .about-text, .about-stack, .projects-heading, .contact-heading, .contact-link",
  );
  targets.forEach(function (el) {
    el.classList.add("reveal");
  });
}

// =====================
// INIT
// =====================
document.addEventListener("DOMContentLoaded", function () {
  renderProjects();
  addRevealToSections();
  setupScrollReveal();
  setupNav();
});
