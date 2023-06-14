const scoreDescriptions = {
  '0': 'Ты вообще играл в Майнкрафт? Мне кажется, что нет. Быстрее исправь это недоразумение!',
  '400': 'Ты обычная домашняя овечка, очень спокойная и добрая но беззащитная, держись поближе к Стиву или к деревне где тебя будет охранять железный Голем!',
  '1000': 'Ты обычный деревенский житель, у тебя есть возможность стать Кузнецом или Фермером, дружи со Стивом и он тебе поможет!',
  '2000': 'Ты Железный Голем, сильный, спокойный и устрашающий! Твоя задача охранять деревню и прилегающие территории от недругов, так держать!',
  '3000': 'Ты Эндермен, пришелец из другого измерения, который уважает своё личное пространство и любит играться с блоками!',
  '4000': 'Ты Стив, главный герой и самый сильный персонаж в мире Майнкрафт, ведь тебе всё по плечу!'
};

const QUESTIONS = [
  {
    question: 'Как зовут главного героя?',
    answers: ['Стив', 'Хуив', 'Князь', 'Бомж'],
    rightAnswer: 'Стив'
  },
  {
    question: 'Князь лох?',
    answers: ['Лох', 'Пидор', 'Нет', 'Друзей'],
    rightAnswer: 'Лох'
  },
  {
    question: 'Чем болеет хмеля?',
    answers: ['Неизвестной болезнью', 'Алкоголизмом', 'Долбоебизмом', 'Проблемы в его голове'],
    rightAnswer: 'Проблемы в его голове'
  },
  {
    question: 'Макс ....',
    answers: ['Корж', 'Пряник', 'Кринж'],
    rightAnswer: 'Кринж'
  }
];

let score = 0;
let lives = 3;
let currentQuestionIndex = 0;

function newGame() {
  updateScoreDisplay();
  updateLivesDisplay();

  const answersNode = document.getElementById('answers');
  clearNode(answersNode);

  if (QUESTIONS.length == currentQuestionIndex || lives == 0) {
    return endGame(answersNode);
  }

  const questionObject = QUESTIONS[currentQuestionIndex];
  addQuestion(questionObject, answersNode);
  addAnswers(questionObject, answersNode);
}

function resetGame() {
  score = 0;
  lives = 3;
  currentQuestionIndex = 0;

  newGame();
}

function endGame(answersNode) {
  const finalScoreNode = document.createElement('div')
  finalScoreNode.setAttribute('class', 'finalScore');
  finalScoreNode.innerHTML = `Твой счёт: ${score}. ${scoreDescription(score)}`
  answersNode.appendChild(finalScoreNode)

  const playAgainButton = document.createElement('button')
  playAgainButton.setAttribute('class', 'buttonAnswer');
  playAgainButton.setAttribute('onClick', 'resetGame()');
  playAgainButton.innerHTML = `Попробовать ещё раз!`
  answersNode.appendChild(playAgainButton)
}

function scoreDescription(score) {
  const scoreThresholds = Object.keys(scoreDescriptions).map((i) => parseInt(i));
  for (let i = 0; i < scoreThresholds.length; i++) {
    if (scoreThresholds[i] <= score && (scoreThresholds[i + 1] > score || scoreThresholds[i + 1] == undefined)) {
      return scoreDescriptions[scoreThresholds[i]];
    }
  }
}

function addQuestion(questionObject, answersNode) {
  const questionNode = document.createElement('button');
  questionNode.setAttribute('class', 'buttonAnswer question');
  questionNode.innerHTML = questionObject.question;
  answersNode.appendChild(questionNode);
}

function addAnswers(questionObject, answersNode) {
  for (const answer of questionObject.answers) {
    const buttonNode = document.createElement('button');
    buttonNode.setAttribute('class', 'buttonAnswer answer');        
    buttonNode.onclick = () => { checkAnswer(answer, buttonNode) };
    buttonNode.innerHTML = answer;
    answersNode.appendChild(buttonNode);
  }
}

function checkAnswer(answer, buttonNode) {
  if (answer == QUESTIONS[currentQuestionIndex].rightAnswer) {
    correctAnswer(buttonNode);
  } else {
    wrongAnswer(buttonNode);
  }

  for (button of document.getElementsByClassName('answer')) {
    button.onclick = null;
  }
  
  currentQuestionIndex += 1;        
  setTimeout(newGame, 1000);
}

function updateScoreDisplay() {
  document.getElementById('score').innerHTML = `Счёт: ${score}`;
}

function updateLivesDisplay() {
  livesNode = document.getElementById('lives');
  clearNode(livesNode);
  
  for (let i = 0; i < lives; i++) {
    const lifeElement = document.createElement('img');
    lifeElement.src = 'heart.png';
    lifeElement.setAttribute('class', 'lives');
    livesNode.appendChild(lifeElement);
  }  
}

function correctAnswer(buttonNode) {
  score += 400;
  buttonNode.style.borderColor = 'green';
  buttonNode.style.borderWidth  = 'thick'
}

function wrongAnswer(buttonNode) {
  lives -= 1;
  buttonNode.style.borderColor = 'red';
  buttonNode.style.borderWidth  = 'thick'
}

function clearNode(node) { 
  while(node.firstChild && node.removeChild(node.firstChild));
}
