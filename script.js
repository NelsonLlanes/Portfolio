// Helpers
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* Mobile menu */
const toggleBtn = $(".nav-toggle");
const menu = $("[data-menu]");

if (toggleBtn && menu) {
  toggleBtn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });

  // Close on link click (mobile)
  $$(".nav-link, .btn", menu).forEach((a) => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* Active nav link on scroll */
const sections = ["about", "skills", "projects", "contact"].map((id) => $("#" + id)).filter(Boolean);
const links = $$(".nav-link");

const setActive = (id) => {
  links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === `#${id}`));
};

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) setActive(e.target.id);
    });
  },
  { root: null, threshold: 0.35 }
);

sections.forEach((s) => io.observe(s));

/* Fake form submit (replace with real backend later) */
const form = $("#contactForm");
const note = $("#formNote");

if (form) {
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (note) note.textContent = "Message sent (demo). Hook this to a backend later.";
    form.reset();
  });
}

/* Footer year */
const year = $("#year");
if (year) year.textContent = new Date().getFullYear();
