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

    // ---- Canvas: 3D Perspective Sound Wave Mesh ----
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    var W = window.innerWidth;
    var H = window.innerHeight;
    var time = 0;
    var frameId;

    var COLS = 60;
    var ROWS = 30;
    var SPACING = 30;
    var FOV = 500;
    var camY = -180;
    var camZ = -300;

    function project3D(x, y, z) {
        var rz = z - camZ;
        var ry = y - camY;
        if (rz <= 0) return null;
        var scale = FOV / rz;
        return { sx: W / 2 + x * scale, sy: H / 2 + ry * scale, scale: scale, depth: rz };
    }

    function renderWaves3D() {
        time += 0.012;
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);

        var points = [];
        for (var row = 0; row < ROWS; row++) {
            var rowPts = [];
            for (var col = 0; col < COLS; col++) {
                var x = (col - COLS / 2) * SPACING;
                var z = row * SPACING + 100;
                var wave1 = Math.sin(col * 0.15 + time * 2.0) * 25;
                var wave2 = Math.sin(col * 0.08 + time * 1.2 + row * 0.1) * 15;
                var wave3 = Math.cos(col * 0.22 + time * 3.0) * 10 * Math.sin(row * 0.2 + time * 0.5);
                var wave4 = Math.sin((col + row) * 0.1 + time * 1.8) * 8;
                var y = wave1 + wave2 + wave3 + wave4;
                var projected = project3D(x, y, z);
                rowPts.push({ x: x, y: y, z: z, projected: projected });
            }
            points.push(rowPts);
        }

        // Draw horizontal wave lines — back to front
        for (var row = ROWS - 1; row >= 0; row--) {
            var rowPts = points[row];
            var depthRatio = 1 - row / ROWS;
            var alpha = 0.05 + depthRatio * 0.35;
            var hue = 260 + depthRatio * 20;

            ctx.beginPath();
            ctx.strokeStyle = 'hsla(' + hue + ', 80%, 55%, ' + alpha + ')';
            ctx.lineWidth = 0.5 + depthRatio * 1.8;
            ctx.shadowColor = 'hsla(' + hue + ', 90%, 50%, ' + (alpha * 0.5) + ')';
            ctx.shadowBlur = 6 + depthRatio * 10;

            var started = false;
            for (var col = 0; col < COLS; col++) {
                var p = rowPts[col].projected;
                if (!p) continue;
                if (!started) { ctx.moveTo(p.sx, p.sy); started = true; }
                else { ctx.lineTo(p.sx, p.sy); }
            }
            ctx.stroke();

            // Vertex dots on front rows
            if (depthRatio > 0.5) {
                ctx.shadowBlur = 0;
                for (var col2 = 0; col2 < COLS; col2 += 3) {
                    var p2 = rowPts[col2].projected;
                    if (!p2) continue;
                    ctx.beginPath();
                    ctx.fillStyle = 'hsla(' + hue + ', 80%, 70%, ' + (alpha * 0.6) + ')';
                    ctx.arc(p2.sx, p2.sy, Math.max(0.8, 1.5 * p2.scale), 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        // Sparse vertical connecting lines
        ctx.shadowBlur = 0;
        for (var col = 0; col < COLS; col += 4) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.04)';
            ctx.lineWidth = 0.5;
            var started = false;
            for (var row = 0; row < ROWS; row++) {
                var p = points[row][col].projected;
                if (!p) continue;
                if (!started) { ctx.moveTo(p.sx, p.sy); started = true; }
                else { ctx.lineTo(p.sx, p.sy); }
            }
            ctx.stroke();
        }

        // Central ambient glow
        var glowGrad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.min(W, H) * 0.5);
        glowGrad.addColorStop(0, 'rgba(139, 92, 246, 0.05)');
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, W, H);

        frameId = requestAnimationFrame(renderWaves3D);
    }

    renderWaves3D();

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

    // ---- Set initial states: LAUNCHED from off-screen edges ----
    function getThrowOrigin() {
        var edge = Math.floor(Math.random() * 4);
        var spread = (Math.random() - 0.5) * W * 1.5;
        if (edge === 0) return { x: spread, y: -(800 + Math.random() * 1500) };
        if (edge === 1) return { x: W + 500 + Math.random() * 1500, y: spread };
        if (edge === 2) return { x: spread, y: H + 500 + Math.random() * 1500 };
        return { x: -(W + 500 + Math.random() * 1500), y: spread };
    }

    chars1.forEach(function (ch) {
        var origin = getThrowOrigin();
        gsap.set(ch, {
            x: origin.x, y: origin.y,
            rotation: (Math.random() - 0.5) * 720,
            scale: 0.4 + Math.random() * 0.6,
            opacity: 1
        });
    });

    chars2.forEach(function (ch) {
        var origin = getThrowOrigin();
        gsap.set(ch, {
            x: origin.x, y: origin.y,
            rotation: (Math.random() - 0.5) * 540,
            scale: 0.4 + Math.random() * 0.6,
            opacity: 1
        });
    });

    // ---- Master Timeline ----
    var tl = gsap.timeline();

    // Phase 1: THROWN IN — letters fly from off-screen at high speed
    tl.to(chars1, {
        x: 0, y: 0, rotation: 0, scale: 1,
        duration: 0.9,
        stagger: { each: 0.06, from: "edges" },
        ease: "back.out(1.4)"
    }, 0.5)
        .to(chars2, {
            x: 0, y: 0, rotation: 0, scale: 1,
            duration: 0.8,
            stagger: { each: 0.04, from: "edges" },
            ease: "back.out(1.2)"
        }, 0.9)

        // Phase 2: Impact flash
        .to(chars1, {
            textShadow: "0 0 50px rgba(139, 92, 246, 1), 0 0 100px rgba(139, 92, 246, 0.6), 0 0 150px rgba(139, 92, 246, 0.3)",
            duration: 0.2, ease: "power2.out"
        })
        .to(chars2, {
            textShadow: "0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.3)",
            color: "rgba(255, 255, 255, 0.9)",
            duration: 0.2, ease: "power2.out"
        }, "<")

        // Phase 3: Glow settles
        .to(allChars, {
            textShadow: "0 0 10px rgba(139, 92, 246, 0.2)",
            duration: 0.6, ease: "power2.out"
        })

        // Phase 4: Hold
        .to({}, { duration: 0.8 })

        // Phase 5: Reveal line
        .to(revealLine, { scaleX: 1, duration: 0.6, ease: "power4.inOut" })

        // Phase 6: Text fades out
        .to(content, { opacity: 0, scale: 0.95, duration: 0.4, ease: "power3.in" }, "-=0.2")
        .to(canvas, { opacity: 0, duration: 0.4, ease: "power2.in" }, "<")

        // Phase 7: Panels split — eyelid reveal
        .to(panelTop, { yPercent: -100, duration: 1.2, ease: "power4.inOut" })
        .to(panelBottom, { yPercent: 100, duration: 1.2, ease: "power4.inOut" }, "<")
        .to(revealLine, { opacity: 0, scaleY: 20, duration: 0.6, ease: "power2.in" }, "<")

        // Phase 8: Cleanup
        .call(function () {
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

    // Fail-safe
    setTimeout(function () {
        if (panelTop && panelTop.style.display !== 'none') {
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
        }
    }, 10000);
}

// Start Intro immediately
playIntroAtStart();
