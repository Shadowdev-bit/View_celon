document.addEventListener("DOMContentLoaded", () => {
    // 1. Interactive Destination Cards
    const destCards = document.querySelectorAll('.dest-card');
    
    destCards.forEach(card => {
        card.addEventListener('click', () => {
            const destinationName = card.querySelector('h4').innerText;
            alert(`Redirecting you to our custom travel guide for ${destinationName}!`);
            // In production, update the window path:
            // window.location.href = `/destinations/${destinationName.toLowerCase().replace(" ", "-")}`;
        });
    });

    // 2. Feedback Action Button
    const feedbackBtn = document.getElementById('feedbackBtn');
    if(feedbackBtn) {
        feedbackBtn.addEventListener('click', () => {
            const userEmail = prompt("Please enter your email to receive our feedback form:");
            if (userEmail) {
                alert(`Thank you! We have sent a survey link to ${userEmail}.`);
            }
        });
    }

    // 3. Dynamic Sticky Header Shadow on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            header.style.transition = "box-shadow 0.3s ease";
        } else {
            header.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
        }
    });
});