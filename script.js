const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


//questions order randomizer
//let shuffledQuestions, 
let currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    //console.log('Started')            //test output
    startButton.classList.add('hide')
    
    //shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0

    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(questions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct //setting a data for correct answers buttons only
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    }) 
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct

    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)     //converting a live collection to an array here
        button.disabled = true
    })  

    //if the answer is wrong, restart the quiz
    if(!correct) {
        questionElement.innerText = "You have mistaken! The quiz will be restarted."
        //hide all answer buttons
        Array.from(answerButtonsElement.children).forEach(button => {
            button.classList.add('hide')
        })
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
        return
    }

    //if the answer is correct

    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        //finish the quiz and allow to restart
        questionElement.innerText = "Hooray! You have successfully finished a quiz!"
        //hide all answer buttons
        Array.from(answerButtonsElement.children).forEach(button => {
            button.classList.add('hide')
        })
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


const questions = [
    {
        question: '1 + 1 = 2?',
        answers: [
            {text: 'Yes', correct: true },
            {text: 'No', correct: false }
        ]
    },
    {
        question: '2 + 2 = 4?',
        answers: [
            {text: 'Yes', correct: true },
            {text: 'No', correct: false }
        ]
    },
    {
        question: '3 + 3 = 8?',
        answers: [
            {text: 'Yes', correct: false },
            {text: 'No', correct: true }
        ]
    }
]