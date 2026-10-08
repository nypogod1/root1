const progressBar = document.getElementById("progressBar");
const reveals = document.querySelectorAll(".reveal");
const hearts = document.getElementById("hearts");
const loveButton = document.getElementById("loveButton");
const secret = document.getElementById("secret");

function updateProgress() {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrollTop / height) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach((item) => observer.observe(item));

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > 0.35 ? "♥" : "♡";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 22}px`;
  heart.style.animationDuration = `${5 + Math.random() * 7}s`;
  heart.style.animationDelay = `${Math.random() * 1.5}s`;
  hearts.appendChild(heart);

  setTimeout(() => heart.remove(), 13000);
}

setInterval(createHeart, 1300);

loveButton.addEventListener("click", () => {
  secret.classList.add("show");
  loveButton.textContent = "я же говорил ❤️";
  loveButton.disabled = true;

  for (let i = 0; i < 18; i++) {
    setTimeout(createHeart, i * 80);
  }
});

document.addEventListener("click", (event) => {
  if (event.target.closest("button")) return;

  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = "♡";
  heart.style.left = `${event.clientX}px`;
  heart.style.bottom = `${window.innerHeight - event.clientY}px`;
  heart.style.fontSize = "20px";
  heart.style.animationDuration = "3s";
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 3500);
});
