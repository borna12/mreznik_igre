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
            var oggVar = (pitanja[questionCounter].zvuk);
            var audioElement = $('#izgovor')[0];
            audioElement.setAttribute('src', oggVar);
            $("#izvor").attr("src", oggVar)
            $(".questions-page__answer-list").hide()
            $("#opis").html("<em>" + pitanja[questionCounter].vrijeme + "</em>")
            $(".vrijeme").html('<progress value="' + tajming + '" max="' + tajming + '" id="pageBeginCountdown"></progress><p><span id="pageBeginCountdownText">' + tajming + '</span></p>')
            $("#odgovor").attr("placeholder",pitanja[questionCounter].correctAnswer[0][0]+"...")
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
                        html: "<p class='dodatak'><strong>Točan odgovor: <span class='nastavak'>" + pitanja[questionCounter].correctAnswer[0] + ".</span></strong><br></p><img class='init-page__icon zvuk' src='slike/zvuk.png' /><br><img src='slike/vrijeme.png'class='slikica2'/>",
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
                $(".zvuk").unbind("click").click(function() {$("#izgovor")[0].play()})

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
                    $('#tocno')[0].play()
                    swal({
                        title: "Točno",
                        html: "<p  class='dodatak'><span class='povrt'>+ <span class='tocno_bod'>" + broj + "</span></span></p><img class='init-page__icon zvuk' src='slike/zvuk.png'  /><br><img src='slike/tocno.png' class='slikica2'/>",
                        showCloseButton: true,
                        confirmButtonText: ' dalje',
                        backdrop: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    });
                    $(".zvuk").unbind("click").click(function() {$("#izgovor")[0].play()})
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
                            html: "<p class='dodatak'><strong>Točni odgovori mogu biti: <span class='nastavak'>" + pitanja[questionCounter].correctAnswer[0] + "</span>, <span class='nastavak'>" + pitanja[questionCounter].correctAnswer[1] + "</span>.</strong><br></p><img class='init-page__icon zvuk' src='slike/zvuk.png' /><br><img src='slike/krivo.png' class='slikica2'/>",
                            showCloseButton: true,
                            confirmButtonText: ' dalje',
                            backdrop: false,
                            allowOutsideClick: false,
                            allowEscapeKey: false,

                        });
                    }
                    $(".zvuk").unbind("click").click(function() {$("#izgovor")[0].play()})


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
        zvuk: "zvuk/čokolada.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["ćevapčić", ""],
        slika: "slike/cevap.jpg",
        zvuk: "zvuk/ćevapčić.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["aerodrom", "zračna luka"],
        slika: "slike/aerodrom.jpg",
        zvuk: "zvuk/aerodrom.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["autobus", "bus"],
        slika: "slike/autobus.jpg",
        zvuk: "zvuk/autobus.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["automobil", "auto"],
        slika: "slike/auto.jpg",
        zvuk: "zvuk/auto.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["avion", "zrakoplov"],
        slika: "slike/avion.jpg",
        zvuk: "zvuk/avion.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    },  {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["banana", ""],
        slika: "slike/banana.jpg",
        zvuk: "zvuk/banana.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["banka", ""],
        slika: "slike/banka.jpg",
        zvuk: "zvuk/banka.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["beba", ""],
        slika: "slike/beba.jpg",
        zvuk: "zvuk/beba.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["bicikl", ""],
        slika: "slike/bicikl.jpg",
        zvuk: "zvuk/bicikl.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["blagajna", ""],
        slika: "slike/blagajna.jpg",
        zvuk: "zvuk/blagajna.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["bolnica", ""],
        slika: "slike/bolnica.jpg",
        zvuk: "zvuk/bolnica.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["brada", ""],
        slika: "slike/brada.jpg",
        zvuk: "zvuk/brada.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["brašno", ""],
        slika: "slike/brasno.jpg",
        zvuk: "zvuk/brašno.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["brdo", ""],
        slika: "slike/brdo.jpg",
        zvuk: "zvuk/brdo.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["breskva", ""],
        slika: "slike/breskva.jpg",
        zvuk: "zvuk/breskva.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["brod", "trajekt"],
        slika: "slike/brod.jpg",
        zvuk: "zvuk/brod.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["brokula", ""],
        slika: "slike/brokula.jpg",
        zvuk: "zvuk/brokula.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["burek", ""],
        slika: "slike/burek.jpg",
        zvuk: "zvuk/burek.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["cipela", ""],
        slika: "slike/cipela.jpg",
        zvuk: "zvuk/cipela.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["crkva", ""],
        slika: "slike/crkva.jpg",
        zvuk: "zvuk/crkva.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["cvijeće", "cvjetovi"],
        slika: "slike/cvijece.jpg",
        zvuk: "zvuk/cvijeće.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["čaj", ""],
        slika: "slike/caj.jpg",
        zvuk: "zvuk/čaj.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["čarapa", ""],
        slika: "slike/carapa.jpg",
        zvuk: "zvuk/čarapa.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["čaša", ""],
        slika: "slike/casa.jpg",
        zvuk: "zvuk/časa.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["češnjak", "bijeli luk"],
        slika: "slike/cesnjak.jpg",
        zvuk: "zvuk/češnjak.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    },  {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["diploma", ""],
        slika: "slike/diploma.jpg",
        zvuk: "zvuk/diploma.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    },  {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["prodavaonica", "trgovina"],
        slika: "slike/ducan.jpg",
        zvuk: "zvuk/dućan.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["dvorac", ""],
        slika: "slike/dvorac.jpg",
        zvuk: "zvuk/dvorac.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["džamija", ""],
        slika: "slike/dzamija.jpg",
        zvuk: "zvuk/džamija.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["džem", "pekmez"],
        slika: "slike/dzem.jpg",
        zvuk: "zvuk/džem.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["džep", ""],
        slika: "slike/dzep.jpg",
        zvuk: "zvuk/džep.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["euro", ""],
        slika: "slike/euro.jpg",
        zvuk: "zvuk/euro.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    },  {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["gaće", "gaćice"],
        slika: "slike/gace.jpg",
        zvuk: "zvuk/gaće.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["gitara", ""],
        slika: "slike/gitara.jpg",
        zvuk: "zvuk/gitara.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["glava", ""],
        slika: "slike/glava.jpg",
        zvuk: "zvuk/glava.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["gljiva", ""],
        slika: "slike/gljiva.jpg",
        zvuk: "zvuk/gljiva.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["grah", ""],
        slika: "slike/grah.jpg",
        zvuk: "zvuk/grah.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["haljina", ""],
        slika: "slike/haljina.jpg",
        zvuk: "zvuk/haljina.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["hlače", ""],
        slika: "slike/hlace.jpg",
        zvuk: "zvuk/hlače.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["hobotnica", ""],
        slika: "slike/hobotnica.jpg",
        zvuk: "zvuk/hobotnica.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["hodnik", ""],
        slika: "slike/hodnik.jpg",
        zvuk: "zvuk/hodnik.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["hotel", ""],
        slika: "slike/hotel.jpg",
        zvuk: "zvuk/hotel.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["igračka", ""],
        slika: "slike/igracka.jpg",
        zvuk: "zvuk/igračka.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    },  {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["izložba", ""],
        slika: "slike/izlozba.jpg",
        zvuk: "zvuk/izložba.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["jabuka", ""],
        slika: "slike/jabuka.jpg",
        zvuk: "zvuk/jabuka.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["jagoda", ""],
        slika: "slike/jagoda.jpg",
        zvuk: "zvuk/jagoda.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["jaje", ""],
        slika: "slike/jaje.jpg",
        zvuk: "zvuk/jaje.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["jakna", ""],
        slika: "slike/jakna.jpg",
        zvuk: "zvuk/jakna.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["jezero", ""],
        slika: "slike/jezero.jpg",
        zvuk: "zvuk/jezero.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["jezik", ""],
        slika: "slike/jezik.jpg",
        zvuk: "zvuk/jezik.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    },{
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kafić", ""],
        slika: "slike/kafic.jpg",
        zvuk: "zvuk/kafić.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kapa", ""],
        slika: "slike/kapa.jpg",
        zvuk: "zvuk/kapa.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kaput", ""],
        slika: "slike/kaput.jpg",
        zvuk: "zvuk/kaput.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kartica", ""],
        slika: "slike/kartica.jpg",
        zvuk: "zvuk/kartica.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kauč", ""],
        slika: "slike/kauc.jpg",
        zvuk: "zvuk/kauč.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kava", ""],
        slika: "slike/kava.jpg",
        zvuk: "zvuk/kava.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kazalište", ""],
        slika: "slike/kazaliste.jpg",
        zvuk: "zvuk/kazalište.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kino", ""],
        slika: "slike/kino.jpg",
        zvuk: "zvuk/kino.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kiša", ""],
        slika: "slike/kisa.jpg",
        zvuk: "zvuk/kiša.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kišobran", ""],
        slika: "slike/kisobran.jpg",
        zvuk: "zvuk/kišobran.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["knjiga", ""],
        slika: "slike/knjiga.jpg",
        zvuk: "zvuk/knjiga.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["knjižnica", ""],
        slika: "slike/knjiznica.jpg",
        zvuk: "zvuk/knjižnica.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kobasica", ""],
        slika: "slike/kobasica.jpg",
        zvuk: "zvuk/kobasica.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kofer", ""],
        slika: "slike/kofer.jpg",
        zvuk: "zvuk/kofer.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kolač", "torta"],
        slika: "slike/kolac.jpg",
        zvuk: "zvuk/kolač.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["koncert", ""],
        slika: "slike/koncert.jpg",
        zvuk: "zvuk/koncert.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["konj", ""],
        slika: "slike/konj.jpg",
        zvuk: "zvuk/konj.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kosa", ""],
        slika: "slike/kosa.jpg",
        zvuk: "zvuk/kosa.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kost", ""],
        slika: "slike/kost.jpg",
        zvuk: "zvuk/kost.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["košarka", ""],
        slika: "slike/kosarka.jpg",
        zvuk: "zvuk/košarka.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["košulja", ""],
        slika: "slike/kosulja.jpg",
        zvuk: "zvuk/košulja.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["krastavac", ""],
        slika: "slike/krastavac.jpg",
        zvuk: "zvuk/krastavac.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["krava", ""],
        slika: "slike/krava.jpg",
        zvuk: "zvuk/krava.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["krevet", ""],
        slika: "slike/krevet.jpg",
        zvuk: "zvuk/krevet.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kruh", ""],
        slika: "slike/kruh.jpg",
        zvuk: "zvuk/kruh.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["krumpir", ""],
        slika: "slike/krumpir.jpg",
        zvuk: "zvuk/krumpir.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kruška", ""],
        slika: "slike/kruska.jpg",
        zvuk: "zvuk/kruška.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["krv", ""],
        slika: "slike/krv.jpg",
        zvuk: "zvuk/krv.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kuća", ""],
        slika: "slike/kuca.jpg",
        zvuk: "zvuk/kuća.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kuhinja", ""],
        slika: "slike/kuhinja.jpg",
        zvuk: "zvuk/kuhinja.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kupaonica", ""],
        slika: "slike/kupaonica.jpg",
        zvuk: "zvuk/kupaonica.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kupus", ""],
        slika: "slike/kupus.jpg",
        zvuk: "zvuk/kupus.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["kutija", ""],
        slika: "slike/kutija.jpg",
        zvuk: "zvuk/kutija.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["lampa", "svjetiljka"],
        slika: "slike/lampa.jpg",
        zvuk: "zvuk/lampa.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["lift", "dizalo"],
        slika: "slike/dizalo.jpg",
        zvuk: "zvuk/lift.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["lignja", ""],
        slika: "slike/lignja.jpg",
        zvuk: "zvuk/lignja.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    },  {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["limun", ""],
        slika: "slike/limun.jpg",
        zvuk: "zvuk/limun.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["lišće", ""],
        slika: "slike/lisce.jpg",
        zvuk: "zvuk/lišće.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["lubenica", ""],
        slika: "slike/lubenica.jpg",
        zvuk: "zvuk/lubenica.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["mačka", ""],
        slika: "slike/macka.jpg",
        zvuk: "zvuk/mačka.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["majica", ""],
        slika: "slike/majica.jpg",
        zvuk: "zvuk/majica.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["mandarina", ""],
        slika: "slike/mandarina.jpg",
        zvuk: "zvuk/mandarina.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["marelica", ""],
        slika: "slike/marelica.jpg",
        zvuk: "zvuk/marelica.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["maslac", ""],
        slika: "slike/maslac.jpg",
        zvuk: "zvuk/maslac.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["maslina", ""],
        slika: "slike/maslina.jpg",
        zvuk: "zvuk/maslina.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["med", ""],
        slika: "slike/med.jpg",
        zvuk: "zvuk/med.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["medvjed", ""],
        slika: "slike/medvjed.jpg",
        zvuk: "zvuk/medvjed.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["mjesec", ""],
        slika: "slike/mjesec.jpg",
        zvuk: "zvuk/mjesec.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["mlijeko", ""],
        slika: "slike/mlijeko.jpg",
        zvuk: "zvuk/mlijeko.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["mobitel", "telefon"],
        slika: "slike/mobitel.jpg",
        zvuk: "zvuk/mobitel.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["more", ""],
        slika: "slike/more.jpg",
        zvuk: "zvuk/more.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["most", ""],
        slika: "slike/most.jpg",
        zvuk: "zvuk/most.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["mrkva", ""],
        slika: "slike/mrkva.jpg",
        zvuk: "zvuk/mrkva.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    },  {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["muzej", ""],
        slika: "slike/muzej.jpg",
        zvuk: "zvuk/muzej.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["naočale", ""],
        slika: "slike/naocale.jpg",
        zvuk: "zvuk/naočale.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["naranča", ""],
        slika: "slike/naranca.jpg",
        zvuk: "zvuk/naranča.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["nebo", ""],
        slika: "slike/nebo.jpg",
        zvuk: "zvuk/nebo.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["neboder", ""],
        slika: "slike/neboder.jpg",
        zvuk: "zvuk/neboder.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["noga", ""],
        slika: "slike/noga.jpg",
        zvuk: "zvuk/noga.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["nogomet", ""],
        slika: "slike/nogomet.jpg",
        zvuk: "zvuk/nogomet.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["nos", ""],
        slika: "slike/nos.jpg",
        zvuk: "zvuk/nos.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["novac", ""],
        slika: "slike/novac.jpg",
        zvuk: "zvuk/novac.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["obrva", ""],
        slika: "slike/obrva.jpg",
        zvuk: "zvuk/obrva.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["odijelo", ""],
        slika: "slike/odijelo.jpg",
        zvuk: "zvuk/odijelo.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["odjeća", "roba"],
        slika: "slike/odjeca.jpg",
        zvuk: "zvuk/odjeća.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["ogledalo", "zrcalo"],
        slika: "slike/ogledalo.jpg",
        zvuk: "zvuk/ogledalo.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["oko", ""],
        slika: "slike/oko.jpg",
        zvuk: "zvuk/oko.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["olovka", ""],
        slika: "slike/olovka.jpg",
        zvuk: "zvuk/olovka.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["orah", ""],
        slika: "slike/orah.jpg",
        zvuk: "zvuk/orah.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["ormar", ""],
        slika: "slike/ormar.jpg",
        zvuk: "zvuk/ormar.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["palačinka", ""],
        slika: "slike/palacinka.jpg",
        zvuk: "zvuk/palačinka.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["papir", ""],
        slika: "slike/papir.jpg",
        zvuk: "zvuk/papir.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["paprika", ""],
        slika: "slike/paprika.jpg",
        zvuk: "zvuk/paprika.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["papuča", "papuče"],
        slika: "slike/papuca.jpg",
        zvuk: "zvuk/papuča.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["pas", ""],
        slika: "slike/pas.jpg",
        zvuk: "zvuk/pas.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["patlidžan", ""],
        slika: "slike/patlidzan.jpg",
        zvuk: "zvuk/patliđan.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["pauk", ""],
        slika: "slike/pauk.jpg",
        zvuk: "zvuk/pauk.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["pećnica", ""],
        slika: "slike/pecnica.jpg",
        zvuk: "zvuk/pećnica.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["pidžama", ""],
        slika: "slike/pidzama.jpg",
        zvuk: "zvuk/pidžama.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["pismo", ""],
        slika: "slike/pismo.jpg",
        zvuk: "zvuk/pismo.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["pivo", ""],
        slika: "slike/pivo.jpg",
        zvuk: "zvuk/pivo.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["planina", ""],
        slika: "slike/planina.jpg",
        zvuk: "zvuk/planina.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["plaža", "more"],
        slika: "slike/plaza.jpg",
        zvuk: "zvuk/plaža.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["ploča", ""],
        slika: "slike/ploca.jpg",
        zvuk: "zvuk/ploča.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["poklon", "dar"],
        slika: "slike/poklon.jpg",
        zvuk: "zvuk/poklon.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["polica", ""],
        slika: "slike/polica.jpg",
        zvuk: "zvuk/polica.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    },  {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["policija", "policajci"],
        slika: "slike/policija.jpg",
        zvuk: "zvuk/policija.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    },  {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["povrće", ""],
        slika: "slike/povrce.jpg",
        zvuk: "zvuk/povrće.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    },  {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["prozor", ""],
        slika: "slike/prozor.jpg",
        zvuk: "zvuk/prozor.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["pulover", ""],
        slika: "slike/pulover.jpg",
        zvuk: "zvuk/pulover.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["račun", ""],
        slika: "slike/racun.jpg",
        zvuk: "zvuk/račun.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["računalo", "kompjuter"],
        slika: "slike/racunalo.jpg",
        zvuk: "zvuk/računalo.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    },  {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["restoran", ""],
        slika: "slike/restoran.jpg",
        zvuk: "zvuk/restoran.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["riba", ""],
        slika: "slike/riba.jpg",
        zvuk: "zvuk/riba.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["rijeka", ""],
        slika: "slike/rijeka.jpg",
        zvuk: "zvuk/rijeka.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["riža", ""],
        slika: "slike/riza.jpg",
        zvuk: "zvuk/riža.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["rječnik", ""],
        slika: "slike/rjecnik.jpg",
        zvuk: "zvuk/rječnik.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["ruka", ""],
        slika: "slike/ruka.jpg",
        zvuk: "zvuk/ruka.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["rukavica", ""],
        slika: "slike/rukavica.jpg",
        zvuk: "zvuk/rukavica.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["rukomet", ""],
        slika: "slike/rukomet.jpg",
        zvuk: "zvuk/rukomet.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["salata", ""],
        slika: "slike/salata.jpg",
        zvuk: "zvuk/salata.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["sendvič", ""],
        slika: "slike/sendvic.jpg",
        zvuk: "zvuk/sendvič.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["sinagoga", ""],
        slika: "slike/sinagoga.jpg",
        zvuk: "zvuk/sinagoga.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["sir", ""],
        slika: "slike/sir.jpg",
        zvuk: "zvuk/sir.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    },{
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["sladoled", ""],
        slika: "slike/sladoled.jpg",
        zvuk: "zvuk/sladoled.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["slika", ""],
        slika: "slike/slika.jpg",
        zvuk: "zvuk/slika.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["snijeg", ""],
        slika: "slike/snijeg.jpg",
        zvuk: "zvuk/snijeg.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["srce", ""],
        slika: "slike/srce.jpg",
        zvuk: "zvuk/srce.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["stablo", "drvo"],
        slika: "slike/stablo.jpg",
        zvuk: "zvuk/stablo.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["stol", ""],
        slika: "slike/stol.jpg",
        zvuk: "zvuk/stol.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["stolica", ""],
        slika: "slike/stolica.jpg",
        zvuk: "zvuk/stolica.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["svinja", ""],
        slika: "slike/svinja.jpg",
        zvuk: "zvuk/svinja.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["šalica", ""],
        slika: "slike/salica.jpg",
        zvuk: "zvuk/šalica.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["šećer", ""],
        slika: "slike/secer.jpg",
        zvuk: "zvuk/šećer.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["šešir", ""],
        slika: "slike/sesir.jpg",
        zvuk: "zvuk/šešir.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["škola", ""],
        slika: "slike/skola.jpg",
        zvuk: "zvuk/škola.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["šljiva", ""],
        slika: "slike/sljiva.jpg",
        zvuk: "zvuk/šljiva.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["šuma", ""],
        slika: "slike/suma.jpg",
        zvuk: "zvuk/šuma.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["tanjur", ""],
        slika: "slike/tanjur.jpg",
        zvuk: "zvuk/tanjur.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["televizor", ""],
        slika: "slike/televizor.jpg",
        zvuk: "zvuk/televizor.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["tikvica", ""],
        slika: "slike/tikvica.jpg",
        zvuk: "zvuk/tikvica.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["tjestenina", ""],
        slika: "slike/tjestenina.jpg",
        zvuk: "zvuk/tjestenina.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["torba", ""],
        slika: "slike/torba.jpg",
        zvuk: "zvuk/torba.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["tramvaj", ""],
        slika: "slike/tramvaj.jpg",
        zvuk: "zvuk/tramvaj.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["trepavica", "trepavice"],
        slika: "slike/trepavica.jpg",
        zvuk: "zvuk/trepavica.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["trešnja", ""],
        slika: "slike/tresnja.jpg",
        zvuk: "zvuk/trešnja.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["tržnica", ""],
        slika: "slike/trznica.jpg",
        zvuk: "zvuk/tržnica.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["ulica", ""],
        slika: "slike/ulica.jpg",
        zvuk: "zvuk/ulica.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["ured", ""],
        slika: "slike/ured.jpg",
        zvuk: "zvuk/ured.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    },  {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["vjenčanje", ""],
        slika: "slike/vjencanje.jpg",
        zvuk: "zvuk/vjenčanje.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["voće", ""],
        slika: "slike/voce.jpg",
        zvuk: "zvuk/voće.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["vrata", ""],
        slika: "slike/vrata.jpg",
        zvuk: "zvuk/vrata.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["zastava", ""],
        slika: "slike/zastava.jpg",
        zvuk: "zvuk/zastava.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["zmija", ""],
        slika: "slike/zmija.jpg",
        zvuk: "zvuk/zmija.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }, {
        question: "popuni",
        vrijeme: "pitanja",
        correctAnswer: ["zvijezda", ""],
        slika: "slike/zvijezda.jpg",
        zvuk: "zvuk/zvijezda.mp3",
        boja_pozadine: "#FCE4EC",
        time: 20,
    }
    ]
    
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