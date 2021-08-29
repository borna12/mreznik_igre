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
        question.html("<span style='font-size: 1.3rem;'>" + (questionCounter + 1) + "/" + prezent.length + "</span> <br>");
        shuffle(prezent);
        if (prezent[questionCounter].question == "popuni") {
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
            $("#opis").html("<em>" + prezent[questionCounter].vrijeme + "</em>")
            $(".vrijeme").html('<progress value="' + tajming + '" max="' + tajming + '" id="pageBeginCountdown"></progress><p><span id="pageBeginCountdownText">' + tajming + '</span></p>')
            $("body").css({
                "background-color": prezent[questionCounter].boja_pozadine
            })
            if (prekidac == 1 && iskljuci_v == 0) {
                ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
            }
            if (prezent[questionCounter].lib == "1. lice jd.") {
                lice = "ja"
            } else if (prezent[questionCounter].lib == "2. lice jd.") {
                lice = "ti"
            } else if (prezent[questionCounter].lib == "3. lice jd.") {
                lice = "on"
            } else if (prezent[questionCounter].lib == "1. lice mn.") {
                lice = "mi"
            } else if (prezent[questionCounter].lib == "2. lice mn.") {
                lice = "vi"
            } else if (prezent[questionCounter].lib == "3. lice mn.") {
                lice = "oni/ona/ono"
            } else if (prezent[questionCounter].lib == "2. lice jd. ") {
                lice = "(ti)"
            } else if (prezent[questionCounter].lib == "1. lice mn. ") {
                lice = "(mi)"
            } else if (prezent[questionCounter].lib == "2. lice mn. ") {
                lice = "(vi)"
            }

            $("#osnova").text(lice + " " + prezent[questionCounter].osnova)
            $("#glagol").text(prezent[questionCounter].glagol)
            $("#oblik").html("<span class='vrime'>" + prezent[questionCounter].vrijeme + "</span> " + prezent[questionCounter].lib)

        } else if (prezent[questionCounter].question == "odgovori") {
            $(".questions-page__answer-list").show();
            $(".popuni").hide();
            answerA.text(prezent[questionCounter].answers[0]);
            if (answerA.html() == "" || null) {
                answerDivA.hide()
            } else {
                answerDivA.show()
            };
            answerB.text(prezent[questionCounter].answers[1]);
            if (answerB.html() == "" || null) {
                answerDivB.hide()
            } else {
                answerDivB.show()
            };
            answerC.text(prezent[questionCounter].answers[2]);
            if (answerC.html() == "" || null) {
                answerDivC.hide()
            } else {
                answerDivC.show()
            };
            answerD.text(prezent[questionCounter].answers[3]);
            if (answerD.html() == "" || null) {
                answerDivD.hide()
            } else {
                answerDivD.show()
            };


            $("#opis").html("<em>" + prezent[questionCounter].opis + "</em>")
            $(".vrijeme").html('<progress value="' + tajming + '" max="' + tajming + '" id="pageBeginCountdown"></progress><p><span id="pageBeginCountdownText">' + tajming + '</span> <span id="sekunde">sekundi</span> za odgovor</p>')
            $("body").css({
                "background-color": prezent[questionCounter].boja_pozadine
            })
            if (prekidac == 1) {
                ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
            }
        }
    };

    // Store the correct answer of a given question
    getCorrectAnswer = function() {
        correctAnswer = prezent[questionCounter].correctAnswer;
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
            $('form').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSfeOlnDU5d2EQqMD4b2Gt6hvmgwSzyw3WibEWcOcQTvGHcKDw/formResponse');
            r1 = 1
            tajming = 10
        } else if ($(this).attr('id') == "20") {
            tajming = 20;
        } else if ($(this).attr('id') == "40") {
            tajming = 40;
            $('form').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSd5lYbC0-IYOWgV_KWq-odbAGmdogjMEs-W1QQrnuCVL2x2LA/formResponse');
            r1 = 2
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

        if (prezent[questionCounter].question == "popuni") {
            if (document.getElementById("pageBeginCountdown").value == "0") {
                bodovi -= 10;
                $("#zvono")[0].play();

                if (prezent[questionCounter].correctAnswer[1].length == 0) {
                    swal({
                        title: "Isteklo je vrijeme.",
                        html: "<p class='dodatak'><strong>Točan odgovor: " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[0] + "</span></strong><br></p><br><img src='slike/vrijeme.png'class='slikica2'/>",
                        showCloseButton: true,
                        confirmButtonText: ' dalje',
                        backdrop: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    });
                } else {
                    swal({
                        title: "Isteklo je vrijeme.",
                        html: "<p class='dodatak'><strong>Točani odgovori su: " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[0] + "</span>, " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[1] + " </strong><br></p><br><img src='slike/vrijeme.png'class='slikica2'/>",
                        showCloseButton: true,
                        confirmButtonText: ' dalje',
                        backdrop: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    });
                }

                if (prezent[questionCounter].pin.length > 0) {
                    $(".dodatak").append("<br><p>" + prezent[questionCounter].napomena + "</p>")
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
                if ($("#odgovor").val().toLowerCase() == prezent[questionCounter].correctAnswer[0] || $("#odgovor").val().toLowerCase() == prezent[questionCounter].correctAnswer[1]) {
                    // Increment the total correct answers counter
                    correctAnswersCounter++;
                    bodovi += 10;
                    bodovi += vrijeme
                    broj = 10 + vrijeme

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

                    if (prezent[questionCounter].pin == 1) {
                        if ($("#odgovor").val().toLowerCase() == prezent[questionCounter].correctAnswer[0]) {
                            brb = 0
                        } else {
                            brb = 1
                        }

                        odg = prezent[questionCounter].odgovori
                        shuffle(odg)
                        $(".swal2-confirm").hide()
                        $(".swal2-close").hide()
                        $(".slikica2").hide()
                        $(".dodatak").append("<p class='pitanjce'>Do koje je glasovne promjene došlo pri tvorbi oblika " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[brb] + "</span>?</p><button class='btn odgov' value='" + odg[0] + "'>" + odg[0] + "</button><button class='btn odgov' value='" + odg[1] + "'>" + odg[1] + "</button><button class='btn odgov' value='" + odg[2] + "'>" + odg[2] + "</button>")
                        $(".odgov").unbind("click").click(function() {
                            if ($(this).attr('value') == prezent[questionCounter].tocan[brb]) {
                                $(".slikica2").show()
                                $(".odgov").hide(300)
                                $(".dodatak").append("<br><p>"+prezent[questionCounter].napomena + "</p>")
                                bodovi += 10
                                $(".tocno_bod").html(parseInt($(".tocno_bod").text()) + 10)
                                $(".swal2-confirm").show()
                                $(".swal2-close").show()
                                $(".swal2-modal").addClass("swal-fix")
                            } else {
                                $(".odgov").hide(300)
                                $(".povrt").hide(300)
                                $(".dodatak").append("<br><p>Odgovor je: " +prezent[questionCounter].tocan +".<br>"+ prezent[questionCounter].napomena + "</p>")
                                $(".swal2-confirm").show()
                                $(".swal2-close").show()
                                $(".swal2-modal").addClass("swal-fix")
                                $(".swal2-modal h2").html("Netočno")
                                $(".slikica2").attr("src", "slike/krivo.png")
                                $(".slikica2").show()
                            }
                        })
                    } else if (prezent[questionCounter].pin == 2) {
                        $(".dodatak").append("<br><p>" + prezent[questionCounter].napomena + "</p>")
                    }
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
                    if (prezent[questionCounter].correctAnswer[1].length == 0) {

                        $("#pogresno")[0].play()
                        swal({
                            title: "Netočno",
                            html: "<p class='dodatak'><strong>Točan odgovor: " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[0] + "</span></strong><br></p><br><img src='slike/krivo.png' class='slikica2'/>",
                            showCloseButton: true,
                            confirmButtonText: ' dalje',
                            backdrop: false,
                            allowOutsideClick: false,
                            allowEscapeKey: false,

                        });
                    } else {
                        swal({
                            title: "Netočno",
                            html: "<p class='dodatak'><strong>Točni odgovori mogu biti: " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[0] + "</span>, " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[1] + "</span></strong><br></p><br><img src='slike/krivo.png' class='slikica2'/>",
                            showCloseButton: true,
                            confirmButtonText: ' dalje',
                            backdrop: false,
                            allowOutsideClick: false,
                            allowEscapeKey: false,

                        });
                    }



                    if (prezent[questionCounter].pin.length > 0) {
                        $(".dodatak").append("<br><p>" + prezent[questionCounter].napomena + "</p>")
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
        if (questionCounter < prezent.length - 1) {
            questionCounter++;
        } else {
            questionsPage.hide();
            resultsPage.show(300);
            // Display user score as a percentage
            userScore.text(Math.floor((correctAnswersCounter / prezent.length) * 100) + " %");
            prikazBodova.text(bodovi);

            $("#60656686").attr("value", bodovi)

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


    p1 = [ {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "pam",
            ""
        ],
        "lib": "1. lice jd.",
        "osnova": "zasi",
        "glagol": "zasipati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "paš",
            ""
        ],
        "lib": "2. lice jd.",
        "osnova": "zasi",
        "glagol": "zasipati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "pa",
            ""
        ],
        "lib": "3. lice jd.",
        "osnova": "zasi",
        "glagol": "zasipati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "pamo",
            ""
        ],
        "lib": "1. lice mn.",
        "osnova": "zasi",
        "glagol": "zasipati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "pate",
            ""
        ],
        "lib": "2. lice mn.",
        "osnova": "zasi",
        "glagol": "zasipati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "paju",
            ""
        ],
        "lib": "3. lice mn.",
        "osnova": "zasi",
        "glagol": "zasipati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "pem",
            ""
        ],
        "lib": "1. lice jd.",
        "osnova": "zas",
        "glagol": "zasuti",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "2",
        "napomena": "<p>Glagol ZASPATI u prezentu ima nastavke: <strong> -<em>im</em>, -<em>iš</em>, -<em>i</em>,-<em>imo</em>, -<em>ite</em>, -<em>u</em>. </strong></p><p> → zaspim, zaspiš, zaspi, zaspimo, zaspite, zaspu</p><p> Glagol ZASUTI u prezentu ima nastavke: <strong> -<em>em</em>, -<em>eš</em>, -<em>e</em>, -<em>emo</em>, -<em>ete</em>, -<em>u</em>. </strong></p><p> → zaspem, zaspeš, zaspe, zaspemo, zaspete, zaspu</p>"
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "peš",
            ""
        ],
        "lib": "2. lice jd.",
        "osnova": "zas",
        "glagol": "zasuti",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "2",
        "napomena": "<p>Glagol ZASPATI u prezentu ima nastavke: <strong> -<em>im</em>, -<em>iš</em>, -<em>i</em>,-<em>imo</em>, -<em>ite</em>, -<em>u</em>. </strong></p><p> → zaspim, zaspiš, zaspi, zaspimo, zaspite, zaspu</p><p> Glagol ZASUTI u prezentu ima nastavke: <strong> -<em>em</em>, -<em>eš</em>, -<em>e</em>, -<em>emo</em>, -<em>ete</em>, -<em>u</em>. </strong></p><p> → zaspem, zaspeš, zaspe, zaspemo, zaspete, zaspu</p>"
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "pe",
            ""
        ],
        "lib": "3. lice jd.",
        "osnova": "zas",
        "glagol": "zasuti",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "2",
        "napomena": "<p>Glagol ZASPATI u prezentu ima nastavke: <strong> -<em>im</em>, -<em>iš</em>, -<em>i</em>,-<em>imo</em>, -<em>ite</em>, -<em>u</em>. </strong></p><p> → zaspim, zaspiš, zaspi, zaspimo, zaspite, zaspu</p><p> Glagol ZASUTI u prezentu ima nastavke: <strong> -<em>em</em>, -<em>eš</em>, -<em>e</em>, -<em>emo</em>, -<em>ete</em>, -<em>u</em>. </strong></p><p> → zaspem, zaspeš, zaspe, zaspemo, zaspete, zaspu</p>"
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "pemo",
            ""
        ],
        "lib": "1. lice mn.",
        "osnova": "zas",
        "glagol": "zasuti",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "2",
        "napomena": "<p>Glagol ZASPATI u prezentu ima nastavke: <strong> -<em>im</em>, -<em>iš</em>, -<em>i</em>,-<em>imo</em>, -<em>ite</em>, -<em>u</em>. </strong></p><p> → zaspim, zaspiš, zaspi, zaspimo, zaspite, zaspu</p><p> Glagol ZASUTI u prezentu ima nastavke: <strong> -<em>em</em>, -<em>eš</em>, -<em>e</em>, -<em>emo</em>, -<em>ete</em>, -<em>u</em>. </strong></p><p> → zaspem, zaspeš, zaspe, zaspemo, zaspete, zaspu</p>"
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "pete",
            ""
        ],
        "lib": "2. lice mn.",
        "osnova": "zas",
        "glagol": "zasuti",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "2",
        "napomena": "<p>Glagol ZASPATI u prezentu ima nastavke: <strong> -<em>im</em>, -<em>iš</em>, -<em>i</em>,-<em>imo</em>, -<em>ite</em>, -<em>u</em>. </strong></p><p> → zaspim, zaspiš, zaspi, zaspimo, zaspite, zaspu</p><p> Glagol ZASUTI u prezentu ima nastavke: <strong> -<em>em</em>, -<em>eš</em>, -<em>e</em>, -<em>emo</em>, -<em>ete</em>, -<em>u</em>. </strong></p><p> → zaspem, zaspeš, zaspe, zaspemo, zaspete, zaspu</p>"
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "pu",
            ""
        ],
        "lib": "3. lice mn.",
        "osnova": "zas",
        "glagol": "zasuti",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "2",
        "napomena": "<p>Glagol ZASPATI u prezentu ima nastavke: <strong> -<em>im</em>, -<em>iš</em>, -<em>i</em>,-<em>imo</em>, -<em>ite</em>, -<em>u</em>. </strong></p><p> → zaspim, zaspiš, zaspi, zaspimo, zaspite, zaspu</p><p> Glagol ZASUTI u prezentu ima nastavke: <strong> -<em>em</em>, -<em>eš</em>, -<em>e</em>, -<em>emo</em>, -<em>ete</em>, -<em>u</em>. </strong></p><p> → zaspem, zaspeš, zaspe, zaspemo, zaspete, zaspu</p>"
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "ujem",
            ""
        ],
        "lib": "1. lice jd.",
        "osnova": "kup",
        "glagol": "kupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "uješ",
            ""
        ],
        "lib": "2. lice jd.",
        "osnova": "kup",
        "glagol": "kupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "uje",
            ""
        ],
        "lib": "3. lice jd.",
        "osnova": "kup",
        "glagol": "kupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "ujemo",
            ""
        ],
        "lib": "1. lice mn.",
        "osnova": "kup",
        "glagol": "kupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "ujete",
            ""
        ],
        "lib": "2. lice mn.",
        "osnova": "kup",
        "glagol": "kupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "uju",
            ""
        ],
        "lib": "3. lice mn.",
        "osnova": "kup",
        "glagol": "kupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "ujem",
            ""
        ],
        "lib": "1. lice jd.",
        "osnova": "nakup",
        "glagol": "nakupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "uješ",
            ""
        ],
        "lib": "2. lice jd.",
        "osnova": "nakup",
        "glagol": "nakupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "uje",
            ""
        ],
        "lib": "3. lice jd.",
        "osnova": "nakup",
        "glagol": "nakupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "ujemo",
            ""
        ],
        "lib": "1. lice mn.",
        "osnova": "nakup",
        "glagol": "nakupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "ujete",
            ""
        ],
        "lib": "2. lice mn.",
        "osnova": "nakup",
        "glagol": "nakupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "uju",
            ""
        ],
        "lib": "3. lice mn.",
        "osnova": "nakup",
        "glagol": "nakupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "vam",
            ""
        ],
        "lib": "1. lice jd.",
        "osnova": "spa",
        "glagol": "spavati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "vaš",
            ""
        ],
        "lib": "2. lice jd.",
        "osnova": "spa",
        "glagol": "spavati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "va",
            ""
        ],
        "lib": "3. lice jd.",
        "osnova": "spa",
        "glagol": "spavati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "vamo",
            ""
        ],
        "lib": "1. lice mn.",
        "osnova": "spa",
        "glagol": "spavati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "vate",
            ""
        ],
        "lib": "2. lice mn.",
        "osnova": "spa",
        "glagol": "spavati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "vaju",
            ""
        ],
        "lib": "3. lice mn.",
        "osnova": "spa",
        "glagol": "spavati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    }
    ]

    shuffle(p1)
    p1 = p1.slice(0, 2)
        ///sva pitanja
    p2 = [{
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "šem",
            ""
        ],
        "lib": "1. lice jd.",
        "osnova": "pi",
        "glagol": "pisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do jotacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "šeš",
            ""
        ],
        "lib": "2. lice jd.",
        "osnova": "pi",
        "glagol": "pisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do jotacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "še",
            ""
        ],
        "lib": "3. lice jd.",
        "osnova": "pi",
        "glagol": "pisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do jotacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "šemo",
            ""
        ],
        "lib": "1. lice mn.",
        "osnova": "pi",
        "glagol": "pisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do jotacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "šete",
            ""
        ],
        "lib": "2. lice mn.",
        "osnova": "pi",
        "glagol": "pisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do jotacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "šu",
            ""
        ],
        "lib": "3. lice mn.",
        "osnova": "pi",
        "glagol": "pisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do jotacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "šem",
            ""
        ],
        "lib": "1. lice jd.",
        "osnova": "napi",
        "glagol": "napisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do jotacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "šeš",
            ""
        ],
        "lib": "2. lice jd.",
        "osnova": "napi",
        "glagol": "napisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do jotacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "še",
            ""
        ],
        "lib": "3. lice jd.",
        "osnova": "napi",
        "glagol": "napisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do jotacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "šemo",
            ""
        ],
        "lib": "1. lice mn.",
        "osnova": "napi",
        "glagol": "napisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do jotacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "šete",
            ""
        ],
        "lib": "2. lice mn.",
        "osnova": "napi",
        "glagol": "napisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do jotacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "šu",
            ""
        ],
        "lib": "3. lice mn.",
        "osnova": "napi",
        "glagol": "napisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do jotacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "čem",
            ""
        ],
        "lib": "1. lice jd.",
        "osnova": "pe",
        "glagol": "peći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do palatalizacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "češ",
            ""
        ],
        "lib": "2. lice jd.",
        "osnova": "pe",
        "glagol": "peći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do palatalizacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "če",
            ""
        ],
        "lib": "3. lice jd.",
        "osnova": "pe",
        "glagol": "peći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do palatalizacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "čemo",
            ""
        ],
        "lib": "1. lice mn.",
        "osnova": "pe",
        "glagol": "peći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do palatalizacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "čete",
            ""
        ],
        "lib": "2. lice mn.",
        "osnova": "pe",
        "glagol": "peći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do palatalizacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "ku",
            ""
        ],
        "lib": "3. lice mn.",
        "osnova": "pe",
        "glagol": "peći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do palatalizacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "čem",
            ""
        ],
        "lib": "1. lice jd.",
        "osnova": "ispe",
        "glagol": "ispeći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do palatalizacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "češ",
            ""
        ],
        "lib": "2. lice jd.",
        "osnova": "ispe",
        "glagol": "ispeći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do palatalizacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "če",
            ""
        ],
        "lib": "3. lice jd.",
        "osnova": "ispe",
        "glagol": "ispeći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do palatalizacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "čemo",
            ""
        ],
        "lib": "1. lice mn.",
        "osnova": "ispe",
        "glagol": "ispeći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do palatalizacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "čete",
            ""
        ],
        "lib": "2. lice mn.",
        "osnova": "ispe",
        "glagol": "ispeći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do palatalizacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    },
    {
        "question": "popuni",
        "vrijeme": "prezent",
        "correctAnswer": [
            "ku",
            ""
        ],
        "lib": "3. lice mn.",
        "osnova": "ispe",
        "glagol": "ispeći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do palatalizacije",
            ""
        ],
        "napomena": "Da bismo odredili je li u <u>prezentu</u> riječ o palatalizaciji ili o jotaciji, treba pogledati <u>treće lice množine</u>. Ako u njemu ne dolazi do glasovne promjene, riječ je o palatalizaciji (<em>pek</em> + <em>u &gt; peku</em>), a ako i u njemu dolazi do glasovne promjene, riječ je o jotaciji (<em>pis</em> + <em>ju</em> &gt; <em>pi&scaron;u</em>)."
    }
    ];

    shuffle(p2)
    p2 = p2.slice(0, 1)

    i1 = [    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "pah",
            ""
        ],
        "lib": "1. lice jd.",
        "osnova": "zasi",
        "glagol": "zasipati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "paše",
            ""
        ],
        "lib": "2. lice jd.",
        "osnova": "zasi",
        "glagol": "zasipati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "paše",
            ""
        ],
        "lib": "3. lice jd.",
        "osnova": "zasi",
        "glagol": "zasipati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "pasmo",
            ""
        ],
        "lib": "1. lice mn.",
        "osnova": "zasi",
        "glagol": "zasipati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "paste",
            ""
        ],
        "lib": "2. lice mn.",
        "osnova": "zasi",
        "glagol": "zasipati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "pahu",
            ""
        ],
        "lib": "3. lice mn.",
        "osnova": "zasi",
        "glagol": "zasipati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "vah",
            ""
        ],
        "lib": "1. lice jd.",
        "osnova": "spa",
        "glagol": "spavati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "vaše",
            ""
        ],
        "lib": "2. lice jd.",
        "osnova": "spa",
        "glagol": "spavati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "vaše",
            ""
        ],
        "lib": "3. lice jd.",
        "osnova": "spa",
        "glagol": "spavati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "vasmo",
            ""
        ],
        "lib": "1. lice mn.",
        "osnova": "spa",
        "glagol": "spavati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "vaste",
            ""
        ],
        "lib": "2. lice mn.",
        "osnova": "spa",
        "glagol": "spavati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "vahu",
            ""
        ],
        "lib": "3. lice mn.",
        "osnova": "spa",
        "glagol": "spavati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "sah",
            ""
        ],
        "lib": "1. lice jd.",
        "osnova": "pi",
        "glagol": "pisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "saše",
            ""
        ],
        "lib": "2. lice jd.",
        "osnova": "pi",
        "glagol": "pisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "saše",
            ""
        ],
        "lib": "3. lice jd.",
        "osnova": "pi",
        "glagol": "pisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "sasmo",
            ""
        ],
        "lib": "1. lice mn.",
        "osnova": "pi",
        "glagol": "pisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "saste",
            ""
        ],
        "lib": "2. lice mn.",
        "osnova": "pi",
        "glagol": "pisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "sahu",
            ""
        ],
        "lib": "3. lice mn.",
        "osnova": "pi",
        "glagol": "pisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "ovah",
            ""
        ],
        "lib": "1. lice jd.",
        "osnova": "kup",
        "glagol": "kupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "ovaše",
            ""
        ],
        "lib": "2. lice jd.",
        "osnova": "kup",
        "glagol": "kupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "ovaše",
            ""
        ],
        "lib": "3. lice jd.",
        "osnova": "kup",
        "glagol": "kupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "ovasmo",
            ""
        ],
        "lib": "1. lice mn.",
        "osnova": "kup",
        "glagol": "kupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "ovaste",
            ""
        ],
        "lib": "2. lice mn.",
        "osnova": "kup",
        "glagol": "kupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "ovahu",
            ""
        ],
        "lib": "3. lice mn.",
        "osnova": "kup",
        "glagol": "kupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    }
    ]

    shuffle(i1)
    i1 = i1.slice(0, 2)
    i2 = [    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "cijah",
            "čah"
        ],
        "lib": "1. lice jd.",
        "osnova": "pe",
        "glagol": "peći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do sibilarizacije",
            "do jotacije"
        ],
        "napomena": "<p>Neki glagoli mogu imperfekt tvoriti na dva načina: nastavcima<strong>-<em>ijah</em>, -<em>ijaše</em>…</strong> (<em>pek</em> +<em>ijah</em> &gt; <em>pecijah</em>) ili nastavcima <strong>-<em>jah</em>, <em>jaše</em>…</strong> (<em>pek</em> + <em>jah</em> &gt; <em>pečah</em>).</p><p>Kad glagoli čija osnova završava na <strong><em>k</em></strong>, <strong><em>g</em></strong> ili <strong><em>h</em></strong> imperfekt tvorenastavcima -<em>ijah</em>,<em> -ijaše</em>,<em> -ijaše</em>,<em> -ijasmo</em>,<em> -ijaste, -ijahu</em>, provodi se <u>palatalizacija</u>.</p><p>Kad glagoli čija osnova završava na <strong><em>k</em></strong>, <strong><em>g</em></strong> ili <strong><em>h</em></strong> imperfekt tvorenastavcima <em>-jah</em>,<em> -jaše</em>,<em> -jaše</em>,<em> -jasmo</em>, <em> -jaste, -jahu</em>, provodi se <u>jotacija</u>.</p>"
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "cijaše",
            "čaše"
        ],
        "lib": "2. lice jd.",
        "osnova": "pe",
        "glagol": "peći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do sibilarizacije",
            "do jotacije"
        ],
        "napomena": "<p>Neki glagoli mogu imperfekt tvoriti na dva načina: nastavcima<strong>-<em>ijah</em>, -<em>ijaše</em>…</strong> (<em>pek</em> +<em>ijah</em> &gt; <em>pecijah</em>) ili nastavcima <strong>-<em>jah</em>, <em>jaše</em>…</strong> (<em>pek</em> + <em>jah</em> &gt; <em>pečah</em>).</p><p>Kad glagoli čija osnova završava na <strong><em>k</em></strong>, <strong><em>g</em></strong> ili <strong><em>h</em></strong> imperfekt tvorenastavcima -<em>ijah</em>,<em> -ijaše</em>,<em> -ijaše</em>,<em> -ijasmo</em>,<em> -ijaste, -ijahu</em>, provodi se <u>palatalizacija</u>.</p><p>Kad glagoli čija osnova završava na <strong><em>k</em></strong>, <strong><em>g</em></strong> ili <strong><em>h</em></strong> imperfekt tvorenastavcima <em>-jah</em>,<em> -jaše</em>,<em> -jaše</em>,<em> -jasmo</em>, <em> -jaste, -jahu</em>, provodi se <u>jotacija</u>.</p>"
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "cijaše",
            "čaše"
        ],
        "lib": "3. lice jd.",
        "osnova": "pe",
        "glagol": "peći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do sibilarizacije",
            "do jotacije"
        ],
        "napomena":"<p>Neki glagoli mogu imperfekt tvoriti na dva načina: nastavcima<strong>-<em>ijah</em>, -<em>ijaše</em>…</strong> (<em>pek</em> +<em>ijah</em> &gt; <em>pecijah</em>) ili nastavcima <strong>-<em>jah</em>, <em>jaše</em>…</strong> (<em>pek</em> + <em>jah</em> &gt; <em>pečah</em>).</p><p>Kad glagoli čija osnova završava na <strong><em>k</em></strong>, <strong><em>g</em></strong> ili <strong><em>h</em></strong> imperfekt tvorenastavcima -<em>ijah</em>,<em> -ijaše</em>,<em> -ijaše</em>,<em> -ijasmo</em>,<em> -ijaste, -ijahu</em>, provodi se <u>palatalizacija</u>.</p><p>Kad glagoli čija osnova završava na <strong><em>k</em></strong>, <strong><em>g</em></strong> ili <strong><em>h</em></strong> imperfekt tvorenastavcima <em>-jah</em>,<em> -jaše</em>,<em> -jaše</em>,<em> -jasmo</em>, <em> -jaste, -jahu</em>, provodi se <u>jotacija</u>.</p>"
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "cijasmo",
            "časmo"
        ],
        "lib": "1. lice mn.",
        "osnova": "pe",
        "glagol": "peći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do sibilarizacije",
            "do jotacije"
        ],
        "napomena": "<p>Neki glagoli mogu imperfekt tvoriti na dva načina: nastavcima<strong>-<em>ijah</em>, -<em>ijaše</em>…</strong> (<em>pek</em> +<em>ijah</em> &gt; <em>pecijah</em>) ili nastavcima <strong>-<em>jah</em>, <em>jaše</em>…</strong> (<em>pek</em> + <em>jah</em> &gt; <em>pečah</em>).</p><p>Kad glagoli čija osnova završava na <strong><em>k</em></strong>, <strong><em>g</em></strong> ili <strong><em>h</em></strong> imperfekt tvorenastavcima -<em>ijah</em>,<em> -ijaše</em>,<em> -ijaše</em>,<em> -ijasmo</em>,<em> -ijaste, -ijahu</em>, provodi se <u>palatalizacija</u>.</p><p>Kad glagoli čija osnova završava na <strong><em>k</em></strong>, <strong><em>g</em></strong> ili <strong><em>h</em></strong> imperfekt tvorenastavcima <em>-jah</em>,<em> -jaše</em>,<em> -jaše</em>,<em> -jasmo</em>, <em> -jaste, -jahu</em>, provodi se <u>jotacija</u>.</p>"
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "cijaste",
            "časte"
        ],
        "lib": "2. lice mn.",
        "osnova": "pe",
        "glagol": "peći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do sibilarizacije",
            "do jotacije"
        ],
        "napomena": "<p>Neki glagoli mogu imperfekt tvoriti na dva načina: nastavcima<strong>-<em>ijah</em>, -<em>ijaše</em>…</strong> (<em>pek</em> +<em>ijah</em> &gt; <em>pecijah</em>) ili nastavcima <strong>-<em>jah</em>, <em>jaše</em>…</strong> (<em>pek</em> + <em>jah</em> &gt; <em>pečah</em>).</p><p>Kad glagoli čija osnova završava na <strong><em>k</em></strong>, <strong><em>g</em></strong> ili <strong><em>h</em></strong> imperfekt tvorenastavcima -<em>ijah</em>,<em> -ijaše</em>,<em> -ijaše</em>,<em> -ijasmo</em>,<em> -ijaste, -ijahu</em>, provodi se <u>palatalizacija</u>.</p><p>Kad glagoli čija osnova završava na <strong><em>k</em></strong>, <strong><em>g</em></strong> ili <strong><em>h</em></strong> imperfekt tvorenastavcima <em>-jah</em>,<em> -jaše</em>,<em> -jaše</em>,<em> -jasmo</em>, <em> -jaste, -jahu</em>, provodi se <u>jotacija</u>.</p>"
    },
    {
        "question": "popuni",
        "vrijeme": "imperfekt",
        "correctAnswer": [
            "cijahu",
            "čahu"
        ],
        "lib": "3. lice mn.",
        "osnova": "pe",
        "glagol": "peći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do sibilarizacije",
            "do jotacije"
        ],
        "napomena":"<p>Neki glagoli mogu imperfekt tvoriti na dva načina: nastavcima<strong>-<em>ijah</em>, -<em>ijaše</em>…</strong> (<em>pek</em> +<em>ijah</em> &gt; <em>pecijah</em>) ili nastavcima <strong>-<em>jah</em>, <em>jaše</em>…</strong> (<em>pek</em> + <em>jah</em> &gt; <em>pečah</em>).</p><p>Kad glagoli čija osnova završava na <strong><em>k</em></strong>, <strong><em>g</em></strong> ili <strong><em>h</em></strong> imperfekt tvorenastavcima -<em>ijah</em>,<em> -ijaše</em>,<em> -ijaše</em>,<em> -ijasmo</em>,<em> -ijaste, -ijahu</em>, provodi se <u>palatalizacija</u>.</p><p>Kad glagoli čija osnova završava na <strong><em>k</em></strong>, <strong><em>g</em></strong> ili <strong><em>h</em></strong> imperfekt tvorenastavcima <em>-jah</em>,<em> -jaše</em>,<em> -jaše</em>,<em> -jasmo</em>, <em> -jaste, -jahu</em>, provodi se <u>jotacija</u>.</p>"
    }
    ]

    shuffle(i2)
    i2 = i2.slice(0, 1)

    im1 = [ {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "paj",
            ""
        ],
        "lib": "2. lice jd. ",
        "osnova": "zasi",
        "glagol": "zasipati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "pajmo",
            ""
        ],
        "lib": "1. lice mn. ",
        "osnova": "zasi",
        "glagol": "zasipati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "pajte",
            ""
        ],
        "lib": "2. lice mn. ",
        "osnova": "zasi",
        "glagol": "zasipati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "pi",
            ""
        ],
        "lib": "2. lice jd. ",
        "osnova": "zas",
        "glagol": "zasuti",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "pimo",
            ""
        ],
        "lib": "1. lice mn. ",
        "osnova": "zas",
        "glagol": "zasuti",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "pite",
            ""
        ],
        "lib": "2. lice mn. ",
        "osnova": "zas",
        "glagol": "zasuti",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "vaj",
            ""
        ],
        "lib": "2. lice jd. ",
        "osnova": "spa",
        "glagol": "spavati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "vajmo",
            ""
        ],
        "lib": "1. lice mn. ",
        "osnova": "spa",
        "glagol": "spavati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "vajte",
            ""
        ],
        "lib": "2. lice mn. ",
        "osnova": "spa",
        "glagol": "spavati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "pi",
            ""
        ],
        "lib": "2. lice jd. ",
        "osnova": "zas",
        "glagol": "zaspati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "pimo",
            ""
        ],
        "lib": "1. lice mn. ",
        "osnova": "zas",
        "glagol": "zaspati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "pite",
            ""
        ],
        "lib": "2. lice mn. ",
        "osnova": "zas",
        "glagol": "zaspati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "ši",
            ""
        ],
        "lib": "2. lice jd. ",
        "osnova": "pi",
        "glagol": "pisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "šimo",
            ""
        ],
        "lib": "1. lice mn. ",
        "osnova": "pi",
        "glagol": "pisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "šite",
            ""
        ],
        "lib": "2. lice mn. ",
        "osnova": "pi",
        "glagol": "pisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "ci",
            ""
        ],
        "lib": "2. lice jd. ",
        "osnova": "ispe",
        "glagol": "ispeći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "cimo",
            ""
        ],
        "lib": "1. lice mn. ",
        "osnova": "ispe",
        "glagol": "ispeći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "cite",
            ""
        ],
        "lib": "2. lice mn. ",
        "osnova": "ispe",
        "glagol": "ispeći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "uj",
            ""
        ],
        "lib": "2. lice jd. ",
        "osnova": "kup",
        "glagol": "kupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "ujte",
            ""
        ],
        "lib": "2. lice mn. ",
        "osnova": "kup",
        "glagol": "kupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "uj",
            ""
        ],
        "lib": "2. lice jd. ",
        "osnova": "nakup",
        "glagol": "nakupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "ujmo",
            ""
        ],
        "lib": "1. lice mn. ",
        "osnova": "nakup",
        "glagol": "nakupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "ujte",
            ""
        ],
        "lib": "2. lice mn. ",
        "osnova": "nakup",
        "glagol": "nakupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    }
    ]

    shuffle(im1)
    im1 = im1.slice(0, 2)

    im2 = [{
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "ši",
            ""
        ],
        "lib": "2. lice jd. ",
        "osnova": "napi",
        "glagol": "napisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do jotacije",
            ""
        ],
        "napomena": "<p>U imperativu nekih glagola ispred nastavaka <em>-ji</em>,<em> -jimo</em>, <em> -jite </em>provodi se <u>jotacija</u>.</p>"
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "šimo",
            ""
        ],
        "lib": "1. lice mn. ",
        "osnova": "napi",
        "glagol": "napisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do jotacije",
            ""
        ],
        "napomena":  "<p>U imperativu nekih glagola ispred nastavaka <em>-ji</em>,<em> -jimo</em>, <em> -jite </em>provodi se <u>jotacija</u>.</p>"
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "šite",
            ""
        ],
        "lib": "2. lice mn. ",
        "osnova": "napi",
        "glagol": "napisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do jotacije",
            ""
        ],
        "napomena":  "<p>U imperativu nekih glagola ispred nastavaka <em>-ji</em>,<em> -jimo</em>, <em> -jite </em>provodi se <u>jotacija</u>.</p>"
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "ci",
            ""
        ],
        "lib": "2. lice jd. ",
        "osnova": "pe",
        "glagol": "peći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do sibilarizacije",
            ""
        ],
        "napomena":  "<p>U imperativu nekih glagola ispred nastavaka <em>-ji</em>,<em> -jimo</em>, <em> -jite </em>provodi se <u>jotacija</u>.</p>"
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "cimo",
            ""
        ],
        "lib": "1. lice mn. ",
        "osnova": "pe",
        "glagol": "peći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do sibilarizacije",
            ""
        ],
        "napomena":  "<p>U imperativu nekih glagola ispred nastavaka <em>-ji</em>,<em> -jimo</em>, <em> -jite </em>provodi se <u>jotacija</u>.</p>"
    },
    {
        "question": "popuni",
        "vrijeme": "imperativ",
        "correctAnswer": [
            "cite",
            ""
        ],
        "lib": "2. lice mn. ",
        "osnova": "pe",
        "glagol": "peći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do sibilarizacije",
            ""
        ],
        "napomena":  "<p>U imperativu nekih glagola ispred nastavaka <em>-ji</em>,<em> -jimo</em>, <em> -jite </em>provodi se <u>jotacija</u>.</p>"
    }
    ]

    shuffle(im2)
    im2 = im2.slice(0, 1)


    aor1 = [    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "uh",
            ""
        ],
        "lib": "1. lice jd.",
        "osnova": "zas",
        "glagol": "zasuti",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "u",
            ""
        ],
        "lib": "2. lice jd.",
        "osnova": "zas",
        "glagol": "zasuti",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "u",
            ""
        ],
        "lib": "3. lice jd.",
        "osnova": "zas",
        "glagol": "zasuti",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "usmo",
            ""
        ],
        "lib": "1. lice mn.",
        "osnova": "zas",
        "glagol": "zasuti",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "uste",
            ""
        ],
        "lib": "2. lice mn.",
        "osnova": "zas",
        "glagol": "zasuti",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "uše",
            ""
        ],
        "lib": "3. lice mn.",
        "osnova": "zas",
        "glagol": "zasuti",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "pah",
            ""
        ],
        "lib": "1. lice jd.",
        "osnova": "zas",
        "glagol": "zaspati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "pa",
            ""
        ],
        "lib": "2. lice jd.",
        "osnova": "zas",
        "glagol": "zaspati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "pa",
            ""
        ],
        "lib": "3. lice jd.",
        "osnova": "zas",
        "glagol": "zaspati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "pasmo",
            ""
        ],
        "lib": "1. lice mn.",
        "osnova": "zas",
        "glagol": "zaspati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "paste",
            ""
        ],
        "lib": "2. lice mn.",
        "osnova": "zas",
        "glagol": "zaspati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "paše",
            ""
        ],
        "lib": "3. lice mn.",
        "osnova": "zas",
        "glagol": "zaspati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "sah",
            ""
        ],
        "lib": "1. lice jd.",
        "osnova": "napi",
        "glagol": "napisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "sa",
            ""
        ],
        "lib": "2. lice jd.",
        "osnova": "napi",
        "glagol": "napisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "sa",
            ""
        ],
        "lib": "3. lice jd.",
        "osnova": "napi",
        "glagol": "napisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "sasmo",
            ""
        ],
        "lib": "1. lice mn.",
        "osnova": "napi",
        "glagol": "napisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "saste",
            ""
        ],
        "lib": "2. lice mn.",
        "osnova": "napi",
        "glagol": "napisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "saše",
            ""
        ],
        "lib": "3. lice mn.",
        "osnova": "napi",
        "glagol": "napisati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "koh",
            ""
        ],
        "lib": "1. lice jd.",
        "osnova": "ispe",
        "glagol": "ispeći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "kosmo",
            ""
        ],
        "lib": "1. lice mn.",
        "osnova": "ispe",
        "glagol": "ispeći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "koste",
            ""
        ],
        "lib": "2. lice mn.",
        "osnova": "ispe",
        "glagol": "ispeći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "koše",
            ""
        ],
        "lib": "3. lice mn.",
        "osnova": "ispe",
        "glagol": "ispeći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "ovah",
            ""
        ],
        "lib": "1. lice jd.",
        "osnova": "nakup",
        "glagol": "nakupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "ova",
            ""
        ],
        "lib": "2. lice jd.",
        "osnova": "nakup",
        "glagol": "nakupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "ova",
            ""
        ],
        "lib": "3. lice jd.",
        "osnova": "nakup",
        "glagol": "nakupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "ovasmo",
            ""
        ],
        "lib": "1. lice mn.",
        "osnova": "nakup",
        "glagol": "nakupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "ovaste",
            ""
        ],
        "lib": "2. lice mn.",
        "osnova": "nakup",
        "glagol": "nakupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "ovaše",
            ""
        ],
        "lib": "3. lice mn.",
        "osnova": "nakup",
        "glagol": "nakupovati",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": ""
    }]
    shuffle(aor1)
    aor1 = aor1.slice(0, 2)

    aor2 = [{
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "če",
            ""
        ],
        "lib": "2. lice jd.",
        "osnova": "ispe",
        "glagol": "ispeći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do palatalizacije",
            ""
        ],
        "napomena": "<p>U <u>aoristu</u> glagola čija osnova završava na<strong><em>k</em></strong>, <strong><em>g</em></strong> ili<strong><em>h</em></strong> dolazi do <u>palatalizacije</u> u <u>2. i 3. licu jednine</u>, ispred nastavka <strong><em>e</em></strong>:    <em>ispek</em> + <em>e</em> &gt; <em>ispeče</em>.</p>"
    },
    {
        "question": "popuni",
        "vrijeme": "aorist",
        "correctAnswer": [
            "če",
            ""
        ],
        "lib": "3. lice jd.",
        "osnova": "ispe",
        "glagol": "ispeći",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "1",
        "odgovori": [
            "do jotacije",
            "do sibilarizacije",
            "do palatalizacije"
        ],
        "tocan": [
            "do palatalizacije",
            ""
        ],
        "napomena":"<p>U <u>aoristu</u> glagola čija osnova završava na<strong><em>k</em></strong>, <strong><em>g</em></strong> ili<strong><em>h</em></strong> dolazi do <u>palatalizacije</u> u <u>2. i 3. licu jednine</u>, ispred nastavka <strong><em>e</em></strong>:    <em>ispek</em> + <em>e</em> &gt; <em>ispeče</em>.</p>"
    }]

    shuffle(aor2)
    aor2 = aor2.slice(0, 1)

    prezent = p1.concat(p2, i1, i2, im1, im2, aor1, aor2)
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