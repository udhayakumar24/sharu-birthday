// --- HAPTIC FEEDBACK HELPER (MOBILE VIBRATION) ---
function triggerHaptic(pattern = 20) {
    if ('vibrate' in navigator) {
        try {
            navigator.vibrate(pattern);
        } catch (e) {
            console.log('Vibration blocked by browser policy');
        }
    }
}

// Ensure execution after DOM load
document.addEventListener('DOMContentLoaded', () => {

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

    // --- 3. GATEWAY DRONE UNLOCK ---
    const droneTarget = document.getElementById('drone-target');
    const unlockOverlay = document.getElementById('unlock-overlay');
    const storyboard = document.getElementById('storyboard');
    const bgMusic = document.getElementById('bg-music');
    const musicIndicator = document.getElementById('music-indicator');

    let gatewayTriggered = false;

    if (droneTarget) {
        droneTarget.addEventListener('click', () => {
            if (gatewayTriggered) return;
            gatewayTriggered = true;
            
            triggerHaptic([40, 30, 60]); 

            requestAnimationFrame(() => {
                droneTarget.classList.add('drone-zoom-active');
            });

            setTimeout(() => {
                if (bgMusic) {
                    bgMusic.play().then(() => {
                        if (musicIndicator) musicIndicator.innerText = "🎵 Music Playing...";
                    }).catch(err => {
                        if (musicIndicator) musicIndicator.innerText = "🔇 Tap to Play Song";
                    });
                }
            }, 150);

            setTimeout(() => {
                if (unlockOverlay) unlockOverlay.style.opacity = '0';
                setTimeout(() => {
                    if (unlockOverlay) unlockOverlay.style.display = 'none';
                    if (storyboard) storyboard.classList.remove('opacity-0');
                    initScratchCard();
                }, 800);
            }, 1200);
        });
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

    if (smileBtn && smileModal) {
        smileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerHaptic(25);
            const randomQuote = smileQuotes[Math.floor(Math.random() * smileQuotes.length)];
            smileText.innerText = `"${randomQuote}"`;
            
            smileModal.classList.remove('opacity-0', 'pointer-events-none');
            smileCard.classList.remove('scale-90');
            smileCard.classList.add('scale-100');
        });

        closeSmileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerHaptic(15);
            smileModal.classList.add('opacity-0', 'pointer-events-none');
            smileCard.classList.remove('scale-100');
            smileCard.classList.add('scale-90');
        });

        smileModal.addEventListener('click', (e) => {
            if (e.target === smileModal) {
                closeSmileBtn.click();
            }
        });
    }

    // --- 6. SCRATCH CARD MECHANICS WITH THROTTLED HAPTICS ---
    let scratchInited = false;
    function initScratchCard() {
        if (scratchInited) return;
        const wishCanvas = document.getElementById('wish-canvas');
        if (!wishCanvas) return;
        scratchInited = true;

        const wCtx = wishCanvas.getContext('2d');
        let isScratching = false;
        let lastVibrateTime = 0;

        wishCanvas.width = wishCanvas.parentElement.offsetWidth;
        wishCanvas.height = wishCanvas.parentElement.offsetHeight;
        
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
});
