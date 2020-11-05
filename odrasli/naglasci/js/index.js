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
    vrijeme = 0, pogreske = [],
    randomslovo,
    nalog = 0, rijeci,
    moze = 0;
slova_akcenti = {
    "a": "àáâãäåāȁ",
    "b": "àáâãäåāȁ",
    "c": "àáâãäåāȁ",
    "d": "àáâãäåāȁ",
    "e": "àáâãäåāȁ",
    "f": "àáâãäåāȁ",
    "g": "àáâãäåāȁ",
    "h": "àáâãäåāȁ",
    "i": "ìíîïīȋȉ",
    "j": "àáâãäåāȁ",
    "k": "àáâãäåāȁ",
    "l": "àáâãäåāȁ",
    "m": "àáâãäåāȁ",
    "n": "àáâãäåāȁ",
    "o": "òóôõöøōȍ",
    "p": "àáâãäåāȁ",
    "r": "ȑŕ",
    "s": "àáâãäåāȁ",
    "z": "àáâãäåāȁ",
    "v": "àáâãäåāȁ",
    "u": "ùúûüūȕȗ",
}
function ProgressCountdown(timeleft, bar, text) {
    $(".begin-countdown").show(300)
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
    Array.prototype.multiIndexOf = function (el) {
        var idxs = [];
        for (var i = this.length - 1; i >= 0; i--) {
            if (this[i] === el) {
                idxs.unshift(i);
            }
        }
        return idxs;
    };
    index = 0;
    // Load the next question and set of answers
    generateQuestionAndAnswers = function () {
        moze = 1
        question.html("<span style='font-size: 1.3rem;'>" + (questionCounter + 1) + "/" + pitanja.length + ".</span> <br>");
        $("#odgovor").val('')
        $(".popuni").show();
        $(".questions-page__answer-list").hide()
        $("#opis").html("<em>" + 20 + "</em>")
        $(".vrijeme").html('<progress value="' + tajming + '" max="' + tajming + '" id="pageBeginCountdown"></progress><p><span id="pageBeginCountdownText">' + tajming + '</span></p>')
        //$("#osnova").text(pitanja[questionCounter].osnova)
        rijec = pitanja[index]
        //slova = rijec.replace(/[\[\]&]+|-/g, '');
        rijeci = rijec.split("")
        crtice = rijeci.multiIndexOf("-");
        crtice.forEach(x => rijeci[x] = "-" + rijeci[x + 1])
        for (x = 0; x < rijeci.length; x++) {
            if (rijeci[x][0] == "-") {
                rijeci[x + 1] = ""
            }
        }
        rijeci = rijeci.filter(n => n);
        html = ""
        akcenti = '<span class="akcenti">´</span> <span class="akcenti">˝</span> <span class="akcenti">`</span> <span class="akcenti"> ̏</span> <span class="akcenti">ˆ</span> <span class="akcenti">ˇ</span> <span class="akcenti">˘</span>'
        for (x = 0; x < rijeci.length; x++) {
            alert(slova_akcenti[rijeci[x]])
            if (rijeci[x][0].toLowerCase() == "-") {
                html += "<span class='oznaci tocno tooltip' title='" + akcenti + "'>" + rijeci[x].slice(1) + "</span>"
            } else {
                html += "<span class='oznaci netocno tooltip' title='" + akcenti + "'>" + rijeci[x] + "</span>"
            }
        }
        $.getScript("js/tooltip.js", function (data, textStatus, jqxhr) {
            console.log(data); //data returned
            console.log(textStatus); //success
            console.log(jqxhr.status); //200
            console.log('Load was performed.');
        });
        $(".rijec").html(html)
        $(".oznaci").on("click", function () {
            if (moze == 1) {
                $(this).toggleClass("oznaceno")
            } else {
            }
        })
        if (nalog == 0) {
            moze = 1;
            if (iskljuci_v == 1) { return }
            else {
                ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
            }
            nalog = 1
        }
    };

    // Store the correct answer of a given question
    getCorrectAnswer = function () {
        correctAnswer = randomslovo;
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
            $('.jedan').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSdpEXeFcEbz0QTId1zTAVlqvuqLBR4nce4PQjz3w_U3U60FZA/formResponse');
            r1 = 1

        } else if ($(this).attr('id') == "20") {
            tajming = 20;
            $('.jedan').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSeF-qsOk5UFs8yO8caTRRSBiBQeMKxD7iQRGNs8bLhnygsWWQ/formResponse');
            r1 = 2
        } else if ($(this).attr('id') == "10") {
            tajming = 10;
            $('.jedan').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSfpZUZd2tyJdzr1QK4Mbz5Ko4zkapd9vOTz9bq5y_w-FPivSw/formResponse');
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
        continueBtn.hide();
    });

    /* --- PAGE 2/3 --- */

    // Clicking on an answer:
    answerDiv.on('click', function () {
        // Make the submit button visible
        // Remove pointer from any answer that already has it
        deselectAnswer();
        // Put pointer on clicked answer
        selectAnswer(this);
        // Store current selection as user answer
        getUserAnswer(this);
        // Store current answer div for highlighting purposes
        getSelectedAnswerDivs(this);
    });
    moze = 1
    //$(".zvuk").on("click", function () {
    //  if (!playing) {
    // var element = $(this);
    // var elementID = event.target.id;
    /* if (randomslovo == "č") {
         var oggVar = ("../audio/cc.mp3");
     } else if (randomslovo == "ć") {
         var oggVar = ("../audio/ccc.mp3");
     } else if (randomslovo == "š") {
         var oggVar = ("../audio/ss.mp3");
     } else if (randomslovo == "đ") {
         var oggVar = ("../audio/dd.mp3");
     } else if (randomslovo == "ž") {
         var oggVar = ("../audio/zz.mp3");
     } else { var oggVar = ("../audio/" + randomslovo + ".mp3"); }

     var audioElement = $('#izgovor')[0];
     audioElement.setAttribute('src', oggVar);
     audioElement.play();*/

    //}
    //})
    $('body').on("keyup", function () {

        if ($('.oznaceno').length > 0) {
            submitBtn.click()
        }
    })


    var playing = false;

    $('#izgovor').on('playing', function () {
        playing = true;
        $('.zvuk').attr("src", "slike/n_zvuk.png")
    });
    $('#izgovor').on('ended', function () {
        playing = false;
        $('.zvuk').attr("src", "slike/zvuk.png")
    });



    function odgovor() {
        moze = 0;
        nalog = 0;
        vrijeme = parseInt($("#pageBeginCountdownText").text())
        brojka = 0
        netocno = 0
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
        if (document.getElementById("pageBeginCountdown").value == "0" && iskljuci_v == 0) {
            pogreske.push(rijeci.join(""))
            $(".rijec").find("span").removeClass("oznaceno")
            $(".tocno").addClass('crta');
            bodovi -= 10;
            $("#zvono")[0].play();
            swal({
                title: "Vrijeme je isteklo.",
                html: "<p class='dodatak'><strong>Točan je odgovor: <span class='nastavak'>" + $(".rijec").html() + "</span><img src='slike/vrijeme.png'class='slikica2'/>",
                showCloseButton: true,
                confirmButtonText: ' dalje',
                backdrop: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
            })
            $(".swal2-confirm").unbind("click").click(function () {
                $(".nastavak").empty()
                clearInterval(countdownTimer)
                nastavi()
            })
            $(".swal2-close").unbind("click").click(function () {
                $(".nastavak").empty()
                clearInterval(countdownTimer)
                nastavi()
            })
        } else {
            //nastavi rad
            var testimonialElements = $(".oznaceno");
            for (var i = 0; i < testimonialElements.length; i++) {
                var element = testimonialElements.eq(i);
                //do something with element

                if (element.hasClass("tocno")) {
                    brojka++
                } else {
                    netocno = 1;
                    break
                }
            }
            if (netocno != 1 && $(".tocno").length == brojka) {
                if (iskljuci_v == 1) { vrijeme = 0; }
                correctAnswersCounter++;
                bodovi += 10;
                bodovi += vrijeme
                broj = 10 + vrijeme
                $("#tocno")[0].play();
                swal({
                    title: "<h2>Točno!<h2>",
                    html: "<p  class='dodatak'><span class='povrt'>+ <span class='tocno_bod'>" + broj + "</span></span></p><br><img src='slike/tocno.png' class='slikica2'/>",
                    showCloseButton: true,
                    confirmButtonText: ' dalje',
                    backdrop: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                });

                $(".swal2-confirm").unbind("click").click(function () {
                    $(".nastavak").empty()
                    clearInterval(countdownTimer)
                    $(".swal2-modal").removeClass("swal-fix")
                    nastavi()
                })
                $(".swal2-close").unbind("click").click(function () {
                    $(".nastavak").empty()
                    clearInterval(countdownTimer)
                    $(".swal2-modal").removeClass("swal-fix")
                    nastavi()
                })
                continueBtn.show(300);
            } else {
                if (netocno == 1) {
                    pogreske.push(rijeci.join(""))
                    bodovi -= 10;
                    $("#pogresno")[0].play();
                    $(".rijec").find("span").removeClass("oznaceno")
                    $(".tocno").addClass('crta');
                    swal({
                        title: "<h2>Netočno!</h2>",
                        html: "<p class='dodatak'><strong>Točan je odgovor: <span class='nastavak'>" + $(".rijec").html() + "</span></strong><br></p><br><img src='slike/krivo.png' class='slikica2'/>",
                        showCloseButton: true,
                        confirmButtonText: ' dalje',
                        backdrop: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    });

                    $(".swal2-confirm").unbind("click").click(function () {
                        $(".nastavak").empty()
                        clearInterval(countdownTimer)
                        nastavi()
                    })
                    $(".swal2-close").unbind("click").click(function () {
                        $(".nastavak").empty()
                        clearInterval(countdownTimer)
                        nastavi()
                    })
                    netocno = 0
                    brojka = 0
                } else {
                    $(".rijec").find("span").removeClass("oznaceno")
                    $("#pogresno")[0].play();
                    $(".tocno").addClass('crta');
                    swal({
                        title: "<h2>Niste označili sve odgovore!</h2>",
                        html: "<p class='dodatak'><strong>Točan je odgovor: <span class='nastavak'>" + $(".rijec").html() + "</span></strong><br></p><br><img src='slike/krivo.png' class='slikica2'/>",
                        showCloseButton: true,
                        confirmButtonText: ' dalje',
                        backdrop: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,

                    });
                    $(".swal2-confirm").unbind("click").click(function () {
                        $(".nastavak").empty()
                        clearInterval(countdownTimer)
                        nastavi()
                    })
                    $(".swal2-close").unbind("click").click(function () {
                        $(".nastavak").empty()
                        clearInterval(countdownTimer)
                        nastavi()
                    })
                    netocno = 0
                    brojka = 0
                }
            }

        } // Clicking on the submit button:
    }

    submitBtn.on('click', function () {
        odgovor();
    });


    function nastavi() {
        index++;
        // Increment question number until there are no more questions, then advance to the next page
        if (questionCounter < pitanja.length - 1) {
            questionCounter++;
        } else {
            questionsPage.hide();
            resultsPage.show(300);
            // Display user score as a percentage
            postotak = Math.floor((correctAnswersCounter / pitanja.length) * 100)
            userScore.text(postotak + " %");
            prikazBodova.text(bodovi);
            $("#60656686").attr("value", bodovi)
            if (postotak >= 90) {
                ocjena = 5
            } else if (postotak >= 80) {
                ocjena = 4
            } else if (postotak >= 70) {
                ocjena = 3
            } else if (postotak >= 60) {
                ocjena = 2
            } else {
                ocjena = 1
            }
            $("#1487903547").attr("value", ocjena)
            if (pogreske.length != 0) {
                $("#pogreske").show()
                $("#491430551").val(pogreske.join("\n"))
                $("#bootstrapFormP").submit();
                $("#bootstrapFormP").remove();
            }
            $("#pogreske").click(function () {
                swal({
                    title: "slogovi koje ste pogriješili u igri:",
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
        continueBtn.hide();
    });

    // Clicking on the spanish button:
    p1 = ['a-be-ce-da', 'a-dre-sa', 'ad-vent', 'a-e-ro-drom', 'a-ko', 'ak-tiv-nost', 'a-kva-rij', 'a-lat', 'al-bum', 'a-li', 'a-na-nas', 'an-đe-o', 'a-pa-rat', 'ar-hi-tekt', 'ar-hi-tek-ti-ca', 'a-u-to', 'a-u-to-bus', 'a-u-to-me-ha-ni-čar', 'a-u-to-me-ha-ni-čar-ka', 'a-u-to-mo-bil', 'a-u-tor', 'a-u-to-ri-ca', 'a-vi-on', 'ba-ca-ti', 'ba-ci-ti', 'ba-dem', 'bad-njak', 'baj-ka', 'Baj-ram', 'ba-ka', 'ba-let', 'ba-lon', 'ba-na-na', 'ban-ka', 'ba-sna', 'ba-zen', 'be-ba', 'be-dro', 'bes-pla-tan', 'be-ton', 'bi-ci-kl', 'bi-će', 'bijes', 'bije-so-vi', 'bik', 'bi-ko-vi', 'bi-ljež-ni-ca', 'bilj-ka', 'bi-skup', 'bje-lo-go-ri-ca', 'blag-dan', 'bla-go-va-o-na', 'bla-go-va-o-ni-ca', 'bla-to', 'bli-tva', 'bli-zak', 'bli-zi-na', 'bod', 'bo-do-vi', 'bod-lji-ka', 'bo-gat', 'bo-ga-taš', 'bo-ga-ta-ši-ca', 'bo-ja', 'bo-ji-ca', 'boks', 'bo-kse-ri-ce', 'bol', 'bo-lo-vi', 'bol', 'bo-li', 'bo-lest', 'bo-le-stan', 'bol-ni-ca', 'bom-bon', 'bor', 'bo-ro-vi', 'bo-ra-vak', 'bor-ba', 'bo-rov-ni-ca', 'bo-si-ljak', 'Bo-žić', 'bo-žić-ni', 'bra-ća', 'bra-da', 'brak', 'bra-ko-vi', 'bra-ni-telj', 'bra-ni-te-lji-ca', 'bra-šno', 'brat', 'bra-tić', 'bra-va', 'br-do', 'bre-skva', 'bre-za', 'bri-ga', 'brijeg', 'bre-go-vi', 'brije-zi', 'brk', 'br-ko-vi', 'br-ci', 'brod', 'bro-do-vi', 'broj', 'bro-je-vi', 'broj-ka', 'bro-ku-la', 'br-šljan', 'br-zi-na', 'br-zo-jav', 'bu-banj', 'bu-breg', 'bu-duć-nost', 'bu-ka', 'bu-kva', 'bun-de-va', 'bu-ra', 'car', 'ca-re-vi', 'ca-ri-ca', 'car-stvo', 'ce-de', 'ce-ler? ', 'cen-tar', 'cen-ti-me-tar', 'ce-sta', 'ci-ga-re-ta', 'ci-gla', 'cije-na', 'cije-plje-nje', 'ci-kla', 'ci-kla-ma', 'cilj', 'ci-lje-vi', 'ci-pe-la', 'cir-kus', 'cje-li-na', 'cje-pi-vo', 'crije-vo', 'cr-kva', 'cr-no-go-ri-ca', 'crp-ka', 'cr-ta', 'cr-tan-ka', 'cr-tež', 'crv', 'cr-vi', 'cu-ra', 'cvije-će', 'cvje-ta-ča', 'cvr-čak', 'cvr-kut', 'čaj', 'ča-je-vi', 'ča-mac', 'ča-ra-pa', 'ča-rob-ni-ca', 'ča-rob-njak', 'čas', 'ča-so-vi', 'ča-so-pis', 'ča-ša', 'ča-va-o', 'če-ka-o-ni-ca', 'če-kić', 'če-lo', 'čem-pres', 'če-stit-ka', 'če-šalj', 'češ-njak', 'če-ti-ri', 'če-tka', 'če-tki-ca', 'če-tr-de-set', 'če-tr-na-est', 'če-tve-ro-krat-nik', 'če-tve-ro-kut', 'če-tvor-ka', 'če-tvr-tak', 'če-tvr-ti-na', 'či-čak', 'či-ne-le', 'či-ni-ti', 'či-stač', 'či-sta-či-ca', 'či-tan-ka', 'či-ta-o-ni-ca', 'či-ta-ti', 'či-zma', 'čo-ko-la-da', 'čo-vjek', 'ču-do', 'će-vap-čić', 'ći-ri-li-ca', 'ćuk', 'ću-ko-vi', 'ćup', 'ću-po-vi', 'dah', 'da-lek', 'da-le-ko-zor', 'dan', 'da-ni', 'dar', 'da-ro-vi', 'das-ka', 'da-to-te-ka', 'da-tum', 'de-blo', 'de-ci-li-tar', 'de-ci-me-tar', 'de-čko', 'de-ka-gram', 'de-set', 'de-se-te-ro-krat-nik', 'de-se-ti-ca', 'de-se-ti-na', 'de-se-tka', 'de-šnjak', 'de-šnja-ki-nja', 'de-ter-džent', 'de-ve-de-set', 'de-vet', 'de-ve-te-ro-krat-nik', 'de-ve-ti-na', 'de-vet-ka', 'de-vet-na-est', 'dije-lje-nje', 'dije-te', 'dik-tat', 'di-nja', 'dio', 'dije-lo-vi', 'di-sci-pli-na', 'disk', 'di-sko-vi', 'div', 'di-vo-vi', 'di-za-li-ca', 'di-za-lo', 'dje-ca', 'dje-čak', 'djed', 'dje-do-vi', 'dje-li-telj', 'dje-lo', 'dje-lje-nik', 'dje-te-li-na', 'dje-tinj-stvo', 'dje-voj-či-ca', 'dje-voj-ka', 'dla-ka', 'dlan', 'dla-no-vi', 'dno', 'dna', 'do-ba', 'do-ba', 'do-bar', 'do-bi-ti', 'do-bi-va-ti', 'do-ći', 'do-da-tak', 'do-dir', 'do-ga-đaj', 'do-ga-đa-ti se', 'do-go-di-ti se', 'do-go-vor', 'dok-tor', 'dok-to-ri-ca', 'do-ku-ment', 'do-la-zak', 'do-la-zi-ti', 'do-li-na', 'dom', 'do-mo-vi', 'do-ma-ći-ca', 'do-ma-ćin', 'do-mo-vi-na', 'do-mov-ni-ca', 'do-po-dne', 'do-ru-čak', 'do-sa-da', 'do-ša-šće', 'do-vo-ljan', 'do-živ-ljaj', 'dra-ma', 'dru-štvo', 'dr-ve-će', 'dr-vo', 'dr-ža-va', 'du-bi-na', 'du-ćan', 'du-da', 'du-ga', 'du-gme', 'du-han', 'du-lji-na', 'du-nja', 'du-ša', 'du-ži-na', 'duž-nost', 'dva-de-set', 'dva-na-est', 'dvoj-ka', 'dvo-krat-nik', 'dvo-rac', 'dvo-ra-na', 'dvo-ri-šte', 'dvo-sjed', 'dvo-to-čka', 'dža-mi-ja', 'džem', 'dže-mo-vi', 'džem-per', 'džep', 'dže-po-vi', 'dže-pa-rac', 'džun-gla', 'đak', 'đa-ci', 'đa-va-o', 'đur-đi-ca', 'e-a-dre-sa', 'e-ki-pa', 'e-ko-lo-gi-ja', 'e-kran', 'e-mi-si-ja', 'en-ci-klo-pe-di-ja', 'e-ner-gi-ja', 'e-pi-zo-da', 'e-u-ro', 'fak-tor', 'fa-kul-tet', 'fa-u-na', 'fa-zan', 'film', 'fil-mo-vi', 'fla-u-ta', 'flo-ra', 'fo-to-a-pa-rat', 'fo-to-gra-fi-ja', 'fri-zu-ra', 'ga-će', 'ga-leb', 'ga-ra-ža', 'ge-o-me-tri-ja', 'gim-na-sti-čar', 'gim-na-sti-čar-ka', 'gim-na-sti-ka', 'gi-ta-ra', 'gla-ča-lo', 'glad', 'gla-gol', 'gla-go-lji-ca', 'glas', 'gla-so-vi', 'gla-so-vir', 'gla-va', 'gla-vo-bo-lja', 'glaz-ba', 'glaz-ba-lo', 'gle-da-li-šte', 'gle-da-telj', 'gle-da-te-lji-ca', 'gle-da-ti', 'glu-mac', 'glu-mi-ca', 'glu-post', 'glji-va', 'gmaz', 'gma-zo-vi', 'gnije-zdo', 'go-di-na', 'gol', 'go-lo-vi', 'go-lub', 'go-molj', 'go-ra', 'go-ri-vo', 'Go-spa', 'go-spo-dar', 'go-spo-da-ri-ca', 'go-spo-din', 'go-spo-đa', 'go-spo-đi-ca? ', 'gost', 'go-šća', 'go-ve-do', 'go-vor', 'go-vo-ri-ti', 'go-zba', 'grab-lje', 'grad', 'gra-do-vi', 'gra-di-li-šte? ', 'gra-di-vo', 'gra-đe-vi-na', 'grah', 'gram', 'gra-mi', 'gra-ma-ti-ka', 'gra-na', 'grb', 'gr-bo-vi', 'grijeh', 'grije-si', 'gr-lo', 'grm', 'gr-mlja-vi-na', 'grob', 'gro-bo-vi', 'gro-blje', 'grom', 'gro-mo-vi', 'grozd', 'grož-đe', 'gru-pa', 'gu-ma', 'gu-mi-ca', 'gu-ra-ti se', 'gu-sje-ni-ca', 'gu-ska', 'gu-šter', 'gu-žva', 'ha-lji-na', 'ham-bur-ger', 'Ha-nu-ka', 'har-mo-ni-ka', 'hek-to-li-tar', 'he-li-kop-ter', 'him-na', 'hla-če', 'hlad-njak', 'ho-bi', 'ho-bot-ni-ca', 'ho-da-ti', 'hod-nik', 'ho-dža', 'ho-tel', 'hra-na', 'hrast', 'hren', 'hrid', 'hri-di', 'hr-pa', 'hva-la', 'i-ći', 'i-gla', 'i-gra', 'i-grač', 'i-gra-či-ca', 'i-gra-čka', 'i-gra-li-šte', 'i-gra-o-ni-ca', 'i-gra-ti', 'i-ko-na', 'i-ma-ti', 'i-me', 'i-men-dan', 'i-me-ni-ca', 'i-me-nik', 'in-for-ma-ti-ka', 'i-no-zem-stvo', 'in-ter-net', 'in-va-lid', 'in-že-njer', 'in-že-njer-ka', 'i-njek-ci-ja', 'is-kra', 'i-spe-ći', 'i-spit', 'i-spra-vak', 'i-spri-ča-ti', 'i-spri-ča-va-ti', 'i-sprič-ni-ca', 'is-pri-ka', 'i-sti-na', 'is-tok', 'i-van-či-ca', 'i-za-bra-ti', 'i-za-ći', 'iz-bor', 'i-zbor-nik', 'i-zda-ji-ca', 'iz-go-vor', 'i-zi-ći', 'iz-laz', 'i-zla-zi-ti', 'iz-let', 'iz-lož-ba', 'i-zo-sta-nak', 'iz-re-ka', 'iz-vor', 'ja-blan', 'ja-bu-ka', 'ja-go-da', 'ja-je', 'jak-na', 'ja-nje', 'ja-pan-ka', 'ja-rac', 'ja-sli-ce', 'ja-stuk', 'ja-to', 'je-dan', 'je-da-na-est', 'je-di-ni-ca', 'je-dri-li-ca', 'je-la', 'je-len', 'je-lo', 'je-sen', 'je-sti', 'je-ze-ro', 'je-zgra', 'je-zik', 'jež', 'je-že-vi', 'jo-gurt', 'jor-go-van', 'jug', 'ju-go', 'ju-go-i-stok', 'ju-go-za-pad', 'ju-ha', 'ju-nak', 'ju-na-ki-nja', 'ju-tro', 'ka-ba-ni-ca', 'ka-ci-ga', 'ka-len-dar', 'ka-men', 'ka-me-nje', 'ka-me-ra', 'ka-mi-li-ca', 'ka-mi-on', 'kan-di-dat', 'kan-di-da-tki-nja', 'kan-ta', 'kap', 'ka-pi', 'ka-pa', 'ka-pe-tan', 'ka-put', 'ka-ri-ka', 'kar-ne-val', 'kar-ta', 'ka-sni-ti', 'kat', 'ka-to-vi', 'ka-te-dra-la', 'ka-to-lik', 'ka-tol-ki-nja', 'ka-va', 'ka-vez', 'ka-za-li-šte', 'ka-zalj-ka', 'ka-za-ti', 'ka-zna', 'ka-ži-prst', 'kći', 'kće-ri', 'keks', 'ke-ksi', 'kelj', 'ke-sten', 'ki-ki-ri-ki', 'ki-lo-gram', 'ki-lo-me-tar', 'ki-no', 'kip', 'ki-po-vi', 'ki-par', 'ki-pa-ri-ca', 'kist', 'ki-sto-vi', 'ki-ša', 'ki-šo-bran', 'ki-vi', 'kla-un', 'kla-vir', 'klije-šta', 'kli-ma', 'kli-za-li-šte', 'kli-zalj-ka', 'klub', 'klu-bo-vi', 'klu-pa', 'ključ', 'klju-če-vi', 'kljun', 'klju-no-vi', 'knji-ga', 'knji-ža-ra', 'knji-žev-ni-ca', 'knji-žev-nik', 'knji-žev-nost', 'knjiž-ni-ca', 'knji-žni-čar', 'knji-žni-čar-ka', 'ko-ba-si-ca', 'ko-bi-la', 'koc-ka', 'ko-koš', 'ko-la', 'ko-lač', 'ko-laž', 'ko-li-ca', 'ko-lič-nik', 'ko-lijev-ka', 'kol-nik', 'ko-lo-dvor', 'ko-lo-voz', 'ko-lje-no', 'ko-mad', 'ko-nac', 'ko-nac', 'kon-cert', 'ko-no-bar', 'ko-no-ba-ri-ca', 'kon-ti-nent', 'konj', 'ko-nji', 'kop-no', 'ko-ra', 'ko-rak', 'ko-rijen', 'ko-ri-sti-ti', 'ko-ri-to', 'ko-riz-ma', 'kor-mi-lo', 'kor-nja-ča', 'ko-sa', 'ko-si-na', 'kost', 'ko-sti', 'ko-stim', 'ko-stur', 'koš', 'ko-še-vi', 'ko-ša-ra', 'ko-šar-ka', 'ko-šar-kaš', 'ko-šar-ka-ši-ca', 'ko-šta-ti', 'ko-šu-lja', 'ko-šu-ta', 'ko-tač', 'ko-tu-ralj-ka? ', 'kov-čeg', 'ko-vi-na', 'ko-za', 'koz-lić', 'ko-ža', 'kra-đa', 'kraj', 'kra-je-vi', 'kralj', 'kra-lje-vi', 'kra-ljev-stvo', 'kra-lje-žni-ca', 'kra-lji-ca', 'kra-sta-vac', 'kra-ti-ca', 'kra-va', 'kra-va-ta', 'kre-da', 'kre-vet', 'kri-lo', 'križ', 'kri-že-vi', 'kri-žalj-ka', 'kr-ma-ča', 'kro-jač', 'kro-ja-či-ca', 'kro-ko-dil', 'kro-šnja', 'krov', 'kro-vo-vi', 'kr-pelj', 'kr-šća-nin', 'kr-šćan-ka', 'krug', 'kru-go-vi', 'kruh', 'kru-ho-vi', 'krum-pir', 'kru-na', 'kru-ška', 'kruž-ni-ca', 'krv', 'kr-vi', 'kr-zno', 'ksi-lo-fon', 'ku-ća', 'ku-gla', 'ku-har', 'ku-ha-ri-ca', 'ku-ha-ti', 'ku-hi-nja', 'ku-kac', 'ku-ku-ruz', 'kul-tu-ra', 'kum', 'ku-mo-vi', 'ku-ma', 'ku-na', 'ku-pac', 'ku-pa-o-ni-ca', 'ku-pa-ti', 'ku-pi-na', 'ku-pi-ti', 'ku-po-va-ti', 'ku-pus', 'kut', 'ku-to-vi', 'kva-dar', 'kva-drat', 'kvar', 'kva-ro-vi', 'kviz', 'kvi-zo-vi', 'lak', 'la-ko-vi', 'la-kat', 'lam-pa', 'la-nac', 'la-ne', 'la-sta-vi-ca', 'la-ti-ca', 'la-ti-ni-ca', 'lav', 'la-vo-vi', 'la-van-da', 'la-vež', 'la-vi-na', 'laž', 'la-ži', 'le-ća', 'led', 'le-de-njak', 'le-đa', 'lek-ci-ja', 'lek-ti-ra', 'le-pe-za', 'lep-tir', 'let', 'le-to-vi', 'let-je-li-ca', 'le-tje-ti', 'le-žalj-ka', 'li-ce', 'lift', 'lif-to-vi', 'lig-nja', 'liječ-ni-ca', 'liječ-nik', 'lijek', 'lije-ko-vi', 'lijes', 'lik', 'li-ko-vi', 'li-men-ka', 'li-mun', 'li-mu-na-da', 'li-pa', 'li-panj', 'li-si-ca', 'list', 'li-sto-vi', 'li-sto-pad', 'li-šće', 'li-tra', 'li-va-da', 'li-za-li-ca', 'lo-ko-mo-ti-va', 'lo-nac', 'lo-pa-ta', 'lo-poč', 'lo-pov', 'lop-ta', 'lo-vac', 'lov-ki-nja', 'lu-be-ni-ca', 'luk', 'lu-ko-vi', 'luk', 'lu-ka', 'lu-ko-vi-ca', 'lu-na-park', 'lu-ster', 'lu-tak', 'lu-tka', 'lje-kar-ni-ca', 'lje-kar-nik', 'lje-pi-lo', 'lje-po-ta', 'lje-stve', 'lješ-njak', 'lje-to', 'lje-to-va-ti', 'lje-vak', 'lje-va-ki-nja', 'lji-ljan', 'lju-bav', 'lju-bi-ca', 'lju-bi-mac', 'lju-bi-mi-ca', 'lju-bi-ti', 'lju-lja-čka', 'mač', 'ma-če-vi', 'ma-čak', 'ma-čić', 'ma-čka', 'ma-će-ha', 'ma-ću-hi-ca', 'ma-đi-o-ni-čar', 'ma-đi-o-ni-čar-ka', 'ma-es-tral', 'ma-ga-rac', 'ma-gla', 'mag-net', 'ma-gno-li-ja', 'ma-ho-vi-na', 'ma-hu-na', 'ma-ji-ca', 'maj-ka', 'maj-mun', 'ma-li-na', 'ma-ma', 'ma-na', 'man-da-ri-na', 'ma-pa', 'ma-ra-ma', 'ma-ra-mi-ca', 'ma-re-li-ca', 'mar-ka', 'ma-ska', 'ma-slac', 'ma-sla-čak', 'ma-sli-na', 'mast', 'ma-sti', 'ma-šta', 'ma-te-ma-ti-čar', 'ma-te-ma-ti-čar-ka', 'ma-te-ma-ti-ka', 'med', 'me-de-njak', 'med-vjed', 'me-ha-ni-čar', 'me-ha-ni-čar-ka', 'me-lo-di-ja', 'me-mo-ri-ja', 'me-sar', 'me-sa-ri-ca', 'me-so', 'me-tal', 'me-tar', 'me-tla', 'mije-nja-ti', 'mije-šta-ti', 'mi-kro-fon', 'mi-kro-skop', 'mi-li-jun', 'mi-li-me-tar', 'mi-ne-ral', 'mi-nus', 'mi-nu-ta', 'mir', 'mi-sa-o', 'mi-sli-ti', 'miš', 'mi-še-vi', 'mi-šić', 'mi-šlje-nje', 'mit', 'mi-to-vi', 'mje-sec', 'mje-se-či-na', 'mje-sto', 'mla-dić', 'mla-dost', 'mla-dun-če', 'mlije-ko', 'mno-go-kut', 'mno-že-nik', 'mno-že-nje', 'mno-ži-telj', 'mo-bi-tel', 'mo-ći', 'mo-da', 'mol-ba', 'mo-li-ti', 'mo-li-tva', 'mom-čad', 'mo-ra-ti', 'mo-re', 'mor-nar', 'mor-na-ri-ca', 'most', 'mo-sto-vi', 'mo-to-ci-kl', 'mo-tor', 'mo-zak', 'mrav', 'mra-vi', 'mre-ža', 'mr-kva', 'mr-žnja', 'mu-ha', 'mu-nja', 'mu-sli-man', 'mu-sli-man-ka', 'mu-ška-rac', 'mu-zej', 'muž', 'mu-že-vi', 'muž-jak', 'na-čin', 'na-ći', 'na-da', 'na-da', 'na-da-ti se', 'na-di-mak', 'na-dne-vak', 'na-gra-da', 'na-la-zi-ti', 'na-mir-ni-ca', 'na-mje-štaj', 'na-o-ča-le', 'na-pi-sa-ti', 'na-pra-va', 'na-ran-ča', 'na-red-ba', 'na-rod', 'na-ru-či-ti', 'na-ru-či-va-ti', 'na-rudž-ba', 'na-se-lje', 'na-si-lje', 'na-slo-njač', 'na-slov', 'na-sta-va', 'na-sta-vak', 'na-stav-ni-ca', 'na-stav-nik', 'na-ti-ka-ča', 'na-tje-ca-telj', 'na-tje-ca-te-lji-ca', 'na-tje-čaj', 'na-u-či-ti', 'na-vi-ka', 'na-zi-va-ti', 'na-zva-ti', 'ne-bo', 'ne-bo-der', 'ne-ćak', 'ne-ća-ki-nja', 'ne-dje-lja', 'ne-do-sta-ja-ti', 'ne-do-vo-ljan', 'ne-ma-ti', 'ne-pu-šač', 'ne-pu-ša-či-ca', 'ne-sre-ća', 'ne-vo-lja', 'ne-vrije-me', 'ne-zgo-da', 'niz', 'ni-oz-vi', 'noć', 'no-ći', 'no-ga', 'no-go-met', 'no-go-me-taš', 'no-go-me-ta-ši-ca', 'noj', 'no-je-vi', 'no-kat', 'nos', 'no-so-vi', 'no-si-ti', 'no-šnja', 'no-ta', 'no-vac', 'nov-ča-ni-ca', 'nov-ča-nik', 'no-vi-nar', 'no-vi-nar-ka', 'no-vi-ne', 'no-vo-ro-đen-če', 'nož', 'no-že-vi', 'nu-la', 'nji-halj-ka', 'nji-va', 'njuh', 'nju-ška', 'o-ba-la', 'o-ba-vijest', 'o-bi-la-zak', 'o-bi-telj', 'o-bja-sni-ti', 'o-bja-šnja-va-ti', 'o-bjed', 'o-bla-či-ti', 'o-blak', 'ob-lik', 'o-bo-ri-na', 'o-bra-zi', 'ob-rok', 'o-brt', 'o-br-va', 'o-bu-ća', 'o-bu-ći', 'o-bu-jam', 'ob-ve-za', 'o-cat', 'o-ce-an', 'o-cje-na', 'o-čuh', 'od-boj-ka', 'ob-boj-kaš', 'od-boj-ka-ši-ca', 'od-goj', 'od-go-ji-telj', 'od-go-ji-te-lji-ca', 'od-go-vor', 'o-dije-lo', 'o-dje-ća', 'o-dla-zak', 'o-dla-zi-ti', 'od-li-čan', 'o-dlu-či-ti', 'o-dlu-či-va-ti', 'od-lu-ka', 'od-ma-ra-li-šte', 'od-ma-ra-ti', 'od-mor', 'od-mo-ri-ti', 'od-re-zak', 'o-du-zi-ma-nje', 'o-glas', 'o-gle-da-lo', 'o-grjev', 'o-gr-tač', 'o-klop', 'o-ko', 'o-ko-liš', 'o-kus', 'o-kvir', 'o-lov-ka', 'o-lu-ja', 'o-mjer', 'o-mot', 'o-pas-nost', 'o-pe-ka', 'o-pe-ra-ci-ja', 'o-pip', 'o-pis', 'o-pi-sa-ti', 'o-pi-si-va-ti', 'o-po-me-na', 'o-pre-ma', '? ', 'o-rah', 'o-ra-ni-ca', 'o-ra-o', 'or-gan', 'or-ga-ni-zam', 'or-gu-lje', 'or-ke-star', 'or-mar', 'o-ru-đe', 'o-ruž-je', 'os', 'o-si', 'o-sa', 'o-sam', 'o-sam-de-set', 'o-sam-na-est? ', 'o-sip', 'o-sje-ćaj', 'o-sje-ća-ti', 'o-sjet', 'o-sje-ti-lo', 'o-sme-ro-krat-nik', 'o-smi-ca', 'o-smijeh', 'o-smi-na', 'o-sno-va', 'o-so-ba', 'o-spi-ce', 'o-sta-tak', 'o-tac', 'o-ti-ći', 'ot-klon', 'o-tok', 'ot-pad', 'o-trov', 'o-tva-ra-ti', 'o-tvo-ri-ti', 'o-van', 'ov-ca', 'o-vi-si-ti', 'o-zlje-da', 'o-zna-ka', 'o-žu-jak', 'pa-ci-jent', 'pa-ci-jen-ti-ca', 'pa-da-ti', 'pa-do-bran', 'pa-hu-lja', 'pa-ka-o', 'pa-lac', 'pa-la-čin-ka', 'pal-ma', 'pam-će-nje', 'pa-met', 'pa-muk', 'pan-dža', 'pa-pa', 'pa-par', 'pa-pi-ga', 'pa-pir', 'pa-pri-ka', 'pa-pu-ča', 'par', 'pa-ro-vi', 'pa-ra', 'park', 'par-ko-vi', 'par-ki-ra-li-šte', 'par-ki-ra-ti', 'pas', 'psi', 'pas', 'pa-so-vi', 'pa-ste-la', 'pa-sti', 'pa-sti', 'pas-tr-va', 'paš-njak', 'pa-tak', 'pa-tka', 'pa-tu-ljak', 'pa-u-či-na', 'pa-uk', 'pa-zi-ti', 'pče-la', 'pe-ci-vo', 'peć', 'pe-ći', 'pe-ći', 'pe-da-gog', 'pe-da-go-gi-nja', 'pe-dalj', 'pe-de-set', 'pe-kar', 'pe-ka-ra', 'pe-ka-ri-ca', 'pe-kar-ni-ca', 'pe-le-na', 'pe-pe-o', 'pe-rad', 'pe-ra-ja', 'pe-ri-li-ca', 'pe-ro', 'pe-ron', 'per-šin', 'pe-ta', 'pe-tak', 'pe-te-ro-krat-nik', 'pe-ti-ca', 'pe-ti-na', 'pet-na-est', 'pi-dža-ma', 'pije-sak', 'pije-ta-o', 'pi-ksel', 'pi-la', 'pi-le', 'pi-lot', 'pin-gvin', 'pi-ra-mi-da', 'pi-sac', 'pi-sač', 'pi-sa-ni-ca', 'pi-san-ka', 'pi-sa-ti', 'pi-smo', 'pi-ta-li-ca', 'pi-ta-nje', 'pi-ta-ti', 'pi-ti', 'pi-vo', 'pi-zza', 'pi-zze-ri-a', 'pje-sma', 'pje-sma-ri-ca', 'pje-snik', 'pje-sni-ki-nja', 'pje-šak', 'pje-ša-ki-nja', 'pje-šča-nik', 'pje-vač', 'pje-va-či-ca', 'pje-va-ti', 'plač', 'pla-če-vi', 'pla-ća', 'pla-ća-ti', 'plah-ta', 'pla-kat', 'pla-men', 'plan', 'pla-no-vi', 'pla-net', 'pla-ni-na', 'pla-ni-nar', 'pla-ni-na-ri-ti', 'pla-ni-nar-ka', 'pla-ste-lin', 'pla-ti-ti', 'plat-no', 'pla-ža', 'ples', 'ple-so-vi', 'ple-sač', 'ple-sa-či-ca', 'ple-sa-ti', 'ple-te-ni-ca', 'plin', 'pli-no-vi', 'pli-vač', 'pli-va-či-ca', 'pli-va-ti', 'plo-ča', 'ploč-nik', 'plod', 'plo-do-vi', 'plo-ha', 'plo-vi-lo', 'plu-ća', 'plus', 'plu-se-vi', 'plju-sak', 'po-bje-da', 'po-če-tak', 'po-čet-ni-ca', 'pod', 'po-do-vi', 'po-da-tak', 'pod-mor-ni-ca', 'po-dne', 'pod-rije-tlo', 'po-druč-je', 'pod-rum', ',', 'po-glav-lje', 'po-gled', 'po-go-dak', 'po-gon', 'po-greb', 'po-gre-ška', 'po-hva-la', 'po-jas', 'po-je-sti', 'po-ka-za-ti', 'po-ka-zi-va-ti', 'po-kla-de', 'po-klon', 'po-kret', 'po-kri-vač', 'pol', 'po-lo-vi', 'po-la-zak', 'po-li-ca', 'po-li-ca-jac', 'po-li-caj-ka', 'po-li-ci-ja', 'po-li-ti-čar', 'po-li-ti-čar-ka', 'po-li-ti-ka', 'po-lo-vi-ca', 'po-lo-vi-na', 'po-lu-brat', 'po-lu-go-di-šte', 'po-lu-o-tok', 'po-lu-se-stra', 'po-ljo-pri-vre-da', 'po-ljo-pri-vre-dni-ca', 'po-ljo-pri-vre-dnik', 'po-lju-bac', 'po-ma-ga-lo', 'po-ma-ga-ti', 'po-moć', 'po-mo-ći', 'po-nav-lja-ti', 'po-ne-dje-ljak', 'po-noć', 'po-nos', 'po-no-vi-ti', 'po-nu-di-ti', 'pop', 'po-po-vi', 'po-pis', 'po-pi-ti', 'po-po-dne', 'po-raz', 'po-ri-luk', 'po-ro-đaj', 'por-tret', 'po-ru-ka', 'po-sa-da', 'po-sa-o', 'po-sje-ći-va-ti', 'po-sjet', 'po-sje-ti-ti', 'pos-lije-po-dne', 'po-sta-ja', 'po-ste-lji-na', 'po-ster', 'po-stu-pak', 'po-su-da', 'po-su-đe', 'po-šilj-ka', 'po-šta', 'po-štar', 'po-šta-ri-ca', 'pot-ko-šu-lja', 'po-tok', 'pot-pe-ti-ca', 'pot-pis', 'pot-pi-sa-ti', 'pot-pi-si-va-ti', 'po-tre-ba', 'po-ve-ća-lo', 'po-vez-ni-ca', 'po-vijest', 'po-vje-re-nje', 'po-vra-tak', 'po-vr-će', 'po-vr-ši-na', 'po-zdrav', 'po-zi-tiv', 'po-ziv-ni-ca', 'po-zna-ni-ca', 'po-zna-nik', 'po-žar', 'pra-ba-ka', 'pra-djed', 'prah', 'pra-sak', 'pra-se', 'pra-šak', 'pra-ši-na', 'pra-šu-ma', 'pra-ti', 'pra-vac', 'prav-da', 'pra-vi-lo', 'pra-vo', 'pra-vo-kut-nik', 'pra-vo-pis', 'pra-vo-sla-vac', 'pra-vo-slav-ka', 'pra-znik', 'pre-ča', 'pre-da-va-nje', 'pred-met', 'pred-sje-dni-ca', 'pred-sje-dnik', 'pred-so-blje', 'pred-sta-va', 'pre-gled', 'pre-gled-nik', 'pre-hla-da', 'pre-hra-na', 'pre-ko-su-tra', 'pre-pre-ka', 'pre-zi-me', 'pri-bor', 'pri-broj-nik', 'pri-ča', 'pri-čest', 'pri-ja-telj', 'pri-ja-te-lji-ca', 'pri-je', 'prije-laz', 'prije-nos', 'pri-je-po-dne', 'prije-voz', 'pri-li-ka', 'pri-mjer', 'pri-mor-je', 'pri-po-vije-tka', 'pri-pre-ma', 'pri-red-ba', 'pri-ro-da', 'pri-zem-lje', 'pri-zna-nje', 'pr-kos', 'pro-blem', 'pro-či-ta-ti', 'pro-da-ti', 'pro-da-vač', 'pro-da-va-či-ca', 'pro-da-va-o-ni-ca', 'pro-da-va-ti', 'pro-fe-sor', 'pro-fe-so-ri-ca', 'pro-gno-za', 'pro-gram', 'pro-iz-vod', 'pro-laz', 'pro-la-zni-ca', 'pro-la-znik', 'pro-lje-će', 'pro-met', 'pro-met-ni-ca', 'pro-met-ni-ca', 'pro-met-nik', 'pro-mje-na', 'pro-puh', 'pro-si-nac', 'pro-sla-va', 'pro-stor', 'pro-sto-ri-ja', 'pro-šlost', 'pro-tiv-ni-ca', 'pro-tiv-nik', 'pro-zor', 'pr-sa', 'prst', 'pr-sti', 'pr-sten', 'pr-ste-njak', 'pr-šut', 'prt-lja-ga', 'pru-ga', 'prut', 'pru-to-vi', 'pr-vak', 'pr-va-ki-nja', 'pr-vaš', 'pr-va-ši-ca', 'psi-ho-log', 'psi-ho-lo-gi-nja', 'pše-ni-ca', 'pti-ca', 'pu-bli-ka', 'pu-po-ljak', 'pu-ra', 'pu-ran', 'pu-sti-nja', 'pu-šač', 'pu-ša-či-ca', 'pu-ši-ti', 'put', 'pu-to-vi', 'put-ni-ca', 'put-nik', 'pu-to-va-ti', 'pu-tov-ni-ca', 'puž', 'pu-že-vi', 'ra-bin', 'ra-čun', 'ra-ču-na-lo', 'rad', 'ra-do-vi', 'ra-di-o', 'ra-di-ti', 'ra-dni-ca', 'ra-dnik', 'ra-dost', 'raj', 'raj-či-ca', 'rak', 'ra-ko-vi', 'ra-ke-ta', 'ra-ma-zan', 'ra-me', 'ra-na? ', 'ra-nje-ni-ca', 'ra-nje-nik', 'ras-križ-je', 'ra-spo-red', 'ra-sta-nak', 'rat', 'ra-to-vi', 'rav-na-lo', 'rav-na-telj', 'rav-na-te-lji-ca', 'raz-dob-lje', 'raz-gled-ni-ca', 'ra-zgo-va-ra-ti', 'raz-go-vor', 'raz-li-ka', 'ra-zli-ko-va-ti', 'raz-log', 'ra-zmi-sli-ti', 'ra-zmi-šlja-ti', 'raz-red', 'ra-zu-mje-ti', 'raž-njić', 're-cept', 're-ći', 'red', 're-do-vi', 're-dak', 're-do-slijed', 'rep', 're-po-vi', 're-pa', 're-pre-zen-ta-ci-ja', 're-sto-ran', 're-zul-tat', 'ri-ba', 'ri-bar', 'ri-ba-ri-ca', 'ri-bar-ni-ca', 'rib-njak', 'ri-bo-lov', 'riječ', 'rije-či', 'rije-ka', 'ri-ma', 'ri-tam', 'ri-ža', 'rječ-nik', 'rje-še-nje', 'ro-bot', 'rod', 'ro-do-vi', 'ro-da', 'rod-bi-na', 'ro-di-telj', 'ro-đak', 'ro-đa-ki-nja', 'ro-đen-dan', 'ro-đe-nje', 'rog', 'ro-go-vi', 'ro-la', 'ro-la-nje', 'ro-man', 'ro-mo-bil', 'ro-ni-lac', 'ro-ni-te-lji-ca', 'ro-ni-ti', 'ro-sa', 'ro-štilj', 'ru-bac', 'rub-lje', 'ru-čak', 'ru-ča-ti', 'ru-če', 'ruč-nik', 'rud-nik', 'ru-jan', 'ru-ka', 'ru-kav', 'ru-ka-vi-ca', 'ru-ko-met', 'ru-ko-me-taš', 'ru-ko-me-ta-ši-ca', 'ru-ko-pis', 'ru-pa', 'rup-čić', 'ru-ža', 'ruž-ma-rin', 'sa-dr-žaj', 'sa-ko', 'sa-la-ma', 'sa-la-ta', 'sa-mo-glas-nik', 'san', 'sno-vi', 'san-da-la', 'san-duk', 'sa-nja-ti', 'sanj-ke', 'sa-o-ni-ce', 'sa-pun', 'sa-sta-nak', 'sa-sta-vak', 'sat', 'sa-to-vi', 'sa-vi-ja-ča', 'sa-vjet', 'se-dam', 'se-dam-de-set', 'se-dam-na-est', 'sed-me-ro-krat-nik', 'se-dmi-ca', 'sed-mi-na', 'se-kun-da', 'se-li-ti', 'se-lo', 'se-ljak', 'se-lja-ki-nja', 'se-ma-for', 'sen-dvič', 'se-stra', 'se-stri-čna', 'si-dro', 'sije-čanj', 'sin', 'si-no-vi', 'si-na-go-ga', 'sir', 'si-re-vi', 'si-re-na', 'si-ro-mah', 'si-ro-ma-hi-nja', 'si-ro-maš-tvo', 'si-sa-vac', 'si-to', 'sje-ci-šte', 'sje-da-lo', 'sje-da-ti', 'sje-di-ti', 'sje-ki-ra', 'sje-me', 'sje-men-ka', 'sje-na', 'sje-sti', 'sje-ver', 'sje-ve-ro-i-stok', 'sje-ve-ro-za-pad', 'ska-ka-vac', 'ski-ja', 'ski-jaš', 'ski-ja-ši-ca', 'skla-da-telj', 'skla-da-te-lji-ca', 'sklad-ba', 'skok', 'sko-ko-vi', 'skup', 'sku-po-vi', 'sku-pi-na', 'sla-do-led', 'sla-ma', 'slam-ka', 'slap', 'sla-po-vi', 'sla-sti-čar-ni-ca', 'sla-ti', 'sla-va', 'sla-vi-na', 'slav-lje', 'sla-vuj', 'sli-ka', 'sli-kar', 'sli-ka-ri-ca', 'sli-ka-ti', 'sli-kov-ni-ca', 'slo-bo-da', 'slog', 'slo-go-vi', 'slon', 'slo-no-vi', 'slo-vo', 'slu-čaj', 'slu-čaj-nost', 'slu-ga', 'sluh', 'slu-ša-ti', 'sluš-ki-nja', 'sme-će', 'smi-ja-ti se', 'smijeh', 'smje-ho-vi', 'smije-šak', 'smjer', 'smje-ro-vi', 'smje-ti', 'smog', 'smo-kva', 'smre-ka', 'smrt', 'smr-ti', 'sna-ga', 'snijeg', 'snje-go-vi', 'snje-go-vić', 'so-ba', 'sok', 'so-ko-vi', 'so-kol', 'sol', 'som', 'so-mo-vi', 'so-va', 'spa-va-ći-ca', 'spi-sa-te-lji-ca', 'spoj-ni-ca', 'spol', 'spo-lo-vi', 'spo-lo-vi-lo', 'spo-me-nik', 'sport', 'spor-to-vi', 'spor-taš', 'spor-ta-ši-ca', 'spre-ma-ti', 'spre-mi-ti', 'sprem-nik', 'sr-ce', 'sr-de-la', 'sre-bro', 'sre-ća', 'sre-di-na', 'sre-di-šte', 'sred-njak', 'sred-stvo', 'srije-da', 'sr-na', 'srn-dać', 'sr-panj', 'sta-blo', 'sta-blji-ka', 'sta-di-on', 'sta-ja-ći-ca', 'sta-ja-li-šte', 'sta-ja-ti', 'sta-klo', 'stan', 'sta-no-vi', 'sta-ni-ca', 'stan-ka', 'sta-no-va-ti', 'sta-nov-ni-ca', 'sta-nov-nik', 'sta-nje', 'sta-rac', 'sta-ri-ca', 'sta-rost', 'start', 'sta-vi-ti', 'stav-lja-ti', 'sta-za', 'stih', 'sti-ho-vi', 'stijeg', 'stje-go-vi', 'stije-na', 'sto-čar', 'sto-ča-ri-ca', 'sto-ka', 'stol', 'sto-lo-vi', 'sto-lac', 'sto-li-ca', 'stol-njak', 'sto-lje-će', 'sto-pa-lo', 'sto-žac', 'strah', 'stra-ho-vi', 'stra-na', 'stra-nac', 'stra-ni-ca', 'stran-ka', 'stran-ki-nja', 'straž-nji-ca', 'stric', 'stri-če-vi', 'stri-na', 'strip', 'stri-po-vi', 'stroj', 'stro-je-vi', 'stro-jo-vo-đa', 'stru-ja', 'struk', 'stru-ko-vi', 'stru-nja-ča', 'stu-ba', 'stu-bi-šte', 'stu-de-ni', 'stup', 'stu-po-vi', 'stvar', 'stva-ri', 'su-bo-ta', 'sud', 'su-do-vi', 'su-dac', 'su-do-per', 'su-glas-nik', 'suk-nja', 'sun-ce', 'sun-co-bran', 'su-no-vrat', 'su-prug', 'su-pru-ga', 'su-sjed', 'su-sje-da', 'su-sjed-stvo', 'su-snje-ži-ca', 'su-sret', 'sut-ki-nja', 'su-ve-nir', 'su-za', 'sva-đa', 'sve-će-nik', 'sve-mir', 'svi-banj', 'svije-ća', 'svijet', 'svje-to-vi', 'svi-nja', 'svi-rač', 'svi-ra-či-ca', 'svi-ra-ti', 'svje-tilj-ka', 'svje-ti-o-nik', 'svjet-lo', 'svoj-stvo', 'svr-še-tak', 'ša-fran', 'šah', 'ša-ka', 'šal', 'ša-lo-vi', 'ša-la', 'ša-li-ca', 'ša-li-ti se', 'šam-pon', 'ša-pa', 'ša-ran', 'ša-tor', 'še-ćer', 'še-sna-est', 'še-star', 'še-ste-ro-krat-nik', 'še-sti-ca', 'še-sti-na', 'še-šir', 'še-ta-li-šte', 'še-ta-ti se', 'šet-nja', 'še-zde-set', 'ši-lji-lo', 'ši-ri-na', 'šiš-miš', 'ška-re', 'ško-la', 'školj-ka', 'šlji-va', 'šlju-nak', 'špi-lja', 'špi-nat', 'štap', 'šta-po-vi', 'šta-pić', 'šte-dje-ti', 'šted-njak', 'šte-ne', 'šte-ta', 'štit', 'šti-to-vi', 'šti-vo', 'što-pe-ri-ca', 'šu-ma', 'šun-ka', 'šu-tje-ti', 'ta-ble-ta', 'ta-bli-ca', 'taj-na', 'taj-ni-ca', 'taj-nik', 'tak-si', 'ta-ksist', 'ta-ksi-sti-ca', 'takt', 'tak-to-vi', 'ta-ma', 'tam-bu-ra', 'ta-njur', 'ta-ta', 'ta-va', 'ta-van', 'te-čaj', 'tekst', 'tek-sto-vi', 'te-ku-ći-ca', 'te-ku-ći-na', 'te-le', 'te-le-fon', 'te-le-fo-ni-ra-ti', 'te-le-skop', 'te-le-vi-zi-ja', 'te-le-vi-zor', 'tem-pe-ra', 'tem-pe-ra-tu-ra', 'tem-po', 'te-nis', 'te-ni-sač', 'te-ni-sa-či-ca', 'te-ni-si-ca', 'te-ra-sa', 'te-ri-to-rij', 'te-ta', 'te-tak', 'ti-gar', 'tije-lo', 'Tije-lo-vo', 'tije-sto', 'ti-kva', 'tip-ka', 'tip-ko-vni-ca', 'ti-su-ću', 'ti-ši-na', 'tje-dan', 'tje-me', 'tje-ste-ni-na', 'tki-vo', 'tlo', 'tla', 'to-bo-gan', 'to-čka', 'ton', 'to-no-vi', 'to-na', 'to-pli-na', 'to-plo-mjer', 'tor-ba', 'tor-ta', 'trač-ni-ca', 'trag', 'tra-go-vi', 'tra-jekt', 'trak', 'tra-ko-vi', 'trak-tor', 'tram-vaj', 'tra-tin-či-ca', 'tra-va', 'tra-vanj', 'trav-njak', 'tra-ži-ti', 'tr-buh', 'tr-ča-ti', 'tre-ba-ti', 'tre-ći-na', 'tre-ner', 'tre-ne-ri-ce', 'tre-ning', 'tre-nir-ka', 'tre-nu-tak', 'tre-pa-vi-ca', 'tre-šnja', 'trg', 'tr-go-vi', 'tr-go-vac', 'tr-go-vi-na', 'tr-gov-ki-nja', 'tri-an-gl', 'tri-ci-kl', 'tri-de-set', 'tri-na-est', 'troj-ka', 'tro-krat-nik', 'tro-kut', 'tro-sjed', 'tro-ši-ti', 'tru-ba', 'tru-dno-ća', 'trup', 'tru-po-vi', 'trut', 'tru-to-vi', 'trž-ni-ca', 'tu-ći', 'tu-ga', 'tu-li-pan', 'tu-nel', 'tu-rist', 'tu-ri-sti-ca', 'tu-ri-zam', 'tur-nir', 'tuš', 'tu-še-vi', 'tuš', 'tu-še-vi', 'tvar', 'tva-ri', 'tvor-ni-ca', 'tvr-đa-va', 'u-brus', 'u-če-ni-ca', 'u-če-nik', 'u-če-nje', 'u-či-ni-ti', 'u-či-o-ni-ca', 'u-či-telj', 'u-či-te-lji-ca', 'u-či-ti', 'u-ći', 'ud', 'u-do-vi', 'u-da-rac', 'u-da-ralj-ka', 'udž-be-nik', 'u-ga-o', 'ug-ljen', 'u-ho', 'u-jak', 'uj-na', 'u-kos-ni-ca', 'u-kras', 'u-laz', 'u-la-zi-ti', 'u-laz-ni-ca', 'u-li-ca', 'u-lo-ga', 'u-lje', 'u-ma-nje-nik', 'u-ma-nji-telj', 'u-mi-rov-lje-ni-ca', 'u-mi-rov-lje-nik', 'u-mi-va-o-nik', 'u-mjet-ni-ca', 'u-mjet-nik', 'u-mjet-nost', 'u-mno-žak', 'u-nuk', 'u-nu-ka', 'u-nu-traš-njost', 'u-pa-la', 'u-pit-nik', 'u-po-zna-ti', 'u-po-zna-va-ti', 'u-put-ni-ca', 'u-red', 'u-re-đaj', 'u-si-sa-vač', 'us-klič-nik', 'Us-krs', 'u-sna', 'u-spa-van-ka', 'us-pi-nja-ča', 'us-pjeh', 'u-sta', 'u-sta-ja-ti', 'u-sta-ti', 'uš', 'u-ši', 'uš-će', 'u-tak-mi-ca', 'u-to-rak', 'u-tr-ka', 'u-vod', 'uz-bu-na', 'u-zor', 'uz-rok', 'u-že', 'u-ži-na', 'u-ži-va-ti', 'va-ga', 'va-gon', 'val', 'va-lo-vi', 'Va-len-ti-no-vo', 'va-ljak', 'va-ri-vo', 'va-ter-po-list', 'va-ter-po-li-sti-ca', 'va-ter-po-lo', 'va-tra', 'va-tro-ga-sac', 'va-tro-ga-ski-nja', 'va-za', 've-čer', 've-če-ra', 've-če-ra-ti', 've-ge-ta-ri-ja-nac', 've-ge-ta-ri-jan-ka', 've-lja-ča', 've-se-li-ti', 've-se-lje', 've-slač', 've-sla-či-ca', 've-slo', 've-te-ri-nar', 've-te-ri-nar-ka', 've-zi-ca', 'vic', 'vi-ce-vi', 'vid', 'vi-dje-ti', 'vije-nac', 'vijest', 'vije-sti', 'vi-kend', 'vi-ken-di-ca', 'vi-la', 'vi-li-ca', 'vi-no', 'vi-no-grad', 'vi-o-li-na', 'vi-o-li-nist', 'vi-o-li-ni-sti-ca', 'vi-o-lon-če-list', 'vi-o-lon-če-li-sti-ca', 'vi-o-lon-če-lo', 'vi-rus', 'vi-si-ba-ba', 'vi-si-na', 'vi-še-krat-nik', 'vi-šnja', 'vi-ta-min', 'vječ-nost', 'vjen-ča-nje', 'vjen-ča-ti', 'vje-ra', 'vjer-ni-ca', 'vjer-nik', 'vje-ro-na-uk', 'vje-ro-u-či-telj', 'vje-ro-u-či-te-lji-ca', 'vje-ro-va-ti', 'vjes-nik', 'vje-ša-li-ca', 'vje-šti-ca', 'vje-šti-na', 'vje-tar', 'vje-ve-ri-ca', 'vjež-ba', 'vjež-be-ni-ca', 'vla-dar', 'vla-da-ri-ca', 'vla-ga', 'vlak', 'vla-ko-vi', 'vo-će', 'voć-ka', 'voć-njak', 'vo-da', 'vo-dič', 'vo-di-či-ca', 'vo-do-in-sta-la-ter', 'vo-do-in-sta-la-ter-ka', 'vo-do-ze-mac', 'voj-nik', 'voj-ni-ki-nja', 'voj-ska', 'vol', 'vo-lo-vi', 'vo-lan', 'vo-lje-ti', 'vo-zač', 'vo-za-či-ca', 'vo-zi-lo', 'vo-zi-ti', 'vra-bac', 'vra-ća-ti', 'vrag', 'vra-go-vi', 'vrat', 'vra-to-vi', 'vra-ta', 'vra-ti-ti', 'vr-ba', 'vre-ća', 'vrh', 'vr-ho-vi', 'vr-hnje', 'vrije-me', 'vrp-ca', 'vrt', 'vr-to-vi', 'vr-tić', 'vr-tu-ljak', 'vru-ći-ca', 'vru-ći-na', 'vu-ći', 'vuk', 'vu-ko-vi', 'vul-kan', 'vu-na', 'za-ba-va', 'za-bo-ra-vi-ti', 'za-bo-rav-lja-ti', 'za-da-ća', 'za-da-tak', 'za-go-net-ka', 'za-gra-da', 'za-gr-ljaj', 'za-hod', 'za-hval-nost', 'za-jed-ni-ca', 'za-ju-trak', 'za-ka-sni-ti', 'za-klju-čak', 'za-kon', 'za-la-zak', 'za-ljev', 'za-mje-na', 'za-ni-ma-nje', 'za-ni-ma-ti', 'za-pad', 'za-po-vijed', 'za-ra-da', 'za-rez', 'za-slon', 'za-sta-va', 'za-tva-ra-ti', 'za-tvor', 'za-tvo-ri-ti', 'za-vi-čaj', 'za-vist', 'za-vje-sa', 'za-voj', 'za-vr-ša-va-ti', 'za-vr-še-tak', 'za-vr-ši-ti', 'zbir-ka', 'zbor', 'zbo-ro-vi', 'zbor-ni-ca', 'zbra-ja-nje', 'zbroj', 'zbro-je-vi', 'zdje-la', 'zdrav-lje', 'ze-bra', 'zec', 'ze-če-vi', 'ze-lje', 'zem-lja', 'zem-lji-šte', 'zem-ljo-vid', 'zglob', 'zglo-bo-vi', 'zgra-da', 'zid', 'zi-do-vi', 'zi-dar', 'zi-ma', 'zim-ni-ca', 'zla-to', 'zmaj', 'zma-je-vi', 'zmi-ja', 'zna-či-ti', 'znač-ka', 'znak', 'zna-ko-vi', 'zna-men-ka', 'zna-nost', 'znan-stve-ni-ca', 'znan-stve-nik', 'zna-nje', 'zna-ti', 'znoj', 'zo-ra', 'zrak', 'zra-ko-plov', 'zr-ca-lo', 'zr-no', 'zub', 'zu-bi', 'zu-bar', 'zu-ba-ri-ca', 'zu-bo-bo-lja', 'zva-ti', 'zvijer', 'zvije-ri', 'zvije-zda', 'zviž-dalj-ka', 'zvo-no', 'zvuk', 'zvu-ko-vi', 'zvu-ci', 'ža-ba', 'ža-lac', 'ža-lo', 'ža-lost', 'ža-ru-lja', 'žeđ', 'že-lu-dac', 'že-lja', 'že-ljez-ni-ca', 'že-lje-zo', 'že-na', 'žen-ka', 'žet-va', 'ži-ca', 'ži-ča-ra', 'ži-dov', 'ži-dov-ka', 'ži-ta-ri-ca', 'ži-to', 'ži-vje-ti', 'ži-vot', 'ži-vo-ti-nja', 'žli-ca', 'žu-pa-ni-ja', 'žu-ri-ti se']

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
    pitanja = pitanja.slice(0, 20)
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