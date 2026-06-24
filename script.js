document.addEventListener("DOMContentLoaded", () => {
    
    // --- SAFE LAYOUT INJECTION ENGINE ---
    function loadLayoutComponent(placeholderId, fileUrl, successCallback) {
        const placeholder = document.getElementById(placeholderId);
        if (placeholder) {
            fetch(fileUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Could not locate layout template: ${response.status}`);
                    }
                    return response.text();
                })
                .then(htmlContent => {
                    // FIXED: Using innerHTML preserves structural placeholder integrity across live servers
                    placeholder.innerHTML = htmlContent;
                    if (successCallback) successCallback();
                })
                .catch(err => console.error(`Layout Load Exception [${fileUrl}]:`, err));
        }
    }

    // Initialize layout templates cleanly
    loadLayoutComponent("navigation-placeholder", "navigation.html", () => {
        initializeMobileMenu();
        initializeStickyHeader();
    });
    
    loadLayoutComponent("footer-placeholder", "footer.html");


    // --- FUNCTIONAL SITE INITIALIZERS ---

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

    function initializeMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.querySelector('.nav-links');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                navMenu.classList.toggle('active');
                
                const icon = menuToggle.querySelector('i');
                if (navMenu.classList.contains('active')) {
                    icon.classList.replace('fa-bars', 'fa-times');
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            });

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

    // Interactive Destination Click Handler
    const destCards = document.querySelectorAll('.dest-card');
    destCards.forEach(card => {
        card.addEventListener('click', () => {
            const destinationName = card.querySelector('h4').innerText;
            alert(`Redirecting you to our custom travel guide for ${destinationName}!`);
        });
    });

    // Feedback Survey Modal Trigger
    const feedbackBtn = document.getElementById('feedbackBtn');
    if (feedbackBtn) {
        feedbackBtn.addEventListener('click', () => {
            const userEmail = prompt("Please enter your email to receive our feedback form:");
            if (userEmail) {
                alert(`Thank you! We have sent a survey link to ${userEmail}.`);
            }
        });
    }
});