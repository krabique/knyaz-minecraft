let score = 0;
let lives = 3;
let currentQuestionIndex = 0;

const audioMusic = new Audio('assets/sounds/music.mp4');
const correctAnswerSound = new Audio('assets/sounds/correct_answer.mp3');
const wrongAnswerSound = new Audio('assets/sounds/wrong_answer.mp3');
[audioMusic, correctAnswerSound, wrongAnswerSound].forEach((aSound) => aSound.volume = 0.3 );

function music(toggle) {
  soundNode = document.getElementById('sound');
  clearNode(soundNode);

  if (toggle) {
    soundOnIcon = document.createElement('img');
    soundOnIcon.src = 'assets/sound_on.png';
    soundOnIcon.onclick = () => { music(false) };
    soundNode.appendChild(soundOnIcon);
    audioMusic.play();
  } else {
    soundOffIcon = document.createElement('img');
    soundOffIcon.src = 'assets/sound_off.png';
    soundOffIcon.onclick = () => { music(true) };
    soundNode.appendChild(soundOffIcon);
    audioMusic.pause();
  }
}

function newGame(initialStart) {
  if (initialStart) {    
    music(true);
  }

  updateScoreDisplay();
  updateLivesDisplay();

  const answersNode = document.getElementById('answers');
  clearNode(answersNode);

  if (QUESTIONS.length == currentQuestionIndex || lives == 0) {
    return endGame(answersNode);
  }

  const questionObject = QUESTIONS[currentQuestionIndex];
  updateBackground(questionObject);
  addQuestion(questionObject, answersNode);
  addAnswers(questionObject, answersNode);
}

function updateBackground(questionObject) {
  const background = questionObject.background || 'default_background.jpg'
  document.body.style.backgroundImage = `url('assets/backgrounds/${background}')`;
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
      descriptionObject = scoreDescriptions[scoreThresholds[i]]
      updateBackground(descriptionObject)
      return descriptionObject.message;
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
    lifeElement.src = 'assets/heart.png';
    lifeElement.setAttribute('class', 'lives');
    livesNode.appendChild(lifeElement);
  }  
}

function correctAnswer(buttonNode) {
  correctAnswerSound.play();
  score += questionScoreValue;
  buttonNode.style.borderColor = 'green';
  buttonNode.style.borderWidth  = 'thick'
}

function wrongAnswer(buttonNode) {
  wrongAnswerSound.play();
  lives -= 1;
  buttonNode.style.borderColor = 'red';
  buttonNode.style.borderWidth  = 'thick'
}

function clearNode(node) { 
  while(node.firstChild && node.removeChild(node.firstChild));
}
