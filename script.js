// ================= Sticky Navbar =================
const header = document.querySelector(".header");
const stickyOffset = header.offsetTop;

window.addEventListener("scroll", () => {
  if (window.pageYOffset > stickyOffset) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

// ================= Smooth Scrolling =================
const navMapping = {
  about: "about",
  trophies: "trophies",
  stats: "stats",
  "contact us": "contact",
};

document.querySelectorAll(".main-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const key = link.textContent.toLowerCase().trim();
    const sectionId = navMapping[key];
    if (!sectionId) return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    const targetY = section.getBoundingClientRect().top + window.pageYOffset;

    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const duration = 900;
    let startTime = null;

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animate(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      window.scrollTo(0, startY + distance * ease);
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  });
});

// ================= Stats Counter Animation =================
const statSection = document.querySelector(".section-stats");
const statNumbers = document.querySelectorAll(".stat-text-score");
let hasAnimated = false;

const animateStats = () => {
  statNumbers.forEach((el) => {
    const target = parseInt(el.textContent.replace("+", ""));
    let current = 0;
    const increment = Math.ceil(target / 100);

    const update = () => {
      current += increment;
      if (current >= target) {
        el.textContent = target + "+";
        return;
      }
      el.textContent = current + "+";
      requestAnimationFrame(update);
    };
    update();
  });
};

const statObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !hasAnimated) {
      animateStats();
      hasAnimated = true;
      statObserver.disconnect();
    }
  },
  { threshold: 0.4 },
);
statObserver.observe(statSection);

// ================= Center Sections Vertically =================
function centerSections() {
  ["about", "trophies"].forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      const windowHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;
      const padding = Math.max((windowHeight - sectionHeight) / 2, 50);
      section.style.paddingTop = padding + "px";
      section.style.paddingBottom = padding + "px";
    }
  });
}
centerSections();
window.addEventListener("resize", centerSections);

// ================= About Letter-by-Letter Color Fade =================
const aboutSection = document.querySelector(".section-about");
const aboutText = aboutSection.querySelector(".about-text-box p");

// Split text into spans for each letter
const originalText = aboutText.textContent;
aboutText.innerHTML = "";
originalText.split("").forEach((char) => {
  const span = document.createElement("span");
  span.textContent = char;
  span.style.transition = "color 0.3s";
  span.style.color = "#555"; // initial faded color
  aboutText.appendChild(span);
});

const spans = aboutText.querySelectorAll("span");
let lastColoredIndex = -1; // tracks letters that have already turned #fff

const aboutObserver = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      // Fade in letters one by one at average reading speed
      spans.forEach((span, i) => {
        if (i > lastColoredIndex) {
          // only color letters that haven't been colored yet
          setTimeout(
            () => {
              span.style.color = "#fff";
              lastColoredIndex = i;
            },
            (i - lastColoredIndex - 1) * 25,
          ); // 40ms per letter
        }
      });
    }
    // No need to fade out anymore, letters stay #fff once seen
  },
  { threshold: 0.3 },
);

aboutObserver.observe(aboutSection);
