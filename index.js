const APP_DATA = {
  currentProblemIndex: 0,
  correctCount: 0,
  wrongCount: 0
}

const PROBLEMS = [
  {
  question: `Which movie starring Al Pacino, Robert DeNiro, Talia Shire, and Robert Duvall won the Academy Award for Best Picture in 1974?`,
  choice1: "The God Farther",
  choice2: "The Towering Inferno",
  choice3: "Chinatown",
  choice4: "The Godfather, Part II"
  },
  {
  question: `The 2000 Best Picture winner was "Gladiator", but which of the following movies did not even get nominated for the award?`,
  choice1: "Chocolat",
  choice2: "Erin Brockovich",
  choice3: "In the Bedroom",
  choice4: "Traffic"
  },
  {
  question: `From 1989-1991 Kevin Costner appeared in at least one Best Picture nominated film each year. Which of the following movies, that starred Kevin Costner, went on to win the Academy Award for Best Picture?`,
  choice1: "No Way Out",
  choice2: "Field of Dreams",
  choice3: "Dances With Wolves",
  choice4: "JFK"
  },
  {
  question: `Which of the following is true of the 1930 Best Picture winner, "All Quiet on the Western Front"?`,
  choice1: "The film is about the United States land rush of the 19th century.",
  choice2: "It was the first year in which the director of the winning film also won the Oscar for Best Director.",
  choice3: "It was the longest film to win Best Picture.",
  choice4: "This was the first year that a musical won the award."
  },
  {
  question: `Which Best Picture winner features such characters as the Schofield Kid, English Bob, and Sally Two Trees?`,
  choice1: "Unforgiven",
  choice2: "Patton",
  choice3: "The Deer Hunter",
  choice4: "Dances With Wolves"
  },
  {
  question: `Which movie, directed by Bernardo Bertolucci and about a young boy who becomes the leader of his country, won the 1987 Award for Best Picture?`,
  choice1: "The Last Emperor",
  choice2: "Platoon",
  choice3: "Moonstruck",
  choice4: "Fatal Attraction"
  },
  {
  question: `Which film, directed by Martin Scorcese, was the first remake of a foreign film ever to win Best Picture?`,
  choice1: "The Departed",
  choice2: "American Beauty",
  choice3: "Life is Beautiful",
  choice4: "Goodfellas"
  },{
  question: `Which movie, directed by Sam Mendes and starring Kevin Spacey, won the 2000 Academy Award for Best Picture?`,
  choice1: "The Sixth Sense",
  choice2: "The Cider House Rules",
  choice3: "The Green Mile",
  choice4: "American Beauty"
  },
  {
  question: `Which movie, starring Clark Gable and Claudette Colbert, won the 1934 Academy Award for Best Picture?`,
  choice1: "Mutiny on the Bounty",
  choice2: "It Happened One Night",
  choice3: "Gone With the Wind",
  choice4: "Manhattan Melodrama"
  },
  {
  question: `Meryl Streep appeared in three movies between 1978-1985 that eventually won the Academy Award for Best Picture. Which of the following films did not win the award?`,
  choice1: "Sophie's Choice",
  choice2: "The Deer Hunter",
  choice3: "Kramer vs. Kramer",
  choice4: "Out of Africa"
  }
  
]

const ANSWERS = [
  "The Godfather, Part II",
  "In the Bedroom",
  "Dances With Wolves",
  "It was the first year in which the director of the winning film also won the Oscar for Best Director.",
  "Unforgiven",
  "The Last Emperor",
  "The Departed",
  "American Beauty",
  "It Happened One Night",
  "Sophie's Choice"
]

function handleStartSubmitButton () {
  $('.js-content-loader').on('submit', '#start', function(e){
    e.preventDefault();
    
    renderQuizProgressPage();
    renderProblemPage(PROBLEMS[APP_DATA.currentProblemIndex]);
    renderScoreSummaryPage();
    
  })
}

function handleProblemSubmitButton() {
  $('.js-content-loader').on('submit', '#problem', function(e){
    
    e.preventDefault();
    
    let result = $(this).serializeArray()[0].value;
    
    if (result === "") return;
    
    if (checkAnswer(result)) {
      renderFeedbackCorrectPage();
      APP_DATA.correctCount++;
      
    } else {
      renderFeedbackWrongPage();
      APP_DATA.wrongCount++;
    }
    
  })
}

function handleFeedbackSubmitButton() {
  $('.js-content-loader').on('submit', '#feedback', function(e){
    
    e.preventDefault();
    
    if (APP_DATA.currentProblemIndex + 1 === PROBLEMS.length) {
      
      renderFinalPage();
      $('.js-header-loader').html('');
      
    }
    else
    {
      
      APP_DATA.currentProblemIndex++;
      renderProblemPage(PROBLEMS[APP_DATA.currentProblemIndex]);
      renderQuizProgressPage();
      
    }
    
    renderScoreSummaryPage();
    
  })
}

function handleCompleteSubmitButton() {
  $('.js-content-loader').on('submit', '#complete', function(e){
    
    e.preventDefault();
    
    APP_DATA.currentProblemIndex = 0;
    APP_DATA.correctCount = 0;
    APP_DATA.wrongCount = 0;
    
    renderStartPage();
    $('.js-footer-loader').html('');
    
  })
}

function renderStartPage() {
  $('.js-content-loader').hide().html(`
    <div class="start-page">
      <div class="top-area">
        <h1>Movie Trivia Quiz</h1>
        <p class="intro-line">Ready for your test of movie knowledge?</p>
      </div>
      <form id="start">
          <button type="submit">Start Quiz</button>
      </form>
    </div>`).fadeIn('slow');
}

function renderProblemPage(problem) {
  $('.js-content-loader').hide().html(`
    <div class="question-page">
      <form id="problem">
        <header>
          <h2>${problem.question}
          </h2>
        </header>
        <fieldset>
          <label class="radio-container">
            <input type="radio" name="answer" value="${problem.choice1}" required>
            <div class="custom-radio"></div>
            ${problem.choice1}
          </label>
          <label class="radio-container">
            <input type="radio" name="answer" value="${problem.choice2}" required>
            <div class="custom-radio"></div>
            ${problem.choice2}
          </label>
          <label class="radio-container">
            <input type="radio" name="answer" value="${problem.choice3}" required>
            <div class="custom-radio"></div>
            ${problem.choice3}
          </label>
          <label class="radio-container">
            <input type="radio" name="answer" value="${problem.choice4}" required>
            <div class="custom-radio"></div>
            ${problem.choice4}
          </label>
        </fieldset>
        <div class="btn-container">
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>`).fadeIn('slow');
}

function renderFeedbackCorrectPage() {
  $('.js-content-loader').hide().html(`
    <div class="feedback-page">
      <h3>Correct!</h3>
      <img class="correct-logo" src="https://www.shareicon.net/download/2016/08/20/817720_check.svg" alt="Check logo">
      <form id="feedback">
        <div class="btn-container">
          <button type="submit">
            Next Question
          </button>
        </div>
      </form>
    </div>`).fadeIn('slow');
}

function renderFeedbackWrongPage() {
  $('.js-content-loader').hide().html(`
    <div class="feedback-page">
      <h3>Wrong</h3>
      <img class="wrong-logo" src="http://www.clker.com/cliparts/1/1/9/2/12065738771352376078Arnoud999_Right_or_wrong_5.svg.med.png" alt="Wrong logo">
      <div>
        <p>The correct answer is:</p>
        <p>${ANSWERS[APP_DATA.currentProblemIndex]}</p>
      </div>
      <form id="feedback">
        <div class="btn-container">
          <button type="submit">
            Next Question
          </button>
        </div>
      </form>
    </div>`).fadeIn('slow');
}

function renderQuizProgressPage() {
  $('.js-header-loader').html(`
    <div class="quiz-progress">
      <p>Question: ${APP_DATA.currentProblemIndex + 1} / ${PROBLEMS.length}</p>
    </div>`)
}

function renderScoreSummaryPage() {
  $('.js-footer-loader').html(`
    <div class="score-summary">
      <div class="score-sum-wrapper">
        <span>Correct: ${APP_DATA.correctCount}</span>
        <span>Wrong: ${APP_DATA.wrongCount}</span>
      </div>
    </div>`)
}

function renderFinalPage() {
  $('.js-content-loader').hide().html(`
    <div class="final-page">
      <h1>Quiz complete!</h1>
      <p>Your score: ${APP_DATA.correctCount} / ${PROBLEMS.length}</p>
      <form id="complete">
        <div class="btn-container">
          <button type="submit">
            Try Again!
          </button>
        </div>
      </form>
    </div>`).fadeIn('slow');
}

function checkAnswer(userAnswer) {
  
  if (ANSWERS[APP_DATA.currentProblemIndex] === userAnswer) return true;
  
  return false;
  
}

function initializeApp() {
  renderStartPage();
  handleStartSubmitButton();
  handleProblemSubmitButton();
  handleFeedbackSubmitButton();
  handleCompleteSubmitButton();
}

$(initializeApp());