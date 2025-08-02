const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanka", correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// When we give answer , number and score will be changing
// so we will create variable to store the question index and score 
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    // reset the previous question and answer
    // resetState();    // ✅
    // currentQuestionIndex = 0;
    // score = 0;
    // nextButton: Ye variable HTML ke ek button element ko refer kar raha hai.
    // .innerHTML: Ye property kisi HTML element ke andar ka text ya HTML set karne ke liye use hoti hai.
    nextButton.innerHTML = "Next";

    // html:
    // <span id="first">Hey I am span</span>
    // console:
    // first.innerHTML
    // output:
    // 'Hey I am span'

    // html 
    // <span id="first"><b>HI</b>Hey I am span</span>
    // console:
    // first.innerHTML
    // output:
    // '<b>HI</b>Hey I am span'

    showQuestion();
}

// Display the question
function showQuestion(){
    // resetState(); function ko showQuestion() ke andar isliye use kiya gaya hai taaki har naya question display hone se pehle purana question aur uske answer buttons hata diye jaayein.
    // Agar aap directly showQuestion() chalayenge bina resetState() ke, toh naye question ke options pichle ke neeche stack ho jaayenge, aur buttons duplicate ho jaayenge.
    resetState(); 
    
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    // currentQuestion.question:
    // Iska matlab hai:
    // questions[0].question → which is:
    // "Which is largest animal in the world?"

    // questionElement.innerHTML = ...:
    // Ye DOM element ke andar text set karta hai.
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    nextButton.innerHTML = "Next"; // ✅ Fix: reset button label when new question shows
    // display the answers
    currentQuestion.answers.forEach(answer => {
        // Naya <button> element banaya ja raha hai.
        const button = document.createElement("button");
        // Button ke andar ka text set kiya ja raha hai jaise:
        // "Shark"
        // "Blue whale"
        // "Elephant"
        // "Giraffe"
        button.innerHTML = answer.text;
        // Button ko CSS class "btn" assign ki gayi hai.
        // isse css mein styling apply hoga.
        // Class ko .btn se CSS mein define kiya jaata hai, lekin JavaScript mein assign karte waqt . (dot) nahi lagate.
        button.classList.add("btn");
        // answerButton ek DOM element hai (jaise ek <div id="answer-buttons">)
        // Uske andar ye button append (add) kiya gaya hai — ab button actual page par dikhne lagega.
        answerButtons.appendChild(button);
        
        // If answer.correct === true
        if(answer.correct){
            // it will do:
            // This sets a custom HTML data attribute on the button.
            // <button data-correct="true">Blue whale</button>
            // That data-correct is accessible in JavaScript later using:
            // This is helpful when you want to check later if the clicked button was correct or not.
            button.dataset.correct = answer.correct;
        }
        // Jab user kisi answer button par click kare, to selectAnswer() function chale.
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";  // 1️⃣ Hides the Next button
    // While there’s at least one child
    // Remove that first child
    // Repeat until the container is empty
    while(answerButtons.firstChild){    // 2️⃣ Loops over all answer buttons...
        answerButtons.removeChild(answerButtons.firstChild);    // // ...and removes them from the DOM
    }

    // html
    // <div id="answer-buttons">
    //     <button>Shark</button>
    //     <button>Blue whale</button>
    //     <button>Elephant</button>
    //     <button>Giraffe</button>
    // </div>

    // js
    // const answerButtons = document.getElementById("answer-buttons");

    // console.log(answerButtons.firstChild);
    // Output:
    // <button>Shark</button>

}

// Ye function tab chalta hai jab button click hota hai.
function selectAnswer(e){
    // e.target matlab kaunsa button click hua.
    // selectedBtn store e.target
    const selectedBtn = e.target;
    // data-correct="true" lagaya tha na pehle?
    // Wo check karta hai: kya button ka answer sahi hai?
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        // add the className correct
        // for these className we have to add the background color
        // so we will change the background color for the correct and incorrect className 
        // Agar answer sahi hai:
        // us button me class "correct" add karo (green color ke liye)
        selectedBtn.classList.add("correct");
        score++;
    } else {
        // add the className incorrect
        // Agar galat hai:
        // "incorrect" class add karo (red color ke liye)
        selectedBtn.classList.add("incorrect");
    }

    // we have to disable the click after selecting one answer 
    // and when we select the wrong answer it should automatically highlight the correct answer with the green color 
    // answerButtons.children ka matlab hai: HTML DOM mein ek parent element ke andar jitne bhi direct child elements hain (specifically answer buttons), unka collection.
    // Array.from(answerButtons.children) : Converts the HTMLCollection of answer buttons (presumably inside a container called answerButtons) into an array so you can use .forEach() on it.
    // .forEach(button => { ... }) : Loops through each answer button.
    Array.from(answerButtons.children).forEach(button => {
        // Checks if the button has a data-correct="true" attribute (indicating the correct answer).
        if(button.dataset.correct === "true"){
            // Adds a CSS class correct to highlight the correct answer (e.g., green background).
            button.classList.add("correct");
        }
        // Disables all the answer buttons so the user can't click again.
        button.disabled = true;
    });
    // Shows the "Next" button so the user can proceed to the next question.
    nextButton.style.display = "block";
}

function showScore(){
    // To clean up the previous question's options (answer buttons) from the screen.
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

// 3:30 hr 




// NOtes 
//          console.log and console.dir m difference

// console.log()
// Ye kisi bhi value ko string format mein ya uske default representation mein print karta hai.
// Agar aap DOM element (HTML ka ek part jo JavaScript ke through access kiya ja sakta hai.) ya object pass karte ho, to browser usko as it appears (jaise HTML structure) dikhata hai.

// const btn = document.getElementById("next-btn");
// console.log(btn);

// Output: Browser aapko DOM element ka HTML view dikhayega, jaise:
// <button id="next-btn">Next</button>

// console.dir()
// Ye JavaScript object-style tree dikhata hai.
// Jab aap console.dir() use karte ho kisi DOM element ke saath, to aapko uska property list dikhega (jaise .id, .innerHTML, .classList, etc.).

// const btn = document.getElementById("next-btn");
// console.dir(btn);

// Output: Tree structure dikhega:
// {
//   id: "next-btn",
//   innerHTML: "Next",
//   classList: DOMTokenList,
//   ...
// }

// 🧠 In Short:
// Feature	            console.log()	                        console.dir()
// Output style	    Human-readable / HTML-style	            JavaScript-style object (tree format)
// Good for	        Strings, numbers, basic logging	        Inspecting DOM elements and objects
// DOM elements view	HTML-like	                        Object-like with properties

