document.addEventListener('DOMContentLoaded', () => {
    // Accordion Logic
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(accordion => {
        accordion.addEventListener('click', () => {
            const content = accordion.nextElementSibling;
            
            // Toggle active state
            accordion.classList.toggle('active');

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                accordion.setAttribute('aria-expanded', false);
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                accordion.setAttribute('aria-expanded', true);
            }
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Audio Player Placeholder Interaction
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const originalText = this.innerText;
            if (originalText === '▶') {
                this.innerText = '⏸';
                // Simulate playing animation if desired
            } else {
                this.innerText = '▶';
            }
        });
    });
});
