const levelSelect = document.getElementById("levelSelect");
let selectedLevel = levelSelect.value; // Ambil value level yang aktif saat halaman dimuat

levelSelect.addEventListener("change", function () {
  selectedLevel = levelSelect.value; // Perbarui nilai selectedLevel saat pilihan level berubah

  if (selectedLevel === "level1") {
    kosakataKorea = kataKorea.level1;
  } else if (selectedLevel === "level2") {
    kosakataKorea = kataKorea.level2;
  } else if (selectedLevel === "level3") {
    kosakataKorea = kataKorea.level3;
  } else if (selectedLevel === "level4") {
    kosakataKorea = kataKorea.level4;
  } else if (selectedLevel === "level5") {
    kosakataKorea = kataKorea.level5;
  } else if (selectedLevel === "level6") {
    kosakataKorea = kataKorea.level6;
  } else if (selectedLevel === "level7") {
    kosakataKorea = kataKorea.level7;
  } else if (selectedLevel === "level8") {
    kosakataKorea = kataKorea.level8;
  } else if (selectedLevel === "level9") {
    kosakataKorea = kataKorea.level9;
  } else if (selectedLevel === "level10") {
    kosakataKorea = kataKorea.level10;
  } else if (selectedLevel === "level11") {
    kosakataKorea = kataKorea.level11;
  } else if (selectedLevel === "level12") {
    kosakataKorea = kataKorea.level12;
  }

  questions = [];
  makeQuestion();
  startQuiz();
  resetInfoList();
});

let kosakataKorea; // Deklarasikan variabel kosakataKorea di luar blok if-else

if (selectedLevel === "level1") {
  kosakataKorea = kataKorea.level1;
} else if (selectedLevel === "level2") {
  kosakataKorea = kataKorea.level2;
}

let questions = [];

function makeQuestion() {
  // Ambil 10 data pertama dari kosakataKorea untuk membuat 10 soal
  const randomIndices = [];
  while (randomIndices.length < 10) {
    const randomIndex = Math.floor(Math.random() * kosakataKorea.length);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
    }
  }

  for (let i = 0; i < 10; i++) {
    const kosakataIndex = randomIndices[i];
    const currentKosakata = kosakataKorea[kosakataIndex];

    const question = {
      hangeul: currentKosakata.hangeul,
      pelafalan: currentKosakata.pelafalan,
      arti: currentKosakata.arti,
      contohKalimat: currentKosakata.contohKalimat,
      pelafalanKalimat: currentKosakata.pelafalanKalimat,
      artiKalimat: currentKosakata.artiKalimat,
      question: "Kata manakah yang berarti " + currentKosakata.arti + "?",
      answers: [
        {
          text: kosakataKorea[kosakataIndex].hangeul,
          correct: true,
          arti: kosakataKorea[kosakataIndex].arti,
          pelafalan: kosakataKorea[kosakataIndex].pelafalan,
        },
      ],
    };

    // Ambil 3 kata lain secara acak untuk dijadikan pilihan jawaban
    const randomAnswerIndices = [];
    while (randomAnswerIndices.length < 3) {
      const randomAnswerIndex = Math.floor(Math.random() * kosakataKorea.length);
      if (!randomAnswerIndices.includes(randomAnswerIndex) && randomAnswerIndex !== kosakataIndex) {
        randomAnswerIndices.push(randomAnswerIndex);
      }
    }

    for (const index of randomAnswerIndices) {
      question.answers.push({
        text: kosakataKorea[index].hangeul,
        correct: false,
        arti: kosakataKorea[index].arti,
        pelafalan: kosakataKorea[index].pelafalan,
      });
    }

    // Acak urutan pilihan jawaban
    question.answers.sort(() => Math.random() - 0.5);

    questions.push(question);
  }
}

makeQuestion();

const quiestionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const explane = document.getElementById("explane");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  quiestionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  const exampleSentence = document.getElementById("exampleSentence");
  const meaningOfSentence = document.getElementById("meaningOfSentence");
  const pronunciation = document.getElementById("pronunciation");
  exampleSentence.innerHTML = currentQuestion.contohKalimat;
  pronunciation.innerHTML = `(${currentQuestion.pelafalanKalimat})`;
  meaningOfSentence.innerHTML = currentQuestion.artiKalimat;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = `${answer.text} (${answer.pelafalan}) <strong class="hidden">= ${answer.arti}</strong>`;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  explane.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function showMeaning() {
  const meanings = answerButtons.querySelectorAll("strong");
  meanings.forEach((meaning) => {
    meaning.classList.remove("hidden");
  });
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  showMeaning();
  nextButton.style.display = "block";
  explane.style.display = "block";
}

function showScore() {
  resetState();
  quiestionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

function speakInKorean() {
  const textToSpeak = document.getElementById("exampleSentence").innerText;

  if ("speechSynthesis" in window) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = textToSpeak;
    msg.rate = 0.8; // Mengurangi kecepatan pengucapan menjadi setengah dari kecepatan default (1.0)
    msg.lang = "ko-KR"; // Kode bahasa untuk bahasa Korea
    speechSynthesis.speak(msg);
  } else {
    // Penanganan jika browser tidak mendukung sintesis suara.
    alert("Maaf, browser Anda tidak mendukung sintesis suara.");
  }
}

startQuiz();

const informationButton = document.querySelector(".informationButton");
const informationList = document.getElementById("informationList");

informationButton.addEventListener("click", () => {
  informationList.classList.toggle("hidden");
  informationButton.classList.toggle("active");

  // Ambil teks asli dari atribut data-text
  const originalText = informationButton.dataset.text;

  // Ganti teks tombol berdasarkan class active
  if (informationButton.classList.contains("active")) {
    informationButton.innerText = "x";
  } else {
    informationButton.innerText = "i";
  }
});

// Ambil elemen list ul yang akan diisi
const infoList = document.getElementById("infoList");

// Fungsi untuk membuat elemen list berdasarkan data kosakataKorea
function createListItems(data) {
  return data
    .map(
      (item) =>
        `<li>
          ${item.hangeul}<br>
          (${item.pelafalan})<br>
          ${item.arti}<br>
        </li>`
    )
    .join("<br>");
}

// menampilkan data ke element infoList
function resetInfoList() {
  // Hapus semua elemen yang ada di dalam infoList sebelum menambahkan data baru
  infoList.innerHTML = "";
  // Tampilkan data kosakataKorea dalam elemen list
  infoList.innerHTML = createListItems(kosakataKorea);
}

resetInfoList();
