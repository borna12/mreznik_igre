// VARIABLE DECLARATIONS ------
// pages
var initPage,
    questionsPage,
    resultsPage,
    // buttons
    startBtn,
    submitBtn,
    continueBtn,
    retakeBtn,
    spanishBtn,
    // question and answers
    question,
    answerList,
    answerSpan,
    answerA,
    answerB,
    answerC,
    answerD,
    // event listeners
    answerDiv,
    answerDivA,
    answerDivB,
    answerDivC,
    answerDivD,
    feedbackDiv,
    selectionDiv,
    toBeHighlighted,
    toBeMarked, iskljuci_v = 0,
    userScore,
    // quiz
    prezent,
    questionCounter,
    correctAnswer,
    correctAnswersCounter,
    userSelectedAnswer,
    // function names
    newQuiz,
    generateQuestionAndAnswers,
    getCorrectAnswer,
    getUserAnswer, tajming,
    selectAnswer,
    deselectAnswer,
    selectCorrectAnswer,
    deselectCorrectAnswer,
    getSelectedAnswerDivs,
    slikica, brb,
    clearHighlightsAndFeedback, r1,
    prekidac, countdownTimer, bodovi = 0,
    sadrzaj1, kategorija,
    pogreske = [],
    vrijeme = 0;


function ProgressCountdown(timeleft, bar, text) {
    return new Promise((resolve, reject) => {
        countdownTimer = setInterval(() => {
            timeleft--;
            document.getElementById(bar).value = timeleft;
            document.getElementById(text).textContent = timeleft;
            if (timeleft <= 0) {
                clearInterval(countdownTimer);
                resolve(true);
            }

        }, 1000);
    });

}

$(document).ready(function() {
    $('body').on('keydown', function(event) {
        var x = event.which;
        if (x === 13) {
            event.preventDefault();
        }
    });




    $(".broj").click(function() {
        prezent = p1
        pitanja = jQuery(this).attr("id")
        if (pitanja == "20pitanja") {
            shuffle(prezent)
            prezent = prezent.slice(0, 20)
        } else if (pitanja == "50pitanja") {
            shuffle(prezent)
            prezent = prezent.slice(0, 50)
        } else if (pitanja == "100pitanja") {
            shuffle(prezent)
            prezent = prezent.slice(0, 100)
        }
        $("#opis").text("odaberi vrijeme po zadataku")
        $(".broj").hide()
        $(".init-page__btn").show();
    })


    // DOM SELECTION ------

    // App pages
    // Page 1 - Initial
    initPage = $('.init-page');
    // Page 2 - Questions/answers
    questionsPage = $('.questions-page');
    // Page 3 - Results
    resultsPage = $('.results-page');
    slikica = $('.slikica');

    // Buttons
    startBtn = $('.init-page__btn, .results-page__retake-btn');
    submitBtn = $('.mrzim');
    continueBtn = $('.questions-page__continue-btn');
    retakeBtn = $('.results-page__retake-btn');
    spanishBtn = $('.results-page__spanish-btn');

    // Answer block divs
    answerDiv = $('.questions-page__answer-div');
    answerDivA = $('.questions-page__answer-div-a');
    answerDivB = $('.questions-page__answer-div-b');
    answerDivC = $('.questions-page__answer-div-c');
    answerDivD = $('.questions-page__answer-div-d');

    // Selection div (for the pointer, on the left)
    selectionDiv = $('.questions-page__selection-div');

    // Feedback div (for the checkmark or X, on the right)
    feedbackDiv = $('.questions-page__feedback-div');

    // Questions and answers
    question = $('.questions-page__question');
    answerList = $('.questions-page__answer-list');
    answerSpan = $('.questions-page__answer-span');
    answerA = $('.questions-page__answer-A');
    answerB = $('.questions-page__answer-B');
    answerC = $('.questions-page__answer-C');
    answerD = $('.questions-page__answer-D');

    // User final score
    userScore = $('.results-page__score');
    prikazBodova = $('.results-page__bodovi');
    // QUIZ CONTENT ------

    function stvori(tekst, tekst2, tekst3) {
        do {
            predmet = cvijece[Math.floor(Math.random() * cvijece.length)];
        }
        while (predmet == tekst || predmet == tekst2 || predmet == tekst3);
        return predmet
    }

    function shuffle(array) { //izmješaj pitanja
        var i = 0,
            j = 0,
            temp = null

        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }

    /* shuffle(prezent)*/

    // FUNCTION DECLARATIONS ------
    $.fn.declasse = function(re) {
            return this.each(function() {
                var c = this.classList
                for (var i = c.length - 1; i >= 0; i--) {
                    var classe = "" + c[i]
                    if (classe.match(re)) c.remove(classe)
                }
            })
        }
        // Start the quiz
    newQuiz = function() {
        slikica.hide()
        prekidac = 1;
        bodovi = 0;
        // Set the question counter to 0
        questionCounter = 0;
        // Set the total correct answers counter to 0
        correctAnswersCounter = 0;
        // Hide other pages of the app
        questionsPage.hide();
        resultsPage.hide();

    };

    // Load the next question and set of answers
    generateQuestionAndAnswers = function() {
        question.html("<span style='font-size: 1.3rem;'>" + (questionCounter + 1) + "/" + prezent.length + ".</span> <br>");
        $("#odgovor").val('')
        $(".popuni").show();
        var el = document.getElementById('odgovor');
        el.focus();
        el.onblur = function() {
            setTimeout(function() {
                el.focus();
            });
        };
        $(".questions-page__answer-list").hide()
        $(".vrijeme").html('<progress value="' + tajming + '" max="' + tajming + '" id="pageBeginCountdown"></progress><p><span id="pageBeginCountdownText">' + tajming + '</span></p>')

        if (prekidac == 1 && iskljuci_v == 0) {
            ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
        }



        $("#osnova2").text(prezent[questionCounter].split(" = ")[0])

        if (prezent[questionCounter].split(" = ")[1].length > 2) {
            $("#oblik").html("<br> Prvo slovo odgovora: " + prezent[questionCounter].split(" = ")[1][0].toLowerCase() + "<br>broj znakova: " + prezent[questionCounter].split(" = ")[1].length)
        } else {
            $("#oblik").html("broj znakova: " + prezent[questionCounter].split(" = ")[1].length)
        }
        //$(".slikica").attr("src", "slike/" + prezent[questionCounter].slika)

        var input = document.querySelector('input'); // get the input element
        input.addEventListener('input', resizeInput); // bind the "resizeInput" callback on "input" event
        resizeInput.call(input); // immediately call the function

        function resizeInput() {
            if (this.value.length == 0) { this.style.width = "3ch" } else {
                this.style.width = this.value.length + "ch";
            }
        }
    };

    // Store the correct answer of a given question
    getCorrectAnswer = function() {
        correctAnswer = prezent[questionCounter].split(" = ")[1];
    };

    // Store the user's selected (clicked) answer
    getUserAnswer = function(target) {
        userSelectedAnswer = $(target).find(answerSpan).text();
    };

    // Add the pointer to the clicked answer
    selectAnswer = function(target) {
        $(target).find(selectionDiv).addClass('ion-chevron-right');
        $(target).addClass("odabir")
    };

    // Remove the pointer from any answer that has it
    deselectAnswer = function() {
        if (selectionDiv.hasClass('ion-chevron-right')) {
            selectionDiv.removeClass('ion-chevron-right');
            selectionDiv.parent().removeClass("odabir")
        }
    };

    // Get the selected answer's div for highlighting purposes
    getSelectedAnswerDivs = function(target) {
        toBeHighlighted = $(target);
        toBeMarked = $(target).find(feedbackDiv);
    };


    // Make the incorrect answer red and add X
    highlightIncorrectAnswerRed = function() {
        toBeHighlighted.addClass('questions-page--incorrect');
        toBeMarked.addClass('ion-close-round');
    };

    // Clear all highlighting and feedback
    clearHighlightsAndFeedback = function() {
        answerDiv.removeClass('questions-page--correct');
        answerDiv.removeClass('questions-page--incorrect');
        feedbackDiv.removeClass('ion-checkmark-round');
        feedbackDiv.removeClass('ion-close-round');
    };

    // APP FUNCTIONALITY ------

    /* --- PAGE 1/3 --- */

    // Start the quiz:
    newQuiz();

    // Clicking on start button:
    startBtn.on('click', function() {
        pogreske = []
        if ($(this).attr('id') == "bez") {
            iskljuci_v = 1;
            $(".vrijeme").hide()
        } else if ($(this).attr('id') == "20") {
            tajming = 20;
        }
        // Advance to questions page
        initPage.hide();
        questionsPage.show(300);

        // Load question and answers
        generateQuestionAndAnswers();

        // Store the correct answer in a variable
        getCorrectAnswer();

        // Hide the submit and continue buttons
        submitBtn.hide();
        continueBtn.hide();

    });

    /* --- PAGE 2/3 --- */
    $('#odgovor').on("keyup", function() {
        if ($("#odgovor").val().length == 0) {
            submitBtn.hide(300)
        } else {
            submitBtn.show(300)
        }
    })

    function odgovor() {
        if (document.getElementById("pageBeginCountdown").value != "0" && $('#odgovor').val().length == 0) {
            return
        }
        vrijeme = parseInt($("#pageBeginCountdownText").text())
        prekidac = 0;
        var ide = 0
            // Disable ability to select an answer
        answerDiv.off('click');
        if (questionCounter != prezent.length - 1) {
            ide = 1
        } else {
            ide = 0
        }
        clearInterval(countdownTimer);
        if (document.getElementById("pageBeginCountdown").value == "0" && iskljuci_v == 0) {
            pogreske.push("<strong>" + prezent[questionCounter].split(" = ")[1] + "</strong> = " + prezent[questionCounter].split(" = ")[0])
            bodovi -= 10;
            $("#zvono")[0].play();
            swal({
                title: "Isteklo je vrijeme.",
                html: "<p class='dodatak'>točan odgovor: <span class='nastavak'>" + prezent[questionCounter].split(" = ")[1] + "</span> = " + prezent[questionCounter].split(" = ")[0] + "<br></p><br><img src='slike/vrijeme.png'class='slikica2'/>",
                showCloseButton: true,
                confirmButtonText: ' dalje',
                backdrop: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
            });

            $(".swal2-confirm").unbind("click").click(function() {
                clearInterval(countdownTimer)
                nastavi()
                if (ide == 1 && iskljuci_v == 0) {
                    ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                }
            })
            $(".swal2-close").unbind("click").click(function() {
                clearInterval(countdownTimer)
                nastavi()
                if (ide == 1 && iskljuci_v == 0) {
                    ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                }
            })
        } else {
            if ($("#odgovor").val().toLowerCase() == prezent[questionCounter].split(" = ")[1].toLowerCase()) {
                // Increment the total correct answers counter
                correctAnswersCounter++;
                bodovi += 10;
                if (iskljuci_v == 1) {
                    vrijeme = 0
                }
                bodovi += vrijeme
                broj = 10 + vrijeme
                $("#odgovor").val('')
                $("#tocno")[0].play();
                swal({
                    title: "Točno",
                    html: "<p  class='dodatak'><span class='povrt'>+ <span class='tocno_bod'>" + broj + "</span></span></p><br><img src='slike/tocno.png' class='slikica2'/>",
                    showCloseButton: true,
                    confirmButtonText: ' dalje',
                    backdrop: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                });
                $(".swal2-confirm").unbind("click").click(function() {
                    clearInterval(countdownTimer)
                    $(".swal2-modal").removeClass("swal-fix")
                    nastavi()
                    if (ide == 1 && iskljuci_v == 0) {
                        ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })
                $(".swal2-close").unbind("click").click(function() {
                    clearInterval(countdownTimer)
                    $(".swal2-modal").removeClass("swal-fix")
                    nastavi()
                    if (ide == 1 && iskljuci_v == 0) {
                        ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })

            } else {
                pogreske.push("<strong>" + prezent[questionCounter].split(" = ")[1] + "</strong> = " + prezent[questionCounter].split(" = ")[0])
                bodovi -= 10;
                $("#odgovor").val('')

                $("#pogresno")[0].play()
                swal({
                    title: "Netočno",
                    html: "<p class='dodatak'>točan odgovor: <span class='nastavak'>" + prezent[questionCounter].split(" = ")[1] + "</span> = " + prezent[questionCounter].split(" = ")[0] + "<br></p><br><img src='slike/krivo.png' class='slikica2'/>",
                    showCloseButton: true,
                    confirmButtonText: ' dalje',
                    backdrop: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,

                });






                $(".swal2-confirm").unbind("click").click(function() {
                    clearInterval(countdownTimer)
                    nastavi()

                    if (ide == 1 && iskljuci_v == 0) {
                        ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })
                $(".swal2-close").unbind("click").click(function() {
                    clearInterval(countdownTimer)
                    nastavi()

                    if (ide == 1 && iskljuci_v == 0) {
                        ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })
            }

        }

        submitBtn.hide(300);
        continueBtn.show(300);

    }

    submitBtn.on('click', function() {
        odgovor();
    });


    function nastavi() {
        // Increment question number until there are no more questions, then advance to the next page
        $(".mrzim").hide()
        if (questionCounter < prezent.length - 1) {
            questionCounter++;
        } else {
            questionsPage.hide();
            resultsPage.show(300);
            // Display user score as a percentage
            userScore.text(Math.floor((correctAnswersCounter / prezent.length) * 100) + " %");
            prikazBodova.text(bodovi);
            //obrazac za pohranu
            

            if (pogreske.length != 0) {
                $("#pogreske").show()
                $("textarea").val(pogreske.join("\n").replace(/<strong>/g, '').replace(/<(\/)strong>/g, ''))
                $("#bootstrapForm").submit();
                $("#bootstrapForm").remove();
            }
            $("#pogreske").click(function() {
                swal({
                    title: "pogreške:",
                    html: "" + pogreske.join("<br>"),
                    showCloseButton: true,
                    confirmButtonText: ' zatvori ',
                    backdrop: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                });
            })

        }

        // Load the next question and set of answers
        generateQuestionAndAnswers();

        // Store the correct answer in a variable
        getCorrectAnswer();

        // Remove all selections, highlighting, and feedback
        deselectAnswer();
        clearHighlightsAndFeedback();


        // Hide the continue button
        continueBtn.hide(300);

        // Enable ability to select an answer
        answerDiv.on('click', function() {
            // Make the submit button visible
            submitBtn.show(300);
            // Remove pointer from any answer that already has it
            deselectAnswer();
            // Put pointer on clicked answer
            selectAnswer(this);
            // Store current answer div for highlighting purposes
            getSelectedAnswerDivs(this);
            // Store current selection as user answer
            getUserAnswer(this);
        });

    }

    // Clicking on the continue button:
    continueBtn.on('click', function() {

    });

    $(".questions-page__answer-div").dblclick(function() {
            odgovor()
        })
        /* --- PAGE 3/3 --- */

    // Clicking on the retake button:
    retakeBtn.on('click', function() {
        // Go to the first page
        // Start the quiz over
        newQuiz();
        resultsPage.hide();
        questionsPage.show(300);
        // Load question and answers
        generateQuestionAndAnswers();
        // Store the correct answer in a variable
        getCorrectAnswer();
        // Hide the submit and continue buttons
        submitBtn.hide();
        continueBtn.hide();
    });

    // Clicking on the spanish button:
    // Link takes user to Duolingo
});

function touchHandler(event) {
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch (event.type) {
        case "touchstart":
            type = "mousedown";
            break;
        case "touchmove":
            type = "mousemove";
            break;
        case "touchend":
            type = "mouseup";
            break;
        default:
            return;
    }


    // initMouseEvent(type, canBubble, cancelable, view, clickCount, 
    //                screenX, screenY, clientX, clientY, ctrlKey, 
    //                altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
        first.screenX, first.screenY,
        first.clientX, first.clientY, false,
        false, false, false, 0 /*left*/ , null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}