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
// INTRO ANIMATION - SCATTERED 3D LETTERS
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
    'Arrakis'.split('').forEach(ch => {
        const span = document.createElement('span');
        span.className = 'intro-letter';
        span.textContent = ch;
        line1.appendChild(span);
    });
    'Technologies'.split('').forEach(ch => {
        const span = document.createElement('span');
        span.className = 'intro-letter';
        span.textContent = ch;
        line2.appendChild(span);
    });

    // ---- Canvas: 3D Perspective Grid ----
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    const W = window.innerWidth;
    const H = window.innerHeight;
    let time = 0;
    let frameId;

    // Vanishing point
    const vpX = W / 2;
    const vpY = H * 0.42;

    function renderBackground() {
        time += 0.004;
        ctx.clearRect(0, 0, W, H);

        // Very dark background
        ctx.fillStyle = '#010008';
        ctx.fillRect(0, 0, W, H);

        // Subtle radial ambient glow from center
        const ambientGrad = ctx.createRadialGradient(vpX, vpY, 0, vpX, vpY, Math.max(W, H) * 0.6);
        ambientGrad.addColorStop(0, 'rgba(60, 20, 120, 0.08)');
        ambientGrad.addColorStop(0.5, 'rgba(30, 10, 80, 0.03)');
        ambientGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = ambientGrad;
        ctx.fillRect(0, 0, W, H);

        // ---- 3D Perspective Grid (bottom half - floor plane) ----
        const horizonY = vpY;
        const numHLines = 25;
        const numVLines = 30;
        const gridSpeed = time * 0.5;

        // Horizontal lines (receding into distance)
        for (let i = 0; i < numHLines; i++) {
            const t = ((i / numHLines) + gridSpeed) % 1;
            const depth = Math.pow(t, 2.5); // Perspective compression
            const y = horizonY + depth * (H - horizonY);
            const alpha = depth * 0.18;

            // Lines spread wider as they come closer
            const spread = depth * W * 0.6;

            ctx.strokeStyle = `rgba(100, 60, 200, ${alpha})`;
            ctx.lineWidth = 0.5 + depth * 1;
            ctx.beginPath();
            ctx.moveTo(vpX - spread - W * 0.1, y);
            ctx.lineTo(vpX + spread + W * 0.1, y);
            ctx.stroke();
        }

        // Vertical lines (converging to vanishing point)
        for (let i = -numVLines / 2; i <= numVLines / 2; i++) {
            const xBottom = vpX + i * (W / numVLines) * 2;
            const alpha = 0.06 + 0.04 * (1 - Math.abs(i) / (numVLines / 2));

            ctx.strokeStyle = `rgba(100, 60, 200, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(vpX, horizonY);
            ctx.lineTo(xBottom, H + 50);
            ctx.stroke();
        }

        // ---- Top half - ceiling grid (mirrored) ----
        for (let i = 0; i < numHLines; i++) {
            const t = ((i / numHLines) + gridSpeed) % 1;
            const depth = Math.pow(t, 2.5);
            const y = horizonY - depth * horizonY;
            const alpha = depth * 0.1;
            const spread = depth * W * 0.6;

            ctx.strokeStyle = `rgba(100, 60, 200, ${alpha})`;
            ctx.lineWidth = 0.3 + depth * 0.5;
            ctx.beginPath();
            ctx.moveTo(vpX - spread - W * 0.1, y);
            ctx.lineTo(vpX + spread + W * 0.1, y);
            ctx.stroke();
        }

        for (let i = -numVLines / 2; i <= numVLines / 2; i++) {
            const xTop = vpX + i * (W / numVLines) * 2;
            const alpha = 0.03 + 0.02 * (1 - Math.abs(i) / (numVLines / 2));

            ctx.strokeStyle = `rgba(100, 60, 200, ${alpha})`;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(vpX, horizonY);
            ctx.lineTo(xTop, -50);
            ctx.stroke();
        }

        // ---- Horizon glow line ----
        const horizGrad = ctx.createLinearGradient(0, horizonY - 2, 0, horizonY + 2);
        horizGrad.addColorStop(0, 'transparent');
        horizGrad.addColorStop(0.5, `rgba(139, 92, 246, ${0.15 + Math.sin(time * 3) * 0.05})`);
        horizGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = horizGrad;
        ctx.fillRect(0, horizonY - 2, W, 4);

        // Wider horizon ambient
        const horizAmbient = ctx.createRadialGradient(vpX, horizonY, 0, vpX, horizonY, W * 0.5);
        horizAmbient.addColorStop(0, `rgba(139, 92, 246, ${0.06 + Math.sin(time * 2) * 0.02})`);
        horizAmbient.addColorStop(1, 'transparent');
        ctx.fillStyle = horizAmbient;
        ctx.fillRect(0, horizonY - 80, W, 160);

        frameId = requestAnimationFrame(renderBackground);
    }

    renderBackground();

    // ---- GSAP: Letters fly in from scattered positions ----
    const allLetters = document.querySelectorAll('.intro-letter');
    const line1Letters = line1.querySelectorAll('.intro-letter');
    const line2Letters = line2.querySelectorAll('.intro-letter');

    // Give each letter a UNIQUE random starting position from edges
    allLetters.forEach((letter) => {
        // Pick a random edge: 0=top, 1=right, 2=bottom, 3=left
        const edge = Math.floor(Math.random() * 4);
        let startX, startY;

        switch (edge) {
            case 0: // top
                startX = (Math.random() - 0.5) * W * 1.5;
                startY = -200 - Math.random() * 300;
                break;
            case 1: // right
                startX = W + 200 + Math.random() * 300;
                startY = (Math.random() - 0.5) * H * 1.5;
                break;
            case 2: // bottom
                startX = (Math.random() - 0.5) * W * 1.5;
                startY = H + 200 + Math.random() * 300;
                break;
            case 3: // left
                startX = -200 - Math.random() * 300;
                startY = (Math.random() - 0.5) * H * 1.5;
                break;
        }

        gsap.set(letter, {
            x: startX,
            y: startY,
            rotation: (Math.random() - 0.5) * 360,
            rotateX: (Math.random() - 0.5) * 120,
            rotateY: (Math.random() - 0.5) * 120,
            scale: Math.random() * 0.5 + 0.3,
            opacity: 0
        });
    });

    const masterTL = gsap.timeline();

    // Phase 1: Magnetic assembly — letters drift in slowly then rapidly accelerate into place
    // Step A: Fade in + start drifting (slow, distant)
    masterTL.to(allLetters, {
        opacity: 0.6,
        scale: 0.7,
        duration: 0.5,
        stagger: { each: 0.02, from: "random" },
        ease: "power1.out"
    })
        // Step B: Magnetic pull — accelerate to final position (slow start, very fast end)
        .to(line1Letters, {
            x: 0,
            y: 0,
            rotation: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            opacity: 1,
            duration: 1.8,
            stagger: {
                each: 0.03,
                from: "center"
            },
            ease: "power4.in"
        }, "-=0.1")
        .to(line2Letters, {
            x: 0,
            y: 0,
            rotation: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            opacity: 1,
            duration: 1.5,
            stagger: {
                each: 0.025,
                from: "center"
            },
            ease: "power4.in"
        }, "-=1.3")
        // Step C: Elastic snap settle (tiny overshoot for magnetic feel)
        .from(line1Letters, {
            scale: 0.92,
            duration: 0.35,
            stagger: 0.015,
            ease: "elastic.out(1.5, 0.4)"
        })
        .from(line2Letters, {
            scale: 0.92,
            duration: 0.3,
            stagger: 0.012,
            ease: "elastic.out(1.5, 0.4)"
        }, "<")

        // Phase 2: Glow pulse
        .to(line1Letters, {
            textShadow: "0 0 25px rgba(139, 92, 246, 0.9), 0 0 50px rgba(139, 92, 246, 0.4), 0 0 100px rgba(139, 92, 246, 0.15)",
            duration: 0.6,
            ease: "power2.inOut"
        }, "+=0.15")
        .to(line2Letters, {
            textShadow: "0 0 15px rgba(139, 92, 246, 0.6), 0 0 30px rgba(139, 92, 246, 0.2)",
            duration: 0.6,
            ease: "power2.inOut"
        }, "<")

        // Phase 3: Glow softens
        .to(allLetters, {
            textShadow: "0 0 8px rgba(139, 92, 246, 0.2)",
            duration: 0.4,
            ease: "power2.out"
        })

        // Phase 4: Brief hold
        .to({}, { duration: 0.4 })

        // Phase 5: Premium reveal — text scales toward camera and dissolves
        .to(line1Letters, {
            scale: 2.5,
            opacity: 0,
            y: -30,
            filter: "blur(8px)",
            duration: 0.9,
            stagger: 0.015,
            ease: "power3.in"
        })
        .to(line2Letters, {
            scale: 2,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.7,
            stagger: 0.015,
            ease: "power3.in"
        }, "<+0.1")
        .to(loader, {
            opacity: 0,
            duration: 0.7,
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
        }, "-=0.3");

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
