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
        const targetId = this.getAttribute('href');

        // Only intercept internal anchor links (starting with #)
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const scrollTarget = (targetId === '#hero') ? 0 : targetId;

            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: scrollTarget,
                    offsetY: (targetId === '#hero') ? 0 : 90
                },
                ease: "power2.inOut"
            });
        }
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
// INTRO ANIMATION - 3D SOUND WAVES + THROWN LETTERS
// ==========================================
var heroAnimationsStarted = false;

function playIntroAtStart() {
    var loader = document.getElementById('loader');
    var canvas = document.getElementById('loaderCanvas');
    var panelTop = document.getElementById('loaderOverlayTop');
    var panelBottom = document.getElementById('loaderOverlayBottom');
    var content = document.getElementById('loaderContent');
    var line1 = document.getElementById('loaderLine1');
    var line2 = document.getElementById('loaderLine2');
    var revealLine = document.getElementById('loaderRevealLine');

    if (!loader || !canvas || !panelTop || !panelBottom || !content || !line1 || !line2) return;

    if (typeof gsap === 'undefined') {
        loader.style.display = 'none';
        panelTop.style.display = 'none';
        panelBottom.style.display = 'none';
        content.style.display = 'none';
        if (revealLine) revealLine.style.display = 'none';
        startHeroAnimations();
        return;
    }

    document.body.style.overflow = 'hidden';

    // ---- Canvas: V9 High-Fidelity 3D Audio Terrain (Confirmed: User Likes This) ----
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    var W = window.innerWidth;
    var H = window.innerHeight;
    var time = 0;
    var frameId;

    // 3D Config 
    var fov = 400;
    var cameraHeight = 120;
    var horizonY = H * 0.4;

    function render3DGrid() {
        time += 0.02;
        ctx.clearRect(0, 0, W, H);

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, W, H);

        var spacing = 40;
        var rows = 50;
        var cols = 80;

        for (var r = rows; r > 0; r--) {
            var z = (r * spacing) - ((time * 200) % spacing);
            if (z < 10) continue;

            var scale = fov / (fov + z);
            var alpha = Math.min(1, Math.pow(scale, 1.5) * 2);

            ctx.beginPath();
            ctx.lineWidth = 1 + scale * 2;

            var hue = 260 - (r * 2);
            ctx.strokeStyle = 'hsla(' + hue + ', 80%, 60%, ' + alpha + ')';
            ctx.shadowColor = 'hsla(' + hue + ', 80%, 60%, ' + alpha + ')';
            ctx.shadowBlur = 10 * scale;

            var started = false;

            for (var c = -cols / 2; c <= cols / 2; c++) {
                var xWorld = c * spacing;

                var waveY = Math.sin(c * 0.2 + time * 1.5) * 40 * Math.sin(r * 0.1 + time);
                waveY += Math.cos(c * 0.5 - time * 3) * 15;
                waveY += Math.sin(c * 1.5 + time * 5) * 5;

                var xScreen = (W / 2) + xWorld * scale;
                var yScreen = (H / 2) + cameraHeight * scale + horizonY * 0.1 + (waveY * scale * 1.5);

                if (!started) {
                    ctx.moveTo(xScreen, yScreen);
                    started = true;
                } else {
                    ctx.lineTo(xScreen, yScreen);
                }
            }
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        for (var c = -cols / 2; c <= cols / 2; c += 4) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.08)';
            ctx.lineWidth = 1;

            var startedV = false;
            for (var r = 0; r < rows; r += 2) {
                var z = (r * spacing) - ((time * 200) % spacing);
                if (z < 10) continue;
                var scale = fov / (fov + z);

                var xWorld = c * spacing;
                var waveY = Math.sin(c * 0.2 + time * 1.5) * 40 * Math.sin(r * 0.1 + time) + Math.cos(c * 0.5 - time * 3) * 15;

                var xScreen = (W / 2) + xWorld * scale;
                var yScreen = (H / 2) + cameraHeight * scale + horizonY * 0.1 + (waveY * scale * 1.5);

                if (!startedV) { ctx.moveTo(xScreen, yScreen); startedV = true; }
                else { ctx.lineTo(xScreen, yScreen); }
            }
            ctx.stroke();
        }

        var grd = ctx.createRadialGradient(W / 2, H / 2 + 50, 0, W / 2, H / 2 + 50, H);
        grd.addColorStop(0, 'rgba(60, 20, 120, 0.1)');
        grd.addColorStop(1, 'rgba(0,0,0,0.8)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);

        frameId = requestAnimationFrame(render3DGrid);
    }
    render3DGrid();


    // ---- Create letter spans ----
    'ARRAKIS'.split('').forEach(function (ch) {
        var span = document.createElement('span');
        span.className = 'intro-char';
        span.textContent = ch;
        line1.appendChild(span);
    });

    'TECHNOLOGIES'.split('').forEach(function (ch) {
        var span = document.createElement('span');
        span.className = 'intro-char';
        span.textContent = ch;
        line2.appendChild(span);
    });

    var chars1 = line1.querySelectorAll('.intro-char');
    var chars2 = line2.querySelectorAll('.intro-char');
    var allChars = Array.from(chars1).concat(Array.from(chars2));

    // ---- Cinematic "Drift" Config ----
    // Elegant, slow, majestic reveal.
    // Letters start:
    // 1. Z-depth (behind camera or far away)
    // 2. Blurred (Depth of Field simulation)
    // 3. Transparent
    // Animation: Smooth DRIFT into focus (Deceleration / Ease Out)

    function setInitialDriftState(chars) {
        chars.forEach(function (ch) {
            gsap.set(ch, {
                opacity: 0,
                scale: 1.5, // Start slightly zoomed in
                y: 40,      // Start slightly below
                z: 200,     // Start closer to camera (css 3d)
                filter: "blur(12px)", // Depth of field blur
                color: "#ffffff"
            });
        });
    }

    setInitialDriftState(chars1);
    setInitialDriftState(chars2);
    gsap.set(content, { perspective: 1000 }); // Enable 3D transitions

    // ---- Master Timeline ----
    var tl = gsap.timeline();

    // Group 1: ARRAKIS
    // Majestic, slow resolve
    tl.to(chars1, {
        opacity: 1,
        scale: 1,
        y: 0,
        z: 0,
        filter: "blur(0px)",
        duration: 2.4, // Very Cinematic Duration
        stagger: {
            each: 0.08,
            from: "center" // Reveal from center looks most premium
        },
        ease: "power3.out", // Strong deceleration: Fast start, extremely smooth stop
        force3D: true // Force GPU acceleration for Safari
    }, 0.5);

    // Group 2: TECHNOLOGIES
    // Follows slightly after
    tl.to(chars2, {
        opacity: 1,
        scale: 1,
        y: 0,
        z: 0,
        filter: "blur(0px)",
        duration: 2.2,
        stagger: {
            each: 0.06,
            from: "center"
        },
        ease: "power3.out",
        force3D: true // Force GPU acceleration for Safari
    }, 1.2);


    // Phase 3: Hold and Admire
    tl.to({}, { duration: 0.8 });

    // Phase 4: Elegant Reveal (Eyelid)
    tl.to(revealLine, {
        scaleX: 1,
        duration: 0.8, // Slower reveal line
        ease: "power4.inOut"
    });

    // Content fade out
    tl.to(content, {
        opacity: 0,
        scale: 0.98, // Subtle scale
        duration: 0.6,
        ease: "power2.in"
    }, ">-0.3");

    tl.to(canvas, { opacity: 0, duration: 0.6 }, "<");

    // Split
    tl.to(panelTop, { yPercent: -100, duration: 1.4, ease: "power4.inOut" }, "-=0.2");
    tl.to(panelBottom, { yPercent: 100, duration: 1.4, ease: "power4.inOut" }, "<");
    tl.to(revealLine, { opacity: 0, height: "120px", duration: 0.8, ease: "power2.in" }, "<"); // Flare out

    // Cleanup
    tl.call(function () {
        cancelAnimationFrame(frameId);
        loader.style.display = 'none';
        panelTop.style.display = 'none';
        panelBottom.style.display = 'none';
        content.style.display = 'none';
        canvas.style.display = 'none';
        if (revealLine) revealLine.style.display = 'none';
        document.body.style.overflow = '';
        if (!heroAnimationsStarted) {
            startHeroAnimations();
            heroAnimationsStarted = true;
        }
        ScrollTrigger.refresh();
    });

    // Safety
    setTimeout(function () {
        if (panelTop && panelTop.style.display !== 'none') {
            loader.style.display = 'none';
            document.body.style.overflow = '';
            // Rough cleanup
            panelTop.style.display = 'none';
            panelBottom.style.display = 'none';
            if (!heroAnimationsStarted) startHeroAnimations();
        }
    }, 11000); // 11s safety for slow cinematic intro
}

// Start Intro immediately
playIntroAtStart();

/* Revenue Loss Calculator */
function updateCalc() {
    const missedCalls = document.getElementById('missedCalls').value;
    const customerValue = document.getElementById('customerValue').value;

    document.getElementById('missedCallsVal').innerText = missedCalls;

    const weeklyLoss = missedCalls * customerValue;
    const annualLoss = weeklyLoss * 52;

    // Format currency
    const formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    // Animate the number change (simple version)
    const lossElement = document.getElementById('annualLoss');
    lossElement.innerText = formatter.format(annualLoss);

    // Optional: Add red glow intensity based on loss amount
    const intensity = Math.min(annualLoss / 1000000, 1);
    lossElement.style.textShadow = `0 0 ${20 + (intensity * 30)}px rgba(255, 77, 77, ${0.3 + (intensity * 0.4)})`;
}

// Initialize Calculator on Load
document.addEventListener('DOMContentLoaded', updateCalc);

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
    elementsToReveal.forEach(el => observer.observe(el));
});

// ==========================================
// CINEMATIC PAGE TRANSITIONS (Jesko Jets Style)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.page-transition-overlay');
    const logo = document.querySelector('.transition-logo');

    // 1. ENTER ANIMATION (Reveal Page)
    // The overlay is initially covering the screen (CSS). We slide it UP.
    if (overlay && logo) {
        const tl = gsap.timeline();

        // Logo fades in slightly then out
        tl.to(logo, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" })
            .to(logo, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.in" }, "+=0.2") // Hold for 0.2s
            // Slide Overlay UP
            .to(overlay, {
                yPercent: -100,
                duration: 0.8,
                ease: "power3.inOut",
                onComplete: () => {
                    overlay.style.pointerEvents = "none"; // Ensure clicks pass through
                }
            });
    }

    // 2. EXIT ANIMATION (Navigate Away)
    // Intercept all internal links
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Ignore hash links (anchors on same page) and external links
            if (href.startsWith('#') || href.startsWith('mailto:') || link.target === '_blank') return;

            e.preventDefault(); // Stop immediate navigation

            // Reset Overlay Position (It was moved up -100%)
            // We want it to slide IN from BOTTOM (100% -> 0%) OR simply Fade In
            // Let's do Slide UP from opacity? No, let's slide DOWN or UP again?
            // "Jesko Jets" often does a curtain wipe.
            // Let's try: Slide IN from BOTTOM (covering screen)

            if (overlay && logo) {
                // Prepare overlay at bottom
                gsap.set(overlay, { yPercent: 100, opacity: 1 });
                overlay.style.pointerEvents = "all"; // Block clicks

                const tl = gsap.timeline({
                    onComplete: () => {
                        window.location.href = href; // Navigate
                    }
                });

                tl.to(overlay, { yPercent: 0, duration: 0.6, ease: "power3.inOut" })
                    .to(logo, { opacity: 1, scale: 1, duration: 0.3 }, "-=0.2");
            } else {
                window.location.href = href; // Fallback
            }
        });
    });
});
