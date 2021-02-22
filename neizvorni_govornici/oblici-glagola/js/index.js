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
    vrijeme = 0,
    randbroj = 0;

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
        $("body").css({
            "background-color": prezent[questionCounter].boja_pozadine

        })
        if (prekidac == 1 && iskljuci_v == 0) {
            ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
        }
        randbroj = Math.floor((Math.random() * (prezent[questionCounter].lica.length - 1)) + 0);
        $("#osnova").text(prezent[questionCounter].osnova[randbroj])
        $("#osnova2").html(prezent[questionCounter].osnova2 + prezent[questionCounter].lica[randbroj].substr(prezent[questionCounter].lica[randbroj].length - 18, prezent[questionCounter].lica[randbroj].length))
        $("#oblik").html(prezent[questionCounter].lica[randbroj].substr(0, prezent[questionCounter].lica[randbroj].length - 18) + "<br><span class='vrime'>" + prezent[questionCounter].hint + "</span>")
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
        } else if ($(this).attr('id') == "20") {
            tajming = 20;
        } else if ($(this).attr('id') == "40") {
            tajming = 40;
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
            if (document.getElementById("pageBeginCountdown").value == "0" && iskljuci_v != 1) {
                bodovi -= 10;
                $("#zvono")[0].play();
                swal({
                    title: "Isteklo je vrijeme.",
                    html: "<p class='dodatak'><strong>Točan odgovor je: " + prezent[questionCounter].osnova[randbroj] + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[randbroj] + "</span></strong>" + prezent[questionCounter].osnova2 + prezent[questionCounter].lica[randbroj].substr(prezent[questionCounter].lica[randbroj].length - 18, prezent[questionCounter].lica[randbroj].length) + "<br></p><br><p class='glagol'>" + prezent[questionCounter].hint + "</p><table style='width: 100%;' border='1' cellpadding='3' > <tbody> <tr> <td style='border:0px'>&nbsp;</td><td >&nbsp;<span style='color:#0162F3; font-wieight:600'>jednina</span></td><td>&nbsp;<span style='color:#0162F3;  font-wieight:600'>množina</span></td></tr><tr> <td>&nbsp;<span style='color:#0162F3; font-wieight:600'>1. lice</span></td><td>" + prezent[questionCounter].correctAnswer[0].toLowerCase() + "</td><td>" + prezent[questionCounter].correctAnswer[3].toLowerCase() + "</td></tr><tr> <td>&nbsp;<span style='color:#0162F3; font-wieight:600'>2. lice</span></td><td>" + prezent[questionCounter].correctAnswer[1].toLowerCase() + "</td><td>" + prezent[questionCounter].correctAnswer[4].toLowerCase() + "</td></tr><tr> <td>&nbsp;<span style='color:#0162F3; font-wieight:600'>3. lice</span></td><td>" + prezent[questionCounter].correctAnswer[2].toLowerCase() + "</td><td>" + prezent[questionCounter].correctAnswer[5].toLowerCase() + "</td></tr></tbody></table>",
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
                if ($('#odgovor').val().length == 0) {
                    return
                }
                if ($("#odgovor").val() == prezent[questionCounter].correctAnswer[randbroj]) {
                    // Increment the total correct answers counter
                    correctAnswersCounter++;
                    bodovi += 10;
                    if (iskljuci_v != 1) {
                        bodovi += vrijeme
                        broj = 10 + vrijeme
                    } else {
                        broj = 10
                    }
                    $("#tocno")[0].play();
                    swal({
                        title: "Točno",
                        html: "<p  class='dodatak'><span class='povrt'>+ <span class='tocno_bod'>" + broj + "</span></span></p><br><p class='glagol'>" + prezent[questionCounter].hint + "</p><table style='width: 100%;' border='1' cellpadding='3' > <tbody> <tr> <td style='border:0px'>&nbsp;</td><td >&nbsp;<span style='color:#0162F3; font-wieight:600'>jednina</span></td><td>&nbsp;<span style='color:#0162F3;  font-wieight:600'>množina</span></td></tr><tr> <td>&nbsp;<span style='color:#0162F3; font-wieight:600'>1. lice</span></td><td>" + prezent[questionCounter].correctAnswer[0].toLowerCase() + "</td><td>" + prezent[questionCounter].correctAnswer[3].toLowerCase() + "</td></tr><tr> <td>&nbsp;<span style='color:#0162F3; font-wieight:600'>2. lice</span></td><td>" + prezent[questionCounter].correctAnswer[1].toLowerCase() + "</td><td>" + prezent[questionCounter].correctAnswer[4].toLowerCase() + "</td></tr><tr> <td>&nbsp;<span style='color:#0162F3; font-wieight:600'>3. lice</span></td><td>" + prezent[questionCounter].correctAnswer[2].toLowerCase() + "</td><td>" + prezent[questionCounter].correctAnswer[5].toLowerCase() + "</td></tr></tbody></table>",
                        showCloseButton: true,
                        confirmButtonText: ' dalje',
                        backdrop: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    });
                    $(".swal2-confirm").unbind("click").click(function() {

                        if (iskljuci_v != 1) {
                            clearInterval(countdownTimer)
                        }
                        $(".swal2-modal").removeClass("swal-fix")
                        nastavi()
                        if (ide == 1 && iskljuci_v == 0) {
                            ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                        }
                    })
                    $(".swal2-close").unbind("click").click(function() {
                        if (iskljuci_v != 1) { clearInterval(countdownTimer) }
                        $(".swal2-modal").removeClass("swal-fix")
                        nastavi()
                        if (ide == 1 && iskljuci_v == 0) {
                            ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                        }
                    })
                } else {
                    bodovi -= 10;
                    $("#pogresno")[0].play()
                    swal({
                        title: "Netočno",
                        html: "<p class='dodatak'><strong>Točan odgovor je: " + prezent[questionCounter].osnova[randbroj] + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[randbroj] + "</span>" + prezent[questionCounter].osnova2 + prezent[questionCounter].lica[randbroj].substr(prezent[questionCounter].lica[randbroj].length - 18, prezent[questionCounter].lica[randbroj].length) + "</strong><br></p><br><p class='glagol'>" + prezent[questionCounter].hint + "</p><table style='width: 100%;' border='1' cellpadding='3' > <tbody> <tr> <td style='border:0px'>&nbsp;</td><td >&nbsp;<span style='color:#0162F3; font-wieight:600'>jednina</span></td><td>&nbsp;<span style='color:#0162F3;  font-wieight:600'>množina</span></td></tr><tr> <td>&nbsp;<span style='color:#0162F3; font-wieight:600'>1. lice</span></td><td>" + prezent[questionCounter].correctAnswer[0].toLowerCase() + "</td><td>" + prezent[questionCounter].correctAnswer[3].toLowerCase() + "</td></tr><tr> <td>&nbsp;<span style='color:#0162F3; font-wieight:600'>2. lice</span></td><td>" + prezent[questionCounter].correctAnswer[1].toLowerCase() + "</td><td>" + prezent[questionCounter].correctAnswer[4].toLowerCase() + "</td></tr><tr> <td>&nbsp;<span style='color:#0162F3; font-wieight:600'>3. lice</span></td><td>" + prezent[questionCounter].correctAnswer[2].toLowerCase() + "</td><td>" + prezent[questionCounter].correctAnswer[5].toLowerCase() + "</td></tr></tbody></table>",
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
            userScore.text(Math.floor((correctAnswersCounter / prezent.length) * 100) + "%");
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
    continueBtn.on('click', function() {});
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
            "question": "popuni",
            "hint": "pomagati (engl. to help)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Pomažem",
                "Pomažeš",
                "Pomaže",
                "Pomažemo",
                "Pomažete",
                "Pomažu"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " starijim ljudima.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "vjerovati (engl. to trust)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Vjerujem",
                "Vjeruješ",
                "Vjeruje",
                "Vjerujemo",
                "Vjerujete",
                "Vjeruju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " prijateljima.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "veseliti se (engl. to be happy)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Veselim se",
                "Veseliš se",
                "Veseli se",
                "Veselimo se",
                "Veselite se",
                "Vesele se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " filmu.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "zahvaljivati (engl. to be thankful)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Zahvaljujem",
                "Zahvaljuješ",
                "Zahvaljuje",
                "Zahvaljujemo",
                "Zahvaljujete",
                "Zahvaljuju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " svojim kolegama na pomoći.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "pokloniti (engl. to give, to donate)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Poklanjam",
                "Poklanjaš",
                "Poklanja",
                "Poklanjamo",
                "Poklanjate",
                "Poklanjaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " dar prijatelju.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "radovati se (engl. to look forward to)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Radujem se",
                "Raduješ se",
                "Raduje se",
                "Radujemo se",
                "Radajete se",
                "Raduju se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " ljetu.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "smijati se (engl. to laugh)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Smijem se",
                "Smiješ se",
                "Smije se",
                "Smijemo se",
                "Smijete se",
                "Smiju se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " vicu.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "čuditi se (engl. to wonder)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "čudim se",
                "čudiš se",
                "čudi se",
                "čudimo se",
                "čudite se",
                "čude se"
            ],
            "osnova": ["Ne ", "Ne ", "Ne ", "Ne ", "Ne ", "Ne "],
            "osnova2": " što su građani zabrinuti.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "prigovarati (engl. to complain about)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Prigovaram",
                "Prigovaraš",
                "Prigovara",
                "Prigovaramo",
                "Prigovarate",
                "Prigovaraju"
            ],
            "osnova": "",
            "osnova2": " zbog loše hrane u kantini.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "dati (engl. to give)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "dajem",
                "daješ",
                "daje",
                "dajemo",
                "dajete",
                "daju"
            ],
            "osnova": ["Poklon ", "Poklon ", "Poklon ", "Poklon ", "Poklon ", "Poklon "],
            "osnova2": " prijateljima za rođendan.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "slati (engl. to send)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "šaljem",
                "šalješ",
                "šalje",
                "šaljemo",
                "šaljete",
                "šalju"
            ],
            "osnova": ["Poruke redovito ", "Poruke redovito ", "Poruke redovito ", "Poruke redovito ", "Poruke redovito ", "Poruke redovito "],
            "osnova2": " prijateljima.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "približavati se (engl. to approach)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Približavam se",
                "Približavaš se",
                "Približava se",
                "Približavamo se",
                "Približavate se",
                "Približavaju se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " Zagrebu.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "pisati (engl. to write)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Pišem",
                "Pišeš",
                "Piše",
                "Pišemo",
                "Pišete",
                "Pišu"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " knjigu.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "smetati (engl. to bother)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Smetam",
                "Smetaš",
                "Smeta",
                "Smetamo",
                "Smetate",
                "Smetaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " studentima koji uče.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "vjerovati (engl. to belive)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Vjerujem",
                "Vjeruješ",
                "Vjeruje",
                "Vjerujemo",
                "Vjerujete",
                "Vjeruju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " drugim ljudima.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "nadati se (engl. to hope)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Nadam se",
                "Nadaš se",
                "Nada se",
                "Nadamo se",
                "Nadate se",
                "Nadaju se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " da će hrvatska reprezentacija pobijediti.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "diviti se (engl. to admire)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Divim se",
                "Diviš se",
                "Divi se",
                "Divimo se",
                "Divite se",
                "Dive se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " lijepim slikama.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "birati (engl. to choose)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Biram",
                "Biraš",
                "Bira",
                "Biramo",
                "Birate",
                "Biraju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " novog predsjednika ili novu predsjednicu.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "biti (engl. to be)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "sam",
                "si",
                "je",
                "smo",
                "ste",
                "su"
            ],
            "osnova": ["Ja ", "Ti ", "On ", "Mi ", "Vi ", "Oni "],
            "osnova2": " doma.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "brijati se (engl. to shave)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Brijem se",
                "Briješ se",
                "Brije se",
                "Brijemo se",
                "Brijete se",
                "Briju se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " svaki dan.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "buditi se (engl. to wake up)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Budim se",
                "Budiš se",
                "Budi se",
                "Budimo se",
                "Budite se",
                "Bude se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " svaki dan u 7 sati.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "crtati (engl. to draw)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "crtam",
                "craš",
                "crta",
                "crtamo",
                "crtate",
                "crtaju"
            ],
            "osnova": ["Bojama ", "Bojama ", "Bojama ", "Bojama ", "Bojama ", "Bojama "],
            "osnova2": " na papiru.",

            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "čekati (engl. to wait)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "čekam",
                "čekaš",
                "čeka",
                "čekamo",
                "čekate",
                "čekaju"
            ],
            "osnova": ["Koga ", "Koga ", "Koga ", "Koga ", "Koga ", "Koga "],
            "osnova2": "?",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "čestitati (engl. to congratulate)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Čestitam",
                "Čestitaš",
                "Čestita",
                "Čestitamo",
                "Čestitate",
                "Čestitaš"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " autorima i svima koji su radili na knjizi.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "činiti (engl. to do)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "činim",
                "činiš",
                "čini",
                "činimo",
                "činite",
                "čine"
            ],
            "osnova": ["Ja ", "Ti ", "Ona ", "Mi ", "Vi ", "Oni "],
            "osnova2": " dobro za sve.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "čitati (engl. to read)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Čitam",
                "Čitaš",
                "Čita",
                "Čitamo",
                "Čitate",
                "Čitaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " knjigu navečer.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "čuti (engl. to hear)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "čujem",
                "čuješ",
                "čuje",
                "čujemo",
                "čujete",
                "čuju"
            ],
            "osnova": ["Pojačaj zvuk da bolje ", "Pojačaj zvuk da bolje ", "Pojačaj zvuk da bolje ", "Pojačaj zvuk da bolje ", "Pojačaj zvuk da bolje ", "Pojačaj zvuk da bolje "],
            "osnova2": ".",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "čuvati (engl. to protect)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Čuvam",
                "Čuvaš",
                "Čuva",
                "Čuvamo",
                "Čuvate",
                "Čuvaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " kuću od provale.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "dobiti (engl. to give)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "dobijem",
                "dobiješ",
                "dobije",
                "dobijemo",
                "dobijete",
                "dobiju"
            ],
            "osnova": ["Svake godine ", "Svake godine ", "Svake godine ", "Svake godine ", "Svake godine ", "Svake godine "],
            "osnova2": " tortu za rođendan.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "doći (engl. to come, to arrive)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "dođem",
                "dođeš",
                "dođe",
                "dođemo",
                "dođete",
                "dođu"
            ],
            "osnova": ["Kada ", "Kada ", "Kada ", "Kada ", "Kada ", "Kada "],
            "osnova2": " u kuću, ručak će biti gotov.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "dogovarati (engl. to negotiate, to arrange)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Dogovaram",
                "Dogovaraš",
                "Dogovara",
                "Dogovaramo",
                "Dogovarate",
                "Dogovaraju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " poslove i sastanke.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "dogovoriti (engl. to agree)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "dogovorim",
                "dogovoriš",
                "dogovori",
                "dogovorimo",
                "dogovorite",
                "dogovore"
            ],
            "osnova": ["Kada da ", "Kada da ", "Kada da ", "Kada da ", "Kada da ", "Kada da "],
            "osnova2": " izlet s prijateljima?",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "dolaziti (engl. to come)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Dolazim",
                "Dolaziš",
                "Dolazi",
                "Dolazimo",
                "Dolazite",
                "Dolaze"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " na posao uvijek u isto vrijeme.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "donijeti (engl. to bring)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "donesem",
                "doneseš",
                "donese",
                "donesemo",
                "donesete",
                "donesu"
            ],
            "osnova": ["Kad ", "Kad ", "Kad ", "Kad ", "Kad ", "Kad "],
            "osnova2": " zadaću, profesor će ispraviti greške.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "doručkovati (engl. to have breakfast)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "doručkujem",
                "doručkuješ",
                "doručkuje",
                "doručkujemo",
                "doručkujete",
                "doručkuju"
            ],
            "osnova": ["Ujutro obvezno ", "Ujutro obvezno ", "Ujutro obvezno ", "Ujutro obvezno ", "Ujutro obvezno ", "Ujutro obvezno "],
            "osnova2": " cjelovite žitarice ili voće.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "družiti se (engl. to hang out)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Družim se",
                "Družiš se",
                "Druži se",
                "Družimo se",
                "Družite se",
                "Druže se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " samo s prijateljima iz škole.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "gleati (engl. to watch)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Gledam",
                "Gledaš",
                "Gleda",
                "Gledamo",
                "Gledate",
                "Gledaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " serije na Netflixu.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "govoriti (engl. to speak)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "govorim",
                "govoriš",
                "govori",
                "govorimo",
                "govorite",
                "govore"
            ],
            "osnova": ["Danas ", "Danas ", "Danas ", "Danas ", "Danas ", "Danas "],
            "osnova2": " o zaštiti okoliša.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "gurati (engl. to push)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Guram",
                "Guraš",
                "Gura",
                "Guramo",
                "Gurate",
                "Guraju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " kolica u dućanu.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "hodati (engl. to walk)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Hodam",
                "Hodaš",
                "Hoda",
                "Hodamo",
                "Hodate",
                "Hodaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " svaki dan radi zdravlja",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "htjeti (engl. to want, to wish)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Hoću",
                "Hoćeš",
                "Hoće",
                "Hoćemo",
                "Hoćete",
                "Hoće"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " novi stan i novi auto.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "igrati (engl. to play)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "igram",
                "igraš",
                "igra",
                "igramo",
                "igrate",
                "igraju"
            ],
            "osnova": ["Cijelu večer ", "Cijelu večer ", "Cijelu večer ", "Cijelu večer ", "Cijelu večer ", "Cijelu večer "],
            "osnova2": " društvene igre.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "imati (engl. to have)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Imam",
                "Imaš",
                "Ima",
                "Imamo",
                "Imate",
                "Imaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " kuću na planini.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "ispeći (engl. to bake, to fry)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "ispečem",
                "ispečeš",
                "ispeče",
                "ispečemo",
                "ispečete",
                "ispeku"
            ],
            "osnova": ["Kad ", "Kad ", "Kad ", "Kad ", "Kad ", "Kad "],
            "osnova2": " meso na ražnju, bit će dobar ručak.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "izabrati (engl. to choose)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "izaberem",
                "izabereš",
                "izabere",
                "izaberemo",
                "izaberete",
                "izaberu"
            ],
            "osnova": ["Svaki petak ", "Svaki petak ", "Svaki petak ", "Svaki petak ", "Svaki petak ", "Svaki petak "],
            "osnova2": " mjesto za izlazak.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "izaći (engl. to go out)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Izađem",
                "Izađeš",
                "Izađe",
                "Izađemo",
                "Izađete",
                "Izađu"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " iz stana u 7 ujutro.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "izgledati (engl. to look like)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Izgledam",
                "Izgledaš",
                "Izgleda",
                "Izgledamo",
                "Izgledate",
                "Izgledaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " puno starije zbog brade i brkova.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "izlaziti (engl. to go out)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Izlazim",
                "Izlaziš",
                "Izlazi",
                "Izlazimo",
                "Izlazite",
                "Izlaze"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " vikendom u noćne klubove.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "ići (engl. to go)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Idem",
                "Ideš",
                "Ide",
                "Idemo",
                "Idete",
                "Idu"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " u trgovački centar.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "jesti (engl. to eat)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Jedem",
                "Jedeš",
                "Jede",
                "Jedemo",
                "Jedete",
                "Jedu"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " zdravo i umjereno.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "kasniti (engl. to be late)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "kasnim",
                "kasniš",
                "kasni",
                "kasnimo",
                "kasnite",
                "kasne"
            ],
            "osnova": ["Zašto opet ", "Zašto opet ", "Zašto opet ", "Zašto opet ", "Zašto opet ", "Zašto opet "],
            "osnova2": "?",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "kazati (engl. to tell)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Kažem",
                "Kažeš",
                "Kaže",
                "Kažemo",
                "Kažete",
                "Kažu"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " da mudrost dolazi s godinama.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "koristiti (engl. to use)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Koristim",
                "Koristiš",
                "Koristi",
                "Koristimo",
                "Koristite",
                "Koriste"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " se bezglutenskim brašnom za kuhanje zbog celijakije.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "kuhati (engl. cook)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "kuham",
                "kuhaš",
                "kuha",
                "kuhamo",
                "kuhate",
                "kuhaju"
            ],
            "osnova": ["Dobro ", "Dobro ", "Dobro ", "Dobro ", "Dobro ", "Dobro "],
            "osnova2": " punjene parike i sarmu.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "kupati (engl. to bathe)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Kupam",
                "Kupaš",
                "Kupa",
                "Kupamo",
                "Kupate",
                "Kupaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " svoju malu bebu.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "kupiti (engl. to buy)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "kupim",
                "kupiš",
                "kupi",
                "kupimo",
                "kupite",
                "kupe"
            ],
            "osnova": ["Ponekad ", "Ponekad ", "Ponekad ", "Ponekad ", "Ponekad ", "Ponekad "],
            "osnova2": " previše hrane.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "kupovati (engl. to buy)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Kupujem",
                "Kupuješ",
                "Kupuje",
                "Kupujemo",
                "Kupujete",
                "Kupuju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " na crni petak.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "letjeti (engl. to fly)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Letim",
                "Letiš",
                "Leti",
                "Letimo",
                "Letite",
                "Lete"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " avionom u Irsku.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "ljetovati (engl. to spend the summer in)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Ljetujem",
                "Ljetuješ",
                "Ljetuje",
                "Ljetujemo",
                "Ljetujete",
                "Ljetuju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " na obali Jadranskog mora.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "ljubiti (engl. to kiss)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Ljubim",
                "Ljubiš",
                "Ljube",
                "Ljubimo",
                "Ljubite",
                "Ljube"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " svoje dijete prije spavanja.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "mijenjati (engl. to change)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "mijenjam",
                "mijenjaš",
                "mijenja",
                "mijenjamo",
                "mijenjate",
                "mijenjaju"
            ],
            "osnova": ["Ja često ", "Ti često ", "Ona često ", "Mi često ", "Vi često ", "Oni često "],
            "osnova2": " boju kose.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "misliti (engl. to think)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Mislim",
                "Misliš",
                "Misli",
                "Mislimo",
                "Mislite",
                "Misle"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " da je svijet u ekološkoj opasnosti.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "moći (engl. can)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "mogu",
                "možeš",
                "može",
                "možemo",
                "možete",
                "mogu"
            ],
            "osnova": ["Ja ", "Ti ", "On ", "Mi ", "Vi ", "Oni "],
            "osnova2": " pomoći oko učenja hrvatskog jezika.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "moliti (engl. to pray, to plead)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Molim",
                "Moliš",
                "Moli",
                "Molimo",
                "Molite",
                "Mole"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " prijatelja za pomoć oko učenja.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "morati (engl. must, to have to)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Moram",
                "Moraš",
                "Mora",
                "Moramo",
                "Morate",
                "Moraju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " položiti obavezne ispite za upis u sljedeću godinu.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "mrziti (engl. to hate)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Mrzim",
                "Mrziš",
                "Mrzi",
                "Mrzimo",
                "Mrzite",
                "Mrze"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " kućanske poslove i kuhanje.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "naći (engl. to find)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "nađem",
                "nađeš",
                "nađe",
                "nađemo",
                "nađete",
                "nađu"
            ],
            "osnova": ["Kako da ", "Kako da ", "Kako da ", "Kako da ", "Kako da ", "Kako da "],
            "osnova2": " ključeve?",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "nadati se (engl. to hope)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Nadam",
                "Nadaš",
                "Nada",
                "Nadamo",
                "Nadate",
                "Nadaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " se lijepom vremenu.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "nadati se (engl. to find, to come across)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "nalazim",
                "nalaziš",
                "nalazi",
                "nalazimo",
                "nalazite",
                "nalaze"
            ],
            "osnova": ["Svaki dan ", "Svaki dan ", "Svaki dan ", "Svaki dan ", "Svaki dan ", "Svaki dan "],
            "osnova2": " puno reklama u pošti.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ")",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "napisati (engl. to write)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Napišem",
                "Napišeš",
                "Napiše",
                "Napišemo",
                "Napišete",
                "Napišu"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " zadaću odmah nakon nastave.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "naručiti (engl. to order)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "naručim",
                "naručiš",
                "naruči",
                "naručimo",
                "naručite",
                "naruče"
            ],
            "osnova": ["Subotom ", "Subotom ", "Subotom ", "Subotom ", "Subotom ", "Subotom "],
            "osnova2": " pizzu za ručak.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "naručivati (engl. to order)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "naručujem",
                "naručuješ",
                "naručuje",
                "naručujemo",
                "naručujete",
                "naručuju"
            ],
            "osnova": ["U knjižnici ", "U knjižnici ", "U knjižnici ", "U knjižnici ", "U knjižnici ", "U knjižnici "],
            "osnova2": " knjige preko knjižničarke.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "nazvati (engl. to call)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "nazovem",
                "nazoveš",
                "nazove",
                "nazovemo",
                "nazovete",
                "nazovu"
            ],
            "osnova": ["Vrijeme je da ", "Vrijeme je da ", "Vrijeme je da ", "Vrijeme je da ", "Vrijeme je da ", "Vrijeme je da "],
            "osnova2": " mamu.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "nemati (engl. do not have)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Nemam",
                "Nemaš",
                "Nema",
                "Nemamo",
                "Nemate",
                "Nemaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " vremena za kavu.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "nositi (engl. to carry)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "nosim",
                "nosiš",
                "nosi",
                "nosimo",
                "nosite",
                "nose"
            ],
            "osnova": ["Zimi ", "Zimi ", "Zimi ", "Zimi ", "Zimi ", "Zimi "],
            "osnova2": " kapute, jakne, šalove, kape i rukavice.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "nuditi (engl. to offer)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Nudim",
                "Nudiš",
                "Nudi",
                "Nudimo",
                "Nudite",
                "Nude"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " hranu i piće.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "objasniti (engl. explain)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "objasnim",
                "objasniš",
                "objasni",
                "objasnimo",
                "objasnite",
                "objasne"
            ],
            "osnova": ["Kako da ", "Kako da ", "Kako da ", "Kako da ", "Kako da ", "Kako da "],
            "osnova2": " zadatak iz matematike?",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "oblačiti (engl. to dress)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Oblačim",
                "Oblačiš",
                "Oblači",
                "Oblačimo",
                "Oblačite",
                "Oblače"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " svoje dijete.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "obući (engl. put on)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "obučem",
                "obučeš",
                "obuče",
                "obučemo",
                "obučete",
                "obuku"
            ],
            "osnova": ["Svaki dan ", "Svaki dan ", "Svaki dan ", "Svaki dan ", "Svaki dan ", "Svaki dan "],
            "osnova2": " čistu odjeću.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "očekivati (engl. to expect)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Očekujem",
                "Očekuješ",
                "Očekuje",
                "Očekujemo",
                "Očekujete",
                "Očekuju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " previše od svoje djece.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "odgovarati (engl. to answer)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Odgovaram",
                "Odgovaraš",
                "Odgovara",
                "Odgovaramo",
                "Odgovarate",
                "Odgovaraju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " na pitanja iz testa inteligencije.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "odlaziti (engl. to leave)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Odlazim",
                "Odlaziš",
                "Odlazi",
                "Odlazimo",
                "Odlazite",
                "Odlaze"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " iz Zagreba za vrijeme ljetnih praznika.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "odlučiti (engl. to decide)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "odlučim",
                "odlučiš",
                "odluči",
                "odlučimo",
                "odlučite",
                "odluče",
            ],
            "osnova": ["Kada ", "Kada ", "Kada ", "Kada ", "Kada ", "Kada "],
            "osnova2": " oko godišnjeg odmora, dogovoriti ćemo sve.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "odmarati (engl. to rest)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "odmorim",
                "odmoriš",
                "odmori",
                "odmorimo",
                "odmorite",
                "odmore"
            ],
            "osnova": ["Kada se ", "Kada se ", "Kada se ", "Kada se ", "Kada se ", "Kada se "],
            "osnova2": ", nastavit će se s radom.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, , {
            "question": "popuni",
            "hint": "opisati (engl. to describe)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "opišem",
                "opišeš",
                "opiše",
                "opišemo",
                "opišete",
                "opišu"
            ],
            "osnova": ["Zadatak je da ", "Zadatak je da ", "Zadatak je da ", "Zadatak je da ", "Zadatak je da ", "Zadatak je da "],
            "osnova2": " jedan svoj radni dan.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "oprostiti (engl. to forgive)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "oprostim",
                "oprostiš",
                "oprosti",
                "oprostimo",
                "oprostite",
                "oproste"
            ],
            "osnova": ["Teško ", "Teško ", "Teško ", "Teško ", "Teško ", "Teško "],
            "osnova2": " nepravdu.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "osjećati (engl. to feel)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Osjećam",
                "Osjećaš",
                "Osjeća",
                "Osjećamo",
                "Osjećate",
                "Osjećaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " veliku tugu zbog smrti majke.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "osjetiti (engl. to feel)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "osjetim",
                "osjetiš",
                "osjeti",
                "osjetimo",
                "osjetite",
                "osjete"
            ],
            "osnova": ["Ponekad ", "Ponekad ", "Ponekad ", "Ponekad ", "Ponekad ", "Ponekad "],
            "osnova2": " jaku bol u koljenu.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "otići (engl. to leave)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "otiđem",
                "otiđeš",
                "otiđe",
                "otiđemo",
                "otiđete",
                "otiđu"
            ],
            "osnova": ["Riješit ćemo to kada ", "Riješit ćemo to kada ", "Riješit ćemo to kada ", "Riješit ćemo to kada ", "Riješit ćemo to kada ", "Riješit ćemo to kada "],
            "osnova2": " u banku.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "otvoriti (engl. to open)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "otvorim",
                "otvoriš",
                "otvori",
                "otvorimo",
                "otvorite",
                "otvore"
            ],
            "osnova": ["Vrijeme je da ", "Vrijeme je da ", "Vrijeme je da ", "Vrijeme je da ", "Vrijeme je da ", "Vrijeme je da "],
            "osnova2": " kafić u kvartu.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "ovisiti (engl. to depend)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Ovisim",
                "Ovisiš",
                "Ovisi",
                "Ovisimo",
                "Ovisite",
                "Ovise"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " o odluci roditelja.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "padati (engl. to fall)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "padam",
                "padaš",
                "pada",
                "padamo",
                "padate",
                "padaju"
            ],
            "osnova": ["Zbog loše pripreme, ", "Zbog loše pripreme, ", "Zbog loše pripreme, ", "Zbog loše pripreme, ", "Zbog loše pripreme, ", "Zbog loše pripreme, "],
            "osnova2": " ispit.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "parkirati (se) (engl. to park)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Parkiram",
                "Parkiraš",
                "Parkira",
                "Parkiramo",
                "Parkirate",
                "Parkiraju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " se u garaži.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pasti (engl. to fall)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "padnem",
                "padneš",
                "padne",
                "padnemo",
                "padnete",
                "padnu"
            ],
            "osnova": ["Često se događa da ", "Često se događa da ", "Često se događa da ", "Često se događa da ", "Često se događa da ", "Često se događa da "],
            "osnova2": " s bicikla.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "paziti (engl. to be careful)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Pazim",
                "Paziš",
                "Pazi",
                "Pazimo",
                "Pazite",
                "Paze"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " na zdravlje baveći se sportom.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "peći (engl. to beak, to roast)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Pečem",
                "Pečeš",
                "Peče",
                "Pečemo",
                "Pečete",
                "Peku"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " palačinke za svoju djecu.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pisati (engl. to write)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "pišem",
                "pišeš",
                "piše",
                "pišemo",
                "pišete",
                "pišu"
            ],
            "osnova": ["Danas ", "Danas ", "Danas ", "Danas ", "Danas ", "Danas "],
            "osnova2": " test iz povijesti.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pitati (engl. to ask)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "pitam",
                "pitaš",
                "pita",
                "pitamo",
                "pitate",
                "pitaju"
            ],
            "osnova": ["Svakodnevno ", "Svakodnevno ", "Svakodnevno ", "Svakodnevno ", "Svakodnevno ", "Svakodnevno "],
            "osnova2": " prijatelja kako mu je bilo na poslu.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "piti (engl. to drink)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Pijem",
                "Piješ",
                "Pije",
                "Pijemo",
                "Pijete",
                "Piju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " 12 čaša vode dnevno.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pjevati (engl. to sing)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Pjevam",
                "Pjevaš",
                "Pjeva",
                "Pjevamo",
                "Pjevate",
                "Pjevaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " u zboru.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "plaćati (engl. to pay)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Plaćam",
                "Plaćaš",
                "Plaća",
                "Plaćamo",
                "Plaćate",
                "Plaćaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " račune internetskim bankarstvom.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "planinariti (engl. to hike)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Planinarim",
                "Planinariš",
                "Planinari",
                "Planinarimo",
                "Planinarite",
                "Planinare"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " sa specijalnom opremom.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "planirati (engl. to plan)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "planiram",
                "planiraš",
                "planira",
                "planiramo",
                "planirate",
                "planiraju"
            ],
            "osnova": ["Što ", "Što ", "Što ", "Što ", "Što ", "Što "],
            "osnova2": " za vikend?",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "platiti (engl. to pay)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Platim",
                "Platiš",
                "Plati",
                "Platimo",
                "Platite",
                "Plate"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " robu na automatskoj blagajni.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "plesati (engl. to dance)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "plešem",
                "plešeš",
                "pleše",
                "plešemo",
                "plešete",
                "plešu"
            ],
            "osnova": ["Na dočeku Nove godine ", "Na dočeku Nove godine ", "Na dočeku Nove godine ", "Na dočeku Nove godine ", "Na dočeku Nove godine ", "Na dočeku Nove godine "],
            "osnova2": " ulicama grada.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "plivati (engl. to swim)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Plivam",
                "Plivaš",
                "Pliva",
                "Plivamo",
                "Plivate",
                "Plivaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " prsnim stilom i kraulom.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pogledati (engl. to watch)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "pogledam",
                "pogledaš",
                "pogleda",
                "pogledamo",
                "pogledate",
                "pogledaju"
            ],
            "osnova": ["Čim izađe, ", "Čim izađe, ", "Čim izađe, ", "Čim izađe, ", "Čim izađe, ", "Čim izađe, "],
            "osnova2": " novu epizodu serije.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pojesti (engl. to eat)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Pojedem",
                "Pojedeš",
                "Pojede",
                "Pojedemo",
                "Pojedete",
                "Pojedu"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " sve što je na tanjuru.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pokazati (engl. to show, to display)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "pokažem",
                "pokažeš",
                "pokaže",
                "pokažemo",
                "pokažete",
                "pokažu"
            ],
            "osnova": ["Jedva čekam da ", "", "", "", "", ""],
            "osnova2": " svoje znanje.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pokazivati (engl. to show, to display)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Pokazujem",
                "Pokazuješ",
                "Pokazuje",
                "Pokazujemo",
                "Pokazujete",
                "Pokazuju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " studentima na karti najveće hrvatske gradove.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "poklanjati (engl. to give)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Poklanjam",
                "Poklanjaš",
                "Poklanja",
                "Poklanjamo",
                "Poklanjate",
                "Poklanjaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " djeci poklone za Božić.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pokloniti (engl. to give)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "poklonim",
                "pokloniš",
                "pokloni",
                "poklonimo",
                "poklonite",
                "poklone"
            ],
            "osnova": ["Svake godine ", "", "", "", "", ""],
            "osnova2": " mami veliki buket ruža za rođendan.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pomagati (engl. to help)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Pomažem",
                "Pomažeš",
                "Pomaže",
                "Pomažemo",
                "Pomažete",
                "Pomažu"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " prijatelju graditi kuću.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pomoći (engl. to help)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "pomognem",
                "pomogneš",
                "pomogne",
                "pomognemo",
                "pomognete",
                "pomognu"
            ],
            "osnova": ["Kako da ", "Kako da ", "Kako da ", "Kako da ", "Kako da ", "Kako da "],
            "osnova2": " oko preuređenja stana?",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "ponavljati (engl. to repeat)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "ponavljam",
                "ponavljaš",
                "ponavlja",
                "ponavljamo",
                "ponavljate",
                "ponavljaju"
            ],
            "osnova": ["Danas na hrvatskome ", "Danas na hrvatskome ", "Danas na hrvatskome ", "Danas na hrvatskome ", "Danas na hrvatskome ", "Danas na hrvatskome "],
            "osnova2": " padeže.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "ponoviti (engl. to repeat)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "ponovim",
                "ponoviš",
                "ponovi",
                "ponovimo",
                "ponovite",
                "ponove"
            ],
            "osnova": ["Ako povijest ", "Ako povijest ", "Ako povijest ", "Ako povijest ", "Ako povijest ", "Ako povijest "],
            "osnova2": " na vrijeme, ispit će bit lagan.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "ponuditi (engl. to offer)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "ponudim",
                "ponudiš",
                "ponudi",
                "ponudimo",
                "ponudite",
                "ponude"
            ],
            "osnova": ["Uvijek ", "Uvijek ", "Uvijek ", "Uvijek ", "Uvijek ", "Uvijek "],
            "osnova2": " gostu kavu.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "popiti (engl. to drink)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "popijem",
                "popiješ",
                "popije",
                "popijemo",
                "popijete",
                "popiju"
            ],
            "osnova": ["Svako jutro ", "", "", "", "", ""],
            "osnova2": " zeleni čaj.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "posjećivati (engl. to visit)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Posjećujem",
                "Posjećuješ",
                "Posjećuje",
                "Posjećujemo",
                "Posjećujete",
                "Posjećuju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " napuštenu djecu u domu za siročad.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "posjetiti (engl. to visit)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "posjetim",
                "posjetiš",
                "posjeti",
                "posjetimo",
                "posjetite",
                "posjete"
            ],
            "osnova": ["Kada ", "Kada ", "Kada ", "Kada ", "Kada ", "Kada "],
            "osnova2": " susjedu, ona se veseli.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "poslati (engl. to send)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "pošaljem",
                "pošalješ",
                "pošalje",
                "pošaljemo",
                "pošaljete",
                "pošalju"
            ],
            "osnova": ["Rekao je da ", "Rekao je da ", "Rekao je da ", "Rekao je da ", "Rekao je da ", "Rekao je da "],
            "osnova2": " poruku na Gmail.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "potpisati (engl. to sign)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "potpišem",
                "potpišeš",
                "potpiše",
                "potpišemo",
                "potpišete",
                "potpišu"
            ],
            "osnova": ["Kada ", "Kada ", "Kada ", "Kada ", "Kada ", "Kada "],
            "osnova2": ", sve je dogovoreno.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "potpisivati (engl. to sign)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "potpisujem",
                "potpisuješ",
                "potpisuje",
                "potpisujemo",
                "potpisujete",
                "potpisuju"
            ],
            "osnova": ["Kakav ugovor ", "Kakav ugovor ", "Kakav ugovor ", "Kakav ugovor ", "Kakav ugovor ", "Kakav ugovor "],
            "osnova2": " s bankama?",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "prati (se) (engl. to wash)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Perem",
                "Pereš",
                "Pere",
                "Peremo",
                "Perete",
                "Peru"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " prozore kada je vani sunčano.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pričati (engl. to speak)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "pričam",
                "pričaš",
                "priča",
                "pričamo",
                "pričate",
                "pričaju"
            ],
            "osnova": ["Danas ", "Danas ", "Danas ", "Danas ", "Danas ", "Danas "],
            "osnova2": " s roditeljima na roditeljskom sastanku.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "probati (engl. to try)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "probam",
                "probaš",
                "proba",
                "probamo",
                "probate",
                "probaju"
            ],
            "osnova": ["Da ", "Da ", "Da ", "Da ", "Da ", "Da "],
            "osnova2": " otpjevati pjesmu još jedanput?",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pročitati (engl. to read)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "pročitam",
                "pročitaš",
                "pročita",
                "pročitamo",
                "pročitate",
                "pročitaju"
            ],
            "osnova": ["Kad ", "Kad ", "Kad ", "Kad ", "Kad ", "Kad "],
            "osnova2": " ovu knjigu, posudit će se nova.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "prodati (engl. to sell)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Prodam",
                "Prodaš",
                "Proda",
                "Prodamo",
                "Prodate",
                "Prodaju"
            ],
            "osnova": ["Nikako da ", "Nikako da ", "Nikako da ", "Nikako da ", "Nikako da ", "Nikako da "],
            "osnova2": " svoj auto.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "prodavati (engl. sell)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Prodajem",
                "Prodaješ",
                "Prodaje",
                "Prodajemo",
                "Prodajete",
                "Prodaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " nošenu odjeću u trgovini za rabljenu odjeću.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "promijeniti (engl. to change)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "promijenim",
                "promijeniš",
                "promijeni",
                "promijenimo",
                "promijenite",
                "promijene"
            ],
            "osnova": ["Kažu da ", "Kažu da ", "Kažu da ", "Kažu da ", "Kažu da ", "Kažu da "],
            "osnova2": " svoju prehranu i životne navike.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pušiti (engl. to smoke)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Pušim",
                "Pušiš",
                "Puši",
                "Pušimo",
                "Pušite",
                "Puše"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " kutiju cigareta dnevno.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "putovati (engl. to travel)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "putujem",
                "putuješ",
                "putuje",
                "putujemo",
                "putujete",
                "putuju"
            ],
            "osnova": ["Avionom ", "Avionom ", "Avionom ", "Avionom ", "Avionom ", "Avionom "],
            "osnova2": " u New York.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "rađati (engl. to give birth)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "rađam",
                "rađaš",
                "rađa",
                "rađamo",
                "rađate",
                "rađaju"
            ],
            "osnova": ["Kako da ", "Kako da ", "Kako da ", "Kako da ", "Kako da ", "Kako da "],
            "osnova2": " u ovim uvjetima?",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "raditi (engl. to work)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "radim",
                "radiš",
                "radi",
                "radimo",
                "radite",
                "rade"
            ],
            "osnova": ["Što da ", "Što da ", "Što da ", "Što da ", "Što da ", "Što da "],
            "osnova2": " poslije posla?",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "razgovarati (engl. to talk)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "razgovaram",
                "razgovaraš",
                "razgovara",
                "razgovaramo",
                "razgovarate",
                "razgovaraju"
            ],
            "osnova": ["S prijateljima ", "S prijateljima ", "S prijateljima ", "S prijateljima ", "S prijateljima ", "S prijateljima "],
            "osnova2": " o poslu.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "razlikovati (engl. to distinguish)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Razlikujem",
                "Razlikuješ",
                "Razlikuje",
                "Razlikujemo",
                "Razlikujete",
                "Razlikuju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " kvalitetno od nekvalitetnog vina.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "razmisliti (engl. to think)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "razmislim",
                "razmisliš",
                "razmisli",
                "razmislimo",
                "razmislite",
                "razmisle"
            ],
            "osnova": ["Ponekad ", "Ponekad ", "Ponekad ", "Ponekad ", "Ponekad ", "Ponekad "],
            "osnova2": " o svojem ponašanju.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "razumijeti (engl. to understand)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "razumijem",
                "razumiješ",
                "razumije",
                "razumijemo",
                "razumijete",
                "razumiju"
            ],
            "osnova": ["Ne ", "Ne ", "Ne ", "Ne ", "Ne ", "Ne "],
            "osnova2": " hrvatski.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "reći (engl. to say)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "rečem",
                "rečeš",
                "reče",
                "rečemo",
                "rečete",
                "reku"
            ],
            "osnova": ["Bit će kako ", "Bit će kako ", "Bit će kako ", "Bit će kako ", "Bit će kako ", "Bit će kako "],
            "osnova2": ".",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "roniti (engl. to dive)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Ronim",
                "Roniš",
                "Roni",
                "Ronimo",
                "Ronite",
                "Rone"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " na dah, bez kisika.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "ručati (engl. to lunch)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Ručam",
                "Ručaš",
                "Ruča",
                "Ručamo",
                "Ručate",
                "Ručaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " u dva sata.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "sanjati (engl. to dream)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Sanjamo",
                "Sanjaš",
                "Sanja",
                "Sanjamo",
                "Sanjate",
                "Sanjaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " o osvajanju prvenstva.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "seliti (engl. to move)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "selim",
                "seliš",
                "seli",
                "selimo",
                "selite",
                "sele"
            ],
            "osnova": ["Sutra se ", "Sutra se ", "Sutra se ", "Sutra se ", "Sutra se ", "Sutra se "],
            "osnova2": " iz stana u kuću.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "sjećati se (engl. to remember)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Sjećam se",
                "Sjećaš se",
                "Sjeća se",
                "Sjećamo se",
                "Sjećate se",
                "Sjećaju se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " svog prvog poljubca.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "sjediti (engl. to sit)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "sjedim",
                "sjediš",
                "sjedi",
                "sjedimo",
                "sjedite",
                "sjede"
            ],
            "osnova": ["Cijelu večer ", "Cijelu večer ", "Cijelu večer ", "Cijelu večer ", "Cijelu večer ", "Cijelu večer "],
            "osnova2": " pred televizorom.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "sjetiti se (engl. to remember)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Sjetim se",
                "Sjetiš se",
                "Sjeti se",
                "Sjetimo se",
                "Sjetite se",
                "Sjete se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " svoje mladost.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "slati (engl. to send)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "šaljem",
                "šalješ",
                "šalje",
                "šaljemo",
                "šaljete",
                "šalju"
            ],
            "osnova": ["Svaki dan ", "Svaki dan ", "Svaki dan ", "Svaki dan ", "Svaki dan ", "Svaki dan "],
            "osnova2": " životopise za posao.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "slaviti (engl. to celebrate)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Slavim",
                "Slaviš",
                "Slavi",
                "Slavimo",
                "Slavite",
                "Slave"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " rođendan u petak.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "slikati (engl. to paint)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "slikam",
                "slikaš",
                "slika",
                "slikajmo",
                "slikajte",
                "slikaju"
            ],
            "osnova": ["Ja ", "Ti ", "Ona", "Mi", "Vi", "Oni"],
            "osnova2": " akvarele s motivima mora.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "slušati (engl. to listen)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "slušam",
                "slušaš",
                "sluša",
                "slušamo",
                "slušate",
                "slušaju"
            ],
            "osnova": ["Kakvu glazbu ", "Kakvu glazbu ", "Kakvu glazbu ", "Kakvu glazbu ", "Kakvu glazbu ", "Kakvu glazbu "],
            "osnova2": "?",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "smijati se (engl. to laugh)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Smijem se",
                "Smiješ se",
                "Smije se",
                "Smijemo se",
                "Smijete se",
                "Smiju se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " komičarima.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "smjeti (engl. to be allowed)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Smijem",
                "Smiješ",
                "Smije",
                "Smijemo",
                "Smijete",
                "Smiju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " li ovdje pušiti?",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "spavati (engl. to sleep)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "spavam",
                "spavaš",
                "spava",
                "spavamo",
                "spavate",
                "spavaju"
            ],
            "osnova": ["Svaku večer ", "Svaku večer ", "Svaku večer ", "Svaku večer ", "Svaku večer ", "Svaku večer "],
            "osnova2": " u isto vrijeme.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "spremati (engl. to save)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Spremam",
                "Spremaš",
                "Sprema",
                "Spremamo",
                "Spremate",
                "Spremaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " stan svaki vikend.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "spremiti (engl. to save)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "spremim",
                "spremiš",
                "spremi",
                "spremimo",
                "spremite",
                "spreme"
            ],
            "osnova": ["Svaki dan ", "Svaki dan ", "Svaki dan ", "Svaki dan ", "Svaki dan ", "Svaki dan "],
            "osnova2": " odjeću u ormar.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "stanovati (engl. to live in)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Stanujem",
                "Stanuješ",
                "Stanuje",
                "Stanujemo",
                "Stanujete",
                "Stanuju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " na trinaestom katu nebodera u Novom Zagrebu.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "staviti (engl. to put on, to place to)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "stavim",
                "staviš",
                "stavi",
                "stavimo",
                "stavite",
                "stave"
            ],
            "osnova": ["Ja ", "Ti ", "Ona ", "Mi ", "Vi ", "Oni "],
            "osnova2": " dva jaja u smjesu za palačinke.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "stavljati (engl. to put on, to place on)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Stavljam",
                "Stavljaš",
                "Stavlja",
                "Stavljamo",
                "Stavljate",
                "Stavljaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " nove slike na zidove.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "studirati (engl. to study)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Studiram",
                "Studiraš",
                "Studira",
                "Studiramo",
                "Studirate",
                "Studiraju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " kroatistiku i povijest.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "svirati (engl. to play)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Sviram",
                "Sviraš",
                "Svira",
                "Sviramo",
                "Svirate",
                "Sviraju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " li gitaru?",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "šaliti se (engl. to joke)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Šalim se",
                "Šališ se",
                "Šali se",
                "Šalimo se",
                "Šalite se",
                "Šale se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " na 1. april.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "šetati (engl. to walk)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "šetam",
                "šetaš",
                "šeta",
                "šetamo",
                "šetate",
                "šetaju"
            ],
            "osnova": ["Koliko puta na dan ", "Koliko puta na dan ", "Koliko puta na dan ", "Koliko puta na dan ", "Koliko puta na dan ", "Koliko puta na dan "],
            "osnova2": " psa?",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "štedjeti (engl. to save, to spare)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Štedim",
                "Štediš",
                "Štedi",
                "Štedimo",
                "Štedite",
                "Štede"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " novac u banci.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "šutjeti (engl. to keep quiet)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "šutim",
                "šutiš",
                "šuti",
                "šutimo",
                "šutite",
                "šute"
            ],
            "osnova": ["U knjižnici ", "U knjižnici ", "U knjižnici ", "U knjižnici ", "U knjižnici ", "U knjižnici "],
            "osnova2": " kako bi ostali mogli učiti.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "telefonirati (engl. to phone)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "telefoniram",
                "telefoniraš",
                "telefonira",
                "telefoniramo",
                "telefonirate",
                "telefoniraju"
            ],
            "osnova": ["Ne ", "Ne ", "Ne ", "Ne ", "Ne ", "Ne "],
            "osnova2": " unutar stranih zemalja jer je skuplje.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "tražiti (engl. to look for)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "tražim",
                "tražiš",
                "traži",
                "tražimo",
                "tražite",
                "traže"
            ],
            "osnova": ["Još ", "Još ", "Još ", "Još ", "Još ", "Još "],
            "osnova2": " nestale čarape.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "trčati (engl. to run)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Trčim",
                "Trčiš",
                "Trči",
                "Trčimo",
                "Trčite",
                "Trče"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " na Savskom nasipu tri puta na tjedan.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "trebati (engl. to need)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Trebam",
                "Trebaš",
                "Treba",
                "Trebamo",
                "Trebate",
                "Trebaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " novi posao.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "trenirati (engl. to train)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Treniram",
                "Treniraš",
                "Trenira",
                "Treniramo",
                "Trenirate",
                "Treniraju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " košarku utorkom i četvrtkom.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "trošiti (engl. to spend)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Trošim",
                "Trošiš",
                "Troši",
                "Trošimo",
                "Trošite",
                "Troše"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " novac na cipele i torbe.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "tući (engl. to beat)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "tučem",
                "tučeš",
                "tuče",
                "tučemo",
                "tučete",
                "tuku"
            ],
            "osnova": ["Mikserom ", "Mikserom ", "Mikserom ", "Mikserom ", "Mikserom ", "Mikserom "],
            "osnova2": " vrhnje.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "ući (engl. to enter)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "uđem",
                "uđeš",
                "uđe",
                "uđemo",
                "uđete",
                "uđu"
            ],
            "osnova": ["Kada ", "Kada ", "Kada ", "Kada ", "Kada ", "Kada "],
            "osnova2": " na fakultet, red za informacije je desno.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "učiniti (engl. to do)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Učinim",
                "Učiniš",
                "Učini",
                "Učinimo",
                "Učinite",
                "Učine"
            ],
            "osnova": ["Što da ", "Što da ", "Što da ", "Što da ", "Što da ", "Što da "],
            "osnova2": " da se spase ozljeđeni u nesreći?",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "učiti (engl. to learn)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "učim",
                "učiš",
                "uči",
                "učimo",
                "učite",
                "uče"
            ],
            "osnova": ["Jezik ", "Jezik ", "Jezik ", "Jezik ", "Jezik ", "Jezik "],
            "osnova2": " cijeli život.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "ulaziti (engl. to enter)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Ulazim",
                "Ulaziš",
                "Ulazi",
                "Ulazimo",
                "Ulazite",
                "Ulaze"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " u vlak.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "upoznati (engl. to meet)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "upoznam",
                "upoznaš",
                "upozna",
                "upoznamo",
                "upoznate",
                "upoznaju"
            ],
            "osnova": ["Čekam dan da ", "Čekam dan da ", "Čekam dan da ", "Čekam dan da ", "Čekam dan da ", "Čekam dan da "],
            "osnova2": " moje roditelje.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "upoznavati (engl. to get to know)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "upoznajem",
                "upoznaješ",
                "upoznaje",
                "upoznajemo",
                "upoznajete",
                "upoznaju"
            ],
            "osnova": ["Na izletu ", "Na izletu ", "Na izletu ", "Na izletu ", "Na izletu ", "Na izletu "],
            "osnova2": " nove ljude.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "ustajati (engl. to get up)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "ustajem",
                "ustaješ",
                "ustaje",
                "ustajemo",
                "ustajete",
                "ustaju"
            ],
            "osnova": ["Svaki dan ", "Svaki dan ", "Svaki dan ", "Svaki dan ", "Svaki dan ", "Svaki dan "],
            "osnova2": " u 7 sati.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "ustati (engl. to get up)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "ustanem",
                "ustaneš",
                "ustane",
                "ustanemo",
                "ustanete",
                "ustanu"
            ],
            "osnova": ["U srijedu ", "U srijedu ", "U srijedu ", "U srijedu ", "U srijedu ", "U srijedu "],
            "osnova2": " ranije.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "uzeti (engl. to take)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Uzmem",
                "Uzmeš",
                "Uzme",
                "Uzmemo",
                "Uzmete",
                "Uzmu"
            ],
            "osnova": ["Često sa sobom ", "Često sa sobom ", "Često sa sobom ", "Često sa sobom ", "Često sa sobom ", "Često sa sobom "],
            "osnova2": " kišobran u slučaju kiše.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "uzimati (engl. to take)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Uzimam",
                "Uzimaš",
                "Uzima",
                "Uzimamo",
                "Uzimate",
                "Uzimaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " lijekove zbog prehlade.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "uživati (engl. to enjoy)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Uživam",
                "Uživaš",
                "Uživa",
                "Uživamo",
                "Uživate",
                "Uživaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " na ljetnim praznicima.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "večerati (engl. to have dinner)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "večeram",
                "večeraš",
                "večera",
                "večeramo",
                "večerate",
                "večeraju"
            ],
            "osnova": ["Što obično ", "Što obično ", "Što obično ", "Što obično ", "Što obično ", "Što obično "],
            "osnova2": "?",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "veseliti (engl. to rejoice)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Veselim",
                "Veseliš",
                "Veseli",
                "Veselimo",
                "Veselite",
                "Vesele"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " se suncu i moru.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "vidjeti (engl. to see)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "vidim",
                "vidiš",
                "vidi",
                "vidimo",
                "vidite",
                "vide"
            ],
            "osnova": ["Ne ", "Ne ", "Ne ", "Ne ", "Ne ", "Ne "],
            "osnova2": " dobro.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "vjenčati (engl. to marry)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "vjenčam",
                "vjenčaš",
                "vjenča",
                "vjenčamo",
                "vjenčate",
                "vjenčaju"
            ],
            "osnova": ["Jedva čekam da se ", "Jedva čekam da se ", "Jedva čekam da se ", "Jedva čekam da se ", "Jedva čekam da se ", "Jedva čekam da se "],
            "osnova2": ".",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "vjerovati (engl. to believe)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Vjerujem",
                "Vjeruješ",
                "Vjeruje",
                "Vjerujemo",
                "Vjerujete",
                "Vjeruju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "li u Boga?",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "voljeti (engl. to love)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Volim",
                "Voliš",
                "Voli",
                "Volimo",
                "Volite",
                "Vole"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " pikantnu hranu.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "voziti (engl. to drive)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Vozim",
                "Voziš",
                "Vozi",
                "Vozimo",
                "Vozite",
                "Voze"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " veliki kamion.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "vraćati (engl. to return)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "vraćam",
                "vraćaš",
                "vraća",
                "vraćamo",
                "vraćate",
                "vraćaju"
            ],
            "osnova": ["Upravo ", "Upravo ", "Upravo ", "Upravo ", "Upravo ", "Upravo "],
            "osnova2": " posuđenu olovku.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "vratiti (engl. return)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "vratim",
                "vratiš",
                "vrati",
                "vratimo",
                "vratite",
                "vrate"
            ],
            "osnova": ["Uglavnom ", "Uglavnom ", "Uglavnom ", "Uglavnom ", "Uglavnom ", "Uglavnom "],
            "osnova2": " knjige u knjižnicu na vrijeme.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "vući (engl. to drag)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Vučem",
                "Vučeš",
                "Vuče",
                "Vučemo",
                "Vučete",
                "Vuku"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " teške kofere po aerodromu.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "zaboraviti (engl. to forget)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Zaboravim",
                "Zaboraviš",
                "Zaboravi",
                "Zaboravimo",
                "Zaboravite",
                "Zaborave"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " loše stvari.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "zaboravljati (engl. to forget)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "zaboravljam",
                "zaboravljaš",
                "zaboravlja",
                "zaboravljamo",
                "zaboravljate",
                "zaboravljaju"
            ],
            "osnova": ["Nikad ne ", "Nikad ne ", "Nikad ne ", "Nikad ne ", "Nikad ne ", "Nikad ne "],
            "osnova2": " svoje drage prijatelje.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "zanimati (engl. interest)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Zanimam",
                "Zanimaš",
                "Zanima",
                "Zanimamo",
                "Zanimate",
                "Zanimaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " se za novi posao.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "zatvoriti (engl. close)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "zatvorim",
                "zatvoriš",
                "zatvori",
                "zatvorimo",
                "zatvorite",
                "zatvore"
            ],
            "osnova": ["Kada ", "Kada ", "Kada ", "Kada ", "Kada ", "Kada "],
            "osnova2": " klub, ljudi će otići doma.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "završavati (engl. to finish)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Završavam",
                "Završavaš",
                "Završava",
                "Završavamo",
                "Završavate",
                "Završavaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " ručak.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "završiti (engl. to complete)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "završim",
                "završiš",
                "završi",
                "završimo",
                "završite",
                "završe"
            ],
            "osnova": ["Kada ", "Kada ", "Kada ", "Kada ", "Kada ", "Kada "],
            "osnova2": " zadaću, što ćemo?",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "značiti (engl. to mean)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "značim",
                "značiš",
                "znači",
                "značimo",
                "značite",
                "znače"
            ],
            "osnova": ["Njima puno ", "Njima puno ", "Njima puno ", "Njima puno ", "Njima puno ", "Njima puno "],
            "osnova2": ".",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "znati (engl. to know)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Znam",
                "Znaš",
                "Zna",
                "Znamo",
                "Znate",
                "Znaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " kuhati i pjevati.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "zvati (engl. to call)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "zovem",
                "zoveš",
                "zove",
                "zovemo",
                "zovete",
                "zovu"
            ],
            "osnova": ["Svaki dan ", "Svaki dan ", "Svaki dan ", "Svaki dan ", "Svaki dan ", "Svaki dan "],
            "osnova2": " majku.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "žaliti (engl. to regret)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "žalim",
                "žališ",
                "žali",
                "žalimo",
                "žalite",
                "žale"
            ],
            "osnova": ["Stalno se ", "Stalno se ", "Stalno se ", "Stalno se ", "Stalno se ", "Stalno se "],
            "osnova2": "!",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "željeti (engl. to want)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Želim",
                "Želiš",
                "Želi",
                "Želimo",
                "Želite",
                "Žele"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " da ljudi više brinu o prirodi.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "živjeti (engl. to live)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Živim",
                "Živiš",
                "Živi",
                "Živimo",
                "Živite",
                "Žive"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " dobro i sretno.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "žuriti se (engl. to hurry)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Žurim se",
                "Žuriš se",
                "Žuri se",
                "Žurimo se",
                "Žurite se",
                "Žure se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " s projektom jer je <em>deadline</em> prekosutra.",
            "boja_pozadine": "rgba(" + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ",0.2)",
            "time": 20,
        }
    ];
    prezent = p1

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