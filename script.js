// PAGE ELEMENTS
const intro = document.getElementById("intro");
const valentine = document.getElementById("valentine");
const letter = document.getElementById("letter");

const enterBtn = document.getElementById("enterBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const backBtn = document.getElementById("backBtn");

const question = document.getElementById("question");

// MODAL ELEMENTS
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const modalText = document.getElementById("modalText");
const modalCaption = document.getElementById("modalCaption");
const closeImage = document.getElementById("closeImage");

// LETTER
const letterBox = document.getElementById("letterBox");

// CONFETTI
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let pieces = [];
let confettiInterval;

// PAGE FLOW
enterBtn.onclick = () => {
  intro.classList.remove("active");
  valentine.classList.add("active");
  typeText();
};

// TYPE EFFECT
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

// RUNAWAY NO BUTTON
function moveNoButton(e) {
  const btnRect = noBtn.getBoundingClientRect();

  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;

  let dx = btnCenterX - mouseX;
  let dy = btnCenterY - mouseY;

  const distance = Math.sqrt(dx * dx + dy * dy) || 1;
  const safeDistance = 140;

  if (distance > safeDistance) return;

  dx /= distance;
  dy /= distance;

  const step = 80;

  let newX = btnCenterX + dx * step - btnRect.width / 2;
  let newY = btnCenterY + dy * step - btnRect.height / 2;

  const padding = 30;

  const minX = padding;
  const minY = padding;
  const maxX = window.innerWidth - btnRect.width - padding;
  const maxY = window.innerHeight - btnRect.height - padding;

  newX = Math.min(Math.max(newX, minX), maxX);
  newY = Math.min(Math.max(newY, minY), maxY);

  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`; 
}
  
  
// Center No button initially
function centerNoButton() {
  const yesRect = yesBtn.getBoundingClientRect();
  noBtn.style.left = yesRect.right + 30 + "px";
  noBtn.style.top = yesRect.top + "px";
}

centerNoButton();


noBtn.addEventListener("mousemove", moveNoButton);
document.addEventListener("mouseenter", moveNoButton);

// CONFETTI
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

// YES BUTTON
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

// BACK BUTTON
backBtn.onclick = () => {
  letter.classList.remove("active");
  intro.classList.add("active");
};

// PHOTO MODAL
document.querySelectorAll(".gallery img").forEach(img => {
  img.onclick = () => {
    modal.style.display = "flex";
    modalImg.style.display = "block";
    modalText.style.display = "none";

    modalImg.src = img.src;
    modalCaption.textContent = img.dataset.caption;
  };
});

// LETTER MODAL
letterBox.onclick = () => {
  modal.style.display = "flex";
  modalImg.style.display = "none";
  modalText.style.display = "block";

  modalText.innerHTML = letterBox.innerHTML;
  modalCaption.textContent = "My Love Letter 💌";
};

// CLOSE MODAL
function closeModal() {
  modal.style.display = "none";
  modalImg.src = "";
  modalText.innerHTML = "";
}

closeImage.onclick = closeModal;
modal.onclick = e => {
  if (e.target === modal) closeModal();
};









