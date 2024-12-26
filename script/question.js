const baseURL = "https://puddle-pollen-editor.glitch.me/questions";

async function loadReviewedQuestions() {
  try {
    const response = await fetch(baseURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const questions = await response.json();

    // Filter reviewed questions
    const reviewedQuestions = questions.filter((q) => q.reviewStatus);

    // Render questions
    const container = document.getElementById("reviewedQuestionsContainer");
    container.innerHTML = "";

    reviewedQuestions.forEach((question) => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.borderColor = "violet";
      card.innerHTML = `
        <h3>${question.title}</h3>
        <p>Options:</p>
        <ul>
          ${Object.entries(question.options)
            .map(([key, value]) => `<li>${key}: ${value}</li>`)
            .join("")}
        </ul>
        <p><strong>Correct Answer:</strong> ${question.correctOption}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading reviewed questions:", error);
  }
}

// Load questions on page load
loadReviewedQuestions();
