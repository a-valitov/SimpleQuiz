Parse.initialize("org.vernality.alliance", "hWlREY7dvWb7sLpCVfZrReWNKPHh4uJT"); //initializing server with a client key
Parse.serverURL = 'https://profitclub.vernality.org/parse';
Parse.masterKey = "n2vw8wfMsrm4jDSuLMuspiiseBwOIq18rsq6uQ5p";


const startButton = document.getElementById('start-btn')
//const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

const button1 = document.createElement('button')
const button2 = document.createElement('button')
button1.classList.add('btn')
button2.classList.add('btn')

const startQuestionId = "QL6eAD8jN8"
let currentQuestion
let currentQuestionId = startQuestionId

startButton.addEventListener('click', startGame)
// nextButton.addEventListener('click', () => {
//     setNextQuestion(currentQuestionId)
// })

function startGame() {
    startButton.classList.add('hide')

    questionContainerElement.classList.remove('hide')
    setNextQuestion(startQuestionId)
}

function setNextQuestion(questionId) {
    showQuestion(questionId)
}

function showQuestion(questionId) {
    //var Question = Parse.Object.extend("Question");
    let query = new Parse.Query("Question");
    query.equalTo("objectId", questionId);
    query.include("option1");
    query.include("option2");
    query.first({useMasterKey:true}).then(q => {
        currentQuestion = q;
        questionElement.innerText = currentQuestion.get("title");
        
        button1.innerText = currentQuestion.get("answer1")
        button2.innerText = currentQuestion.get("answer2")
        
        button1.addEventListener('click', selectAnswer1)
        button2.addEventListener('click', selectAnswer2)

        answerButtonsElement.appendChild(button1)
        answerButtonsElement.appendChild(button2)

    }).catch(error => {  //Uncaught Error: Cannot use the Master Key, it has not been provided
        console.error(error);
    })

}

function selectAnswer1(e) {
    //TODO: check if the question was last
    currentQuestionId = currentQuestion.get("option1").id
    setNextQuestion(currentQuestionId)
}

function selectAnswer2(e) {
    //TODO: check if the question wasn't last
    currentQuestionId = currentQuestion.get("option2").id
    setNextQuestion(currentQuestionId)
}