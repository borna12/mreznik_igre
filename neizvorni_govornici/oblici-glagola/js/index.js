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
            $('form').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSc9Us-DEhya_phHIBtxlU2rzgm-7cU2Uu0JYb1hjQOsloK3FQ/formResponse');
            r1 = 1
            tajming = 10
        } else if ($(this).attr('id') == "20") {
            iskljuci_v = 1;
            r1 = 2
            $(".vrijeme").hide()
            $('form').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSef3WG9aGXsLEK2BNPqGZpCf8aa-wUiZ67KaZhUu4L5EiyOxA/formResponse');
            tajming = 20;
        } else if ($(this).attr('id') == "40") {
            tajming = 40;
            $('form').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLScmkfsEFSUjM-0LnPHqKvg-JU3C3m9Cq9UwfFBdU1vmQfBn3g/formResponse');
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
                swal({
                    title: "Isteklo je vrijeme.",
                    html: "<p class='dodatak'><strong>Točan odgovor je: " + prezent[questionCounter].osnova[randbroj] + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[randbroj] + "</span></strong>" + prezent[questionCounter].osnova2 + prezent[questionCounter].lica[randbroj].substr(prezent[questionCounter].lica[randbroj].length - 18, prezent[questionCounter].lica[randbroj].length) + "<br></p><br><table style='width: 100%;' border='1' cellpadding='3' > <tbody> <tr> <td style='border:0px'>&nbsp;</td><td >&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>jednina</span></td><td>&nbsp;<span style='color:rgb(235, 73, 71);  font-wieight:600'>množina</span></td></tr><tr> <td>&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>1. lice</span></td><td>" + prezent[questionCounter].correctAnswer[0].toLowerCase() + "</td><td>" + prezent[questionCounter].correctAnswer[3].toLowerCase() + "</td></tr><tr> <td>&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>2. lice</span></td><td>" + prezent[questionCounter].correctAnswer[1].toLowerCase() + "</td><td>" + prezent[questionCounter].correctAnswer[4].toLowerCase() + "</td></tr><tr> <td>&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>3. lice</span></td><td>" + prezent[questionCounter].correctAnswer[2].toLowerCase() + "</td><td>" + prezent[questionCounter].correctAnswer[5].toLowerCase() + "</td></tr></tbody></table>",
                    showCloseButton: true,
                    confirmButtonText: ' dalje',
                    backdrop: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                });
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
                if ($("#odgovor").val() == prezent[questionCounter].correctAnswer[randbroj]) {
                    // Increment the total correct answers counter
                    correctAnswersCounter++;
                    bodovi += 10;
                    bodovi += vrijeme
                    broj = 10 + vrijeme
                    $("#tocno")[0].play();
                    swal({
                        title: "Točno",
                        html: "<p  class='dodatak'><span class='povrt'>+ <span class='tocno_bod'>" + broj + "</span></span></p><br><table style='width: 100%;' border='1' cellpadding='3' > <tbody> <tr> <td style='border:0px'>&nbsp;</td><td >&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>jednina</span></td><td>&nbsp;<span style='color:rgb(235, 73, 71);  font-wieight:600'>množina</span></td></tr><tr> <td>&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>1. lice</span></td><td>" + prezent[questionCounter].correctAnswer[0].toLowerCase() + "</td><td>" + prezent[questionCounter].correctAnswer[3].toLowerCase() + "</td></tr><tr> <td>&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>2. lice</span></td><td>" + prezent[questionCounter].correctAnswer[1].toLowerCase() + "</td><td>" + prezent[questionCounter].correctAnswer[4].toLowerCase() + "</td></tr><tr> <td>&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>3. lice</span></td><td>" + prezent[questionCounter].correctAnswer[2].toLowerCase() + "</td><td>" + prezent[questionCounter].correctAnswer[5].toLowerCase() + "</td></tr></tbody></table>",
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
                    $("#pogresno")[0].play()
                    swal({
                        title: "Netočno",
                        html: "<p class='dodatak'><strong>Točan odgovor je: " + prezent[questionCounter].osnova[randbroj] + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[randbroj] + "</span>" + prezent[questionCounter].osnova2 + prezent[questionCounter].lica[randbroj].substr(prezent[questionCounter].lica[randbroj].length - 18, prezent[questionCounter].lica[randbroj].length) + "</strong><br></p><br><table style='width: 100%;' border='1' cellpadding='3' > <tbody> <tr> <td style='border:0px'>&nbsp;</td><td >&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>jednina</span></td><td>&nbsp;<span style='color:rgb(235, 73, 71);  font-wieight:600'>množina</span></td></tr><tr> <td>&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>1. lice</span></td><td>" + prezent[questionCounter].correctAnswer[0].toLowerCase() + "</td><td>" + prezent[questionCounter].correctAnswer[3].toLowerCase() + "</td></tr><tr> <td>&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>2. lice</span></td><td>" + prezent[questionCounter].correctAnswer[1].toLowerCase() + "</td><td>" + prezent[questionCounter].correctAnswer[4].toLowerCase() + "</td></tr><tr> <td>&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>3. lice</span></td><td>" + prezent[questionCounter].correctAnswer[2].toLowerCase() + "</td><td>" + prezent[questionCounter].correctAnswer[5].toLowerCase() + "</td></tr></tbody></table>",
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

            "boja_pozadine": "#FCE4EC",
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

            "boja_pozadine": "#FCE4EC",
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

            "boja_pozadine": "#FCE4EC",
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

            "boja_pozadine": "#FCE4EC",
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
            "osnova2": " cvijeće djevojci.",

            "boja_pozadine": "#FCE4EC",
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
                "Radajute se",
                "Raduju se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " ljetu.",

            "boja_pozadine": "#FCE4EC",
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

            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["Ne "],
            "osnova2": " što su građani zabrinuti.",

            "boja_pozadine": "#FCE4EC",
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
            "osnova": " ",
            "osnova2": " zbog loše hrane u kantini.",

            "boja_pozadine": "#FCE4EC",
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

            "boja_pozadine": "#FCE4EC",
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

            "boja_pozadine": "#FCE4EC",
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

            "boja_pozadine": "#FCE4EC",
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

            "boja_pozadine": "#FCE4EC",
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

            "boja_pozadine": "#FCE4EC",
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

            "boja_pozadine": "#FCE4EC",
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

            "boja_pozadine": "#FCE4EC",
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

            "boja_pozadine": "#FCE4EC",
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

            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["Ja", "Ti", "On", "Mi", "Vi", "Oni"],
            "osnova2": "student.",

            "boja_pozadine": "#FCE4EC",
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
            "osnova2": "se svaki dan.",

            "boja_pozadine": "#FCE4EC",
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

            "boja_pozadine": "#FCE4EC",
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

            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "osnova2": "autorima i svima koji su radili na knjizi.",
            "boja_pozadine": "#FCE4EC",
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
                "činit",
                "čine"
            ],
            "osnova": ["Ja ", "Ti ", "Ona ", "Mi ", "Vi ", "Oni "],
            "osnova2": " dobro za sve.",
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["Pojačaj zvuk, ne", "Pojačaj zvuk, ne ", "Pojačaj zvuk, ne ", "Pojačaj zvuk, ne ", "Pojačaj zvuk, ne ", "Pojačaj zvuk, ne "],
            "osnova2": " dobro.",
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["Nadamo se da", "Nadaš se da", "Nada se daa", "Nadamo se da", "Nadate se da", "Nadaju se da"],
            "osnova2": " na lotu.",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["Kada", "Kada", "Kada", "Kada", "Kada", "Kada"],
            "osnova2": " u kuću, ručak će biti gotov.",
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        },
        {
            "question": "popuni",
            "hint": "dogovoriti (engl. to agree)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Dogovorim",
                "Dogovoriš",
                "Dogovori",
                "Dogovorimo",
                "Dogovorite",
                "Dogovore"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " se s ostalim osobama u vezi s izletom.",
            "boja_pozadine": "#FCE4EC",
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
            "osnova2": " li na posao uvijek u isto vrijeme?",
            "boja_pozadine": "#FCE4EC",
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
            "osnova2": " zadaću, ispravit ću ti greške.",
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "osnova2": " svaki dan radi zdarvlja",
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "ispeći (engl. to bake, to fry)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "ispečem",
                "ispčeš",
                "ispeče",
                "ispečemo",
                "ispečete",
                "ispeku"
            ],
            "osnova": ["Za vikend ", "Za vikend ", "Za vikend ", "Za vikend ", "Za vikend ", "Za vikend "],
            "osnova2": " meso na ražnju.",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["Večeras ", "Večeras ", "Večeras ", "Večeras ", "Večeras ", "Večeras "],
            "osnova2": " mjesto za izlazak.",
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "kupiti (engl. to buy)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Kupim",
                "Kupiš",
                "Kupi",
                "Kupimo",
                "Kupite",
                "Kupe"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " novi laptop.",
            "boja_pozadine": "#FCE4EC",
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
            "osnova2": " na crni petak na sniženjima.",
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "osnova2": "  na Jadranskome moru.",
            "boja_pozadine": "#FCE4EC",
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
            "osnova2": "  svoje dijete prije spavanja.",
            "boja_pozadine": "#FCE4EC",
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
            "osnova2": "  boju kose.",
            "boja_pozadine": "#FCE4EC",
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
            "osnova2": "  da je svijet u ekološkoj opasnosti.",
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "osnova2": " prijatelja da mi pomogne oko učenja.",
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "naći (engl. to find)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Nađem",
                "Nađeš",
                "Nađe",
                "Nađemo",
                "Nađete",
                "Nađu"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " novi stan.",
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "osnova2": "  puno reklama u pošti.",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["ti", "", "ti", "", "", ""],
            "osnova2": " poruku kad dođem.",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "naručiti (engl. to order)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Naručim",
                "Naručiš",
                "Naruči",
                "Naručimo",
                "Naručite",
                "Naruče"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " pizzu za ručak.",
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "nazvati (engl. to call)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Nazovem",
                "Nazoveš",
                "Nazove",
                "Nazovemo",
                "Nazovete",
                "Nazovu"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " prijatelje poslje posla.",
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "objasniti (engl. explain)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Objasnim",
                "Objasniš",
                "Objasni",
                "Objasnimo",
                "Objasnite",
                "Objasne"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " rješenje zadataka za zadaću.",
            "boja_pozadine": "#FCE4EC",
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
            "osnova2": " svoje malo dijete.",
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "osnova2": " oko godišnjeg odmora dogovoriti ćemo sve.",
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, , {
            "question": "popuni",
            "hint": "opisati (engl. to describe)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Opišem",
                "Opišeš",
                "Opiše",
                "Opišemo",
                "Opišete",
                "Opišu"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " jedan svoj radni dan.",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "oprostiti (engl. to forgive)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Oprostim",
                "Oprostiš",
                "Oprosti",
                "Oprostimo",
                "Oprostite",
                "Oproste"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " mu, nije bilo zlonamjerno.",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "osjećati (engl. to feel)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Osjećam ",
                "Osjećaš ",
                "Osjeća ",
                "Osjećamo ",
                "Osjećate ",
                "Osjećaju "
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " veliku tugu zbog smrti majke.",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "osjetiti (engl. to feel)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Osjetim",
                "Osjetiš",
                "Osjeti",
                "Osjetimo",
                "Osjetite",
                "Osjete"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " jaku bol u koljenu.",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["Kada ", "Kada ", "Kada ", "Kada ", "Kada ", "Kada "],
            "osnova2": " u Irsku kupit ću ti lijep suvenir",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "otvoriti (engl. to open)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Otvorim",
                "Otvoriš",
                "Otvori",
                "Otvorimo",
                "Otvorite",
                "Otvore"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " kafiće u kvartu.",
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["Zbog glavobolje ", "Zbog glavobolje ", "Zbog glavobolje ", "Zbog glavobolje ", "Zbog glavobolje ", "Zbog glavobolje "],
            "osnova2": " nakon ustajanja s kauča.",
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pasti (engl. to fall)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Padnem",
                "Padneš",
                "Padne",
                "Padnemo",
                "Padnete",
                "Padnu"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " s ljuljačke.",
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
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
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pitati (engl. to ask)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "Pitam",
                "Pitaš",
                "Pita",
                "Pitamo",
                "Pitate",
                "Pitaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": " prijatelja kako mu je bilo na poslu.",
            "boja_pozadine": "#FCE4EC",
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
            "osnova2": " 12 čaši vode dnevno.",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pjevati (engl. to sing)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "pjevam",
                "pjevaš",
                "pjeva",
                "pjevamo",
                "pjevate",
                "pjevaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "plaćati (engl. to pay)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "plaćam",
                "plaćaš",
                "plaća",
                "plaćamo",
                "plaćate",
                "plaćaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "planinariti (engl. to hike)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "planinarim",
                "planinariš",
                "planinari",
                "planinarimo",
                "planinarite",
                "planinare"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "platiti (engl. to pay)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "platim",
                "platiš",
                "plati",
                "platimo",
                "platite",
                "plate"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "plivati (engl. to swim)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "plivam",
                "plivaš",
                "pliva",
                "plivamo",
                "plivate",
                "plivaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pojesti (engl. to eat)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "pojedem",
                "pojedeš",
                "pojede",
                "pojedemo",
                "pojedete",
                "pojedu"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pokazivati (engl. to show, to display)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "pokazujem",
                "pokazuješ",
                "pokazuje",
                "pokazujemo",
                "pokazujete",
                "pokazuju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        },  {
            "question": "popuni",
            "hint": "poklanjati (engl. to give)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "poklanjam",
                "poklanjaš",
                "poklanja",
                "poklanjamo",
                "poklanjate",
                "poklanjaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pomagati (engl. to help)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "pomažem",
                "pomažeš",
                "pomaže",
                "pomažemo",
                "pomažete",
                "pomažu"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "posjećivati (engl. to visit)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "posjećujem",
                "posjećuješ",
                "posjećuje",
                "posjećujemo",
                "posjećujete",
                "posjećivao"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "prati (se) (engl. to wash)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "perem",
                "pereš",
                "pere",
                "peremo",
                "perete",
                "peru"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "prodati (engl. to sell)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "prodam",
                "prodaš",
                "proda",
                "prodamo",
                "prodate",
                "prodaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "prodavati (engl. sell)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "prodajem",
                "prodaješ",
                "prodaje",
                "prodajemo",
                "prodajete",
                "prodaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "pušiti (engl. to smoke)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "pušim",
                "pušiš",
                "puši",
                "pušimo",
                "pušite",
                "puše"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "razlikovati (engl. to distinguish)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "razlikujem",
                "razlikuješ",
                "razlikuje",
                "razlikujemo",
                "razlikujete",
                "razlikuju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "razumijeti (engl. to understand)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "razumjevam",
                "razumjevaš",
                "razumjeva",
                "razumjevamo",
                "razumjevate",
                "razumjevaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "roniti (engl. to dive)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "ronim",
                "roniš",
                "roni",
                "ronimo",
                "ronite",
                "rone"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "ručati (engl. to lunch)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "ručam",
                "ručaš",
                "ruča",
                "ručamo",
                "ručate",
                "ručaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "sanjati (engl. to dream)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "sanjamo",
                "sanjaš",
                "sanja",
                "sanjamo",
                "sanjate",
                "sanjaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "sjećati se (engl. to remember)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "sjećam se",
                "sjećaš se",
                "sjeća se",
                "sjećamo se",
                "sjećate se",
                "sjećaju se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "sjetiti se (engl. to remember)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "sjetim se",
                "sjetiš se",
                "sjeti se",
                "sjetimo se",
                "sjetite se",
                "sjete se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "slaviti (engl. to celebrate)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "slavim",
                "slaviš",
                "slavi",
                "slavimo",
                "slavite",
                "slave"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "smijati se (engl. to laugh)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "smijem se",
                "smiješ se",
                "smije se",
                "smijemo se",
                "smijete se",
                "smiju se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "smjeti (engl. to be allowed)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "smijem",
                "smiješ",
                "smije",
                "smijemo",
                "smijete",
                "smiju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "spremati (engl. to save)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "spremam",
                "spremaš",
                "sprema",
                "spremamo",
                "spremate",
                "spremaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "spremiti (engl. to save)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "spremam",
                "spremiš",
                "spremi",
                "spremimo",
                "spremite",
                "spreme"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "stanovati (engl. to live in)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "stanujem",
                "stanuješ",
                "stanuje",
                "stanujemo",
                "stanujete",
                "stanuju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        },  {
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "stavljati (engl. to put on, to place on)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "stavljam",
                "stavljaš",
                "stavlja",
                "stavljamo",
                "stavljate",
                "stavljaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "studirati (engl. to study)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "studiram",
                "studiraš",
                "studira",
                "studiramo",
                "studirate",
                "studiraju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "sviđati se (engl. to like)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "sviđa se",
                "sviđaš se",
                "sviđa se",
                "sviđamo se",
                "sviđate se",
                "sviđaju se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "svirati (engl. to play)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "sviram",
                "sviraš",
                "svira",
                "sviramo",
                "svirate",
                "sviraju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "šaliti se (engl. to joke)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "šalim se",
                "šališ se",
                "šali se",
                "šalimo se",
                "šalite se",
                "šale se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "štedjeti (engl. to save, to spare)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "štedim",
                "štediš",
                "štedi",
                "štedimo",
                "štedite",
                "štede"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "trčati (engl. to run)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "trčim",
                "trčiš",
                "trči",
                "trčimo",
                "trčite",
                "trče"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "trebati (engl. to need)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "trebam",
                "trebaš",
                "treba",
                "trebamo",
                "trebate",
                "trebaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "trenirati (engl. to train)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "treniram",
                "treniraš",
                "trenira",
                "treniramo",
                "trenirate",
                "treniraju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "trošiti (engl. to spend)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "trošim",
                "trošiš",
                "troši",
                "trošimo",
                "trošite",
                "troše"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "učiniti (engl. to do)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "učinim",
                "učiniš",
                "učini",
                "učinimo",
                "učinite",
                "učine"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "ulaziti (engl. to enter)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "ulazim",
                "ulaziš",
                "ulazi",
                "ulazimo",
                "ulazite",
                "ulaze"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "uzeti (engl. to take)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "uzmem",
                "uzmeš",
                "uzme",
                "uzmemo",
                "uzmete",
                "uzmu"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "uzimati (engl. to take)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "uzimam",
                "uzimaš",
                "uzima",
                "uzimamo",
                "uzimate",
                "uzimaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "uživati (engl. to enjoy)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "uživam",
                "uživaš",
                "uživa",
                "uživamo",
                "uživate",
                "uživaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "veseliti (engl. to rejoice)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "veselim",
                "veseliš",
                "veseli",
                "veselimo",
                "veselite",
                "vesele"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "vjerovati (engl. to believe)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "vjerujem",
                "vjeruješ",
                "vjeruje",
                "vjerujemo",
                "vjerujete",
                "vjeruju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "voljeti (engl. to love)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "voziti (engl. to drive)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "vozim",
                "voziš",
                "vozi",
                "vozimo",
                "vozite",
                "voze"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "vući (engl. to drag)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "vučem",
                "vučeš",
                "vuče",
                "vučemo",
                "vučete",
                "vuku"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "zaboraviti (engl. to forget)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "zaboravim",
                "zaboraviš",
                "zaboravi",
                "zaboravimo",
                "zaboravite",
                "zaborave"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "zanimati (engl. interest)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "zanimam",
                "zanimaš",
                "zanima",
                "zanimamo",
                "zanimate",
                "zanimaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        },  {
            "question": "popuni",
            "hint": "zatvoriti (engl. close)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "završavati (engl. to finish)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "završavam",
                "završavaš",
                "završava",
                "završavamo",
                "završavate",
                "završavaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "znati (engl. to know)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "znam",
                "znaš",
                "zna",
                "znamo",
                "znate",
                "znaju"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
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
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "željeti (engl. to want)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "želim",
                "želiš",
                "želi",
                "želimo",
                "želite",
                "žele"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "živjeti (engl. to live)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "živim",
                "živiš",
                "živi",
                "živimo",
                "živite",
                "žive"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }, {
            "question": "popuni",
            "hint": "žuriti se (engl. to hurry)",
            "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
            "correctAnswer": [
                "žurim se",
                "žuriš se",
                "žuri se",
                "žurimo se",
                "žurite se",
                "žure se"
            ],
            "osnova": ["", "", "", "", "", ""],
            "osnova2": "",
            "boja_pozadine": "#FCE4EC",
            "time": 20,
        }
    ];
    prezent = p1
    shuffle(prezent)
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