/* BAMBA CLT — interactions */
(function () {
  "use strict";

  /* Sticky header state */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile nav */
  const toggle = document.querySelector(".nav-toggle");
  const panel = document.querySelector(".mobile-panel");
  if (toggle && panel) {
    const close = panel.querySelector(".close");
    toggle.addEventListener("click", () => panel.classList.add("open"));
    close && close.addEventListener("click", () => panel.classList.remove("open"));
    panel.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => panel.classList.remove("open"))
    );
  }

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* Animated counters */
  const counters = document.querySelectorAll("[data-count]");
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = (el.dataset.count.split(".")[1] || "").length;
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";
    const dur = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = (target * eased).toFixed(decimals);
      el.textContent = prefix + v + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window && counters.length) {
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            co.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => co.observe(c));
  }

  /* Growth bars */
  const bars = document.querySelectorAll(".bar[data-h]");
  if ("IntersectionObserver" in window && bars.length) {
    const bo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.height = e.target.dataset.h + "%";
            bo.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    bars.forEach((b) => bo.observe(b));
  }

  /* Contact form (front-end demo) */
  const form = document.getElementById("devis-form");
  if (form) {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const ok = form.querySelector(".form-success");
      if (ok) ok.classList.add("show");
      form.querySelectorAll("input, select, textarea").forEach((f) => {
        if (f.type !== "submit") f.value = "";
      });
      if (ok) ok.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* Footer year */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
