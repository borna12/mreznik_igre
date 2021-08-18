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
    pitanja,
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
    highlightCorrectAnswerGreen,
    highlightIncorrectAnswerRed,
    slikica, brb,
    clearHighlightsAndFeedback, r1,
    prekidac, countdownTimer, bodovi = 0,
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

   

   // shuffle(pitanja)

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
        question.html("<span style='font-size: 1.3rem;'>" + (questionCounter + 1) + "/" + pitanja.length + ".</span> <br>");
        if (pitanja[questionCounter].question == "popuni") {
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
            $("#opis").html("<em>" + pitanja[questionCounter].vrijeme + "</em>")
            $(".vrijeme").html('<progress value="' + tajming + '" max="' + tajming + '" id="pageBeginCountdown"></progress><p><span id="pageBeginCountdownText">' + tajming + '</span></p>')
            $("body").css({
                "background-color": pitanja[questionCounter].boja_pozadine
            })

            $(".slikica").attr("src", pitanja[questionCounter].slika)
            if (prekidac == 1 && iskljuci_v == 0) {
                ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
            }


            $("#osnova").text( pitanja[questionCounter].osnova)

        } else if (pitanja[questionCounter].question == "odgovori") {
            $(".questions-page__answer-list").show();
            $(".popuni").hide();
            answerA.text(pitanja[questionCounter].answers[0]);
            if (answerA.html() == "" || null) {
                answerDivA.hide()
            } else {
                answerDivA.show()
            };
            answerB.text(pitanja[questionCounter].answers[1]);
            if (answerB.html() == "" || null) {
                answerDivB.hide()
            } else {
                answerDivB.show()
            };
            answerC.text(pitanja[questionCounter].answers[2]);
            if (answerC.html() == "" || null) {
                answerDivC.hide()
            } else {
                answerDivC.show()
            };
            answerD.text(pitanja[questionCounter].answers[3]);
            if (answerD.html() == "" || null) {
                answerDivD.hide()
            } else {
                answerDivD.show()
            };


            $("#opis").html("<em>" + pitanja[questionCounter].opis + "</em>")
            $(".vrijeme").html('<progress value="' + tajming + '" max="' + tajming + '" id="pageBeginCountdown"></progress><p><span id="pageBeginCountdownText">' + tajming + '</span> <span id="sekunde">sekundi</span> za odgovor</p>')
            $("body").css({
                "background-color": pitanja[questionCounter].boja_pozadine
            })
            if (prekidac == 1) {
                ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
            }
        }
    };

    // Store the correct answer of a given question
    getCorrectAnswer = function() {
        correctAnswer = pitanja[questionCounter].correctAnswer;
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

    // Make the correct answer green and add checkmark
    highlightCorrectAnswerGreen = function(target) {
        if (correctAnswer === answerA.text()) {
            answerDivA.addClass('questions-page--correct');
            answerDivA.find(feedbackDiv).addClass('ion-checkmark-round');
        }
        if (correctAnswer === answerB.text()) {
            answerDivB.addClass('questions-page--correct');
            answerDivB.find(feedbackDiv).addClass('ion-checkmark-round');
        }
        if (correctAnswer === answerC.text()) {
            answerDivC.addClass('questions-page--correct');
            answerDivC.find(feedbackDiv).addClass('ion-checkmark-round');
        }
        if (correctAnswer === answerD.text()) {
            answerDivD.addClass('questions-page--correct');
            answerDivD.find(feedbackDiv).addClass('ion-checkmark-round');
        }
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
        if ($(this).attr('id') == "bez") {
            iskljuci_v = 1;
            $(".vrijeme").hide()
            $('form').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSe3V_eHV3E_sqUqCUlKMUbJ1E1HLu1QdcJiB-rtgIe8MPApSw/formResponse');
            r1 = 1
            tajming = 10
        } else if ($(this).attr('id') == "20") {
            tajming = 20;
                        $('form').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSefk6kGZKlELaNR3FmctUePAGPTF3w803oq69TnSgUnqOdz2Q/formResponse');
            r1 = 2
        } else if ($(this).attr('id') == "40") {
            tajming = 40;
            $('form').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSfqRcPON2jVXDYxCNrJs4WBxRavQB-KExciQK51hBwQflSf2w/formResponse');
            r1 = 3
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

    // Clicking on an answer:
    answerDiv.on('click', function() {

        // Make the submit button visible
        submitBtn.show(300);

        // Remove pointer from any answer that already has it
        deselectAnswer();

        // Put pointer on clicked answer
        selectAnswer(this);

        // Store current selection as user answer
        getUserAnswer(this);

        // Store current answer div for highlighting purposes
        getSelectedAnswerDivs(this);

    });


    $('#odgovor').on("keyup", function() {

        if ($("#odgovor").val().length == 0) {
            submitBtn.hide(300)
        } else {
            submitBtn.show(300)
        }
    })

    var playing = false;

    $('#izgovor').on('playing', function() {
        playing = true;
        $('.zvuk').attr("src", "slike/n_zvuk.png")
    });
    $('#izgovor').on('ended', function() {
        playing = false;
        $('.zvuk').attr("src", "slike/zvuk.png")
    });

    $(".zvuk").on("click", function() {
        if (!playing) {
            var element = $(this);
            var elementID = event.target.id;
            var oggVar = (pitanja[questionCounter].zvuk);
            var audioElement = $('#izgovor')[0];
            audioElement.setAttribute('src', oggVar);
            audioElement.play();
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
        if (questionCounter != pitanja.length - 1) {
            ide = 1
        } else {
            ide = 0
        }
        clearInterval(countdownTimer);

        if (pitanja[questionCounter].question == "popuni") {
            if (document.getElementById("pageBeginCountdown").value == "0") {
                bodovi -= 10;
                $("#zvono")[0].play();

                if (pitanja[questionCounter].correctAnswer[1].length == 0) {
                    swal({
                        title: "Isteklo je vrijeme.",
                        html: "<p class='dodatak'><strong>Točan odgovor: <span class='nastavak'>" + pitanja[questionCounter].correctAnswer[0] + "</span></strong><br></p><img class='init-page__icon zvuk' src='slike/zvuk.png' /><br><img src='slike/vrijeme.png'class='slikica2'/>",
                        showCloseButton: true,
                        confirmButtonText: ' dalje',
                        backdrop: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    });
                } else {
                    swal({
                        title: "Isteklo je vrijeme.",
                        html: "<p class='dodatak'><strong>Točani odgovori su: <span class='nastavak'>" + pitanja[questionCounter].correctAnswer[0] + "</span>, <span class='nastavak'>" + pitanja[questionCounter].correctAnswer[1] + " </strong><br></p><img class='init-page__icon zvuk' src='slike/zvuk.png' /><br><img src='slike/vrijeme.png'class='slikica2'/>",
                        showCloseButton: true,
                        confirmButtonText: ' dalje',
                        backdrop: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    });
                }

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
                if ($("#odgovor").val().toLowerCase() == pitanja[questionCounter].correctAnswer[0] || $("#odgovor").val().toLowerCase() == pitanja[questionCounter].correctAnswer[1]) {
                    // Increment the total correct answers counter
                    correctAnswersCounter++;
                    bodovi += 10;
                    bodovi += vrijeme
                    broj = 10 + vrijeme

                    $("#tocno")[0].play();
                    swal({
                        title: "Točno",
                        html: "<p  class='dodatak'><span class='povrt'>+ <span class='tocno_bod'>" + broj + "</span></span></p><img class='init-page__icon zvuk' src='slike/zvuk.png' /><br><img src='slike/tocno.png' class='slikica2'/>",
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
                    bodovi -= 10;
                    if (pitanja[questionCounter].correctAnswer[1].length == 0) {

                        $("#pogresno")[0].play()
                        swal({
                            title: "Netočno",
                            html: "<p class='dodatak'><strong>Točan odgovor: <span class='nastavak'>" + pitanja[questionCounter].correctAnswer[0] + "</span></strong><br></p><img class='init-page__icon zvuk' src='slike/zvuk.png' /><br><img src='slike/krivo.png' class='slikica2'/>",
                            showCloseButton: true,
                            confirmButtonText: ' dalje',
                            backdrop: false,
                            allowOutsideClick: false,
                            allowEscapeKey: false,

                        });
                    } else {
                        swal({
                            title: "Netočno",
                            html: "<p class='dodatak'><strong>Točni odgovori mogu biti: <span class='nastavak'>" + pitanja[questionCounter].correctAnswer[0] + "</span>, <span class='nastavak'>" + pitanja[questionCounter].correctAnswer[1] + "</span></strong><br></p><img class='init-page__icon zvuk' src='slike/zvuk.png' /><br><img src='slike/krivo.png' class='slikica2'/>",
                            showCloseButton: true,
                            confirmButtonText: ' dalje',
                            backdrop: false,
                            allowOutsideClick: false,
                            allowEscapeKey: false,

                        });
                    }

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
        } // Clicking on the submit button:
    }

    submitBtn.on('click', function() {
        odgovor();
    });


    function nastavi() {
        // Increment question number until there are no more questions, then advance to the next page
        $(".mrzim").hide()
        if (questionCounter < pitanja.length - 1) {
            questionCounter++;
        } else {
            questionsPage.hide();
            resultsPage.show(300);
            // Display user score as a percentage
            postotak=Math.floor((correctAnswersCounter / pitanja.length) * 100)
            userScore.text(postotak + " %");
            prikazBodova.text(bodovi);

            $("#60656686").attr("value", bodovi)
            
            if (postotak>=90){
                ocjena=5
            }
            else if(postotak>=80){
                 ocjena=4
            }else if(postotak>=70){
                 ocjena=3
            }
            else if(postotak>=60){
                 ocjena=2
            }
            else{
                ocjena=1
            }
            
            
            $("#1487903547").attr("value", ocjena)

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
    p1 = [{
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["voda", ""],
        slika: "slike/voda.jpg",
        zvuk: "zvuk/voda.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["ptica", ""],
        slika: "slike/ptica.jpg",
        zvuk: "zvuk/ptica.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["čokolada", ""],
        slika: "slike/cokolada.jpg",
        zvuk: "zvuk/cokolada.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["ćevapčić", ""],
        slika: "slike/cevapcic.jpg",
        slika: "slike/cevapcic.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }]
    
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
    
    pitanja = p1
    shuffle(pitanja)
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