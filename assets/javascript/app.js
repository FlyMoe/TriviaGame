
var questions = [{
	question: "Who is the author of The Hobbit and the Lord of the Rings trilogy?", 
	answers: ["Robert Heinlein","J. R. R. Tolkien", "Isaac Asimov", "Ray Bradbury"],
	correctAnswer: 1
}, {
	question: "Who was the tallest player ever to play in the NBA?", 
	answers: ["Manute Bol" , "Shaq", "Shawn Bradley", "Patrick Ewing"],
	correctAnswer: 0
}, {	
	question: "New Orleans is known as the birthplace of what type of music?", 
	answers: ["Indie Pop", "New Age", "R&B / Soul", "Jazz"],
	correctAnswer: 3
}, {
	question: "How many Super Bowl Rings did Troy Aikman win?", 
	answers: ["1", "2", "3","4"],
	correctAnswer: 2
}, {
	question: "Superman is a fictional superhero from what fictional planet?",
	answers: ["Kryptonian", "Krypton", "Kryptonite", "Krypt"],
	correctAnswer: 1
}, {
	question: "Who painted the Sistine Chapel?", 
	answers: ["Leonardo da Vinci", "Claude Monet", "Michelangelo", "Rembrandt"],	
	correctAnswer: 2
}];

var currentQuestion = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var triviaOver = false;


// Javascript function that wraps everything
$(document).ready(function(){
	var question, answer1;

	// This handles the start button
	$(".container1").on("click", function(){
		// Hide the start div
		$(".container1").hide();

		//Start the timer
		timer();

		// Display questions and answers
		displayQA();

	});	
	
    $(".answerList").on("click", "li", function() {
	   
	    if ($(this).val() == questions[currentQuestion].correctAnswer) {
	    	var audio = new Audio("assets/mp3/applause.mp3");
	    	audio.play();
	    	
	    	// Increment the correctAnswers
            correctAnswers++;                

	    	// Stop timer
	    	stop();

	    	// Remove all current <li> elements
			$(".answerList").find("li").remove();

			// Remove the question
			$(".question").remove();

			// Display that the answer was correct
			$(".result").show(); 
			$(".result").html("Correct!")

			// Update the currentQuestion to the next set of Q&A
			currentQuestion++;

			// Set up next question
			setTimeout(function(){  

				// Remove the result
				// $(".result").remove();
				$(".result").hide(); 
				if (questions.length !== currentQuestion){
					//Start the timer
					timer();
					displayQA();
				} else {
					gameOver();
				}

			}, 7000);
			
	    } else {
	    	var audio = new Audio("assets/mp3/buzzer.wav");
	    	audio.play();
	    	
	    	// Increment the incorrectAnswers
            incorrectAnswers++;              

	    	// Stop timer
	    	stop();

	    	// Remove all current <li> elements
			$(".answerList").find("li").remove();

			// Remove the question
			$(".question").remove();
			
			// Display that the answer was wrong
			$(".result").show();
			$(".result").html("Wrong Answer! <br><br> The correct answer was "+questions[currentQuestion].answers[questions[currentQuestion].correctAnswer]);

			// Update the currentQuestion to the next set of Q&A
			currentQuestion++;

			// Set up next question
			setTimeout(function(){  

				// Hide the result
				$(".result").hide(); 


				if (questions.length !== currentQuestion){
					//Start the timer
					timer();

					// Display the next set of questions and answers
					displayQA();
				} else {
					// Game is over!
					gameOver();
				}

			}, 5000);

	    }

	});
	

});

function highlightAnswer() {

	// Add the class to highlight the answer
	$(".answer").mouseover(function(){
		$(this).addClass("highlight-yellow");
	 });

	// Remove the class so the answer isn't highlighted anymore
	$(".answer").mouseout(function(){
		$(this).removeClass("highlight-yellow");
	 });
}

function displayQA() {

	var question = questions[currentQuestion].question;  
	var questionClass = ".question";   
	var answerList = ".answerList";
    var numAnswers = questions[currentQuestion].answers.length;  
    var theQuestion = $('<div>');

    // Add the question
	theQuestion.addClass('question');
	theQuestion.text(question);
	$(".questionContainer").html(theQuestion);

    // Remove all current <li> elements (if any)
    $(answerList).find("li").remove();

    // Loop the the answers and add them to the list
    for (i = 0; i < numAnswers; i++) {
        answer = questions[currentQuestion].answers[i];
        $('<li class="answer" value="'+i+'">' + answer + '</li>').appendTo(answerList);
    }

    // Allow for highlighting of the answers.
    highlightAnswer();
}

function resetQA() {
    currentQuestion = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
}

function timer() {
	var number = 16;
	
    // $('#stop').on('click', stop);
    // $('#resume').on('click', run);
    function run(){
      counter = setInterval(decrement, 1000);
      
    }
    function decrement(){
      number--;
      $('#show-number').show();
      $('#show-number').html("Time Remaining: "+number);
      if (number === 0){
        stop();
        console.log("questions.length: "+questions.length);
         console.log("currentQuestion: "+currentQuestion);
        if (questions.length !== currentQuestion){
			outOfTime();
		} else {
			alert("Game over!");
			var audio = new Audio("assets/mp3/buzzer.wav");
	    	audio.play();
			outOfTime();
			gameOver();
		}
        
      }
    }

  run();
}

function stop() {
    clearInterval(counter);
 }

 function outOfTime() {

 	// Increment the incorrectAnswers
    incorrectAnswers++;

 	// Remove all current <li> elements
	$(".answerList").find("li").remove();

	// Remove the question
	$(".question").remove();

	$(".result").show(); 
	$(".result").html("Out Of time! <br><br> The correct answer was "+questions[currentQuestion].answers[questions[currentQuestion].correctAnswer]);

	// Update the currentQuestion to the next set of Q&A
	currentQuestion++;

	// Set up next question
	setTimeout(function(){  

		// Hide the result
		$(".result").hide();

		// If it's not the last question, create the next set of questions and answers.
		// If it is the last questions, then the game is over.
		if (questions.length !== currentQuestion){

			//Start the timer
			timer();

			//Show next question
			displayQA();

		} else {

			// Game over!!
			gameOver();

		}
	}, 5000);
 }

 function gameOver() {

	// Stop timer
	stop();

	// Remove all current <li> elements
	$(".answerList").find("li").remove();

	// Remove the question
	$(".question").remove();

	// Display that the answer was wrong
	$(".result").show();
	$(".result").html("Game over! <br><br>");
	$(".result").append("Correct Answers: "+correctAnswers+"<br><br>Incorrect Answers: "+incorrectAnswers);

	// Add the Reset Game button
	$(".nextButton").show();
	$('.nextButton').html('<input class="myButton" type="button" value="Reset Game">');
	$('.nextButton').click(function(){  
		resetGame();
	});

 }

 function resetGame () {
 	currentQuestion = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;

    // Show start button
    $(".container1").show();

    // Hide the result
	$(".result").hide();

	// Hide the result
	$(".nextButton").hide();

	// Hide number counter
	$('#show-number').hide();

 }

