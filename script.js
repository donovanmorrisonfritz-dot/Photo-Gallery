// ===== PAGE ELEMENTS =====
const intro = document.getElementById("intro");
const valentine = document.getElementById("valentine");
const letter = document.getElementById("letter");

const enterBtn = document.getElementById("enterBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const backBtn = document.getElementById("backBtn");

const question = document.getElementById("question");

// ===== MODAL =====
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const modalText = document.getElementById("modalText");
const modalCaption = document.getElementById("modalCaption");
const closeImage = document.getElementById("closeImage");

// ===== LETTER =====
const letterBox = document.getElementById("letterBox");

// ===== CONFETTI =====
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let pieces = [];
let confettiInterval;
let noCanRun = false;

// ===== TYPE EFFECT =====
const text = "Will you be my Valentine? 💘";

function typeText() {
  question.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    question.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 80);
}

// ===== BUTTON POSITIONING =====
function positionButtons() {
  const container = document.querySelector(".buttons");
  const rect = container.getBoundingClientRect();

  const gap = 160;
  const y = rect.top + 20;

  const centerX = window.innerWidth / 2;

  yesBtn.style.position = "fixed";
  yesBtn.style.left = `${centerX - yesBtn.offsetWidth - gap / 2}px`;
  yesBtn.style.top = `${y}px`;

  noBtn.style.position = "fixed";
  noBtn.style.left = `${centerX + gap / 2}px`;
  noBtn.style.top = `${y}px`;
}

// ===== PAGE FLOW =====
enterBtn.onclick = () => {
  intro.classList.remove("active");
  valentine.classList.add("active");
  typeText();

  noCanRun = false;

  // reset before positioning
  noBtn.style.left = "0px";
  noBtn.style.top = "0px";

  // allow layout + transforms to settle
  setTimeout(() => {
    positionButtons();
    noCanRun = true;
  }, 60);
};

// ===== RUNAWAY NO BUTTON =====
function moveNoButton(e) {
  if (!noCanRun) return;

  const rect = noBtn.getBoundingClientRect();

  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  let dx = centerX - mouseX;
  let dy = centerY - mouseY;

  const distance = Math.sqrt(dx * dx + dy * dy);
  const triggerDistance = 140;

  if (distance > triggerDistance) return;

  dx /= distance;
  dy /= distance;

  const step = 60;

  let newX = centerX + dx * step - rect.width / 2;
  let newY = centerY + dy * step - rect.height / 2;

  const padding = 30;
  const maxX = window.innerWidth - rect.width - padding;
  const maxY = window.innerHeight - rect.height - padding;

  newX = Math.max(padding, Math.min(newX, maxX));
  newY = Math.max(padding, Math.min(newY, maxY));

  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
}

noBtn.addEventListener("mousemove", moveNoButton);

// ===== CONFETTI =====
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function makeConfetti() {
  pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 5 + 3,
    c: `hsl(${Math.random() * 360},100%,60%)`
  }));
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.c;
    ctx.fill();
    p.y += p.d;
    if (p.y > canvas.height) p.y = -10;
  });
}

// ===== YES BUTTON =====
yesBtn.onclick = () => {
  canvas.style.display = "block";
  makeConfetti();
  confettiInterval = setInterval(drawConfetti, 20);

  setTimeout(() => {
    clearInterval(confettiInterval);
    canvas.style.display = "none";
    valentine.classList.remove("active");
    letter.classList.add("active");
  }, 2500);
};

// ===== BACK BUTTON =====
backBtn.onclick = () => {
  letter.classList.remove("active");
  intro.classList.add("active");
};

// ===== PHOTO MODAL =====
document.querySelectorAll(".gallery img").forEach(img => {
  img.onclick = () => {
    modal.style.display = "flex";
    modalImg.style.display = "block";
    modalText.style.display = "none";
    modalImg.src = img.src;
    modalCaption.textContent = img.dataset.caption;
  };
});

// ===== LETTER MODAL =====
letterBox.onclick = () => {
  modal.style.display = "flex";
  modalImg.style.display = "none";
  modalText.style.display = "block";
  modalText.innerHTML = letterBox.innerHTML;
  modalCaption.textContent = "My Love Letter 💌";
};

// ===== CLOSE MODAL =====
function closeModal() {
  modal.style.display = "none";
  modalImg.src = "";
  modalText.innerHTML = "";
}

closeImage.onclick = closeModal;
modal.onclick = e => {
  if (e.target === modal) closeModal();
};

