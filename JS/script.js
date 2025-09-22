import { Quiz } from "./quiz.js";
import { Question } from "./questions.js";
const startQuiz=document.querySelector('#startQuiz');
const categoryMenu=document.querySelector('#categoryMenu');
const difficultyOptions=document.querySelector('#difficultyOptions');
const questionsNumber=document.querySelector('#questionsNumber');
const quizOptions=document.querySelector('#quizOptions');
const errorBox = document.getElementById("errorBox");
export let AllQusetions
export let myQuiz;


startQuiz.addEventListener('click', async function () {
    if (questionsNumber.value.trim() === "") {
    showError("Please enter number of questions.");
    return;
    }else if (parseInt(questionsNumber.value) <= 0){
        showError("Please enter a valid number of questions.");
        return;
    }else{
        errorBox.classList.add("d-none");
        myQuiz = new Quiz(categoryMenu.value, difficultyOptions.value, questionsNumber.value);
        AllQusetions = await myQuiz.getQuistions();
        let question = new Question(0);
        quizOptions.classList.replace('d-flex', 'd-none');
        question.display();
    }

});    

function showError(message) {
    if (errorBox) {
        errorBox.innerText = message;
        errorBox.classList.remove("d-none");
    }
}  