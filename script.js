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
// INTRO ANIMATION - 3D OBJECTS + GRAVITY
// ==========================================
let heroAnimationsStarted = false;

function playIntroAtStart() {
    const loader = document.getElementById('loader');
    const canvas = document.getElementById('loaderCanvas');
    const line1 = document.getElementById('loaderLine1');
    const line2 = document.getElementById('loaderLine2');
    const textWrapper = document.getElementById('loaderTextWrapper');
    if (!loader || !canvas || !line1 || !line2 || !textWrapper) return;

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

    // ---- Canvas: Animated 3D wireframe objects ----
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    const W = window.innerWidth;
    const H = window.innerHeight;
    let time = 0;
    let frameId;

    // ---- 3D Shape definitions ----
    function cubeVertices(s) {
        return [[-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s], [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s]];
    }
    const cubeEdges = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];

    function octaVertices(s) {
        return [[s, 0, 0], [-s, 0, 0], [0, s, 0], [0, -s, 0], [0, 0, s], [0, 0, -s]];
    }
    const octaEdges = [[0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]];

    function diamondVertices(s) {
        return [[0, -s * 1.5, 0], [s, 0, -s], [-s, 0, -s], [-s, 0, s], [s, 0, s], [0, s * 1.5, 0]];
    }
    const diamondEdges = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [2, 3], [3, 4], [4, 1], [5, 1], [5, 2], [5, 3], [5, 4]];

    // 3D projection
    function project(x, y, z, cx, cy, fov) {
        const scale = fov / (fov + z);
        return { x: cx + x * scale, y: cy + y * scale, s: scale };
    }

    // Rotate point
    function rotate(verts, ax, ay, az) {
        return verts.map(([x, y, z]) => {
            // Rotate X
            let y1 = y * Math.cos(ax) - z * Math.sin(ax);
            let z1 = y * Math.sin(ax) + z * Math.cos(ax);
            // Rotate Y
            let x1 = x * Math.cos(ay) + z1 * Math.sin(ay);
            let z2 = -x * Math.sin(ay) + z1 * Math.cos(ay);
            // Rotate Z
            let x2 = x1 * Math.cos(az) - y1 * Math.sin(az);
            let y2 = x1 * Math.sin(az) + y1 * Math.cos(az);
            return [x2, y2, z2];
        });
    }

    // Create 3D objects
    const shapes = [];
    const shapeTypes = ['cube', 'octa', 'diamond'];
    for (let i = 0; i < 14; i++) {
        const type = shapeTypes[i % 3];
        const size = 20 + Math.random() * 40;
        shapes.push({
            type,
            size,
            x: (Math.random() - 0.5) * W * 1.2,
            y: (Math.random() - 0.5) * H * 1.2,
            z: Math.random() * 400 + 100,
            rx: Math.random() * Math.PI * 2,
            ry: Math.random() * Math.PI * 2,
            rz: Math.random() * Math.PI * 2,
            drx: (Math.random() - 0.5) * 0.015,
            dry: (Math.random() - 0.5) * 0.015,
            drz: (Math.random() - 0.5) * 0.01,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            hue: 250 + Math.random() * 30,
            alpha: 0.15 + Math.random() * 0.25
        });
    }

    function renderBackground() {
        time += 0.005;
        ctx.clearRect(0, 0, W, H);

        // Deep dark background with subtle gradient
        const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
        bgGrad.addColorStop(0, '#08001a');
        bgGrad.addColorStop(1, '#020010');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);

        // Draw each 3D shape
        shapes.forEach(sh => {
            // Update rotation
            sh.rx += sh.drx;
            sh.ry += sh.dry;
            sh.rz += sh.drz;

            // Gentle drift
            sh.x += sh.vx;
            sh.y += sh.vy;
            if (sh.x < -W * 0.7 || sh.x > W * 0.7) sh.vx *= -1;
            if (sh.y < -H * 0.7 || sh.y > H * 0.7) sh.vy *= -1;

            // Get vertices and edges by type
            let verts, edges;
            if (sh.type === 'cube') {
                verts = cubeVertices(sh.size);
                edges = cubeEdges;
            } else if (sh.type === 'octa') {
                verts = octaVertices(sh.size);
                edges = octaEdges;
            } else {
                verts = diamondVertices(sh.size);
                edges = diamondEdges;
            }

            // Rotate
            const rotated = rotate(verts, sh.rx, sh.ry, sh.rz);

            // Project to 2D
            const cx = W / 2 + sh.x;
            const cy = H / 2 + sh.y;
            const projected = rotated.map(([x, y, z]) => project(x, y, z + sh.z, cx, cy, 600));

            // Draw edges with glow
            const depthAlpha = Math.max(0.05, 1 - sh.z / 600) * sh.alpha;
            ctx.strokeStyle = `hsla(${sh.hue}, 70%, 60%, ${depthAlpha})`;
            ctx.lineWidth = Math.max(0.5, 1.5 * (1 - sh.z / 600));
            ctx.shadowColor = `hsla(${sh.hue}, 80%, 50%, ${depthAlpha * 0.5})`;
            ctx.shadowBlur = 8;

            edges.forEach(([a, b]) => {
                ctx.beginPath();
                ctx.moveTo(projected[a].x, projected[a].y);
                ctx.lineTo(projected[b].x, projected[b].y);
                ctx.stroke();
            });

            // Draw vertices as dots
            ctx.shadowBlur = 4;
            projected.forEach(p => {
                ctx.beginPath();
                ctx.fillStyle = `hsla(${sh.hue}, 80%, 70%, ${depthAlpha * 0.8})`;
                ctx.arc(p.x, p.y, Math.max(1, 2.5 * p.s), 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.shadowBlur = 0;
        });

        frameId = requestAnimationFrame(renderBackground);
    }

    renderBackground();

    // ---- GSAP: Gravity drop letters ----
    const line1Letters = line1.querySelectorAll('.intro-letter');
    const line2Letters = line2.querySelectorAll('.intro-letter');
    const allLetters = document.querySelectorAll('.intro-letter');

    // Set each letter to a random position ABOVE the viewport
    line1Letters.forEach(letter => {
        gsap.set(letter, {
            y: -(300 + Math.random() * 500),
            x: (Math.random() - 0.5) * 100,
            rotation: (Math.random() - 0.5) * 40,
            opacity: 0
        });
    });

    line2Letters.forEach(letter => {
        gsap.set(letter, {
            y: -(250 + Math.random() * 400),
            x: (Math.random() - 0.5) * 60,
            rotation: (Math.random() - 0.5) * 30,
            opacity: 0
        });
    });

    const masterTL = gsap.timeline();

    // Phase 1: Letters fall with gravity (bounce on landing)
    masterTL.to(line1Letters, {
        y: 0,
        x: 0,
        rotation: 0,
        opacity: 1,
        duration: 1.2,
        stagger: {
            each: 0.07,
            from: "center"
        },
        ease: "bounce.out"
    })
        .to(line2Letters, {
            y: 0,
            x: 0,
            rotation: 0,
            opacity: 1,
            duration: 1.0,
            stagger: {
                each: 0.05,
                from: "center"
            },
            ease: "bounce.out"
        }, "-=0.6")

        // Phase 2: Glow pulse once assembled
        .to(line1Letters, {
            textShadow: "0 0 30px rgba(139, 92, 246, 1), 0 0 60px rgba(139, 92, 246, 0.5), 0 0 100px rgba(139, 92, 246, 0.2)",
            color: "#fff",
            duration: 0.6,
            ease: "power2.inOut"
        }, "+=0.1")
        .to(line2Letters, {
            textShadow: "0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.3)",
            color: "rgba(255, 255, 255, 0.85)",
            duration: 0.6,
            ease: "power2.inOut"
        }, "<")

        // Phase 3: Glow settles
        .to(allLetters, {
            textShadow: "0 0 12px rgba(139, 92, 246, 0.3)",
            duration: 0.4,
            ease: "power2.out"
        })

        // Phase 4: Hold
        .to({}, { duration: 0.5 })

        // Phase 5: ZOOM OUT reveal — text + wrapper scales down, fades
        .to(textWrapper, {
            scale: 0.4,
            opacity: 0,
            duration: 1.2,
            ease: "power3.inOut"
        })
        .to(loader, {
            opacity: 0,
            duration: 0.6,
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

