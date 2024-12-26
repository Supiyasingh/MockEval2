const baseURL = "https://puddle-pollen-editor.glitch.me/questions";


document.getElementById("quizForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const questionData = {
    title: document.getElementById("question").value,
    options: {
      A: document.getElementById("optionA").value,
      B: document.getElementById("optionB").value,
      C: document.getElementById("optionC").value,
      D: document.getElementById("optionD").value,
    },
    correctOption: document.getElementById("correctOption").value,
    reviewStatus: false,
  };

  await fetch(baseURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(questionData),
  });
  alert("Question Created");
  loadQuestions();
});

async function loadQuestions() {
  const response = await fetch(baseURL);
  const questions = await response.json();
  const container = document.getElementById("questionsContainer");
  container.innerHTML = "";
  questions.forEach((question) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.borderColor = question.reviewStatus ? "violet" : "blue";
    card.innerHTML = `
      <h3>${question.title}</h3>
      <p>Options: ${Object.entries(question.options).map(([key, value]) => `${key}: ${value}`).join(", ")}</p>
      <button onclick="reviewQuestion(${question.id})">Review Question</button>
      <button onclick="deleteQuestion(${question.id})">Delete Question</button>
    `;
    container.appendChild(card);
  });
}

async function reviewQuestion(id) {
  if (confirm("Are you sure to review the question?")) {
    await fetch(`${baseURL}${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reviewStatus: true }) });
    loadQuestions();
  }
}

async function deleteQuestion(id) {
  if (confirm("Are you sure to delete the question?")) {
    await fetch(`${baseURL}${id}`, { method: "DELETE" });
    loadQuestions();
  }
}

loadQuestions();
