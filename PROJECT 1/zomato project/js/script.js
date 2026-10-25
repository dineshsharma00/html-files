// ============ DOM READY ============
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("main input");
    const heroText = document.querySelector("main p");
    const heroLogo = document.querySelector("main img");
    const navLinks = document.querySelectorAll("header ul li a");

    // ---------- Entrance animations ----------
    const fadeIn = (el, delay = 0, from = "30px") => {
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = `translateY(${from})`;
        el.style.transition = "opacity .8s ease, transform .8s ease";
        setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, delay);
    };

    fadeIn(heroLogo, 100, "-30px");
    fadeIn(heroText, 350);
    fadeIn(searchInput, 600);

    // ---------- Typewriter placeholder ----------
    const phrases = [
        "Search for restaurant, cuisine or a dish",
        "Biryani, Pizza, Burger...",
        "What's on your mind today?",
        "Try 'North Indian near me'"
    ];

    let pIndex = 0, cIndex = 0, deleting = false;

    function typeLoop() {
        if (!searchInput || document.activeElement === searchInput) {
            setTimeout(typeLoop, 500); // pause typing while user is focused
            return;
        }

        const current = phrases[pIndex];

        if (!deleting) {
            cIndex++;
            searchInput.placeholder = current.slice(0, cIndex);
            if (cIndex === current.length) {
                deleting = true;
                setTimeout(typeLoop, 1800); // hold full phrase
                return;
            }
        } else {
            cIndex--;
            searchInput.placeholder = current.slice(0, cIndex);
            if (cIndex === 0) {
                deleting = false;
                pIndex = (pIndex + 1) % phrases.length;
            }
        }

        setTimeout(typeLoop, deleting ? 35 : 70);
    }

    setTimeout(typeLoop, 1500);

    // ---------- Search interaction ----------
    searchInput?.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && searchInput.value.trim()) {
            const query = searchInput.value.trim();
            console.log(`Searching for: "${query}" - script.js:68`);

            // Simple pulse feedback
            searchInput.style.transition = "transform .15s ease";
            searchInput.style.transform = "scale(0.97)";
            setTimeout(() => (searchInput.style.transform = "scale(1)"), 150);

            alert(`Showing results for: ${query}`);
        }
    });

    // ---------- Nav link click ripple-ish feedback ----------
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            link.style.color = "#e23744";
            console.log(`Navigating to: ${link.textContent.trim() || link.getAttribute("href")} - script.js:84`);
        });
    });
});