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
