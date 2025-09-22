import { AllQusetions } from "./script.js";
import { myQuiz } from "./script.js";
const questionContainer=document.querySelector('.questions .container .row' )

export class Question{
    constructor(index){
        this.index=index;
        this.category=AllQusetions[this.index].category;
        this.question=AllQusetions[this.index].question;
        this.incorrect_answers=AllQusetions[this.index].incorrect_answers;
        this.correct_answer=AllQusetions[this.index].correct_answer;
        this.allAns=[this.correct_answer,...this.incorrect_answers].sort()
        this.questionLength=AllQusetions.length;


        this.answered=false;
    }
    display() {
      let cartona = `
        <div
          class="question shadow-lg w-100 m-auto col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
        >
          <div class="w-100 d-flex justify-content-between">
            <span class="btn btn-category">${this.category}</span>
            <span class="fs-6 btn btn-questions">${this.index + 1} of ${this.questionLength}</span>
          </div>
          <h2 class="text-capitalize h4 text-center">${this.question}</h2>  
          <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">   
            ${this.allAns.map((choice) => `<li class="answer">${choice}</li>`).join('')}
          </ul>
          <h2 class="text-capitalize text-center score-color h3 fw-bold">
            <i class="bi bi-emoji-laughing"></i> Score: ${myQuiz.score}
          </h2>        
        </div>`;
      
      questionContainer.innerHTML = cartona;
    
      let allChoices = Array.from(document.querySelectorAll('.answer'));
      allChoices.forEach((answer) => {
        answer.addEventListener('click', (e) => {
          this.checkAnswer(e.target);
        });
      });
    }
    

    checkAnswer(userAnswer) {
      if (this.answered) return;
    
      if (userAnswer.innerHTML == this.correct_answer) {
        userAnswer.classList.add('correct', 'animate__animated', 'animate__pulse');
        myQuiz.score++;
      } else {
        userAnswer.classList.add('wrong', 'animate__animated', 'animate__shakeX');
    
        const allAnswers = document.querySelectorAll('.answer');
        allAnswers.forEach((answer) => {
          if (answer.innerHTML == this.correct_answer) {
            answer.classList.add('correct', 'animate__animated', 'animate__pulse');
          }
        });
      }
    
      this.index++;
      this.answered = true;
    
      setTimeout(() => {
        this.animateQuestion(userAnswer);
      }, 1000);
    
      setTimeout(() => {
        this.nextQuestion();
      }, 1000);
    }
    

    animateQuestion(element){
        element.closest('.question ').classList.remove('animate__bounceIn')
        element.closest('.question ').classList.add('animate__backOutLeft')

    }

    nextQuestion(){
      if(this.index<this.questionLength){
        let myNewQuestion=new Question(this.index)
        myNewQuestion.display()
      }else{
        questionContainer.innerHTML=`
        <div class='text-center text-white animate__animated animate__bounceIn' id='tryAgainContainer'>
                <h1> <span>${myQuiz.score == this.questionLength ? 'Congratulations 🎉 ': `your score is ${myQuiz.score} out of ${this.questionLength}`}</span></h1>
                <button class='btn btn-danger' id='tryAgainBtn'>Try Again</button>
                </div>`
                let tryAgainBtn=document.querySelector('#tryAgainBtn').addEventListener('click',function(){
                    location.reload()
                })
      }
    }
}

