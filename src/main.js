document.addEventListener('DOMContentLoaded', function () {
  const messages = document.getElementById('messages');

  const initialMessages = [
    'Запускаємо курс з арбітражу трафіку! Отримайте цінні знання від експертів.',
    'Приєднуйтесь до нашому новому курсу! Інтерактивні заняття, практичні завдання, сертифікат.',
    'Учасники отримають доступ до ексклюзивних матеріалів, консультацій та мережі контактів.',
  ];

  initialMessages.forEach((msg, index) => {
    setTimeout(() => {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'message left-message';
      messageDiv.textContent = msg;
      messages.appendChild(messageDiv);
      messages.scrollTop = messages.scrollHeight;
    }, index * 1000);
  });

  setTimeout(() => {
    askQuestion('Хочете дізнатися більше?', ['Так', 'Ні']);
  }, initialMessages.length * 1000 + 1000);
});

function askQuestion(question, answers) {
  const messages = document.getElementById('messages');

  const questionDiv = document.createElement('div');
  questionDiv.className = 'message left-message';
  questionDiv.textContent = question;

  messages.appendChild(questionDiv);

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'answer-buttons';

  answers.forEach(answer => {
    const answerBtn = document.createElement('button');
    answerBtn.textContent = answer;
    answerBtn.onclick = () => handleAnswer(answer);
    buttonContainer.appendChild(answerBtn);
  });

  messages.appendChild(buttonContainer);
  messages.scrollTop = messages.scrollHeight;
}

let currentQuestionIndex = 0;

function handleAnswer(answer) {
  const messages = document.getElementById('messages');

  const userResponseDiv = document.createElement('div');
  userResponseDiv.className = 'message right-message user-response';
  userResponseDiv.textContent = ` ${answer}`;
  messages.appendChild(userResponseDiv);

  if (currentQuestionIndex === 0) {
    if (answer === 'Так') {
      askQuestion(
        "Дякую! Чи був у вас досвід пов'язаний із Арбітражем трафіку?",
        ['Так', 'Ні', 'Чув про це']
      );
      currentQuestionIndex++;
    } else {
      const responseDiv = document.createElement('div');
      responseDiv.className = 'message left-message';
      responseDiv.textContent =
        'Дякую за вашу відповідь, чекаємо на ваше повернення.';
      messages.appendChild(responseDiv);
      return;
    }
  } else if (currentQuestionIndex === 1) {
    if (answer === 'Так') {
      askQuestion('Скільки часу ви могли б приділяти на день?', [
        'Одна година',
        '2-3 години',
        '5 і більше',
      ]);
      currentQuestionIndex++;
    } else if (answer === 'Чув про це') {
      askQuestion('Скільки часу ви могли б приділяти на день?', [
        'Одна година',
        '2-3 години',
        '5 і більше',
      ]);
      currentQuestionIndex++;
    } else {
      const responseDiv = document.createElement('div');
      responseDiv.className = 'message left-message';
      responseDiv.textContent =
        'Дякую за вашу відповідь, чекаємо на ваше повернення.';
      messages.appendChild(responseDiv);
      return;
    }
  } else if (currentQuestionIndex === 2) {
    const responseDiv = document.createElement('div');
    responseDiv.className = 'message left-message';
    responseDiv.textContent =
      "Дякую! Наша компанія дуже зацікавлена ​​вами, для подальшої підтримки зв'язку, будь ласка, заповніть форму.";
    document.getElementById('contactForm').classList.remove('hidden');

    messages.appendChild(responseDiv);

    document
      .getElementById('contactForm')
      .addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        console.log(...formData.values());
        window.location.href = 'success.html';
      });

    return;
  }
}
