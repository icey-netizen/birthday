let audioCtx;
let isPlaying = false;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function handleStartExperience() {
    triggerSurprise();
    playFullBirthdaySong();
}

function playCrystalNote(freq, startTime, duration) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration);
}

function playFullBirthdaySong() {
    initAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    if (isPlaying) return; 
    isPlaying = true;
    document.getElementById('music-disk').classList.add('spinning');
    
    function runSequence() {
        if (!isPlaying) return;
        const now = audioCtx.currentTime;
        const tempo = 0.6; 
        const melody = [
            {f: 392.00, t: 0}, {f: 392.00, t: 0.5}, {f: 440.00, t: 1}, {f: 392.00, t: 2}, {f: 523.25, t: 3}, {f: 493.88, t: 4},
            {f: 392.00, t: 6}, {f: 392.00, t: 6.5}, {f: 440.00, t: 7}, {f: 392.00, t: 8}, {f: 587.33, t: 9}, {f: 523.25, t: 10},
            {f: 392.00, t: 12}, {f: 392.00, t: 12.5}, {f: 783.99, t: 13}, {f: 659.25, t: 14}, {f: 523.25, t: 15}, {f: 493.88, t: 16}, {f: 440.00, t: 17},
            {f: 698.46, t: 19}, {f: 698.46, t: 19.5}, {f: 659.25, t: 20}, {f: 523.25, t: 21}, {f: 587.33, t: 22}, {f: 523.25, t: 23}
        ];
        melody.forEach(note => {
            const start = now + (note.t * tempo);
            playCrystalNote(note.f, start, 2.5);
            playCrystalNote(note.f * 1.5, start + 0.02, 1.5);
        });
        setTimeout(runSequence, 16000); 
    }
    runSequence();
}

function triggerSurprise() {
    document.getElementById('message-overlay').style.display = 'flex';
    for(let i = 0; i < 40; i++) {
        setTimeout(createFallingHeart, i * 100);
    }
}

function closeSurprise() {
    document.getElementById('message-overlay').style.display = 'none';
}

function createFallingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-burst');
    heart.innerHTML = ['💖', '✨', '🌸', '🎂'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

/* Slideshow */
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => slide.style.display = i === index ? 'block' : 'none');
}

function changeSlide(n) {
    currentSlide += n;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;
    showSlide(currentSlide);
}

setInterval(() => changeSlide(1), 5000);
showSlide(currentSlide);