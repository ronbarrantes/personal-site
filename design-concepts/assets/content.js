/*
 * Shared content for every concept, lifted from frontend/src/data/text.ts
 * and frontend/content/blog. Concepts only decide how it looks.
 * Copy marked DRAFT is new positioning copy — edit freely.
 */
window.RON = {
  name: "Ron Barrantes",
  first: "Ron",
  last: "Barrantes",
  domain: "ronb.co",
  role: "UI engineer & product builder",

  // DRAFT: new positioning — portfolio + business, not a resume
  headline: "I build calm, accessible web products that people actually enjoy using.",
  pitch:
    "Engineer with a designer's eye. Six years shipping React and TypeScript at places like Microsoft and early-stage startups. Now building PaperKoi and open to jobs, contracts, and people who want to make something together.",
  availability: "Open to roles, contracts & collaborations",

  about: [
    "I am an Engineer with a strong eye for design, an insatiable curiosity, and a passion for learning and personal growth.",
    "I have 6 years of development experience, 8 years working with JavaScript and Node, 5 years working with TypeScript, and over 10 years working in various aspects of tech.",
    "I love how the industry is constantly evolving. I want to build products that have an impact for good, that move the industry forward, and that bring people together.",
    "In my personal life, I am a coffee-drinking tech nerd who loves cooking and traveling. In 2024 my family and I lived in Costa Rica trying out the nomad life. In a former life I was a salsa and bachata dance instructor.",
  ],

  // DRAFT: what someone gets from working with Ron (for teams hiring AND people with a project)
  services: [
    { title: "Frontend engineering", body: "I join your team, full-time or on contract, and ship React, Next.js and TypeScript interfaces that are fast, tested, and easy for the next person to pick up." },
    { title: "Accessible by default", body: "Keyboard, screen reader and contrast issues caught early and fixed properly. I did this work on Azure, across every language Microsoft supports." },
    { title: "From idea to launch", body: "Got an idea? I'll take it to a working product with auth, data, payments and deploys, designed so it doesn't look like a template." },
    { title: "Design and code, one person", body: "I was a designer for ten years before I wrote code. I go from Figma to pull request without losing anything in between." },
  ],

  // DRAFT: one consistent voice for section headings + subtitles
  sections: {
    now: { title: "Now", sub: "What I'm working on this month." },
    services: { title: "What I bring", sub: "Whether you need another engineer on the team or someone to build your idea with." },
    work: { title: "Experience", sub: "Where I've worked, from design studios to Microsoft." },
    projects: { title: "Projects", sub: "Things I've built for work, for family, and for fun." },
    writing: { title: "Writing", sub: "Notes from what I'm learning, written for me, shared for you." },
    contact: { title: "Let's work together", sub: "Hiring, or have a project in mind? I'd like to hear about it." },
  },

  marquee: [
    "Ships code", "Technology seeker", "hjkl pilot", "Dances salsa", "Fixes things live",
    "Chronic tab opener", "Builds interfaces", "Esc athlete", "Travels light", "Arch btw",
    "Home barista", "Tiles with intent", "Dotfile alchemist", "Makes divs behave",
  ],

  // Sample data — real site pulls these from the API (keep a cold-start loading state)
  now: [
    { title: "Building PaperKoi", desc: "Document requests for bookkeepers and tax firms. Deep in upload flows and reminder emails.", date: "2026-09-18" },
    { title: "Learning Go & C", desc: "Writing my notes up as blog posts so future me (and you) can skip the confusing parts.", date: "2026-09-02" },
    { title: "Looking for my next thing", desc: "A team to join, a client to help, or a partner to start something with.", date: "2026-08-21" },
  ],

  work: [
    {
      employer: "Virewirx", url: "https://virewirx.com", start: "7/2023", end: "10/2024", title: "UI Engineer",
      summary: "Built the dashboard that coordinates VR headsets, servers and apps for multi-user VR — with real-time status for every device.",
      points: [
        "Designed and built the internal dashboard coordinating VR headsets, servers, and applications with real-time device status.",
        "Created a configuration server that generates configs per headset or server type.",
        "Built a logging server collecting info and error logs from the dashboard.",
      ],
      tools: ["react", "typescript", "tailwind", "python", "jira", "golang", "git"],
    },
    {
      employer: "VeroSkills", url: "https://veroskills.com", start: "6/2022", end: "3/2023", title: "Staff Software Engineer",
      summary: "Helped create and launch a learning, tutoring and recruiting platform that takes students from beginner to hired.",
      points: [
        "Part of the creation and initial launch of the VeroSkills platform.",
        "Implemented frontend, backend, and full-stack features with Next.js.",
        "Brainstormed and workshopped new features and improvements.",
      ],
      tools: ["nextjs", "react", "typescript", "planetscale", "trpc", "mysql", "retool", "vercel", "stripe", "turborepo", "github", "git"],
    },
    {
      employer: "Microsoft", url: "https://azure.microsoft.com", start: "3/2022", end: "6/2022", title: "Software Engineer (Contract)",
      summary: "Migrated Azure's Search-as-a-Service from KnockoutJS to React with FluentUI — localized and accessible.",
      points: [
        "Migrated Azure Search as a Service from KnockoutJS to React using FluentUI.",
        "Created reusable components and utilities used across the SaaS blades.",
        "Ensured components were localized for every supported language and accessibility compliant.",
      ],
      tools: ["react", "typescript", "azure", "jest", "github", "git"],
    },
    {
      employer: "Microsoft", url: "https://azure.microsoft.com", start: "4/2020", end: "1/2021", title: "Software Engineer (Contract)",
      summary: "Worked on Azure's first migration from KnockoutJS to React and on testing for Compute, Service Fabric and Containers.",
      points: [
        "Worked on Azure's initial migration from KnockoutJS to React.",
        "Tested Compute, Service Fabric, and Containers during the move to MochaJS and PortalFx.",
        "Contributed to Azure PortalFx, the library for testing blades, controllers, and components.",
      ],
      tools: ["react", "mochajs", "typescript", "selenium", "azure", "github", "git"],
    },
    {
      employer: "Protalabs", url: "https://protaventures.com", start: "9/2018", end: "4/2019", title: "Software Developer Intern",
      summary: "Contributed to Quoted, a social app for families, built in React Native and Rails.",
      points: [
        "Contributed to Quoted, a social media application for families.",
        "React Native + Redux frontend, Ruby on Rails backend.",
      ],
      tools: ["reactnative", "redux", "javascript", "jest", "rails", "postgresql", "redis", "github", "git"],
    },
    {
      employer: "Freelance", start: "1/2009", end: "6/2017", title: "Web & Graphic Designer",
      summary: "Eight years of websites, WordPress themes, posters, business cards and merch for small businesses.",
      points: [
        "HTML/CSS/JavaScript websites; setting up, theming, and managing WordPress sites.",
        "Print work from business cards to event posters, plus merch like T-shirts and leggings.",
      ],
      tools: ["html", "css", "javascript", "illustrator", "photoshop", "indesign", "premierepro", "wordpress", "github", "git"],
    },
  ],

  projects: [
    {
      name: "PaperKoi", status: "In progress", href: "https://paperkoi.com", tag: "SaaS",
      blurb: "A cleaner way for bookkeepers, tax pros and admin-heavy firms to request, collect and organize client documents — no more chasing files across email.",
      tools: ["nextjs", "react", "typescript", "tailwind", "convex", "clerk", "shadcn", "vercel", "git"],
    },
    {
      name: "Easy Civics", status: "Live", href: "https://civics.ronb.co/", github: "https://github.com/ronbarrantes/easy-civics", tag: "For family",
      blurb: "Practice for the U.S. citizenship exam: 10 of the 100 official questions, multiple choice, with review screens so it never feels like a giant study packet.",
      tools: ["nextjs", "typescript", "tailwind", "vercel", "postgresql", "github", "git"],
    },
    {
      name: "Matching Game", status: "Live", href: "https://match.ronb.co/", github: "https://github.com/ronbarrantes/guessing-game", tag: "For my kid",
      blurb: "A simple matching game I made for my 4-year-old son. He really enjoys playing it.",
      tools: ["react", "typescript", "tailwind", "vite", "vercel", "github", "git"],
    },
    {
      name: "Game of Life", status: "Live", href: "https://game-of-life.ronb.co/", github: "https://github.com/ronbarrantes/guessing-game", tag: "Experiment",
      blurb: "An interpretation of Conway's classic Game of Life, built with good old React, TypeScript and Tailwind.",
      tools: ["react", "typescript", "tailwind", "vercel", "github", "git"],
    },
  ],

  posts: [
    { title: "Go Concurrency and Real Programs", desc: "Goroutines, channels, context, HTTP handlers, graceful shutdown, and real backend habits.", date: "2026-06-02", tags: ["Go", "backend"], mins: 14 },
    { title: "Basics of Go", desc: "A practical Go study guide: packages, modules, types, structs, interfaces, errors, JSON, HTTP, and tests.", date: "2026-06-01", tags: ["Go", "learning"], mins: 18 },
    { title: "C Foundation Next Steps", desc: "The missing second pass: files, errors, safer strings, headers, Makefiles, debugging, and practice.", date: "2026-05-15", tags: ["C", "learning"], mins: 12 },
    { title: "Basics of C", desc: "Rough notes from learning C: compiling, types, memory, pointers, structs, and the preprocessor.", date: "2026-05-01", tags: ["C", "learning"], mins: 16 },
  ],

  links: [
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/ronbarrantes" },
    { label: "GitHub", icon: "github", href: "https://github.com/ronbarrantes" },
    { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/ronbarrantes" },
  ],
  email: "ronbarrantes@gmail.com",
};

/* ---------- tiny helpers shared by concepts ---------- */
(function () {
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const svg = (key, cls = "") => {
    const i = window.TECH_ICONS[key];
    if (!i) return "";
    return `<svg class="${cls}" viewBox="${i.vb}" aria-hidden="true" focusable="false" fill="currentColor">${i.d
      .map((d) => `<path d="${d}"/>`)
      .join("")}</svg>`;
  };

  /* Accessible tech badge: labelled image for AT, visible tooltip on hover via [data-label]. */
  const tech = (key, cls = "tech") => {
    const i = window.TECH_ICONS[key];
    if (!i) return "";
    return `<li class="${cls}" style="--brand:${i.hex}" data-label="${esc(i.label)}"><span class="sr-only">${esc(i.label)}</span>${svg(key)}</li>`;
  };

  const techList = (keys, cls = "tech-list", itemCls = "tech") =>
    `<ul class="${cls}" aria-label="Tools used">${keys.map((k) => tech(k, itemCls)).join("")}</ul>`;

  const fmtDate = (iso, opts = { month: "short", day: "numeric", year: "numeric" }) =>
    new Date(iso + "T12:00:00").toLocaleDateString("en-US", opts);

  const monthYear = (mmYYYY) => {
    const [m, y] = mmYYYY.split("/");
    return new Date(+y, +m - 1, 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };
  const isoMonth = (mmYYYY) => {
    const [m, y] = mmYYYY.split("/");
    return `${y}-${m.padStart(2, "0")}`;
  };
  const year = (mmYYYY) => mmYYYY.split("/")[1];

  const mailto = (subject) => `mailto:${window.RON.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

  const render = (sel, html) => document.querySelectorAll(sel).forEach((el) => (el.innerHTML = html));

  Object.assign(window.RON, { esc, svg, tech, techList, fmtDate, monthYear, isoMonth, year, mailto, render });
})();
