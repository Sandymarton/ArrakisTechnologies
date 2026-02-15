gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Hero animations (Wrapped in a function to start after intro)
function startHeroAnimations() {
    console.log("Starting Hero Animations");
    const timeline = gsap.timeline();

    timeline.from('.hero-content h1', {
        duration: 1.2,
        opacity: 0,
        y: 50,
        ease: 'power3.out'
    })
        .from('.hero-subtitle', {
            duration: 1.2,
            opacity: 0,
            y: 40,
            ease: 'power3.out'
        }, "-=0.8")
        .from('.cta-buttons', {
            duration: 1.2,
            opacity: 0,
            y: 30,
            ease: 'power3.out'
        }, "-=0.8")
        .from('.trust-bar', {
            duration: 1.2,
            opacity: 0,
            y: 30,
            ease: 'power3.out'
        }, "-=0.8");
}

// Function to apply scroll animations
function applyScrollAnimations(selector, config = {}) {
    gsap.utils.toArray(selector).forEach((element, index) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse'
            },
            duration: config.duration || 0.8,
            opacity: 0,
            y: config.y || 40,
            scale: config.scale || 1,
            rotation: config.rotation || 0,
            delay: index * (config.stagger || 0.1),
            ease: config.ease || 'power3.out'
        });
    });
}

applyScrollAnimations('.section-title');
applyScrollAnimations('.section-subtitle');
applyScrollAnimations('.problem-card', { y: 60, rotation: -3, stagger: 0.1, ease: 'back.out' });
applyScrollAnimations('.problem-highlight', { y: 40, ease: 'power2.out' });
applyScrollAnimations('.feature-card', { y: 60, stagger: 0.1, ease: 'back.out' });
applyScrollAnimations('.integration-categories div', { y: 40, stagger: 0.1, ease: 'power2.out' });
applyScrollAnimations('.roi-card', { y: 60, stagger: 0.1, ease: 'power3.out' });
applyScrollAnimations('.roi-example', { y: 40, ease: 'power2.out' });
applyScrollAnimations('.case-card', { y: 60, stagger: 0.1, ease: 'power3.out' });
applyScrollAnimations('.price-card', { y: 60, stagger: 0.1, ease: 'power3.out' });

// Smooth Scrolling for Navigation
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const scrollTarget = (targetId === '#hero') ? 0 : targetId;

        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: scrollTarget,
                offsetY: (targetId === '#hero') ? 0 : 90
            },
            ease: "power2.inOut"
        });
    });
});

// FAQ Accordion Logic
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', event => {
        const faqItem = item.closest('.faq-item');
        const isActive = faqItem.classList.toggle('active');
        const answer = faqItem.querySelector('.faq-answer');

        // Close others
        document.querySelectorAll('.faq-item.active').forEach(otherItem => {
            if (otherItem !== faqItem) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                otherItem.querySelector('.faq-answer').style.opacity = 0;
            }
        });

        // Set max-height for animation
        if (isActive) {
            answer.style.maxHeight = `${answer.scrollHeight + 50}px`;
            answer.style.opacity = 1;
        } else {
            answer.style.maxHeight = '0';
            answer.style.opacity = 0;
        }
    });
});

// Currency Converter Logic
function switchCurrency(currency) {
    const priceElements = document.querySelectorAll('.price-value');
    const setupElements = document.querySelectorAll('.setup-value');
    const symbolElements = document.querySelectorAll('.currency-symbol');
    const roiElements = document.querySelectorAll('.roi-currency-value');
    const currencyButtons = document.querySelectorAll('.currency-btn');

    let symbol;

    if (currency === 'usd') {
        symbol = '$';
    } else if (currency === 'eur') {
        symbol = '€';
    } else {
        symbol = '£';
    }

    priceElements.forEach(el => el.textContent = el.getAttribute(`data-${currency}`));
    setupElements.forEach(el => el.textContent = el.getAttribute(`data-${currency}`));
    symbolElements.forEach(el => el.textContent = symbol);
    roiElements.forEach(el => el.textContent = el.getAttribute(`data-${currency}`));

    currencyButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-currency') === currency) {
            btn.classList.add('active');
        }
    });
}

// Initial price setup (Default is GBP)
switchCurrency('gbp');

document.querySelectorAll('.currency-btn').forEach(btn => {
    btn.addEventListener('click', () => switchCurrency(btn.getAttribute('data-currency')));
});

// Video Modal Logic
const videoModal = document.getElementById('videoModal');
const watchDemoBtn = document.getElementById('watchDemoBtn');
const closeButton = document.querySelector('.close-button');
const demoVideoPlayer = document.getElementById('demoVideoPlayer');

if (watchDemoBtn && videoModal && closeButton && demoVideoPlayer) {
    // Open modal when button is clicked
    watchDemoBtn.addEventListener('click', function (e) {
        e.preventDefault();
        videoModal.classList.add('show');
        demoVideoPlayer.play();
    });

    // Close modal when close button is clicked
    closeButton.addEventListener('click', function () {
        videoModal.classList.remove('show');
        demoVideoPlayer.pause();
        demoVideoPlayer.currentTime = 0;
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener('click', function (e) {
        if (e.target === videoModal) {
            videoModal.classList.remove('show');
            demoVideoPlayer.pause();
            demoVideoPlayer.currentTime = 0;
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === "Escape" && videoModal.classList.contains('show')) {
            videoModal.classList.remove('show');
            demoVideoPlayer.pause();
            demoVideoPlayer.currentTime = 0;
        }
    });
}

// ==========================================
// AUDIO MODAL LOGIC
// ==========================================
const audioModal = document.getElementById('audioModal');
const audioDemoBtn = document.getElementById('audioDemoBtn');
const closeAudioBtn = document.getElementById('closeAudioBtn');
const demoAudioPlayer = document.getElementById('demoAudioPlayer');

if (audioDemoBtn && audioModal && closeAudioBtn && demoAudioPlayer) {
    // Open audio modal
    audioDemoBtn.addEventListener('click', function () {
        audioModal.classList.add('show');
        demoAudioPlayer.play().catch(function (error) {
            console.log("Audio play failed (browser might require interaction): ", error);
        });
    });

    // Close audio modal via X button
    closeAudioBtn.addEventListener('click', function () {
        audioModal.classList.remove('show');
        demoAudioPlayer.pause();
        demoAudioPlayer.currentTime = 0;
    });

    // Close audio modal by clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === audioModal) {
            audioModal.classList.remove('show');
            demoAudioPlayer.pause();
            demoAudioPlayer.currentTime = 0;
        }
    });

    // Close audio modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === "Escape" && audioModal.classList.contains('show')) {
            audioModal.classList.remove('show');
            demoAudioPlayer.pause();
            demoAudioPlayer.currentTime = 0;
        }
    });
}
// ==========================================
// AUDIO PLAYER LOGIC
// ==========================================
function togglePlay(audioId, btn) {
    const audio = document.getElementById(audioId);
    const playIcon = btn.querySelector('.play-icon');
    const pauseIcon = btn.querySelector('.pause-icon');

    // Stop all other audios first
    document.querySelectorAll('audio').forEach(el => {
        if (el.id !== audioId) {
            el.pause();
            el.currentTime = 0; // Optional: Reset others
            // Reset icons for other buttons
            const otherBtn = el.parentElement.querySelector('.player-btn');
            if (otherBtn) {
                otherBtn.querySelector('.play-icon').style.display = 'block';
                otherBtn.querySelector('.pause-icon').style.display = 'none';
            }
        }
    });

    if (audio.paused) {
        audio.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

// Update Progress Bar
document.querySelectorAll('audio').forEach(audio => {
    audio.addEventListener('timeupdate', () => {
        const progressBar = document.getElementById('prog-' + audio.id);
        const timeDisplay = document.getElementById('time-' + audio.id);

        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = percent + '%';

            // Format time 0:00
            const minutes = Math.floor(audio.currentTime / 60);
            const seconds = Math.floor(audio.currentTime % 60);
            timeDisplay.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }
    });

    // Reset when audio ends
    audio.addEventListener('ended', () => {
        const btn = audio.parentElement.querySelector('.player-btn');
        btn.querySelector('.play-icon').style.display = 'block';
        btn.querySelector('.pause-icon').style.display = 'none';
        document.getElementById('prog-' + audio.id).style.width = '0%';
    });
});

// Click on progress bar to seek
function seekAudio(audioId, event, container) {
    const audio = document.getElementById(audioId);
    const rect = container.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const width = rect.width;
    const percent = offsetX / width;

    if (audio.duration) {
        audio.currentTime = percent * audio.duration;
    }
}

// Calendar Integration
// Calendar Integration
const calendarModal = document.getElementById('calendarModal');
const closeCalendarBtn = document.getElementById('closeCalendarBtn');

function openCalendar() {
    if (calendarModal) {
        calendarModal.classList.add('show');
    }
    return false;
}

if (calendarModal && closeCalendarBtn) {
    // Close via X button
    closeCalendarBtn.addEventListener('click', function () {
        calendarModal.classList.remove('show');
    });

    // Close by clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === calendarModal) {
            calendarModal.classList.remove('show');
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === "Escape" && calendarModal.classList.contains('show')) {
            calendarModal.classList.remove('show');
        }
    });
}

// ==========================================
// INTRO ANIMATION - TECH PERSPECTIVE
// ==========================================
let heroAnimationsStarted = false;

function playIntroAtStart() {
    const loader = document.getElementById('loader');
    const canvas = document.getElementById('loaderCanvas');
    const line1 = document.getElementById('loaderLine1');
    const line2 = document.getElementById('loaderLine2');
    if (!loader || !canvas || !line1 || !line2) return;

    if (typeof gsap === 'undefined') {
        loader.style.display = 'none';
        startHeroAnimations();
        return;
    }

    document.body.style.overflow = 'hidden';

    // ---- Create letter spans ----
    const text1 = 'Arrakis';
    const text2 = 'Technologies';

    text1.split('').forEach(ch => {
        const span = document.createElement('span');
        span.className = 'intro-letter';
        span.textContent = ch;
        line1.appendChild(span);
    });

    text2.split('').forEach(ch => {
        const span = document.createElement('span');
        span.className = 'intro-letter';
        span.textContent = ch;
        line2.appendChild(span);
    });

    // ---- Canvas: Animated tech grid background ----
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    const W = window.innerWidth;
    const H = window.innerHeight;

    // Grid config
    const gridSpacing = 60;
    const cols = Math.ceil(W / gridSpacing) + 2;
    const rows = Math.ceil(H / gridSpacing) + 2;
    let time = 0;
    let frameId;

    // Flowing gradient nodes (intersection highlights)
    const nodes = [];
    for (let i = 0; i < 12; i++) {
        nodes.push({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            radius: 150 + Math.random() * 200,
            hue: Math.random() > 0.5 ? 265 : 25, // purple or orange
            alpha: 0.08 + Math.random() * 0.06
        });
    }

    function renderGrid() {
        time += 0.008;
        ctx.clearRect(0, 0, W, H);

        // Dark gradient background
        const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
        bgGrad.addColorStop(0, '#0a0520');
        bgGrad.addColorStop(1, '#030014');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);

        // Move nodes
        nodes.forEach(n => {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < -100 || n.x > W + 100) n.vx *= -1;
            if (n.y < -100 || n.y > H + 100) n.vy *= -1;
        });

        // Draw node glows (ambient light)
        nodes.forEach(n => {
            const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
            grad.addColorStop(0, `hsla(${n.hue}, 80%, 50%, ${n.alpha})`);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fillRect(n.x - n.radius, n.y - n.radius, n.radius * 2, n.radius * 2);
        });

        // Draw grid lines
        const offsetX = (time * 30) % gridSpacing;
        const offsetY = (time * 20) % gridSpacing;

        // Vertical lines
        for (let i = -1; i < cols; i++) {
            const x = i * gridSpacing + offsetX;
            // Find proximity to nearest node for brightness
            let brightness = 0.04;
            nodes.forEach(n => {
                const dist = Math.abs(n.x - x);
                if (dist < n.radius) {
                    brightness = Math.max(brightness, 0.12 * (1 - dist / n.radius));
                }
            });
            ctx.strokeStyle = `rgba(139, 92, 246, ${brightness})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, H);
            ctx.stroke();
        }

        // Horizontal lines
        for (let j = -1; j < rows; j++) {
            const y = j * gridSpacing + offsetY;
            let brightness = 0.04;
            nodes.forEach(n => {
                const dist = Math.abs(n.y - y);
                if (dist < n.radius) {
                    brightness = Math.max(brightness, 0.12 * (1 - dist / n.radius));
                }
            });
            ctx.strokeStyle = `rgba(139, 92, 246, ${brightness})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(W, y);
            ctx.stroke();
        }

        // Intersection dots (where grid lines cross near nodes)
        for (let i = -1; i < cols; i++) {
            for (let j = -1; j < rows; j++) {
                const x = i * gridSpacing + offsetX;
                const y = j * gridSpacing + offsetY;
                let maxBright = 0;
                nodes.forEach(n => {
                    const dist = Math.sqrt((n.x - x) ** 2 + (n.y - y) ** 2);
                    if (dist < n.radius * 0.6) {
                        maxBright = Math.max(maxBright, 0.5 * (1 - dist / (n.radius * 0.6)));
                    }
                });
                if (maxBright > 0.05) {
                    ctx.beginPath();
                    ctx.fillStyle = `rgba(139, 92, 246, ${maxBright})`;
                    ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        frameId = requestAnimationFrame(renderGrid);
    }

    renderGrid();

    // ---- GSAP: Perspective text entrance ----
    const allLetters = document.querySelectorAll('.intro-letter');
    const line1Letters = line1.querySelectorAll('.intro-letter');
    const line2Letters = line2.querySelectorAll('.intro-letter');

    // Set initial state: letters far away in Z, rotated, invisible
    gsap.set(line1Letters, {
        opacity: 0,
        z: -2000,
        rotateY: 90,
        rotateX: -40,
        scale: 0.3
    });
    gsap.set(line2Letters, {
        opacity: 0,
        z: -2000,
        rotateY: -90,
        rotateX: 40,
        scale: 0.3
    });

    const masterTL = gsap.timeline();

    // Phase 1: Letters fly in from deep perspective
    masterTL.to(line1Letters, {
        opacity: 1,
        z: 0,
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 1.4,
        stagger: 0.06,
        ease: "expo.out"
    })
        .to(line2Letters, {
            opacity: 1,
            z: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.04,
            ease: "expo.out"
        }, "-=0.8")

        // Phase 2: Subtle glow pulse on assembled text
        .to(line1Letters, {
            textShadow: "0 0 30px rgba(139, 92, 246, 0.9), 0 0 60px rgba(139, 92, 246, 0.4)",
            duration: 0.6,
            ease: "power2.inOut"
        }, "+=0.2")
        .to(line2Letters, {
            textShadow: "0 0 20px rgba(255, 107, 53, 0.7), 0 0 40px rgba(255, 107, 53, 0.3)",
            duration: 0.6,
            ease: "power2.inOut"
        }, "<")

        // Phase 3: Glow settles
        .to(allLetters, {
            textShadow: "0 0 10px rgba(139, 92, 246, 0.3)",
            duration: 0.5,
            ease: "power2.out"
        })

        // Phase 4: Hold
        .to({}, { duration: 0.3 })

        // Phase 5: Premium reveal - text scales up and fades, loader wipes away
        .to(line1Letters, {
            z: 500,
            opacity: 0,
            scale: 1.5,
            rotateX: -15,
            duration: 0.8,
            stagger: 0.02,
            ease: "power3.in"
        })
        .to(line2Letters, {
            z: 500,
            opacity: 0,
            scale: 1.3,
            duration: 0.6,
            stagger: 0.02,
            ease: "power3.in"
        }, "<")
        .to(loader, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                cancelAnimationFrame(frameId);
                loader.style.display = 'none';
                document.body.style.overflow = '';
                if (!heroAnimationsStarted) {
                    startHeroAnimations();
                    heroAnimationsStarted = true;
                }
                ScrollTrigger.refresh();
            }
        }, "-=0.4");

    // Fail-safe
    setTimeout(() => {
        if (loader.style.display !== 'none') {
            cancelAnimationFrame(frameId);
            loader.style.display = 'none';
            document.body.style.overflow = '';
            if (!heroAnimationsStarted) {
                startHeroAnimations();
                heroAnimationsStarted = true;
            }
        }
    }, 8000);
}

// Start Intro immediately
playIntroAtStart();
