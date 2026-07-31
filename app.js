// --- HAPTIC FEEDBACK HELPER (MOBILE VIBRATION) ---
function triggerHaptic(pattern = 20) {
    if ('vibrate' in navigator) {
        try {
            navigator.vibrate(pattern);
        } catch (e) {
            console.log('Vibration blocked');
        }
    }
}

// --- 1. AMBIENT PETALS & BUTTERFLIES ENGINE ---
const petalContainer = document.getElementById('petal-container');
const butterflyContainer = document.getElementById('butterfly-container');

function spawnPetal() {
    if (!petalContainer) return;
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.innerText = Math.random() > 0.5 ? '🌸' : '🌹';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = Math.random() * 3 + 4 + 's';
    petal.style.fontSize = Math.random() * 10 + 12 + 'px';
    petalContainer.appendChild(petal);
    setTimeout(() => { petal.remove(); }, 7000);
}
setInterval(spawnPetal, 400);

function spawnButterfly() {
    if (!butterflyContainer) return;
    const bf = document.createElement('div');
    bf.className = 'butterfly';
    bf.innerText = '🦋';
    bf.style.left = Math.random() * 90 + 'vw';
    bf.style.animationDuration = Math.random() * 5 + 6 + 's';
    butterflyContainer.appendChild(bf);
    setTimeout(() => { bf.remove(); }, 11000);
}
setInterval(spawnButterfly, 1500);

// --- 2. RELIABLE SHARU IMAGE FALLBACK ENGINE ---
const sharuImg = document.getElementById('sharu-img');
if (sharuImg) {
    const fallbacks = ['sharu.jpg', 'sharu.png', 'sharu.jpeg', 'sharu.JPG', 'sharu.PNG'];
    let fallbackIdx = 0;
    sharuImg.onerror = function() {
        fallbackIdx++;
        if (fallbackIdx < fallbacks.length) {
            sharuImg.src = fallbacks[fallbackIdx];
        } else {
            sharuImg.parentElement.innerHTML = '<div class="w-full h-full bg-pink-100 rounded-xl flex items-center justify-center text-rose-500 font-serif text-base font-bold text-center p-4">Sharu Ma 💖<br><span class="text-[10px] text-gray-500 font-sans mt-1 block">(Place sharu.jpg in project folder)</span></div>';
        }
    };
}

// --- 3. GATEWAY DRONE UNLOCK ENGINE ---
const droneTarget = document.getElementById('drone-target');
const unlockOverlay = document.getElementById('unlock-overlay');
const storyboard = document.getElementById('storyboard');
const bgMusic = document.getElementById('bg-music');
const musicIndicator = document.getElementById('music-indicator');

let gatewayTriggered = false;

function openGateway() {
    if (gatewayTriggered) return;
    gatewayTriggered = true;
    
    triggerHaptic([40, 30, 60]); 

    if (droneTarget) {
        droneTarget.classList.add('drone-zoom-active');
    }

    if (bgMusic) {
        bgMusic.play().then(() => {
            if (musicIndicator) musicIndicator.innerText = "🎵 Music Playing...";
        }).catch(err => {
            if (musicIndicator) musicIndicator.innerText = "🔇 Tap to Play Song";
        });
    }

    setTimeout(() => {
        if (unlockOverlay) unlockOverlay.style.opacity = '0';
        setTimeout(() => {
            if (unlockOverlay) unlockOverlay.style.display = 'none';
            if (storyboard) storyboard.classList.remove('opacity-0');
        }, 800);
    }, 1200);
}

// Unified listener: Works for both mobile taps & desktop clicks seamlessly
if (unlockOverlay) {
    unlockOverlay.addEventListener('click', openGateway);
}

if (musicIndicator) {
    musicIndicator.addEventListener('click', () => {
        triggerHaptic(15);
        if (bgMusic) {
            if (bgMusic.paused) {
                bgMusic.play();
                musicIndicator.innerText = "🎵 Music Playing...";
            } else {
                bgMusic.pause();
                musicIndicator.innerText = "🔇 Music Paused";
            }
        }
    });
}

// --- 4. 3D DRONE STORYBOARD NAVIGATION ENGINE ---
const cards = document.querySelectorAll('.story-card');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const stepCounter = document.getElementById('step-counter');

let currentStep = 1;
const totalSteps = cards.length;

function updateDroneView() {
    cards.forEach((card) => {
        const step = parseInt(card.dataset.step);
        card.classList.remove('card-active', 'card-hidden-next', 'card-hidden-prev');

        if (step === currentStep) {
            card.classList.add('card-active');
        } else if (step < currentStep) {
            card.classList.add('card-hidden-prev');
        } else {
            card.classList.add('card-hidden-next');
        }
    });

    if (stepCounter) stepCounter.innerText = `Chapter ${currentStep} of ${totalSteps}`;

    if (prevBtn) {
        if (currentStep === 1) {
            prevBtn.style.opacity = '0.4';
            prevBtn.style.pointerEvents = 'none';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
        }
    }

    if (nextBtn) {
        if (currentStep === totalSteps) {
            nextBtn.innerText = "Replay Story 🔄";
        } else {
            nextBtn.innerText = "Next Chapter ➔";
        }
    }

    // Initialize scratch card when navigating to Chapter 2
    if (currentStep === 2) {
        setTimeout(initScratchCard, 300);
    }

    // Trigger confetti burst when user hits Chapter 6
    if (currentStep === 6) {
        triggerConfetti();
    }
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        triggerHaptic(30);
        if (currentStep < totalSteps) {
            currentStep++;
        } else {
            currentStep = 1;
        }
        updateDroneView();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        triggerHaptic(20);
        if (currentStep > 1) {
            currentStep--;
            updateDroneView();
        }
    });
}

// --- 5. DAILY SMILE ENVELOPE MODAL ENGINE ---
const smileQuotes = [
    "Did you know? Your smile literally resets my whole bad day.",
    "Warning: Kutty Paiyan is currently thinking about you.",
    "You're still my favorite notification.",
    "Hey thoongumoonji, innaikum thoongidatha 😴🤪",
    "Hey patts papa 🤪😍",
    "Hey cutie pie, my cupy cake. 😍😋",
    "Reminder: You owe Kutty Paiyan one big hug! 🤗",
    "Enna paatha udane siripu varudha? 😜❤️"
];

const smileBtn = document.getElementById('smile-btn');
const smileModal = document.getElementById('smile-modal');
const smileCard = document.getElementById('smile-card');
const smileText = document.getElementById('smile-text');
const closeSmileBtn = document.getElementById('close-smile-btn');

function openSmileModal(e) {
    if (e) e.stopPropagation();
    triggerHaptic(25);
    const randomQuote = smileQuotes[Math.floor(Math.random() * smileQuotes.length)];
    if (smileText) smileText.innerText = `"${randomQuote}"`;
    
    if (smileModal && smileCard) {
        smileModal.classList.remove('opacity-0', 'pointer-events-none');
        smileCard.classList.remove('scale-90');
        smileCard.classList.add('scale-100');
    }
}

if (smileBtn) {
    smileBtn.addEventListener('click', openSmileModal);
}

if (closeSmileBtn) {
    closeSmileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerHaptic(15);
        if (smileModal && smileCard) {
            smileModal.classList.add('opacity-0', 'pointer-events-none');
            smileCard.classList.remove('scale-100');
            smileCard.classList.add('scale-90');
        }
    });
}

if (smileModal) {
    smileModal.addEventListener('click', (e) => {
        if (e.target === smileModal) {
            closeSmileBtn.click();
        }
    });
}

// --- 6. SCRATCH CARD MECHANICS WITH THROTTLED HAPTICS ---
let scratchInited = false;
function initScratchCard() {
    const wishCanvas = document.getElementById('wish-canvas');
    if (!wishCanvas) return;

    const rect = wishCanvas.parentElement.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    wishCanvas.width = rect.width;
    wishCanvas.height = rect.height;

    if (scratchInited) return;
    scratchInited = true;

    const wCtx = wishCanvas.getContext('2d');
    let isScratching = false;
    let lastVibrateTime = 0;

    wCtx.fillStyle = '#FF69B4'; 
    wCtx.fillRect(0, 0, wishCanvas.width, wishCanvas.height);
    
    wCtx.fillStyle = '#FFFFFF';
    wCtx.font = 'bold 12px sans-serif';
    wCtx.textAlign = 'center';
    wCtx.fillText('SCRATCH TO READ MY LETTER', wishCanvas.width / 2, wishCanvas.height / 2);

    function rub(e) {
        if (!isScratching) return;

        const now = Date.now();
        if (now - lastVibrateTime > 120) {
            triggerHaptic(15);
            lastVibrateTime = now;
        }
        
        const bounds = wishCanvas.getBoundingClientRect();
        const posX = e.touches ? e.touches[0].clientX : e.clientX;
        const posY = e.touches ? e.touches[0].clientY : e.clientY;
        
        wCtx.globalCompositeOperation = 'destination-out';
        wCtx.beginPath(); 
        wCtx.arc(posX - bounds.left, posY - bounds.top, 24, 0, Math.PI * 2); 
        wCtx.fill();
    }

    wishCanvas.addEventListener('mousedown', () => isScratching = true);
    wishCanvas.addEventListener('mouseup', () => isScratching = false);
    wishCanvas.addEventListener('mousemove', rub);
    wishCanvas.addEventListener('touchstart', (e) => { isScratching = true; rub(e); });
    wishCanvas.addEventListener('touchend', () => isScratching = false);
    wishCanvas.addEventListener('touchmove', rub);
}

// --- 7. LIVE TIME TOGETHER COUNTER ENGINE ---
const START_DATE = new Date('2023-07-19T00:00:00'); 

function updateCounter() {
    const daysEl = document.getElementById('counter-days');
    const hoursEl = document.getElementById('counter-hours');
    const minsEl = document.getElementById('counter-mins');
    const secsEl = document.getElementById('counter-secs');

    if (!daysEl) return;

    const now = new Date();
    const diffInMs = now - START_DATE;

    if (diffInMs < 0) return;

    const totalSeconds = Math.floor(diffInMs / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysEl.innerText = days;
    hoursEl.innerText = String(hours).padStart(2, '0');
    minsEl.innerText = String(minutes).padStart(2, '0');
    secsEl.innerText = String(seconds).padStart(2, '0');
}

updateCounter();
setInterval(updateCounter, 1000);

// --- 8. AMBIENT NIGHT / GLOW TOGGLE LOGIC ---
window.toggleTheme = function() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    body.classList.toggle('dark-glow');
    
    if (themeIcon) {
        if (body.classList.contains('dark-glow')) {
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌙';
        }
    }
};

// --- 9. CELEBRATION CONFETTI TRIGGER ---
function triggerConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
        });
        
        setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        }, 250);
    }
}
    // --- 10. BLOW OUT THE CANDLE ENGINE ---
let candleBlown = false;

function extinguishCandle() {
    if (candleBlown) return;
    candleBlown = true;

    triggerHaptic([50, 50, 100]);

    const flame = document.getElementById('candle-flame');
    const smoke = document.getElementById('candle-smoke');
    const status = document.getElementById('wish-status');

    if (flame) {
        flame.classList.add('scale-0', 'opacity-0');
        setTimeout(() => flame.style.display = 'none', 500);
    }

    if (smoke) {
        smoke.classList.remove('hidden');
        setTimeout(() => smoke.classList.remove('opacity-0'), 100);
    }

    if (status) {
        status.innerText = "✨ Your wish is sent to the universe! Happy Birthday Sharu Ma! 🎉";
        status.classList.replace('text-rose-500', 'text-emerald-600');
    }

    // Huge celebration confetti explosion
    triggerConfetti();
    setTimeout(triggerConfetti, 400);
}

// 1. Direct Tap / Touch Trigger
const cakeContainer = document.getElementById('cake-container');
if (cakeContainer) {
    cakeContainer.addEventListener('click', extinguishCandle);
    cakeContainer.addEventListener('touchstart', extinguishCandle, { passive: true });
}

// 2. Web Audio Microphone Blow Detector
const micBtn = document.getElementById('mic-btn');
if (micBtn) {
    micBtn.addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);
            const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

            analyser.smoothingTimeConstant = 0.8;
            analyser.fftSize = 1024;

            microphone.connect(analyser);
            analyser.connect(javascriptNode);
            javascriptNode.connect(audioContext.destination);

            micBtn.innerText = "🎙️ Super.front cam paathu Oothunga ippo!";
            micBtn.classList.add('bg-emerald-100', 'text-emerald-700');

            javascriptNode.onaudioprocess = () => {
                const array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                let values = 0;

                for (let i = 0; i < array.length; i++) {
                    values += array[i];
                }

                const average = values / array.length;

                // Threshold check for blowing wind sound into mic
                if (average > 18 && !candleBlown) {
                    extinguishCandle();
                    micBtn.innerText = "✨ Wish Granted pattu!";
                    stream.getTracks().forEach(track => track.stop()); // Stop mic recording
                }
            };
        } catch (err) {
            console.log("Mic access denied/unsupported:", err);
            micBtn.innerText = "Tap the candle directly instead! 🕯️";
        }
    });
}

// --- Love Meter Hold-to-Charge Feature ---
const holdBtn = document.getElementById('love-hold-btn');
const progressBar = document.getElementById('love-progress-bar');
const percentageText = document.getElementById('love-percentage');

let holdTimer = null;
let loveProgress = 0;
let isMaxed = false;

function startCharging(e) {
    if (e.cancelable) e.preventDefault(); // Prevents default touch hold menus
    if (isMaxed) return;

    // Start fill loop
    holdTimer = setInterval(() => {
        if (loveProgress < 1000) {
            // Speed up as it gets higher
            loveProgress += loveProgress > 100 ? 15 : 5;
            
            // Limit display percentage up to 1000%
            const displayValue = Math.min(loveProgress, 1000);
            progressBar.style.width = Math.min((loveProgress / 1000) * 100, 100) + '%';
            percentageText.innerText = `${displayValue}%`;

            // Mobile Haptic Vibrations (Increases intensity feel)
            if (navigator.vibrate) {
                navigator.vibrate(20);
            }
        } else {
            // Max reached! Trigger overload event
            triggerLoveOverload();
        }
    }, 40);
}

function stopCharging() {
    if (isMaxed) return;
    clearInterval(holdTimer);
    
    // Smoothly reset if released before 1000%
    const resetInterval = setInterval(() => {
        if (loveProgress > 0) {
            loveProgress -= 25;
            if (loveProgress < 0) loveProgress = 0;
            progressBar.style.width = Math.min((loveProgress / 1000) * 100, 100) + '%';
            percentageText.innerText = `${loveProgress}%`;
        } else {
            clearInterval(resetInterval);
        }
    }, 20);
}

function triggerLoveOverload() {
    clearInterval(holdTimer);
    isMaxed = true;
    
    percentageText.innerText = "1000% OVERLOAD! 💥❤️";
    holdBtn.innerText = "♾️ INFINITE LOVE UNLOCKED! ♾️";
    holdBtn.classList.remove('bg-pink-500');
    holdBtn.classList.add('bg-gradient-to-r', 'from-red-500', 'to-yellow-500', 'animate-bounce');

    // Heavy haptic burst
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 300]);
    }

    // Canvas Confetti Explosion
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.7 },
            colors: ['#ff007f', '#ff4500', '#ffd700']
        });
    }
}

// Event Listeners for Touch & Mouse
if (holdBtn) {
    holdBtn.addEventListener('touchstart', startCharging, { passive: false });
    holdBtn.addEventListener('touchend', stopCharging);
    holdBtn.addEventListener('mousedown', startCharging);
    holdBtn.addEventListener('mouseup', stopCharging);
    holdBtn.addEventListener('mouseleave', stopCharging);
}
// ==========================================
// CHAPTER 4: CATCH ME IF YOU CAN GAME LOGIC
// ==========================================
function initDodgingGame() {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const arena = document.getElementById('game-arena');
    const hintText = document.getElementById('game-hint');

    if (!noBtn || !yesBtn || !arena) return;

    let dodgeCount = 0;
    const hints = [
        "Nice try! Too slow! ⚡",
        "Oops! Almost got it! 🤪",
        "Nope, not allowed! 🙈",
        "Just click YES already! ❤️",
        "I can dodge this all day! 🏃‍♂️",
        "No isn't an option, Sharu Ma! 🥰"
    ];

    function dodge(e) {
        // Prevent default touch scrolling when tapping on mobile
        if (e.type === 'touchstart') e.preventDefault();

        // Calculate maximum distances so the button stays inside the card
        const arenaBounds = arena.getBoundingClientRect();
        const btnBounds = noBtn.getBoundingClientRect();

        const maxX = (arenaBounds.width / 2) - (btnBounds.width / 2) - 10;
        const maxY = (arenaBounds.height / 2) - (btnBounds.height / 2) - 5;

        // Random coordinates
        const randomX = (Math.random() * (maxX * 2)) - maxX;
        const randomY = (Math.random() * (maxY * 2)) - maxY;

        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

        // Mobile haptic vibration feedback
        if ('vibrate' in navigator) {
            navigator.vibrate(25);
        }

        // Cycle through teasing hints
        if (hintText) {
            hintText.innerText = hints[dodgeCount % hints.length];
        }
        dodgeCount++;
    }

    // Attach dodging event listeners for mobile touch & desktop mouse
    noBtn.addEventListener('touchstart', dodge);
    noBtn.addEventListener('mouseover', dodge);
    noBtn.addEventListener('click', dodge);

    // YES Button Action
    yesBtn.addEventListener('click', () => {
        if ('vibrate' in navigator) {
            navigator.vibrate([50, 50, 100]);
        }
        
        // Trigger canvas-confetti if loaded
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        alert("I knew it! 100% correct answer, Sharu Ma! 🥰❤️✨");
    });
}

// Call function when DOM loaded
document.addEventListener('DOMContentLoaded', initDodgingGame);

// Function to handle opening any card
function openCard(cardNumber, reasonText) {
  const modal = document.getElementById('proposal-modal');
  const reasonDisplay = document.getElementById('selected-reason');

  // Display the specific reason she picked
  reasonDisplay.innerText = `You Picked Card #${cardNumber}: "${reasonText}"`;

  // Reveal the modal with a smooth fade in
  modal.classList.remove('hidden');

  // Optional: Trigger phone vibration if supported
  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 100]);
  }
}

// Function when she clicks YES on the proposal modal
function acceptProposal(message) {
  // Trigger sweet alert or celebration effects!
  alert(message);

  // Close modal or trigger confetti here!
  const modal = document.getElementById('proposal-modal');
  modal.classList.add('hidden');
}
