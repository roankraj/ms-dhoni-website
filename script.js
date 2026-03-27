const header = document.querySelector(".header"),
  stickyOffset = header.offsetTop;
window.addEventListener("scroll", () => {
  window.pageYOffset > stickyOffset
    ? header.classList.add("sticky")
    : header.classList.remove("sticky");
});
const navMapping = {
  about: "about",
  trophies: "trophies",
  stats: "stats",
  "contact us": "contact",
};
document.querySelectorAll(".main-nav-link").forEach((t) => {
  t.addEventListener("click", () => {
    const e = t.textContent.toLowerCase().trim(),
      n = navMapping[e];
    if (!n) return;
    const o = document.getElementById(n);
    if (!o) return;
    const s = o.getBoundingClientRect().top + window.pageYOffset,
      a = window.pageYOffset,
      r = s - a;
    let c = null;
    requestAnimationFrame(function t(e) {
      c || (c = e);
      const n = e - c,
        o = Math.min(n / 900, 1),
        s = (i = o) < 0.5 ? 4 * i * i * i : 1 - Math.pow(-2 * i + 2, 3) / 2;
      var i;
      (window.scrollTo(0, a + r * s), o < 1 && requestAnimationFrame(t));
    });
  });
});
const statSection = document.querySelector(".section-stats"),
  statNumbers = document.querySelectorAll(".stat-text-score");
let hasAnimated = !1;
const animateStats = () => {
    statNumbers.forEach((t) => {
      const e = parseInt(t.textContent.replace("+", ""));
      let n = 0;
      const o = Math.ceil(e / 100),
        s = () => {
          ((n += o),
            n >= e
              ? (t.textContent = e + "+")
              : ((t.textContent = n + "+"), requestAnimationFrame(s)));
        };
      s();
    });
  },
  statObserver = new IntersectionObserver(
    (t) => {
      t[0].isIntersecting &&
        !hasAnimated &&
        (statNumbers.forEach((t) => {
          const e = parseInt(t.textContent.replace("+", ""));
          let n = 0;
          const o = Math.ceil(e / 100),
            s = () => {
              ((n += o),
                n >= e
                  ? (t.textContent = e + "+")
                  : ((t.textContent = n + "+"), requestAnimationFrame(s)));
            };
          s();
        }),
        (hasAnimated = !0),
        statObserver.disconnect());
    },
    { threshold: 0.4 },
  );
function centerSections() {
  ["about", "trophies"].forEach((t) => {
    const e = document.getElementById(t);
    if (e) {
      const t = window.innerHeight,
        n = e.offsetHeight,
        o = Math.max((t - n) / 2, 50);
      ((e.style.paddingTop = o + "px"), (e.style.paddingBottom = o + "px"));
    }
  });
}
(statObserver.observe(statSection),
  centerSections(),
  window.addEventListener("resize", centerSections));
const aboutSection = document.querySelector(".section-about"),
  aboutText = aboutSection.querySelector(".about-text-box p"),
  originalText = aboutText.textContent;
((aboutText.innerHTML = ""),
  originalText.split("").forEach((t) => {
    const e = document.createElement("span");
    ((e.textContent = t),
      (e.style.transition = "color 0.3s"),
      (e.style.color = "#555"),
      aboutText.appendChild(e));
  }));
const spans = aboutText.querySelectorAll("span");
let lastColoredIndex = -1;
const aboutObserver = new IntersectionObserver(
  (t) => {
    t[0].isIntersecting &&
      spans.forEach((t, e) => {
        e > lastColoredIndex &&
          setTimeout(
            () => {
              ((t.style.color = "#fff"), (lastColoredIndex = e));
            },
            25 * (e - lastColoredIndex - 1),
          );
      });
  },
  { threshold: 0.3 },
);
aboutObserver.observe(aboutSection);
