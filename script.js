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


// ==========================================
// LENIS SMOOTH SCROLL & PARALLAX
// ==========================================
let lenis;

function initSmoothScroll() {
    // 1. Initialize Lenis
    lenis = new Lenis({
        duration: 2.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    // 2. Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 3. Parallax Animations (The "Jesko Jets" Feel)
    // Instead of just appearing, elements move at different speeds (Scrubbing)

    // Fade Up + Parallax Lift
    gsap.utils.toArray('.reveal-on-scroll, .section-title, .section-subtitle, .integration-categories div, .roi-example').forEach((el) => {
        // Initial state
        gsap.set(el, { y: 100, opacity: 0 });

        gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 90%", // Start when top of element hits 90% of viewport
                end: "bottom 60%",
                toggleActions: "play none none reverse",
                // scrub: 1 // True parallax scrubbing (optional, remove for just smooth reveal)
            }
        });
    });

    // Specific Parallax for Images/Cards (Move slower)
    gsap.utils.toArray('.feature-card, .problem-card, .roi-card').forEach((el, i) => {
        gsap.to(el, {
            y: -50, // Move UP slightly while scrolling down
            ease: "none",
            scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', initSmoothScroll);

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
let cachedCurrencyElements = null;

function switchCurrency(currency) {
    if (!cachedCurrencyElements) {
        cachedCurrencyElements = {
            prices: document.querySelectorAll('.price-value'),
            setups: document.querySelectorAll('.setup-value'),
            symbols: document.querySelectorAll('.currency-symbol'),
            rois: document.querySelectorAll('.roi-currency-value'),
            buttons: document.querySelectorAll('.currency-btn')
        };
    }

    const symbol = currency === 'usd' ? '$' : (currency === 'eur' ? '€' : '£');

    cachedCurrencyElements.prices.forEach(el => el.textContent = el.getAttribute(`data-${currency}`));
    cachedCurrencyElements.setups.forEach(el => el.textContent = el.getAttribute(`data-${currency}`));
    cachedCurrencyElements.symbols.forEach(el => el.textContent = symbol);
    cachedCurrencyElements.rois.forEach(el => el.textContent = el.getAttribute(`data-${currency}`));

    cachedCurrencyElements.buttons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-currency') === currency);
    });
}

// Initial price setup (Default is GBP)
switchCurrency('gbp');

document.querySelectorAll('.currency-btn').forEach(btn => {
    btn.addEventListener('click', () => switchCurrency(btn.getAttribute('data-currency')));
});

// ==========================================
// GENERIC MODAL LOGIC
// ==========================================
function setupModal({ modalId, triggerBtnId, closeBtnSelector, mediaId = null, isAudio = false }) {
    const modal = document.getElementById(modalId);
    const closeBtn = document.querySelector(closeBtnSelector) || document.getElementById(closeBtnSelector.replace('#', ''));
    const media = mediaId ? document.getElementById(mediaId) : null;

    if (!modal || !closeBtn) return;

    function closeModal() {
        modal.classList.remove('show');
        if (media) {
            media.pause();
            media.currentTime = 0;
        }
    }

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === "Escape" && modal.classList.contains('show')) closeModal(); });

    if (triggerBtnId) {
        const triggerBtn = document.getElementById(triggerBtnId);
        if (triggerBtn) {
            triggerBtn.addEventListener('click', function (e) {
                e.preventDefault();
                modal.classList.add('show');
                if (media) {
                    const playPromise = media.play();
                    if (playPromise !== undefined && isAudio) {
                        playPromise.catch(error => console.log("Media play failed: ", error));
                    }
                }
            });
        }
    }
}

// Initialize Modals
setupModal({ modalId: 'videoModal', triggerBtnId: 'watchDemoBtn', closeBtnSelector: '.close-button', mediaId: 'demoVideoPlayer' });
setupModal({ modalId: 'audioModal', triggerBtnId: 'audioDemoBtn', closeBtnSelector: '#closeAudioBtn', mediaId: 'demoAudioPlayer', isAudio: true });
setupModal({ modalId: 'calendarModal', closeBtnSelector: '#closeCalendarBtn' });

// Audio Modal Logic handled by setupModal above
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
// Legacy Calendar Open via attribute
function openCalendar() {
    const modal = document.getElementById('calendarModal');
    if (modal) modal.classList.add('show');
    return false;
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
// --------------------------------------------------------
// RYAN RINGER-DUFFY STYLE REVEALS (Masked Scale + Stagger)
// --------------------------------------------------------

// Register ScrollTrigger if not already done (it is likely done in inline script, but safe to do again)
gsap.registerPlugin(ScrollTrigger);

const revealElements = document.querySelectorAll('.reveal-on-scroll');

revealElements.forEach((el) => {
    // Create a timeline for each element
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: el,
            start: "top 85%", // Start animation when top of element hits 85% of viewport
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    tl.fromTo(el,
        {
            y: 50,
            opacity: 0,
            scale: 0.95 // Scale up effect
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out"
        }
    );
});

// --------------------------------------------------------
// INTERNAL IMAGE PARALLAX (Window Effect)
// --------------------------------------------------------
const parallaxImages = document.querySelectorAll('.solution-card-image img'); // Or any other target images

parallaxImages.forEach(img => {
    gsap.to(img, {
        yPercent: 15, // Move image 15% down relative to container
        ease: "none",
        scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom", // Start when container enters viewport
            end: "bottom top",   // End when container leaves
            scrub: true
        }
    });
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

// ==========================================
// DYNAMIC APPEARANCE (Background Transitions)
// ==========================================
function initDynamicBackgrounds() {
    console.log("Initializing Dynamic Backgrounds");
    const bg = document.getElementById('dynamic-bg');
    if (!bg) return;

    // Safety check for GSAP
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn("GSAP or ScrollTrigger not loaded for dynamic backgrounds.");
        return;
    }

    // Define section colors (Dark Luxury Palette)
    // Using subtle variations of black/navy/charcoal
    const transitions = [
        { selector: '.hero', color: '#080808' },          // Base Black
        { selector: '.social-proof', color: '#0d1117' },  // Deep Navy (Subtle)
        { selector: '.problem', color: '#000000' },       // Pitch Black (Contrast)
        { selector: '.solution', color: '#0a0a0a' },      // Soft Charcoal
        { selector: '.integrations', color: '#080808' },  // Base Black
        { selector: '.roi', color: '#0d1117' },           // Deep Navy
        { selector: '.pricing', color: '#050505' },       // Very Dark Grey
        { selector: '.cta-section', color: '#120f05' }    // Warm Black (Gold Tint)
    ];

    transitions.forEach(({ selector, color }) => {
        const section = document.querySelector(selector);
        if (section) {
            ScrollTrigger.create({
                trigger: section,
                start: "top center", // Trigger when top of section hits center of viewport
                end: "bottom center",
                onEnter: () => gsap.to(bg, { backgroundColor: color, duration: 1.2, ease: "power2.out" }),
                onEnterBack: () => gsap.to(bg, { backgroundColor: color, duration: 1.2, ease: "power2.out" }),
                // Ensure scrub is smooth if user scrolls back and forth rapidly
                toggleActions: "play none none reverse"
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', initDynamicBackgrounds);
