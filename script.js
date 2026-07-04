const modal = document.getElementById("imageModal");
const btn = document.getElementById("exploreBtn");
const close = document.querySelector(".close");

btn.onclick = function () {
  modal.style.display = "block";
};

close.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

next.onclick = () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
};

prev.onclick = () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
};

showSlide(currentSlide);

function addToItinerary(placeName) {
  alert(`${placeName} has been added to your itinerary!`);
}

function generateItinerary() {
  const length = parseInt(document.getElementById('tripLength').value);
  const location = document.getElementById('location').value;
  const type = document.getElementById('travelType').value;

  const interestElements = document.querySelectorAll('input[name="interests"]:checked');
  const interests = Array.from(interestElements).map(cb => cb.value);

  if (!length || interests.length === 0 || !location || !type) {
    alert("Please select all options.");
    return;
  }

  let output = `Here's your personalized Goa trip:\n\n`;

  for (let day = 1; day <= length; day++) {
    output += `Day ${day}:\n`;

    if (interests.includes("Beaches")) {
      output += `- Relax at a scenic beach 🌊\n`;
    }
    if (interests.includes("Culture & History")) {
      output += `- Explore Goan history 🏛️ (like Basilica or Forts)\n`;
    }
    if (interests.includes("Adventure")) {
      output += `- Try water sports or trek to Dudhsagar Falls 🚣‍♀️\n`;
    }
    if (interests.includes("Food & Nightlife")) {
      output += `- Taste Goan fish curry 🍛 & enjoy nightlife 💃\n`;
    }

    output += `\n`;
  }

  output += `Travel Type: ${type.charAt(0).toUpperCase() + type.slice(1)}\nLocation: ${location === 'both' ? 'North & South Goa' : (location === 'north' ? 'North Goa' : 'South Goa')}`;

  document.getElementById('itineraryResult').innerText = output;
}

function filterGallery(category) {
  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    item.style.display = category === 'all' || item.classList.contains(category) ? 'block' : 'none';
  });
}

function openLightbox(src, title, caption) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-caption').innerHTML = `<strong>${title}</strong><br>${caption}`;
  document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

window.addEventListener('DOMContentLoaded', () => {
  const storedReviews = JSON.parse(localStorage.getItem("goaReviews")) || [];
  storedReviews.forEach(addReviewToDOM);
});

document.getElementById("reviewForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = this.querySelector("input").value.trim();
  const text = this.querySelector("textarea").value.trim();

  if (!name || !text) return;

  const review = { name, text };
  addReviewToDOM(review);

  const stored = JSON.parse(localStorage.getItem("goaReviews")) || [];
  stored.push(review);
  localStorage.setItem("goaReviews", JSON.stringify(stored));

  this.reset();
});

function addReviewToDOM(review) {
  const card = document.createElement("div");
  card.className = "review-card";
  card.innerHTML = `<h4>${review.name} ⭐⭐⭐⭐☆</h4><p>${review.text}</p>`;
  document.getElementById("userReviews").appendChild(card);
}

const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    bgMusic.pause();
    musicBtn.textContent = "🔈 Play Music";
  } else {
    bgMusic.play();
    musicBtn.textContent = "🔇 Pause Music";
  }
  isPlaying = !isPlaying;
});


