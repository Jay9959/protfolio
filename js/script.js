// Preloader Logic
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
        preloader.classList.add("loaded");
    }, 500); // Small delay for smooth effect
});

// Typing Animation
var typed = new Typed(".typing", {
    strings: ["Frontend Developer", "Backend Developer", "AI/ML Developer"],
    typeSpeed: 80,
    backSpeed: 40,
    loop: true,
});

// Scroll Interactions (Progress Bar & To Top)
const topProgress = document.getElementById("progress-bar");
const scrollToTopBtn = document.getElementById("scroll-to-top");

window.addEventListener("scroll", () => {
    // 1. Progress Bar Update
    let totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    let progress = (window.pageYOffset / totalHeight) * 100;
    topProgress.style.width = progress + "%";

    // 2. Scroll-to-Top Button Show/Hide
    if (window.pageYOffset > 500) {
        scrollToTopBtn.style.display = "flex";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});

// Scroll to Top Logic
scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Intersection Observer for Section Reveal
const observeSections = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");

            // Link Highlighting
            let sectionId = entry.target.getAttribute("id");
            document.querySelectorAll(".nav li a").forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + sectionId) {
                    link.classList.add("active");
                }
            });
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".section").forEach(s => observeSections.observe(s));

// --- BEST MA BEST CUSTOM CURSOR (MAGNETIC & TRAILING) ---
const cursor = document.querySelector(".cursor");
const cursorInner = document.querySelector(".cursor-inner");

let mouseX = 0, mouseY = 0; // Target position
let cursorX = 0, cursorY = 0; // Current smooth position
let innerX = 0, innerY = 0; // Inner dot smooth position

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // 1. Smoothly follow mouse (Lerp)
    // Outer circle trails more (0.1)
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;

    // Inner dot follows closer (0.2)
    innerX += (mouseX - innerX) * 0.25;
    innerY += (mouseY - innerY) * 0.25;

    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    cursorInner.style.transform = `translate3d(${innerX}px, ${innerY}px, 0)`;

    requestAnimationFrame(animateCursor);
}

// Start animation loop
animateCursor();

// Cursor Interactions (Magnetic Glow)
document.querySelectorAll("a, button, .portfolio-item-inner, .logo, .info-item").forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.classList.add("grow");
        cursorInner.classList.add("grow");
    });
    el.addEventListener("mouseleave", () => {
        cursor.classList.remove("grow");
        cursorInner.classList.remove("grow");
    });
});

// --- NAV TOGGLER (FOR MOBILE) ---
const navTogglerBtn = document.querySelector(".nav-toggler");
const aside = document.querySelector(".aside");

if (navTogglerBtn) {
    navTogglerBtn.addEventListener("click", () => {
        asideSectionTogglerBtn();
    });
}

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
}

// Close aside when clicking a nav link (on mobile)
document.querySelectorAll(".nav li a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth < 1200 && aside.classList.contains("open")) {
            asideSectionTogglerBtn();
        }
    });
});