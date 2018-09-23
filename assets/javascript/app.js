
//These are the questions to be answered
var questions = [
    {
        question: '#1 - What is fifteen divided by three?',
        ans: ['three', 'one', 'five','15'],
        correct: 'five',
    },
    {
        question: '#2 - What is the answer to the previous question in Spanish?',
        ans: ['quince', 'cinco', 'uno','tes'],
        correct: 'cinco',
    },
    {
        question: '#3 - Which word is the odd one out: First- Second- Third- Forth- Fifth- Sixth- Seventh- Eighth',
        ans: ['Second', 'Third', 'Forth','Seventh'],
        correct: 'Forth',
    },
    {
        question: '#4 - In the final stretch of a marathon, you quickly ran by the person who is in second place, what place are you in?',
        ans: ['First', 'Second', 'Same','Third'],
        correct: 'Second',
    },  
    {
        question: '#5 - A farmer has 17 sheep and all but 9 die. How many are left?',
        ans: ['0', '8', '7','9'],
        correct: '9',
    },  
    {
        question: '#6 - The answer to question one, times the answer to question five, plus the answer to question two is...',
        ans: ['5', '10', '50','15'],
        correct: '50',
    },  
];

var quizTimer = (questions.length)*5; // five seconds per question (written this way for scale).


//These track the results of the quiz
var correctAns = 0; //number of right answers
var wrongAns = 0; //number of wrong answers
var noAns = 0; // number of unanswered questions
var quizResults = "";//displays the player's score (declared as a string from the get-go)

//This checks for unanswered questions (related to noAns var)
var missing = function(x){
    return x = ((questions.length) - correctAns - wrongAns);
};

//This calculates your grade (related to quizResults var)
var score = function(y){
    y = ((correctAns / questions.length)*100);
    return y = (Math.floor(y))+"%"; //allow for just one decimal point in the result and add % sign
};

//Global event listener, starts quiz
console.log("hi, we're rdy");
$("#start-btn").on("click", function() {
    renderQuiz();
});

//This functions prints the quiz in the document
function renderQuiz() {

    //First we clear all relevant elements to prevent the renders from stacking (for scale)
    $("#quiz-timer").empty();
    $("#quiz").empty();

    $("#quiz-message").text("Time left: ").append("<span id='quiz-timer'></span>"); //updates messaging

    //We print the quiz timer into the message div
    $("#quiz-timer").append(quizTimer);

    // It loops through the array of quiz questions
    for (var i = 0; i < questions.length; i++) {
        // Then dynamicaly adds each question to the document
        var a = $("<label>");
        // Adds an id with the question + index
        a.attr("id", "quiz-question-" + i);
        // adds the question as text
        a.text(questions[i].question).append("<br>");
        // appends to the quiz div
        $("#quiz").append(a).append("<br>").after("<br>");
         
        // Then it loops through the array of quiz answers
        for (var j = 0; j < questions[i].ans.length; j++) {
            // and dynamicaly adds each ans to the document
            $("#quiz-question-"+i).append("<input type='radio' name='ans"+i+"' value='"+questions[i].ans[j]+"' id='quiz-ans-"+j+"'>"+" "+questions[i].ans[j]+"<br>"); //This has to be chained together to avoid jQuery closing the input tag by default.
        };
    };
    timeQuiz();
    return;
};

//This counts down as per the quizTimer var
var timeQuiz = function(){
    z = setInterval(function() {

        //quiztimer decreases by one every sec
        quizTimer = quizTimer-1;
        $("#quiz-timer").text(quizTimer); //updates html

        // If the countdown is finished, let the player know
        if (quizTimer < 0) {
            clearInterval(z);
            $("#quiz-message").text("Your score: ").append("<span id='quiz-timer'></span>"); //updates messaging
            alert("Time's up!") //flags the player
            reviewQuiz();
            return;
        }
        }, 1000);
    return;
};

//This function reviews your answers
var reviewQuiz = function(){
    //It loops through the questions JSON
    for(i=0;i<questions.length;i++)
        $.each($("input[name='ans"+i+"']:checked"), function() {
            if ($(this).val() === questions[i].correct){
                correctAns++; //and matches the value to the correct answer
                console.log("Correct: "+correctAns);//confirm
            } else {
                wrongAns++; //else it's wrong
                console.log("Wrong: "+wrongAns);//confirm
            };
        }
    );
    $("#quiz-timer").text(score(quizResults)); //updates timer/score
    $("#quiz").html("Correct: "+correctAns+"<br>"+"Wrong: "+wrongAns+"<br>"+"Unanswered: "+missing(noAns)+"<br><br>");
    var retry = $("<button>");
    retry.attr({
        type:"button",
        class:"btn btn-dark btn-lg",
        id:"retry-btn",
    });
    retry.text("retry");
    $("#quiz").append(retry);
    $("#retry-btn").on("click", function() {
        console.log("bye?");
        window.location.reload();
    });
};