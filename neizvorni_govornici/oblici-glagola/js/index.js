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
    vrijeme = 0,randbroj=0;
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
$(document).ready(function () {
    $('body').on('keydown', function (event) {
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
    $.fn.declasse = function (re) {
        return this.each(function () {
            var c = this.classList
            for (var i = c.length - 1; i >= 0; i--) {
                var classe = "" + c[i]
                if (classe.match(re)) c.remove(classe)
            }
        })
    }
    // Start the quiz
    newQuiz = function () {
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
    generateQuestionAndAnswers = function () {
        question.html("<span style='font-size: 1.3rem;'>" + (questionCounter + 1) + "/" + prezent.length + ".</span> <br>");
        $("#odgovor").val('')
        $(".popuni").show();
        var el = document.getElementById('odgovor');
        el.focus();
        el.onblur = function () {
            setTimeout(function () {
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
        randbroj=Math.floor((Math.random() * (prezent[questionCounter].lica.length-1)) + 0);
        $("#osnova").text(prezent[questionCounter].osnova[randbroj])
        $("#osnova2").html(prezent[questionCounter].osnova2 +prezent[questionCounter].lica[randbroj].substr(prezent[questionCounter].lica[randbroj].length-18,prezent[questionCounter].lica[randbroj].length))
        $("#oblik").html(prezent[questionCounter].lica[randbroj].substr(0,prezent[questionCounter].lica[randbroj].length-18)+"<br><span class='vrime'>" + prezent[questionCounter].hint+ "</span>")
        $(".slikica").attr("src", "slike/" + prezent[questionCounter].slika)
        var input = document.querySelector('input'); // get the input element
        input.addEventListener('input', resizeInput); // bind the "resizeInput" callback on "input" event
        resizeInput.call(input); // immediately call the function
        function resizeInput() {
            if (this.value.length == 0) { this.style.width = "3ch" }
            else {
                this.style.width = this.value.length + "ch";
            }
        }
    };
    // Store the correct answer of a given question
    getCorrectAnswer = function () {
        correctAnswer = prezent[questionCounter].correctAnswer;
    };
    // Store the user's selected (clicked) answer
    getUserAnswer = function (target) {
        userSelectedAnswer = $(target).find(answerSpan).text();
    };
    // Add the pointer to the clicked answer
    selectAnswer = function (target) {
        $(target).find(selectionDiv).addClass('ion-chevron-right');
        $(target).addClass("odabir")
    };
    // Remove the pointer from any answer that has it
    deselectAnswer = function () {
        if (selectionDiv.hasClass('ion-chevron-right')) {
            selectionDiv.removeClass('ion-chevron-right');
            selectionDiv.parent().removeClass("odabir")
        }
    };
    // Get the selected answer's div for highlighting purposes
    getSelectedAnswerDivs = function (target) {
        toBeHighlighted = $(target);
        toBeMarked = $(target).find(feedbackDiv);
    };
    // Make the correct answer green and add checkmark
    highlightCorrectAnswerGreen = function (target) {
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
    highlightIncorrectAnswerRed = function () {
        toBeHighlighted.addClass('questions-page--incorrect');
        toBeMarked.addClass('ion-close-round');
    };
    // Clear all highlighting and feedback
    clearHighlightsAndFeedback = function () {
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
    startBtn.on('click', function () {
        if ($(this).attr('id') == "bez") {
            iskljuci_v = 1;
            $(".vrijeme").hide()
            $('form').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSc9Us-DEhya_phHIBtxlU2rzgm-7cU2Uu0JYb1hjQOsloK3FQ/formResponse');
            r1 = 1
            tajming = 10
        } else if ($(this).attr('id') == "20") {
            iskljuci_v = 1;
            r1=2
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
    answerDiv.on('click', function () {
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
    $('#odgovor').on("keyup", function () {
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
                        html: "<p class='dodatak'><strong>Točan odgovor je: " + prezent[questionCounter].osnova[randbroj] + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[randbroj] + "</span></strong>" + prezent[questionCounter].osnova2 + prezent[questionCounter].lica[randbroj].substr(prezent[questionCounter].lica[randbroj].length-18,prezent[questionCounter].lica[randbroj].length)+"<br></p><br><table style='width: 100%;' border='1' cellpadding='3' > <tbody> <tr> <td style='border:0px'>&nbsp;</td><td >&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>jednina</span></td><td>&nbsp;<span style='color:rgb(235, 73, 71);  font-wieight:600'>množina</span></td></tr><tr> <td>&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>1. lice</span></td><td>"+prezent[questionCounter].correctAnswer[0].toLowerCase()+"</td><td>"+prezent[questionCounter].correctAnswer[3].toLowerCase()+"</td></tr><tr> <td>&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>2. lice</span></td><td>"+prezent[questionCounter].correctAnswer[1].toLowerCase()+"</td><td>"+prezent[questionCounter].correctAnswer[4].toLowerCase()+"</td></tr><tr> <td>&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>3. lice</span></td><td>"+prezent[questionCounter].correctAnswer[2].toLowerCase()+"</td><td>"+prezent[questionCounter].correctAnswer[5].toLowerCase()+"</td></tr></tbody></table>",
                        showCloseButton: true,
                        confirmButtonText: ' dalje',
                        backdrop: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    });
                if (prezent[questionCounter].pin.length > 0) {
                    $(".dodatak").append("<br><p>" + prezent[questionCounter].napomena + "</p>")
                }
                $(".swal2-confirm").unbind("click").click(function () {
                    clearInterval(countdownTimer)
                    nastavi()
                    if (ide == 1 && iskljuci_v == 0) {
                        ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })
                $(".swal2-close").unbind("click").click(function () {
                    clearInterval(countdownTimer)
                    nastavi()
                    if (ide == 1 && iskljuci_v == 0) {
                        ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })
            } else {
                if ($("#odgovor").val() == prezent[questionCounter].correctAnswer[randbroj] ) {
                    // Increment the total correct answers counter
                    correctAnswersCounter++;
                    bodovi += 10;
                    bodovi += vrijeme
                    broj = 10 + vrijeme
                    $("#tocno")[0].play();
                    swal({
                        title: "Točno",
                        html: "<p  class='dodatak'><span class='povrt'>+ <span class='tocno_bod'>" + broj + "</span></span></p><br><table style='width: 100%;' border='1' cellpadding='3' > <tbody> <tr> <td style='border:0px'>&nbsp;</td><td >&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>jednina</span></td><td>&nbsp;<span style='color:rgb(235, 73, 71);  font-wieight:600'>množina</span></td></tr><tr> <td>&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>1. lice</span></td><td>"+prezent[questionCounter].correctAnswer[0].toLowerCase()+"</td><td>"+prezent[questionCounter].correctAnswer[3].toLowerCase()+"</td></tr><tr> <td>&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>2. lice</span></td><td>"+prezent[questionCounter].correctAnswer[1].toLowerCase()+"</td><td>"+prezent[questionCounter].correctAnswer[4].toLowerCase()+"</td></tr><tr> <td>&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>3. lice</span></td><td>"+prezent[questionCounter].correctAnswer[2].toLowerCase()+"</td><td>"+prezent[questionCounter].correctAnswer[5].toLowerCase()+"</td></tr></tbody></table>",
                        showCloseButton: true,
                        confirmButtonText: ' dalje',
                        backdrop: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    });
                    $(".swal2-confirm").unbind("click").click(function () {
                        clearInterval(countdownTimer)
                        $(".swal2-modal").removeClass("swal-fix")
                        nastavi()
                        if (ide == 1 && iskljuci_v == 0) {
                            ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                        }
                    })
                    $(".swal2-close").unbind("click").click(function () {
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
                            html: "<p class='dodatak'><strong>Točan odgovor je: " + prezent[questionCounter].osnova[randbroj] + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[randbroj] + "</span>" + prezent[questionCounter].osnova2 + prezent[questionCounter].lica[randbroj].substr(prezent[questionCounter].lica[randbroj].length-18,prezent[questionCounter].lica[randbroj].length)+"</strong><br></p><br><table style='width: 100%;' border='1' cellpadding='3' > <tbody> <tr> <td style='border:0px'>&nbsp;</td><td >&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>jednina</span></td><td>&nbsp;<span style='color:rgb(235, 73, 71);  font-wieight:600'>množina</span></td></tr><tr> <td>&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>1. lice</span></td><td>"+prezent[questionCounter].correctAnswer[0].toLowerCase()+"</td><td>"+prezent[questionCounter].correctAnswer[3].toLowerCase()+"</td></tr><tr> <td>&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>2. lice</span></td><td>"+prezent[questionCounter].correctAnswer[1].toLowerCase()+"</td><td>"+prezent[questionCounter].correctAnswer[4].toLowerCase()+"</td></tr><tr> <td>&nbsp;<span style='color:rgb(235, 73, 71); font-wieight:600'>3. lice</span></td><td>"+prezent[questionCounter].correctAnswer[2].toLowerCase()+"</td><td>"+prezent[questionCounter].correctAnswer[5].toLowerCase()+"</td></tr></tbody></table>",
                            showCloseButton: true,
                            confirmButtonText: ' dalje',
                            backdrop: false,
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                        });
                    $(".swal2-confirm").unbind("click").click(function () {
                        clearInterval(countdownTimer)
                        nastavi()
                        if (ide == 1 && iskljuci_v == 0) {
                            ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                        }
                    })
                    $(".swal2-close").unbind("click").click(function () {
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
    submitBtn.on('click', function () {
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
        answerDiv.on('click', function () {
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
    continueBtn.on('click', function () {
    });
    $(".questions-page__answer-div").dblclick(function () {
        odgovor()
    })
    /* --- PAGE 3/3 --- */
    // Clicking on the retake button:
    retakeBtn.on('click', function () {
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
        "hint": "pomagati (engl. help)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "Pomažem",
            "Pomažeš",
            "Pomaže",
            "Pomažemo",
            "Pomažete",
            "Pomažu"
        ],
        "osnova": ["","","","","",""],
        "osnova2": " starijim ljudima.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "pomagati.jpg"
    },
    {
        "question": "popuni",
        "hint": "vjerovati (engl. trust)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "Vjerujem",
            "Vjeruješ",
            "Vjeruje",
            "Vjerujemo",
            "Vjerujete",
            "Vjeruju"
        ],
        "osnova": ["","","","","",""],
        "osnova2": " prijateljima.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "vjerujem.jpg"
    },
    {
        "question": "popuni",
        "hint": "veseliti se (engl. be happy)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "Veselim se",
            "Veseliš se",
            "Veseli se",
            "Veselimo se",
            "Veselite se",
            "Vesele se"
        ],
        "osnova": ["","","","","",""],
        "osnova2": " filmu.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "veseliti.jpg"
    },
    {
        "question": "popuni",
        "hint": "zahvaljivati (engl. be thankful)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "Zahvaljujem",
            "Zahvaljuješ",
            "Zahvaljuje",
            "Zahvaljujemo",
            "Zahvaljujete",
            "Zahvaljuju"
        ],
        "osnova": ["","","","","",""],
        "osnova2": " svojim kolegama na pomoći.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "zahvaljujem.jpg"
    },
    {
        "question": "popuni",
        "hint": "pokloniti (engl. to give, donate)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "Poklanjam",
            "Poklanjaš",
            "Poklanja",
            "Poklanjamo",
            "Poklanjate",
            "Poklanjaju"
        ],
        "osnova": ["","","","","",""],
        "osnova2": " cvijeće djevojci.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "pokloniti.jpg"
    },
    {
        "question": "popuni",
        "hint": "radovati se (engl. look forward to)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "Radujem se",
            "Raduješ se",
            "Raduje se",
            "Radujemo se",
            "Radajute se",
            "Raduju se"
        ],
        "osnova": ["","","","","",""],
        "osnova2": " ljetu.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "radujem.jpg"
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
        "osnova": ["","","","","",""],
        "osnova2": " vicu.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "smijati.jpg"
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
        "slika": "cuditi.jpg"
    },
    {
        "question": "popuni",
        "hint": "prigovarati (engl. complain about)",
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
        "slika": "prigovarati.jpg"
    },
    {
        "question": "popuni",
        "hint": "govoriti (engl. speak)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "Govorim",
            "Govoriš",
            "Govori",
            "Govorimo",
            "Govorite",
            "Govore"
        ],
        "osnova": ["","","","","",""],
        "osnova2": " o filmu koji je trenutačno u kinima.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "govoriti.jpg"
    },
    {
        "question": "popuni",
        "hint": "dati (engl. give)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "dajem",
            "daješ",
            "daje",
            "dajemo",
            "dajete",
            "daju"
        ],
        "osnova": ["Poklon ","Poklon ","Poklon ","Poklon ","Poklon ","Poklon "],
        "osnova2": " prijateljima za rođendan.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "dati.jpg"
    },
    {
        "question": "popuni",
        "hint": "slati (engl. send)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "šaljem",
            "šalješ",
            "šalje",
            "šaljemo",
            "šaljete",
            "šalju"
        ],
        "osnova": ["Poruke redovito ", "Poruke redovito ", "Poruke redovito ", "Poruke redovito ","Poruke redovito ","Poruke redovito "],
        "osnova2": " prijateljima.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "slati.jpg"
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
        "osnova": ["","","","","",""],
        "osnova2": " Zagrebu.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "priblizavati.jpg"
    },
    {
        "question": "popuni",
        "hint": "pisati (engl. write)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "Pišem",
            "Pišeš",
            "Piše",
            "Pišemo",
            "Pišete",
            "Pišu"
        ],
        "osnova": ["","","","","",""],
        "osnova2": " knjigu.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "pisati.jpg"
    },
    {
        "question": "popuni",
        "hint": "smetati (engl. bother)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "Smetam",
            "Smetaš",
            "Smeta",
            "Smetamo",
            "Smetate",
            "Smetaju"
        ],
        "osnova": ["","","","","",""],
        "osnova2": " studentima koji uče.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "smetati.jpg"
    },
    {
        "question": "popuni",
        "hint": "vjerovati (engl. belive)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "Vjerujem",
            "Vjeruješ",
            "Vjeruje",
            "Vjerujemo",
            "Vjerujete",
            "Vjeruju"
        ],
        "osnova": ["","","","","",""],
        "osnova2": " drugim ljudima.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "vjerovati.jpg"
    },
    {
        "question": "popuni",
        "hint": "nadati se (engl. hope)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "Nadam se",
            "Nadaš se",
            "Nada se",
            "Nadamo se",
            "Nadate se",
            "Nadaju se"
        ],
        "osnova": ["","","","","",""],
        "osnova2": " da će hrvatska reprezentacija pobijediti.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "nada.jpg"
    },
    {
        "question": "popuni",
        "hint": "diviti se (engl. admire)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "Divim se",
            "Diviš se",
            "Divi se",
            "Divimo se",
            "Divite se",
            "Dive se"
        ],
        "osnova": ["","","","","",""],
        "osnova2": " lijepim slikama.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "diviti.jpg"
    },
    {
        "question": "popuni",
        "hint": "birati (engl. choose)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "Biram",
            "Biraš",
            "Bira",
            "Biramo",
            "Birate",
            "Biraju"
        ],
        "osnova": ["","","","","",""],
        "osnova2": " novog predsjednika ili novu predsjednicu.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "birati.jpg"
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
        "osnova": ["Ja","Ti","On","Mi","Vi","Oni"],
        "osnova2": "student.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "biti.jpg"
    },
    {
        "question": "popuni",
        "hint": "brijati se (engl. shave)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "Brijem se",
            "Briješ se",
            "Brije se",
            "Brijemo se",
            "Brijete se",
            "Briju se"
        ],
        "osnova": ["","","","","",""],
        "osnova2": "se svaki dan.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "brijati.jpg"
    },
    {
        "question": "popuni",
        "hint": "buditi se (engl. wake up)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "Budim se",
            "Budiš se",
            "Budi se",
            "Budimo se",
            "Budite se",
            "Bude se"
        ],
        "osnova": ["","","","","",""],
        "osnova2": " svaki dan u 7 sati.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "buditi.jpg"
    },
    {
        "question": "popuni",
        "hint": "crtati (engl. draw)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "crtam",
            "craš",
            "crta",
            "crtamo",
            "crtate",
            "crtaju"
        ],
        "osnova": ["Bojama ","Bojama ","Bojama ","Bojama ","Bojama ","Bojama "],
        "osnova2": " na papiru.",
       
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "crtati.jpg"
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
        "osnova": ["Koga ","Koga ","Koga ","Koga ","Koga ","Koga "],
        "osnova2": "?",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "cekati.jpg"
    },
    {
        "question": "popuni",
        "hint": "čestitati (engl. congratulate)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "Čestitam",
            "Čestitaš",
            "Čestita",
            "Čestitamo",
            "Čestitate",
            "Čestitaš"
        ],
        "osnova": ["","","","","",""],
        "osnova2": "autorima i svima koji su radili na knjizi.",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "cestitati.jpg"
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
        "osnova": ["Ja ","Ti ","Ona ","Mi ","Vi ","Oni "],
        "osnova2": " dobro za sve.",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "ciniti.jpg"
    },
    {
        "question": "popuni",
        "hint": "čitati (engl. read)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "Čitam",
            "Čitaš",
            "Čita",
            "Čitamo",
            "Čitate",
            "Čitaju"
        ],
        "osnova": ["","","","","",""],
        "osnova2": " knjigu navečer.",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "citati.jpg"
    },
    {
        "question": "popuni",
        "hint": "čitati (engl. read)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "Čitam",
            "Čitaš",
            "Čita",
            "Čitamo",
            "Čitate",
            "Čitaju"
        ],
        "osnova": ["","","","","",""],
        "osnova2": " knjigu navečer.",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "citati.jpg"
    },
    {
        "question": "popuni",
        "hint": "čuti (engl. hear)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "čujem",
            "čuješ",
            "čuje",
            "čujemo",
            "čujete",
            "čuju"
        ],
        "osnova": ["Pojačaj zvuk, ne","Pojačaj zvuk, ne ","Pojačaj zvuk, ne ","Pojačaj zvuk, ne ","Pojačaj zvuk, ne ","Pojačaj zvuk, ne "],
        "osnova2": " dobro.",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "cuti.jpg"
    },
    {
        "question": "popuni",
        "hint": "čuvati (engl. protect)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "Čuvam",
            "Čuvaš",
            "Čuva",
            "Čuvamo",
            "Čuvate",
            "Čuvaju"
        ],
        "osnova": ["","","","","",""],
        "osnova2": " kuću od provale.",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "cuvati.jpg"
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
        "osnova": ["Nadamo se da","Nadaš se da","Nada se daa","Nadamo se da","Nadate se da","Nadaju se da"],
        "osnova2": " na lotu.",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "dobiju.jpg"
    },
    {
        "question": "popuni",
        "hint": "doći (engl. come, arrive)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "dođem",
            "dođeš",
            "dođe",
            "dođemo",
            "dođete",
            "dođu"
        ],
        "osnova": ["Kada","Kada","Kada","Kada","Kada","Kada"],
        "osnova2": " u kuću, ručak će biti gotov.",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "doci.jpg"
    },
    {
        "question": "popuni",
        "hint": "dogovarati (engl. come, arrive)",
        "lica": ["1. lice jd. (<span>ja</span>)", "2. lice jd. (<span>ti</span>)", "3. lice jd. (<span>on</span>)", "1. lice mn. (<span>mi</span>)", "2. lice mn. (<span>vi</span>)", "3. lice mn. (<span>oni</span>)"],
        "correctAnswer": [
            "dođem",
            "dođeš",
            "dođe",
            "dođemo",
            "dođete",
            "dođu"
        ],
        "osnova": ["Kada","Kada","Kada","Kada","Kada","Kada"],
        "osnova2": " u kuću, ručak će biti gotov.",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "slika": "doci.jpg"
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
        false, false, false, 0 /*left*/, null);
    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}