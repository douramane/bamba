/* BAMBA CLT — interactions */
(function () {
  "use strict";

  /* Photos: prefer local file (assets/img/photos), fall back to CDN if not localized yet */
  var CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_30l04nmCFPVxWFiigwWOAtRGAtC/";
  var PHOTOS = {
    hero: "hf_20260914_111307_7e07cc12-54d3-4e02-a6df-abff505d7205.png",
    construction: "hf_20260914_111307_567fb899-2f92-40a9-840f-721a2737169d.png",
    logistique: "hf_20260914_111306_46f2ee02-3461-4b48-bc27-80a9d1785088.png",
    frigo: "hf_20260914_111307_f0f43e96-3b76-47b7-9a60-c78d41f03d4d.png",
    entrepot: "hf_20260914_111306_fa7984ac-1a23-4e1d-b04a-bda2f7a30f24.png",
    "projet-immeuble": "hf_20260914_111307_76f597a1-5c42-4328-8568-09ff38e2bee3.png",
    "projet-terrassement": "hf_20260914_111307_bedcdac3-7086-46c0-a75e-4b75546eeecf.png",
    "projet-materiaux": "hf_20260914_111307_4e8f4840-adca-4cb1-b230-7978cc58dbd0.png",
    equipe: "hf_20260914_111306_a11ab6ff-2472-4eaa-a999-bc07e6fe52a6.png",
  };
  document.querySelectorAll("[data-photo]").forEach(function (el) {
    var key = el.getAttribute("data-photo");
    if (!PHOTOS[key]) return;
    var local = "assets/img/photos/" + key + ".png";
    var cdn = CDN + PHOTOS[key];
    var probe = new Image();
    probe.onload = function () { apply(local); };
    probe.onerror = function () { apply(cdn); };
    probe.src = local;
    function apply(url) {
      if (el.tagName === "IMG") { el.src = url; }
      else { el.style.backgroundImage = "url('" + url + "')"; el.classList.add("has-photo"); }
    }
  });

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

  /* Skill bars (why choose us) */
  const fills = document.querySelectorAll(".fill[data-w]");
  if ("IntersectionObserver" in window && fills.length) {
    const fo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.width = e.target.dataset.w + "%";
            fo.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    fills.forEach((f) => fo.observe(f));
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
