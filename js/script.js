// Typing Animation
var typed = new Typed(".typing", {
    strings: ["Frontend Developer", "Backend Developer", "AI/ML Developer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
});

// Active Menu Highlighting (Scroll Spy)
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        // Adjust activation area by 50px so it triggers right before it heavily hits the top
        const sectionTop = current.offsetTop - 150; 
        let sectionId = current.getAttribute("id");
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(".nav li a[href*=" + sectionId + "]").classList.add("active");
        } else {
            document.querySelector(".nav li a[href*=" + sectionId + "]").classList.remove("active");
        }
    });
});