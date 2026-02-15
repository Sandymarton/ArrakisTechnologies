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
// INTRO ANIMATION - SOUND WAVES + MAGNETIC ASSEMBLY
// ==========================================
let heroAnimationsStarted = false;

function playIntroAtStart() {
    const loader = document.getElementById('loader');
    const canvas = document.getElementById('loaderCanvas');
    const panelTop = document.getElementById('loaderOverlayTop');
    const panelBottom = document.getElementById('loaderOverlayBottom');
    const content = document.getElementById('loaderContent');
    const line1 = document.getElementById('loaderLine1');
    const line2 = document.getElementById('loaderLine2');
    const revealLine = document.getElementById('loaderRevealLine');

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

    // ---- Canvas: Animated Sound Waves ----
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    const W = window.innerWidth;
    const H = window.innerHeight;
    let time = 0;
    let frameId;

    // Sound wave config — multiple waves with different properties
    const waves = [];
    for (let i = 0; i < 8; i++) {
        waves.push({
            amplitude: 15 + Math.random() * 50,
            frequency: 0.003 + Math.random() * 0.006,
            speed: 0.5 + Math.random() * 1.5,
            phase: Math.random() * Math.PI * 2,
            yOffset: H * (0.15 + (i / 8) * 0.7),
            hue: 250 + Math.random() * 30,
            alpha: 0.08 + Math.random() * 0.15,
            lineWidth: 1 + Math.random() * 1.5
        });
    }

    function renderWaves() {
        time += 0.016;
        ctx.clearRect(0, 0, W, H);

        // Deep black background
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);

        // Draw each sound wave
        waves.forEach(wave => {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${wave.hue}, 80%, 55%, ${wave.alpha})`;
            ctx.lineWidth = wave.lineWidth;
            ctx.shadowColor = `hsla(${wave.hue}, 90%, 50%, ${wave.alpha * 0.6})`;
            ctx.shadowBlur = 12;

            for (let x = 0; x <= W; x += 2) {
                const y = wave.yOffset +
                    Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude +
                    Math.sin(x * wave.frequency * 2.3 + time * wave.speed * 0.7) * wave.amplitude * 0.3;

                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
            ctx.shadowBlur = 0;
        });

        // Central ambient glow
        const glowGrad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.min(W, H) * 0.4);
        glowGrad.addColorStop(0, 'rgba(139, 92, 246, 0.06)');
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, W, H);

        frameId = requestAnimationFrame(renderWaves);
    }

    renderWaves();

    // ---- Create letter spans ----
    'ARRAKIS'.split('').forEach(ch => {
        const span = document.createElement('span');
        span.className = 'intro-char';
        span.textContent = ch;
        line1.appendChild(span);
    });

    'TECHNOLOGIES'.split('').forEach(ch => {
        const span = document.createElement('span');
        span.className = 'intro-char';
        span.textContent = ch;
        line2.appendChild(span);
    });

    const chars1 = line1.querySelectorAll('.intro-char');
    const chars2 = line2.querySelectorAll('.intro-char');
    const allChars = [...chars1, ...chars2];

    // ---- Set initial states: scattered randomly ----
    chars1.forEach(ch => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 400 + Math.random() * 600;
        gsap.set(ch, {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            rotation: (Math.random() - 0.5) * 360,
            scale: 0.3 + Math.random() * 0.5,
            opacity: 0
        });
    });

    chars2.forEach(ch => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 300 + Math.random() * 500;
        gsap.set(ch, {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            rotation: (Math.random() - 0.5) * 360,
            scale: 0.3 + Math.random() * 0.5,
            opacity: 0
        });
    });

    // ---- Master Timeline ----
    const tl = gsap.timeline();

    // Phase 1: Letters appear scattered (fade in at random positions)
    tl.to(allChars, {
        opacity: 0.4,
        duration: 0.6,
        stagger: { each: 0.03, from: "random" },
        ease: "power2.out"
    }, 0.3)

        // Phase 2: MAGNETIC PULL — letters fly to position
        // Slow start → fast end = power4.in (like being sucked in by a magnet)
        .to(chars1, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 1.4,
            stagger: { each: 0.04, from: "center" },
            ease: "power4.in"
        }, 1.0)
        .to(chars2, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            stagger: { each: 0.03, from: "center" },
            ease: "power4.in"
        }, 1.2)

        // Phase 3: Snap impact — slight elastic overshoot on landing
        .to(chars1, {
            textShadow: "0 0 40px rgba(139, 92, 246, 1), 0 0 80px rgba(139, 92, 246, 0.5), 0 0 120px rgba(139, 92, 246, 0.2)",
            scale: 1.05,
            duration: 0.15,
            ease: "power2.out"
        })
        .to(chars1, {
            scale: 1,
            duration: 0.3,
            ease: "elastic.out(1.2, 0.4)"
        })

        // Phase 3b: Subtitle glow
        .to(chars2, {
            textShadow: "0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.2)",
            color: "rgba(255, 255, 255, 0.85)",
            duration: 0.4,
            ease: "power2.out"
        }, "<")

        // Phase 4: Glow settles to soft
        .to(allChars, {
            textShadow: "0 0 10px rgba(139, 92, 246, 0.15)",
            duration: 0.5,
            ease: "power2.out"
        })

        // Phase 5: Hold — viewer reads
        .to({}, { duration: 0.8 })

        // Phase 6: Reveal line sweeps in
        .to(revealLine, {
            scaleX: 1,
            duration: 0.6,
            ease: "power4.inOut"
        })

        // Phase 7: Text fades out
        .to(content, {
            opacity: 0,
            scale: 0.95,
            duration: 0.4,
            ease: "power3.in"
        }, "-=0.2")

        // Canvas fades
        .to(canvas, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in"
        }, "<")

        // Phase 8: Panels split — eyelid reveal
        .to(panelTop, {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut"
        })
        .to(panelBottom, {
            yPercent: 100,
            duration: 1.2,
            ease: "power4.inOut"
        }, "<")
        .to(revealLine, {
            opacity: 0,
            scaleY: 20,
            duration: 0.6,
            ease: "power2.in"
        }, "<")

        // Phase 9: Cleanup
        .call(() => {
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
    setTimeout(() => {
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

