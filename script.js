// Floating Hearts Effect
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  document.querySelector(".heart-container").appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 300);

function updateTimer() {
  let birthDate = new Date("2008-03-24T19:10:00"); // Corrected birth time
  let now = new Date();
  
  let diff = now - birthDate;

  let years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  let months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
  let days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  updateElement("years", years);
  updateElement("months", months);
  updateElement("days", days);
  updateElement("hours", hours);
  updateElement("minutes", minutes);
  updateElement("seconds", seconds);
}

function updateElement(id, value) {
  let element = document.getElementById(id);
  if (element.innerText != value) {
      element.innerText = value;
      element.classList.add("glow-effect");
      setTimeout(() => element.classList.remove("glow-effect"), 500);
  }
}

// Update the timer every second
setInterval(updateTimer, 1000);

// Run immediately to avoid 1-second delay
updateTimer();

//music
let playpause_btn = document.querySelector('.playpause-track');
let seek_slider = document.querySelector('.seek_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let curr_track = document.createElement('audio');

curr_track.src = './assets/diewithasmile.mp3'; // Ensure the correct file path
let isPlaying = false;

// Load track details and set duration
curr_track.addEventListener('loadedmetadata', () => {
    total_duration.textContent = formatTime(curr_track.duration);
});

// Play/Pause function
function playpauseTrack() {
    if (isPlaying) {
        curr_track.pause();
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
    } else {
        curr_track.play();
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
    }
    isPlaying = !isPlaying;
}

// Update seek slider and time
curr_track.addEventListener('timeupdate', () => {
    let progress = (curr_track.currentTime / curr_track.duration) * 100;
    seek_slider.value = progress;
    curr_time.textContent = formatTime(curr_track.currentTime);
});

// Seek functionality
seek_slider.addEventListener('input', () => {
    curr_track.currentTime = (seek_slider.value / 100) * curr_track.duration;
});

// Format time (MM:SS)
function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Event listener for play button
playpause_btn.addEventListener('click', playpauseTrack);


// Love Letter Typing Effect
const letterContent = [
  "To, ",
  "   My Dear Love!!!!,",
  "       Every little thing I did, every small effort I made, was always my way of telling you how much you mean to me You’re the one who always speaks your heart out, but this time, I was the one trying to give you hints. I didn’t want you to know, but I gave you more than enough hints. Either way, my feelings have always been right here, waiting for you.",
  "I never thought love was meant for me. I was someone who ran from it, scared of feeling too much. ",
  "At first, I thought you were just joking, that this was something temporary. But then, without even realizing it, I fell deep and completely. ",
  "Suddenly, all my fears didn’t matter. Loving you felt right, like something I was always meant to do. ",
  "I remember how you used to explain me to others, always saying, 'tumhe pata h vo kitna acha h.' ",
  "But when people asked me about you, all I could think was, 'Yes, she is mine.' ",
  "Not because I didn’t want to talk about you, but because you are my most precious person. ",
  "Some things are too special to be shared too easily I wanted to keep you close, just mine. ",
  "From the moment you became part of my life, everything changed. ",
  "You are my peace when my mind is restless, my warmth on cold days, and the one person who makes my heart race yet feel safe at the same time. ",
  "With you, love isn’t just a word it’s a feeling, a home, a place where I always want to be. ",
  "I need you to know that you’re safe with me. Always. ",
  "I am all yours—every part of me belongs to you in a way I’ve never belonged to anyone before. ",
  "No matter what happens, no matter how far we are, my love for you won’t change. ",
  "You have become such a deep part of me that even if the whole world stood against me, I would still choose you. ",
  "Because you are my home. ",
  "I can’t wait for the day I finally get to hold you, to look into your eyes and tell you everything in person. ",
  "But until then, I need you to know this—there is no one else, and there never will be. ",
  "It’s only you. It’s always been you. ",
  "Don’t worry, my love. If it takes bowing down in front of this entire universe to make you happy, I will do it without hesitation. ",
  "You are so perfect, almost unreal, for someone like me. ",
  "And yet, here you are, loving me in ways I never thought I deserved. ",
  "I love being loved by you. ",
  "Forever yours,",
  "[Your Name]"
];

let currentIndex = 0;
const letterElement = document.getElementById("letter");
const paperElement = document.querySelector(".burnt-paper");

function typeNextLine() {
  if (currentIndex >= letterContent.length) return;

  // Create a new paragraph for each line
  const newLine = document.createElement("p");
  newLine.style.color = "white"; // Set text color to white
  newLine.style.fontFamily = "'Great Vibes', cursive"; // Apply Great Vibes font
  newLine.style.fontSize = "24px"; // Increase font size
  newLine.style.marginBottom = "10px"; // Add spacing
  letterElement.appendChild(newLine);

  new TypeIt(newLine, {
    speed: 50,
    cursor: false,
    afterStep: function(instance) {
      paperElement.style.height = `${paperElement.scrollHeight}px`; // Adjust height dynamically
    },
    afterComplete: () => {
      currentIndex++;
      if (currentIndex < letterContent.length) setTimeout(typeNextLine, 700);
    }
  })
  .type(letterContent[currentIndex])
  .go();
}

// Start typing after a delay
setTimeout(typeNextLine, 1000);


