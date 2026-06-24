document.addEventListener("DOMContentLoaded", () => {
    
    // --- LAYOUT INJECTION ENGINE ---
    // Safely reads static HTML component code and renders it inside assigned placeholders
    function loadLayoutComponent(placeholderId, fileUrl, successCallback) {
        const placeholder = document.getElementById(placeholderId);
        if (placeholder) {
            fetch(fileUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP network fault reading layout asset file: ${response.status}`);
                    }
                    return response.text();
                })
                .then(htmlContent => {
                    placeholder.outerHTML = htmlContent;
                    if (successCallback) successCallback();
                })
                .catch(err => console.error(`Failed loading structural template [${fileUrl}]:`, err));
        }
    }

    // Initialize layout templates dynamically on boot
    loadLayoutComponent("navigation-placeholder", "navigation.html", () => {
        // Wire up navigation event listeners immediately after layout html mounts
        initializeMobileMenu();
        initializeStickyHeader();
    });
    
    loadLayoutComponent("footer-placeholder", "footer.html");


    // --- CORE SITE INITIALIZATION HANDLERS ---

    // 1. Interactive Destination Cards
    const destCards = document.querySelectorAll('.dest-card');
    destCards.forEach(card => {
        card.addEventListener('click', () => {
            const destinationName = card.querySelector('h4').innerText;
            alert(`Redirecting you to our custom travel guide for ${destinationName}!`);
        });
    });

    // 2. Feedback Action Button
    const feedbackBtn = document.getElementById('feedbackBtn');
    if (feedbackBtn) {
        feedbackBtn.addEventListener('click', () => {
            const userEmail = prompt("Please enter your email to receive our feedback form:");
            if (userEmail) {
                alert(`Thank you! We have sent a survey link to ${userEmail}.`);
            }
        });
    }

    // 3. Dynamic Sticky Header Shadow Loader
    function initializeStickyHeader() {
        const header = document.querySelector('header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    header.style.transition = "box-shadow 0.3s ease";
                } else {
                    header.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
                }
            });
        }
    }

    // 4. Mobile Navigation Dropdown Controller (Modular Fix)
    function initializeMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.querySelector('.nav-links');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                navMenu.classList.toggle('active');
                
                // Toggle between hamburger icon and 'X' close icon safely
                const icon = menuToggle.querySelector('i');
                if (navMenu.classList.contains('active')) {
                    icon.classList.replace('fa-bars', 'fa-times');
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            });

            // Close the mobile menu automatically if clicking anywhere outside the opened header menu container
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                    }
                }
            });
        }
    }
});