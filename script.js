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
// INTRO ANIMATION - DIGITAL DECODE
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

    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const word1 = 'Arrakis';
    const word2 = 'Technologies';

    // ---- Create character spans ----
    function createCharSpans(word, container) {
        const spans = [];
        word.split('').forEach(ch => {
            const span = document.createElement('span');
            span.className = 'decode-char';
            span.dataset.target = ch.toUpperCase();
            span.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
            container.appendChild(span);
            spans.push(span);
        });
        return spans;
    }

    const chars1 = createCharSpans(word1, line1);
    const chars2 = createCharSpans(word2, line2);
    const allChars = [...chars1, ...chars2];

    // ---- Canvas: Animated dark gradient mesh ----
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    const W = window.innerWidth;
    const H = window.innerHeight;
    let time = 0;
    let frameId;

    // Ambient orbs
    const orbs = [];
    for (let i = 0; i < 6; i++) {
        orbs.push({
            x: W * (0.2 + Math.random() * 0.6),
            y: H * (0.2 + Math.random() * 0.6),
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: 200 + Math.random() * 300,
            hue: 260 + Math.random() * 20,
            alpha: 0.04 + Math.random() * 0.03
        });
    }

    function renderBackground() {
        time += 0.005;
        ctx.clearRect(0, 0, W, H);

        // Deep dark background
        ctx.fillStyle = '#020010';
        ctx.fillRect(0, 0, W, H);

        // Move and draw ambient orbs
        orbs.forEach(o => {
            o.x += o.vx;
            o.y += o.vy;
            if (o.x < 0 || o.x > W) o.vx *= -1;
            if (o.y < 0 || o.y > H) o.vy *= -1;

            const pulse = 1 + Math.sin(time * 2 + o.x * 0.01) * 0.15;
            const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.radius * pulse);
            grad.addColorStop(0, `hsla(${o.hue}, 70%, 30%, ${o.alpha})`);
            grad.addColorStop(0.5, `hsla(${o.hue}, 60%, 15%, ${o.alpha * 0.4})`);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fillRect(o.x - o.radius * pulse, o.y - o.radius * pulse, o.radius * 2 * pulse, o.radius * 2 * pulse);
        });

        // Subtle horizontal scan line (very faint)
        const scanY = (time * 80) % H;
        const scanGrad = ctx.createLinearGradient(0, scanY - 1, 0, scanY + 1);
        scanGrad.addColorStop(0, 'transparent');
        scanGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.04)');
        scanGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = scanGrad;
        ctx.fillRect(0, scanY - 1, W, 2);

        frameId = requestAnimationFrame(renderBackground);
    }

    renderBackground();

    // ---- Digital Decode Logic ----
    // Phase 1: Scramble all characters rapidly
    let scrambleIntervals = [];

    allChars.forEach(span => {
        span.classList.add('decoding');
        const interval = setInterval(() => {
            span.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
        }, 50);
        scrambleIntervals.push({ span, interval });
    });

    // Phase 2: Resolve letters one by one with delay
    function resolveChar(span, interval, delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                clearInterval(interval);

                // Quick final scramble burst (faster)
                let burstCount = 0;
                const burst = setInterval(() => {
                    span.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
                    burstCount++;
                    if (burstCount >= 6) {
                        clearInterval(burst);
                        // Lock in correct character
                        span.textContent = span.dataset.target;
                        span.classList.remove('decoding');
                        span.classList.add('flash');

                        // Flash then settle to resolved
                        setTimeout(() => {
                            span.classList.remove('flash');
                            span.classList.add('resolved');
                        }, 150);

                        resolve();
                    }
                }, 30);
            }, delay);
        });
    }

    // Resolve line 1 first, then line 2
    const startDelay = 800; // Start resolving after initial scramble
    const charDelay = 100; // Time between each char resolve

    // Resolve "Arrakis"
    chars1.forEach((span, i) => {
        const { interval } = scrambleIntervals[i];
        resolveChar(span, interval, startDelay + i * charDelay);
    });

    // Resolve "Technologies" (starts slightly before line 1 finishes)
    const line2StartDelay = startDelay + chars1.length * charDelay - 200;
    chars2.forEach((span, i) => {
        const { interval } = scrambleIntervals[chars1.length + i];
        resolveChar(span, interval, line2StartDelay + i * (charDelay * 0.7));
    });

    // Phase 3: After all resolved → glow pulse → reveal
    const totalDuration = line2StartDelay + chars2.length * (charDelay * 0.7) + 400;

    setTimeout(() => {
        // Glow pulse on all resolved chars
        gsap.to(allChars, {
            textShadow: "0 0 30px rgba(139, 92, 246, 0.9), 0 0 60px rgba(139, 92, 246, 0.4), 0 0 100px rgba(139, 92, 246, 0.15)",
            duration: 0.5,
            ease: "power2.inOut"
        });

        // Settle glow
        gsap.to(allChars, {
            textShadow: "0 0 15px rgba(139, 92, 246, 0.4), 0 0 30px rgba(139, 92, 246, 0.15)",
            duration: 0.4,
            delay: 0.5,
            ease: "power2.out"
        });

        // Hold, then reveal
        gsap.to(allChars, {
            scale: 1.3,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.8,
            delay: 1.2,
            stagger: 0.01,
            ease: "power3.in"
        });

        gsap.to(loader, {
            opacity: 0,
            duration: 0.6,
            delay: 1.8,
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
        });
    }, totalDuration);

    // Fail-safe
    setTimeout(() => {
        if (loader.style.display !== 'none') {
            cancelAnimationFrame(frameId);
            scrambleIntervals.forEach(s => clearInterval(s.interval));
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
