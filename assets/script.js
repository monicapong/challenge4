var intro = document.querySelector('.intro');
var quiz = document.querySelector('.quiz');
var checkGuess = document.querySelector('.check_guess');
var startBtn = document.querySelector('.start_button');
var completedQuiz = document.querySelector('.completed_quiz');
var finalScore = document.querySelector('.final_score')

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

var askQuestion = document.querySelector('.ask_question');

var guess = document.querySelectorAll(".multiple_choice");
var answer1 = document.querySelector('#answer1');
var answer2 = document.querySelector('#answer2');
var answer3 = document.querySelector('#answer3');
var answer4 = document.querySelector('#answer4');

var questionNumber = 0;

var secondsLeft = 75;
var questionCount = 1;
var timeEl = document.querySelector('.time');
var finish = document.querySelector('.finish');

//A timer that starts with 75 seconds. It stops when the user finishes the quiz, or displays "Time is up!" on the score page if the timer reaches 0 before the user finishes it.
function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            finish.textContent = "Time is up!";
            gameOver();
        }else if(questionCount >= questionBank.length + 1) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
};

//The first question is displayed and the timer begins
function startQuiz () {
    intro.style.display = 'none';
    checkGuess.style.display = 'none';
    quiz.style.display = 'block';
    questionNumber = 0;
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

//When the "Start Quiz" button is clicked then the first question comes up and the timer begins
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

    if (questionBank[questionNumber].answer == event.target.value) {
        checkGuess.textContent = 'Correct!';
    } else {
        checkGuess.textContent = 'Wrong!';
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

//When an answer choice is clicked, then the checkAnswer function runs 
guess.forEach(function(click) {
    click.addEventListener('click', checkAnswer);
});
