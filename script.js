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
// INTRO ANIMATION - PARTICLE TEXT ASSEMBLY
// ==========================================
let heroAnimationsStarted = false;

function playIntroAtStart() {
    const loader = document.getElementById('loader');
    const canvas = document.getElementById('loaderCanvas');
    if (!loader || !canvas) return;

    // Safety check
    if (typeof gsap === 'undefined') {
        loader.style.display = 'none';
        startHeroAnimations();
        return;
    }

    document.body.style.overflow = 'hidden';

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    const W = window.innerWidth;
    const H = window.innerHeight;

    // ---- Get text pixel data ----
    const fontSize = Math.min(W * 0.06, 60);
    const offscreen = document.createElement('canvas');
    offscreen.width = W;
    offscreen.height = H;
    const offCtx = offscreen.getContext('2d');

    // Draw "ARRAKIS" on first line, "TECHNOLOGIES" on second
    offCtx.fillStyle = '#fff';
    offCtx.font = `900 ${fontSize}px Inter, sans-serif`;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillText('ARRAKIS', W / 2, H / 2 - fontSize * 0.7);
    offCtx.fillText('TECHNOLOGIES', W / 2, H / 2 + fontSize * 0.7);

    // Sample pixels
    const imageData = offCtx.getImageData(0, 0, W, H);
    const pixels = imageData.data;
    const gap = 4; // Sample every 4 pixels for density
    const targets = [];

    for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
            const i = (y * W + x) * 4;
            if (pixels[i + 3] > 128) { // Alpha > 128
                targets.push({ x, y });
            }
        }
    }

    // ---- Create particles ----
    const particles = targets.map(t => {
        // Random start position (scattered)
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * Math.max(W, H) * 0.8 + 200;
        return {
            // Current position (start scattered)
            x: W / 2 + Math.cos(angle) * dist,
            y: H / 2 + Math.sin(angle) * dist,
            // Target position (text)
            tx: t.x,
            ty: t.y,
            // Visual properties
            size: Math.random() * 2.5 + 0.5,
            alpha: 0,
            // Color: mix of brand purple and accent orange
            hue: Math.random() > 0.7 ? 20 + Math.random() * 20 : 260 + Math.random() * 20,
            sat: 80 + Math.random() * 20,
            // Physics
            vx: 0,
            vy: 0,
            // State
            assembled: false,
            explodeAngle: Math.random() * Math.PI * 2,
            explodeSpeed: Math.random() * 8 + 3
        };
    });

    // ---- Background stars ----
    const stars = [];
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * W,
            y: Math.random() * H,
            size: Math.random() * 1.5 + 0.3,
            alpha: Math.random() * 0.6 + 0.1,
            twinkleSpeed: Math.random() * 0.02 + 0.005
        });
    }

    // ---- Animation state ----
    let phase = 'converge'; // converge -> hold -> explode -> fadeout
    let frameId;
    let time = 0;
    let holdTimer = 0;
    let explodeTimer = 0;
    let globalAlpha = 1;

    // GSAP: Animate particles to their target positions
    particles.forEach((p, i) => {
        const delay = Math.random() * 0.8;
        gsap.to(p, {
            x: p.tx,
            y: p.ty,
            alpha: 1,
            duration: 1.5 + Math.random() * 0.5,
            delay: delay,
            ease: "power3.inOut",
            onComplete: () => { p.assembled = true; }
        });
    });

    // After convergence, trigger hold then explode
    gsap.delayedCall(2.8, () => {
        phase = 'hold';
        gsap.delayedCall(0.8, () => {
            phase = 'explode';
            // Explode particles outward
            particles.forEach((p) => {
                gsap.to(p, {
                    x: p.x + Math.cos(p.explodeAngle) * p.explodeSpeed * 80,
                    y: p.y + Math.sin(p.explodeAngle) * p.explodeSpeed * 80,
                    alpha: 0,
                    size: 0,
                    duration: 1.2,
                    ease: "power2.in"
                });
            });
            gsap.delayedCall(0.6, () => {
                phase = 'fadeout';
                gsap.to({ val: 1 }, {
                    val: 0,
                    duration: 0.8,
                    ease: "power2.inOut",
                    onUpdate: function () { globalAlpha = this.targets()[0].val; },
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
            });
        });
    });

    // ---- Render loop ----
    function render() {
        time += 0.016;
        ctx.globalAlpha = globalAlpha;
        ctx.clearRect(0, 0, W, H);

        // Draw background
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);

        // Draw stars with twinkle
        stars.forEach(s => {
            const flicker = Math.sin(time * s.twinkleSpeed * 60) * 0.3 + 0.7;
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha * flicker})`;
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw particles
        particles.forEach(p => {
            if (p.alpha <= 0) return;
            ctx.beginPath();

            // Glow effect during hold phase
            let glowSize = p.size;
            let glowAlpha = p.alpha;
            if (phase === 'hold') {
                const pulse = Math.sin(time * 8) * 0.3 + 0.7;
                glowSize = p.size * (1 + pulse * 0.5);
                glowAlpha = p.alpha * (0.8 + pulse * 0.2);
            }

            // Outer glow
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize * 4);
            gradient.addColorStop(0, `hsla(${p.hue}, ${p.sat}%, 70%, ${glowAlpha * 0.8})`);
            gradient.addColorStop(0.4, `hsla(${p.hue}, ${p.sat}%, 50%, ${glowAlpha * 0.3})`);
            gradient.addColorStop(1, `hsla(${p.hue}, ${p.sat}%, 50%, 0)`);
            ctx.fillStyle = gradient;
            ctx.arc(p.x, p.y, glowSize * 4, 0, Math.PI * 2);
            ctx.fill();

            // Core
            ctx.beginPath();
            ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, 85%, ${glowAlpha})`;
            ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
            ctx.fill();
        });

        // Connecting lines during hold (subtle web effect)
        if (phase === 'hold') {
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.03)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i += 8) {
                for (let j = i + 8; j < particles.length; j += 8) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 30) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        frameId = requestAnimationFrame(render);
    }

    render();

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
    }, 7000);
}

// Start Intro immediately
playIntroAtStart();
