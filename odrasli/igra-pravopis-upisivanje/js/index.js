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
    prekidac, countdownTimer, bodovi = 0, sadrzaj1, kategorija,
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

$(document).ready(function () {
    $('body').on('keydown', function (event) {
        var x = event.which;
        if (x === 13) {
            event.preventDefault();
        }
    });

    $(".sadrzaj").click(function () {
        sadrzaj = jQuery(this).attr("id")
        if (sadrzaj == "cc") { sadrzaj1 = "p2" }
        else if (sadrzaj == "ije") { sadrzaj1 = "p1" }
        else if (sadrzaj == "dz") { sadrzaj1 = "p3" }
        else if (sadrzaj == "mijesano") { sadrzaj1 = "p3.concat(p1).concat(p2)" }
        $(".sadrzaj").hide()
        $("#opis").text("odaberi vokabular")
        $(".kategorija").show()
    })
    $(".kategorija").click(function () {
        kategorija = jQuery(this).attr("id")
        if (kategorija == "stranci") {
            let myScript = document.createElement("script");
            myScript.setAttribute("src", "js/stranci.js");
            document.body.prepend(myScript);
        }
        else if (kategorija == "djeca") {
            let myScript = document.createElement("script");
            myScript.setAttribute("src", "js/djeca.js");
            document.body.prepend(myScript);
        }
        else if (kategorija == "osnovni") {
            let myScript = document.createElement("script");
            myScript.setAttribute("src", "js/osnovni.js");
            document.body.prepend(myScript);
        }
        $("#opis").text("odaberi broj pitanja")
        $(".kategorija").hide()
        $(".broj").show()
        if (kategorija == "stranci" && sadrzaj1=="p3") { $("#100pitanja").hide(); $("#50pitanja").hide()}
        if (kategorija == "stranci" && sadrzaj1=="p1") { $("#100pitanja").hide();}
        if (kategorija == "djeca" && sadrzaj1=="p3") {$("#100pitanja").hide(); $("#50pitanja").hide()}

    })

    $(".broj").click(function () {
        if (sadrzaj1 == "p1") { prezent = p1 }
        else if (sadrzaj1 == "p2") { prezent = p2 }
        else if (sadrzaj1 == "p3") { prezent = p3 }
        else if (sadrzaj1 == "p3.concat(p1).concat(p2)") { prezent = p3.concat(p1).concat(p2) }
        pitanja = jQuery(this).attr("id")
        if (pitanja == "20pitanja") {
            shuffle(prezent)
            prezent = prezent.slice(0, 20)
        }
        else if (pitanja == "50pitanja") {
            shuffle(prezent)
            prezent = prezent.slice(0, 50)
        }
        else if (pitanja == "100pitanja") {
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
    generateQuestionAndAnswers = function () {
        question.html("<span style='font-size: 1.3rem;'>" + (questionCounter + 1) + "/" + prezent.length + ".</span> <br>");
        if (prezent[questionCounter].question == "popuni") {
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
            $("#opis").html("<em>" + prezent[questionCounter].hint + "</em>")
            $(".vrijeme").html('<progress value="' + tajming + '" max="' + tajming + '" id="pageBeginCountdown"></progress><p><span id="pageBeginCountdownText">' + tajming + '</span></p>')
            $("body").css({
                "background-color": prezent[questionCounter].boja_pozadine
            })
            if (prekidac == 1 && iskljuci_v == 0) {
                ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
            }
            $("#osnova").text(prezent[questionCounter].osnova)
            $("#glagol").text(prezent[questionCounter].glagol)
            $("#osnova2").text(prezent[questionCounter].osnova2)
            $("#oblik").html("<span class='vrime'>" + prezent[questionCounter].hint + "</span>")
            //$(".slikica").attr("src", "slike/" + prezent[questionCounter].slika)
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
        pogreske = []
        if ($(this).attr('id') == "bez") {
            iskljuci_v = 1;
            $(".vrijeme").hide()
        } else if ($(this).attr('id') == "20") {
            tajming = 20;
        } else if ($(this).attr('id') == "10") {
            tajming = 10;
        }
        else if ($(this).attr('id') == "5") {
            tajming = 5;
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
            if (document.getElementById("pageBeginCountdown").value == "0" && iskljuci_v == 0) {
                pogreske.push(prezent[questionCounter].osnova + prezent[questionCounter].correctAnswer[0] + prezent[questionCounter].osnova2)
                bodovi -= 10;
                $("#zvono")[0].play();
                if (prezent[questionCounter].correctAnswer[1].length == 0) {
                    swal({
                        title: "Isteklo je vrijeme.",
                        html: "<p class='dodatak'><strong>Točan odgovor je: " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[0] + "</span></strong>" + prezent[questionCounter].osnova2 + "<br></p><br><img src='slike/vrijeme.png'class='slikica2'/>",
                        showCloseButton: true,
                        confirmButtonText: ' dalje',
                        backdrop: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    });
                } else {
                    swal({
                        title: "Isteklo je vrijeme.",
                        html: "<p class='dodatak'><strong>Točani odgovori su: " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[0] + "</span> " + prezent[questionCounter].osnova2 + ", " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[1] + " </strong>" + prezent[questionCounter].osnova2 + "<br></p><br><img src='slike/vrijeme.png'class='slikica2'/>",
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

                if ($("#odgovor").val().toLowerCase() == prezent[questionCounter].correctAnswer[0].toLowerCase() || $("#odgovor").val().toLowerCase() == prezent[questionCounter].correctAnswer[1].toLowerCase()) {
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
                        $(".odgov").unbind("click").click(function () {
                            if ($(this).attr('value') == prezent[questionCounter].tocan[brb]) {
                                $(".slikica2").show()
                                $(".odgov").hide(300)
                                $(".dodatak").append("<br><p>" + prezent[questionCounter].napomena + "</p>")
                                bodovi += 10
                                $(".tocno_bod").html(parseInt($(".tocno_bod").text()) + 10)
                                $(".swal2-confirm").show()
                                $(".swal2-close").show()
                                $(".swal2-modal").addClass("swal-fix")
                            } else {
                                $(".odgov").hide(300)
                                $(".povrt").hide(300)
                                $(".dodatak").append("<br><p>Odgovor je: " + prezent[questionCounter].tocan + ".<br>" + prezent[questionCounter].napomena + "</p>")
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
                    pogreske.push(prezent[questionCounter].osnova + prezent[questionCounter].correctAnswer[0] + prezent[questionCounter].osnova2)
                    bodovi -= 10;
                    if (prezent[questionCounter].correctAnswer[1].length == 0) {
                        $("#odgovor").val('')

                        $("#pogresno")[0].play()
                        swal({
                            title: "Netočno",
                            html: "<p class='dodatak'><strong>Točan odgovor je: " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[0] + "</span>" + prezent[questionCounter].osnova2 + "</strong><br></p><br><img src='slike/krivo.png' class='slikica2'/>",
                            showCloseButton: true,
                            confirmButtonText: ' dalje',
                            backdrop: false,
                            allowOutsideClick: false,
                            allowEscapeKey: false,

                        });
                    } else {
                        $("#odgovor").val('')

                        swal({
                            title: "Netočno",
                            html: "<p class='dodatak'><strong>Točni odgovori mogu biti: " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[0] + "</span>" + prezent[questionCounter].osnova2 + ", " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[1] + "</span>" + prezent[questionCounter].osnova2 + "</strong><br></p><br><img src='slike/krivo.png' class='slikica2'/>",
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
            
            if(kategorija=="djeca"){
                if(sadrzaj1=="p1"){$("#bootstrapForm").attr("action","https://docs.google.com/forms/d/e/1FAIpQLScU9cmcOTYJPvbSuogJlEb5pUZjWi8FECpth09BUau_krvFKQ/formResponse")}
                else if(sadrzaj1=="p2"){$("#bootstrapForm").attr("action","https://docs.google.com/forms/d/e/1FAIpQLSeKAHLyXWZMuaiEA__KtfQ1Et4N4sbM4RaiWO8KKsyMylKiDg/formResponse")}
                else if(sadrzaj1=="p3"){$("#bootstrapForm").attr("action","https://docs.google.com/forms/d/e/1FAIpQLSckDVcMBmFxnqyr0Bu_Hvn1mjdudlODjHvB4mF1pDIZN_lr6Q/formResponse")}
                else if(sadrzaj1=="p3.concat(p1).concat(p2)"){
                    $("#bootstrapForm").attr("action","https://docs.google.com/forms/d/e/1FAIpQLSeJ0ViSRIApUIG_5K9DKKZiCY928iv67jJuvGTeKGSldHeHKQ/formResponse")
                }
            }
            else if(kategorija=="stranci"){
                if(sadrzaj1=="p1"){$("#bootstrapForm").attr("action","https://docs.google.com/forms/d/e/1FAIpQLScrSDrvsrsFuEjKQERdMRowgudmAm_5SWeZJRBlIbk39KBD0g/formResponse")}
                else if(sadrzaj1=="p2"){$("#bootstrapForm").attr("action","https://docs.google.com/forms/d/e/1FAIpQLSfXXwiReJjr-IZ74no-ag5Oao6doCPDkJPCjYp5nHN5QK5aVw/formResponse")}
                else if(sadrzaj1=="p3"){$("#bootstrapForm").attr("action","https://docs.google.com/forms/d/e/1FAIpQLSeoDIe2NnvTjt3n_RjXP9_Cc84uTgebUySQ6_4ROFIW3LC_0g/formResponse")}
                else if(sadrzaj1=="p3.concat(p1).concat(p2)"){
                    $("#bootstrapForm").attr("action","https://docs.google.com/forms/d/e/1FAIpQLSdSBQyaOk1BnAus1BShT08bc0HGLV2XQ-yvhYpyWNOALwZPiw/formResponse")
                }
            }
            else if(kategorija=="osnovni"){
                if(sadrzaj1=="p1"){$("#bootstrapForm").attr("action","https://docs.google.com/forms/d/e/1FAIpQLSc_pzew7N5MGwXj2DDlpBJVU7WMna9cg96X8TKwiM4Zmeld6A/formResponse")}
                else if(sadrzaj1=="p2"){$("#bootstrapForm").attr("action","https://docs.google.com/forms/d/e/1FAIpQLSeJVyCRIM5NEDn5Wy8z22HJx_VFs5tNausfikHIqRjsdJ7foQ/formResponse")}
                else if(sadrzaj1=="p3"){$("#bootstrapForm").attr("action","https://docs.google.com/forms/d/e/1FAIpQLSc9-P2JrOcid-DmclLnBDukCPzyd7lrDF7b1NRViCZhxQk1IQ/formResponse")}
                else if(sadrzaj1=="p3.concat(p1).concat(p2)"){
                   
                    $("#bootstrapForm").attr("action","https://docs.google.com/forms/d/e/1FAIpQLSeTv02Z6vEzZsvay6FV1a-SaisbBJ9utjD_hM41RWQflD_VZw/formResponse")
                }
            }
            
            if (pogreske.length != 0) {
                $("#pogreske").show()
                $("textarea").val(pogreske.join("\n"))
                $("#bootstrapForm").submit();
                $("#bootstrapForm").remove();
            }
            $("#pogreske").click(function () {
                swal({
                    title: "riječi koje ste pogriješili u igri:",
                    html: "" + pogreske.join(", "),
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
    $.getScript("osnovni.js", function (data, textStatus, jqxhr) {
        console.log(data); //data returned
        console.log(textStatus); //success
        console.log(jqxhr.status); //200
        console.log('Load was performed.');
    });

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