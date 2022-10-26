//Access element using querySelector
var viewHighScore = document.querySelector('.view_highscores');
var timeEl = document.querySelector('.time');
var intro = document.querySelector('.intro');
var startBtn = document.querySelector('.start_button');
var quiz = document.querySelector('.quiz');
var askQuestion = document.querySelector('.ask_question');
var guess = document.querySelectorAll(".multiple_choice");
var answer1 = document.querySelector('#answer1');
var answer2 = document.querySelector('#answer2');
var answer3 = document.querySelector('#answer3');
var answer4 = document.querySelector('#answer4');
var checkGuess = document.querySelector('.check_guess');
var completedQuiz = document.querySelector('.completed_quiz');
var finalScore = document.querySelector('.final_score')
var finish = document.querySelector('.finish');
var highScores = document.querySelector('.high_scores');
var scoreList = document.querySelector('.score_list');
var initialsInput = document.querySelector('#initials');
var submitBtn = document.querySelector('.submit_button');
var backBtn = document.querySelector('.back_btn');
var clearBtn = document.querySelector('.clear_btn');

//Question bank for the coding quiz challenge
var questionBank = [
    {
        question: "Commonly used data types DO NOT inlcude:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3"
    },
    {
        question: "The condition in an if / else statement is enclosed with _______.",
        choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        answer: "3"
    },
    {
        question: "Arrays in JavaScript can be used to store _______.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4"
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        answer: "3"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console log"],
        answer: "4"
    }
];

var scores = [];
var questionNumber = 0;
var questionCount = 1;
//Set timer to 75 seconds
var secondsLeft = 75;

function setTime() {
    //Sets interval in variable
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0) {
            //Stops execution of action at set interval
            clearInterval(timerInterval);
            //Sets h1 element to "Time is up!"
            finish.textContent = "Time is up!";
            //Calls gameOver to display the final score of 0
            gameOver();
        }else if(questionCount >= questionBank.length + 1) {
            //Stops execution of action at set intervel
            clearInterval(timerInterval);
            //Calls gameOver to display the final score
            gameOver();
        }
    }, 1000);
};

function startQuiz () {
    intro.style.display = 'none';
    //Displays first question
    quiz.style.display = 'block';
    questionNumber = 0;
    //Starts timer
    setTime();
    showQuestion(questionNumber);
};

//Shows question with their respective answer choices
function showQuestion (n) {
    askQuestion.textContent = questionBank[n].question;
    answer1.textContent = questionBank[n].choices[0];
    answer2.textContent = questionBank[n].choices[1];
    answer3.textContent = questionBank[n].choices[2];
    answer4.textContent = questionBank[n].choices[3];
    questionNumber = n;
};

//Add click event to startBtn element to start the timer and display the first question
startBtn.addEventListener("click", startQuiz);

//Tells the user if they answered the question correct or wrong
function checkAnswer(event) {
    event.preventDefault();
    //Displays the check_guess section
    checkGuess.style.display = 'block';
    //Line stops displaying after 1 second
    setTimeout(function() {
        checkGuess.style.display = 'none';
    }, 1000);

    //Tests if correct answer condition is met
    if (questionBank[questionNumber].answer == event.target.value) {
        checkGuess.textContent = 'Correct!';
    } else {
        checkGuess.textContent = 'Wrong!';
        //10 second penalty for wrong answers
        secondsLeft = secondsLeft - 10;
    };

    if (questionNumber < questionBank.length -1) {
        showQuestion(questionNumber +1);
    } else {
        gameOver();
    }

    questionCount++;
};

//Displays the users score 
function gameOver() {
    quiz.style.display = 'none';
    completedQuiz.style.display = 'block';
    finalScore.textContent = 'Your final score is ' + secondsLeft + '.';
}

//Add click event for guess element to call checkAnswer
guess.forEach(function(click) {
    click.addEventListener('click', checkAnswer);
});

//Renders initials and scores into a score list as <li> elemenets
function renderScores() {
    scoreList.innerHTML = "";
    scoreList.style.display ='block';

    var highScores = sort();

    //Render new li for each score
    for (var i = 0; i < scores.length; i++) {
        var highScore = highScores[i];

        var li = document.createElement("li");
        li.textContent = highScore.initials + " - " +highScore.score;
        li.setAttribute("data-index", i);
        li.style.backgroundColor = 'rgb(' + [210, 186, 236, 0.531].join(',') + ')'; 
        scoreList.appendChild(li);
    };

    init();
};

function init() {
    //Retrieve stored scores from local storage
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    
    //If stored value exists, set scores to those values
    if (storedScores !== null) {
        scores = storedScores;
    } else {
        //If stored doesn't exist, set scores to an empty array.
        scores = [];
    };
    return scores;
};

//Sort scores from highest to lowest
function sort() {
    var unsortedList = init();
    if (init == null) {
        return;
    } else {
        unsortedList.sort(function(a, b) {
            return b.score - a.score;
        })
        
    return unsortedList;
    };
}; 

//Store scores and initials to local storage 
function storeScores() {
    var highScore = {
        initials: initialsInput.value.trim(),
        score: secondsLeft
    };

    if (highScore === "") {
        return;
    };

    //Push highScore values to scores array
    scores.push(highScore);

    //Stringify and set key in localStorage to scores array
    localStorage.setItem("scores", JSON.stringify(scores));
    renderScores();
}

//Add click event to submitBtn element
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    completedQuiz.style.display = 'none';
    //Displays high scores
    highScores.style.display = 'block';
    //Calls storeScores to push data to localStorage
    storeScores();
}); 

//Calls init to retrieve data and render it to the page on load
init();

//Add click event to viewHighscore element
viewHighScore.addEventListener('click', function(event) {
    event.preventDefault();
    intro.style.display = 'none';
    quiz.style.display = 'none';
    completedQuiz.style.display = 'none';
    checkGuess.style.display = 'none';
    //Displays high scores
    highScores.style.display = 'block';
    //Re-renders the high score list
    renderScores();
});

//Add click event to backBtn element
backBtn.addEventListener("click", function(event) {
    event.preventDefault();
    //Go back to main page
    location.reload();
});

//Add click event to clearBtn element
clearBtn.addEventListener('click', function(event) {
    event.preventDefault();
    //Clears data from localStorage
    localStorage.clear();
    //Re-renders the high score list
    renderScores();
});