// ====== Elemen ======
const step0 = document.getElementById("step0");
const stepQ = document.getElementById("stepQ");
const stepEnd = document.getElementById("stepEnd");

const nameInput = document.getElementById("nameInput");
const enterBtn = document.getElementById("enterBtn");
const err = document.getElementById("err");

const greet = document.getElementById("greet");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const replyEl = document.getElementById("reply");

const endGreet = document.getElementById("endGreet");
const letterEl = document.getElementById("letter");
const hugBtn = document.getElementById("hugBtn");
const restartBtn = document.getElementById("restartBtn");
const heart = document.getElementById("heart");

let personName = "";
let qIndex = 0;

// ====== Pertanyaan berlapis ======
const flow = [
  {
    q: (n) => `Hai, ${n}. Kamu lagi senyum nggak sekarang?`,
    options: ["Iya", "Enggak"],
    reply: (ans) => ans === "Iya"
      ? "Nah gitu dong 😳🤍"
      : "Coba senyum dikit ya… yang gitu 🤍"
  },
  {
    q: () => "Aku boleh curi waktu kamu 30 detik aja?",
    options: ["Boleh", "Nanti"],
    reply: (ans) => ans === "Boleh"
      ? "Hehe makasih… aku lanjut ya 🤍"
      : "Oke… tapi jangan lama-lama ya 😤🤍"
  },
  {
    q: () => "Sebelum lanjut… kamu tau nggak aku kangen sama siapa?",
    options: ["Tau", "Nggak"],
    reply: (ans) => ans === "Tau"
      ? "Kok kamu pinter banget sih 😳"
      : "Sama kamu… masa nggak tau 🤍"
  },
  {
    q: () => "Kalau aku bilang aku sayang kamu… kamu jawab apa?",
    options: ["Aku juga", "Hehe"],
    reply: (ans) => ans === "Aku juga"
      ? "Duh… aku jadi makin sayang 🤍"
      : "Hehe apaan sih… tapi aku seneng 🤍"
  }
];

// ====== Surat ending ======
function buildLetter(n) {
  return [
    `Hai ${n}…`,
    "",
    "Makasih ya udah mau mainin ini sampai akhir.",
    "Aku cuma mau bilang:",
    "aku bersyukur banget punya kamu 🤍",
    "",
    "Kalau kamu capek, kalau kamu lagi banyak pikiran,",
    "aku pengen kamu tau—aku ada.",
    "",
    "Aku sayang kamu. Banyak."
  ].join("\n");
}

// ====== Helpers ======
function show(el) { el.classList.remove("hidden"); }
function hide(el) { el.classList.add("hidden"); }

function goToQuestions() {
  hide(step0); hide(stepEnd); show(stepQ);
  greet.textContent = `Oke ${personName}…`;
  qIndex = 0;
  renderQuestion();
}

function renderQuestion() {
  replyEl.textContent = "";
  const item = flow[qIndex];
  questionEl.textContent = item.q(personName);

  choicesEl.innerHTML = "";
  item.options.forEach(opt => {
    const b = document.createElement("button");
    b.className = "choiceBtn";
    b.textContent = opt;
    b.addEventListener("click", () => pickAnswer(opt));
    choicesEl.appendChild(b);
  });
}

function pickAnswer(ans) {
  const item = flow[qIndex];
  replyEl.textContent = item.reply(ans);

  // Lanjut otomatis setelah jeda
  setTimeout(() => {
    qIndex++;
    if (qIndex >= flow.length) {
      goToEnd();
    } else {
      renderQuestion();
    }
  }, 900);
}

function goToEnd() {
  hide(step0); hide(stepQ); show(stepEnd);
  endGreet.textContent = `Untuk ${personName} 🤍`;
  letterEl.textContent = buildLetter(personName);
  heart.classList.add("hidden");
}

// ====== Event ======
enterBtn.addEventListener("click", () => {
  const v = (nameInput.value || "").trim();
  if (!v) {
    err.textContent = "Namanya jangan kosong ya 😄";
    nameInput.focus();
    return;
  }
  err.textContent = "";
  personName = v;
  goToQuestions();
});

nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") enterBtn.click();
});

hugBtn.addEventListener("click", () => {
  heart.classList.remove("hidden");
  // retrigger animasi
  heart.style.animation = "none";
  // eslint-disable-next-line no-unused-expressions
  heart.offsetHeight;
  heart.style.animation = "";
});

restartBtn.addEventListener("click", () => {
  personName = "";
  nameInput.value = "";
  hide(stepQ); hide(stepEnd); show(step0);
  err.textContent = "";
  nameInput.focus();
});

// fokus awal
nameInput.focus();
