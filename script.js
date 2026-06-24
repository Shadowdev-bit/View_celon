document.addEventListener("DOMContentLoaded", () => {
    
    // --- OFFLINE-SAFE SECURE LAYOUT INJECTOR ---
    function localComponentInject(placeholderId, fileUrl, successCallback) {
        const placeholder = document.getElementById(placeholderId);
        if (!placeholder) return;

        // Uses a hidden iframe to read local files without triggering browser security blocks
        const frame = document.createElement('iframe');
        frame.style.display = 'none';
        frame.src = fileUrl;
        
        frame.onload = function() {
            try {
                const embeddedHtml = frame.contentDocument.body.innerHTML;
                placeholder.innerHTML = embeddedHtml;
                if (successCallback) successCallback();
            } catch (e) {
                console.error(`Local layout engine fallback error on: ${fileUrl}`, e);
            }
            document.body.removeChild(frame);
        };
        
        document.body.appendChild(frame);
    }

    // Inject your separated layout files safely
    localComponentInject("navigation-placeholder", "navigation.html", () => {
        initializeMobileMenu();
        initializeStickyHeader();
    });
    
    localComponentInject("footer-placeholder", "footer.html");


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

    // 4. Mobile Navigation Dropdown Controller
    function initializeMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');

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
});