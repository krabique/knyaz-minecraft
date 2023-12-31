let score = 0;
let lives = 3;
let currentQuestionIndex = 0;
let attemptNumber = 0;

window.oncontextmenu = function() { return false; };

const audioMusic = new Howl({ src: 'assets/sounds/music.mp4' });
const correctAnswerSound = new Howl({ src: 'assets/sounds/correct_answer.mp3' });
const wrongAnswerSound = new Howl({ src: 'assets/sounds/wrong_answer.mp3' });
audioMusic.loop(true);
audioMusic.volume(0.3);
audioMusic.pause();
wrongAnswerSound.volume(1.0);
correctAnswerSound.volume(0.5);

let playMusic = true;
function toggleMusicEventListeners(toggle) {
  if (toggle) {
    document.addEventListener("visibilitychange", () => document.hidden ? music(false) : music(playMusic));
  } else {
    document.addEventListener("visibilitychange", () => null);
  }
}
toggleMusicEventListeners(true)


function userToggleMusic() {
  playMusic = !playMusic;
  music(playMusic);
}

function music(toggle) {
  soundNode = document.getElementById('sound');
  clearNode(soundNode);

  soundIcon = document.createElement('img');
  soundIcon.setAttribute('class', 'soundImage');
  soundIcon.onclick = () => { userToggleMusic() };

  if (toggle) {
    console.log("HERE !!!!!!!!!!!!")
    soundIcon.src = 'assets/sound_on.png';
    audioMusic.pause();
    audioMusic.play();
  } else {
    soundIcon.src = 'assets/sound_off.png';
    audioMusic.pause();
  }

  soundNode.appendChild(soundIcon);
}

function newGame(initialStart) {
  if (initialStart) {
    document.getElementById('sound').style.display = 'block';
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

function showAd() {
  toggleMusicEventListeners(false);

  ysdk.adv.showFullscreenAdv({
    callbacks: {
      onOpen: function() {
        music(false);
      },
      onClose: function(wasShown) {
        music(playMusic);
      }
    }
  })

  toggleMusicEventListeners(true);
}

function updateBackground(questionObject) {
  const background = questionObject.background || 'default_background.jpg'
  document.body.style.backgroundImage = `url('assets/backgrounds/${background}')`;
}

function resetGame() {
  score = 0;
  lives = 3;
  currentQuestionIndex = 0;

  showAd();
  newGame();
}

function endGame(answersNode) {
  const finalScoreNode = document.createElement('div');
  finalScoreNode.setAttribute('class', 'finalScore text-center center');
  finalScoreNode.innerHTML = `Твой счёт: ${score}. ${scoreDescription(score)}`

  const playAgainButtonWrapper = document.createElement('div');
  playAgainButtonWrapper.setAttribute('class', 'col-12');

  const playAgainButton = document.createElement('button');
  playAgainButton.setAttribute('class', 'buttonAnswer');
  playAgainButton.setAttribute('onClick', 'resetGame()');
  playAgainButton.innerHTML = `Попробовать ещё раз!`;
  playAgainButtonWrapper.appendChild(playAgainButton);
  finalScoreNode.appendChild(playAgainButtonWrapper);

  answersNode.appendChild(finalScoreNode);

  attemptNumber += 1;
  if (score >= 2000 && attemptNumber >= 3 && canReview()) {
    sendFeedback();
  }
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
  const questionNodeWrapper = document.createElement('div');
  questionNodeWrapper.setAttribute('class', 'col-md-12 text-center pb-3');
  const questionNode = document.createElement('button');
  questionNode.setAttribute('class', 'question');
  questionNode.innerHTML = questionObject.question;
  questionNodeWrapper.appendChild(questionNode);
  answersNode.appendChild(questionNodeWrapper);
}

function addAnswers(questionObject, answersNode) {
  for (const answer of questionObject.answers) {
    const questionNodeWrapper = document.createElement('div');
    questionNodeWrapper.setAttribute('class', 'col-md-12 text-center');
    const buttonNode = document.createElement('button');
    buttonNode.setAttribute('class', 'buttonAnswer answer');
    buttonNode.onclick = () => { checkAnswer(answer, buttonNode) };
    buttonNode.innerHTML = answer;
    questionNodeWrapper.appendChild(buttonNode);
    answersNode.appendChild(questionNodeWrapper);
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
  playSound(correctAnswerSound);
  score += questionScoreValue;
  buttonNode.style.borderColor = 'green';
  buttonNode.style.borderWidth  = 'thick'
}

function wrongAnswer(buttonNode) {
  playSound(wrongAnswerSound);
  lives -= 1;
  buttonNode.style.borderColor = 'red';
  buttonNode.style.borderWidth  = 'thick'
}

function playSound(sound) {
  sound.pause();
  sound.currentTime = 0;
  sound.play();
}

function clearNode(node) {
  while(node.firstChild && node.removeChild(node.firstChild));
}
